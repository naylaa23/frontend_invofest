import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3000";

type Pembicara = {
  id: number;
  name: string;
  role: string;
  image: string;
};

export default function PembicaraIndex() {
  const [speakers, setSpeakers] = useState<Pembicara[]>([]);

  const getPembicara = async () => {
    const res = await fetch(`${API_URL}/pembicara`);
    const data = await res.json();
    setSpeakers(data);
  };

  const hapusPembicara = async (id: number) => {
    const yakin = confirm("Yakin ingin menghapus pembicara?");
    if (!yakin) return;

    await fetch(`${API_URL}/pembicara/${id}`, {
      method: "DELETE",
    });

    alert("Pembicara berhasil dihapus");
    getPembicara();
  };

  useEffect(() => {
    getPembicara();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#7B1D3F]">
            Data Pembicara
          </h1>

          <p className="text-sm text-gray-500">
            Kelola pembicara event
          </p>
        </div>

        <Link
          to="/dashboard/pembicara/create"
          className="bg-[#7B1D3F] text-white px-4 py-2 rounded-lg"
        >
          Tambah
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
        {speakers.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-gray-50 rounded-xl p-4"
          >
            <div>
              <h2 className="font-semibold">{item.name}</h2>

              <p className="text-xs text-gray-400">
                Role: {item.role}
              </p>

              <p className="text-xs text-gray-400">
                ID: {item.id}
              </p>
            </div>

            <div className="flex gap-2">
              <Link
                to={`/dashboard/pembicara/edit/${item.id}`}
                className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-md text-sm"
              >
                Edit
              </Link>

              <button
                onClick={() => hapusPembicara(item.id)}
                className="px-3 py-1 bg-red-100 text-red-600 rounded-md text-sm"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}

        {speakers.length === 0 && (
          <p className="text-sm text-gray-400">
            Belum ada data pembicara
          </p>
        )}
      </div>
    </div>
  );
}