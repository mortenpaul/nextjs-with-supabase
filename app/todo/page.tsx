import '../globals.css';
import ClientComponentTodo from "@/components/todo/client-component";
import ServerComponentTodo from "@/components/todo/server-component";

export default async function Index() {
  return (
    <>
      <ServerComponentTodo/>
      <ClientComponentTodo/>
    </>
  );
}