import * as yup from 'yup'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const basicSchema = yup.object().shape({
    name: yup
            .string()
            .required("هذا الحقل مطلوب"),
    email: yup
            .string()
            .email("الرجاء إدخال بريد صالح.")
            .required("هذا الحقل مطلوب"),
    password: yup
            .string()
            .min(8)
            .matches(passwordRules, {message: "الرجاء إنشاء كلمة مرور اقوى"})
            .required("هذا الحقل مطلوب"),
    confirmPassword: yup
                        .string()
                        .oneOf([yup.ref('password'), null], "كلمة السر غير متطابقة")
                        .required("هذا الحقل مطلوب")
                        

});