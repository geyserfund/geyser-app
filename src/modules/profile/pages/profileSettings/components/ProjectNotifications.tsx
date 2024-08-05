import { FormControl, FormLabel, HStack, Switch, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { ControlledSelect } from '@/shared/components/controlledInput'
import { Body } from '@/shared/components/typography'

const schema = yup.object().shape({
  projectUpdates: yup.boolean(),
  projectUpdatesFrequency: yup.string().when('projectUpdates', {
    is: true,
    then: (schema) => schema.required('Please select a frequency'),
  }),
  geyserProductUpdates: yup.boolean(),
})

export const ProjectNotifications = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      projectUpdates: false,
      projectUpdatesFrequency: 'weekly',
      geyserProductUpdates: true,
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
          Project notifications
        </Body>
        <VStack spacing={4} align="stretch" p={4}>
          <FormControl display="flex" alignItems="center" justifyContent="space-between">
            <FormLabel htmlFor="project-updates" mb="0">
              <Body size="lg">Project Updates</Body>
            </FormLabel>
            <HStack>
              <ControlledSelect
                name="projectUpdatesFrequency"
                control={control}
                size="sm"
                label=""
                options={[
                  { value: 'weekly', label: 'Weekly' },
                  { value: 'monthly', label: 'Monthly' },
                ]}
                placeholder="Select frequency"
                width="auto"
              />
              <Controller
                name="projectUpdates"
                control={control}
                render={({ field: { onChange, value, ref } }) => (
                  <Switch id="project-updates" isChecked={value} onChange={onChange} ref={ref} />
                )}
              />
            </HStack>
          </FormControl>

          <FormControl display="flex" alignItems="center" justifyContent="space-between">
            <FormLabel htmlFor="geyser-product-updates" mb="0">
              <Body size="lg">Geyser product updates</Body>
            </FormLabel>
            <Controller
              name="geyserProductUpdates"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <Switch id="geyser-product-updates" isChecked={value} onChange={onChange} ref={ref} />
              )}
            />
          </FormControl>
        </VStack>
      </VStack>
    </form>
  )
}
