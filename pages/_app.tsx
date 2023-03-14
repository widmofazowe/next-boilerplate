import Head from 'next/head';
import App, { AppContext, AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../layout/theme';
import createEmotionCache from '../layout/createEmotionCache';
import Layout from '../layout/layout';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Cookies as ReactCookies, CookiesProvider } from 'react-cookie';
import debug from 'debug';

debug.enable('typer:*');

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
  cookies?: string;
};

const getDefaultLayout = page => {
  return <Layout roles={[]}>{page}</Layout>;
};

const queryClient = new QueryClient();

export default function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
  cookies,
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? getDefaultLayout;

  const isBrowser = typeof window !== 'undefined';

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <CookiesProvider cookies={isBrowser ? undefined : new ReactCookies(cookies)}>
          <QueryClientProvider client={queryClient}>{getLayout(<Component {...pageProps} />)}</QueryClientProvider>
        </CookiesProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps, cookies: appContext.ctx.req?.headers?.cookie };
};
