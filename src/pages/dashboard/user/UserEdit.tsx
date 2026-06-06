import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:3000";

export default function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [foto, setFoto] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.username || "");
        setPassword(data.password || "");
        setFoto(data.foto || "");
      });
  }, [id]);

  const handleUpdate = async () => {
    const res = await fetch(`${API_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        foto,
      }),
    });

    if (!res.ok) {
      alert("Gagal update user");
      return;
    }

    alert("User berhasil diupdate");
    navigate("/dashboard/user");
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold text-[#7B1D3F] mb-5">
        Edit User
      </h1>

      <div className="space-y-4">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
        />

        <input
          value={foto}
          onChange={(e) => setFoto(e.target.value)}
          placeholder="URL Foto"
          className="w-full border px-3 py-2 rounded"
        />

        <div className="flex gap-3">
          <button
            onClick={handleUpdate}
            className="bg-[#7B1D3F] text-white px-4 py-2 rounded"
          >
            Simpan
          </button>

          <button
            onClick={() => navigate("/dashboard/user")}
            className="border px-4 py-2 rounded"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}