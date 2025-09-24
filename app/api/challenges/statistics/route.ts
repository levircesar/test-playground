import { NextRequest, NextResponse } from 'next/server';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { firestore } from '@/config/firebase';

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

export async function GET(request: NextRequest) {
  try {
    console.log('🔄 Carregando estatísticas dos desafios do Firebase...');
    
    // Buscar todos os desafios do Firebase
    const challengesRef = collection(firestore, 'playground', 'challenges', 'data');
    const querySnapshot = await getDocs(challengesRef);
    
    console.log('📊 Documentos encontrados:', querySnapshot.size);
    
    const challenges: any[] = [];
    querySnapshot.forEach((doc) => {
      challenges.push({ id: doc.id, ...doc.data() });
    });
    
    // Calcular estatísticas
    const statistics: ChallengeStatistics = {
      total: challenges.length,
      byLevel: {
        facil: challenges.filter(c => c.nivel === 'Fácil').length,
        medio: challenges.filter(c => c.nivel === 'Médio').length,
        dificil: challenges.filter(c => c.nivel === 'Difícil').length,
        api: challenges.filter(c => c.nivel === 'API').length,
        apiTela: challenges.filter(c => c.nivel === 'API+Tela').length,
      },
      byType: {
        ui: challenges.filter(c => c.tipo === 'UI').length,
        upload: challenges.filter(c => c.tipo === 'Upload').length,
        iframe: challenges.filter(c => c.tipo === 'Iframe').length,
        api: challenges.filter(c => c.tipo === 'API').length,
        e2e: challenges.filter(c => c.tipo === 'E2E').length,
      }
    };
    
    console.log('✅ Estatísticas calculadas:', statistics);
    
    return NextResponse.json({
      success: true,
      data: statistics,
      timestamp: new Date().toISOString(),
      source: 'firebase'
    });
    
  } catch (error) {
    console.error('❌ Erro ao carregar estatísticas:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Erro ao carregar estatísticas do Firebase',
      data: {
        total: 0,
        byLevel: {
          facil: 0,
          medio: 0,
          dificil: 0,
          api: 0,
          apiTela: 0,
        },
        byType: {
          ui: 0,
          upload: 0,
          iframe: 0,
          api: 0,
          e2e: 0,
        }
      },
      timestamp: new Date().toISOString()
    });
  }
}
