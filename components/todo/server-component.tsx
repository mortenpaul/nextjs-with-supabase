import { createClient } from "@/utils/supabase/server";

export default async function ServerComponentTodo() {
    const supabase = await createClient();
    let { data: todos, error } = await supabase.from("todos").select("*");

    if (!todos || todos.length === 0) return <h1>No todos found.</h1>
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        {JSON.stringify(todos)}
      </main>
    </>
  );
}