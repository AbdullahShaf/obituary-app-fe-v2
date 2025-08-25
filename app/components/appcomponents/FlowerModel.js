export default function FlowerModal({ isOpen, onClose, shops }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#F8EDE3] w-[90%] max-w-4xl rounded-lg p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-black"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-[#1E2125]">Cvetličarne</h2>
        <p className="text-blue-600 text-lg mt-1">Trbovlje</p>

        {/* Shops Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mt-8">
          {shops.map((shop, index) => (
            <div
              key={index}
              className={`bg-white p-4 rounded-lg shadow-md flex flex-col items-center ${
                shop.highlight ? "bg-[#2E4E5E] text-white" : ""
              }`}
            >
              {shop.logo && (
                <img src={shop.logo} alt={shop.name} className="h-10 mb-2" />
              )}
              <p className="font-semibold">{shop.name}</p>
              <p className="text-sm mt-1">{shop.city}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
