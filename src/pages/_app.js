import "../styles/globals.css";
import toast, { Toaster } from "react-hot-toast";
import merge from "lodash/merge";
import "@rainbow-me/rainbowkit/styles.css";
import Head from 'next/head';
import CustomRainbowKit from "../Components/RainbowKit/CustomRainbowKit";

export default function App({ Component, pageProps }) {
  return (
    <CustomRainbowKit>
      <Head>
        <title>BET - Blockchain Energy Token</title>
        <meta
          content="BET - Blockchain Energy Token"
          name="description"
        />
        <link href="/assets/images/new-favicon.png" type="image/x-icon" rel="icon" />
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5QWNH2RX');`
        }} />
        {/* End Google Tag Manager */}
      </Head>
      <Component {...pageProps} />
      <Toaster />
      <script src="js/bootstrap.bundle.min.js"></script>
      <script src="js/smooth-scrollbar.js"></script>
      <script src="js/splide.min.js"></script>
      <script src="js/three.min.js"></script>
      <script src="js/vanta.fog.min.js"></script>
      <script src="js/main.js"></script>
    </CustomRainbowKit>
  );
}
