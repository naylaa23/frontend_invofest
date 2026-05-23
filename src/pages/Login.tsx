import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const schema = z.object({
  nim: z.string().min(8, "NIM minimal 8 karakter"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

type FormData = {
  nim: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    setLoading(true);

    const cleanNim = data.nim.trim();
    const cleanPassword = data.password.trim();

    if (cleanNim === "24090017" && cleanPassword === "24090017") {
      localStorage.setItem("token", "dummy_token");
      alert("Login berhasil!");
      navigate("/dashboard");
    } else {
      alert("Login gagal");
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

        <form onSubmit={handleSubmit(onSubmit)} className="text-left space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-700 text-sm">
              NIM
            </label>

            <input
              {...register("nim")}
              placeholder="Masukkan NIM"
              className={`w-full px-3 py-3 rounded-xl border bg-gray-50 outline-none focus:ring-2 focus:ring-[#7B1D3F] ${
                errors.nim ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.nim && (
              <p className="text-xs text-red-500 mt-1">
                {errors.nim.message}
              </p>
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
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
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