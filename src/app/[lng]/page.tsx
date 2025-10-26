// @/app/[lng]/page.tsx
// import { useT } from '../i18n/client';
import { getT } from '@/app/i18n'
// import { Trans } from 'react-i18next/TransWithoutContext'
import { Flex, Heading } from '@radix-ui/themes'
import Radix from '@/fsd/features/radix'
import SMPTE from '@/fsd/shared/smpte'
import Counter from '@/fsd/features/counter'
import Ky from '@/fsd/features/ky'

export default async function Page() {
  const { t } = await getT()

  return (
    <Flex width="100%" height="100%" direction="column">
      <Heading size="6" weight="bold" align="center">{t('title')}</Heading>
      <Flex width="100%" height="100%" direction="row" align="center" justify="center" gap="9" mt="4">
        <Flex direction="column" gap="2">
          <Ky />
          <Radix />
          <Counter />
        </Flex>
        <SMPTE />
      </Flex>
    </Flex>
  )
}
