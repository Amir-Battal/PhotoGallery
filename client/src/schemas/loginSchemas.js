import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup
            .string()
            .required("هذا الحقل مطلوب"),
    password: yup
            .string()
            .required("هذا الحقل مطلوب")
});