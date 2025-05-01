import { getT } from '@/app/i18n'
// import { Trans } from 'react-i18next/TransWithoutContext'

export default async function Page() {
  const { t } = await getT()

  return (
    <>
      <h1 className='text-center text-2xl font-bold'>{t('title')}</h1>
    </>
  )
}
