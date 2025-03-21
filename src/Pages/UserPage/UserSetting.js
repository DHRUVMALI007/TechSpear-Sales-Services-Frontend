import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Correct import
import { ThemeContext } from "../../Helpers/ThemeContext";
import { FaBell, FaCog, FaLock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SettingsPage() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);

  return (
    <div className={`p-6 min-h-screen mb-32 transition-all ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-900"}`}>
      <ToastContainer position="top-right" autoClose={3000} theme={isDarkMode ? "dark" : "light"} />

      <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2">
        <FaCog /> Settings
      </h2>

      <SettingsSection title="Account">
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete Account
        </button>
      </SettingsSection>

      <SettingsSection title="Notifications" icon={<FaBell />}>
        <ToggleOption label="Email Notifications" value={emailNotifications} onChange={setEmailNotifications} />
      </SettingsSection>

      <SettingsSection title="System Preferences" icon={<FaCog />}>
        <ToggleOption label="Dark Mode" value={isDarkMode} onChange={toggleTheme} />
      </SettingsSection>

      <SettingsSection title="Change Password" icon={<FaLock />}>
        <ChangePasswordForm />
      </SettingsSection>

      {showDeleteModal && (
        <DeleteAccountModal onClose={() => setShowDeleteModal(false)} onConfirm={() => toast.success("Account deleted permanently")} />
      )}
    </div>
  );
}

function SettingsSection({ title, icon, children }) {
  const { isDarkMode } = useContext(ThemeContext); // ✅ Fix: Access `isDarkMode` here
  return (
    <div className={`p-6 rounded-xl border shadow-md mb-6 transition-all 
        ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-900"}`}>
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        {icon} {title}
      </h3>
      {children}
    </div>
  );
}
function ToggleOption({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border shadow-sm 
        bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200">
      <span>{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={value} onChange={() => onChange(!value)} className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800
            rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white
            after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 
            after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
            peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
}

function ChangePasswordForm() {
  const { isDarkMode } = useContext(ThemeContext); // ✅ Fix: Access `isDarkMode` here
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    if (!currentPassword) {
      toast.error("Current password is required.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    toast.success("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        type="password"
        placeholder="Current Password"
        className={`p-2 border rounded-md transition-all ${isDarkMode ? "bg-gray-800 text-white border-gray-600" : "bg-gray-100 text-gray-900 border-gray-300"}`}
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        className={`p-2 border rounded-md transition-all ${isDarkMode ? "bg-gray-800 text-white border-gray-600" : "bg-gray-100 text-gray-900 border-gray-300"}`}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        className={`p-2 border rounded-md transition-all ${isDarkMode ? "bg-gray-800 text-white border-gray-600" : "bg-gray-100 text-gray-900 border-gray-300"}`}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
        onClick={handleChangePassword}
      >
        Change Password
      </button>
    </div>
  );
}

function DeleteAccountModal({ onClose, onConfirm }) {
  const { isDarkMode } = useContext(ThemeContext); // ✅ Fix: Access `isDarkMode` here
  const [confirmInput, setConfirmInput] = useState("");
  const navigate = useNavigate(); // ✅ React Router Hook for Navigation

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className={`p-6 rounded-lg shadow-lg text-center transition-all 
          ${isDarkMode ? "bg-gray-700 text-gray-200" : "bg-white text-gray-900"}`}>
        <h3 className="text-xl font-semibold mb-4 text-red-600">Are you sure?</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This action is permanent and cannot be undone. Type <strong>"DELETE"</strong> to confirm.
        </p>
        <input
          type="text"
          className={`p-2 border rounded-md transition-all mb-4 ${isDarkMode ? "bg-gray-800 text-white border-gray-600" : "bg-gray-100 text-gray-900 border-gray-300"}`}
          value={confirmInput}
          onChange={(e) => setConfirmInput(e.target.value)}
          placeholder="Type DELETE"
        />
        <div className="flex justify-center gap-4">
          <button className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md" onClick={onClose}>
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded-md transition ${confirmInput === "DELETE" ? "bg-red-500 hover:bg-red-600 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            onClick={() => {
              if (confirmInput === "DELETE") {
                toast.success("Account deleted permanently!");
                setTimeout(() => {
                  onConfirm();
                  onClose();
                  navigate("/");
                }, 1000); // Delay navigation for 2 seconds
              }
            }}
            disabled={confirmInput !== "DELETE"}
          >
            Yes, Delete
          </button>

        </div>
      </div>
    </div>
  );
}
