import styles from './styles.module.css';
import Auth from "../../Auth";

const Navbar = () => {
    const handelLogout = () => {
        Auth.logout();
        window.location.reload();
    };

    return (
        <nav className={styles.navbar}>
                <h1>Gallery</h1>
                <button className={styles.white_btn} onClick={handelLogout}>
                    Logout
                </button>
            </nav>
    );
};

export default Navbar;