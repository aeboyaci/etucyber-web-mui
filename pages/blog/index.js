import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import classes from "../../styles/Blog.module.css";
import BlogCard from "../../components/BlogPostCard";
import MainLayout from "../../components/MainLayout";
import Head from "next/head";

const Blog = ({ posts }) => {
    return (
        <React.Fragment>
            <Head>
                <title>Blog ~ Etucyber</title>
            </Head>
            <MainLayout>
                <Box style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5)), url('/blog.png')`}} className={"hero"}>
                    <Box>BLOG</Box>
                </Box>
                <Container className={classes.blogContainer} maxWidth="lg">
                    <Typography className={classes.title} variant="h5">
                        GÖNDERİLER
                    </Typography>
                    <Grid container spacing={3}>
                        {posts &&
                        posts.map((p, idx) => {
                            return (
                                <React.Fragment key={p.title + " * " + idx}>
                                    {p.isActive && (
                                        <Grid item xs={12} sm={6} md={4}>
                                            <BlogCard
                                                title={p.title}
                                                description={p.description}
                                                imageUrl={p.imageUrl}
                                                displayName={p.displayName}
                                                photoUrl={p.photoUrl}
                                                createdAt={p.createdAt}
                                                href={`/blog/posts/${p.title}`}
                                            />
                                        </Grid>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </Grid>
                </Container>
            </MainLayout>
        </React.Fragment>
    );
};

export async function getStaticProps(context) {
    const response = await fetch("http://etucyber.com:3001/api/posts");
    const posts = await response.json();

    return {
        props: { posts },
        revalidate: 60,
    }
}

export default Blog;