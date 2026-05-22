import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PembicaraEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/pembicara/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setRole(data.role);
        setImage(data.image);
      });
  }, [id]);

  const updatePembicara = async () => {
    const response = await fetch(`http://localhost:3000/pembicara/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, role, image }),
    });

    if (!response.ok) {
      alert("Gagal update pembicara");
      return;
    }

    alert("Pembicara berhasil diupdate");
    navigate("/dashboard/pembicara");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#7B1D3F] mb-2">
          Edit Pembicara
        </h1>

        <p className="text-gray-400 mb-8">
          Perbarui data pembicara
        </p>

        <div className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama pembicara"
            className="w-full border border-gray-200 rounded-xl px-4 py-3"
          />

          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role pembicara"
            className="w-full border border-gray-200 rounded-xl px-4 py-3"
          />

          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="URL image"
            className="w-full border border-gray-200 rounded-xl px-4 py-3"
          />
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={updatePembicara}
            className="flex-1 bg-[#7B1D3F] text-white py-3 rounded-xl font-semibold"
          >
            Simpan
          </button>

          <button
            onClick={() => navigate("/dashboard/pembicara")}
            className="flex-1 border py-3 rounded-xl font-semibold"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}