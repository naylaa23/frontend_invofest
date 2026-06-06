import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:3000";

export default function CategoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/categories/${id}`)
      .then((res) => res.json())
      .then((data) => setName(data.name));
  }, [id]);

  const updateCategory = async () => {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

    if (!response.ok) {
      alert("Gagal update kategori");
      return;
    }

    alert("Kategori berhasil diupdate");
    navigate("/dashboard/category");
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <div className="bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-[#7B1D3F] mb-5">
          Edit Kategori
        </h1>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama kategori"
          className="w-full border px-3 py-2 rounded-lg mb-4"
        />

        <div className="flex gap-2">
          <button
            onClick={updateCategory}
            className="bg-[#7B1D3F] text-white px-4 py-2 rounded-lg"
          >
            Simpan
          </button>

          <button
            onClick={() => navigate("/dashboard/category")}
            className="border px-4 py-2 rounded-lg"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}