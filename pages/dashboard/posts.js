import React, {useState} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Tooltip
} from "@mui/material";
import DashboardLayout from "../../components/DashboardLayout";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Head from "next/head";
import {useRouter} from "next/router";

const Posts = () => {
    const router = useRouter();

    const [dialog, setDialog] = useState(false);

    const columns = [
        {
            field: 'id',
            headerName: '#',
            width: 90,
            editable: false,
        },
        {
            field: "title",
            headerName: "Başlık",
            width: 200,
            editable: false
        },
        {
            field: "description",
            headerName: "Açıklama",
            width: 200,
            editable: false,
            renderCell: (params) => (
                params.row.description && params.row.description.length > 17 ?
                    <Tooltip title={params.row.description}>
                        <span className={"table-cell-truncate"}>{params.row.description}</span>
                    </Tooltip> : <span className={"table-cell-truncate"}>{params.row.description}</span>
            )
        },
        {
            field: "isActive",
            headerName: "Aktif",
            width: 75,
            editable: false
        },
        {
            field: "createdAt",
            headerName: "Tarih",
            width: 150,
            editable: false
        },
        {
            field: "actions",
            headerName: "",
            width: 150,
            editable: false,
            renderCell: (params) => (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", width: "100%" }}>
                    <IconButton onClick={() => router.push("/dashboard/edit/" + params.row.id)} aria-label="edit">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => setDialog(true)} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </div>
            )
        },
    ];
    const rows = [
        {
            id: "1",
            title: "Malware Development - 1",
            description: `Malware, “Malicious Software”ın kısaltılmış halidir. Zararlı yazılımlar da birer bilgisayar programıdır. Her program gibi zararlı yazılımlar da bir takım faaliyetleri yerine getirmek için çeşitli işlemler gerçekleştirir. Bu işlemler, kullanıcıya veyahut kullanıcının bilgisayarına zarar vermek amacıyla kimi zaman kurbanın dosyalarını şifrelemek (Ransomware – Fidye yazılımı), kimi zaman kullanıcın isteği ve izni olmadan kişisel ya da kritik verileri sızdırmak (Spyware) kimi zaman da kullanıcının cihazında reklam göstermek (Adware) olabilir.`,
            isActive: true,
            createdAt: "10/01/2022",
        },
    ];

    const deletePost = () => {
        // Delete  request to API
        console.log("delete");
        setDialog(false);
    };

    return (
        <DashboardLayout>
            <Head>
                <title>Gönderilerim ~ Etucyber</title>
            </Head>
            <div style={{ height: "500px", width: "100%" }}>
                <DataGrid
                    sx={{ backgroundColor: "white" }}
                    columns={columns}
                    rows={rows}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection={true}
                    disableSelectionOnClick={true}
                />
                <Dialog
                    open={dialog}
                    onClose={null}
                    onBackdropClick={null}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Gönderiyi silmek istediğinize emin misiniz ?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Bu gönderi kalıcı olarak silinecektir. Silme işlemi geri alınamaz. Silmek istediğinize emin misiniz ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDialog(false)}>Hayır</Button>
                        <Button onClick={deletePost} autoFocus>
                            Evet
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </DashboardLayout>
    );
};

export default Posts;