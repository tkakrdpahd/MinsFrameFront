import { getT } from '@/app/i18n'
// import { Trans } from 'react-i18next/TransWithoutContext'
import Counter from '@/fsd/features/counter'
import { Flex } from '@radix-ui/themes'

export default async function Page() {
  const { t } = await getT()

  return (
    <Flex width="100%" height="100%" direction="column" align="center" justify="center">
      <h1 className='text-center text-2xl font-bold'>{t('title')}</h1>
      <Counter />
    </Flex>
  )
}
