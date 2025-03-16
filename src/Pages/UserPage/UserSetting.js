import { useState, useContext } from "react";
import { ThemeContext } from "../../Helpers/ThemeContext";
import { FaBell,FaCog, FaUserShield } from "react-icons/fa";

export default function SettingsPage() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("USD");
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);

  return (
    <div className={`p-6 min-h-screen mb-32 transition-all ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-900"}`}>
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
        <ToggleOption label="SMS Notifications" value={smsNotifications} onChange={setSmsNotifications} />
      </SettingsSection>

      <SettingsSection title="System Preferences" icon={<FaCog />}>
        <ToggleOption label="Dark Mode" value={isDarkMode} onChange={toggleTheme} />
        <DropdownOption label="Language" options={["English", "Spanish", "French"]} value={language} onChange={setLanguage} />
        <DropdownOption label="Currency" options={["USD", "EUR", "INR"]} value={currency} onChange={setCurrency} />
      </SettingsSection>

      <SettingsSection title="Security & Privacy" icon={<FaUserShield />}>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition">
          Logout from Other Devices
        </button>
      </SettingsSection>

      {showDeleteModal && (
        <DeleteAccountModal onClose={() => setShowDeleteModal(false)} onConfirm={() => console.log("Account deleted permanently")} />
      )}
    </div>
  );
}

function SettingsSection({ title, icon, children }) {
  return (
    <div className="p-6 rounded-xl border border-gray-300 shadow-md mb-6 transition-all bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-gray-200">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        {icon} {title}
      </h3>
      {children}
    </div>
  );
}

function ToggleOption({ label, value, onChange }) {
  return (
    <label className="flex items-center gap-2 mb-2 cursor-pointer">
      <input type="checkbox" checked={value} onChange={() => onChange(!value)} className="w-5 h-5" /> {label}
    </label>
  );
}

function DropdownOption({ label, options, value, onChange }) {
  return (
    <div className="mt-4">
      <label className="block mb-1 font-medium">{label}</label>
      <select className="border border-gray-300 p-2 rounded-md w-full bg-white dark:bg-gray-600 dark:text-gray-200" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

function DeleteAccountModal({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg text-center">
        <h3 className="text-xl font-semibold mb-4 text-red-600">Are you sure?</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">This action is permanent and cannot be undone.</p>
        <div className="flex justify-center gap-4">
          <button className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md" onClick={onConfirm}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
