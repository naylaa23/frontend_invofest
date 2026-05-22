import { useForm } from "react-hook-form";
import Input from "../../../component/ui/Input";
import Button from "../../../component/ui/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const API_URL = "https://backend-invofest-mla8.vercel.app";

type FormData = {
  name: string;
  categoryId: string;
  location: string;
  dateEvent: string;
  description: string;
};

const schema = z.object({
  name: z.string().min(3, "Nama event harus diisi"),
  categoryId: z.string().min(1, "ID category harus diisi"),
  location: z.string().min(3, "Lokasi harus diisi"),
  dateEvent: z.string().min(1, "Tanggal event harus diisi"),
  description: z.string().min(3, "Deskripsi harus diisi"),
});

export default function EventCreate() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const response = await fetch(`${API_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      alert("Gagal menambah event");
      return;
    }

    alert("Event berhasil ditambahkan");
    navigate("/dashboard/event");
  };

  return (
    <div className="px-10 py-10 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#7B1D3F]">Tambah Event</h1>
        <p className="text-gray-500 text-sm">
          Tambahkan event baru ke dalam sistem
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Nama event"
            name="name"
            placeholder="Masukkan nama event"
            register={register}
            error={errors.name?.message}
          />

          <Input
            label="ID Category"
            name="categoryId"
            placeholder="Masukkan ID kategori"
            register={register}
            error={errors.categoryId?.message}
          />

          <Input
            label="Lokasi"
            name="location"
            placeholder="Masukkan lokasi event"
            register={register}
            error={errors.location?.message}
          />

          <Input
            label="Tanggal Event"
            name="dateEvent"
            placeholder="2026-05-22"
            register={register}
            error={errors.dateEvent?.message}
          />

          <Input
            label="Deskripsi"
            name="description"
            placeholder="Masukkan deskripsi event"
            register={register}
            error={errors.description?.message}
          />

          <Button title="Simpan" variant="primary" />
        </form>
      </div>
    </div>
  );
}