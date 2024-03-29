import React, { useState } from 'react'
import pic from '../logo.svg'
import toast from 'react-hot-toast'
function QRcode() {
    const [input,setInput]=useState()
    const [size,setSize]=useState()
    const [img,setImg]=useState(pic)
    const [loading,setLoading]=useState(false)
    const [flag,setFlag]=useState(false);
    const[flag2,setFlag2]=useState(false);

    const handleChange=(event)=>{
        // console.log(event.target.value);
        setInput(event.target.value);
    }
    const handleSize=(event)=>{
        // console.log(event.target.value);
        setSize(event.target.value);
        setFlag2(true);

    }

    async function generateQR(){

        if(input==="" || size===""){
           return toast.error("Please provide the Essentials")
        }
        try{
            setLoading(true)
            const url=`https://api.qrserver.com/v1/create-qr-code/?size= ${size} x ${size} &data=${encodeURIComponent(input)}`;
            setImg(url);
            setFlag(true);
            setLoading(false);
            setInput("")
            setSize()
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    
    const handleDownload=()=>{
        fetch (img).then((resp)=>resp.blob()).then((blob)=>{
            const link=document.createElement("a");
            link.href=URL.createObjectURL(blob);
            link.download=("QR_Code");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setImg(pic)
            setFlag(false)
        })
    }

    return (
        <div className='justify-content-center align-items-center'>
            <div className='container w-50 m-auto bg-dark text-warning mt-3 rounded-3 p-3'>
                <p className='heading text-center'>QR CODE GENERATOR</p>
                <div className='img-box'>
                    <img src={img} />
                </div>

                {loading && <p className='text-center'>Loading...</p>}

                <div className='mt-3 w-50 m-auto'>
                    <label>Enter Data for QR Code :</label>
                    <input className='form-control mt-2'placeholder='Provide Link' value={input} onChange={(event)=>handleChange(event)}></input>
                </div>
                <div className='mt-2 w-50 m-auto'>
                    <label>Size of the file :</label>
                    <input type='number' placeholder='max 1500KB' value={size} className='form-control mt-2' onChange={(event)=>handleSize(event)}></input>
                </div>
                <div className='mt-4 text-center'>
                    <button className='btn btn-outline-warning m-1' disabled={!flag2} onClick={()=>generateQR()}>Generate QR Code</button>
                    <button className='btn btn-warning m-1' disabled={!flag} onClick={()=>handleDownload()}>Download QR Code</button>
                </div>
            <p className='text-center mt-2'>Designed by <b>Christober</b></p>
            </div>
        </div>
    )
}

export default QRcode