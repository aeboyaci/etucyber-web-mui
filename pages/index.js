import * as React from 'react';
import MainLayout from '../components/MainLayout';
import Head from "next/head";
import {useRouter} from "next/router";
import classes from "../styles/Index.module.css";
import {Box, Button, Typography} from "@mui/material";

const Index = () => {
    const router = useRouter();

    return (
        <React.Fragment>
            <Head>
                <title>Ana Sayfa ~ Etucyber</title>
                <meta name="description" content="Etucyber - TOBB ETÜ Siber Güvenlik Topluluğu. Etucyber aile ortamı içerisinde üyelerin; birbirini geliştirmesi, siber güvenlik sektöründeki önemli kişiler ile tanışmasını ve bilgi seviyesini arttırmayı amaçlamaktadır." />
            </Head>
            <MainLayout>
                <Box className={classes.hero}>
                    <Box>
                        <div>Etucyber</div>
                        <div>
                            <Typography className={classes.isim} variant="h6">
                                TOBB Ekonomi ve Tekonoloji Üniversitesi Siber Güvenlik Topluluğu
                            </Typography>
                        </div>
                        <div>
                            <Button
                                onClick={() => router.push("/hakkimizda")}
                                size="large"
                                color="primary"
                                variant="contained"
                            >
                                Hakkımızda
                            </Button>
                        </div>
                    </Box>
                </Box>
            </MainLayout>
        </React.Fragment>
    );
};
export async function getStaticProps(context) {
    return {
        props: {},
    }
}

export default Index;