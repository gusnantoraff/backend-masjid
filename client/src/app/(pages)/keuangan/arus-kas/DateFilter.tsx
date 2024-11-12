"use client";
import React, { useState } from "react";
import { TextField, MenuItem, Button } from "@mui/material";

const MonthlyFilter = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
        console.log(
            `Bulan yang dipilih: ${event.target.value + 1}/${selectedYear}`,
        );
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
        console.log(
            `Tahun yang dipilih: ${selectedMonth + 1}/${event.target.value}`,
        );
    };

    const handleSearch = () => {
        console.log(`Mencari data untuk bulan ${selectedMonth + 1} dan tahun ${selectedYear}`);
    };

    return (
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', paddingTop: '10px',alignItems: 'center', }}>
            <TextField
                select
                label="Bulan"
                value={selectedMonth}
                onChange={handleMonthChange}
                variant="outlined"
                margin="dense"
                size="small"
                style={{ width: "130px"}}
            >
                {Array.from({ length: 12 }, (_, index) => (
                    <MenuItem key={index} value={index}>
                        {new Date(0, index).toLocaleString("default", {
                            month: "long",
                        })}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                label="Tahun"
                type="number"
                value={selectedYear}
                onChange={handleYearChange}
                variant="outlined"
                margin="dense"
                size="small"
                style={{ width: "100px" }}
            />
            <Button
                variant="contained"
                color="primary"
                style={{ height:"42px", marginTop:"3px"}}
                onClick={handleSearch}
            >
                Cari
            </Button>
        </div>
    );
};

export default MonthlyFilter;
