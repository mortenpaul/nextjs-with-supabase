import { createClient } from "@/utils/supabase/server";

export default async function Index() {
    const supabase = await createClient()

    let { data: todos, error } = await supabase.from('todos').select('*')

    return (
      <>
         <main className="flex-1 flex flex-col gap-6 px-4">
          {JSON.stringify(todos)}
         </main>
        </>
     );
}
