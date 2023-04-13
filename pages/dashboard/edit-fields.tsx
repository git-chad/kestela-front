import { useEffect, useState } from "react"

import TableEdit from "@/components/TableEdit"
import { Spinner } from "@/components/Spinner"
import { getPnL, saveOneMapping } from "@/services"
import { useSession } from "next-auth/react"

export default function EditFields() {
  const [mappingName, setMappingName] = useState('')
  const [pnl, setPnl ] = useState([]) as any
  const [isLoading, setIsLoading] = useState(true)
  const { data: session } = useSession() as any;

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

  const handleChangeText = (position: any, event: any) => {
    const element = pnl[position] as any;
    element.nameOnTemplate = event.target.value;
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
      setIsLoading(true)
      const result = await getPnL(user_id)
      setPnl(extractAccounts(result))
      setIsLoading(false)
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  const saveMapping = async () => {
    try {
      setIsLoading(true)
      const body = {
        name: '',
        fields: pnl,
        user_id: session.user.id
      }
      const mapping = await saveOneMapping(body)
      console.log("Mapping: ", mapping)
      setIsLoading(false)
    } catch (error) {

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
        {isLoading 
          ? <Spinner />
          : <TableEdit
              pnls={pnl}
              handleChange={handleChange}
              handleChangeText={handleChangeText}
              mappingName={mappingName}
              handleChangeName={setMappingName}
              onSave={saveMapping}
             />
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