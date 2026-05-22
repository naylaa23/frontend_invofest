import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://backend-invofest-mla8.vercel.app";

type EventType = {
  id: number;
  name: string;
  categoryId: string;
  location: string;
  dateEvent: string;
  description: string;
};

export default function EventIndex() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    const response = await fetch(`${API_URL}/events`);
    const result = await response.json();

    setEvents(Array.isArray(result) ? result : []);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    const yakin = confirm("Yakin ingin menghapus event?");

    if (!yakin) return;

    const response = await fetch(`${API_URL}/events/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      alert("Gagal menghapus event");
      return;
    }

    alert("Event berhasil dihapus");
    fetchEvents();
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="px-10 py-10 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#7B1D3F]">
            Data Event
          </h1>
          <p className="text-sm text-gray-500">Kelola semua event</p>
        </div>

        <Link
          to="/dashboard/event/create"
          className="bg-[#7B1D3F] text-white px-4 py-2 rounded-md"
        >
          Tambah Event
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        {loading && <p className="text-gray-500">Loading...</p>}

        {!loading && events.length === 0 && (
          <p className="text-gray-500">Belum ada data event</p>
        )}

        {!loading && events.length > 0 && (
          <table className="w-full text-sm border-separate border-spacing-y-2">
            <thead>
              <tr className="text-gray-500 text-xs">
                <th className="py-2 px-3 text-left">No</th>
                <th className="px-3 text-left">Nama Event</th>
                <th className="px-3 text-left">Kategori</th>
                <th className="px-3 text-left">Tanggal</th>
                <th className="px-3 text-left">Lokasi</th>
                <th className="px-3 text-left">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {events.map((item, index) => (
                <tr key={item.id} className="bg-gray-50 hover:bg-gray-100">
                  <td className="py-3 px-3 text-gray-400">{index + 1}</td>
                  <td className="px-3 font-medium">{item.name}</td>
                  <td className="px-3">{item.categoryId}</td>
                  <td className="px-3 text-gray-500">
                    {new Date(item.dateEvent).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-3 text-gray-500">{item.location}</td>

                  <td className="px-3">
                    <div className="flex gap-2">
                      <Link
                        to={`/dashboard/event/edit/${item.id}`}
                        className="px-2.5 py-1 text-xs rounded bg-yellow-50 text-yellow-700"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-2.5 py-1 text-xs rounded bg-red-50 text-red-600"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="mt-3 text-xs text-gray-500">
          Total: {events.length} event
        </div>
      </div>
    </div>
  );
}