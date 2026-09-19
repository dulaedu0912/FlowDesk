import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiClient } from "../../lib/api-client";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post("/auth/register", { name, email, password });
      navigate("/app/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error?.message || "Register failed");
    }
  };
  return (
    <div className="mx-auto mt-20 max-w-md rounded-xl border bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold">Create your FlowDesk account</h1>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password (min 8)" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit">Register</Button>
      </form>
      <p className="mt-4 text-sm">Have an account? <Link className="text-indigo-600" to="/login">Login</Link></p>
    </div>
  );
}
