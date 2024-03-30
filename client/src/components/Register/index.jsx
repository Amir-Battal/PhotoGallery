import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Auth from "../../Auth";
import { useFormik } from 'formik';
import { basicSchema } from '../../schemas'


const Register = () => {
    const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            name: "",
            email: "",  
            password: "",
            confirmPassword: "",
            error: "",
        },
        validationSchema: basicSchema,
        onSubmit: async (values, {setError}) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            try {
                const url = "http://localhost:3001/api/auth/register";
                const { data: res } = await axios.post(url, values)
                                                .then(res => {
                                                    Auth.login(res.data);
                                                    window.location = "/";
                                                })
                                                .catch(err => {
                                                    if(err.response && err.response.status === 422){
                                                        errors.error = "هذا البريد مسجل مسبقا"
                                                    } else {
                                                        errors.error = "حدث خطأ ما"
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
        },
    });

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
                            onBlur={handleBlur}
                            value={values.name}
                            className={errors.name && touched.name ? styles.inputError : styles.input}
                        />
                        {errors.name && touched.name && <p className={styles.error_msg}>{errors.name}</p>}
                        <input
                            type="email"
                            placeholder="البريد الالكتروني"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            className={errors.email && touched.email ? styles.inputError : styles.input}
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
                        <input 
                            type="password"
                            placeholder="تأكيد كلمة المرور"
                            name="confirmPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmPassword}
                            className={errors.confirmPassword && touched.confirmPassword ? styles.inputError : styles.input}
                        />
                        {errors.confirmPassword && touched.confirmPassword && <p className={styles.error_msg}>{errors.confirmPassword}</p>}
                        {errors.error && <p className={styles.error_msg}>{errors.error}</p>}
                        <button disabled={isSubmitting} type="submit" className={styles.green_btn}>
                            إنشاء حساب
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;