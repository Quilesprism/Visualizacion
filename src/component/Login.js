import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { login, googleLogin } from "../services/authService";
import "../public/css/login.css";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { loginWithPopup, getIdTokenClaims, isAuthenticated } = useAuth0();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/home");
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); 
        try {
            await login(email, password); 
            navigate("/home");
        } catch (error) {
            setError("Error al iniciar sesión. Verifica tus credenciales.");
        }
    };

    const handleAuth0Login = async () => {
        setError(""); 
        try {
           
            await loginWithPopup();
            const idToken = await getIdTokenClaims();
            if (!idToken || !idToken.__raw) {
                throw new Error("No se generó el token de Auth0.");
            }
            const token = idToken.__raw;
            await googleLogin(token);
        } catch (error) {
            console.error("Error durante el inicio de sesión con Auth0:", error);
            setError(error.message || "Error al iniciar sesión con Auth0.");
        }
    };

    return (
        <div className="container">
            <div className="image-container">
                <img src="/assets/chat_wo_background3.png" alt="Chat logo"/>

            </div>
            <div className="login-container">
                <h2>Iniciar Sesión</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="Login" type="submit">Iniciar Sesión</button>
                </form>
                <button className="gsi-material-button" onClick={handleAuth0Login}>
                    <div className="gsi-material-button-content-wrapper">
                        <div className="gsi-material-button-icon">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                            </svg>
                        </div>
                        <span className="gsi-material-button-contents">Sign in with Google</span>
                    </div>
                </button>
                <p className="register-link">
                    ¿No tienes una cuenta?{" "}
                    <Link to="/register">Registrarse</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;