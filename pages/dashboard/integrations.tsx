import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import ToggleLabel from '@/components/ToggleLabel'


export default function Integrations() {
  const [enabled, setEnabled] = useState(false)
  // const [open, setOpen] = useState(false)
  const router = useRouter()

  const getAuthUrl = async (e: boolean) => {
    if(e) {
      try {
        setEnabled(true)
        let res = await fetch(`${process.env.BACK_URL}/v1/quickbooks/authUri`, {
          method: 'GET',
          headers: { "Content-Type": "application/json" }
        }) as any
        res = await res.json()
        window.location.href = res.authUri
      } catch(error) {
        console.log("Error: ", error)
      }
    } else {
      setEnabled(false)
    }
  }

  const getQuickbooksToken = async (code: any, state: any, realmId: any) => {
    let res = await fetch(`${process.env.BACK_URL}/v1/quickbooks/integrations?code=${code}&state=${state}&realmId=${realmId}`)
    res = await res.json()
    console.log("Response Token :", res)
    let companyInfo = await fetch(`${process.env.BACK_URL}/v1/quickbooks/getCompanyInfo`)
    companyInfo = await companyInfo.json()
    console.log("Company Info :", companyInfo)

    const { access_token, refresh_token } = res as any

    let getAccounts = await fetch(`${process.env.BACK_URL}/v1/api-quickbooks/getAccounts`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ access_token, refresh_token, realmId })
    })

    getAccounts = await getAccounts.json()

    console.log(getAccounts)
  }

  useEffect(() => {
    const { code, state, realmId } = router.query
    if (code && state && realmId) {
      getQuickbooksToken(code, state, realmId)
    }
  }, [router])

  return (
    <div className="mx-auto my-20 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <ToggleLabel
          checked={enabled}
          onChange={getAuthUrl}
          title="Enable quickbooks integration"
          description="Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia."
        />
      </div>
    </div>
  )
}