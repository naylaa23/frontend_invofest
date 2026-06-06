import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000";

export default function Dashboard() {
  const [user, setUser] = useState(0);
  const [category, setCategory] = useState(0);
  const [event, setEvent] = useState(0);
  const [pembicara, setPembicara] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then((res) => res.json())
      .then((data) => setUser(data.length));

    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategory(data.length));

    fetch(`${API_URL}/events`)
      .then((res) => res.json())
      .then((data) => setEvent(data.length));

    fetch(`${API_URL}/pembicara`)
      .then((res) => res.json())
      .then((data) => setPembicara(data.length));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#7B1D3F] mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl shadow text-center">
          <p>User</p>
          <h2 className="text-2xl font-bold">{user}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <p>Kategori</p>
          <h2 className="text-2xl font-bold">{category}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <p>Event</p>
          <h2 className="text-2xl font-bold">{event}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow text-center">
          <p>Pembicara</p>
          <h2 className="text-2xl font-bold">{pembicara}</h2>
        </div>
      </div>
    </div>
  );
}