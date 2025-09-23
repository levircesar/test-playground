'use client';
import { useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Space, Typography, Alert } from 'antd';
import { useLocale } from '@/lib/locale-context';
import { getTranslations } from '@/lib/translations';

const HIGHLIGHT_CLASS = 'pp-xpath-highlight';

function clearHighlights() {
  document.querySelectorAll(`.${HIGHLIGHT_CLASS}`).forEach((el) => {
    el.classList.remove(HIGHLIGHT_CLASS);
    (el as HTMLElement).style.outline = '';
    (el as HTMLElement).style.outlineOffset = '';
  });
}

function highlight(nodes: Node[]) {
  nodes.forEach((n) => {
    if (n instanceof HTMLElement) {
      n.classList.add(HIGHLIGHT_CLASS);
      n.style.outline = '3px dashed #1890ff';
      n.style.outlineOffset = '2px';
    }
  });
}

export default function XPathTester({ pageId }: { pageId: string }) {
  const { locale } = useLocale();
  const t = getTranslations(locale);
  const [xpath, setXpath] = useState('');
  const [count, setCount] = useState<number | null>(null);
  const liveRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => clearHighlights(), []);

  const onTest = () => {
    clearHighlights();
    if (!xpath.trim()) {
      setCount(0);
      return;
    }
    try {
      const result = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
      );
      const nodes: Node[] = [];
      for (let i = 0; i < result.snapshotLength; i++) {
        nodes.push(result.snapshotItem(i)!);
      }
      highlight(nodes);
      setCount(nodes.length);
      if (liveRef.current) liveRef.current.textContent = `XPath encontrou ${nodes.length} elemento(s).`;
    } catch {
      setCount(0);
      if (liveRef.current) liveRef.current.textContent = `XPath inválido.`;
    }
  };

  const onClear = () => {
    setXpath('');
    setCount(null);
    clearHighlights();
    if (liveRef.current) liveRef.current.textContent = '';
  };

  return (
    <div
      data-testid={`pp:${pageId}|xpath|box|tester`}
      style={{ margin: '12px 0' }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Typography.Text strong>{t.components.xpathTester.title}</Typography.Text>
        <Form layout="inline" onFinish={onTest}>
          <Form.Item style={{ flex: 1 }}>
            <Input
              data-testid={`pp:${pageId}|xpath|input|expr`}
              placeholder={locale === 'pt-BR' ? 'Ex.: //*[@data-testid="pp:home|main|btn|comecar"]' : 
                           locale === 'en-US' ? 'Ex.: //*[@data-testid="pp:home|main|btn|comecar"]' : 
                           'Ex.: //*[@data-testid="pp:home|main|btn|comecar"]'}
              value={xpath}
              onChange={(e) => setXpath(e.target.value)}
              allowClear
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" data-testid={`pp:${pageId}|xpath|btn|testar`}>
              {t.components.xpathTester.test}
            </Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={onClear} data-testid={`pp:${pageId}|xpath|btn|limpar`}>
              {t.common.clear}
            </Button>
          </Form.Item>
        </Form>
        <div aria-live="polite" role="status" ref={liveRef} data-testid={`pp:${pageId}|xpath|status|live`} />
        {count !== null && (
          <Alert
            data-testid={`pp:${pageId}|xpath|alert|resultado`}
            showIcon
            type={count > 0 ? 'success' : 'warning'}
            message={locale === 'pt-BR' ? `Resultados: ${count} elemento(s).` : 
                     locale === 'en-US' ? `Results: ${count} element(s).` : 
                     `Résultats: ${count} élément(s).`}
          />
        )}
      </Space>
    </div>
  );
}
