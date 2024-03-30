import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css'

const DeleteAlert = (props) => {
    const [msg, setMsg] = useState("");

    const handleYes = async (e) => {
        props.setTrigger(false);

        try {
            await axios.delete(`http://localhost:3001/api/photo/${props.id}`);
            const updatedPhotos = props.photos.filter((photo) => photo._id !== props.id);
            props.setPhotos(updatedPhotos);
            setMsg("تم حذف الملف");
        } catch (error) {
            console.log(error);
            setMsg("هناك خطأ ما");
        }
    };


    return (
        <div className={styles.deleteAlert}>
            <h1>هل أنت متأكد من انك تريد الحذف؟</h1>
            <div className={styles.btns}>
                <button className={styles.yes} onClick={() => handleYes()}>نعم</button>
                <button className={styles.no} onClick={() => props.setTrigger(false)}>لا</button>
            </div>
        </div>
    )
}

export default DeleteAlert;