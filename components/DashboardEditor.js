import React, {useState} from 'react';
import { Editor } from "@tinymce/tinymce-react";
import {
    Alert,
    AlertTitle,
    Button,
    Checkbox,
    Collapse,
    FormControlLabel,
    Grid,
    IconButton,
    TextField
} from "@mui/material";
import {useRouter} from "next/router";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";

const validationSchema = Yup.object({
    title: Yup.string().required("Başlık boş bırakılamaz."),
    imageUrl: Yup.string().required("Resim URL boş bırakılamaz."),
    description: Yup.string().required("Açıklama boş bırakılamaz"),
});

const DashboardEditor = ({ mode, info }) => {
    const router = useRouter();

    const [value, setValue] = useState(info ? info.html : "");
    const [initialValues, _] = useState(
        info ?
        {
            title: info.title,
            imageUrl: info.imageUrl,
            description: info.description,
            isActive: info.isActive
        }
        :
        {
            title: "",
            imageUrl: "",
            description: "",
            isActive: false
        }
    );

    const [alert, setAlert] = useState({ type: "", title: "", message: "" });
    const [alertOpen, setAlertOpen] = useState(false);

    const handleHtmlChange = (content, editor) => {
        console.log(content);
        setValue(content);
    };

    const handleSubmit = async (values, {resetForm}) => {
        let apiUrl = mode === "create" ? "https://api.etucyber.com/api/posts" : "https://api.etucyber.com/api/posts/by-id/" + info["_id"];
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...values, html: value}),
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

        if (mode === "create") {
            resetForm();
            setValue("");
        }
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({values, touched, errors, handleChange, handleBlur, handleSubmit}) => (
                <Form onSubmit={handleSubmit}>
                    <Grid container justifyContent={"center"}>
                        <Grid item>
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
                            <TextField
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.title && Boolean(errors.title)}
                                helperText={touched.title && errors.title}
                                label="Başlık"
                                name="title"
                                variant="outlined"
                                fullWidth
                                style={{ marginBottom: "1rem", backgroundColor: "white" }}
                            />
                            <TextField
                                value={values.imageUrl}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.imageUrl && Boolean(errors.imageUrl)}
                                helperText={touched.imageUrl && errors.imageUrl}
                                label="Resim URL"
                                name="imageUrl"
                                variant="outlined"
                                fullWidth
                                style={{ marginBottom: "1rem", backgroundColor: "white" }}
                                autoComplete={"off"}
                            />
                            <TextField
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.description && Boolean(errors.description)}
                                helperText={touched.description && errors.description}
                                label="Açıklama"
                                name="description"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={5}
                                style={{ marginBottom: "1rem", backgroundColor: "white" }}
                                autoComplete={"off"}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={values.isActive}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        color="primary"
                                        name="isActive"
                                    />
                                }
                                label="Aktif"
                                sx={{ mb: 2 }}
                            />
                            <Editor
                                initialValue={info ? info.html : ""}
                                value={value}
                                apiKey="v8v2r3xiyn3wbvbjzs21anpm4y1zfz06y4a9ezccjzp6tccy"
                                init={{
                                    height: "450",
                                    plugins:
                                        "print preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
                                    mobile: {
                                        plugins:
                                            "print preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount textpattern noneditable help charmap quickbars emoticons",
                                    },
                                    menubar: "file edit view insert format tools table tc help",
                                    codesample_languages: [
                                        { text: "Go", value: "go" },
                                        { text: "Python", value: "python" },
                                        { text: "Java", value: "java" },
                                        { text: "JavaScript", value: "javascript" },
                                        { text: "CSS", value: "css" },
                                        { text: "C", value: "c" },
                                        { text: "C#", value: "csharp" },
                                        { text: "C++", value: "cpp" },
                                        { text: "Rust", value: "rust" },
                                        { text: "PHP", value: "php" },
                                    ],
                                    toolbar:
                                        "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor casechange removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment",
                                }}
                                onEditorChange={handleHtmlChange}
                            />
                        </Grid>
                    </Grid>
                    <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ width: mode === "edit" ? "25rem" : "" }}
                            fullWidth={mode === "create"}
                        >
                            {mode === "create" ? "Oluştur" : "Güncelle"}
                        </Button>
                        {mode === "edit" && (
                            <Button
                                variant="outlined"
                                color="primary"
                                style={{ width: "25rem", marginLeft: "1.2rem" }}
                                onClick={() =>
                                    router.push("/dashboard/posts")
                                }
                            >
                                GERİ
                            </Button>
                        )}
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default DashboardEditor;