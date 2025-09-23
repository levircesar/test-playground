'use client';
import { Table, Button, Space, Typography, Card, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Title } = Typography;

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

export default function EmbedTablePage() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Notebook', price: 2500, category: 'Eletrônicos' },
    { id: 2, name: 'Mouse', price: 50, category: 'Acessórios' },
    { id: 3, name: 'Teclado', price: 120, category: 'Acessórios' },
  ]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      sorter: (a: Product, b: Product) => a.id - b.id,
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Product, b: Product) => a.name.localeCompare(b.name),
    },
    {
      title: 'Preço',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `R$ ${price.toFixed(2)}`,
      sorter: (a: Product, b: Product) => a.price - b.price,
    },
    {
      title: 'Categoria',
      dataIndex: 'category',
      key: 'category',
      filters: [
        { text: 'Eletrônicos', value: 'Eletrônicos' },
        { text: 'Acessórios', value: 'Acessórios' },
      ],
      onFilter: (value: string, record: Product) => record.category === value,
    },
    {
      title: 'Ações',
      key: 'actions',
      width: 150,
      render: (_: any, record: Product) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            data-testid={`pp:embed-table|btn|edit#${record.id}`}
            onClick={() => {
              message.info(`Editando produto: ${record.name}`);
              // Enviar mensagem para o pai
              if (window.parent !== window) {
                window.parent.postMessage({
                  type: 'PRODUCT_EDIT',
                  data: record
                }, '*');
              }
            }}
          >
            Editar
          </Button>
          <Button
            type="primary"
            danger
            size="small"
            icon={<DeleteOutlined />}
            data-testid={`pp:embed-table|btn|delete#${record.id}`}
            onClick={() => {
              setProducts(products.filter(p => p.id !== record.id));
              message.success(`Produto ${record.name} removido!`);
              
              // Enviar mensagem para o pai
              if (window.parent !== window) {
                window.parent.postMessage({
                  type: 'PRODUCT_DELETED',
                  data: record
                }, '*');
              }
            }}
          >
            Excluir
          </Button>
        </Space>
      ),
    },
  ];

  const addProduct = () => {
    const newProduct: Product = {
      id: Math.max(...products.map(p => p.id)) + 1,
      name: `Produto ${products.length + 1}`,
      price: Math.floor(Math.random() * 1000) + 50,
      category: Math.random() > 0.5 ? 'Eletrônicos' : 'Acessórios'
    };
    
    setProducts([...products, newProduct]);
    message.success('Novo produto adicionado!');
    
    // Enviar mensagem para o pai
    if (window.parent !== window) {
      window.parent.postMessage({
        type: 'PRODUCT_ADDED',
        data: newProduct
      }, '*');
    }
  };

  return (
    <div 
      data-testid="pp:embed-table|page|container|root"
      style={{ 
        padding: '20px',
        background: '#f0f0f0',
        minHeight: '100vh'
      }}
    >
      <Card 
        data-testid="pp:embed-table|card|root"
        style={{ maxWidth: '800px', margin: '0 auto' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <Title level={3} style={{ margin: 0 }}>
            Tabela no Iframe
          </Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={addProduct}
            data-testid="pp:embed-table|btn|add"
          >
            Adicionar Produto
          </Button>
        </div>
        
        <Table
          data-testid="pp:embed-table|table|root"
          columns={columns}
          dataSource={products}
          rowKey="id"
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          scroll={{ x: 600 }}
          size="small"
        />
      </Card>
    </div>
  );
}
