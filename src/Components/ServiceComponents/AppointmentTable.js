import React, { useState } from 'react';

const AppointmentTable = ({ appointments, handleRescheduleClick, handleCancel, handleComplete }) => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleRowClick = (appointment) => {
    if (selectedAppointment && selectedAppointment.id === appointment.id) {
      setSelectedAppointment(null); // Collapse if the same row is clicked again
    } else {
      setSelectedAppointment(appointment); // Expand the row to show details
    }
  };

  const handleActionClick = (appointment, action) => {
    // Hide the details row when any action button is clicked
    setSelectedAppointment(null);
    // Handle the specific action (reschedule, cancel, complete)
    if (action === 'reschedule') {
      handleRescheduleClick(appointment);
    } else if (action === 'cancel') {
      // Update the status to 'Canceled' when the cancel button is clicked
      appointment.status = 'Canceled';
      handleCancel(appointment.id); // Call the external cancel function if needed
    } else if (action === 'complete') {
      // Update the status to 'Completed' when the complete button is clicked
      appointment.status = 'Completed';
      handleComplete(appointment.id); // Call the external complete function if needed
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Scheduled & Pending Appointments</h2>
      <table className="w-full table-auto text-left border-separate ">
        <thead className="border-b">
          <tr className='bg-slate-900 text-white'>
            <th className="px-4 py-2">Appointment ID</th>
            <th className="px-4 py-2">Customer</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Service Type</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <React.Fragment key={appointment.id}>
              <tr
                className="border-b cursor-pointer hover:bg-gray-50"
                onClick={() => handleRowClick(appointment)}
              >
                <td className="px-4 py-2">{appointment.id}</td>
                <td className="px-4 py-2">
                  <div className="md:flex md:justify-between">
                    <span>{appointment.customerName}</span>
                  </div>
                  <div className="md:hidden">
                    <button
                      onClick={() => handleRowClick(appointment)}
                      className="text-blue-500 hover:underline"
                    >
                      View Details
                    </button>
                  </div>
                </td>
                <td className="px-4 py-2">{appointment.date}</td>
                <td className="px-4 py-2">{appointment.time}</td>
                <td className="px-4 py-2">{appointment.serviceType}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      appointment.status === 'Pending'
                        ? 'bg-yellow-200 text-yellow-800'
                        : appointment.status === 'Scheduled'
                        ? 'bg-blue-200 text-blue-800'
                        : appointment.status === 'Completed'
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {appointment.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  {appointment.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleActionClick(appointment, 'reschedule')}
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                      >
                        Schedule
                      </button>
                      <button
                        onClick={() => handleActionClick(appointment, 'cancel')}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {appointment.status === 'Scheduled' && (
                    <>
                      <button
                        onClick={() => handleActionClick(appointment, 'reschedule')}
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                      >
                        Reschedule
                      </button>
                      <button
                        onClick={() => handleActionClick(appointment, 'complete')}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Complete
                      </button>
                    </>
                  )}
                  {(appointment.status === 'Completed' || appointment.status === 'Canceled') && (
                    <span className="text-gray-500">No action available</span>
                  )}
                </td>
              </tr>

              {/* Details Row */}
              {selectedAppointment && selectedAppointment.id === appointment.id && (
                <tr className="border-b bg-gray-100">
                  <td colSpan="7" className="px-4 py-4">
                    <div className="space-y-4">
                      <div className="p-4 bg-white shadow-md rounded-lg">
                        <p>
                          <strong>Customer Details:</strong> {appointment.customerDetails}
                        </p>
                        <p>
                          <strong>Service Requested:</strong> {appointment.serviceRequested}
                        </p>
                        <p>
                          <strong>Notes:</strong> {appointment.notes}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
