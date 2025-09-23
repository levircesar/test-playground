import { NextRequest, NextResponse } from 'next/server';

// Mock de dados em memória (reinicia a cada boot)
let todos: Array<{
  id: number;
  text: string;
  done: boolean;
  createdAt: string;
}> = [
  {
    id: 1,
    text: 'Aprender Playwright',
    done: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    text: 'Praticar automação de testes',
    done: true,
    createdAt: new Date().toISOString()
  }
];

let nextId = 3;

export async function GET() {
  return NextResponse.json({
    todos,
    total: todos.length,
    completed: todos.filter(t => t.done).length,
    pending: todos.filter(t => !t.done).length
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Campo "text" é obrigatório e deve ser uma string' },
        { status: 400 }
      );
    }

    const newTodo = {
      id: nextId++,
      text: text.trim(),
      done: false,
      createdAt: new Date().toISOString()
    };

    todos.push(newTodo);

    return NextResponse.json({
      todo: newTodo,
      message: 'TODO criado com sucesso',
      total: todos.length
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao processar a requisição' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Parâmetro "id" é obrigatório' },
        { status: 400 }
      );
    }

    const todoId = parseInt(id);
    const todoIndex = todos.findIndex(t => t.id === todoId);

    if (todoIndex === -1) {
      return NextResponse.json(
        { error: 'TODO não encontrado' },
        { status: 404 }
      );
    }

    const deletedTodo = todos.splice(todoIndex, 1)[0];

    return NextResponse.json({
      deletedTodo,
      message: 'TODO removido com sucesso',
      total: todos.length
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao processar a requisição' },
      { status: 400 }
    );
  }
}
