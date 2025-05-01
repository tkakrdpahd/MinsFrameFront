// @/app/[lng]/layout.tsx
import { Noto_Sans_JP, Noto_Sans_KR } from 'next/font/google';
import { dir } from 'i18next'
import { languages } from '../i18n/settings'
import { getT } from '../i18n'
import Preload from './preload';
import './global.css'
// 전역 컴포넌트
import Header from '@/fsd/widgets/header';
import Footer from '@/fsd/widgets/footer';

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
    content: t('content')
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
    <html lang={lng} dir={dir(lng)} suppressHydrationWarning>
      <head />
      <body className={`${notoSansJP.variable} ${notoSansKR.variable} antialiased`}>
        <Preload>
          <div className="flex flex-col h-screen">
            <Header />
            <main className="flex flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Preload>
      </body>
    </html>
  )
}
