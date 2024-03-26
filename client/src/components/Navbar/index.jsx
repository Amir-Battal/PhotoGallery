import styles from './styles.module.css';
import Auth from "../../Auth";

const Navbar = () => {
    const handelLogout = () => {
        Auth.logout();
        window.location.reload();
    };

    const handleLogin = () => {
        window.location = '/login';
    }

    return (
        <nav className={styles.navbar}>
                <div className={styles.rightSide}>
                    {/* <h1>Gallery</h1> */}
                    <a href="/">Gallery</a>
                    {Auth.auth() && (
                        <a href='/myphoto'>myPhotos</a>
                    )}
                </div>
                {Auth.auth() && (
                    <button className={styles.white_btn} onClick={handelLogout}>
                    Logout
                </button>
                )}
                {Auth.guest() && (
                    <button className={styles.white_btn} onClick={handleLogin}>
                        Login
                    </button>
                )}  
            </nav>
    );
};

export default Navbar;