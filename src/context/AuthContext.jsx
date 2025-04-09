import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AxiosInstance from "../api/AxiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRoles, setUserRoles] = useState([]);
  const [loadingContext, setLoadingContext] = useState(true);

  const clearUserData = () => {
    localStorage.removeItem("RefreshToken");
    localStorage.removeItem("Username");
    localStorage.removeItem("FullName");
    localStorage.removeItem("AccessToken");
    setIsAuthenticated(false);
  };

  const login = () => {
    updateRoles();
    setIsAuthenticated(true);
    navigate("/");
  };

  const logout = () => {
    revokeToken();
    clearUserData();
    navigate("/login");
  };

  const revokeToken = async () => {
    const refreshToken = localStorage.getItem("RefreshToken");
    if (!refreshToken) {
      //Clear User Data
      return;
    }

    try {
      await AxiosInstance({
        method: "put",
        url: "/auth/revoketoken",
        data: {
          refreshToken: refreshToken,
        },
      });
    } catch (err) {
      console.error("Error revoking token:", error);
    }
  };

  const updateRoles = () => {
    const jwtToken = localStorage.getItem("AccessToken");
    if (!jwtToken) {
      setUserRoles([]);
      return;
    }
    try {
      const decodedJWT = jwtDecode(jwtToken);
      //Roles Claim Key Depends on Authentication NodeJs/.NET/Etc
      //Use console.log(decodedJWT) to check for key in roles
      const rolesClaimKey =
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

      const roles = decodedJWT[rolesClaimKey]
        ? [decodedJWT[rolesClaimKey]]
        : [];
      setUserRoles(roles);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const refreshToken = localStorage.getItem("RefreshToken");
        if (refreshToken) {
          setIsAuthenticated(true);
          updateRoles();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingContext(false);
      }
    };
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        userRoles,
        updateRoles,
        loadingContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
