import { NextRequest, NextResponse } from 'next/server';

// Mock data - usuários
const users = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@exemplo.com",
    age: 28,
    role: "QA Engineer",
    skills: ["Playwright", "Cypress", "JavaScript", "API Testing"],
    active: true,
    createdAt: "2024-01-15T10:30:00Z",
    profile: {
      avatar: "https://i.pravatar.cc/150?img=1",
      bio: "Especialista em automação de testes com 5 anos de experiência",
      location: "São Paulo, SP"
    }
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@exemplo.com",
    age: 32,
    role: "Senior QA",
    skills: ["Selenium", "Python", "TestNG", "BDD"],
    active: false,
    createdAt: "2024-02-20T14:15:00Z",
    profile: {
      avatar: "https://i.pravatar.cc/150?img=2",
      bio: "Líder de qualidade com foco em estratégias de teste",
      location: "Rio de Janeiro, RJ"
    }
  },
  {
    id: 3,
    name: "Pedro Costa",
    email: "pedro@exemplo.com",
    age: 25,
    role: "Test Automation Engineer",
    skills: ["WebDriver", "Java", "Cucumber", "Jenkins"],
    active: true,
    createdAt: "2024-03-10T09:45:00Z",
    profile: {
      avatar: "https://i.pravatar.cc/150?img=3",
      bio: "Desenvolvedor de testes automatizados em crescimento",
      location: "Belo Horizonte, MG"
    }
  }
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const active = searchParams.get('active');
  const role = searchParams.get('role');
  const limit = searchParams.get('limit');

  let filteredUsers = [...users];

  // Filtros
  if (active !== null) {
    filteredUsers = filteredUsers.filter(user => 
      user.active === (active === 'true')
    );
  }

  if (role) {
    filteredUsers = filteredUsers.filter(user => 
      user.role.toLowerCase().includes(role.toLowerCase())
    );
  }

  // Limite
  if (limit) {
    const limitNum = parseInt(limit);
    if (!isNaN(limitNum) && limitNum > 0) {
      filteredUsers = filteredUsers.slice(0, limitNum);
    }
  }

  return NextResponse.json({
    success: true,
    data: filteredUsers,
    meta: {
      total: filteredUsers.length,
      totalAvailable: users.length,
      filters: {
        active,
        role,
        limit
      },
      timestamp: new Date().toISOString()
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validação básica
    if (!body.name || !body.email) {
      return NextResponse.json({
        success: false,
        error: "Nome e email são obrigatórios",
        code: "VALIDATION_ERROR"
      }, { status: 400 });
    }

    // Simular criação de usuário
    const newUser = {
      id: users.length + 1,
      name: body.name,
      email: body.email,
      age: body.age || null,
      role: body.role || "QA Engineer",
      skills: body.skills || [],
      active: body.active !== false,
      createdAt: new Date().toISOString(),
      profile: {
        avatar: body.profile?.avatar || `https://i.pravatar.cc/150?img=${users.length + 1}`,
        bio: body.profile?.bio || "",
        location: body.profile?.location || ""
      }
    };

    // Adicionar à lista (em produção seria salvo no banco)
    users.push(newUser);

    return NextResponse.json({
      success: true,
      data: newUser,
      message: "Usuário criado com sucesso",
      timestamp: new Date().toISOString()
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Erro ao processar requisição",
      code: "PROCESSING_ERROR"
    }, { status: 500 });
  }
}
