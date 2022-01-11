import React from 'react';
import DashboardLayout from "../../components/DashboardLayout";
import DashboardEditor from "../../components/DashboardEditor";

const Create = () => {
    return (
        <DashboardLayout>
            <DashboardEditor mode={"create"} />
        </DashboardLayout>
    );
};

export default Create;