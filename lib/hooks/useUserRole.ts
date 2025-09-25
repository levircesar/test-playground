import { useAuth } from '@/lib/contexts/AuthContext';

export function useUserRole() {
  const { user, userRole, isAuthenticated, isAdmin } = useAuth();

  return {
    user,
    userRole,
    isAuthenticated,
    isAdmin,
    hasRole: (role: 'basic' | 'admin') => userRole?.role === role,
    canEdit: isAdmin,
    canDelete: isAdmin,
    canCreate: isAdmin,
  };
}
