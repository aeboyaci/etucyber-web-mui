import React, {createRef, useRef, useState} from 'react';
import classes from "../../styles/Profile.module.css";
import DashboardLayout from "../../components/DashboardLayout";
import {
    CssBaseline,
    Container,
    Avatar,
    Typography,
    Grid,
    TextField,
    Button,
    Alert,
    AlertTitle,
    IconButton, Collapse
} from "@mui/material";
import {useAuth} from "../../components/AuthContext";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import Head from "next/head";
import CloseIcon from "@mui/icons-material/Close";

const validationSchema = Yup.object({
    email: Yup.string().email("Hatalı e-mail formatı."),
});
const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
};

const Profile = () => {
    const [user, setUser] = useAuth();

    const fileRef = createRef();
    const [alert, setAlert] = useState({ type: "", title: "", message: "" });
    const [alertOpen, setAlertOpen] = useState(false);

    const handleSubmit = (values, {resetForm}) => {
        console.log(values);
        resetForm();
    };

    const fileUpload = async (e) => {
        const file = fileRef.current.files[0];
        console.log(file);

        // API upload request
        let formData = new FormData();
        formData.append("profilePic", file);
        const response = await fetch("https://api.etucyber.com/api/account/profile-update/change-avatar", {
            method: "POST",
            body: formData,
            credentials: "include",
        });
        const data = await response.json();

        setAlert({
            type: data.success ?  "success" : "error",
            title: data.success ?  "Başarılı!" : "Hata!",
            message: data.message,
        });
        setAlertOpen(true);

        e.target.value = "";
    };

    return (
        <DashboardLayout>
            <Head>
                <title>Profil ~ Etucyber</title>
            </Head>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <div className={classes.paper}>
                    <div className={classes.avatarWrapper}>
                        <Avatar src={user.photoUrl} className={classes.avatar} />
                        <div onClick={() => document.getElementById("file")?.click()} className={classes.uploadOverlay}>
                            <span>Resim Yükle</span>
                        </div>
                    </div>
                    <Typography component="h1" variant="h4">
                        Profil
                    </Typography>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({values, touched, errors, handleChange, handleBlur, handleSubmit}) => (
                            <Form className={classes.form} onSubmit={handleSubmit}>
                                <Collapse in={alertOpen}>
                                    <Alert
                                        sx={{ mb: 2 }}
                                        severity={alert.type === "success" ? `success` : `error`}
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
                                        {alert.message}
                                    </Alert>
                                </Collapse>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            value={values.firstName}
                                            onChange={handleChange}
                                            autoComplete="off"
                                            name="firstName"
                                            variant="outlined"
                                            fullWidth
                                            id="firstName"
                                            label="Ad"
                                            sx={{ backgroundColor: "white" }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            value={values.lastName}
                                            onChange={handleChange}
                                            variant="outlined"
                                            fullWidth
                                            id="lastName"
                                            label="Soyad"
                                            name="lastName"
                                            autoComplete="off"
                                            sx={{ backgroundColor: "white" }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                            variant="outlined"
                                            fullWidth
                                            id="email"
                                            label="E-mail Adresi"
                                            name="email"
                                            autoComplete="email"
                                            sx={{ backgroundColor: "white" }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            value={values.password}
                                            onChange={handleChange}
                                            variant="outlined"
                                            fullWidth
                                            name="password"
                                            label="Parola"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            sx={{ backgroundColor: "white" }}
                                        />
                                    </Grid>
                                </Grid>
                                <div>
                                    <input
                                        type="file"
                                        id="file"
                                        style={{ display: "none" }}
                                        accept=".png,.jpg,.jpeg,.ico"
                                        ref={fileRef}
                                        onChange={fileUpload}
                                    />
                                    {/*<Button*/}
                                    {/*    fullWidth*/}
                                    {/*    variant="contained"*/}
                                    {/*    color="primary"*/}
                                    {/*    className={classes.submit}*/}
                                    {/*    onClick={() => document.getElementById("file")?.click()}*/}
                                    {/*>*/}
                                    {/*    Resim Yükle*/}
                                    {/*</Button>*/}
                                </div>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 2 }}
                                >
                                    Kaydet
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Container>
        </DashboardLayout>
    );
};

export default Profile;