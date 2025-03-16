import React from 'react';

const RescheduleModal = ({ showRescheduleForm, rescheduleData, setRescheduleData, handleRescheduleSubmit, setShowRescheduleForm }) => {
  return (
    showRescheduleForm && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h3 className="text-xl font-semibold mb-4">Reschedule Appointment</h3>
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700">Date</label>
            <input
              type="date"
              id="date"
              value={rescheduleData.date}
              onChange={(e) => setRescheduleData({ ...rescheduleData, date: e.target.value })}
              className="border p-2 w-full rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="time" className="block text-gray-700">Time</label>
            <input
              type="time"
              id="time"
              value={rescheduleData.time}
              onChange={(e) => setRescheduleData({ ...rescheduleData, time: e.target.value })}
              className="border p-2 w-full rounded-md"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowRescheduleForm(false)}
              className="bg-gray-300 text-white px-6 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleRescheduleSubmit}
              className="bg-blue-500 text-white px-6 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default RescheduleModal;
