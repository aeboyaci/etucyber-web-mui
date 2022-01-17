import React, {useState} from 'react';
import {Alert, Button, Collapse, Grid, IconButton, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DashboardLayout from "../../components/DashboardLayout";
import cryptoRandomString from 'crypto-random-string';
import Head from "next/head";

const Invite = () => {
    const [code, setCode] = useState("-");
    const [message, setMessage] = useState({
        type: "",
        title: "",
        message: "",
    });
    const [alertOpen, setAlertOpen] = useState(false);

    const generate = async () => {
        const tmp = cryptoRandomString({ length: 12 });
        setCode(tmp);

        const response = await fetch("https://api.etucyber.com/api/invite", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inviteCode: tmp }),
            credentials: "include",
        });
        const data = await response.json();

        setMessage({
            type: data.success ? "success" : "error",
            title: data.success ? "Başarılı!" : "Hata!",
            message: data.message,
        });
        setAlertOpen(true);
    };

    return (
        <DashboardLayout>
            <Head>
                <title>Davet Kodu Oluştur ~ Etucyber</title>
            </Head>
            <Grid
                container
                direction="row"
                style={{ minHeight: "100%", width: "100%" }}
                justifyContent="center"
                spacing={3}
            >
                <Grid item xs={8}>
                    <Grid
                        container
                        direction="row"
                        style={{ minHeight: "100%", width: "100%" }}
                        justifyContent="center"
                    >
                        <Grid item xs={6}>
                            <Collapse in={alertOpen}>
                                <Alert
                                    sx={{ mb: 2 }}
                                    severity={message.type === "success" ? `success` : `error`}
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setAlertOpen(false);
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                >
                                    {message.message}
                                </Alert>
                            </Collapse>
                            <Typography style={{ marginBottom: "1.2rem" }} variant="h3">
                                {code}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => generate()}
                                disabled={code !== "-"}
                            >
                                Oluştur
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
};

export default Invite;