import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import Input from "../../../component/ui/Input";
import Button from "../../../component/ui/Button";

const API_URL = "https://backend-invofest-mla8.vercel.app";

type FormData = {
  name: string;
};

const schema = z.object({
  name: z.string().min(3, "Nama kategori minimal 3 karakter"),
});

export default function CategoryCreate() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const response = await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
      }),
    });

    if (!response.ok) {
      alert("Gagal membuat kategori");
      return;
    }

    alert("Kategori berhasil dibuat!");
    navigate("/dashboard/category");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-[#7B1D3F]">
            Tambah Kategori
          </h1>

          <p className="text-gray-400 text-sm mt-1">
            Isi data kategori event kamu
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Nama category"
            name="name"
            placeholder="Masukkan nama category"
            register={register}
            error={errors.name?.message}
          />

          <Button title="Simpan" variant="primary" />
        </form>
      </div>
    </div>
  );
}