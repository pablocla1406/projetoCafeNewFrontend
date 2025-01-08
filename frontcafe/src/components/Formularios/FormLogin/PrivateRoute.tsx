import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  requiredPermission?: string;
}

export function PrivateRoute({ requiredPermission }: PrivateRouteProps) {
  const token = localStorage.getItem('token');
  const expirationTime = localStorage.getItem('expirationTime');
  
  // Check if token exists and is not expired
  const isTokenValid = () => {
    if (!token || !expirationTime) return false;
    return new Date().getTime() < parseInt(expirationTime);
  };

  // Check user permissions
  const hasPermission = () => {
    if (!requiredPermission) return true;
    const userPermission = localStorage.getItem('permissao');
    return userPermission === requiredPermission;
  };

  if (!isTokenValid()) {
    // Token is missing or expired
    localStorage.clear(); // Clear all stored data
    return <Navigate to="/login" replace />;
  }

  if (!hasPermission()) {
    // User doesn't have required permission
    return <Navigate to="/Home" replace />;
  }

  return <Outlet />;
}
