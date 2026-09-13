export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://ma23digital.vercel.app/sitemap.xml',
  };
}