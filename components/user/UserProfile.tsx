import { useUser } from "@/app/context/userContext";

export default function HeaderAuth() {
  const { user, loading } = useUser();

  if (loading) return <p>Loading user data...</p>;

  return (
    <div>
      {user ? (
        <p>Welcome, {user.email}!</p> 
      ) : (
        <p>No user is logged in.</p>
      )}
    </div>
  );
}