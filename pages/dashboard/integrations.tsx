import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, getSession } from 'next-auth/react';

import ToggleLabel from '@/components/ToggleLabel';
import StackedList from '@/components/StackedList';
import { Spinner } from '@/components/Spinner';

import {
  getQbUri,
  getQbTooken,
  getQbCompanyInfo,
  saveCompanyData,
  getQbCompany,
  setPnL,
} from '@/services';
import { GetServerSidePropsContext } from 'next';
import { Props } from '@headlessui/react/dist/types';

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
  const [isLoading, setIsLoading] = useState(true)
  const { data: session } = useSession() as any;

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
      setIsLoading(true)
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
        const company = await getQbCompany(session?.user.id)
        setEnabled(true);
        const result = await setPnL(session?.user.id, company.company_id)
        setQbCompany(company);
        setIsLoading(false)
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
        setQbCompany(company);
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
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

  if (isLoading) return <Spinner />

  return (
    <div className="mx-auto my-20 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col">
        <div className="flex flex-col items-start mb-16">
          <h1 className='text-5xl font-medium'>Integrations</h1>
          <h2 className='text-2xl'>Manage your integrations</h2>
        </div>
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

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const session = await getSession({ req })
  console.log("SesionSSR: ", session)
  // const qbCompany = await getQbCompany(session?.user.id);
  return {
    props: {
      // qbCompany
    }
  }
}
