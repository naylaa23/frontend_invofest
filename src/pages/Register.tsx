import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const schema = z.object({
  username: z.string().min(2, "Username minimal 2 karakter"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  foto: z.string().optional(),
});

type RegisterFormData = z.infer<typeof schema>;

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Gagal mendaftar!");
        setLoading(false);
        return;
      }

      alert("Register berhasil!");
      navigate("/login");

    } catch (err) {
      setError("Tidak bisa terhubung ke server. Pastikan BE sudah berjalan!");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">

        <h1 className="text-3xl font-bold text-center text-[#7B1D3F]">
          Daftar Akun!
        </h1>
        <p className="text-center text-gray-500 mt-1 mb-6">
          Lengkapi data untuk bergabung
        </p>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <label className="text-sm font-medium text-gray-700">Username</label>
            <input
              {...register("username")}
              placeholder="Username Anda"
              className={`w-full mt-1 p-2 border rounded focus:outline-none focus:ring-1 focus:ring-[#7B1D3F] ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <p className="text-xs text-red-500 mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className={`w-full mt-1 p-2 border rounded focus:outline-none focus:ring-1 focus:ring-[#7B1D3F] ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Foto (nama file)</label>
            <input
              {...register("foto")}
              placeholder="contoh: foto.jpg"
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#7B1D3F]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7B1D3F] text-white py-2 rounded mt-2 hover:bg-[#5a152e]"
          >
            {loading ? "Loading..." : "Daftar Sekarang"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-[#7B1D3F] font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}