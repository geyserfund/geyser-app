import { t } from 'i18next'

import { SubscribeForm } from '@/shared/sections/SubscribeForm.tsx'

import { ProjectRowLayout } from '../components/ProjectRowLayout.tsx'

export const JoinOurMailingList = () => {
  return (
    <ProjectRowLayout
      w="full"
      title={t('Join our mailing list')}
      subtext={t('Get our monthly project udpates and stay up to date to what is happening in the Bitcoin space')}
    >
      <SubscribeForm />
    </ProjectRowLayout>
  )
}
