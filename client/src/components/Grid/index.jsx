import React, { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import { IoOptionsOutline } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import PopupForm from "../PopupForm";
import EditForm from "../EditForm";


import styles from './styles.module.css';
import axios from "axios";

const Grid = ({ photos }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [editedtitle, setEditedTitle] = useState("");
    const [editedDescription, setEditedDescription] = useState("");
    const [editedId , setEditedId] = useState();
    const [msg, setMsg] = useState("");


    const largeImg = (index) => {
        setSelectedImage(index);
    };

    const resetImg = () => {
        setSelectedImage(null);
    };

    const handleEdit = (id ,title, description) => {
        setEditedTitle(title);
        setEditedDescription(description);
        setEditedId(id);
        setButtonPopup(true);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3001/api/photo/${id}`)
            .then((res) => {
                console.log(res);
                if(res.data.Status === 'Sucess'){
                    setMsg("تم حذف الملف");
                } else {
                    setMsg("هناك خطأ ما")
                }
            })
            .catch(err => console.log(err));

        window.location.reload();
    
    }


    return (
        <>
            <h1>المعرض</h1>
            <div className={styles.grid}>
                {photos.map((photo, index) => (
                    <div className={styles.grid__item}>
                        <div className={styles.details}>
                            <button>
                                <IoHeart />
                            </button>
                            <div className={styles.photoHeader}>
                                <h3 className={styles.title}>{photo.title}</h3>
                                <p className={styles.description}>{photo.description}</p>
                            </div>
                            <ul className={styles.tools}>
                                <button className={styles.updateButton} onClick={() => handleEdit(photo._id ,photo.title, photo.description)}>
                                    <IoOptionsOutline />
                                </button>
                                <PopupForm styles trigger={buttonPopup} setTrigger={setButtonPopup}>
                                    <EditForm
                                        title={editedtitle}
                                        description={editedDescription}
                                        id={editedId}
                                    />
                                </PopupForm>
                                <button className={styles.deleteButton} onClick={() => handleDelete(photo._id)}>
                                    <IoTrashOutline />
                                </button>
                            </ul>
                        </div>
                        <img
                            src={`http://localhost:3001/uploads/${photo.photo}`}
                            alt="grid_image"
                            onClick={() => largeImg(index)}
                            // style={{ transform: selectedImage === index ? "scale(1.5)" : "scale(1)" }}
                        />
                    </div>
                ))}
            </div>
            {selectedImage !== null && (
                <div className={styles.largedContainer} onClick={resetImg}>
                    <img
                        src={`http://localhost:3001/uploads/${photos[selectedImage].photo}`}
                        alt="larged_image"
                        className={styles.largedImage}
                    />
                    <button className={styles.button} onClick={resetImg}>
                        <IoCloseCircleSharp />
                    </button>
                </div>
            )}
        </>
    );
};

export default Grid;