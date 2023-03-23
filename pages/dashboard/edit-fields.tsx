import { useEffect, useState } from "react"

import TableEdit from "@/components/TableEdit"
import { Spinner } from "@/components/Spinner"
import { getPnL } from "@/services"
import { useSession } from "next-auth/react"

export default function EditFields() {
  const [pnl, setPnl ] = useState([]) as any
  const { data: session } = useSession()

  const handleChange = (position:any) => {
    const element = pnl[position] as any;
    element.isIncluded = !pnl[position].isIncluded
    setPnl((oldState: any) => {
      return [
        ...oldState.slice(0,position),
        element,
        ...oldState.slice(position+1),
      ]
    })
  }

  const handleFetchPnl = async (user_id: any) => {
    try {
      const result = await getPnL(user_id)
      setPnl(extractAccounts(result))
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  useEffect(() => {
    if (session) {
      handleFetchPnl(session?.user.id)
    }
  }, [])

  return (
    <div className="mx-auto my-20 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {!pnl 
          ? <Spinner />
          : <TableEdit pnls={pnl} handleChange={handleChange} />
        }   
      </div>
    </div>
  )
}


function extractAccounts(json: any) {

  let accounts: any = [];

  function parseRows(rows: any, group: any) {
    if (!rows) return;

    if (Array.isArray(rows.Row)) {
      for (let i = 0; i < rows.Row.length; i++) {
        let row = rows.Row[i];

        if (row.type === 'Data') {
          let accountName = row.ColData[0].value;

          if (accountName !== group) {
            let account = {
              name: accountName,
              group: group || null,
              isIncluded: true,
              nameOnTemplate: ''
            };
            accounts.push(account);
          }
        } else if (row.type === 'Section') {
          let headerAccountName = row.Header ? row.Header.ColData[0].value : null;
          let currentGroup = row.group || group;

          if (headerAccountName && headerAccountName !== currentGroup) {
            accounts.push({
              name: headerAccountName,
              group: currentGroup || null,
              isIncluded: true,
              nameOnTemplate: ''
            });
          }

          parseRows(row.Rows, currentGroup);

          if (row.Summary) {
            let summaryAccountName = row.Summary.ColData[0].value;

            if (summaryAccountName !== currentGroup) {
              let summaryAccount = {
                name: summaryAccountName,
                group: currentGroup || null,
                isIncluded: true,
                nameOnTemplate: ''
              };
              accounts.push(summaryAccount);
            }
          }
        }
      }
    }
  }

  parseRows(json.rows, '');
  console.log("Accounts: ", accounts)
  return accounts;
}