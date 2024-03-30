import React, { useState } from 'react';
import styles from './styles.module.css';
import Navbar from '../Navbar';
import Grid from '../Grid';
import { IoAddCircleSharp } from "react-icons/io5";
import PopupForm from '../PopupForm';
import InputForm from '../InputForrm';



const MyPhoto = () => {
    const [buttonPopup, setButtonPopup] = useState(false);
    
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div>
            <Navbar />
            
            <button className={styles.button} onClick={() => setButtonPopup(true)}>
                <IoAddCircleSharp />
            </button>
            <PopupForm trigger={buttonPopup} setTrigger={setButtonPopup}>
                <InputForm/>
            </PopupForm>

            <Grid/>
        </div>
    )
}

export default MyPhoto;