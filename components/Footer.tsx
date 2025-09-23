'use client';
import { Layout, Typography, Space, Divider } from 'antd';
import { GithubOutlined, HeartOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons';

const { Footer: AntFooter } = Layout;
const { Text, Link } = Typography;

export default function Footer() {
  return (
    <AntFooter 
      data-testid="pp:layout|footer|footer|root"
      style={{ 
        textAlign: 'center',
        padding: '24px 50px',
        background: '#f5f5f5'
      }}
    >
      <Space direction="vertical" size="small">
        <Text>
          Feito com <HeartOutlined style={{ color: '#ff4d4f' }} /> para a comunidade de QA
        </Text>
        
        <Space>
          <Link 
            href="https://github.com/levircesar" 
            target="_blank" 
            rel="noopener noreferrer"
            data-testid="pp:layout|footer|link|github"
          >
            <GithubOutlined /> GitHub
          </Link>
          
          <Divider type="vertical" />
          
          <Link 
            href="https://www.linkedin.com/in/levirlemos/"
            target="_blank" 
            rel="noopener noreferrer"
            data-testid="pp:layout|footer|link|linkedin"
          >
            <LinkedinOutlined /> LinkedIn
          </Link>
          
          <Divider type="vertical" />
          
          <Link 
            href="mailto:levirlemos@gmail.com"
            data-testid="pp:layout|footer|link|email"
          >
            <MailOutlined /> Email
          </Link>
        </Space>
        
        <Text type="secondary" style={{ fontSize: '12px' }}>
          © 2024 Playwright Playground. MIT License.
        </Text>
      </Space>
    </AntFooter>
  );
}
