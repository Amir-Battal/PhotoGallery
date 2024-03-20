import axios from "axios";

const Auth = {
    login: user => {
        localStorage.setItem('user', JSON.stringify(user));
        axios.defaults.headers.common['Authorization'] = user.token;
    },

    logout: () => {
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('user')
    }
};

export default Auth;