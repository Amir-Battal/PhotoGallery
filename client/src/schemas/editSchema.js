import * as yup from 'yup';

export const editSchema = yup.object().shape({
    title: yup
            .string()
            .required('الرجاء إدخال عنوان للصورة'),
    description: yup
            .string()
            .required('الرجاء إدخال وصف للصورة'),
});