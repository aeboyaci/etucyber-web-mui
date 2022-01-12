import React from 'react';
import DashboardLayout from "../../components/DashboardLayout";
import DashboardEditor from "../../components/DashboardEditor";
import Head from "next/head";

const Create = () => {
    return (
        <DashboardLayout>
            <Head>
                <title>Gönderi Oluştur ~ Etucyber</title>
            </Head>
            <DashboardEditor mode={"create"} />
        </DashboardLayout>
    );
};

export default Create;