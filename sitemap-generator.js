const fs = require('fs');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// IMPORTANT: Replace with your actual service account key
// You can download this from your Firebase project settings
const serviceAccount = require('./key.json'); // This file is not in the repo, you must add it

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const baseUrl = 'https://miss-blog-backend-92eb6.web.app'; // Use the Firebase hosting URL

async function generateSitemap() {
  console.log('Generating sitemap...');

  const staticPages = [
    'index.html',
    'about.html',
    'services.html',
    'cases.html',
    'news.html',
    'contact.html'
  ];

  let urls = staticPages.map(page => {
    // index.html should be represented as the root URL
    const loc = page === 'index.html' ? baseUrl : `${baseUrl}/${page}`;
    return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>${page === 'index.html' ? '1.0' : '0.8'}</priority>
  </url>`;
  });

  // Fetch dynamic post URLs from Firestore
  try {
    const postsSnapshot = await db.collection('posts').get();
    postsSnapshot.forEach(doc => {
      const post = doc.data();
      const loc = `${baseUrl}/post.html?id=${doc.id}`;
      // Use post's last updated date if available, otherwise use now
      const lastmod = post.lastUpdated ? new Date(post.lastUpdated.seconds * 1000).toISOString() : new Date().toISOString();
      urls.push(`
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>0.6</priority>
  </url>`);
    });
    console.log(`Added ${postsSnapshot.size} dynamic URLs from 'posts' collection.`);
  } catch (error) {
      console.error("Error fetching 'posts' from Firestore:", error.message);
      console.log("Skipping dynamic URLs for posts.");
  }


  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`;

  fs.writeFileSync('public/sitemap.xml', sitemapContent);
  console.log('Sitemap successfully generated at public/sitemap.xml!');
}

generateSitemap().catch(console.error); 