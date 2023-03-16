import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import ToggleLabel from '@/components/ToggleLabel';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import StackedList from '@/components/StackedList';

import {
  getQbUri,
  getQbTooken,
  getQbCompanyInfo,
  saveCompanyData,
  getQbCompany,
  setPnL,
} from '@/services';

function generateCompanyBody(
  companyInfo: CompanyInfo,
  tokenObject: QbToken,
  realmId: string | string[],
  user_id: string | null | undefined
): PostCompanyBody {
  return {
    company_id: companyInfo.Id,
    company_name: companyInfo.CompanyName,
    company_addr: companyInfo.CompanyAddr,
    country: companyInfo.Country,
    email: companyInfo.Email?.Address,
    legal_name: companyInfo.LegalName,
    legal_addr: companyInfo.LegalAddr,
    name_value: companyInfo.NameValue,
    user_id,
    qb_token: tokenObject,
    realmId: realmId,
    is_active: true,
  };
}

export default function Integrations() {
  const [enabled, setEnabled] = useState(false);
  const [qbCompany, setQbCompany] = useState(null);
  const { data: session } = useSession();

  const router = useRouter();

  const getAuthUrl = async (e: boolean) => {
    if (e) {
      try {
        setEnabled(true);
        const res = await getQbUri();
        window.location.href = res.authUri;
      } catch (error) {
        console.log('Error: ', error);
      }
    } else {
      setEnabled(false);
    }
  };

  const getQbTokenAndSave = async (
    code: string | string[],
    state: string | string[],
    realmId: string | string[]
  ) => {
    try {
      const qbToken = await getQbTooken(code, state, realmId);
      const { CompanyInfo } = await getQbCompanyInfo();
      const companyBody = generateCompanyBody(
        CompanyInfo,
        qbToken,
        realmId,
        session?.user.id
      );
      const savedResponse = await saveCompanyData(companyBody);

      if (savedResponse) {
        getMyQbCompany(session?.user.id)
      }
      
    } catch (error) {
      console.log('Error :', error);
    }
  };

  const getMyQbCompany = async (user_id: any) => {
    try {
      const company = await getQbCompany(user_id);
      if(company) {
        setEnabled(true);
        const result = await setPnL(user_id, company.company_id)
        setQbCompany(company);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  useEffect(() => {
    const { code, state, realmId } = router.query;
    if (session && code && state && realmId) {
      getQbTokenAndSave(code, state, realmId);
      // window.history.replaceState(null, '', '/dashboard/integrations');
    }
  }, [router, session]);

  useEffect(() => {
    const { code, state, realmId } = router.query;
    if (session && !code && !state && !realmId) {
      getMyQbCompany(session.user.id);
    }
  }, [session]);

  return (
    <div className="mx-auto my-20 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Image
          src="https://www.pngkey.com/png/full/129-1296317_quickbooks-logo-quickbooks-logo.png"
          width={40}
          height={40}
          alt={''}
        />
        <br />
        <ToggleLabel
          checked={enabled}
          onChange={getAuthUrl}
          title="Enable your Quickbooks Integration"
          description="Pull all your reports from your Quickbooks account directly to your spreadsheets"
        />
      </div>
      {qbCompany && 
        <div className="mx-auto my-8 max-w-5xl">
          <StackedList companies={[qbCompany]} />
        </div>
      }
    </div>
  );
}
