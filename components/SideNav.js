import React from "react";
import clsx from "clsx";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import classes from "../styles/Navigation.module.css";

export default function TemporaryDrawer() {
    const [state, setState] = React.useState(false);

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState(open);
    };

    const list = () => (
        <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={toggleDrawer("right", false)}
            onKeyDown={toggleDrawer("right", false)}
        >
            <Divider />
            <List>
                <Link href="/" style={{ textDecoration: "none" }} underline="none">
                    <ListItem button key="ana sayfa">
                        <Typography className={classes.nav}>{"ana sayfa"}</Typography>
                    </ListItem>
                </Link>
                <Link
                    href="/hakkimizda"
                    style={{ textDecoration: "none" }}
                    underline="none"
                >
                    <ListItem button key="hakkımızda">
                        <Typography className={classes.nav}>{"hakkımızda"}</Typography>
                    </ListItem>
                </Link>
                <Link href="/blog" style={{ textDecoration: "none" }} underline="none">
                    <ListItem button key="blog">
                        <Typography className={classes.nav}>{"blog"}</Typography>
                    </ListItem>
                </Link>
                <Link
                    href="/iletisim"
                    style={{ textDecoration: "none" }}
                    underline="none"
                >
                    <ListItem button key="İLETİŞİM">
                        <Typography className={classes.nav}>{"İLETİŞİM"}</Typography>
                    </ListItem>
                </Link>
            </List>
        </div>
    );

    return (
        <AppBar key={"right"} className={classes.appBar} position="sticky">
            <Toolbar>
                <Link href="/" style={{ textDecoration: "none" }} underline="none">
                    <Typography className={classes.brandTitle} variant="h6">
                        Etucyber
                    </Typography>
                </Link>
                <Box className={classes.navs}>
                    <IconButton
                        onClick={toggleDrawer("right", true)}
                        className={classes.menuButton}
                        style={{ fill: "#555" }}
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        anchor={"right"}
                        open={state}
                        onClose={toggleDrawer("right", false)}
                    >
                        {list()}
                    </Drawer>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
