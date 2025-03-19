import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { FaFileDownload } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesChart = ({ data }) => {
    const salesChange = ((data.datasets[0].data[4] - data.datasets[0].data[3]) / data.datasets[0].data[3]) * 100;
    const salesFeedback = salesChange > 0
        ? `📈 Sales increased by ${salesChange.toFixed(2)}% this month!`
        : `📉 Sales decreased by ${Math.abs(salesChange).toFixed(2)}%.`;

    // Function to generate and download the sales report
    const generateReport = () => {
        const csvContent = [
            ["Month", "Sales"],
            ...data.labels.map((label, i) => [label, data.datasets[0].data[i]]),
        ]
        .map(row => row.join(","))
        .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "sales_report.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-2xl border-2 border-green-400">
            <h3 className="text-xl font-semibold">📊 Sales Chart</h3>
            <Line data={data} />
            <p className="mt-4 text-gray-700">{salesFeedback}</p>

            {/* Download Report Button */}
            <button 
                onClick={generateReport} 
                className="mt-4 px-4 py-2 flex items-center gap-2 bg-green-500 text-white font-medium rounded-lg shadow hover:bg-green-600 transition duration-300"
            >
                <FaFileDownload /> Generate Sales Report
            </button>
        </div>
    );
};

export default SalesChart;
