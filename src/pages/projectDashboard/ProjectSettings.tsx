import { useMutation } from '@apollo/client';
import {
  HStack,
  Text,
  VStack,
  GridItem,
  InputGroup,
  Input,
  InputRightAddon,
  Image,
  Checkbox,
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
  TextBox,
} from '../../components/ui';
import { colors, GeyserAssetDomainUrl } from '../../constants';
import GeyserTempImage from '../../assets/images/project-entry-thumbnail-placeholder.svg';
import { useAuthContext } from '../../context';
import { MUTATION_UPDATE_PROJECT } from '../../graphql/mutations';
import { IProject } from '../../interfaces';
import {
  useNotification,
  validateEmail,
  validLighteningAddress,
} from '../../utils';
import { TProjectDetails } from '../creation/projectCreate/types';
import { DateTime } from 'luxon';

export const ProjectSettings = ({ project }: { project: IProject }) => {
  const params = useParams<{ projectId: string }>();
  const isEdit = Boolean(params.projectId);

  const { toast } = useNotification();

  const { user } = useAuthContext();

  const [form, setForm] = useState<TProjectDetails>({
    title: '',
    description: '',
    image: '',
    email: '',
    name: '',
  });
  const [formError, setFormError] = useState<{ [key: string]: string }>({});
  const [selectedButton, setSelectedButton] = useState(
    project.expiresAt ? 'custom' : 'ongoing',
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    project.expiresAt
      ? DateTime.fromMillis(parseInt(project.expiresAt, 10)).toJSDate()
      : undefined,
  );
  const [finalDate, setFinalDate] = useState<string>();
  const [active, setActive] = useState(true);

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
        image: project.media[0],
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
        const sanitizedName = projectName.replaceAll(
          validLighteningAddress,
          '',
        );

        newForm.name = sanitizedName;
      }

      setForm(newForm);
      if (name === 'title' && value.length > 50) {
        setFormError({ title: `max character allowed is 50/${value.length}` });
      } else if (name === 'description' && value.length > 280) {
        setFormError({
          description: `max character allowed is 280/${value.length}`,
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

  const handleUpload = (url: string) => {
    setForm({ ...form, image: `${GeyserAssetDomainUrl}${url}` });
  };

  const handleDeactivate = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event) {
      setActive(event.target.checked);
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
            projectId: project.id,
            title: form.title,
            image: form.image,
            description: form.description,
            expiresAt: finalDate || null,
            active,
          },
        },
      });
    }
  };

  const validateForm = () => {
    const errors: any = {};
    let isValid = true;
    if (!form.title) {
      errors.title = 'title is a required field';
      isValid = false;
    } else if (form.title.length < 5 || form.title.length > 50) {
      errors.title = 'title should be between 5 and 50 characters';
      isValid = false;
    }

    if (!form.description) {
      errors.description = 'Project objective is a required field';
      isValid = false;
    }

    if (!form.email && !user.email) {
      errors.email = 'Email address is a required field.';
      isValid = false;
    } else if (!user.email && !validateEmail(form.email)) {
      errors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!isValid) {
      setFormError(errors);
    }

    return isValid;
  };

  return (
    <>
      <GridItem colSpan={8} display="flex" justifyContent="center">
        <VStack
          spacing="30px"
          width="100%"
          minWidth="350px"
          maxWidth="400px"
          marginBottom="40px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <VStack width="100%" alignItems="flex-start">
            <VStack width="100%" alignItems="flex-start">
              <Text>Project Title</Text>
              <TextBox
                name="title"
                onChange={handleChange}
                value={form.title}
                error={formError.title}
              />
            </VStack>
            <VStack width="100%" alignItems="flex-start">
              <Text>Lightening Address Preview</Text>
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
            </VStack>
            <VStack width="100%" alignItems="flex-start">
              <Text>Main Objective</Text>
              <TextArea
                name="description"
                value={form.description}
                onChange={handleChange}
                error={formError.description}
              />
            </VStack>

            <VStack width="100%" alignItems="flex-start">
              <Text>Project E-mail</Text>
              <TextBox
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
            <VStack width="100%" alignItems="flex-start">
              <Text>Deactivate</Text>
              <Checkbox
                checked={!active}
                onChange={handleDeactivate}
                colorScheme="red"
              >
                {' '}
                Deactivate Project
              </Checkbox>
              <Text fontSize="12px">
                Deactivating your project would not allow others to fund your
                project, but your project will still be visible to everyone
                else. You will be able to re-activate your project at any time.
              </Text>
            </VStack>
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
      <GridItem colSpan={5} display="flex" justifyContent="center">
        <VStack
          justifyContent="center"
          alignItems="flex-start"
          maxWidth="370px"
          spacing="10px"
        >
          <Text>Preview</Text>
          <Card padding="16px 10px" overflow="hidden" width="100%">
            {form.image ? (
              <ImageWithReload src={form.image} height="222px" width="350px" />
            ) : (
              <Image
                src={GeyserTempImage}
                maxHeight="500px"
                height="222px"
                width="350px"
              />
            )}
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
        </VStack>
      </GridItem>
    </>
  );
};
