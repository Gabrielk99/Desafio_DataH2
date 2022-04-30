import React, { useEffect, useState } from "react"
import { uploadCSV } from "../../../Domain/Controllers/Data/Data"
import Loader from "../loader/Loader"
import "./InputData.css"


function InputData(props){

    const [file,setFile] = useState(null)
    const [load,setLoad] = useState(false)

    const uploadClick = ()=>{
        document.getElementById("input-data").click()
    }

    const onChangeUpload = (e)=>{
        setFile(e.target.files[0])
    }

    const onSend = ()=>{
        const btn = document.getElementById("send-btn")
        btn.style.cursor="none"
        setLoad(true)
        const res = uploadCSV(file)
        res.then(data=>{
            setLoad(false)
            setFile(null)
            document.getElementById("input-data").files=new DataTransfer().files
            btn.style.cursor="pointer"
            props.updateDatas(data.res)
        })

    }

    return (
        
        <div className="ctn-input-data">
            <input onChange={onChangeUpload} type={'file'} accept='.csv' id="input-data"/>
            <div className="row-input">
                <div onClick={uploadClick} className="upload-input">
                    Choose File
                </div>
                <div className={file?"file-desc active":"file-desc inactive"}>
                    {file?file.name:"No file selected."}
                </div>
            </div>
            <div onClick={onSend} className="send-btn" id="send-btn">
                {load?<Loader className="load-send"/>:"Send File"}
            </div>
        </div>
        
    )
}


export default InputData