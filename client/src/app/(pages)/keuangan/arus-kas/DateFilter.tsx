import React, { useState } from 'react';
import { TextField, MenuItem } from '@mui/material';

const MonthlyFilter = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
        // Tambahkan logika untuk melakukan filter berdasarkan bulan yang dipilih
        console.log(`Bulan yang dipilih: ${event.target.value + 1}/${selectedYear}`);
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
        // Tambahkan logika untuk melakukan filter berdasarkan tahun yang dipilih
        console.log(`Tahun yang dipilih: ${selectedMonth + 1}/${event.target.value}`);
    };

    return (
        <div>
            <TextField
                select
                label="Bulan"
                value={selectedMonth}
                onChange={handleMonthChange}
                variant="outlined"
                margin="dense"
                style={{ marginRight: '16px' }}
            >
                {Array.from({ length: 12 }, (_, index) => (
                    <MenuItem key={index} value={index}>
                        {new Date(0, index).toLocaleString('default', { month: 'long' })}
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
                style={{ width: '100px' }}
            />
        </div>
    );
};

export default MonthlyFilter;
