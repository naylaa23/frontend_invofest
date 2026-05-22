import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "https://backend-invofest-mla8.vercel.app";

export default function EventEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [location, setLocation] = useState("");
  const [dateEvent, setDateEvent] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setCategoryId(data.categoryId);
        setLocation(data.location);
        setDateEvent(data.dateEvent?.slice(0, 10));
        setDescription(data.description);
      });
  }, [id]);

  const updateEvent = async () => {
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        categoryId,
        location,
        dateEvent,
        description,
      }),
    });

    if (!response.ok) {
      alert("Gagal update event");
      return;
    }

    alert("Event berhasil diupdate");
    navigate("/dashboard/event");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#7B1D3F] mb-2">
          Edit Event
        </h1>

        <p className="text-gray-400 mb-8">
          Perbarui data event sesuai kebutuhan
        </p>

        <div className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama event"
            className="w-full border border-gray-200 rounded-xl px-4 py-3"
          />

          <input
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            placeholder="ID kategori"
            className="w-full border border-gray-200 rounded-xl px-4 py-3"
          />

          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Lokasi"
            className="w-full border border-gray-200 rounded-xl px-4 py-3"
          />

          <input
            type="date"
            value={dateEvent}
            onChange={(e) => setDateEvent(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Deskripsi"
            className="w-full border border-gray-200 rounded-xl px-4 py-3"
          />
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={updateEvent}
            className="flex-1 bg-[#7B1D3F] text-white py-3 rounded-xl font-semibold"
          >
            Simpan
          </button>

          <button
            onClick={() => navigate("/dashboard/event")}
            className="flex-1 border py-3 rounded-xl font-semibold"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}