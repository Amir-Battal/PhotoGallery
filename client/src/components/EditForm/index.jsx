import React from 'react';
import styles from './styles.module.css';
import axios from 'axios';
import { useFormik } from 'formik';
import { editSchema } from '../../schemas/editSchema';

const EditForm = (props) => {
    const { values, errors, touched, isSubmitting, handleBlur, handleSubmit, handleChange } = useFormik({
        initialValues: {
            title: props.title,
            description: props.description,
            error: "",
            message: ""
        },
        validationSchema: editSchema,
        onSubmit: async (values) => {
            props.setTrigger(false);
            const data = {
                title: values.title,
                description: values.description
            };

            try {
                await axios.put(`http://localhost:3001/api/photo/${props.id}`, data);
                const updatedPhotos = props.photos.map((photo) => {
                    if (photo._id === props.id) {
                        return { ...photo, title: values.title, description: values.description };
                    } else {
                        return photo;
                    }
                });
                props.setPhotos(updatedPhotos);
                values.message = "تم تحديث الملف بنجاح";
            } catch (error) {
                console.log(error);
                values.message = "هناك خطأ ما";
            }
        },
    });

    return (
        <div>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <h1>تعديل الصورة</h1>
                <label className={styles.label}>عنوان الصورة</label>
                <input
                    type="text"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="title"
                    className={errors.title && touched.title ? styles.inputError : styles.input}
                />
                {errors.title && touched.title && <p className={styles.error_msg}>{errors.title}</p>}
                <label className={styles.label}>الوصف</label>
                <input
                    type="text"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="description"
                    className={errors.description && touched.description ? styles.inputError : styles.input}
                />
                {errors.description && touched.description && <p className={styles.error_msg}>{errors.description}</p>}
                <button className={styles.editDetails} type="submit">
                    حفظ التعديلات
                </button>
            </form>
            {props.children}
        </div>
    );
};

export default EditForm;
