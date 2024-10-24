import React from "react";

const dataStatsList = [
    {   
        title: "Total Sisa Kas",
        value: "3.000.000.000,-",
        growthRate: 0.43,
    },
    {   
        title: "Total Pemasukan",
        value: "1.500.000,-",
        growthRate: -0.43,
    },
    {   
        title: "Total Pengeluaran",
        value: "2.000,-",
        growthRate: 0.43,
    },
];

const Stats = () => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-4">
            {dataStatsList.map((item) => (
            <div 
                key={item.title}
                className={`cols-span-1 rounded-2xl px-2 py-2 shadow-md mt-2 ${
                    item.title === "Total Sisa Kas" ? "bg-yellow-200 border-yellow-300" :
                    item.title === "Total Pemasukan" ? "bg-teal-200 border-green-300" :
                    item.title === "Total Pengeluaran" ? "bg-red-200 border-red-300" : 
                    "border-gray-300"
                }`}
            >
                <h2 className="pl-4 pt-4 text-xl font-medium text-black w-auto">{item.title}</h2>
                <h2 className="pb-4 pl-4 pt-2 text-2xl font-bold text-black w-auto">
                    Rp {item.value}
                </h2>
                <div className="grid grid-cols-2 gap-2">
                    <div className="cols-span-1 pl-3 pb-4">
                        <div className={`px-2 py-2 rounded-full w-fit shadow-1 ${
                            item.growthRate > 0
                                ? "border border-green-500 text-green-200 bg-white"
                                : "border border-red-500 text-red-200 bg-white"
                        }`}>
                            <span
                                className={`flex items-center gap-1.5 text-body-sm font-medium ${
                                    item.growthRate > 0
                                        ? "text-green-700"
                                        : "text-red-700"
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

export default Stats;
