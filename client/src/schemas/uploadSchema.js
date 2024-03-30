import * as yup from 'yup';

export const uploadSchema = yup.object().shape({
    title: yup
            .string()
            .required('الرجاء إدخال عنوان للصورة'),
    description: yup
            .string()
            .required('الرجاء إدخال وصف للصورة'),
    photo: yup
            .mixed()
            .required('الرجاء اختيار صورة للرفع')
});