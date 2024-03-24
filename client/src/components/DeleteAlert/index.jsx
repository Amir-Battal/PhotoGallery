import axios from 'axios';
import React, { useState } from 'react';

const DeleteAlert = (props) => {
    const [msg, setMsg] = useState("");

    const handleYes = async (e) => {
        axios.delete(`http://localhost:3001/api/photo/${props.id}`)
            .then((res) => {
                console.log(res);
                if(res.data.status === 'Success'){
                    setMsg("تم حذف الملف بنجاح")
                } else {
                    setMsg("هناك خطأ ما")
                }
            })
            .catch(err => console.log(err)); 
    }

    return (
        <div>
            <h1>هل انت متأكد من انك تريد حذف الصورة؟</h1>
            <div className="select">
                <button onClick={handleYes}>نعم</button>
                <button onClick={handleNo}>لا</button>
            </div>
        </div>
    )
}

export default DeleteAlert;