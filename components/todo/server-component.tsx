import { createClient } from "@/utils/supabase/server";
import { Card, CardContent } from "../ui/card";

export default async function ServerComponentTodo() {
  const supabase = await createClient();
  let { data: todos, error } = await supabase.from("todos").select("*").order("priority", { ascending: false });

  return (
    <main className="max-w-6xl mx-auto px-4 mt-8 flex flex-col items-center">
      {todos && todos.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full">
          {todos.map((todo) => (
            <Card key={todo.id} className="p-4 flex flex-col justify-between shadow-lg">
              <CardContent>
                <h2 className="text-lg font-semibold">{todo.title}</h2>
                <p className="text-sm text-gray-500">Priority: {todo.priority}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <h1 className="text-center text-gray-500">No todos found.</h1>
      )}
    </main>
  );
}