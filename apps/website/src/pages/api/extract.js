import { convertSitemapToDomainModels } from '@depl/convert-sitemap-to-domain-models';

export async function get({ request }) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.searchParams);
  const domain = params.get('domain');
  const sitemap = `https://${domain}/sitemap_index.xml`;
  const { collections, pages } = await convertSitemapToDomainModels(sitemap);

  if (!collections && !pages) {
    return new Response(null, {
      status: 404,
      statusText: 'Not found',
    });
  }

  return new Response(JSON.stringify({ collections, pages }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
