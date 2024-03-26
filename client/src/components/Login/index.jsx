import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import Auth from "../../Auth";

const Login = () => {
    
    const [data, setData] = useState({ email: "", password: ""});
    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:3001/api/auth";
            // const { data: res } = await axios.post(url, data);
            // localStorage.setItem("token", res.data);
            // window.location = "/";
            axios.post(url, data)
                .then(res => {
                    Auth.login(res.data);
                    window.location = "/";
                })
        } catch (error) {
            if(
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };

    
    return(
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>تسجيل الدخول لحسابك</h1>
                        <input
                            type = "email"
                            placeholder="البريد الالكتروني"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="كلمة المرور"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit" className={styles.green_btn}>
                            تسجيل دخول
                        </button>
                    </form>
                    <button className={styles.green_btn}>
                        <a className={styles.guest} href="/">
                            الدخول كضيف
                        </a>
                    </button>
                </div>
                <div className={styles.right}>
                    <h1>ليس لدي حساب</h1>
                    <Link to="/register">
                        <button type="button" className={styles.white_btn}>
                            إنشاء حساب
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;