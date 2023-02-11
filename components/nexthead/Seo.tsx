import Head from "next/head";
import { useRouter } from "next/router";

const websiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const defaultMeta = {
  title: "JOB PORTAL",
  site_name: "JOB PORTAL Website",
  description:
    "A common destination for you to find new job and find new recruiter. One Stop Destination for all your Career Need.",
  url: "",
  image: `${websiteUrl}iconsimgs/mainimg.webp`,
  type: "website",
  robots: "index, follow",
};

type SeoProps = {
  pageTitle?: string;
  description?: string;
  keywords?: string;
  image?: string;
  author?: string;
} & Partial<typeof defaultMeta>;

export default function Seo(props: SeoProps) {
  const router = useRouter();
  const meta = {
    ...defaultMeta,
    ...props,
  };
  meta["title"] = props.pageTitle
    ? `${props.pageTitle} | JobPortal`
    : meta.title;

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>{meta.title}</title>
      <meta name="robots" content={meta.robots} />
      <meta name="googlebot" content={meta.robots} />
      <meta content={meta.description} name="description" />
      <meta name="keywords" content={meta.keywords}></meta>
      <meta name="author" content={meta.author} />
      <meta property="og:url" content={`${meta.url}${router.asPath}`} />
      <link rel="canonical" href={`${meta.url}${router.asPath}`} />

      {/* Open Graph */}
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content={meta.site_name} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" content={`${meta.image}`} />
      {/* <meta property="og:image:url" content={meta.image} /> */}
      <meta property="og:image:alt" content="Job Portal" />
      {/* <meta property="og:image:type" content="images/svg" /> */}
      {/* <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" /> */}
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {/* <meta name="twitter:site" content="@th_clarence" /> */}
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
      <meta property="twitter:image:alt" content="Job Portal" />

      <link rel="shortcut icon" href="/favicon.png" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content={meta.image} />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
}
