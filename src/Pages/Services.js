import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { FaLaptop, FaDesktop, FaWrench } from 'react-icons/fa'; // Using react-icons for PC and Laptop icons
import serviceImage from './ServiceBg.png'; // Background image
import { AiOutlineCheckCircle } from 'react-icons/ai'; // Success icon

function UserBooking() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [name, setName] = useState('John Doe'); // Default logged-in user name
  const [email, setEmail] = useState('john@example.com'); // Default logged-in user email
  const [bookingDate, setBookingDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Automatically set name and email if the user is logged in
  useEffect(() => {
    // Replace with real user data from login context or state
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
    };

    if (userData) {
      setName(userData.name);
      setEmail(userData.email);
    }
  }, []);

  const handleServiceSelection = (service) => {
    setSelectedService(service);
    setSelectedCategory(''); // Reset category when a new service is selected
    setBookingSuccess(false); // Reset success message when selecting a new service
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookingSuccess(true); // Set booking as successful
  };

  const handleBackToSelection = () => {
    setBookingSuccess(false); // Reset success state when going back to service selection
    setSelectedService(null); // Reset selected service
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main
        className="p-3 bg-cover bg-center text-white"
        style={{
          backgroundImage: `url(${serviceImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh', // Ensuring it covers full screen height
        }}
      >
        <div className="max-w-3xl mx-auto space-y-8">
          {bookingSuccess ? (
            // Booking confirmation message
            <div className="bg-white bg-opacity-80 shadow-2xl rounded-lg p-6 mt-8 text-center">
              <AiOutlineCheckCircle className="mx-auto text-green-500 text-6xl mb-4" />
              <h3 className="text-2xl font-semibold text-black">Booking Confirmed!</h3>
              <p className="mt-4 text-black text-lg">
                Your {selectedService} booking has been successfully confirmed. The admin will notify you with the final date and time for your appointment.
              </p>
              <div className="mt-6 text-black">
                <h4 className="font-medium">Service Details:</h4>
                <p><strong>Category:</strong> {selectedCategory || 'N/A'}</p>
                <p><strong>Booking Date:</strong> {bookingDate || 'N/A'}</p>
                <p><strong>Time Slot:</strong> {timeSlot || 'N/A'}</p>
              </div>
              <div className="mt-6">
                <button
                  onClick={handleBackToSelection}
                  className="py-2 px-6 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                >
                  Go Back to Service Selection
                </button>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                You will be notified by the admin with further details soon.
              </div>
            </div>
          ) : selectedService === null ? (
            <>
              <h2 className="text-3xl font-semibold text-center text-black">Select a Service</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 text-black">
                {/* Laptop Services Card */}
                <div
                  className="bg-white bg-opacity-70 shadow-lg rounded-lg p-6 text-center cursor-pointer hover:shadow-xl sm:w-full lg:w-64"
                  onClick={() => handleServiceSelection('Laptop Services')}
                >
                  <FaLaptop className="mx-auto h-16 w-16 mb-4" />
                  <h3 className="text-xl font-semibold">Laptop Services</h3>
                </div>

                {/* PC Services Card */}
                <div
                  className="bg-white bg-opacity-70 shadow-lg rounded-lg p-6 text-center cursor-pointer hover:shadow-xl sm:w-full lg:w-64"
                  onClick={() => handleServiceSelection('PC Services')}
                >
                  <FaDesktop className="mx-auto h-16 w-16 mb-4" />
                  <h3 className="text-xl font-semibold">PC Services</h3>
                </div>

                {/* Other Services Card */}
                <div
                  className="bg-white bg-opacity-70 shadow-lg rounded-lg p-6 text-center cursor-pointer hover:shadow-xl sm:w-full lg:w-64"
                  onClick={() => handleServiceSelection('Other Services')}
                >
                  <FaWrench className="mx-auto h-16 w-16 mb-4" />
                  <h3 className="text-xl font-semibold">Other Services</h3>
                </div>
              </div>
              <div className="bg-white bg-opacity-80 p-6 rounded-lg mt-8">
                <h3 className="text-2xl font-semibold text-black">Booking Information</h3>
                <p className="mt-4 text-black text-sm">
                  <strong>Laptop Services:</strong> Need a repair, upgrade, or setup for your laptop? Book an appointment, and we’ll schedule a time for you. Make sure to visit our store at the confirmed time to get your service done.
                </p>
                <p className="mt-4 text-black text-sm">
                  <strong>PC Services:</strong> If your desktop needs troubleshooting, hardware upgrades, or software installation, schedule a service with us. Once booked, we’ll provide a time slot—just bring your PC to our store at that time.
                </p>
                <p className="mt-4 text-black text-sm">
                  <strong>Other Services:</strong> For custom PC builds, data recovery, virus removal, or any other tech issues, book an appointment. We’ll let you know when to visit, so you can get the help you need without the wait.
                </p>
                <p className="mt-4 text-black text-sm">
                  If you have any questions or need more details, feel free to
                  <a href="/contact-us" className="text-blue-500 font-semibold text-base hover:no-underline"> contact us</a>  .
                  We’re happy to help!
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center mb-4">
                <button
                  className="flex items-center underline text-black"
                  onClick={() => setSelectedService(null)} // Go back to service selection
                >
                  <ArrowLeftIcon className="h-7 w-9 mr-2" />
                </button>
              </div>

              <h2 className="text-3xl font-semibold text-center text-black">Book Your {selectedService}</h2>

              <div className="bg-white bg-opacity-80 shadow-2xl rounded-lg p-6 mt-8 text-black">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium">Your Name</label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full p-3 border border-gray-300 rounded-lg sm:text-sm"
                      required
                      
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium">Your Email</label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                      
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium">Select Category</label>
                    <select
                      id="category"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg sm:text-sm"
                      required
                    >
                      <option value="">Select Category</option>

                      {/* Category Options for Laptop Services */}
                      {selectedService === 'Laptop Services' && (
                        <>
                          <option value="repair">Repair</option>
                          <option value="upgrade">Upgrade</option>
                          <option value="setup">Setup</option>
                        </>
                      )}

                      {/* Category Options for PC Services */}
                      {selectedService === 'PC Services' && (
                        <>
                          <option value="troubleshoot">Troubleshoot</option>
                          <option value="upgrade">Upgrade</option>
                          <option value="software_installation">Software Installation</option>
                        </>
                      )}

                      {/* Category Options for Other Services */}
                      {selectedService === 'Other Services' && (
                        <>
                          <option value="custom_builds">Custom PC Builds</option>
                          <option value="data_recovery">Data Recovery</option>
                          <option value="virus_removal">Virus Removal</option>
                          <option value="other">Other</option>
                        </>
                      )}
                    </select>
                  </div>

                  {(selectedService === 'Laptop Services' || selectedService === 'PC Services'  || selectedService === 'Other Services') && (
                    <div>
                      <label htmlFor="additionalDetails" className="block text-sm font-medium">Additional Information</label>
                      <textarea
                        id="additionalDetails"
                        value={additionalDetails}
                        onChange={(e) => setAdditionalDetails(e.target.value)}
                        placeholder="Provide additional information about your request"
                        className="w-full p-3 border border-gray-300 rounded-lg sm:text-sm"
                        rows="4"
                        required
                      />
                    </div>
                  )}

                  {/* {selectedCategory === 'other' && (
                    <div>
                      <label htmlFor="additionalDetails" className="block text-sm font-medium">Additional Information</label>
                      <textarea
                        id="additionalDetails"
                        value={additionalDetails}
                        onChange={(e) => setAdditionalDetails(e.target.value)}
                        placeholder="Provide additional information about your request"
                        className="w-full p-3 border border-gray-300 rounded-lg sm:text-sm"
                        rows="4"
                        required
                      />
                    </div>
                  )} */}

                  <div>
                    <label htmlFor="bookingDate" className="block text-sm font-medium">Select Booking Date</label>
                    <input
                      id="bookingDate"
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="timeSlot" className="block text-sm font-medium">Select Time Slot</label>
                    <select
                      id="timeSlot"
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                    >
                      <option value="">Choose a Time Slot</option>
                      <option value="9-11">9:00 AM - 11:00 AM</option>
                      <option value="11-1">11:00 AM - 1:00 PM</option>
                      <option value="1-3">1:00 PM - 3:00 PM</option>
                    </select>
                  </div>

                  <div className="flex justify-center">
                    <button type="submit" className="py-2 px-6 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                      Confirm Booking
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default UserBooking;
