import React, { useState } from 'react'
import styles from './styles.module.css'
import axios from 'axios';

const InputForm = (props) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = () => {

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("photo", photo);

        axios.post('http://localhost:3001/api/photo/save', formData)
            .then((res) => {
                console.log(res);
                if(res.data.Status === 'Sucess'){
                    setMsg("تم رفع الملف بنحاح");
                } else {
                    setMsg("هناك خطأ ما")
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <h1>إضافة صورة جديدة</h1>
                <label className={styles.label}>عنوان الصورة</label>
                <input
                    type="text"
                    placeholder='ادخل عنوان الصورة' 
                    name='title'
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className={styles.input}
                />
                <label className={styles.label}>وصف الصورة</label>
                <input
                    type="text"
                    placeholder='ادخل وصف الصورة' 
                    name='description'
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className={styles.input}
                />
                <label>ارفع الصورة</label>
                <input 
                    type="file"
                    name="file_picker"
                    id="file_picker"
                    onChange={(e) => setPhoto(e.target.files[0])}
                />
                <button className={styles.addPhoto} type="submit">
                    إضافة الصورة
                </button>
            </form>
            {props.children}
        </div>
    );
};

export default InputForm;