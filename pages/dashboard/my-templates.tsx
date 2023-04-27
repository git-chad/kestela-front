import { useEffect, useState } from "react"
import { getTemplates } from "@/services/qbServices"

const MyTemplates = () => {
    const [templates, setTemplates] = useState([])

    const getMyTemplates = async () => {
      const result = await getTemplates()
      setTemplates(result)
    }

    useEffect(() => {
      getMyTemplates()
    }, [])

    return (
      <div>
        {templates.map((temp: any) => {
          return(
            <div>
            <div>{temp.name}</div>
            <a href={temp.url} target="_blank">Go to my SpreadSheet</a>
            </div>
          )
        })}
      </div>
    )
  }
  
  export default MyTemplates