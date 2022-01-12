import React, { useState } from "react";
import classes from "../../styles/AccountActions.module.css";
import Link from "next/link";
import {Formik, Form} from "formik";
import * as Yup from "yup";
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
    Avatar
} from "@mui/material";
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Head from "next/head";
import axios from "axios";
import {useAuth} from "../../components/AuthContext";
import {useRouter} from "next/router";

const validationSchema = Yup.object({
    email: Yup.string().required("E-mail adresi boş bırakılamaz.").email("Hatalı e-mail formatı."),
    password: Yup.string().required("Parola boş bırakılamaz")
});
const initialValues = {
  email: "",
  password: "",
  robot: false,
};

const SignIn = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async (values, {resetForm}) => {
        if (!values.robot) {
            setErrorMessage("Lütfen robot olmadığınızı doğrulayın.");
            return;
        }

        const response = await fetch("http://localhost:3001/api/account/sign-in", {
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
            return;
        }
        resetForm();

        await router.push("/dashboard/create");
    };

    return (
        <React.Fragment>
            <Head>
                <title>Giriş Yap ~ Etucyber</title>
            </Head>
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={6} className={classes.image}></Grid>
                <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h4">
                            Giriş Yap
                        </Typography>
                        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                            {({values, touched, errors, handleChange, handleBlur, handleSubmit}) => (
                                <Form className={classes.form} onSubmit={handleSubmit}>
                                    {errorMessage && (
                                        <Alert style={{ marginTop: "1rem" }} severity="error">
                                            <AlertTitle>Hata</AlertTitle>
                                            {errorMessage}
                                        </Alert>
                                    )}
                                    <TextField
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        id="email"
                                        label="E-mail Adresi"
                                        name="email"
                                        autoComplete={"off"}
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                    />
                                    <TextField
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        name="password"
                                        label="Parola"
                                        type="password"
                                        id="password"
                                        autoComplete={"off"}
                                        error={touched.password && Boolean(errors.password)}
                                        helperText={touched.password && errors.password}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={values.robot}
                                                onChange={handleChange}
                                                name={"robot"}
                                                color="primary"
                                            />
                                        }
                                        label="Robot değilim"
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        GİRİŞ YAP
                                    </Button>
                                    <Grid item>
                                        <Link href="/account/sign-up" variant="body2">
                                            <a style={{ color: "#1976D2" }}>{"Hesabın yok mu? Buradan kayıt ol!"}</a>
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

export default  SignIn;