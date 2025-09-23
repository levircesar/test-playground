'use client';
import { useState } from 'react';
import { Button, Modal, Space } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import { useLocale } from '@/lib/locale-context';
import { getTranslations } from '@/lib/translations';
import { getChallenges, Challenge } from '@/lib/challenges';
import ChallengeTable from './ChallengeTable';

interface RoadmapChallengesButtonProps {
  level: 'Fácil' | 'Médio' | 'Difícil' | 'API' | 'API+Tela';
  testId?: string;
}

export default function RoadmapChallengesButton({ level, testId }: RoadmapChallengesButtonProps) {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const [modalVisible, setModalVisible] = useState(false);
  
  const allChallenges = getChallenges();
  const filteredChallenges = allChallenges.filter(challenge => challenge.nivel === level);

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
