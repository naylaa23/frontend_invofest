import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://backend-invofest-mla8.vercel.app";

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
    setSpeakers(Array.isArray(data) ? data : data.data || []);
  };

  const hapusPembicara = async (pembicaraId: number) => {
    if (!confirm("Yakin mau hapus pembicara ini?")) return;

    await fetch(`${API_URL}/pembicara/${pembicaraId}`, {
      method: "DELETE",
    });

    getPembicara();
  };

  useEffect(() => {
    getPembicara();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#7B1D3F]">Pembicara</h1>
          <p className="text-sm text-gray-500">Data pembicara event</p>
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
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#7B1D3F] text-white flex items-center justify-center font-semibold">
                {item.name.charAt(0)}
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.role}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Link
                to={`/dashboard/pembicara/edit/${item.id}`}
                className="px-3 py-1 rounded-md bg-yellow-100 text-yellow-700 text-sm"
              >
                Edit
              </Link>

              <button
                onClick={() => hapusPembicara(item.id)}
                className="px-3 py-1 rounded-md bg-red-100 text-red-600 text-sm"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}

        <p className="text-sm text-gray-500">
          Total: {speakers.length} pembicara
        </p>
      </div>
    </div>
  );
}