import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'sonner';

interface PrivateRouteProps {
  requiredPermission?: string;
}

export function PrivateRoute({ requiredPermission }: PrivateRouteProps) {
  const token = localStorage.getItem('token');
  const expirationTime = localStorage.getItem('expirationTime');
  
  const isTokenValid = () => {
    if (!token || !expirationTime) {
      toast.error('Sessão expirada. Por favor, faça login novamente.');
      return false;
    }
    const isValid = new Date().getTime() < parseInt(expirationTime);
    if (!isValid) {
      toast.error('Sessão expirada. Por favor, faça login novamente.');
    }
    return isValid;
  };

  const hasPermission = () => {
    if (!requiredPermission) return true;
    const userPermission = localStorage.getItem('permissao');
    
    if (userPermission === 'ADMIN') return true;
    
    if (userPermission === 'AUX') {
      return ['AUX', 'USER'].includes(requiredPermission);
    }
    
    if (userPermission === 'USER') {
      return requiredPermission === 'USER';
    }

    toast.error('Você não tem permissão para acessar esta página');
    return false;
  };

  if (!isTokenValid()) {
    localStorage.clear(); 
    toast.error('Sessão expirada. Por favor, faça login novamente.');
    return <Navigate to="/login" replace />;
  }

  if (!hasPermission()) {
    toast.error('Você não tem permissão para acessar esta página.');
    return null;
  }

  return <Outlet />;
}
