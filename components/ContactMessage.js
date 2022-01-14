import React from 'react';
import {Card, CardContent, Typography} from "@mui/material";
import classes from "../styles/ContactMessage.module.css";

const ContactMessage = ({firstName, lastName, email, message}) => {
    return (
        <Card className={classes.root} style={{ marginBottom: "1.2rem" }}>
            <CardContent>
                <Typography variant="h6" component="h2">
                    {`${firstName} ${lastName}`}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {email}
                </Typography>
                <Typography variant="body2" component="p">
                    {message}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ContactMessage;