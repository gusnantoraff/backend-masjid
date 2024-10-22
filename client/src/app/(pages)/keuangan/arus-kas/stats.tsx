import React from "react";

const dataStatsList = [
    {   
        title: "Total Sisa Kas",
        value: "3.000.000.000,-",
    },
    {   
        title: "Total Pemasukan",
        value: "1.500.000,-",
    },
    {   
        title: "Total Pengeluaran",
        value: "2.000,-",
    },
];
const Stats = () => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-4">
            {dataStatsList.map((item) => (
            <div className="cols-span-1 rounded-2xl border border-gray-300 px-2 py-2 shadow-md mt-2">
                <h2 className="pl-4 pt-4 text-xl font-medium text-black w-auto">{item.title}</h2>
                <h2 className="pb-4 pl-4 pt-2 text-2xl font-bold text-black w-auto">
                    Rp {item.value}
                </h2>
            </div>
            ))}
        </div>
    );
};

export default Stats;
