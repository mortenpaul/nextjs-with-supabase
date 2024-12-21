"use client";

import { createClient } from "@/utils/supabase/client";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../ui/card";

type Todo = {
  id: number;
  created_at: string | null;
  title: string;
  priority: number;
  updated_at: string | null;
  deleted: boolean;
};

export default function ClientComponentTodo() {
    const [todos, setTodos] = useState<Todo[]>([]);    
    const [newTodoTitle, setNewTodoTitle] = useState("");
    const [priority, setPriority] = useState(1);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => { 
      const getTodos = async () => {
        let { data: todos, error } = await supabase.from("todos").select("*");
        if (error) {
          console.error("Error fetching todos:", error);
        } else {
          setTodos(todos || []);
        }
      };
      getTodos();
    }, []);

    const insertTodo = async () => {  
      if (newTodoTitle.trim() === "") return;    
      const { data, error } = await supabase
        .from("todos")
        .insert([{ title: newTodoTitle, priority: priority }])
        .select();
        if (error) {
          console.error("Error inserting todo:", error);
        } else {
          setTodos((prevTodos) => [...(prevTodos ?? []), ...data]);
          setNewTodoTitle("");
          setPriority(1);
          router.refresh();
        }
    };

    const updateTodo = async (id: number, updatedTitle: string, updatedPriority: number) => {
      const { error } = await supabase
        .from("todos")
        .update({ title: updatedTitle, priority: updatedPriority })
        .eq("id", id);
  
      if (error) {
        console.error("Error updating todo:", error);
      } else {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, title: updatedTitle, priority: updatedPriority } : todo
          )
        );
        router.refresh();
      }
    };

    const deleteTodo = async (id: number) => {
      const { error } = await supabase.from("todos").delete().eq("id", id);
  
      if (error) {
        console.error("Error deleting todo:", error);
      } else {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        router.refresh();
      }
    };

    return (
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <Card className="p-6 mb-6">
          <CardContent>
            <Input
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              placeholder="Enter new todo"
            />
            <div className="mt-4">
              <label className="block">Priority (1-10):</label>
              <select
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <Button onClick={insertTodo} className="mt-6 w-full" disabled={!newTodoTitle.trim()}>
              Add Todo
            </Button>
          </CardContent>
        </Card>
  
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {todos
            .slice()
            .sort((a, b) => b.priority - a.priority)
            .map((todo) => (
              <Card key={todo.id} className="p-4 flex flex-col justify-between shadow-lg">
                <div>
                  <h3 className="text-lg font-semibold">{todo.title}</h3>
                  <p className="text-sm text-gray-500">Priority: {todo.priority}</p>
                </div>
                <div className="flex justify-between gap-2 mt-4">
                  <Button
                    onClick={() => {
                      const newTitle = prompt("Update title", todo.title);
                      const newPriority = Number(prompt("Update priority", String(todo.priority)));
                      if (newTitle && !isNaN(newPriority)) updateTodo(todo.id, newTitle, newPriority);
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteTodo(todo.id)}
                    variant="outline"
                    className="flex-1"
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
        </div>
      </div>
    );
  }