export default function CartContent1() {
  return (
    <div className="bg-[#181c24] rounded-2xl shadow-xl p-6 w-full mx-auto text-white relative mt-1">
      <div className="text-4xl font-bold text-white mb-2">Pembelian Tiket</div>
      <div className="text-sm text-gray-400 mb-4">
        Beli dan dapatkan penawaran spesial dari Taman Bhinneka Corp.
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 mb-4">
        {/* Basic */}
        <div className="bg-[#23283a] rounded-xl p-4 flex flex-col items-center shadow">
          <div className="font-bold text-lg mb-1">Basic</div>
          <div className="text-3xl font-extrabold mb-1">30K</div>
          <div className="text-xs text-gray-300 mb-2">Akses 1 Hari</div>
          <ul className="text-xs text-gray-400 mb-2 text-center">
            <li>Masuk ke taman</li>
            <li>Wahana utama</li>
          </ul>
          <button className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-1 mt-auto text-sm font-semibold transition">
            Pilih
          </button>
        </div>
        {/* Premium */}
        <div className="bg-[#23283a] rounded-xl p-4 flex flex-col items-center shadow border-2 border-yellow-400">
          <div className="font-bold text-lg mb-1 text-yellow-400">Premium</div>
          <div className="text-3xl font-extrabold mb-1 text-yellow-400">60K</div>
          <div className="text-xs text-gray-300 mb-2">Akses 2 Hari + Fast Track</div>
          <ul className="text-xs text-gray-400 mb-2 text-center">
            <li>Semua Basic</li>
            <li>Fast track wahana</li>
            <li>1x VR/AR Experience</li>
          </ul>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-[#181c24] rounded px-4 py-1 mt-auto text-sm font-semibold transition">
            Pilih
          </button>
        </div>
        {/* Family */}
        <div className="bg-[#23283a] rounded-xl p-4 flex flex-col items-center shadow border-2 border-red-500">
          <div className="font-bold text-lg mb-1">Family</div>
          <div className="text-3xl font-extrabold mb-1">100K</div>
          <div className="text-xs text-gray-300 mb-2">4 Tiket (1 Hari)</div>
          <ul className="text-xs text-gray-400 mb-2 text-center">
            <li>4 Tiket masuk</li>
            <li>Semua fasilitas Basic</li>
          </ul>
          <button className="bg-green-500 hover:bg-green-600 text-white rounded px-4 py-1 mt-auto text-sm font-semibold transition">
            Pilih
          </button>
        </div>
      </div>
      <div className="font-bold text-base sm:text-lg text-red-400 mt-3">WE'RE ON FUTURE CULTURE</div>
      <div className="text-xs text-white mt-1">
        Wahana interaktif modern yang menghadirkan kekayaan budaya, alam serta kearifan lokal yang merupakan identitas
        sekaligus kekuatan bangsa dibungkus oleh teknologi canggih agar lebih mudah diakses dan dinikmati oleh semua kalangan.
      </div>
    </div>
  );
}