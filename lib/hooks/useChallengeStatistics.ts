import { useState, useEffect } from 'react';

export interface ChallengeStatistics {
  total: number;
  byLevel: {
    facil: number;
    medio: number;
    dificil: number;
    api: number;
    apiTela: number;
  };
  byType: {
    ui: number;
    upload: number;
    iframe: number;
    api: number;
    e2e: number;
  };
}

interface ApiResponse {
  success: boolean;
  data: ChallengeStatistics;
  error?: string;
  timestamp: string;
}

export function useChallengeStatistics() {
  const [statistics, setStatistics] = useState<ChallengeStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStatistics = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Carregando estatísticas dos desafios...');
      
      const response = await fetch('/api/challenges/statistics');
      const result: ApiResponse = await response.json();
      
      if (result.success) {
        console.log('✅ Estatísticas carregadas:', result.data);
        setStatistics(result.data);
      } else {
        console.warn('⚠️ API retornou erro, usando dados fallback:', result.error);
        setStatistics(result.data); // Usar dados fallback
      }
    } catch (err) {
      console.error('❌ Erro ao carregar estatísticas:', err);
      setError('Erro ao carregar estatísticas dos desafios');
      
      // Não usar fallback - mostrar dados reais ou erro
      setStatistics(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatistics();
  }, []);

  return {
    statistics,
    loading,
    error,
    reloadStatistics: loadStatistics,
  };
}
