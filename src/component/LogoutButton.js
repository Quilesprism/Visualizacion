import { useAuth0 } from "@auth0/auth0-react";
import { removeToken, isCustomAuthenticated } from "./tokenService";

const LogoutButton = () => {
  const { logout: auth0Logout, isAuthenticated: isAuth0Authenticated } = useAuth0();

  const handleLogout = () => {
    if (isAuth0Authenticated) {
      console.log("Cerrando sesión con Auth0...");
      auth0Logout({ returnTo: window.location.origin });
    } else if (isCustomAuthenticated()) {
      console.log("Cerrando sesión con el sistema propio...");
      removeToken();
      window.location.href = "/";
    } else {
      console.warn("No hay sesión activa para cerrar.");
    }
  };

  return (
    <button onClick={handleLogout}>
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;
