import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000";

export default function PembicaraCreate() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");

  const [error, setError] = useState({
    name: "",
    role: "",
    image: "",
  });

  const simpanPembicara = async () => {
    const newError = {
      name: "",
      role: "",
      image: "",
    };

    if (name.length < 3) {
      newError.name = "Nama pembicara minimal 3 karakter";
    }

    if (role.length < 3) {
      newError.role = "Role pembicara minimal 3 karakter";
    }

    if (image === "") {
      newError.image = "URL image wajib diisi";
    }

    setError(newError);

    if (newError.name || newError.role || newError.image) {
      return;
    }

    const response = await fetch(`${API_URL}/pembicara`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, role, image }),
    });

    if (!response.ok) {
      setError({
        name: "",
        role: "",
        image: "Gagal menambah pembicara",
      });
      return;
    }

    navigate("/dashboard/pembicara");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-3xl shadow">
        <h1 className="text-3xl font-bold text-[#7B1D3F] mb-2">
          Tambah Pembicara
        </h1>

        <p className="text-gray-400 text-sm mb-6">
          Isi data pembicara event
        </p>

        <div className="mb-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama pembicara"
            className="w-full border px-4 py-3 rounded-xl"
          />
          {error.name && (
            <p className="text-red-500 text-sm mt-1">
              {error.name}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role pembicara"
            className="w-full border px-4 py-3 rounded-xl"
          />
          {error.role && (
            <p className="text-red-500 text-sm mt-1">
              {error.role}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="URL image"
            className="w-full border px-4 py-3 rounded-xl"
          />
          {error.image && (
            <p className="text-red-500 text-sm mt-1">
              {error.image}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={simpanPembicara}
          className="bg-[#7B1D3F] text-white px-5 py-3 rounded-xl"
        >
          Simpan
        </button>
      </div>
    </div>
  );
}