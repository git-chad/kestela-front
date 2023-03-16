import { useEffect, useState } from "react"

import TableEdit from "@/components/TableEdit"
import { getPnL } from "@/services"
import { useSession } from "next-auth/react"

export default function EditFields() {
  const [pnl, setPnl ] = useState()
  const { data: session } = useSession()

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
  }, [session])

  return (
    <div className="mx-auto my-20 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {!pnl 
          ? <div>...loading</div>
          : <TableEdit pnls={pnl} />
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
              group: group || null
            };
            accounts.push(account);
          }
        } else if (row.type === 'Section') {
          let headerAccountName = row.Header ? row.Header.ColData[0].value : null;
          let currentGroup = row.group || group;

          if (headerAccountName && headerAccountName !== currentGroup) {
            accounts.push({
              name: headerAccountName,
              group: currentGroup || null
            });
          }

          parseRows(row.Rows, currentGroup);

          if (row.Summary) {
            let summaryAccountName = row.Summary.ColData[0].value;

            if (summaryAccountName !== currentGroup) {
              let summaryAccount = {
                name: summaryAccountName,
                group: currentGroup || null
              };
              accounts.push(summaryAccount);
            }
          }
        }
      }
    }
  }

  parseRows(json.rows, '');
  return accounts;
}