import axios from "axios";
import { saveToken, removeToken } from "../utils/tokenUtils";
import { useAuth0 } from '@auth0/auth0-react';
const API_URL = "https://dbback-1091848286124.us-central1.run.app/api/users";


export const register = async (email, password) => {
    if (!email || !password) {
        throw new Error("El correo electrónico y la contraseña son obligatorios.");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error("El formato del correo electrónico no es válido.");
    }
    if (password.length < 8) {
        throw new Error("La contraseña debe tener al menos 8 caracteres.");
    }
    try {
        const response = await axios.post(`${API_URL}/register/`, { email, password });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error("Error al registrar el usuario: " + (error.response.data.detail || error.response.data.message || error.response.statusText));
        } else if (error.request) {
            throw new Error("No se recibió respuesta del servidor. Por favor, inténtalo de nuevo más tarde.");
        } else {
            throw new Error("Error al configurar la solicitud: " + error.message);
        }
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
        const response = await axios.post(`${API_URL}/loginG/`, { token }, { headers: { 'Content-Type': 'application/json' } });
    
        localStorage.setItem('token', response.access_token)
        return response.data;
    } catch (error) {
        console.error("Error en la autenticación con Google: ", error.response ? error.response.data : error.message);
        throw error;
    }
};
