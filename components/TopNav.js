import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import classes from "../styles/Navigation.module.css";

const TopNav = () => {
    const router = useRouter();
    const location = router.pathname;

    return (
        <React.Fragment>
            <AppBar className={classes.appBar} position="sticky">
                <Toolbar>
                    <Link href="/" style={{ textDecoration: "none" }} underline="none">
                        <Typography className={classes.brandTitle} variant="h6">
                            Etucyber
                        </Typography>
                    </Link>
                    <Box className={classes.navs}>
                        <Typography variant="button">
                            <Link href="/" style={{ textDecoration: "none" }} underline="none"
                            >
                                <a
                                    className={
                                        location === "/" ? classes.activeNavLink : classes.navLink
                                    }
                                >
                                    Ana Sayfa
                                </a>
                            </Link>
                        </Typography>
                        <Typography variant="button">
                            <Link href="/hakkimizda" style={{ textDecoration: "none" }} underline="none"
                            >
                                <a
                                    className={
                                        location === "/hakkimizda" ? classes.activeNavLink : classes.navLink
                                    }
                                >
                                    Hakkımızda
                                </a>
                            </Link>
                        </Typography>
                        <Typography variant="button">
                            <Link href="/blog" style={{ textDecoration: "none" }} underline="none"
                            >
                                <a
                                    className={
                                        location === "/blog" ? classes.activeNavLink : classes.navLink
                                    }
                                >
                                    Blog
                                </a>
                            </Link>
                        </Typography>
                        <Typography variant="button">
                            <Link href="/iletisim" style={{ textDecoration: "none" }} underline="none"
                            >
                                <a
                                    className={
                                        location === "/iletisim" ? classes.activeNavLink : classes.navLink
                                    }
                                >
                                    İLETİŞİM
                                </a>
                            </Link>
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
};

export default TopNav;