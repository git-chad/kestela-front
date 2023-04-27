import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { gapi } from 'gapi-script';

import TableEdit from "@/components/TableEdit"
import { Spinner } from "@/components/Spinner"

import { getPnL, saveOneMapping, saveTemplate } from "@/services"
import { useRouter } from "next/router";



export default function EditFields() {
  const [isChecked, setIsChecked] = useState(false)
  const [mappingName, setMappingName] = useState('')
  const [pnl, setPnl ] = useState([]) as any
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  const { data: session } = useSession() as any;

  const handleClientLoad = (mapping: any) => {
    gapi.load('client:auth2', () => initClient(mapping));
  };

  const initClient = (mapping: any) => {
    // setIsLoadingGoogleDriveApi(true);
    gapi.client
      .init({
        apiKey: "AIzaSyCWLjjfdeBowVuWbKVzhzFHLPEQ6p-y-yQ",
        clientId: "519942825314-ggfa8apu4n5pu0b3cd5f5jr9vpgm1kvm.apps.googleusercontent.com",
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
        scope: 'https://www.googleapis.com/auth/drive',
      })
      .then(
        function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get(), mapping);
        },
        function (error: any) {
          console.log("Error: ", error)
        }
      );
  };

  const updateSigninStatus = async (isSignedIn: boolean, mapping: any) => {
    if (isSignedIn) {
      let cloned
      try {
        cloned = (await gapi.client.drive.files.copy({
          fileId: '1ncD5YkctdcJMFXNPOk8ZX-cFKi1XFLXEfHNvq4ZSW5Q'
        })).result
        console.log("Cloned: ", cloned)
        listFiles(cloned, mapping);
      } catch (error) {
        console.log("ERROR: ", error)
      }
      // setIsLoadingGoogleDriveApi(false);
      // // list files if user is authenticated

    } else {
      // prompt user to sign in
      handleAuthClick();
    }
  };


  const listFiles = async (cloned: any, mapping: any) => {

   const result = (await gapi.client.drive.files.update({
      fileId: cloned.id,
      // addParents: "1_oDW-j2Lq-pC6YZfYG9YeRvpJGuXaUqz",
      // removeParents: oldFolderId,
      resource: { name: "Production - Kestela / Add-on" },
      fields: 'id, parents'
     })).result

     console.log("Result: ", result)

    // https://docs.google.com/spreadsheets/d/137nZebC9RT5u8vmLUxRzjOBT9WXLFZ0DRJ3kSW_ENs8

    const body = {
      name: 'Production - Kestela / Add-on',
      url: `https://docs.google.com/spreadsheets/d/${result.id}`,
      user_id: session.user.id,
      mapping_id: mapping.id
    }

    const tamplatesSaved = await saveTemplate(body)

    console.log("Body: ", tamplatesSaved)
    setIsLoading(false)

    router.push('/dashboard/my-templates')
    // gapi.client.drive.files
    //   .list({
    //     pageSize: 10,
    //     fields: 'nextPageToken, files(id, name, mimeType, modifiedTime)',
    //     q: searchTerm,
    //   })
    //   .then(function (response) {
    //     setIsFetchingGoogleDriveFiles(false);
    //     setListDocumentsVisibility(true);
    //     const res = JSON.parse(response.body);
    //     setDocuments(res.files);
    //   });
  };

  const handleAuthClick = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  // --------------------- FIN DE GAPI-SCRIPT ---------------------

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
    if(!mappingName)
      return toast.warn('Enter a mapping name', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    try {
      setIsLoading(true)
      const body = {
        name: mappingName,
        fields: pnl,
        user_id: session.user.id
      }
      const mapping = await saveOneMapping(body)
      handleClientLoad(mapping)
      
    } catch (error) {

    }
  }
  // https://docs.google.com/spreadsheets/d/1BsU1sCYLvj8rh6oPzO9VLOjWkUdC2_othagUi0pn5-I/edit#gid=1381707055

  useEffect(() => {
    if (session) {
      handleFetchPnl(session?.user.id)
    }
  }, [])

  return (
    <>
      <div className="mx-auto my-8 max-w-7xl">
        <div className="mx-auto max-w-7xl">
          {isLoading 
            ? <Spinner />
            : <TableEdit
                pnls={pnl}
                handleChange={handleChange}
                handleChangeText={handleChangeText}
                mappingName={mappingName}
                handleChangeName={setMappingName}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                onSave={saveMapping}
              />
          }   
        </div>
      </div>
      <ToastContainer />
    </>
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
  return accounts;
}