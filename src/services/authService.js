import axios from "axios";
import { saveToken, removeToken } from "../utils/tokenUtils";
import { useAuth0 } from '@auth0/auth0-react';
const API_URL = "https://dbback-1091848286124.us-central1.run.app/api/users";
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
        const response = await axios.post(`${API_URL}/loginG/`, { token }, { headers: { 'Content-Type': 'application/json' } });
        console.log("Respuesta del servidor: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error en la autenticación con Google: ", error.response ? error.response.data : error.message);
        throw error;
    }
};
