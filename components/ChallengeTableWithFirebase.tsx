'use client';
import { useChallenges } from '@/lib/hooks/useChallenges';
import { applyTranslationsToChallenge } from '@/lib/challenges';
import { useLocale } from '@/lib/locale-context';
import ChallengeTable from './ChallengeTable';
import { Spin, Alert, Empty } from 'antd';

export default function ChallengeTableWithFirebase() {
  const { challenges, loading, error } = useChallenges();
  const { locale } = useLocale();

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
        <p>Carregando desafios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Erro ao carregar desafios"
        description={error}
        type="error"
        showIcon
      />
    );
  }

  // Se não houver desafios, mostrar lista vazia
  if (!challenges || challenges.length === 0) {
    return (
      <div style={{ padding: '50px' }}>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span>
              {locale === 'pt-BR' ? 'Nenhum desafio encontrado' : 
               locale === 'en-US' ? 'No challenges found' : 
               'Aucun défi trouvé'}
            </span>
          }
        />
      </div>
    );
  }

  // Aplicar traduções aos desafios vindos do Firebase
  const translatedChallenges = challenges.map(challenge => 
    applyTranslationsToChallenge(challenge, locale)
  );

  return <ChallengeTable challenges={translatedChallenges} />;
}
