import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import NProgress from 'nprogress';
import {SWRConfig} from 'swr';
import {Router, appWithTranslation} from '~/utils/i18n';
import {fetcher} from '~/utils/fetch';
import {GlobalStyle} from '~/utils/style';
import Layout from '~/components/Layout';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

class VDLApp extends App {
    render() {
        const {Component, pageProps} = this.props;

        return (
            <>
                <Head>
                    <title>{process.env.title}</title>
                    <link rel="shortcut icon" href={`${process.env.PUBLIC_PATH}/favicon.ico`} />
                    <meta
                        name="viewport"
                        content="width=device-width,minimum-scale=1,maximum-scale=1,initial-scale=1,user-scalable=no,shrink-to-fit=no"
                    />
                    <meta name="description" content={process.env.description} />
                    <meta name="keywords" content={process.env.keywords} />
                    <meta name="author" content={process.env.author} />
                </Head>
                <GlobalStyle />
                <SWRConfig
                    value={{
                        fetcher,
                        revalidateOnFocus: false,
                        revalidateOnReconnect: false
                    }}
                >
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </SWRConfig>
            </>
        );
    }
}

export default appWithTranslation(VDLApp);
