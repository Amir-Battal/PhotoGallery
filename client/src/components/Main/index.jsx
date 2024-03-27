import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Navbar from "../Navbar";
import Grid from "../Grid";
import axios from "axios";
import PopupForm from "../PopupForm";
import InputForm from "../InputForrm";
import { IoAddCircleSharp } from "react-icons/io5";
import Auth from "../../Auth";


const Main = () => {
    const [photos, setPhotos] = useState([]);
    const [updateUI, setUpdateUI] = useState("");
    const [buttonPopup, setButtonPopup] = useState(false);
    const [timedPopup, setTimedPopup] = useState(false);

    useEffect(() => {
        axios.get("/get")
            .then((res) => {
                console.log(res.data);
                setPhotos(res.data);

            })
            .catch((err) => console.log(err));
    }, [updateUI]);

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

            <Grid photos={photos} />
        </div>
    );
};

export default Main;