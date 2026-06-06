import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3000";

type User = {
  id: number;
  username: string;
  foto: string;
};

export default function UserIndex() {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    const res = await fetch(`${API_URL}/users`);
    const data = await res.json();
    setUsers(data);
  };

  const hapusUser = async (id: number) => {
    const yakin = confirm("Yakin ingin menghapus user?");
    if (!yakin) return;

    await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
    });

    alert("User berhasil dihapus");
    getUsers();
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#7B1D3F]">
            Data User
          </h1>

          <p className="text-sm text-gray-500">
            Kelola data user
          </p>
        </div>

        <Link
          to="/dashboard/user/create"
          className="bg-[#7B1D3F] text-white px-4 py-2 rounded-lg"
        >
          Tambah
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
        {users.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-gray-50 rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.foto}
                alt={item.username}
                className="w-12 h-12 rounded-full object-cover"
              />

              <div>
                <h2 className="font-semibold">{item.username}</h2>
                <p className="text-xs text-gray-400">
                  ID: {item.id}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Link
                to={`/dashboard/user/edit/${item.id}`}
                className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-md text-sm"
              >
                Edit
              </Link>

              <button
                onClick={() => hapusUser(item.id)}
                className="px-3 py-1 bg-red-100 text-red-600 rounded-md text-sm"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}

        {users.length === 0 && (
          <p className="text-sm text-gray-400">
            Belum ada data user
          </p>
        )}
      </div>
    </div>
  );
}