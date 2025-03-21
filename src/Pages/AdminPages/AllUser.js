import React, { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import moment from "moment"; // Import moment for date formatting
import { FaTrash } from "react-icons/fa";

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state
  const [showModal, setShowModal] = useState(false); // For showing the delete confirmation modal
  const [userToDelete, setUserToDelete] = useState(null); // Store the user ID to delete

  // Memoize the mockUsers array to avoid unnecessary re-renders
  const mockUsers = useMemo(() => [
    { _id: "1", name: "John Doe", email: "john.doe@example.com", createdAt: "2023-01-01" },
    { _id: "2", name: "Jane Smith", email: "jane.smith@example.com", createdAt: "2023-01-15" },
    { _id: "3", name: "Bob Johnson", email: "bob.johnson@example.com", createdAt: "2023-02-01" },
  ], []); // empty array ensures this array is memoized

  // Fetch Users Function (Can be modified to fetch from API)
  const fetchAllUsers = useCallback(async () => {
    try {
      setLoading(true); // Show loader before fetching
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call delay
      setAllUsers(mockUsers); // Set mock data
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false); // Hide loader
    }
  }, [mockUsers]); // use mockUsers as dependency

  // Function to handle deleting a user
  const handleDelete = (userId) => {
    setUserToDelete(userId); // Set the user to delete
    setShowModal(true); // Show the modal
  };

  const confirmDelete = () => {
    if (userToDelete) {
      const updatedUsers = allUser.filter(user => user._id !== userToDelete);
      setAllUsers(updatedUsers); // Update the state after deleting
      toast.success("User deleted successfully");
    }
    setShowModal(false); // Hide the modal
  };

  const cancelDelete = () => {
    setShowModal(false); // Just hide the modal if the user cancels
  };

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <div className="bg-white pb-4 p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">All Users</h2>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          {/* Loader Animation */}
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="p-2 border">Sr.</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Created Date</th>
                <th className="p-2 border">Action</th> {/* New column for delete action */}
              </tr>
            </thead>
            <tbody>
              {allUser.map((el, index) => (
                <tr key={el._id} className="hover:bg-gray-100">
                  <td className="p-2 border text-center">{index + 1}</td>
                  <td className="p-2 border">{el.name}</td>
                  <td className="p-2 border">{el.email}</td>
                  <td className="p-2 border">{moment(el.createdAt).format("MMMM Do, YYYY")}</td>
                  <td className="p-2 border text-center">
                    <button
                      onClick={() => handleDelete(el._id)}
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
                    >
                      <FaTrash  className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Delete Confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">Are you sure you want to delete this user?</h3>
            <div className="flex justify-between">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
