import axios from "axios";
import { saveToken, removeToken } from "../utils/tokenUtils";

const API_URL = "http://127.0.0.1:8000/api/users";  


export const register = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register/`, { email, password });
        return response.data;
    } catch (error) {
        throw new Error("Error al registrar el usuario: " + error.response.data.detail);
    }
};

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login/`, { email, password });
        const { access, refresh } = response.data;  
        saveToken(access, refresh);  
        return response.data;
    } catch (error) {
        throw new Error("Error al iniciar sesión: " + error.response.data.detail);
    }
};
export const googleLogin = async (token) => {
    try {
        console.log("Token que se enviará al backend: ", token);  
        const response = await axios.post("http://127.0.0.1:8000/api/users/loginG/", {
            token,  
        });
        console.log("Respuesta del servidor: ", response.data);  
        return response.data;
    } catch (error) {
        console.error("Error en la autenticación con Google: ", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const logout = () => {
    removeToken();  
};
