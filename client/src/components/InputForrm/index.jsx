import React, { useState } from 'react';
import styles from './styles.module.css';
import axios from 'axios';
import { useFormik } from 'formik';
import { uploadSchema } from '../../schemas/uploadSchema';

const InputForm = (props) => {
    const [error, setError] = useState("");
    const user = JSON.parse(localStorage.getItem('user'));

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            photo: null,
            author: "",
            error: "",
            message: ""
        },
        validationSchema: uploadSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);

            try {
                if (!values.photo) {
                    setError("يجب عليك اختيار صورة");
                    return;
                }

                const formData = new FormData();
                formData.append("title", values.title);
                formData.append("description", values.description);
                formData.append("photo", values.photo);
                formData.append("author", user.id);

                const response = await axios.post('http://localhost:3001/api/photo/save', formData);
                if (response.data.Status === 'Success') {
                    formik.resetForm();
                    formik.setValues({ ...formik.values, message: "تم رفع الملف بنجاح" });
                } else {
                    // setError("هناك خطأ ما");
                    formik.resetForm();
                    formik.setValues({ ...formik.values, message: "تم رفع الملف بنجاح" });
                }
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    setError(error.response.data.message);
                }
            }

            setSubmitting(false);
            window.location.reload();
        },
    });

    const handleChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
            if (!allowedFileTypes.includes(selectedFile.type)) {
                setError("الرجاء اختيار ملف من نوع JPEG أو JPG أو PNG.");
            } else {
                formik.setFieldValue('photo', selectedFile);
            }
        }
    };

    return (
        <div>
            <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
                <h1>إضافة صورة جديدة</h1>
                <label className={styles.label}>عنوان الصورة</label>
                <input
                    type="text"
                    placeholder='ادخل عنوان الصورة'
                    name='title'
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={formik.errors.title && formik.touched.title ? styles.inputError : styles.input}
                />
                {formik.errors.title && formik.touched.title && <p className={styles.error_msg}>{formik.errors.title}</p>}
                <label className={styles.label}>وصف الصورة</label>
                <input
                    type="text"
                    placeholder='ادخل وصف الصورة'
                    name='description'
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={formik.errors.description && formik.touched.description ? styles.inputError : styles.input}
                />
                {formik.errors.description && formik.touched.description && <p className={styles.error_msg}>{formik.errors.description}</p>}
                <label>ارفع الصورة</label>
                <input
                    type="file"
                    name="file_picker"
                    id="file_picker"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    className={formik.errors.photo && formik.touched.photo ? styles.inputError : ""}
                />
                {formik.errors.photo && formik.touched.photo && <p className={styles.error_msg}>{formik.errors.photo}</p>}
                {error && <p className={styles.error_msg}>{error}</p>}
                <button className={styles.addPhoto} type="submit" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? "جاري الرفع..." : "إضافة الصورة"}
                </button>
            </form>
            {props.children}
        </div>
    );
};

export default InputForm;
