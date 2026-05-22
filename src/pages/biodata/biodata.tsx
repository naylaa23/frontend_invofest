import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUniversity,
  FaBookOpen,
} from "react-icons/fa";

export default function Biodata() {
  const biodata = {
    name: "Nayla Zalfa Zahiyah",
    email: "naylazalfa03@gmail.com",
    phone: "0852928014479",
    address: "Balapulang, Tegal",
    university: "Universitas Harkat Negeri",
    studyProgram: "Teknik Informatika",
  };

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold text-[#7B1D3F] mb-6">
        Data Biodata
      </h2>

      <div className="bg-white p-6 rounded-2xl shadow-md max-w-[700px]">

        {/* PROFILE */}
        <div className="flex items-center gap-4 mb-8">

          <div className="w-16 h-16 rounded-full bg-[#7B1D3F] text-white flex items-center justify-center text-2xl font-bold">
            N
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              {biodata.name}
            </h3>

            <p className="text-gray-500">
              Administrator
            </p>
          </div>

        </div>

        {/* DETAIL */}
        <div className="space-y-4">

          <div className="flex items-center gap-3">
            <FaUser className="text-[#7B1D3F]" />
            <p><strong>Nama:</strong> {biodata.name}</p>
          </div>

          <div className="flex items-center gap-3">
            <FaEnvelope className="text-[#7B1D3F]" />
            <p><strong>Email:</strong> {biodata.email}</p>
          </div>

          <div className="flex items-center gap-3">
            <FaPhone className="text-[#7B1D3F]" />
            <p><strong>No HP:</strong> {biodata.phone}</p>
          </div>

          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-[#7B1D3F]" />
            <p><strong>Alamat:</strong> {biodata.address}</p>
          </div>

          <div className="flex items-center gap-3">
            <FaUniversity className="text-[#7B1D3F]" />
            <p><strong>Universitas:</strong> {biodata.university}</p>
          </div>

          <div className="flex items-center gap-3">
            <FaBookOpen className="text-[#7B1D3F]" />
            <p><strong>Program Studi:</strong> {biodata.studyProgram}</p>
          </div>

        </div>

      </div>

    </div>
  );
}