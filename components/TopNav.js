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
                        <Link href="/" style={{ textDecoration: "none" }} underline="none">
                            <Typography
                                className={
                                    location === "/" ? classes.activeNavLink : classes.navLink
                                }
                                variant="button"
                            >
                                Ana Sayfa
                            </Typography>
                        </Link>
                        <Link
                            href="/hakkimizda"
                            style={{ textDecoration: "none" }}
                            underline="none"
                        >
                            <Typography
                                className={
                                    location === "/hakkimizda"
                                        ? classes.activeNavLink
                                        : classes.navLink
                                }
                                variant="button"
                            >
                                Hakkımızda
                            </Typography>
                        </Link>
                        <Link
                            href="/blog"
                            style={{ textDecoration: "none" }}
                            underline="none"
                        >
                            <Typography
                                className={
                                    location.includes("/blog")
                                        ? classes.activeNavLink
                                        : classes.navLink
                                }
                                variant="button"
                            >
                                Blog
                            </Typography>
                        </Link>
                        <Link
                            href="/iletisim"
                            style={{ textDecoration: "none" }}
                            underline="none"
                        >
                            <Typography
                                className={
                                    location === "/iletisim"
                                        ? classes.activeNavLink
                                        : classes.navLink
                                }
                                variant="button"
                            >
                                İLETİŞİM
                            </Typography>
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
};

export default TopNav;