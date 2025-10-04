'use client';
import { useState } from 'react';
import { 
  Card, 
  Collapse, 
  Typography, 
  Spin, 
  Empty,
  Space,
  Tag,
  Row,
  Col
} from 'antd';
import { 
  PlayCircleOutlined, 
  CalendarOutlined,
  YoutubeOutlined
} from '@ant-design/icons';
import { useVideos, Video } from '@/lib/hooks/useVideos';
import { useLocale } from '@/lib/locale-context';
import { getTranslations } from '@/lib/translations';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

export default function VideosPage() {
  const { videos, loading } = useVideos();
  const { locale } = useLocale();
  const t = getTranslations(locale);

  // Função para extrair ID do YouTube
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getVideoType = (url: string) => {
    const extension = url.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'mp4':
        return 'MP4';
      case 'avi':
        return 'AVI';
      case 'mov':
        return 'MOV';
      case 'webm':
        return 'WebM';
      default:
        return 'Vídeo';
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <Title level={1}>
          <PlayCircleOutlined style={{ marginRight: '12px', color: '#1890ff' }} />
          {t.videos.title}
        </Title>
        <Paragraph style={{ fontSize: '16px', color: '#666' }}>
          {t.videos.description}
        </Paragraph>
      </div>

      <Spin spinning={loading}>
        {videos.length === 0 ? (
          <Card>
            <Empty
              description={t.videos.noVideosAvailable}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </Card>
        ) : (
          <Collapse
            size="large"
            expandIconPosition="right"
            style={{ 
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            {videos.map((video, index) => (
              <Panel
                key={video.id}
                header={
                  <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                    <Col flex="auto">
                      <Space direction="vertical" size="small">
                        <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
                          <Space>
                            <span>{video.title}</span>
                            {video.useYoutube && (
                              <YoutubeOutlined style={{ color: '#ff0000', fontSize: '18px' }} title="Vídeo do YouTube" />
                            )}
                          </Space>
                        </Title>
                        <Space size="small">
                          <Tag icon={<CalendarOutlined />} color="blue">
                            {formatDate(video.createdAt)}
                          </Tag>
                        </Space>
                      </Space>
                    </Col>
                    <Col>
                      <PlayCircleOutlined 
                        style={{ 
                          fontSize: '24px', 
                          color: '#1890ff',
                          marginRight: '16px'
                        }} 
                      />
                    </Col>
                  </Row>
                }
                style={{ 
                  marginBottom: index < videos.length - 1 ? '8px' : 0,
                  border: '1px solid #f0f0f0',
                  borderRadius: '6px'
                }}
              >
                <div style={{ padding: '16px 0' }}>
                  <Row gutter={[24, 16]}>
                    <Col xs={24} lg={16}>
                      <div style={{ marginBottom: '16px' }}>
                        {video.useYoutube && video.youtubeUrl ? (
                          <div style={{
                            width: '100%',
                            maxHeight: '400px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            overflow: 'hidden'
                          }}>
                            <iframe
                              width="100%"
                              height="400"
                              src={`https://www.youtube.com/embed/${getYouTubeId(video.youtubeUrl)}`}
                              title={video.title}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              style={{
                                borderRadius: '8px',
                                width: '100%',
                                height: '400px'
                              }}
                            />
                          </div>
                        ) : (
                          <video
                            controls
                            style={{
                              width: '100%',
                              maxHeight: '400px',
                              borderRadius: '8px',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                            }}
                            poster={video.thumbnailUrl}
                          >
                            <source src={video.videoUrl} type="video/mp4" />
                            <source src={video.videoUrl} type="video/webm" />
                            {t.videos.browserNotSupported}
                          </video>
                        )}
                      </div>
                    </Col>
                    <Col xs={24} lg={8}>
                      <Card 
                        size="small" 
                        title={t.videos.videoDetails}
                        style={{ height: 'fit-content' }}
                      >
                        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                          <div>
                            <Text strong>Descrição:</Text>
                            <Paragraph 
                              style={{ 
                                marginTop: '8px',
                                whiteSpace: 'pre-wrap',
                                color: '#666'
                              }}
                            >
                              {video.description}
                            </Paragraph>
                          </div>
                          

                          <div>
                            <a 
                              href={video.useYoutube && video.youtubeUrl ? video.youtubeUrl : video.videoUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ 
                                display: 'inline-block',
                                padding: '8px 16px',
                                background: video.useYoutube ? '#ff0000' : '#1890ff',
                                color: 'white',
                                borderRadius: '6px',
                                textDecoration: 'none',
                                fontWeight: 'bold'
                              }}
                            >
                              {video.useYoutube ? (
                                <>
                                  <YoutubeOutlined style={{ marginRight: '6px' }} />
                                  {t.videos.watchOnYoutube}
                                </>
                              ) : (
                                <>
                                  <PlayCircleOutlined style={{ marginRight: '6px' }} />
                                  {t.videos.watchInNewTab}
                                </>
                              )}
                            </a>
                          </div>
                        </Space>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </Panel>
            ))}
          </Collapse>
        )}
      </Spin>

      <div style={{ textAlign: 'center', marginTop: '32px', color: '#999' }}>
        <Text>
          {t.videos.totalVideos}: {videos.length} | 
          {t.videos.lastUpdate}: {new Date().toLocaleDateString(locale === 'pt-BR' ? 'pt-BR' : locale === 'en-US' ? 'en-US' : 'fr-FR')}
        </Text>
      </div>
    </div>
  );
}
