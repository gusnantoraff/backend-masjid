"use client";

import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Paper,
    Box,
} from "@mui/material";
import ButtonDefault from "@/components/Buttons/ButtonDefault";

const KelolaMasjid = () => {
    return (
        <DefaultLayout>
            <div>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                        padding: "15px",
                        backgroundColor: "#EDF1F8",
                        color: "black",
                        borderRadius: "10px",
                        width: "100%",
                    }}
                >
                    <h1 className="text-l font-bold">Edit Kelola Masjid</h1>
                    <ButtonDefault
                        link=""
                        customClasses="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center"
                        label="Simpan"
                    ></ButtonDefault>
                </Box>
                <div className="grid grid-cols-2 border border-gray-300 p-4 gap-4">
                  <div className="cols-span-1">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Nama Masjid
                </label>
                  <input
                  type="text"
                  placeholder="Default Input"
                  className="mb-2 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Nomor Telepon
                </label>
                  <input
                  type="text"
                  placeholder="Default Input"
                  className="mb-2 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Provinsi
                </label>
                  <input
                  type="text"
                  placeholder="Default Input"
                  className="mb-2 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Kelurahan
                </label>
                  <input
                  type="text"
                  placeholder="Default Input"
                  className="mb-2 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Kecamatan
                </label>
                  <input
                  type="text"
                  placeholder="Default Input"
                  className="mb-2 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
                <div className="grid grid-cols-2 gap-4">
                  <div className="cols-span-1 pr-2">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  RT
                </label>
                  <input
                  type="text"
                  placeholder="Default Input"
                  className="mb-2 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
                  </div>
                  <div className="cols-span-1">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  RW
                </label>
                  <input
                  type="text"
                  placeholder="Default Input"
                  className="mb-2 mr-2 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
                  </div>
                </div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Alamat Lengkap
                </label>
                  <input
                  type="text"
                  placeholder="Default Input"
                  className="mb-2 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
                  </div>
                  <div className="cols-span-1">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Tahun Berdiri
                </label>
                  <input
                  type="text"
                  placeholder="Default Input"
                  className="mb-2 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Jumlah Jemaah
                </label>
                  <input
                  type="text"
                  placeholder="Default Input"
                  className="mb-2 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Jumlah Muadzin
                </label>
                  <input
                  type="text"
                  placeholder="Default Input"
                  className="mb-2 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Jumlah Khatib
                </label>
                  <input
                  type="text"
                  placeholder="Default Input"
                  className="mb-2 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Jumlah Remaja
                </label>
                  <input
                  type="text"
                  placeholder="Default Input"
                  className="mb-2 w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
                  </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default KelolaMasjid;
