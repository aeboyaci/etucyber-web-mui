import React, {useEffect, useState} from "react";
import {Box, Container, Grid} from "@mui/material";
import classes from "../../../styles/BlogPostDetail.module.css";
import MainLayout from "../../../components/MainLayout";
import Head from "next/head";
import DOMPurify from 'isomorphic-dompurify';
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-php";
import "prismjs/components/prism-go";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-python";

// C, C++, C#, Java, JavaScript, JSX, PHP, Go, Rust, Python

const BlogPost = ({post}) => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <React.Fragment>
            <Head>
                {post && <title>{post.title} ~ Etucyber</title>}
            </Head>
            <MainLayout>
                {post && (
                    <React.Fragment>
                        <Box
                            style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5)), url('${post.imageUrl}')`}}
                            className={"hero"}>
                            <Box style={{ textAlign: "center" }}>{post.title}</Box>
                        </Box>
                        <Container className={classes.blogContainer} maxWidth="lg">
                            <Grid container justifyContent="center">
                                <Grid item xs={12} sm={8}>
                                    <div
                                        id="postContent"
                                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.html)}}
                                    />
                                </Grid>
                            </Grid>
                        </Container>
                    </React.Fragment>
                )}
            </MainLayout>
        </React.Fragment>
    );
};

export async function getStaticProps(context) {
    const {title} = context.params;
    const response = await fetch("https://api.etucyber.com/api/posts/" + title);
    const post = await response.json();

    return {
        props: {post},
        revalidate: 60,
    }
}

export async function getStaticPaths() {
    const response = await fetch("https://api.etucyber.com/api/posts");
    const posts = await response.json();
    const paths = posts.map((post) => {
        return {params: {title: post.title}};
    });

    return {
        paths: [...paths],
        fallback: true,
    }
}

export default BlogPost;