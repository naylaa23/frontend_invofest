import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const schema = z.object({
  username: z.string().min(1, "Username harus diisi"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

type FormData = {
  username: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Login gagal!");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", result.data.token);
      alert("Login berhasil!");
      navigate("/dashboard");

    } catch (err) {
      setError("Tidak bisa terhubung ke server. Pastikan BE sudah berjalan!");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow text-center">
        <h1 className="text-3xl font-bold text-[#7B1D3F] mb-2">
          Selamat Datang
        </h1>
        <p className="text-gray-400 mb-6 text-sm">
          Silahkan login untuk melanjutkan
        </p>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="text-left space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-700 text-sm">
              Username
            </label>
            <input
              {...register("username")}
              placeholder="Masukkan Username"
              className={`w-full px-3 py-3 rounded-xl border bg-gray-50 outline-none focus:ring-2 focus:ring-[#7B1D3F] ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <p className="text-xs text-red-500 mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700 text-sm">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className={`w-full px-3 py-3 rounded-xl border bg-gray-50 outline-none focus:ring-2 focus:ring-[#7B1D3F] ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7B1D3F] text-white py-3 rounded-xl font-semibold shadow hover:bg-[#5a152e] transition"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="text-gray-500 mt-6 text-sm">
          Belum punya akun?{" "}
          <Link to="/register" className="text-[#7B1D3F] font-semibold">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}