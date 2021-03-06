import React, { useState } from "react";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import Head from "next/head";
import MainLayout from "../components/MainLayout";
import {
    Box,
    Container,
    Grid,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Alert,
    AlertTitle, IconButton, Collapse,
} from "@mui/material";
import classes from "../styles/Contact.module.css";
import CloseIcon from "@mui/icons-material/Close";

const validationSchema = Yup.object({
    firstName: Yup.string().required("Ad boş bırakılamaz."),
    lastName: Yup.string().required("Soyad boş bırakılamaz."),
    email: Yup.string().required("E-mail adresi boş bırakılamaz.").email("Hatalı e-mail formatı."),
    message: Yup.string().required("Mesaj boş bırakılamaz.")
});
const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    okay: false
}

const Contact = () => {
    const [alert, setAlert] = useState({ type: "", title: "", message: "" });
    const [alertOpen, setAlertOpen] = useState(false);

    const handleSubmit = async (values, {resetForm}) => {
        let body = {...values};
        delete body.okay;

        const response = await fetch("https://api.etucyber.com/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();

        if (data.success) {
            setAlert({type: "success", title: "Başarılı!", message: data.message});
            resetForm();
        }
        else {
            setAlert({type: "error", title: "Hata!", message: data.message});
        }
        setAlertOpen(true);
    };

    return (
        <React.Fragment>
            <Head>
                <title>İletişim ~ Etucyber</title>
            </Head>
            <MainLayout>
                <Box style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5)), url('/contact.jpg')`}} className={"hero"}>
                    <Box>İLETİŞİM</Box>
                </Box>
                <Container className={classes.blogContainer} maxWidth="lg">
                    <Grid container justifyContent="center">
                        <Grid item xs={12} sm={6}>
                            <Grid container justifyContent="center">
                                <Grid item xs={12} sm={8}>
                                    <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
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
                                                            onBlur={handleBlur}
                                                            name="firstName"
                                                            variant="outlined"
                                                            fullWidth
                                                            id="firstName"
                                                            label="Ad"
                                                            autoComplete={"off"}
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
                                                            autoComplete={"off"}
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
                                                            autoComplete={"off"}
                                                            error={touched.email && Boolean(errors.email)}
                                                            helperText={touched.email && errors.email}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            value={values.message}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            multiline
                                                            rows={3}
                                                            variant="outlined"
                                                            fullWidth
                                                            name="message"
                                                            label="Mesaj"
                                                            id="message"
                                                            autoComplete={"off"}
                                                            error={touched.message && Boolean(errors.message)}
                                                            helperText={touched.message && errors.message}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={values.okay}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    color="primary"
                                                                    name={"okay"}
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
                                                    Gönder
                                                </Button>
                                            </Form>
                                        )}
                                    </Formik>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </MainLayout>
        </React.Fragment>
    );
};
export async function getStaticProps(context) {
    return {
        props: {},
    }
}

export default Contact;