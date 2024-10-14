import { Metadata } from "next";
import DefaultLayout from "../../components/Layouts/DefaultLaout";
import React from "react";
import InfoMasjid from "./infomasjid";

export const metadata: Metadata = {

    title: "Next.js E-commerce Dashboard Page | NextAdmin - Next.js Dashboard Kit",
    description: "This is Next.js Home page for NextAdmin Dashboard Kit",
};

export default function Home() {
    return (
        <>
            <DefaultLayout>
                <div className="col border border-gray-500">
                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[70%_30%]">
                        <div className="col-span-1 p-4 xl:col-span-1">
                            <img
                                src="/images/product/product-04.png"
                                alt="Deskripsi Foto"
                                className="h-auto w-full p-2"
                            />
                        </div>
    
                        <div className="col-span-1 mr-5">
                            <InfoMasjid/>
                        </div>
                    </div>
                    <h1 className="mb-2 mt-2 text-2xl font-bold">Deskripsi</h1>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi impedit quidem error magnam nulla deleniti eum porro, praesentium fugit ipsa exercitationem corrupti voluptatem minus rem! Molestiae culpa cumque quos labore?
                </div>
            </DefaultLayout>
        </>
    );
}

