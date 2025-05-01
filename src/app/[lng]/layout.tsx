// @/app/[lng]/layout.tsx
import { Noto_Sans_JP, Noto_Sans_KR } from 'next/font/google';
import { dir } from 'i18next'
import { languages } from '../i18n/settings'
import { getT } from '../i18n'
import './global.css'

const notoSansJP = Noto_Sans_JP({
  variable: '--font-noto-sans-jp',
  subsets: ['latin'],
});

const notoSansKR = Noto_Sans_KR({
  variable: '--font-noto-sans-kr',
  subsets: ['latin'],
});

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export async function generateMetadata() {
  const { t } = await getT()
  return {
    title: t('title'),
    content: 'A playground to explore new Next.js 13/14/15 app directory features such as nested layouts, instant loading states, streaming, and component level data fetching.'
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lng: string; }>;
}) {
  const { lng } = await params
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body className={`${notoSansJP.variable} ${notoSansKR.variable} antialiased`}>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
