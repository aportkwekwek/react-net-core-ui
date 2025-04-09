import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectRoute = ({ element, allowedRoles }) => {
  const { isAuthenticated, userRoles, updateRoles, loadingContext } = useAuth();
  const [rolesLoaded, setRolesLoaded] = useState(false);

  useEffect(() => {
    if (isAuthenticated && userRoles.length === 0) {
      updateRoles();
    } else {
      setRolesLoaded(true);
    }
  }, [isAuthenticated, userRoles.length, updateRoles]);

  // Wait for auth context to load
  if (loadingContext) {
    return <div>Loading auth context...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Wait for roles to load
  if (userRoles.length === 0 && !rolesLoaded) {
    return <div>Loading roles...</div>;
  }

  if (!allowedRoles) {
    return element;
  }

  const allUserRoles = userRoles.flat();
  const hasAccess = allowedRoles.some((role) => allUserRoles.includes(role));
  if (!hasAccess) {
    return <Navigate to="/unauthorized" />;
  }

  return element;
};

export default ProtectRoute;
