import { useState, useContext } from "react";
import { ThemeContext } from "../../Helpers/ThemeContext"; // Import theme context
import { FaBell, FaCreditCard, FaCog, FaUserShield } from "react-icons/fa";

export default function SettingsPage() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext); // Get theme state & toggle function

  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("USD");
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);

  return (
    <div className={`p-6 min-h-screen transition-all ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"}`}>
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <FaCog /> Settings
      </h2>

      {/* Account Settings */}
      <SettingsSection title="Account">
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition">Delete Account</button>
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection title="Notifications" icon={<FaBell />}>
        <ToggleOption label="Email Notifications" value={emailNotifications} onChange={setEmailNotifications} />
        <ToggleOption label="SMS Notifications" value={smsNotifications} onChange={setSmsNotifications} />
      </SettingsSection>

      {/* Orders & Payments */}
      <SettingsSection title="Orders & Payments" icon={<FaCreditCard />}>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition">Manage Saved Cards</button>
      </SettingsSection>

      {/* System Preferences */}
      <SettingsSection title="System Preferences" icon={<FaCog />}>
        <ToggleOption label="Dark Mode" value={isDarkMode} onChange={toggleTheme} /> {/* Uses global theme toggle */}
        <DropdownOption label="Language" options={["English", "Spanish", "French"]} value={language} onChange={setLanguage} />
        <DropdownOption label="Currency" options={["USD", "EUR", "INR"]} value={currency} onChange={setCurrency} />
      </SettingsSection>

      {/* Security & Privacy */}
      <SettingsSection title="Security & Privacy" icon={<FaUserShield />}>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition">Logout from Other Devices</button>
      </SettingsSection>
    </div>
  );
}

function SettingsSection({ title, icon, children }) {
  return (
    <div className="p-6 rounded-lg shadow mb-6 transition-all 
      bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200">
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
      <label className="block mb-1">{label}</label>
      <select className="border p-2 rounded w-full bg-white dark:bg-gray-700 dark:text-gray-200" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
