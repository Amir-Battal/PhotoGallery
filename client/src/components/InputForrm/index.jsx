import React, { useState } from 'react'
import styles from './styles.module.css'
import axios from 'axios';

const InputForm = (props) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState("");
    const [author, setAuthor] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");

    const user = JSON.parse(localStorage.getItem('user'));

    const handleSubmit = async () => {
        if(!photo) {
            setError("يجب عليك اختيار صورة");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("photo", photo);
        formData.append("author", user.id)
        setAuthor(user.id);

        const url = "https://photo-gallery-server-indol.vercel.app/api/photo/save";
        const data = formData;

        await axios.post(url, data)
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

    const handleChange = (e) => {
        const selectedFile = e.target.files[0];
        if(selectedFile){
            const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
            if(!allowedFileTypes.includes(selectedFile.type)){
                alert("الرجاء اختيار ملف من نوع JPEG أو JPG أو PNG.");
            } else {
                setPhoto(selectedFile);
            }
        }
    };

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
                    onChange={handleChange}
                    required
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