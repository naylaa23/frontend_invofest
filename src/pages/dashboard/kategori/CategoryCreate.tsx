import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000";

export default function CategoryCreate() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const simpanCategory = async () => {
    if (name.length < 3) {
      setError("Nama kategori minimal 3 karakter");
      return;
    }

    setError("");

    const response = await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      setError("Gagal membuat kategori");
      return;
    }

    navigate("/dashboard/category");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-3xl shadow">
        <h1 className="text-3xl font-bold text-[#7B1D3F] mb-2">
          Tambah Kategori
        </h1>

        <p className="text-gray-400 text-sm mb-6">
          Isi data kategori event kamu
        </p>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Masukkan nama kategori"
          className="w-full border px-4 py-3 rounded-xl"
        />

        {error && (
          <p className="text-red-500 text-sm mt-2 mb-4">
            {error}
          </p>
        )}

        <button
          onClick={simpanCategory}
          className="bg-[#7B1D3F] text-white px-5 py-3 rounded-xl mt-4"
        >
          Simpan
        </button>
      </div>
    </div>
  );
}