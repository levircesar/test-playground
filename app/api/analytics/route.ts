import { NextRequest, NextResponse } from 'next/server';

// Mock data - analytics
const analyticsData = {
  overview: {
    totalUsers: 1250,
    activeUsers: 892,
    newUsers: 156,
    returningUsers: 736,
    sessions: 3456,
    avgSessionDuration: "8m 32s",
    bounceRate: 23.4,
    conversionRate: 12.8
  },
  traffic: {
    sources: [
      { name: "Google", percentage: 45.2, visitors: 1562 },
      { name: "Direct", percentage: 28.7, visitors: 992 },
      { name: "Social Media", percentage: 15.3, visitors: 529 },
      { name: "Email", percentage: 6.8, visitors: 235 },
      { name: "Referral", percentage: 4.0, visitors: 138 }
    ],
    devices: [
      { type: "Desktop", percentage: 68.4, visitors: 2363 },
      { type: "Mobile", percentage: 28.9, visitors: 999 },
      { type: "Tablet", percentage: 2.7, visitors: 94 }
    ],
    browsers: [
      { name: "Chrome", percentage: 67.3, visitors: 2326 },
      { name: "Firefox", percentage: 18.7, visitors: 646 },
      { name: "Safari", percentage: 8.9, visitors: 308 },
      { name: "Edge", percentage: 4.1, visitors: 142 },
      { name: "Other", percentage: 1.0, visitors: 34 }
    ]
  },
  performance: {
    pageViews: [
      { page: "/", views: 1245, uniqueViews: 892, avgTime: "2m 15s" },
      { page: "/desafios", views: 856, uniqueViews: 634, avgTime: "5m 42s" },
      { page: "/roadmap/facil", views: 623, uniqueViews: 445, avgTime: "3m 28s" },
      { page: "/roadmap/medio", views: 445, uniqueViews: 312, avgTime: "4m 12s" },
      { page: "/roadmap/dificil", views: 234, uniqueViews: 167, avgTime: "6m 33s" },
      { page: "/roadmap/api", views: 389, uniqueViews: 278, avgTime: "4m 56s" }
    ],
    apiCalls: [
      { endpoint: "/api/ping", calls: 2341, avgResponseTime: "45ms", successRate: 99.8 },
      { endpoint: "/api/echo", calls: 1876, avgResponseTime: "67ms", successRate: 98.9 },
      { endpoint: "/api/todos", calls: 1456, avgResponseTime: "123ms", successRate: 97.5 }
    ]
  },
  trends: {
    daily: [
      { date: "2024-03-20", users: 89, sessions: 234, pageViews: 567 },
      { date: "2024-03-21", users: 92, sessions: 245, pageViews: 589 },
      { date: "2024-03-22", users: 78, sessions: 198, pageViews: 445 },
      { date: "2024-03-23", users: 95, sessions: 267, pageViews: 634 },
      { date: "2024-03-24", users: 88, sessions: 234, pageViews: 567 },
      { date: "2024-03-25", users: 102, sessions: 289, pageViews: 678 },
      { date: "2024-03-26", users: 98, sessions: 256, pageViews: 612 }
    ],
    hourly: Array.from({ length: 24 }, (_, i) => ({
      hour: `${i.toString().padStart(2, '0')}:00`,
      users: Math.floor(Math.random() * 50) + 10,
      sessions: Math.floor(Math.random() * 100) + 20,
      pageViews: Math.floor(Math.random() * 200) + 50
    }))
  },
  goals: [
    {
      id: 1,
      name: "Course Enrollment",
      target: 500,
      current: 342,
      percentage: 68.4,
      status: "on_track"
    },
    {
      id: 2,
      name: "API Usage",
      target: 10000,
      current: 8567,
      percentage: 85.7,
      status: "on_track"
    },
    {
      id: 3,
      name: "User Retention",
      target: 70,
      current: 58.2,
      percentage: 83.1,
      status: "needs_attention"
    }
  ]
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') || 'overview';
  const period = searchParams.get('period') || '7d';
  const format = searchParams.get('format') || 'full';

  try {
    let responseData;

    switch (type) {
      case 'overview':
        responseData = analyticsData.overview;
        break;
      case 'traffic':
        responseData = analyticsData.traffic;
        break;
      case 'performance':
        responseData = analyticsData.performance;
        break;
      case 'trends':
        responseData = {
          daily: analyticsData.trends.daily,
          hourly: analyticsData.trends.hourly
        };
        break;
      case 'goals':
        responseData = analyticsData.goals;
        break;
      case 'summary':
        responseData = {
          overview: analyticsData.overview,
          topPages: analyticsData.performance.pageViews.slice(0, 3),
          topSources: analyticsData.traffic.sources.slice(0, 3),
          currentGoals: analyticsData.goals
        };
        break;
      default:
        responseData = analyticsData;
    }

    if (format === 'minimal') {
      // Retorna apenas os dados essenciais
      if (type === 'overview') {
        responseData = {
          totalUsers: analyticsData.overview.totalUsers,
          activeUsers: analyticsData.overview.activeUsers,
          sessions: analyticsData.overview.sessions
        };
      }
    }

    return NextResponse.json({
      success: true,
      data: responseData,
      meta: {
        type,
        period,
        format,
        generatedAt: new Date().toISOString(),
        dataPoints: Array.isArray(responseData) ? responseData.length : 
                   typeof responseData === 'object' ? Object.keys(responseData).length : 1
      }
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Erro ao processar dados de analytics",
      code: "ANALYTICS_ERROR"
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Simular tracking de evento
    const event = {
      id: Date.now().toString(),
      type: body.type || 'page_view',
      userId: body.userId || 'anonymous',
      sessionId: body.sessionId || `session_${Date.now()}`,
      data: body.data || {},
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || '',
      ip: request.headers.get('x-forwarded-for') || '127.0.0.1'
    };

    // Em produção, salvaria no banco de dados ou serviço de analytics
    console.log('Analytics Event:', event);

    return NextResponse.json({
      success: true,
      data: {
        eventId: event.id,
        tracked: true,
        timestamp: event.timestamp
      },
      message: "Evento de analytics registrado com sucesso"
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Erro ao registrar evento de analytics",
      code: "TRACKING_ERROR"
    }, { status: 500 });
  }
}
