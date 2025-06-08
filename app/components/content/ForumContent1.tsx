import React from "react";

export default function News2() {
  return (
    <div className="bg-[#181c24] rounded-2xl shadow-xl p-6 w-full mx-auto text-white relative mt-2">
      {/* Tanggal dan menu */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-400">March 08, 2021</span>
        <button className="text-gray-400 hover:text-gray-200 text-lg px-2">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="4" cy="10" r="2"/>
            <circle cx="10" cy="10" r="2"/>
            <circle cx="16" cy="10" r="2"/>
          </svg>
        </button>
      </div>
      {/* Judul dan subjudul */}
      <div className="mb-2">
        <div className="text-xl font-bold">Logo Designing</div>
        <div className="text-sm text-gray-400">Wireframing</div>
      </div>
      {/* Progress bar */}
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-400">Progress</span>
          <span className="text-xs text-gray-400">20%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: "20%" }}></div>
        </div>
      </div>
      {/* Avatar dan waktu */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex -space-x-2">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="avatar1"
            className="w-8 h-8 rounded-full border-2 border-[#181c24]"
          />
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="avatar2"
            className="w-8 h-8 rounded-full border-2 border-[#181c24]"
          />
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center border-2 border-[#181c24] text-white text-lg font-bold">
            +
          </div>
        </div>
        <span className="bg-[#23283a] text-gray-200 px-4 py-1 rounded-full text-xs font-semibold">
          3 weeks left
        </span>
      </div>
    </div>
  );
}