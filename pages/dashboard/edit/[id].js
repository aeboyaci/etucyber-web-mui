import React from 'react';
import DashboardLayout from "../../../components/DashboardLayout";
import DashboardEditor from "../../../components/DashboardEditor";

const Edit = ({ post }) => {
    return (
        <DashboardLayout>
            <DashboardEditor mode={"edit"} info={post} />
        </DashboardLayout>
    );
};

export async function getServerSideProps(context) {
    const { id } = context.params;
    const response = await fetch("http://localhost:3001/api/posts/by-id/" + id);
    const post = await response.json();

    if (post === null) {
        return context.redirect("/dashboard/list");
    }

    return {
        props: {post}
    }
}

export default Edit;