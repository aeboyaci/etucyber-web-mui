import React, {useState} from 'react';
import classes from "../../styles/AccountActions.module.css";
import Head from "next/head";
import {
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Grid,
    Typography,
    Alert,
    AlertTitle,
    Avatar, IconButton, Collapse
} from "@mui/material";
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "next/link";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import {useRouter} from "next/router";

const validationSchema = Yup.object({
    firstName: Yup.string().required("Ad boş bırakılamaz."),
    lastName: Yup.string().required("Soyad boş bırakılamaz."),
    email: Yup.string().required("E-mail adresi boş bırakılamaz.").email("Hatalı e-mail formatı."),
    password: Yup.string().required("Parola boş bırakılamaz.").min(8, "Parola en az 8 karakter olmalıdır."),
    rePassword: Yup.string().required("Parola doğrulama boş bırakılamaz.").oneOf([Yup.ref("password")], "Parolalar eşleşmiyor."),
    inviteCode: Yup.string().required("Davet kodu boş bırakılamaz.")
});
const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePassword: "",
    inviteCode: "",
    robot: false
};

const SignUp = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);

    const handleSubmit = async (values, {resetForm}) => {
        if (!values.robot) {
            setErrorMessage("Lütfen robot olmadığınızı doğrulayın.");
            setAlertOpen(true);
            return;
        }
        const response = await fetch("https://api.etucyber.com/api/account/sign-up", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(values),
            credentials: "include",
        });
        const data = await response.json();

        if (!data.success) {
            setErrorMessage(data.message);
            setAlertOpen(true);
            return;
        }
        resetForm();
    };

    return (
        <React.Fragment>
            <Head>
                <title>Kayıt Ol ~ Etucyber</title>
            </Head>
            <Grid container component="main" className={classes.root}>
                <CssBaseline/>
                <Grid item xs={false} sm={4} md={6} className={classes.image}/>
                <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h4">
                            Kayıt Ol
                        </Typography>
                        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                            {({values, touched, errors, handleChange, handleBlur, handleSubmit}) => (
                                <Form className={classes.form} onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Collapse in={alertOpen}>
                                                <Alert
                                                    sx={{ mb: 2 }}
                                                    severity="error"
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
                                                    {errorMessage}
                                                </Alert>
                                            </Collapse>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                value={values.firstName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="firstName"
                                                variant="outlined"
                                                fullWidth
                                                id="firstName"
                                                label="Ad"
                                                error={touched.firstName && Boolean(errors.firstName)}
                                                helperText={touched.firstName && errors.firstName}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                value={values.lastName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                variant="outlined"
                                                fullWidth
                                                id="lastName"
                                                label="Soyad"
                                                name="lastName"
                                                error={touched.lastName && Boolean(errors.lastName)}
                                                helperText={touched.lastName && errors.lastName}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                variant="outlined"
                                                fullWidth
                                                id="email"
                                                label="E-mail Adresi"
                                                name="email"
                                                error={touched.email && Boolean(errors.email)}
                                                helperText={touched.email && errors.email}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                variant="outlined"
                                                fullWidth
                                                name="password"
                                                label="Parola"
                                                type="password"
                                                id="password"
                                                error={touched.password && Boolean(errors.password)}
                                                helperText={touched.password && errors.password}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                value={values.rePassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                variant="outlined"
                                                fullWidth
                                                name="rePassword"
                                                label="Parola Doğrulama"
                                                type="password"
                                                error={touched.rePassword && Boolean(errors.rePassword)}
                                                helperText={touched.rePassword && errors.rePassword}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                value={values.inviteCode}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                variant="outlined"
                                                fullWidth
                                                name="inviteCode"
                                                label="Davet Kodu"
                                                error={touched.inviteCode && Boolean(errors.inviteCode)}
                                                helperText={touched.inviteCode && errors.inviteCode}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={values.robot}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        name="robot"
                                                        color="primary"
                                                    />
                                                }
                                                label="Robot değilim"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Kayıt Ol
                                    </Button>
                                    <Grid item>
                                        <Link href="/account/sign-in" variant="body2">
                                            <a style={{color: "#1976D2"}}>{"Hesabın var mı? Buradan giriş yapın."}</a>
                                        </Link>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default SignUp;