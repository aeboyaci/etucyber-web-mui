import React, {useState} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton, Snackbar,
    Tooltip
} from "@mui/material";
import DashboardLayout from "../../components/DashboardLayout";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Head from "next/head";
import {useRouter} from "next/router";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const Posts = ({ serverData }) => {
    const router = useRouter();

    const [rows, setRows] = useState(serverData);
    const [dialog, setDialog] = useState(false);
    const [snackbar, setSnackbar] = useState(false);
    const [id, setId] = useState("");

    const columns = [
        {
            field: 'id',
            headerName: '#',
            width: 200,
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
            editable: false,
            renderCell: (params) => (
                params.row.isActive ? <DoneIcon sx={{ mx: "auto" }} /> : <CloseIcon sx={{ mx: "auto" }} />
            )
        },
        {
            field: "createdAt",
            headerName: "Tarih",
            width: 150,
            editable: false,
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
                    <IconButton onClick={() => {
                        setId(params.row.id);
                        setDialog(true);
                    }} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </div>
            )
        },
    ];

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbar(false);
    };

    const deletePost = async () => {
        console.log(id);
        const response = await fetch("http://92.205.16.57:3001/api/posts/delete/by-id/" + id, {
            credentials: "include",
        });
        const data = await response.json();

        setRows([...rows.filter((r) => r.id !== id)]);

        setSnackbar(true);
        setDialog(false);
        setId("");
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
                        <Button onClick={() => {
                            setId("");
                            setDialog(false);
                        }}>Hayır</Button>
                        <Button onClick={deletePost} autoFocus>
                            Evet
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar open={snackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                    <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                        Gönderi başarılı bir şekilde silindi.
                    </Alert>
                </Snackbar>
            </div>
        </DashboardLayout>
    );
};

export async function getServerSideProps(context) {
    const response = await fetch("http://92.205.16.57:3001/api/posts/my-posts", {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'cookie': `token=${context.req.cookies["token"]}`
        },
        credentials: "include",
    });
    const posts = await response.json();
    console.log(posts);

    return {
        props: {
            serverData: posts.map((post) => {
                const id = post["_id"];
                delete post["_id"];
                return { ...post, id };
            })
        }
    }
}

export default Posts;