'use client';
import { Layout, Typography, Space, Divider } from 'antd';
import { GithubOutlined, HeartOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons';
import { useLocale } from '@/lib/locale-context';
import { getTranslations } from '@/lib/translations';

const { Footer: AntFooter } = Layout;
const { Text, Link } = Typography;

export default function Footer() {
  const { locale } = useLocale();
  const t = getTranslations(locale);

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
          {t.footer.madeWith} <HeartOutlined style={{ color: '#ff4d4f' }} /> {t.footer.by} {t.footer.for} QA {t.footer.community}
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
