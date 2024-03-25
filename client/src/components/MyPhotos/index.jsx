import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Navbar from '../Navbar';
import Grid from '../Grid';
import axios from 'axios';
import { IoAddCircleSharp } from "react-icons/io5";
import PopupForm from '../PopupForm';
import InputForm from '../InputForrm';



const MyPhoto = () => {

    const [photos, setPhotos] = useState([]);
    const [updateUI, setUpdateUI] = useState("");
    const [buttonPopup, setButtonPopup] = useState(false);
    const [timedPopup, setTimedPopup] = useState(false);



    const user = JSON.parse(localStorage.getItem('user'));


    useEffect(() => {
        axios.get(`http://localhost:3001/api/photo/author/${user.id}`)
            .then((res) => {
                console.log(res.data);
                setPhotos(res.data);
            })
            .catch((err) => console.log(err));
    }, [updateUI]);

    return (
        <div>
            <Navbar />
            <button className={styles.button} onClick={() => setButtonPopup(true)}>
                <IoAddCircleSharp />
            </button>

            <PopupForm trigger={buttonPopup} setTrigger={setButtonPopup}>
                <InputForm/>
            </PopupForm>

            <Grid photos={photos} />
        </div>
    )
}

export default MyPhoto;