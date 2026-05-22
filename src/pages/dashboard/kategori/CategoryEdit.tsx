import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CategoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/categories/${id}`)
      .then((res) => res.json())
      .then((data) => setName(data.name));
  }, [id]);

  const handleUpdate = async () => {
    const response = await fetch(
      `http://localhost:3000/categories/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );

    if (!response.ok) {
      alert("Gagal update kategori");
      return;
    }

    alert("Kategori berhasil diupdate");
    navigate("/dashboard/category");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-[#7B1D3F] mb-2">
          Edit Kategori
        </h1>

        <p className="text-gray-400 mb-8">
          Perbarui data kategori event
        </p>

        <div className="space-y-3 mb-8">
          <label className="font-semibold text-gray-700">
            Nama Kategori
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama kategori"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#7B1D3F]"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleUpdate}
            className="flex-1 bg-[#7B1D3F] hover:bg-[#5d1630] text-white py-3 rounded-xl font-semibold transition"
          >
            Simpan
          </button>

          <button
            onClick={() => navigate("/dashboard/category")}
            className="flex-1 border border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            Batal
          </button>
        </div>

      </div>
    </div>
  );
}