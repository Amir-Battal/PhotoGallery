import { useState } from "react";
import styles from "./styles.module.css";
import Navbar from "../Navbar";
import Grid from "../Grid";
import PopupForm from "../PopupForm";
import InputForm from "../InputForrm";
import { IoAddCircleSharp } from "react-icons/io5";
import Auth from "../../Auth";


const Main = () => {
    const [buttonPopup, setButtonPopup] = useState(false);


    return (
        <div className={styles.main_container}>
            <Navbar/>
            
            {Auth.auth() && (
                <>
                    <button className={styles.button} onClick={() => setButtonPopup(true)}>
                        <IoAddCircleSharp />
                    </button>
                    <PopupForm trigger={buttonPopup} setTrigger={setButtonPopup}>
                        <InputForm/>
                    </PopupForm>
                </>
            )}

            <Grid/>
        </div>
    );
};

export default Main;