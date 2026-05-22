import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const schema = z
  .object({
    username: z.string().min(2, "Username wajib diisi"),
    email: z.string().trim().toLowerCase().email("Email tidak valid"),
    password: z.string().min(6, "Minimal 6 karakter"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sama",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof schema>;

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: RegisterFormData) => {
    setLoading(true);

    const userToSave = {
      username: data.username,
      email: data.email.trim().toLowerCase(),
      password: data.password.trim(),
    };

    localStorage.setItem("registeredUser", JSON.stringify(userToSave));

    alert("Register berhasil!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-[#7B1D3F]">
          Daftar Akun!
        </h1>
        <p className="text-center text-gray-500 mt-1 mb-6">
          Lengkapi data untuk bergabung
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Username */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              {...register("username")}
              placeholder="Username Anda"
              className={`w-full mt-1 p-2 border rounded focus:outline-none focus:ring-1 focus:ring-[#7B1D3F] ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <p className="text-xs text-red-500 mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email")}
              placeholder="email@anda.com"
              className={`w-full mt-1 p-2 border rounded focus:outline-none focus:ring-1 focus:ring-[#7B1D3F] ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password & Confirm */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                className={`w-full mt-1 p-2 border rounded ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Konfirmasi
              </label>
              <input
                type="password"
                {...register("confirmPassword")}
                className={`w-full mt-1 p-2 border rounded ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Button */}
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