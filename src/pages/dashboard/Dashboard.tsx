import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://backend-invofest-mla8.vercel.app";

type EventItem = {
  id: number;
  name: string;
  dateEvent: string;
};

type SpeakerItem = {
  id: number;
  name: string;
  role: string;
};

export default function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [speakers, setSpeakers] = useState<SpeakerItem[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));

    fetch(`${API_URL}/events`)
      .then((res) => res.json())
      .then((data) => setEvents(data));

    fetch(`${API_URL}/pembicara`)
      .then((res) => res.json())
      .then((data) => setSpeakers(data));
  }, []);

  const stats = [
    { title: "Kategori", value: categories.length },
    { title: "Event", value: events.length },
    { title: "Pembicara", value: speakers.length },
    { title: "Event Aktif", value: events.length },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-end mb-6">
        <Link to="/dashboard/biodata">
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-[#7B1D3F] flex items-center justify-center text-white font-semibold">
              A
            </div>

            <div className="text-right">
              <h3 className="text-sm font-semibold text-gray-800">Admin</h3>
              <p className="text-xs text-gray-500">naylazalfa03@gmail.com</p>
            </div>
          </div>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-1 text-[#7B1D3F]">
        Dashboard
      </h1>

      <p className="mb-6 text-gray-600">
        Selamat datang, berikut ringkasan data hari ini.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center"
          >
            <p className="text-sm text-gray-500 mb-1">{item.title}</p>
            <p className="text-2xl font-bold text-[#7B1D3F]">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold mb-4 text-gray-700 text-lg">
            Event Terbaru
          </h2>

          {events.length === 0 ? (
            <p className="text-sm text-gray-400">Belum ada event</p>
          ) : (
            <ul className="space-y-3">
              {events.slice(0, 3).map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between border-b pb-3 last:border-none"
                >
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-gray-400 text-sm">
                    {new Date(item.dateEvent).toLocaleDateString("id-ID")}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold mb-4 text-gray-700 text-lg">
            Pembicara Terbaru
          </h2>

          {speakers.length === 0 ? (
            <p className="text-sm text-gray-400">Belum ada pembicara</p>
          ) : (
            <ul className="space-y-3">
              {speakers.slice(0, 3).map((item) => (
                <li key={item.id} className="border-b pb-3 last:border-none">
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-gray-400 text-sm">{item.role}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}