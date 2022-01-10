import React from "react";
import Head from "next/head";
import MainLayout from "../components/MainLayout";
import Link from "next/link"
import {Box, Container} from "@mui/material";
import classes from "../styles/About.module.css";

const Hakkimizda = () => {
    return (
        <React.Fragment>
            <Head>
                <title>Hakkımızda ~ Etucyber</title>
                <meta name="description" content="Etucyber aile ortamı içerisinde üyelerin; birbirini geliştirmesi, siber güvenlik sektöründeki önemli kişiler ile tanışmasını ve bilgi seviyesini arttırmayı amaçlamaktadır." />
            </Head>
            <MainLayout>
                <Box style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5)), url('/about.jpg')"}} className={"hero"}>
                    <Box>HAKKIMIZDA</Box>
                </Box>
                <Container className={classes.blogContainer}>
                    <p>
                        <span id="docs-internal-guid-807d5d9c-7fff-fbd3-dc62-36b3778b3f35"></span>
                    </p>{" "}
                    <p dir="ltr">
            <span>
              Etucyber, 26 Temmuz 2019 tarihinde TOBB Ekonomi ve Teknoloji
                &Uuml;niversitesi i&ccedil;inde Ahmet Selim KAYA ve İlayda
              G&Uuml;NDOĞDU tarafından kurulmuş olan bir siber g&uuml;venlik
              topluluğudur. Yakın bir zamanda kurulmuş bir topluluk olmasına
              rağmen bir&ccedil;ok b&uuml;y&uuml;k etkinlik ve eğitim
              d&uuml;zenlemiş ve ev sahipliği yapmıştır. Savunma Sanayii
              Başkanlığı himayesinde ger&ccedil;ekleştirilen Siber G&uuml;venlik
              Yaz Kampı gibi etkinliklerde aktif olarak g&ouml;rev alarak
              Etucyber sekt&ouml;rdeki uzmanlara adını duyurmuştur.
            </span>
                    </p>{" "}
                    <p dir="ltr">
            <span>
              <img
                  style={{
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      maxWidth: "100%",
                  }}
                  src="https://pbs.twimg.com/media/EN8zSLjW4AAbs4H?format=jpg&amp;name=large"
                  alt=""
              />
            </span>
                    </p>{" "}
                    <p dir="ltr">
            <span>
              <span id="docs-internal-guid-e1227c74-7fff-e5f5-81b3-e57e8b32ade7">
                <span>
                  Etucyber aile ortamı i&ccedil;erisinde &uuml;yelerin;
                  birbirini geliştirmesi, siber g&uuml;venlik
                  sekt&ouml;r&uuml;ndeki &ouml;nemli kişiler ile tanışmasını ve
                  bilgi seviyesini arttırmayı ama&ccedil;lamaktadır.
                </span>
              </span>
            </span>
                    </p>
                    <p>
            <span id="docs-internal-guid-a54c5236-7fff-ae86-13ae-47eb30a98f5c">
              <span>
                G&uuml;n&uuml;m&uuml;zde &ccedil;ok fazla veri &uuml;retilmekte
                ve saklanmakta. Verilerin ağ &uuml;zerinden g&uuml;venli bir
                şekilde aktarılması, uygulamaların verileri g&uuml;venli bir
                şekilde işleyebilmesi ve cihazların g&uuml;venlikleri hem birey
                d&uuml;zeyinde hem de devlet d&uuml;zeyinde b&uuml;y&uuml;k bir
                  &ouml;nem arz etmektedir. Teknolojiler hızlı geliştiği
                i&ccedil;in g&uuml;venlik &ouml;nlemleri de sık&ccedil;a
                değişmeye mecburdur. Dolayısıyla siber g&uuml;venlik alanı
                giderek daha da heyecanlı ve dinamik olmaya başlamıştır.
                Etucyber olarak bu &ouml;nemli alanda gelişmeyi ve insanlara da
                bu alanın &ouml;nemini g&ouml;stermeyi istiyoruz. Topluluğumuz
                b&uuml;nyesinde yer almak veyahut topluluğumuz ile etkinlik
                d&uuml;zenlemek i&ccedil;in{" "}

                  <Link href={"/iletisim"}>
                      <a style={{color: "#1A73E8"}}>İletişim</a>
                  </Link>

                  {" "}b&ouml;l&uuml;m&uuml;nden bizler ile iletişime
                ge&ccedil;ebilirsiniz.
              </span>
            </span>
                    </p>
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

export default Hakkimizda;
