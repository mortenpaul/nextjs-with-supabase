"use client";

import { createClient } from "@/utils/supabase/client";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function ClientComponentTodo() {
    const [todos, setTodos] = useState<any[] | null>([]);
    const [newTodoTitle, setNewTodoTitle] = useState("");
    const [priority, setPriority] = useState(1);
    const supabase = createClient();

    useEffect(() => { 
      const getTodos = async () => {
        let { data: todos, error } = await supabase.from("todos").select("*");
        if (error) {
          console.error("Error fetching todos:", error);
        } else {
        setTodos(todos);
        }
      };

      getTodos();
    }, [supabase]);

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
        }
    };

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        {JSON.stringify(todos)}
      </main>
      <Input value={newTodoTitle} onChange={(event) => setNewTodoTitle(event.target.value)} placeholder="Enter new todo"/>
      <div className="flex flex-col gap-2">
        <label htmlFor="priority">Select priority (1-10):</label>
        <select id="priority" value={priority} onChange={(event) => setPriority(Number(event?.target.value))}>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
      <Button onClick={insertTodo} disabled={!newTodoTitle}>Add todo</Button>
    </>
  );
}