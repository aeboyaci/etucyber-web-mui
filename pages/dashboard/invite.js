import React, {useState} from 'react';
import {Alert, AlertTitle, Button, Grid, Typography} from "@mui/material";
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
    const generate = async () => {
        const tmp = cryptoRandomString({ length: 12 });
        setCode(tmp);

        const response = await fetch("http://localhost:3001/api/invite", {
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
                            {message.type && (
                                <Alert
                                    style={{ marginBottom: "1.2rem" }}
                                    severity={message.type === "success" ? `success` : `error`}
                                >
                                    <AlertTitle>{message.title}</AlertTitle>
                                    {message.message}
                                </Alert>
                            )}
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