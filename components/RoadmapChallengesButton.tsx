'use client';
import { useState } from 'react';
import { Button, Modal, Space } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import { useLocale } from '@/lib/locale-context';
import { getTranslations } from '@/lib/translations';
import { getChallenges, Challenge } from '@/lib/challenges';
import ChallengeTable from './ChallengeTable';

interface RoadmapChallengesButtonProps {
  level: string;
  testId?: string;
}

export default function RoadmapChallengesButton({ level, testId }: RoadmapChallengesButtonProps) {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const [modalVisible, setModalVisible] = useState(false);
  
  // Mapeamento entre níveis traduzidos e níveis originais do JSON
  const levelMapping: Record<string, string> = {
    // PT-BR
    'Fácil': 'Fácil',
    'Médio': 'Médio', 
    'Difícil': 'Difícil',
    'API': 'API',
    'API+Tela': 'API+Tela',
    // EN-US
    'Easy': 'Fácil',
    'Medium': 'Médio',
    'Hard': 'Difícil', 
    'API+Screen': 'API+Tela',
    // FR-FR
    'Facile': 'Fácil',
    'Moyen': 'Médio',
    'Difficile': 'Difícil',
    'API+Écran': 'API+Tela'
  };
  
  const allChallenges = getChallenges(locale);
  const originalLevel = levelMapping[level] || level;
  const filteredChallenges = allChallenges.filter(challenge => challenge.nivel === originalLevel);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        icon={<UnorderedListOutlined />}
        onClick={showModal}
        data-testid={testId}
      >
        {t.roadmap.viewChallenges}
      </Button>

      <Modal
        title={`${t.roadmap.challenges} - ${level}`}
        open={modalVisible}
        onCancel={hideModal}
        footer={null}
        width={1000}
        data-testid="pp:roadmap|challenges-modal|root"
      >
        <ChallengeTable challenges={filteredChallenges} />
      </Modal>
    </>
  );
}
