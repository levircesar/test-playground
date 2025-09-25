'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '@/config/firebase';

interface UserRole {
  uid: string;
  email: string;
  displayName: string;
  role: 'basic' | 'admin';
  createdAt: Date;
  lastLogin: Date;
}

interface AuthContextType {
  user: User | null;
  userRole: UserRole | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
  refreshAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  const saveOrUpdateUserRole = async (user: User) => {
    try {
      console.log('🔐 AuthProvider: Salvando/atualizando dados do usuário...');
      
      const userRef = doc(firestore, 'playground', user.uid);
      const userSnap = await getDoc(userRef);
      
      const now = new Date();
      
      if (userSnap.exists()) {
        // Usuário existe - atualizar último login
        await setDoc(userRef, {
          lastLogin: now
        }, { merge: true });
        
        const userData = userSnap.data();
        setUserRole({
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
          role: userData.role || 'basic',
          createdAt: userData.createdAt?.toDate() || now,
          lastLogin: now
        });
        
        console.log('🔐 AuthProvider: Usuário atualizado - Role:', userData.role || 'basic');
      } else {
        // Usuário novo - criar com role basic
        const newUserData = {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
          role: 'basic' as const,
          createdAt: now,
          lastLogin: now
        };
        
        await setDoc(userRef, newUserData);
        setUserRole(newUserData);
        
        console.log('🔐 AuthProvider: Novo usuário criado com role: basic');
      }
    } catch (error) {
      console.error('🔐 AuthProvider: Erro ao salvar dados do usuário:', error);
    }
  };

  useEffect(() => {
    console.log('🔐 AuthProvider: Inicializando listener de autenticação...');
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('🔐 AuthProvider: Estado de autenticação mudou:', user ? 'Usuário logado' : 'Usuário não logado');
      
      if (user) {
        // Usuário logado - obter token, salvar em cookie e dados do usuário
        try {
          const token = await user.getIdToken();
          if (typeof document !== 'undefined') {
            document.cookie = `firebase-auth-token=${token}; path=/; max-age=3600; secure; samesite=strict`;
            console.log('🔐 AuthProvider: Token salvo em cookie');
          }
          
          // Salvar/atualizar dados do usuário na coleção users
          await saveOrUpdateUserRole(user);
        } catch (error) {
          console.error('🔐 AuthProvider: Erro ao obter token ou salvar usuário:', error);
        }
      } else {
        // Usuário não logado - remover cookie e role
        if (typeof document !== 'undefined') {
          document.cookie = 'firebase-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
          console.log('🔐 AuthProvider: Cookie removido');
        }
        setUserRole(null);
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
    userRole,
    loading,
    isAuthenticated: !!user,
    isAdmin: userRole?.role === 'admin',
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
