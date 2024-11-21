import React, { useEffect, useState } from "react";
import axios from "axios";

const StatsArus = () => {
    const [dataStatsList, setDataStatsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/arus-kas",
                );
                const data = response.data;

                // Map the API data to fit the expected structure
                const formattedData = [
                    {
                        title: "Total Pemasukan",
                        value: parseFloat(
                            data[0].pemasukan_total,
                        ).toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                        }),
                        growthRate: 0.43, // Replace with calculated growth rate if needed
                    },
                    {
                        title: "Total Pengeluaran",
                        value: parseFloat(
                            data[0].pengeluaran_total,
                        ).toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                        }),
                        growthRate: -0.43, // Replace with calculated growth rate if needed
                    },
                ];

                setDataStatsList(formattedData);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to load data.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-2">
            {dataStatsList.map((item) => (
                <div
                    key={item.title}
                    className={`mt-2 w-full rounded-2xl px-4 py-6 shadow-md ${
                        item.title === "Total Pemasukan"
                            ? "border-2 bg-green-200"
                            : item.title === "Total Pengeluaran"
                              ? "border-2 bg-red-500"
                              : "border-gray-300"
                    }`}
                >
                    <h2 className="pl-4 pt-4 text-xl font-medium text-black">
                        {item.title}
                    </h2>
                    <h2 className="pb-4 pl-4 pt-2 text-2xl font-bold text-black">
                        {item.value}
                    </h2>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="pb-4 pl-3">
                            <div
                                className={`w-fit rounded-full px-2 py-2 shadow-1 ${
                                    item.growthRate > 0
                                        ? "border border-green-500 bg-green-700"
                                        : "border border-red-400 bg-red-700"
                                }`}
                            >
                                <span
                                    className={`flex items-center gap-1.5 text-body-sm font-medium ${
                                        item.growthRate > 0
                                            ? "text-white"
                                            : "text-white"
                                    }`}
                                >
                                    {item.growthRate}%
                                    {item.growthRate > 0 ? (
                                        <svg
                                            className="fill-current"
                                            width="10"
                                            height="10"
                                            viewBox="0 0 10 10"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4.35716 2.3925L0.908974 5.745L5.0443e-07 4.86125L5 -5.1656e-07L10 4.86125L9.09103 5.745L5.64284 2.3925L5.64284 10L4.35716 10L4.35716 2.3925Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="fill-current"
                                            width="10"
                                            height="10"
                                            viewBox="0 0 10 10"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M5.64284 7.6075L9.09102 4.255L10 5.13875L5 10L-8.98488e-07 5.13875L0.908973 4.255L4.35716 7.6075L4.35716 7.6183e-07L5.64284 9.86625e-07L5.64284 7.6075Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsArus;
