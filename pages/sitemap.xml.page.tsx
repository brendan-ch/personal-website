import { NextApiRequest, NextApiResponse } from 'next';
import getPages from '../helpers/getPages';

// Generate the sitemap in a server-side function
export async function getServerSideProps({ req, res }: { req: NextApiRequest, res: NextApiResponse }) {
  const baseUrl = `https://${req.headers.host}`;

  // List high-level pages here
  const highPriority = [
    '',
  ];

  // Generate the sitemap here
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${highPriority.map((value) => {
      return `<url>
        <loc>${baseUrl}${value}</loc>
        <priority>1.0</priority>
      </url>`;
    }).join('')}
  </urlset>`;

  // Set header
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

const Sitemap = () => {
  return null;
};

export default Sitemap;