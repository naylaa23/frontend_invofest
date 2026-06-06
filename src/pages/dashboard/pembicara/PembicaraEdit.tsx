import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:3000";

export default function PembicaraEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/pembicara/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setRole(data.role);
        setImage(data.image);
      });
  }, [id]);

  const updatePembicara = async () => {
    const response = await fetch(`${API_URL}/pembicara/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        role,
        image,
      }),
    });

    if (!response.ok) {
      alert("Gagal update pembicara");
      return;
    }

    alert("Pembicara berhasil diupdate");
    navigate("/dashboard/pembicara");
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <div className="bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-[#7B1D3F] mb-5">
          Edit Pembicara
        </h1>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama pembicara"
          className="w-full border px-3 py-2 rounded-lg mb-4"
        />

        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role pembicara"
          className="w-full border px-3 py-2 rounded-lg mb-4"
        />

        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="URL image"
          className="w-full border px-3 py-2 rounded-lg mb-4"
        />

        <div className="flex gap-2">
          <button
            onClick={updatePembicara}
            className="bg-[#7B1D3F] text-white px-4 py-2 rounded-lg"
          >
            Simpan
          </button>

          <button
            onClick={() => navigate("/dashboard/pembicara")}
            className="border px-4 py-2 rounded-lg"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}