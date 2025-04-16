// pages/echolens/[[...slug]].tsx
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

interface Props {
  iframeUrl: string;
  pageTitle: string;
  favicon: string;
}
function buildIframeUrl(params: ParsedUrlQuery, query: ParsedUrlQuery): string {
  const rootUrl = 'http://echolens.atwebpages.com';
  let pathSegment = '';
  if (params.slug) {
    pathSegment = Array.isArray(params.slug) ? `/${params.slug.join('/')}` : `/${params.slug}`;
  }
  const searchParams = new URLSearchParams();
  // Append all query parameters (except 'slug') to the URL.
  for (const key in query) {
    if (key === 'slug') continue;
    const value = query[key];
    if (typeof value === 'string') {
      searchParams.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((val) => searchParams.append(key, val));
    }
  }
  let url = `${rootUrl}${pathSegment}`;
  const queryString = searchParams.toString();
  if (queryString) {
    url += `?${queryString}`;
  }
  return url;
}
function extractMetadata(html: string, baseUrl: string): { title: string; favicon: string } {
  const $ = cheerio.load(html);
  const title = $('title').text().trim() || 'Default Title';
  let favicon = '/favicon.ico';
  const faviconHref =
    $('link[rel="shortcut icon"]').attr('href') ||
    $('link[rel="icon"]').attr('href');
  if (faviconHref) {
    favicon = faviconHref.startsWith('http')
      ? faviconHref
      : new URL(faviconHref, baseUrl).href;
  }
  return { title, favicon };
}
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { params = {}, query } = context;
  // Build the iframe URL so that it excludes the /echolens path.
  const iframeUrl = buildIframeUrl(params, query);
  // Default metadata values.
  let pageTitle = 'Echolens Tiktok Analysis';
  let favicon = '/favicon.ico';
  try {
    // Fetch the content from the target URL.
    const response = await fetch(iframeUrl, { timeout: 75000 });
    if (response.ok) {
      const html = await response.text();
      const meta = extractMetadata(html, iframeUrl);
      pageTitle = meta.title;
      favicon = meta.favicon;
    } else {
      console.error(`Failed to fetch ${iframeUrl}: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching or parsing the iframe content:', error);
  }
  return {
    props: {
      iframeUrl,
      pageTitle,
      favicon,
    },
  };
};
const Home: NextPage<Props> = ({ iframeUrl, pageTitle, favicon }) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href={favicon} />
      </Head>
      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: hidden;
        }
      `}</style>
      <iframe
        src={iframeUrl}
        title="Embedded Content"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
        }}
      />
    </>
  );
};

export default Home;