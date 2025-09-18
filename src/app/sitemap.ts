import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://miss-website-nextjs-psi.vercel.app'
  const currentDate = new Date()
  
  // 靜態頁面 - 確保 URL 格式正確
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cases`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // 動態案例頁面
  const caseIds = ['kenting', 'lanting', 'laojiang', 'xianglian', 'sansan', 'tianyuan']
  const casePages = caseIds.map((id) => ({
    url: `${baseUrl}/cases/${id}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // 動態消息頁面
  const newsIds = ['news-1', 'news-2', 'news-3', 'news-4', 'news-5', 'news-6']
  const newsPages = newsIds.map((id) => ({
    url: `${baseUrl}/news/${id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...casePages, ...newsPages]
}
