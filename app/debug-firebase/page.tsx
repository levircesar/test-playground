'use client';
import { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { firestore } from '@/config/firebase';
import { Card, Typography, Space, Button, Tag, Divider } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export default function DebugFirebase() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const testFirebase = async () => {
    setLoading(true);
    setResults(null);

    try {
      console.log('🔍 Testando conexão com Firebase...');
      
      // Teste 1: Listar todos os documentos na coleção
      const challengesRef = collection(firestore, 'playground', 'challenges', 'data');
      const querySnapshot = await getDocs(challengesRef);
      
      console.log('📊 Documentos encontrados:', querySnapshot.size);
      
      const documents: any[] = [];
      querySnapshot.forEach((doc) => {
        console.log('📄 Documento:', doc.id, doc.data());
        documents.push({
          id: doc.id,
          data: doc.data()
        });
      });

      setResults({
        success: true,
        documentsFound: querySnapshot.size,
        documents: documents,
        error: null
      });

    } catch (error: any) {
      console.error('❌ Erro no teste:', error);
      setResults({
        success: false,
        documentsFound: 0,
        documents: [],
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testFirebase();
  }, []);

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Title level={2}>🔍 Debug Firebase</Title>
            <Paragraph>
              Teste de conexão e carregamento de dados do Firestore
            </Paragraph>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Button 
              type="primary" 
              icon={<ReloadOutlined />}
              loading={loading}
              onClick={testFirebase}
            >
              Testar Firebase
            </Button>
          </div>

          {results && (
            <div>
              <Divider />
              
              <div>
                <Title level={4}>Status:</Title>
                <Tag color={results.success ? 'green' : 'red'}>
                  {results.success ? '✅ Sucesso' : '❌ Erro'}
                </Tag>
              </div>

              <div>
                <Title level={4}>Documentos Encontrados:</Title>
                <Text strong>{results.documentsFound}</Text>
              </div>

              {results.error && (
                <div>
                  <Title level={4}>Erro:</Title>
                  <Text code style={{ color: '#ff4d4f' }}>
                    {results.error}
                  </Text>
                </div>
              )}

              {results.documents.length > 0 && (
                <div>
                  <Title level={4}>Documentos:</Title>
                  <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    {results.documents.map((doc: any, index: number) => (
                      <Card key={index} size="small">
                        <Space direction="vertical" size="small" style={{ width: '100%' }}>
                          <div>
                            <Text strong>ID:</Text> <Text code>{doc.id}</Text>
                          </div>
                          <div>
                            <Text strong>Dados:</Text>
                            <pre style={{ 
                              background: '#f5f5f5', 
                              padding: '8px', 
                              borderRadius: '4px',
                              fontSize: '12px',
                              marginTop: '4px',
                              overflow: 'auto'
                            }}>
                              {JSON.stringify(doc.data, null, 2)}
                            </pre>
                          </div>
                        </Space>
                      </Card>
                    ))}
                  </Space>
                </div>
              )}
            </div>
          )}

          <Divider />
          
          <div style={{ 
            background: '#f5f5f5', 
            padding: '16px', 
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '12px'
          }}>
            <Title level={5}>📝 Caminho da Coleção:</Title>
            <Text code>/playground/challenges/data</Text>
          </div>
        </Space>
      </Card>
    </div>
  );
}
