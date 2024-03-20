import styles from "./styles.module.css";
import Auth from "../../Auth";

const Main = () => {
    const handelLogout = () => {
        Auth.logout();
        window.location.reload();
    };

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>Gallery</h1>
                <button className={styles.white_btn} onClick={handelLogout}>
                    Logout
                </button>
            </nav>
        </div>
    );
};

export default Main;