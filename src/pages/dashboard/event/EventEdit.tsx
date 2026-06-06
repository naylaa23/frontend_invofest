import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:3000";

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
    <div className="p-8 max-w-xl mx-auto">
      <div className="bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-[#7B1D3F] mb-5">
          Edit Event
        </h1>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama event"
          className="w-full border px-3 py-2 rounded-lg mb-4"
        />

        <input
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          placeholder="ID kategori"
          className="w-full border px-3 py-2 rounded-lg mb-4"
        />

        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Lokasi"
          className="w-full border px-3 py-2 rounded-lg mb-4"
        />

        <input
          type="date"
          value={dateEvent}
          onChange={(e) => setDateEvent(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg mb-4"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Deskripsi"
          className="w-full border px-3 py-2 rounded-lg mb-4"
        />

        <div className="flex gap-2">
          <button
            onClick={updateEvent}
            className="bg-[#7B1D3F] text-white px-4 py-2 rounded-lg"
          >
            Simpan
          </button>

          <button
            onClick={() => navigate("/dashboard/event")}
            className="border px-4 py-2 rounded-lg"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}