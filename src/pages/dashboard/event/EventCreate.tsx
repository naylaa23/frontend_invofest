import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000";

export default function EventCreate() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [location, setLocation] = useState("");
  const [dateEvent, setDateEvent] = useState("");
  const [description, setDescription] = useState("");

  const [nameError, setNameError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [dateError, setDateError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const simpanEvent = async () => {
    setNameError("");
    setCategoryError("");
    setLocationError("");
    setDateError("");
    setDescriptionError("");

    let valid = true;

    if (name.length < 3) {
      setNameError("Nama event minimal 3 karakter");
      valid = false;
    }

    if (categoryId === "") {
      setCategoryError("ID kategori wajib diisi");
      valid = false;
    }

    if (location.length < 3) {
      setLocationError("Lokasi minimal 3 karakter");
      valid = false;
    }

    if (dateEvent === "") {
      setDateError("Tanggal event wajib diisi");
      valid = false;
    }

    if (description.length < 3) {
      setDescriptionError("Deskripsi minimal 3 karakter");
      valid = false;
    }

    if (!valid) return;

    const response = await fetch(`${API_URL}/events`, {
      method: "POST",
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
      setDescriptionError("Gagal membuat event");
      return;
    }

    navigate("/dashboard/event");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-xl bg-white p-8 rounded-3xl shadow">
        <h1 className="text-3xl font-bold text-[#7B1D3F] mb-2">
          Tambah Event
        </h1>

        <p className="text-gray-400 text-sm mb-6">
          Isi data event kamu
        </p>

        <div className="mb-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama event"
            className={`w-full border px-4 py-3 rounded-xl ${
              nameError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {nameError && (
            <p className="text-red-500 text-sm mt-1">{nameError}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            placeholder="Masukkan ID kategori"
            className={`w-full border px-4 py-3 rounded-xl ${
              categoryError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {categoryError && (
            <p className="text-red-500 text-sm mt-1">{categoryError}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Masukkan lokasi"
            className={`w-full border px-4 py-3 rounded-xl ${
              locationError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {locationError && (
            <p className="text-red-500 text-sm mt-1">{locationError}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="date"
            value={dateEvent}
            onChange={(e) => setDateEvent(e.target.value)}
            className={`w-full border px-4 py-3 rounded-xl ${
              dateError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {dateError && (
            <p className="text-red-500 text-sm mt-1">{dateError}</p>
          )}
        </div>

        <div className="mb-5">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Masukkan deskripsi event"
            rows={4}
            className={`w-full border px-4 py-3 rounded-xl ${
              descriptionError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {descriptionError && (
            <p className="text-red-500 text-sm mt-1">
              {descriptionError}
            </p>
          )}
        </div>

        <button
          onClick={simpanEvent}
          className="bg-[#7B1D3F] text-white px-5 py-3 rounded-xl"
        >
          Simpan
        </button>
      </div>
    </div>
  );
}