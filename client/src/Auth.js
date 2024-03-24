import axios from "axios";

const Auth = {
    login: user => {
        localStorage.setItem('user', JSON.stringify(user));
        axios.defaults.headers.common['Authorization'] = user.token;
    },

    auth: () => localStorage.getItem('user') !== null,

    guest: () => localStorage.getItem('user') === null,

    logout: () => {
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('user')
    }
};

export default Auth;