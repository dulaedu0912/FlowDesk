import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiClient } from "../../lib/api-client";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await apiClient.post("/auth/login", { email, password });
      navigate("/app/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error?.message || "Login failed");
    }
  };
  return (
    <div className="mx-auto mt-20 max-w-md rounded-xl border bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold">Welcome to FlowDesk</h1>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit">Login</Button>
      </form>
      <p className="mt-4 text-sm">No account? <Link className="text-indigo-600" to="/register">Register</Link></p>
    </div>
  );
}
