import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'sonner';

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

  // Check user permissions with hierarchy
  const hasPermission = () => {
    if (!requiredPermission) return true;
    const userPermission = localStorage.getItem('permissao');
    
    // ADMIN can access everything
    if (userPermission === 'ADMIN') return true;
    
    // AUX can access AUX and USER routes
    if (userPermission === 'AUX') {
      return ['AUX', 'USER'].includes(requiredPermission);
    }
    
    // USER can only access USER routes
    if (userPermission === 'USER') {
      return requiredPermission === 'USER';
    }

    return false;
  };

  if (!isTokenValid()) {
    // Token is missing or expired
    localStorage.clear(); // Clear all stored data
    toast.error('Sessão expirada. Por favor, faça login novamente.');
    return <Navigate to="/login" replace />;
  }

  if (!hasPermission()) {
    // User doesn't have required permission
    toast.error('Você não tem permissão para acessar esta página.');
    return <Navigate to="/Home" replace />;
  }

  return <Outlet />;
}
