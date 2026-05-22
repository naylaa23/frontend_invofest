import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../../../component/ui/Input";
import Button from "../../../component/ui/Button";

const API_URL = "https://backend-invofest-mla8.vercel.app";

type FormData = {
  name: string;
  role: string;
  image: string;
};

export default function PembicaraCreate() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const response = await fetch(`${API_URL}/pembicara`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      alert("Gagal menambah pembicara");
      return;
    }

    alert("Pembicara berhasil ditambahkan!");
    navigate("/dashboard/pembicara");
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold text-[#7B1D3F] mb-5">
        Tambah Pembicara
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Nama" name="name" placeholder="Nama pembicara" register={register} />
        <Input label="Role" name="role" placeholder="Role pembicara" register={register} />
        <Input label="Image" name="image" placeholder="URL image" register={register} />

        <Button title="Simpan" variant="primary" />
      </form>
    </div>
  );
}