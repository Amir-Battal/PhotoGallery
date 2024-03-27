import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Auth from "../../Auth";

const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(data.password !== data.confirmPassword){
            setError("كلمة المرور غير متطابقة");
            return;
        }
        
        try {
            const url = "https://photo-gallery-server-indol.vercel.app/api/auth/register";
            const { data: res } = await axios.post(url, data)
                                            .then(res => {
                                                Auth.login(res.data);
                                                window.location = "/";
                                            });
            navigate("/");
            console.log(res.message);
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

    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>مرحبا بك مجددا</h1>
                    <Link to="/login">
                        <button type="button" className={styles.white_btn}>
                            تسجيل دخول
                        </button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>إنشاء حساب جديد</h1>
                        <input 
                            type="text" 
                            placeholder="الاسم"
                            name="name"
                            onChange={handleChange}
                            value={data.name}
                            required
                            className={styles.input}
                        />
                        <input
                            type="email"
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
                        <input 
                            type="password"
                            placeholder="تأكيد كلمة المرور"
                            name="confirmPassword"
                            onChange={handleChange}
                            value={data.confirmPassword}
                            required
                            className={styles.input}
                        />
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit" className={styles.green_btn}>
                            إنشاء حساب
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;