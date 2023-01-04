import Head from "next/head";

interface Props {
  title: string | null,
  description: string | null,
  previewImageLink: string | null,
  noRobots?: boolean,
}

/**
 * Database item metadata + OpenGraph shenanigans
 */
export default function DatabaseItemHead({ title, description, previewImageLink, noRobots }: Props) {
  return (
    <Head>
      <title>{title} | Brendan Chen</title>

      {title ? (
        <meta name="og:title" content={title}></meta>
      ) : undefined}

      {previewImageLink ? (
        <>
          <meta name="og:image" content={previewImageLink}></meta>
          <meta name="twitter:image" content={previewImageLink}></meta>
        </>
      ) : undefined}

      {description ? (
        <>
          <meta name="description" content={description}></meta>
          <meta name="og:description" content={description}></meta>
          <meta name="twitter:description" content={description}></meta>
        </>
      ) : undefined}

      {noRobots ? (
        <meta name="robots" content="noindex"></meta>
      ) : undefined}
    </Head>
  );
}