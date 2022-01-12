import React from 'react';
import DashboardLayout from "../../../components/DashboardLayout";
import DashboardEditor from "../../../components/DashboardEditor";
import Head from "next/head";

const Edit = ({ post }) => {
    return (
        <DashboardLayout>
            <Head>
                <title>Gönderi Düzenle ~ Etucyber</title>
            </Head>
            <DashboardEditor mode={"edit"} info={post} />
        </DashboardLayout>
    );
};

export async function getServerSideProps(context) {
    const { id } = context.params;
    const response = await fetch("http://92.205.16.57:3001/api/posts/by-id/" + id, {
        headers: {
            "cookie": `token=${context.req.cookies["token"]}`,
            credentials: "include",
        }
    });
    const data = await response.json();

    if (!data.success) {
        return {
            props: {},
            notFound: true,
        };
    }

    return {
        props: {
            post: {...data.post}
        }
    }
}

export default Edit;