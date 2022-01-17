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
import theme from "../../src/theme";

const initialValidationSchema = Yup.object({
    email: Yup.string().email("Hatalı e-mail formatı."),
});
const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    oldPassword: "",
    newPassword: "",
};

const Profile = () => {
    const [user, setUser] = useAuth();
    const [validationSchema, setValidationSchema] = useState(initialValidationSchema);

    const fileRef = createRef();
    const [alert, setAlert] = useState({ type: "", title: "", message: "" });
    const [alertOpen, setAlertOpen] = useState(false);
    const [changePassword, setChangePassword] = useState(false);

    const enablePasswordChange = () => {
        setChangePassword(true);

        setValidationSchema(
            Yup.object({
                email: Yup.string().email("Hatalı e-mail formatı."),
                oldPassword: Yup.string().required("Eski parola boş bırakılamaz."),
                newPassword: Yup.string().required("Yeni parola boş bırakılamaz.").min(8, "Parola en az 8 karakter olmalıdır.")
            })
        );
    };

    const handleSubmit = async (values, {resetForm}) => {
        const response = await fetch("https://api.etucyber.com/api/profile-update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...values }),
            credentials: "include",
        });
        const data = await response.json();

        if (data.success) {
            setAlert({ type: "success", title: "Başarılı!", message: data.message });
        }
        else {
            setAlert({ type: "error", title: "Hata!", message: data.message });
        }
        setAlertOpen(true);
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
                                            autoComplete="off"
                                            sx={{ backgroundColor: "white" }}
                                        />
                                    </Grid>
                                    {
                                        changePassword ?
                                        <React.Fragment>
                                            <Grid item xs={12}>
                                                <TextField
                                                    value={values.oldPassword}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.oldPassword && Boolean(errors.oldPassword)}
                                                    helperText={touched.oldPassword && errors.oldPassword}
                                                    variant="outlined"
                                                    fullWidth
                                                    name="oldPassword"
                                                    label="Eski Parola"
                                                    type="password"
                                                    id="oldPassword"
                                                    autoComplete="off"
                                                    sx={{ backgroundColor: "white" }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    value={values.newPassword}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.newPassword && Boolean(errors.newPassword)}
                                                    helperText={touched.newPassword && errors.newPassword}
                                                    variant="outlined"
                                                    fullWidth
                                                    name="newPassword"
                                                    label="Yeni Parola"
                                                    type="password"
                                                    id="newPassword"
                                                    autoComplete="off"
                                                    sx={{ backgroundColor: "white" }}
                                                />
                                            </Grid>
                                        </React.Fragment>
                                        :
                                        <Grid item xs={12}>
                                            <Typography onClick={enablePasswordChange} sx={{ color: theme.palette.primary.main, ":hover": { cursor: "pointer" } }}>
                                                Parolayı değiştir
                                            </Typography>
                                        </Grid>
                                    }
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