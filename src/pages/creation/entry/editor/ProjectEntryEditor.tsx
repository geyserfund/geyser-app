import { Quill } from 'react-quill';
import React, { useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import 'react-quill/dist/quill.snow.css';
import { colors } from '../../../../constants';
import { fonts } from '../../../../constants/fonts';
import { useSignedUploadAPI } from '../../../../hooks';
import { useNotification } from '../../../../utils';
// @ts-ignore
import ImageUploader from 'quill-image-uploader';
import ImageEdit from 'quill-image-edit-module';

type Rules = string;

type StyleProps = {
  isReadOnly?: boolean;
  noPadding?: boolean;
};

const useStyles = createUseStyles<Rules, StyleProps>({
  container: ({ isReadOnly, noPadding }: StyleProps) => ({
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '350px',

    '& .ql-toolbar': {
      position: 'fixed',
      display: isReadOnly ? 'none' : 'block',
      bottom: '20px',
      float: 'center',
      zIndex: 99,
      background: 'white',
      borderRadius: '4px',
      borderWidth: '0px',
      boxShadow: '0px 3px 12px rgba(0, 0, 0, 0.1)',
    },

    '& .ql-container': {
      width: '100%',
      border: 'none',
      fontFamily: fonts.inter,
    },

    '& .ql-editor': {
      paddingBottom: '70px !important',
      paddingLeft: noPadding ? '0px !important' : undefined,
      paddingRight: noPadding ? '0px !important' : undefined,
      overflow: 'hidden',
    },

    '& .ql-editor li': {
      fontSize: '18px',
    },

    '& p': {
      fontFamily: fonts.inter,
      fontSize: '18px',
      lineHeight: 1.5,
    },

    '& h1': {
      fontFamily: fonts.inter,
      fontSize: '22px',
      fontWeight: '500px',
    },
    '& h2': {
      fontFamily: fonts.inter,
      fontSize: '28px',
      fontWeight: '500px',
    },
    '& img': {
      borderRadius: '4px',
      display: 'block',
      margin: 'auto',
    },
    '& .image-uploading': {
      display: 'block',
    },
    '& .ql-syntax': {
      backgroundColor: `${colors.bgGrey} !important`,
      color: `${colors.textGrey} !important`,
    },
    '& .ql-video': {
      width: '100%',
      height: '100%',
      maxHeight: '500px',
    },
    '& button.ql-active': {
      color: `${colors.primary} !important`,
    },
    '& button.ql-active .ql-stroke': {
      stroke: `${colors.primary} !important`,
    },
    '& button.ql-active .ql-fill': {
      fill: `${colors.primary} !important`,
    },
  }),
});

type Props = {
  name: string;
  value: string;
  handleChange?: (name: string, content: string) => void;
  isReadOnly?: boolean;
  focusFlag?: string;
  noPadding?: boolean;
};

const editorDOMID = 'editor';

export const ProjectEntryEditor = ({
  name,
  value,
  handleChange,
  isReadOnly,
  focusFlag,
  noPadding,
}: Props) => {
  const [_quillObj, _setQuillObj] = useState<Quill>();
  const quillObj = useRef(_quillObj);

  const setQuillObj = (value: Quill) => {
    quillObj.current = value;
    _setQuillObj(value);
  };

  const { toast } = useNotification();
  const classes = useStyles({ isReadOnly, noPadding });

  const editorModules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        ['link', 'image', 'video'],
      ],
    },
    imageUploader: {
      upload: async (file: any) => {
        try {
          const response = await useSignedUploadAPI(file);
          return response;
        } catch {
          toast({
            title: 'Something went wrong',
            description: 'Image upload failed, please try again.',
            status: 'error',
          });
          return false;
        }
      },
    },
    imageEdit: {
      modules: ['Resize', 'DisplaySize'],
      overlayStyles: {
        border: '2px solid',
        borderColor: colors.primary400,
        boxShadow: `0px 0px 0px 2px ${colors.primary400}`,
        borderRadius: '4px',
      },
      handleStyles: {
        backgroundColor: 'transparent',
        border: 'none',
      },
    },
  };

  useEffect(() => {
    Quill.register('modules/imageUploader', ImageUploader);
    Quill.register('modules/imageEdit', ImageEdit);

    const editor = new Quill(`#${editorDOMID}`, {
      modules: editorModules,
      readOnly: isReadOnly,
      theme: 'snow',
    });

    if (value) {
      const textValue = JSON.parse(value);

      editor.updateContents(textValue, 'api');
    }

    editor.on('text-change', (delta) => {
      const contents = quillObj.current?.getContents();

      if (
        delta &&
        delta.ops &&
        delta.ops[2] &&
        delta.ops[2].attributes &&
        delta.ops[2].attributes.imageBlot
      ) {
        return;
      }

      if (handleChange) {
        handleChange(name, JSON.stringify(contents));
      }
    });

    editor.keyboard.addBinding(
      {
        key: 'up',
      },
      function (range) {
        if (range.index === 0 && range.length === 0) {
          document.getElementById('entry-description-input')?.focus();
          return false;
        }

        return true;
      },
    );

    setQuillObj(editor);
  }, []);

  useEffect(() => {
    if (focusFlag) {
      quillObj.current?.focus();
    }
  }, [focusFlag]);

  return (
    <div className={classes.container}>
      <div id={editorDOMID}>
        <div id="drag-and-drop-container"></div>
      </div>
    </div>
  );
};
