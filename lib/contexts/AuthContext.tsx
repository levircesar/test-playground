'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/config/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
  refreshAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🔐 AuthProvider: Inicializando listener de autenticação...');
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('🔐 AuthProvider: Estado de autenticação mudou:', user ? 'Usuário logado' : 'Usuário não logado');
      
      if (user) {
        // Usuário logado - obter token e salvar em cookie
        try {
          const token = await user.getIdToken();
          if (typeof document !== 'undefined') {
            document.cookie = `firebase-auth-token=${token}; path=/; max-age=3600; secure; samesite=strict`;
            console.log('🔐 AuthProvider: Token salvo em cookie');
          }
        } catch (error) {
          console.error('🔐 AuthProvider: Erro ao obter token:', error);
        }
      } else {
        // Usuário não logado - remover cookie
        if (typeof document !== 'undefined') {
          document.cookie = 'firebase-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
          console.log('🔐 AuthProvider: Cookie removido');
        }
      }
      
      setUser(user);
      setLoading(false);
    });

    return () => {
      console.log('🔐 AuthProvider: Limpando listener de autenticação');
      unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      console.log('🔐 AuthProvider: Fazendo logout...');
      await firebaseSignOut(auth);
      console.log('🔐 AuthProvider: Logout realizado com sucesso');
    } catch (error) {
      console.error('🔐 AuthProvider: Erro no logout:', error);
      throw error;
    }
  };

  const refreshAuth = () => {
    console.log('🔐 AuthProvider: Forçando refresh da autenticação...');
    setLoading(true);
    // Força uma nova verificação do estado de autenticação
    setTimeout(() => {
      setLoading(false);
    }, 100);
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    signOut,
    refreshAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
