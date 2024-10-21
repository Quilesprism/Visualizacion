import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"; 
import { login, googleLogin } from "../services/authService"; 

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { loginWithPopup, getIdTokenClaims, user, isAuthenticated } = useAuth0();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/home");
        } catch (error) {
            setError("Error al iniciar sesión. Verifica tus credenciales.");
        }
    };

    const handleAuth0Login = async () => {
        try {

            
            
            console.log(user)
            const idToken = await getIdTokenClaims();
            if (!idToken || !idToken.__raw) {
                throw new Error("No se generó el token de Auth0.");
            }
            const token = idToken.__raw;
            console.log("Token obtenido:", token); 

            await googleLogin(token)
            isAuthenticated && (  
                navigate("/home")
        )
        } catch (error) {
            console.error("Error durante el proceso de inicio de sesión con Auth0:", error);
            setError(error.message || "Error al iniciar sesión con Auth0.");
        }
    };
    
    return (
        
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md text-center">
                <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mb-3 p-2 border border-gray-300 rounded w-full"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mb-3 p-2 border border-gray-300 rounded w-full"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                    >
                        Iniciar Sesión
                    </button>
                </form>
                <button
                    onClick={handleAuth0Login}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4 w-full"
                >
                    Iniciar sesión con Google
                </button>
            </div>
        </div>
    );
};

export default Login;
