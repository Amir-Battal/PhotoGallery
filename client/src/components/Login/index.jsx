import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import Auth from "../../Auth";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas/loginSchemas";

const Login = () => {
    const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            email: "",
            password: "",
            error: ""
        },
        validationSchema: loginSchema,  
        onSubmit: async(values, {setError}) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            try {
                const url = "http://localhost:3001/api/auth";
                await axios.post(url, values)
                    .then(res => {
                        Auth.login(res.data);
                        window.location = "/";
                    })
                    .catch(err => {
                        if (err.response && err.response.status === 404) {
                            errors.error = "الرجاء التحقق من البريد الالكتروني وكلمة المرور.";
                        } else {
                            errors.error = "الرجاء التحقق من البريد الالكتروني وكلمة المرور.";
                        }
                    });
            } catch (error) {
                if(
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500    
                ) {
                    setError(error.response.data.message);
                }
            }
        }
    })
    
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
                            onBlur={handleBlur}
                            value={values.email}
                            className={ errors.email && touched.email ? styles.inputError : styles.input}
                        />
                        {errors.email && touched.email && <p className={styles.error_msg}>{errors.email}</p>}
                        <input
                            type="password"
                            placeholder="كلمة المرور"
                            name="password" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            className={errors.password && touched.password ? styles.inputError : styles.input}
                        />
                        {errors.password && touched.password && <p className={styles.error_msg}>{errors.password}</p>}
                        {errors.error && <div className={styles.error_msg}>{errors.error}</div>}
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