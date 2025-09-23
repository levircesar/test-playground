import { NextRequest, NextResponse } from 'next/server';

// Mock data - produtos
const products = [
  {
    id: "prod_001",
    name: "Playwright Pro Course",
    description: "Curso completo de automação de testes com Playwright",
    price: 299.90,
    currency: "BRL",
    category: "courses",
    tags: ["playwright", "automation", "testing", "javascript"],
    inventory: {
      stock: 150,
      reserved: 25,
      available: 125
    },
    ratings: {
      average: 4.8,
      count: 342,
      distribution: {
        5: 280,
        4: 45,
        3: 12,
        2: 3,
        1: 2
      }
    },
    features: [
      "50+ horas de conteúdo",
      "Projetos práticos",
      "Certificado de conclusão",
      "Suporte via Discord"
    ],
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-03-15T14:30:00Z"
  },
  {
    id: "prod_002",
    name: "Cypress Masterclass",
    description: "Domine o Cypress do básico ao avançado",
    price: 199.90,
    currency: "BRL",
    category: "courses",
    tags: ["cypress", "e2e", "testing", "javascript"],
    inventory: {
      stock: 200,
      reserved: 15,
      available: 185
    },
    ratings: {
      average: 4.6,
      count: 189,
      distribution: {
        5: 145,
        4: 32,
        3: 8,
        2: 3,
        1: 1
      }
    },
    features: [
      "30+ horas de conteúdo",
      "Exercícios práticos",
      "Código fonte",
      "Comunidade exclusiva"
    ],
    status: "active",
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-03-20T10:15:00Z"
  },
  {
    id: "prod_003",
    name: "QA Testing Toolkit",
    description: "Kit completo de ferramentas para QA",
    price: 149.90,
    currency: "BRL",
    category: "tools",
    tags: ["tools", "qa", "testing", "utilities"],
    inventory: {
      stock: 50,
      reserved: 8,
      available: 42
    },
    ratings: {
      average: 4.4,
      count: 67,
      distribution: {
        5: 45,
        4: 15,
        3: 5,
        2: 2,
        1: 0
      }
    },
    features: [
      "Templates de teste",
      "Scripts utilitários",
      "Documentação completa",
      "Updates gratuitos"
    ],
    status: "discontinued",
    createdAt: "2023-12-01T00:00:00Z",
    updatedAt: "2024-02-28T16:45:00Z"
  }
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const status = searchParams.get('status');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const sortBy = searchParams.get('sortBy') || 'name';
  const order = searchParams.get('order') || 'asc';

  let filteredProducts = [...products];

  // Filtros
  if (category) {
    filteredProducts = filteredProducts.filter(product => 
      product.category === category
    );
  }

  if (status) {
    filteredProducts = filteredProducts.filter(product => 
      product.status === status
    );
  }

  if (minPrice) {
    const min = parseFloat(minPrice);
    if (!isNaN(min)) {
      filteredProducts = filteredProducts.filter(product => 
        product.price >= min
      );
    }
  }

  if (maxPrice) {
    const max = parseFloat(maxPrice);
    if (!isNaN(max)) {
      filteredProducts = filteredProducts.filter(product => 
        product.price <= max
      );
    }
  }

  // Ordenação
  filteredProducts.sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'price':
        aValue = a.price;
        bValue = b.price;
        break;
      case 'rating':
        aValue = a.ratings.average;
        bValue = b.ratings.average;
        break;
      case 'stock':
        aValue = a.inventory.available;
        bValue = b.inventory.available;
        break;
      case 'created':
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
        break;
      default:
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
    }

    if (order === 'desc') {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
    return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
  });

  // Estatísticas
  const stats = {
    totalProducts: filteredProducts.length,
    averagePrice: filteredProducts.reduce((sum, p) => sum + p.price, 0) / filteredProducts.length,
    totalStock: filteredProducts.reduce((sum, p) => sum + p.inventory.available, 0),
    categories: [...new Set(filteredProducts.map(p => p.category))],
    priceRange: {
      min: Math.min(...filteredProducts.map(p => p.price)),
      max: Math.max(...filteredProducts.map(p => p.price))
    }
  };

  return NextResponse.json({
    success: true,
    data: filteredProducts,
    meta: {
      stats,
      filters: {
        category,
        status,
        minPrice,
        maxPrice,
        sortBy,
        order
      },
      timestamp: new Date().toISOString()
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validação básica
    if (!body.name || !body.price) {
      return NextResponse.json({
        success: false,
        error: "Nome e preço são obrigatórios",
        code: "VALIDATION_ERROR"
      }, { status: 400 });
    }

    const newProduct = {
      id: `prod_${String(products.length + 1).padStart(3, '0')}`,
      name: body.name,
      description: body.description || "",
      price: parseFloat(body.price),
      currency: body.currency || "BRL",
      category: body.category || "courses",
      tags: body.tags || [],
      inventory: {
        stock: body.inventory?.stock || 0,
        reserved: 0,
        available: body.inventory?.stock || 0
      },
      ratings: {
        average: 0,
        count: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
      },
      features: body.features || [],
      status: body.status || "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    products.push(newProduct);

    return NextResponse.json({
      success: true,
      data: newProduct,
      message: "Produto criado com sucesso",
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
