import { useState, useEffect } from "react";
import { FaCalendarCheck, FaSearch, FaEnvelope, FaTimes } from "react-icons/fa";

export default function AppointmentHistory() {
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);

  useEffect(() => {
    const dummyAppointments = [
      {
        id: 1,
        service: "Laptop Repair",
        date: "2025-02-10",
        time: "10:00 AM",
        status: "Completed",
        description: "Full laptop diagnostics and hardware repair.",
        messages: [
          { message: "Your appointment is confirmed for 10 AM.", date: "2025-02-10 09:00 AM" },
          { message: "Your service has been completed.", date: "2025-02-10 11:00 AM" }
        ],
      },
      {
        id: 2,
        service: "PC Cleaning",
        date: "2025-02-12",
        time: "2:00 PM",
        status: "Pending",
        description: "Full internal cleaning and thermal paste replacement.",
        messages: [{ message: "Please arrive 10 minutes early.", date: "2025-02-12 01:00 PM" }],
      },
      {
        id: 3,
        service: "Software Installation",
        date: "2025-02-15",
        time: "4:00 PM",
        status: "Upcoming",
        description: "Installing and configuring essential software.",
        messages: [],
      },
    ];
    setAppointments(dummyAppointments);
  }, []);

  const filteredAppointments = appointments.filter(
    (appointment) =>
      (filterStatus === "all" || appointment.status === filterStatus) &&
      appointment.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openMessageModal = (messages) => {
    setSelectedMessages(messages);
    setShowModal(true);
  };

  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
        <FaCalendarCheck /> Appointment History
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative w-full md:w-1/2">
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search service..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-1/3"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Upcoming">Upcoming</option>
        </select>
      </div>

      {/* Mobile View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
  {filteredAppointments.map((appointment) => (
    <div
      key={appointment.id}
      className="bg-white p-5 rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-[1.02]"
    >
      {/* Service Title */}
      <h3 className="text-xl font-semibold text-gray-900">{appointment.service}</h3>

      {/* Date & Time */}
      <p className="text-gray-600 mt-1 flex items-center gap-2">
        📅 {appointment.date} | ⏰ {appointment.time}
      </p>

      {/* Description */}
      <p className="text-gray-500 text-sm mt-2">{appointment.description}</p>

      {/* Status Badge */}
      <span
        className={`px-3 py-1 mt-3 inline-block rounded-full text-sm font-medium shadow-sm 
          ${appointment.status === "Completed" ? "bg-green-100 text-green-800" : 
          appointment.status === "Pending" ? "bg-yellow-100 text-yellow-800" : 
          "bg-blue-100 text-blue-800"}`}
      >
        {appointment.status}
      </span>

      {/* View Messages Button */}
      <button
        className="mt-3 w-full bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 font-medium transition hover:bg-blue-700 active:scale-95"
        onClick={() => openMessageModal(appointment.messages)}
      >
        <FaEnvelope />
        View Messages
        {appointment.messages.length > 0 && (
          <span className="ml-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            {appointment.messages.length}
          </span>
        )}
      </button>
    </div>
  ))}
</div>


      {/* Desktop Table */}
      {/* Desktop Table */}
<div className="hidden md:block bg-white shadow-lg rounded-lg overflow-x-auto">
  {filteredAppointments.length === 0 ? (
    <p className="text-gray-500 text-center py-4">No appointments found.</p>
  ) : (
    <table className="w-full text-left border-collapse">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="py-3 px-4">Service</th>
          <th className="py-3 px-4">Date</th>
          <th className="py-3 px-4">Time</th>
          <th className="py-3 px-4">Status</th>
          <th className="py-3 px-4 text-center">Messages</th>
        </tr>
      </thead>
      <tbody>
        {filteredAppointments.map((appointment) => (
          <>
            <tr
              key={appointment.id}
              className="cursor-pointer hover:bg-gray-100 transition"
              onClick={() =>
                setSelectedAppointment(selectedAppointment?.id === appointment.id ? null : appointment)
              }
            >
              <td className="py-3 px-4">{appointment.service}</td>
              <td className="py-3 px-4">{appointment.date}</td>
              <td className="py-3 px-4">{appointment.time}</td>
              
              {/* Status with Colored Badges */}
              <td className="py-3 px-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm
                  ${appointment.status === "Completed" ? "bg-green-200 text-green-800" : 
                    appointment.status === "Pending" ? "bg-yellow-200 text-yellow-800" : 
                    "bg-blue-200 text-blue-800"}`}>
                  {appointment.status}
                </span>
              </td>

              {/* Messages Button */}
              <td className="py-3 px-4 text-center">
                <button
                  className="relative bg-blue-500 text-white px-3 py-1 rounded-md flex items-center gap-2 hover:bg-blue-600 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    openMessageModal(appointment.messages);
                  }}
                >
                  <FaEnvelope />
                  View Messages
                  {appointment.messages.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {appointment.messages.length}
                    </span>
                  )}
                </button>
              </td>
            </tr>

            {/* Description Row (Only shows when the row is clicked) */}
            {selectedAppointment?.id === appointment.id && (
              <tr className="bg-gray-50">
                <td colSpan="5" className="p-4 text-gray-700 border-t">
                  <strong>Description:</strong> {appointment.description}
                </td>
              </tr>
            )}
          </>
        ))}
      </tbody>
    </table>
  )}
</div>



      {/* Message Modal */}
      {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative">
      {/* Close Button */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
      >
        <FaTimes size={18} />
      </button>

      {/* Modal Title */}
      <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">Messages</h3>

      {/* Messages List */}
      <div className="space-y-3 max-h-60 overflow-y-auto">
        {selectedMessages.length > 0 ? (
          selectedMessages.map((msg, index) => (
            <div key={index} className="bg-gray-100 p-3 rounded-md shadow-sm">
              <p className="text-sm text-gray-500">{msg.date}</p>
              <p className="text-gray-800">{msg.message}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No messages available.</p>
        )}
      </div>
    </div>
  </div>
)}

    </div>
  );
}
