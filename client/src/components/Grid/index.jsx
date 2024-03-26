import React, { useEffect, useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import { IoOptionsOutline } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5";
import PopupForm from "../PopupForm";
import EditForm from "../EditForm";
import styles from './styles.module.css';
import axios from "axios";
import { useLocation } from "react-router-dom";
import Auth from "../../Auth";

const Grid = ({ photos }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [editedtitle, setEditedTitle] = useState("");
    const [editedDescription, setEditedDescription] = useState("");
    const [editedId , setEditedId] = useState();
    const [msg, setMsg] = useState("");
    const [likedPhotos, setLikedPhotos] = useState([]);
    const [currentUserId, setCurrentUserId] = useState("");

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(user) {
            setCurrentUserId(user.id);
        }
    }, []);

    const location = useLocation();
    const currentPath = location.pathname;
    const user = JSON.parse(localStorage.getItem("user"));

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
    };

    const handleLike = async (id) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const likedUserIds = likedPhotos.map((photo) => photo.userId);

            if (user && !likedUserIds.includes(user.id)) {
                await axios.post(`http://localhost:3001/api/photo/${id}/like`,
                                { userId: user.id }
                );
                setLikedPhotos([...likedPhotos, { photoId: id, userId: user.id }]);
            }
        } catch (error) {
            console.log(error);
        }

        window.location.reload();
    };

    const handleUnlike = async (id) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
                await axios.delete(`http://localhost:3001/api/photo/${id}/like`, { data: { userId: user.id } });
            }
        } catch (error) {
            console.log(error);
        }

        window.location.reload();
    };

    return (
        <>
            {currentPath === '/myphoto' && (
                <h1>الصور التي قمت برفعها</h1>
            ) }
            {currentPath === '/' && (
                <h1>المعرض</h1>
            )}
            <div className={styles.grid}>
                {photos.map((photo, index) => (
                    <div className={styles.grid__item} key={photo._id}>
                        <div className={styles.details}>
                            <button className={styles.like}
                                disabled = {
                                    Auth.guest()
                                }
                                onClick = {
                                    photo.likes.includes(currentUserId)
                                    ?   () => handleUnlike(photo._id)
                                    :   () => handleLike(photo._id)
                                }
                            >
                            <IoHeart
                                color={
                                    photo.likes.includes(currentUserId)
                                    ? "red"
                                    : "gray"
                                }
                            />
                            {photo.likes.length}
                            </button>
                            <div className={styles.photoHeader}>
                                <h3 className={styles.title}>{photo.title}</h3>
                                <p className={styles.description}>{photo.description}</p>
                            </div>
                            <ul className={styles.tools}>
                            {currentPath === '/myphoto' && (
                                    <>
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
                                    </>
                                )}
                                
                            </ul>
                        </div>
                        <img
                            src={`http://localhost:3001/uploads/${photo.photo}`}
                            alt="grid_image"
                            onClick={() => largeImg(index)}
                        />
                        <p className={styles.likesCount}>
                            Likes: {photo.likes.length}
                        </p>
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