"use client";

import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React, { useState } from "react";
import KelolaMasjid from "./kelolamasjid";
import FasilitasMasjid from "./fasilitas";
import MubalighMasjid from "./mubaligh";
import StrukturOrganisasi from "./organisasi";
import RekeningMasjid from "./rekeningbank";


const InfoMasjid = () => {
  return (
    <DefaultLayout>
      <div>
        <KelolaMasjid/>
        <FasilitasMasjid/>
        <MubalighMasjid/>
        <StrukturOrganisasi/>
        <RekeningMasjid/>
      </div>
</DefaultLayout>
);
};

export default InfoMasjid;