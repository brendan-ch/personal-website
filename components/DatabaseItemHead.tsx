import Head from "next/head";

interface Props {
  title?: string,
  description?: string,
  previewImageLink?: string,
}

/**
 * 
 */
export default function DatabaseItemHead({ title, description, previewImageLink }: Props) {
  return (
    <Head>
      <title>{title} | Brendan Chen</title>

      {previewImageLink ? (
        <meta name="og:image" content={previewImageLink}></meta>
      ) : undefined}

      {description ? (
        <meta name="description" content={description}></meta>
      ) : undefined}

      {description ? (
        <meta name="og:description" content={description}></meta>
      ) : undefined}
    </Head>
  );
}