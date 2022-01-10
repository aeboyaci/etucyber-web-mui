import React from "react";
import {
    Button,
    Card,
    CardMedia,
    CardActions,
    CardContent,
    Typography,
    Box,
    Avatar,
} from "@mui/material";
import classes from "../styles/BlogPostCard.module.css";
import {useRouter} from "next/router";

const BlogCard = ({ title, description, imageUrl, displayName, photoUrl, createdAt, href }) => {
    const router = useRouter();

    return (
        <React.Fragment>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={imageUrl}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography
                        className={classes.description}
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {description}
                    </Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Box className={classes.author}>
                        <Avatar src={photoUrl}/>
                        <Box ml={2}>
                            <Typography variant="subtitle2" component="p">
                                {displayName}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                color="textSecondary"
                                component="p"
                            >
                                {createdAt}
                            </Typography>
                        </Box>
                    </Box>
                    <Button href={href} color="primary" variant="outlined">
                        Devamını Oku
                    </Button>
                </CardActions>
            </Card>
        </React.Fragment>
    );
};

export default BlogCard;