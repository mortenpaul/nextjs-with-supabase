"use client"
import { useEffect, useState } from 'react';
import supabase from '../../supabase';

type Todo = {
  id: number;
  title: string;
  priority: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
};

export default function SupabaseComponent() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      let { data, error } = await supabase
        .from('todos')
        .select('*'); 

      if (error) {
        console.error('Viga andmete fetchimisel:', error);
      } else {
        setTodos(data || []);
      }
    };

    fetchTodos();
  }, []);

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}