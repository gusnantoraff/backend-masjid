"use client";
import ArticleForm from '@/components/Berita';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";

export default function Artikel() {

  return (
    <DefaultLayout>
      <div>
        <ArticleForm />
      </div>
    </DefaultLayout>
  );
}