import { useMutation } from '@apollo/client';
import {
  HStack,
  Text,
  VStack,
  GridItem,
  InputGroup,
  Input,
  InputRightAddon,
  Switch,
  Link,
  useMediaQuery,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { useParams } from 'react-router';
import { CalendarButton, FileUpload } from '../../components/molecules';
import {
  ButtonComponent,
  Card,
  ImageWithReload,
  TextArea,
  TextInputBox,
} from '../../components/ui';
import { colors, commonMarkdownUrl } from '../../constants';
import { useAuthContext } from '../../context';
import { MUTATION_UPDATE_PROJECT } from '../../graphql/mutations';
import {
  isMobileMode,
  isActive,
  toInt,
  useNotification,
  validateEmail,
  validLightningAddress,
} from '../../utils';
import { ProjectCreationVariables } from '../creation/projectCreate/types';
import { DateTime } from 'luxon';
import {
  ProjectValidations,
  UserValidations,
} from '../../constants/validations';
import { Project, ProjectStatus } from '../../types/generated/graphql';
import { BiInfoCircle } from 'react-icons/bi';

export const ProjectSettings = ({ project }: { project: Project }) => {
  const params = useParams<{ projectId: string }>();
  const isEdit = Boolean(params.projectId);
  const isMobile = isMobileMode();

  const { toast } = useNotification();

  const { user } = useAuthContext();
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');

  const [form, setForm] = useState<ProjectCreationVariables>({
    title: '',
    description: '',
    image: '',
    email: '',
    name: '',
  });

  const [formError, setFormError] = useState<{ [key: string]: any }>({});
  const [selectedButton, setSelectedButton] = useState(
    project.expiresAt ? 'custom' : 'ongoing',
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    project.expiresAt
      ? DateTime.fromMillis(toInt(project.expiresAt)).toJSDate()
      : undefined,
  );
  const [finalDate, setFinalDate] = useState<string>();
  const [deactivate, setDeactivate] = useState(!isActive(project.status));

  const [updateProject, { loading: updateLoading }] = useMutation(
    MUTATION_UPDATE_PROJECT,
    {
      onCompleted() {
        toast({
          title: 'Project updated successfully!',
          status: 'success',
        });
      },
      onError(error) {
        toast({
          title: 'project update failed!',
          description: `${error}`,
          status: 'error',
        });
      },
    },
  );

  useEffect(() => {
    if (project && project.id) {
      setForm({
        title: project.title,
        name: project.name,
        image: project.image || undefined,
        description: project.description,
        email: user.email || '',
      });
    }
  }, [project]);

  const handleChange = (event: any) => {
    if (event) {
      const { name, value } = event.target;

      const newForm = { ...form, [name]: value || '' };

      if (name === 'title' && !isEdit) {
        const projectName: string = value.split(' ').join('').toLowerCase();
        const sanitizedName = projectName.replaceAll(validLightningAddress, '');

        newForm.name = sanitizedName;
      }

      setForm(newForm);
      if (
        name === 'title' &&
        value.length > ProjectValidations.title.maxLength
      ) {
        setFormError({
          title: `Character Limit: ${ProjectValidations.title.maxLength}/${value.length}`,
        });
      } else if (
        name === 'description' &&
        value.length > ProjectValidations.description.maxLength
      ) {
        setFormError({
          description: (
            <HStack
              width="100%"
              justifyContent="space-between"
              paddingTop="5px"
            >
              <Text fontSize="12px" color="brand.error">
                Character limit:
              </Text>
              <Text
                fontSize="12px"
                color="brand.error"
              >{` ${ProjectValidations.description.maxLength}/${value.length}`}</Text>
            </HStack>
          ),
        });
      } else {
        setFormError({});
      }
    }
  };

  const handleDateChange = (value: Date) => {
    setSelectedButton('custom');
    setSelectedDate(value);
    setFinalDate(`${value.getTime()}`);
  };

  const handleMonthSelect = () => {
    setSelectedButton('month');
    const dateMonth = DateTime.now().plus({ months: 1 });
    setSelectedDate(undefined);
    setFinalDate(`${dateMonth.toJSDate().getTime()}`);
  };

  const handleOngoingSelect = () => {
    setSelectedButton('ongoing');
    setSelectedDate(undefined);
    setFinalDate('');
  };

  const handleUpload = (url: string) => setForm({ ...form, image: url });
  const handleDeactivate = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event) {
      setDeactivate(event.target.checked);
    }
  };

  const handleNext = () => {
    const isValid = validateForm();

    const newForm = form;
    newForm.email = user.email || form.email;
    if (isValid) {
      updateProject({
        variables: {
          input: {
            projectId: toInt(project.id),
            title: form.title,
            image: form.image,
            description: form.description,
            expiresAt: finalDate || null,
            status: deactivate ? ProjectStatus.Inactive : ProjectStatus.Active,
          },
        },
      });
    }
  };

  const validateForm = () => {
    const errors: any = {};
    let isValid = true;

    if (!form.name) {
      errors.name = 'Project name is a required field.';
      isValid = false;
    } else if (
      form.name.length < ProjectValidations.name.minLength ||
      form.name.length > ProjectValidations.name.maxLength
    ) {
      errors.name = `Project name should be between ${ProjectValidations.name.minLength} and ${ProjectValidations.name.maxLength} characters.`;
      isValid = false;
    }

    if (!form.title) {
      errors.title = 'Title is a required field.';
      isValid = false;
    } else if (form.title.length > ProjectValidations.title.maxLength) {
      errors.title = `Title should be shorter than ${ProjectValidations.title.maxLength} characters.`;
      isValid = false;
    }

    if (!form.description) {
      errors.description = 'Project objective is a required field.';
      isValid = false;
    } else if (
      form.description.length > ProjectValidations.description.maxLength
    ) {
      errors.description = `Project objective should be shorter than ${ProjectValidations.description.maxLength} characters.`;
      isValid = false;
    }

    if (!form.email && !user.email) {
      errors.email = 'Email address is a required field.';
      isValid = false;
    } else if (!user.email && !validateEmail(form.email)) {
      errors.email = 'Please enter a valid email address.';
      isValid = false;
    } else if (form.email.length > UserValidations.email.maxLength) {
      errors.email = `Email address should be shorter than ${UserValidations.email.maxLength} characters.`;
      isValid = false;
    }

    if (!isValid) {
      setFormError(errors);
    }

    return isValid;
  };

  return (
    <>
      <GridItem
        colSpan={isLargerThan1280 ? 6 : 2}
        display="flex"
        justifyContent="center"
      >
        <VStack
          spacing="30px"
          width="100%"
          minWidth="350px"
          maxWidth="600px"
          marginBottom="40px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <VStack width="100%" alignItems="flex-start">
            <VStack width="100%" alignItems="flex-start">
              <Text>Project Title</Text>
              <TextInputBox
                name="title"
                onChange={handleChange}
                value={form.title}
                error={formError.title}
              />
            </VStack>
            <VStack width="100%" alignItems="flex-start">
              <Text>Lightning Address Preview</Text>
              <InputGroup size="md" borderRadius="4px">
                <Input
                  name="name"
                  onChange={handleChange}
                  value={form.name}
                  isInvalid={Boolean(formError.name)}
                  focusBorderColor={colors.primary}
                  disabled={isEdit}
                />
                <InputRightAddon>@geyser.fund</InputRightAddon>
              </InputGroup>
              {formError.name && (
                <Text color="brand.error" fontSize="12px">
                  {formError.name}
                </Text>
              )}
            </VStack>
            <VStack width="100%" alignItems="flex-start">
              <Text>Project Image</Text>
              <FileUpload onUploadComplete={handleUpload}>
                <HStack
                  borderRadius="4px"
                  backgroundColor="brand.bgGrey"
                  width="100%"
                  height="70px"
                  justifyContent="center"
                  alignItems="center"
                  _hover={{ backgroundColor: 'brand.gray300' }}
                >
                  <AiOutlineUpload />
                  <Text>Select a header image</Text>
                </HStack>
              </FileUpload>
              <Text fontSize="10px" color="brand.neutral700">
                For best fit, pick an image around 800px x 200px. Image size
                limit: 10MB.
              </Text>
            </VStack>
            <VStack width="100%" alignItems="flex-start">
              <Text>Main Objective</Text>
              <TextArea
                minHeight="120px"
                maxHeight="800px"
                height="fit-content"
                overflowY="auto"
                name="description"
                value={form.description}
                onChange={handleChange}
                error={formError.description}
              />
              {!formError.description && (
                <HStack width="100%" justifyContent="space-between">
                  <HStack spacing="5px">
                    <Text fontSize="12px" color="brand.neutral700">
                      For **Bold** and *Italic*, see more{' '}
                    </Text>
                    <HStack
                      as={Link}
                      href={commonMarkdownUrl}
                      isExternal
                      spacing="0px"
                      _focus={{}}
                    >
                      <BiInfoCircle />
                      <Text fontSize="12px" color="brand.neutral700">
                        HTML MarkDown
                      </Text>
                    </HStack>
                  </HStack>

                  <Text
                    fontSize="12px"
                    color="brand.neutral700"
                  >{`${form.description.length}/${ProjectValidations.description.maxLength}`}</Text>
                </HStack>
              )}
            </VStack>

            <VStack width="100%" alignItems="flex-start">
              <Text>Project E-mail</Text>
              <TextInputBox
                name="email"
                value={user.email || form.email}
                onChange={handleChange}
                error={formError.email}
                isDisabled={Boolean(user.email)}
              />
            </VStack>
            <VStack width="100%" alignItems="flex-start">
              <Text>Fundraising deadline</Text>
              <HStack width="100%" justifyContent="space-around">
                <ButtonComponent
                  primary={selectedButton === 'ongoing'}
                  onClick={handleOngoingSelect}
                >
                  Ongoing
                </ButtonComponent>
                <ButtonComponent
                  primary={selectedButton === 'month'}
                  onClick={handleMonthSelect}
                >
                  1 Month
                </ButtonComponent>
                <CalendarButton
                  primary={selectedButton === 'custom'}
                  value={selectedDate}
                  onChange={handleDateChange}
                >
                  Custom
                </CalendarButton>
              </HStack>
              <Text fontSize="12px">
                Add a deadline for your project if you have one, or just keep it
                as ongoing.
              </Text>
            </VStack>
            {project.status !== ProjectStatus.Deleted && (
              <VStack width="100%" alignItems="flex-start">
                <Text>Deactivate</Text>
                <Switch
                  defaultChecked={deactivate}
                  onChange={handleDeactivate}
                  colorScheme="red"
                >
                  {' '}
                  Deactivate Project
                </Switch>
                <Text fontSize="12px">
                  Deactivating your project would not allow others to fund your
                  project, but your project will still be visible to everyone
                  else. You will be able to re-activate your project at any
                  time.
                </Text>
              </VStack>
            )}
            <ButtonComponent
              isLoading={updateLoading}
              primary
              isFullWidth
              onClick={handleNext}
            >
              Save
            </ButtonComponent>
          </VStack>
        </VStack>
      </GridItem>
      <GridItem
        colSpan={isLargerThan1280 ? 3 : 2}
        display="flex"
        marginTop={isMobile ? '0px' : '0px'}
        alignItems="flex-start"
        justifyContent="center"
      >
        <VStack justifyContent="center" alignItems="flex-start" spacing="10px">
          <Text>Preview</Text>
          <HStack width="100%" justifyContent="center">
            <Card padding="16px 10px" overflow="hidden" maxWidth="370px">
              <ImageWithReload
                src={form.image}
                noCacheId={(Math.random() + 1).toString(36).substring(7)}
                height="222px"
                width="350px"
              />
              <Text>geyser.fund/project</Text>
              <Text fontSize="28px" fontWeight={700}>
                {form.title || 'Project Title'}
              </Text>
              <Text
                fontSize="16px"
                color="brand.textGrey"
                wordBreak="break-word"
                isTruncated
              >
                {form.description || 'project description'}
              </Text>
            </Card>
          </HStack>
        </VStack>
      </GridItem>
    </>
  );
};
