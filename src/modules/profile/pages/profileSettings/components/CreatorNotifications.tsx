import { useQuery } from '@apollo/client'
import { Avatar, FormControl, FormLabel, HStack, Switch, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import * as yup from 'yup'

import { QUERY_CREATOR_NOTIFICATIONS_SETTINGS } from '@/modules/profile/graphql/queries/creatorNotificationsSettingsQuery'
import { ControlledSelect } from '@/shared/components/controlledInput'
import { Body } from '@/shared/components/typography'

// Define the form schema using Yup
const schema = yup.object().shape({
  projects: yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      creatorSummary: yup.boolean(),
      creatorSummaryFrequency: yup.string().when('creatorSummary', {
        is: true,
        then: (schema) => schema.required('Please select a frequency'),
      }),
      goalReached: yup.boolean(),
      saleMade: yup.boolean(),
      contributionReceived: yup.boolean(),
      contributionThreshold: yup.string().when('contributionReceived', {
        is: true,
        then: (schema) => schema.required('Please select a threshold'),
      }),
    }),
  ),
})

export const CreatorNotifications = () => {
  const { userId } = useParams()

  const { data } = useQuery(QUERY_CREATOR_NOTIFICATIONS_SETTINGS, {
    variables: { userId },
    onCompleted(data) {
      console.log(data)
    },
  })

  const settings = data?.settingsNotificationsCreatorGet
  const project = settings?.project

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      project: {
        id: project?.id,
        creatorSummary:
          settings?.notificationSettings.find((s: any) => s.notificationType === 'creator.projectSummary')?.isEnabled ||
          false,
        creatorSummaryFrequency:
          settings?.notificationSettings
            .find((s: any) => s.notificationType === 'creator.projectSummary')
            ?.configurations.find((c: any) => c.name === 'frequency')?.value || '',
        goalReached:
          settings?.notificationSettings.find((s: any) => s.notificationType === 'creator.goalReached')?.isEnabled ||
          false,
        saleMade:
          settings?.notificationSettings.find((s: any) => s.notificationType === 'creator.saleMade')?.isEnabled ||
          false,
        contributionReceived:
          settings?.notificationSettings.find((s: any) => s.notificationType === 'creator.contributionReceived')
            ?.isEnabled || false,
        contributionThreshold:
          settings?.notificationSettings
            .find((s: any) => s.notificationType === 'creator.contributionReceived')
            ?.configurations.find((c: any) => c.name === 'threshold')?.value || '',
      },
    },
  })

  const onSubmit = (data: any) => {
    console.log(data)
    // Handle form submission
  }

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={6} align="stretch">
        <Body size="lg" bold>
          Creator notifications
        </Body>
        {project && (
          <VStack key={project.id} spacing={4} align="stretch" p={4}>
            <HStack>
              <Avatar src={project.avatarUrl} name={project.title} size="sm" />
              <Body bold>{project.title}</Body>
            </HStack>

            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <FormLabel htmlFor={`creator-summary-${project.id}`} mb="0">
                <Body size="lg">Creator summary email</Body>
              </FormLabel>
              <HStack>
                <ControlledSelect
                  name={`project.creatorSummaryFrequency`}
                  control={control}
                  label=""
                  size="sm"
                  options={[
                    { value: 'weekly', label: 'Weekly' },
                    { value: 'monthly', label: 'Monthly' },
                  ]}
                  placeholder="Select frequency"
                  width="auto"
                />
                <Controller
                  name={`project.creatorSummary`}
                  control={control}
                  render={({ field: { onChange, value, ref } }) => (
                    <Switch id={`creator-summary-${project.id}`} isChecked={value} onChange={onChange} ref={ref} />
                  )}
                />
              </HStack>
            </FormControl>
            <Body size="sm">
              Receive a monthly email about your project summary: stats, goal progress and, hot rewards..
            </Body>

            <Body size="lg" bold>
              Event alerts
            </Body>
            <Body size="sm">
              Get notified with an email as soon as important events takes place in your project, from making a reward
              sale, to receiving a contribution above a certain amount, and reaching a goal.
            </Body>

            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <FormLabel htmlFor={`goal-reached-${project.id}`} mb="0">
                <Body size="lg">Goal Reached Email</Body>
              </FormLabel>
              <Controller
                name={`project.goalReached`}
                control={control}
                render={({ field: { onChange, value, ref } }) => (
                  <Switch id={`goal-reached-${project.id}`} isChecked={value} onChange={onChange} ref={ref} />
                )}
              />
            </FormControl>

            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <FormLabel htmlFor={`sale-made-${project.id}`} mb="0">
                <Body size="lg">Sale Made</Body>
              </FormLabel>
              <Controller
                name={`project.saleMade`}
                control={control}
                render={({ field: { onChange, value, ref } }) => (
                  <Switch id={`sale-made-${project.id}`} isChecked={value} onChange={onChange} ref={ref} />
                )}
              />
            </FormControl>

            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <FormLabel htmlFor={`contribution-received-${project.id}`} mb="0">
                <Body size="lg">Contribution received</Body>
              </FormLabel>
              <HStack>
                <ControlledSelect
                  name={`project.contributionThreshold`}
                  control={control}
                  label=""
                  size="sm"
                  options={[
                    { value: '10000', label: '> 10,000' },
                    { value: '50000', label: '> 50,000' },
                    { value: '100000', label: '> 100,000' },
                    { value: 'all', label: 'All' },
                  ]}
                  placeholder="Select threshold"
                  width="auto"
                />
                <Controller
                  name={`project.contributionReceived`}
                  control={control}
                  render={({ field: { onChange, value, ref } }) => (
                    <Switch
                      id={`contribution-received-${project.id}`}
                      isChecked={value}
                      onChange={onChange}
                      ref={ref}
                    />
                  )}
                />
              </HStack>
            </FormControl>
          </VStack>
        )}
      </VStack>
    </form>
  )
}
