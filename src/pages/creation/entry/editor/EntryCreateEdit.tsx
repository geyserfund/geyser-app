import React, { useEffect, useRef, useState } from 'react';
import { Box, HStack, Input, Text, VStack } from '@chakra-ui/react';

// import { Editor } from './Editor';
import { isMobileMode, useNotification } from '../../../../utils';
import { CreateNav } from './CreateNav';
import { BsImage } from 'react-icons/bs';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  MUTATION_CREATE_ENTRY,
  MUTATION_UPDATE_ENTRY,
} from '../../../../graphql/mutations/entries';
import {
  IEntryCreateInput,
  IEntryUpdateInput,
} from '../../../../interfaces/entry';
import { TcreateEntry, TEntry } from '../types';
import { useDebounce } from '../../../../hooks';
import { useHistory, useParams } from 'react-router';
import { QUERY_GET_ENTRY } from '../../../../graphql/queries/entries';
import { FileUpload } from '../../../../components/molecules';
import { createUseStyles } from 'react-jss';
import { colors, GeyserAssetDomainUrl } from '../../../../constants';
import { ImageWithReload } from '../../../../components/ui';
import { Editor } from './Editor';
import Loader from '../../../../components/ui/Loader';
import { QUERY_PROJECT_BY_NAME } from '../../../../graphql';
import { useAuthContext } from '../../../../context';

const useStyles = createUseStyles({
  uploadContainer: {
    width: '100%',
    minHeight: '65px',
    borderRadius: '4px',
    backgroundColor: colors.bgGrey,
    justifyContent: 'center',
    transition: 'background-color 0.5s ease',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: colors.gray300,
      transition: 'background-color 0.5s ease',
    },
  },
});

export const defaultEntry = {
  id: 0,
  title: '',
  description: '',
  image: '',
  content: '',
  published: false,
  type: 'article',
};

export const EntryCreateEdit = () => {
  const isMobile = isMobileMode();
  const { toast } = useNotification();
  const history = useHistory();
  const params = useParams<{ entryId: string; projectId: string }>();
  const { setNavTitle } = useAuthContext();

  const classes = useStyles();

  const [_form, _setForm] = useState<TEntry>(defaultEntry);
  const form = useRef(_form);
  const setForm = (value: TEntry) => {
    form.current = value;
    _setForm(value);
  };

  const debouncedUpdateEntry = useDebounce(form.current, 1000);

  const [createPost, { data: createData, loading: createPostLoading }] =
    useMutation(MUTATION_CREATE_ENTRY);

  const [updatePost, { data: updateData, loading: updatePostLoading }] =
    useMutation(MUTATION_UPDATE_ENTRY);

  const [getPost, { loading: loadingPosts, error, data: entryData }] =
    useLazyQuery(QUERY_GET_ENTRY);

  const { loading, data: projectData } = useQuery(QUERY_PROJECT_BY_NAME, {
    variables: { where: { name: params.projectId } },
    onCompleted(data) {
      setNavTitle(data.project.title);
    },
    onError() {
      history.push('/404');
    },
  });

  useEffect(() => {
    if (params && params.entryId) {
      try {
        getPost({ variables: { id: parseInt(params.entryId, 10) } });
      } catch (error) {
        history.push('/404');
      }
    }
  }, [params]);

  useEffect(() => {
    if (entryData && entryData.entry) {
      console.log('checking entry Data', entryData);
      setForm(entryData.entry);
    }
  }, [entryData]);

  useEffect(() => {
    if (createData && createData.createEntry) {
      console.log('checking createdata Data', createData.createEntry);
      setForm(createData.createEntry);
    }
  }, [createData]);

  useEffect(() => {
    if (debouncedUpdateEntry && debouncedUpdateEntry.id) {
      handleUpdateEntry(debouncedUpdateEntry);
    }
  }, [debouncedUpdateEntry]);

  const handleCreateEntry = async (value: TcreateEntry) => {
    if (!form.current || !form.current.id) {
      if (
        form.current.content ||
        form.current.title ||
        form.current.description ||
        form.current.image
      ) {
        const { image, title, description, content } = value;
        const input: IEntryCreateInput = {
          projectId: projectData && projectData.project.id,
          type: 'article',
          title,
          description,
          content,
          image,
        };
        try {
          await createPost({ variables: { input } });
        } catch (error) {
          toast({
            title: 'Post creation failed',
            description: 'Please try again later',
            status: 'error',
          });
        }
      }
    }
  };

  const handleUpdateEntry = async (params: TcreateEntry) => {
    const { image, title, description, content } = params;
    if (form) {
      const input: IEntryUpdateInput = {
        entryId: form.current.id,
        title,
        description,
        content,
        image,
      };
      try {
        await updatePost({ variables: { input } });
      } catch (error) {
        toast({
          title: 'Post update failed',
          description: 'Please try again later',
          status: 'error',
        });
      }
    }
  };

  const handleContentUpdate = (name: string, value: string) => {
    const newForm = { ...form.current, [name]: value };
    console.log('checking handleContent update Data', newForm);
    setForm(newForm);
    handleCreateEntry(newForm);
  };

  const handleInput = (event: any) => {
    const { name, value } = event.target;
    if (name) {
      const newForm = { ...form.current, [name]: value };
      console.log('checking handleContent handleInput Data', newForm);
      setForm(newForm);
      handleCreateEntry(newForm);
    }
  };

  const onSave = () => {
    handleUpdateEntry(form.current);
  };

  const onPreview = () => {
    if (form.current && form.current.id) {
      history.push(
        `/projects/${params.projectId}/entry/${form.current.id}/preview`,
      );
    } else {
      toast({
        title: 'Cannot preview',
        description: 'Please edit your content before preview',
        status: 'info',
      });
    }
  };

  const onImageUpload = (url: string) => {
    setForm({ ...form.current, image: `${GeyserAssetDomainUrl}${url}` });
  };

  if (params.entryId && !form.current.id) {
    return <Loader />;
  }

  const isEdit =
    Boolean(createData?.createEntry?.id) || Boolean(params.entryId);

  return (
    <>
      <CreateNav
        isSaving={createPostLoading || updatePostLoading}
        saveText={
          createPostLoading || updatePostLoading
            ? 'Saving'
            : isEdit
            ? 'Saved'
            : 'Save draft'
        }
        onSave={onSave}
        onPreview={onPreview}
      />
      <VStack
        background={'brand.bgGrey4'}
        position="relative"
        paddingTop={isMobile ? '61px' : '71px'}
        height="100%"
        justifyContent="space-between"
      >
        <Box
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
          overflowY="auto"
        >
          <VStack
            spacing="20px"
            width="100%"
            height="100%"
            maxWidth="1080px"
            padding={isMobile ? '0px 10px' : '0px 40px'}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            paddingBottom="80px"
          >
            <Box marginTop="20px" width="100%">
              <FileUpload onUploadComplete={onImageUpload}>
                <>
                  {form.current.image ? (
                    <HStack justifyContent="center" maxHeight="500px">
                      <ImageWithReload src={form.current.image} />
                    </HStack>
                  ) : (
                    <HStack className={classes.uploadContainer}>
                      <BsImage />
                      <Text> Select a header image</Text>
                    </HStack>
                  )}
                </>
              </FileUpload>
            </Box>
            <Input
              border="none"
              _focus={{ border: 'none' }}
              placeholder="Title"
              color="brand.gray500"
              fontSize="40px"
              fontWeight={700}
              marginTop="20px"
              name="title"
              value={form.current.title}
              onChange={handleInput}
            />
            <Input
              border="none"
              _focus={{ border: 'none' }}
              placeholder="Summary of your project idea"
              color="brand.gray500"
              fontSize="26px"
              fontWeight={600}
              name="description"
              value={form.current.description}
              onChange={handleInput}
            />

            <Box flex={1} width="100%">
              <Editor
                name="content"
                handleChange={handleContentUpdate}
                value={form.current.content}
              />
            </Box>
          </VStack>
        </Box>
      </VStack>
    </>
  );
};
