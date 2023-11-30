import "@/styles/theme.css";
import "@/styles/globals.css";
import "@/styles/home.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@near-wallet-selector/modal-ui/styles.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";

import "public/fonts/GTWalsheimPro/stylesheet.css";
import "public/fonts/PPMonumentExtended/stylesheet.css";
import "public/fonts/Joystix/stylesheet.css";

import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";

import { Toaster } from "@/components/lib/Toast";
import { useBosLoaderInitializer } from "@/hooks/useBosLoaderInitializer";
import { useHashUrlBackwardsCompatibility } from "@/hooks/useHashUrlBackwardsCompatibility";
import type { NextPageWithLayout } from "@/utils/types";

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import WalletLayout from "@/components/layouts/WalletLayout";

const VmInitializer = dynamic(() => import("../components/vm/VmInitializer"), {
  ssr: false,
});

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());
  useBosLoaderInitializer();
  useHashUrlBackwardsCompatibility();

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <link rel="icon" href="favicon.ico" />
        </Head>

        <VmInitializer />
        <WalletLayout>{getLayout(<Component {...pageProps} />)}</WalletLayout>
        <Toaster />
      </Hydrate>
    </QueryClientProvider>
  );
}
