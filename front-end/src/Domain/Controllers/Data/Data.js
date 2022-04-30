import axios from "axios"

const baseUrl='api/data'

export const uploadCSV = async (file)=>{
    const dataForm = new FormData()
    dataForm.append('file',file)

    const request = axios.post(`http://localhost:3001/${baseUrl}`,dataForm)

    return request.then(res=>res.data).catch(res=>{return {status:"error",message:"não foi possível acessar o servidor."}})
}

