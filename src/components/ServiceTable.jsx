import React, { useEffect, useState } from 'react';

const BASE_URL = 'http://20.193.149.47:2242/salons/service/';

const ServiceTable = () => {
  const [services, setServices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUrl] = useState(BASE_URL);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 100;

  const fetchServices = async (url) => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      const formatted = Array.isArray(data) ? data : [data];
      setServices(formatted);
      setFiltered(formatted);
      setCurrentPage(1);
    } catch (err) {
      console.error("Failed to fetch services:", err);
      setServices([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices(currentUrl);
  }, [currentUrl]);

  useEffect(() => {
    const filteredData = services.filter(service =>
      service.service_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFiltered(filteredData);
    setCurrentPage(1);
  }, [searchQuery, services]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filtered.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filtered.length / recordsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-200 max-w-6xl mx-auto mt-6 text-sm sm:text-base">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">Salon Services</h2>
        <input
          type="text"
          placeholder="🔍 Search by service name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg w-full md:w-1/3 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm sm:text-base"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-[#6c6c6cd3] to-[#6c6c6cd3] text-white text-xs sm:text-sm">
            <tr>
              <th className="px-4 py-2 sm:px-6 sm:py-3 font-medium">#</th>
              <th className="px-4 py-2 sm:px-6 sm:py-3 font-medium">Service Name</th>
              <th className="px-4 py-2 sm:px-6 sm:py-3 font-medium">Price</th>
              <th className="px-4 py-2 sm:px-6 sm:py-3 font-medium">Duration (min)</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">Loading...</td>
              </tr>
            ) : currentRecords.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-400">No Data Available</td>
              </tr>
            ) : (
              currentRecords.map((service, index) => (
                <tr
                  key={service.id}
                  className="hover:bg-gray-100 border-b border-gray-200 transition duration-150 text-xs sm:text-sm"
                >
                  <td className="px-4 py-3 sm:px-6">{indexOfFirstRecord + index + 1}</td>
                  <td className="px-4 py-3 sm:px-6 text-gray-800">{service.service_name}</td>
                  <td className="px-4 py-3 sm:px-6 text-green-600 font-semibold">₹{service.price}</td>
                  <td className="px-4 py-3 sm:px-6">{service.service_time?.minutes || 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
     <div className="flex justify-between items-center mt-6">
  <button
    onClick={handlePrevPage}
    disabled={currentPage === 1}
    className={`px-3 py-1.5 text-xs md:px-5 md:py-2 md:text-base rounded-lg text-white font-medium transition ${
      currentPage === 1
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-indigo-400 hover:bg-indigo-600'
    }`}
  >
    ⬅ Prev
  </button>
  <span className="text-gray-600 font-medium text-sm md:text-base">
    Page {currentPage} of {totalPages}
  </span>
  <button
    onClick={handleNextPage}
    disabled={currentPage === totalPages}
    className={`px-3 py-1.5 text-xs md:px-5 md:py-2 md:text-base rounded-lg text-white font-medium transition ${
      currentPage === totalPages
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-indigo-400 hover:bg-indigo-600'
    }`}
  >
    Next ➡
  </button>
</div>
    </div>
  );
};

export default ServiceTable;
