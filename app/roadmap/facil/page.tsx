'use client';
import { 
  Button, 
  Input, 
  InputNumber, 
  Select, 
  Cascader, 
  Checkbox, 
  Radio, 
  DatePicker, 
  TimePicker,
  Slider,
  Rate,
  Switch,
  Tabs,
  Collapse,
  Modal,
  Tooltip,
  Table,
  Space,
  Typography,
  Card,
  Row,
  Col,
  message
} from 'antd';
import { 
  PlusOutlined, 
  MinusOutlined, 
  InfoCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useState } from 'react';
import XPathTester from '@/components/XPathTester';
import BackButton from '@/components/BackButton';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;

export default function FacilPage() {
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [sliderValue, setSliderValue] = useState(30);
  const [rateValue, setRateValue] = useState(3);

  const cascaderOptions = [
    {
      value: 'brasil',
      label: 'Brasil',
      children: [
        { value: 'sp', label: 'São Paulo' },
        { value: 'rj', label: 'Rio de Janeiro' },
        { value: 'mg', label: 'Minas Gerais' },
      ],
    },
    {
      value: 'eua',
      label: 'Estados Unidos',
      children: [
        { value: 'ny', label: 'Nova York' },
        { value: 'ca', label: 'Califórnia' },
        { value: 'tx', label: 'Texas' },
      ],
    },
  ];

  const tableData = [
    { id: 1, name: 'João Silva', age: 25, city: 'São Paulo' },
    { id: 2, name: 'Maria Santos', age: 30, city: 'Rio de Janeiro' },
    { id: 3, name: 'Pedro Costa', age: 28, city: 'Belo Horizonte' },
  ];

  const tableColumns = [
    { title: 'Nome', dataIndex: 'name', key: 'name', sorter: (a: any, b: any) => a.name.localeCompare(b.name) },
    { title: 'Idade', dataIndex: 'age', key: 'age', sorter: (a: any, b: any) => a.age - b.age },
    { title: 'Cidade', dataIndex: 'city', key: 'city' }
  ];

  const handleCounterClick = () => {
    setCounter(counter + 1);
  };

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleModalOk = () => {
    setModalVisible(false);
    message.success('Modal fechado com sucesso!');
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  return (
    <div data-testid="pp:facil|page|container|root" style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <BackButton href="/desafios" testId="pp:facil|btn|voltar" />
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Title level={1}>Roadmap Fácil</Title>
          <Paragraph style={{ fontSize: '18px', color: '#666' }}>
            Pratique com componentes básicos do Ant Design. Todos os elementos têm data-testid únicos.
          </Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          {/* Botões */}
          <Col xs={24} lg={12}>
            <Card 
              data-testid="pp:facil|section|card|botoes"
              title="Botões"
              style={{ height: '100%' }}
            >
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div>
                  <Text strong>Contador: {counter}</Text>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCounterClick}
                    data-testid="pp:facil|btn|incrementar"
                    style={{ marginLeft: '16px' }}
                  >
                    Incrementar
                  </Button>
                </div>

                <div>
                  <Button
                    loading={loading}
                    onClick={handleLoadingClick}
                    data-testid="pp:facil|btn|loading"
                  >
                    Clique para Loading
                  </Button>
                </div>

                <div>
                  <Button
                    disabled
                    data-testid="pp:facil|btn|disabled"
                  >
                    Botão Desabilitado
                  </Button>
                </div>

                <div>
                  <Button
                    type="primary"
                    danger
                    onClick={showModal}
                    data-testid="pp:facil|btn|modal"
                  >
                    Abrir Modal
                  </Button>
                </div>
              </Space>
            </Card>
          </Col>

          {/* Inputs */}
          <Col xs={24} lg={12}>
            <Card 
              data-testid="pp:facil|section|card|inputs"
              title="Inputs"
              style={{ height: '100%' }}
            >
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div>
                  <Text strong>Input de Texto:</Text>
                  <Input
                    placeholder="Digite algo aqui..."
                    data-testid="pp:facil|input|texto"
                    style={{ marginTop: '8px' }}
                  />
                </div>

                <div>
                  <Text strong>Input Number:</Text>
                  <InputNumber
                    min={0}
                    max={100}
                    defaultValue={0}
                    data-testid="pp:facil|input|number"
                    style={{ marginTop: '8px', width: '100%' }}
                  />
                </div>

                <div>
                  <Text strong>Select:</Text>
                  <Select
                    placeholder="Selecione uma opção"
                    data-testid="pp:facil|select|opcoes"
                    style={{ marginTop: '8px', width: '100%' }}
                    options={[
                      { value: 'opcao1', label: 'Opção 1' },
                      { value: 'opcao2', label: 'Opção 2' },
                      { value: 'opcao3', label: 'Opção 3' },
                    ]}
                  />
                </div>

                <div>
                  <Text strong>Cascader:</Text>
                  <Cascader
                    options={cascaderOptions}
                    placeholder="Selecione país e cidade"
                    data-testid="pp:facil|cascader|localizacao"
                    style={{ marginTop: '8px', width: '100%' }}
                  />
                </div>
              </Space>
            </Card>
          </Col>

          {/* Checkboxes e Radios */}
          <Col xs={24} lg={12}>
            <Card 
              data-testid="pp:facil|section|card|checkboxes"
              title="Checkboxes e Radios"
              style={{ height: '100%' }}
            >
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div>
                  <Text strong>Checkboxes:</Text>
                  <div style={{ marginTop: '8px' }}>
                    <Checkbox data-testid="pp:facil|checkbox|opcao1">Opção 1</Checkbox>
                    <br />
                    <Checkbox data-testid="pp:facil|checkbox|opcao2">Opção 2</Checkbox>
                    <br />
                    <Checkbox data-testid="pp:facil|checkbox|opcao3">Opção 3</Checkbox>
                  </div>
                </div>

                <div>
                  <Text strong>Radio Group:</Text>
                  <Radio.Group 
                    data-testid="pp:facil|radio|group"
                    style={{ marginTop: '8px', display: 'block' }}
                  >
                    <Radio value="radio1" data-testid="pp:facil|radio|opcao1">Radio 1</Radio>
                    <br />
                    <Radio value="radio2" data-testid="pp:facil|radio|opcao2">Radio 2</Radio>
                    <br />
                    <Radio value="radio3" data-testid="pp:facil|radio|opcao3">Radio 3</Radio>
                  </Radio.Group>
                </div>
              </Space>
            </Card>
          </Col>

          {/* Date/Time Pickers */}
          <Col xs={24} lg={12}>
            <Card 
              data-testid="pp:facil|section|card|pickers"
              title="Date e Time Pickers"
              style={{ height: '100%' }}
            >
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div>
                  <Text strong>Date Picker:</Text>
                  <DatePicker
                    data-testid="pp:facil|datepicker|data"
                    style={{ marginTop: '8px', width: '100%' }}
                  />
                </div>

                <div>
                  <Text strong>Time Picker:</Text>
                  <TimePicker
                    data-testid="pp:facil|timepicker|hora"
                    style={{ marginTop: '8px', width: '100%' }}
                  />
                </div>
              </Space>
            </Card>
          </Col>

          {/* Slider e Rate */}
          <Col xs={24} lg={12}>
            <Card 
              data-testid="pp:facil|section|card|slider-rate"
              title="Slider e Rate"
              style={{ height: '100%' }}
            >
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div>
                  <Text strong>Slider (valor: {sliderValue}):</Text>
                  <Slider
                    min={0}
                    max={100}
                    value={sliderValue}
                    onChange={setSliderValue}
                    data-testid="pp:facil|slider|valor"
                    style={{ marginTop: '8px' }}
                  />
                </div>

                <div>
                  <Text strong>Rate:</Text>
                  <Rate
                    value={rateValue}
                    onChange={setRateValue}
                    data-testid="pp:facil|rate|avaliacao"
                    style={{ marginTop: '8px' }}
                  />
                </div>
              </Space>
            </Card>
          </Col>

          {/* Switch */}
          <Col xs={24} lg={12}>
            <Card 
              data-testid="pp:facil|section|card|switch"
              title="Switch"
              style={{ height: '100%' }}
            >
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div>
                  <Text strong>Switch (valor: {switchValue ? 'Ligado' : 'Desligado'}):</Text>
                  <Switch
                    checked={switchValue}
                    onChange={setSwitchValue}
                    data-testid="pp:facil|switch|toggle"
                    style={{ marginTop: '8px' }}
                  />
                </div>
              </Space>
            </Card>
          </Col>

          {/* Tabs */}
          <Col xs={24}>
            <Card 
              data-testid="pp:facil|section|card|tabs"
              title="Tabs"
            >
              <Tabs defaultActiveKey="1" data-testid="pp:facil|tabs|container">
                <TabPane tab="Tab 1" key="1" data-testid="pp:facil|tab|1">
                  <p>Conteúdo da primeira tab</p>
                </TabPane>
                <TabPane tab="Tab 2" key="2" data-testid="pp:facil|tab|2">
                  <p>Conteúdo da segunda tab</p>
                </TabPane>
                <TabPane tab="Tab 3" key="3" data-testid="pp:facil|tab|3">
                  <p>Conteúdo da terceira tab</p>
                </TabPane>
              </Tabs>
            </Card>
          </Col>

          {/* Collapse */}
          <Col xs={24}>
            <Card 
              data-testid="pp:facil|section|card|collapse"
              title="Collapse"
            >
              <Collapse data-testid="pp:facil|collapse|container">
                <Panel header="Painel 1" key="1" data-testid="pp:facil|panel|1">
                  <p>Conteúdo do primeiro painel</p>
                </Panel>
                <Panel header="Painel 2" key="2" data-testid="pp:facil|panel|2">
                  <p>Conteúdo do segundo painel</p>
                </Panel>
                <Panel header="Painel 3" key="3" data-testid="pp:facil|panel|3">
                  <p>Conteúdo do terceiro painel</p>
                </Panel>
              </Collapse>
            </Card>
          </Col>

          {/* Tooltip */}
          <Col xs={24}>
            <Card 
              data-testid="pp:facil|section|card|tooltip"
              title="Tooltip"
            >
              <Space>
                <Tooltip title="Este é um tooltip">
                  <Button data-testid="pp:facil|tooltip|btn">Hover para ver tooltip</Button>
                </Tooltip>
                
                <Tooltip title="Informação adicional">
                  <InfoCircleOutlined 
                    data-testid="pp:facil|tooltip|icon"
                    style={{ fontSize: '24px', color: '#1890ff' }} 
                  />
                </Tooltip>
              </Space>
            </Card>
          </Col>

          {/* Tabela */}
          <Col xs={24}>
            <Card 
              data-testid="pp:facil|section|card|tabela"
              title="Tabela"
            >
              <Table
                data-testid="pp:facil|table|dados"
                columns={tableColumns}
                dataSource={tableData}
                rowKey="id"
                pagination={false}
                size="small"
              />
            </Card>
          </Col>
        </Row>

        {/* Desafios */}
        <div style={{ marginTop: '60px' }}>
          <Card 
            data-testid="pp:facil|desafios|card|root"
            title="Desafios para Praticar"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <div data-testid="pp:facil|desafio|contador">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>Contador:</Text> Clique no botão incrementar e valide que o contador aumenta
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div data-testid="pp:facil|desafio|loading">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>Loading:</Text> Clique no botão loading e aguarde 2 segundos
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div data-testid="pp:facil|desafio|modal">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>Modal:</Text> Abra o modal, interaja e feche
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div data-testid="pp:facil|desafio|tabela">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>Tabela:</Text> Ordene a tabela por nome e idade
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div data-testid="pp:facil|desafio|tabs">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>Tabs:</Text> Navegue entre as diferentes tabs
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div data-testid="pp:facil|desafio|collapse">
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                  <Text strong>Collapse:</Text> Expanda e contraia os painéis
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      </div>

      {/* Modal */}
      <Modal
        title="Modal de Exemplo"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        data-testid="pp:facil|modal|root"
      >
        <p data-testid="pp:facil|modal|content">
          Este é um modal de exemplo. Você pode interagir com ele e depois fechar.
        </p>
        <Button 
          type="primary" 
          onClick={handleModalOk}
          data-testid="pp:facil|modal|btn|ok"
        >
          Fechar Modal
        </Button>
      </Modal>
      
      <XPathTester pageId="facil" />
    </div>
  );
}
