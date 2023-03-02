import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import ToggleLabel from '@/components/ToggleLabel';
import Image from 'next/image';

export default function Integrations() {
  const [enabled, setEnabled] = useState(false);
  // const [open, setOpen] = useState(false)
  const router = useRouter();

  const getAuthUrl = async (e: boolean) => {
    if (e) {
      try {
        setEnabled(true);
        let res = (await fetch(`${process.env.BACK_URL}/v1/quickbooks/authUri`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })) as any;
        res = await res.json();
        window.location.href = res.authUri;
      } catch (error) {
        console.log('Error: ', error);
      }
    } else {
      setEnabled(false);
    }
  };

  const getQuickbooksToken = async (code: any, state: any, realmId: any) => {
    let tokenResponse = await fetch(
      `${process.env.BACK_URL}/v1/quickbooks/integrations?code=${code}&state=${state}&realmId=${realmId}`
    );
    tokenResponse = await tokenResponse.json();
    console.log('Response Token :', tokenResponse);

    let companyInfo = await fetch(`${process.env.BACK_URL}/v1/quickbooks/getCompanyInfo`);
    companyInfo = await companyInfo.json();
    console.log('Company Info :', companyInfo);

    setEnabled(true);

    setTimeout(() => {
      router.push('/dashboard/gallery');
    }, 2000);
    // const { access_token, refresh_token } = tokenResponse as any;

    // let getAccounts = await fetch(
    //   `${process.env.BACK_URL}/v1/api-quickbooks/getAccounts`,
    //   {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ access_token, refresh_token, realmId }),
    //   }
    // );

    // getAccounts = await getAccounts.json();

    // console.log(getAccounts);
  };

  useEffect(() => {
    const { code, state, realmId } = router.query;

    if (code && state && realmId) {
      getQuickbooksToken(code, state, realmId);
      window.history.replaceState(null, '', '/dashboard/integrations');
      // const { pathname, query } = router
      // delete router.query.code
      // delete router.query.state
      // delete router.query.realmId
      // router.replace({ pathname, query }, undefined, { shallow: true })
    }
  }, [router]);

  return (
    <div className="mx-auto my-20 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Image
          src="https://www.pngkey.com/png/full/129-1296317_quickbooks-logo-quickbooks-logo.png"
          width={40}
          height={40}
          alt={''}
        />
        <ToggleLabel
          checked={enabled}
          onChange={getAuthUrl}
          title="Enable your Quickbooks Integration"
          description="Pull all your reports from your Quickbooks account directly to your spreadsheets"
        />
      </div>
    </div>
  );
}
