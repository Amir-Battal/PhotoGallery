import React, { useState } from 'react';
import styles from './styles.module.css';
import axios from 'axios';

const EditForm = (props) => {
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);
    const [msg, setMsg] = useState("");

    const handleSubmit = async (e) => {
        
        const data = {
            title: title,
            description: description
        };

        axios.put(`http://localhost:3001/api/photo/${props.id}`, data)
            .then((res) => {
                console.log(res);
                if(res.data.Status === 'Sucess'){
                    setMsg("تم تحديث الملف بنحاح");
                } else {
                    setMsg("هناك خطأ ما")
                }
            })
            .catch(err => console.log(err));
        
    };

    return (
        <div>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <h1>تعديل الصورة</h1>
            <label className={styles.label}>عنوان الصورة</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className={styles.input}
            />
            <label className={styles.label}>الوصف</label>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className={styles.input}
            />
            <button className={styles.editDetails} type="submit">
                حفظ التعديلات
            </button>
        </form>
        {props.children}
        </div>
    );
};

export default EditForm;