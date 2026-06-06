import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000";

export default function UserCreate() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [foto, setFoto] = useState("");

  const [error, setError] = useState({
    username: "",
    password: "",
    foto: "",
  });

  const simpanUser = async () => {
    const newError = {
      username: "",
      password: "",
      foto: "",
    };

    if (username.length < 3) {
      newError.username = "Username minimal 3 karakter";
    }

    if (password.length < 6) {
      newError.password = "Password minimal 6 karakter";
    }

    if (foto === "") {
      newError.foto = "URL foto wajib diisi";
    }

    setError(newError);

    if (
      newError.username ||
      newError.password ||
      newError.foto
    ) {
      return;
    }

    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        foto,
      }),
    });

    if (!response.ok) {
      return;
    }

    navigate("/dashboard/user");
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <div className="bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-[#7B1D3F] mb-5">
          Tambah User
        </h1>

        <div className="mb-4">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full border px-3 py-2 rounded-lg"
          />
          {error.username && (
            <p className="text-red-500 text-sm mt-1">
              {error.username}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border px-3 py-2 rounded-lg"
          />
          {error.password && (
            <p className="text-red-500 text-sm mt-1">
              {error.password}
            </p>
          )}
        </div>

        <div className="mb-4">
          <input
            value={foto}
            onChange={(e) => setFoto(e.target.value)}
            placeholder="URL Foto"
            className="w-full border px-3 py-2 rounded-lg"
          />
          {error.foto && (
            <p className="text-red-500 text-sm mt-1">
              {error.foto}
            </p>
          )}
        </div>

        <button
          onClick={simpanUser}
          className="bg-[#7B1D3F] text-white px-4 py-2 rounded-lg"
        >
          Simpan
        </button>
      </div>
    </div>
  );
}