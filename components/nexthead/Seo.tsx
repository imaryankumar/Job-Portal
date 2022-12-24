import Head from "next/head";
import { useRouter } from "next/router";
const defaultMeta = {
  title: "JOB PORTAL",
  site_name: "Job Portal Website",
  description:
    "Get quickly matched with only the most qualified candidates. That’s because LinkedIn goes beyond the resume and uses insights from your job post, your company, and our member profiles to find the people that meet your needs best.",
  url: process.env.NEXT_PUBLIC_WEB_URL,
  image: "https://unsplash.com/photos/5aiRb5f464A",
  type: "website",
  robots: "follow, index",
};
type SeoProps = {
  title?: string;
  description?: string;
  image?: string;
} & Partial<typeof defaultMeta>;
export default function Seo(props: SeoProps) {
  const router = useRouter();
  const meta = {
    ...defaultMeta,
    ...props,
  };
  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="robots" content={meta.robots} />
      <meta content={meta.description} name="description" />
      <meta property="og:url" content={`${meta.url}${router.asPath}`} />
      <link rel="canonical" href={`${meta.url}${router.asPath}`} />
      {/* Open Graph */}
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content={meta.site_name} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:image:url" content={meta.image} />
      <meta property="og:image:alt" content="JOB PORTAL" />
      <meta property="og:image:type" content="images/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {/* <meta name=“twitter:site” content=“@th_clarence” /> */}
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
      <meta property="twitter:image:alt" content="JOB PORTAL" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="msapplication-TileColor" content="#FFFFFF" />
      <meta name="msapplication-TileImage" content={meta.image} />
      <meta name="theme-color" content="#FFFFFF" />
    </Head>
  );
}