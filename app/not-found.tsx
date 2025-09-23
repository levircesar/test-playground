'use client';
import React from 'react';
import { Button } from 'antd';
import { HomeOutlined, ArrowLeftOutlined, SearchOutlined, BugOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NotFound() {
  const router = useRouter();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 50%, #f3e8ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', textAlign: 'center' }}>
        {/* Ícone de erro animado */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '8rem',
            height: '8rem',
            background: 'linear-gradient(to right, #fee2e2, #fed7aa)',
            borderRadius: '50%',
            marginBottom: '1.5rem',
            animation: 'pulse 2s infinite'
          }}>
            <BugOutlined style={{ fontSize: '3.75rem', color: '#ef4444' }} />
          </div>
        </div>

        {/* Título principal */}
        <h1 style={{
          fontSize: '6rem',
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #ef4444, #f97316)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '1rem',
          lineHeight: '1'
        }}>
          404
        </h1>

        {/* Subtítulo */}
        <h2 style={{
          fontSize: '2.25rem',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '1.5rem'
        }}>
          Oops! Página não encontrada
        </h2>

        {/* Descrição */}
        <p style={{
          fontSize: '1.125rem',
          color: '#4b5563',
          marginBottom: '2rem',
          maxWidth: '32rem',
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: '1.625'
        }}>
          Parece que você se perdeu no nosso playground de testes! 😅<br />
          A página que você está procurando não existe ou foi movida para outro lugar.
        </p>

        {/* Sugestões de navegação */}
        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '1.5rem'
          }}>
            O que você pode fazer:
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            maxWidth: '48rem',
            margin: '0 auto'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              transition: 'box-shadow 0.3s ease'
            }}>
              <HomeOutlined style={{ fontSize: '1.5rem', color: '#3b82f6', marginBottom: '0.75rem' }} />
              <h4 style={{
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '0.5rem'
              }}>
                Voltar ao Início
              </h4>
              <p style={{
                fontSize: '0.875rem',
                color: '#4b5563',
                marginBottom: '1rem'
              }}>
                Explore nossos desafios e tutoriais
              </p>
              <Link href="/">
                <Button type="primary" icon={<HomeOutlined />} style={{ width: '100%' }}>
                  Página Inicial
                </Button>
              </Link>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              transition: 'box-shadow 0.3s ease'
            }}>
              <SearchOutlined style={{ fontSize: '1.5rem', color: '#10b981', marginBottom: '0.75rem' }} />
              <h4 style={{
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '0.5rem'
              }}>
                Explorar Desafios
              </h4>
              <p style={{
                fontSize: '0.875rem',
                color: '#4b5563',
                marginBottom: '1rem'
              }}>
                Encontre desafios por nível de dificuldade
              </p>
              <Link href="/desafios">
                <Button icon={<SearchOutlined />} style={{ width: '100%' }}>
                  Ver Desafios
                </Button>
              </Link>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              transition: 'box-shadow 0.3s ease'
            }}>
              <ArrowLeftOutlined style={{ fontSize: '1.5rem', color: '#8b5cf6', marginBottom: '0.75rem' }} />
              <h4 style={{
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '0.5rem'
              }}>
                Voltar Atrás
              </h4>
              <p style={{
                fontSize: '0.875rem',
                color: '#4b5563',
                marginBottom: '1rem'
              }}>
                Retorne à página anterior
              </p>
              <Button 
                icon={<ArrowLeftOutlined />} 
                onClick={() => router.back()}
                style={{ width: '100%' }}
              >
                Voltar
              </Button>
            </div>
          </div>
        </div>

        {/* Links rápidos */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          padding: '2rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          maxWidth: '32rem',
          margin: '0 auto'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '1.5rem'
          }}>
            Links Úteis
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '1rem'
          }}>
            <Link 
              href="/roadmap/facil" 
              style={{
                color: '#2563eb',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'color 0.3s ease'
              }}
            >
              🟢 Fácil
            </Link>
            <Link 
              href="/roadmap/medio" 
              style={{
                color: '#ca8a04',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'color 0.3s ease'
              }}
            >
              🟡 Médio
            </Link>
            <Link 
              href="/roadmap/dificil" 
              style={{
                color: '#dc2626',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'color 0.3s ease'
              }}
            >
              🔴 Difícil
            </Link>
            <Link 
              href="/comecar" 
              style={{
                color: '#059669',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'color 0.3s ease'
              }}
            >
              🚀 Começar
            </Link>
          </div>
        </div>

        {/* Mensagem motivacional */}
        <div style={{
          marginTop: '3rem',
          padding: '1.5rem',
          background: 'linear-gradient(to right, #dbeafe, #e9d5ff)',
          borderRadius: '0.75rem',
          maxWidth: '32rem',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <p style={{
            color: '#374151',
            fontStyle: 'italic'
          }}>
            "Erros são apenas oportunidades de aprender algo novo. 
            Que tal aproveitar para explorar nossos desafios de Playwright? 🎭"
          </p>
        </div>
      </div>
    </div>
  );
}