import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3000";

type Category = {
  id: number;
  name: string;
};

export default function CategoryIndex() {
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    const res = await fetch(`${API_URL}/categories`);
    const data = await res.json();
    setCategories(data);
  };

  const hapusCategory = async (id: number) => {
    const yakin = confirm("Yakin ingin menghapus kategori?");
    if (!yakin) return;

    await fetch(`${API_URL}/categories/${id}`, {
      method: "DELETE",
    });

    alert("Kategori berhasil dihapus");
    getCategories();
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#7B1D3F]">
            Data Kategori
          </h1>

          <p className="text-sm text-gray-500">
            Kelola kategori event
          </p>
        </div>

        <Link
          to="/dashboard/category/create"
          className="bg-[#7B1D3F] text-white px-4 py-2 rounded-lg"
        >
          Tambah
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
        {categories.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-gray-50 rounded-xl p-4"
          >
            <div>
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-xs text-gray-400">
                ID: {item.id}
              </p>
            </div>

            <div className="flex gap-2">
              <Link
                to={`/dashboard/category/edit/${item.id}`}
                className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-md text-sm"
              >
                Edit
              </Link>

              <button
                onClick={() => hapusCategory(item.id)}
                className="px-3 py-1 bg-red-100 text-red-600 rounded-md text-sm"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}

        {categories.length === 0 && (
          <p className="text-sm text-gray-400">
            Belum ada data kategori
          </p>
        )}
      </div>
    </div>
  );
}