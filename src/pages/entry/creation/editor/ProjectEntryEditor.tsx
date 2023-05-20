import 'react-quill/dist/quill.snow.css'

import { DeltaStatic } from 'quill'
import ImageEdit from 'quill-image-edit-module'
// @ts-ignore
import ImageUploader from 'quill-image-uploader'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { Quill } from 'react-quill'

import { ID } from '../../../../constants'
import { getSignedUploadAPI } from '../../../../hooks'
import { colors, fonts } from '../../../../styles'
import { useMobileMode, useNotification } from '../../../../utils'

type Rules = string

type StyleProps = {
  isReadOnly?: boolean
  noPadding?: boolean
  isMobile?: boolean
}

const useStyles = createUseStyles<Rules, StyleProps>({
  container: ({ isReadOnly, noPadding, isMobile }: StyleProps) => ({
    width: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '350px',
    '& .ql-toolbar': {
      position: 'fixed',
      display: isReadOnly ? 'none' : 'flex',
      bottom: '20px',
      float: 'center',
      zIndex: 99,
      background: 'neutral.0',
      borderRadius: '4px',
      borderWidth: '0px',
      boxShadow: '0px 3px 12px rgba(0, 0, 0, 0.1)',
      flexDirection: 'row',
      justifyContent: 'center',
      maxWidth: '100%',
      overflowX: 'auto',
      '& .ql-formats': {
        display: 'flex',
        margin: isMobile ? '0px' : '0px 10px',
      },
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
      '&.ql-blank': {
        '&:before': {
          fontFamily: fonts.inter,
          fontSize: '18px',
          lineHeight: 1.5,
          fontStyle: 'normal',
          color: colors.grayPlaceholder,
        },
      },
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
      height: '40vw',
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
})

type Props = {
  name: string
  value: string
  handleChange?: (name: string, content: string) => void
  isReadOnly?: boolean
  focusFlag?: string
  noPadding?: boolean
}

const editorDOMID = 'editor'

type QuillType = InstanceType<typeof Quill>

export const ProjectEntryEditor = ({
  name,
  value,
  handleChange,
  isReadOnly,
  focusFlag,
  noPadding,
}: Props) => {
  const isMobile = useMobileMode()

  const [_quillObj, _setQuillObj] = useState<QuillType>()
  const quillObj = useRef(_quillObj)

  const setQuillObj = (value: QuillType) => {
    quillObj.current = value
    _setQuillObj(value)
  }

  const { toast } = useNotification()
  const classes = useStyles({ isReadOnly, noPadding, isMobile })

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
      async upload(file: any) {
        try {
          const response = await getSignedUploadAPI(file)
          return response
        } catch {
          toast({
            title: 'Something went wrong',
            description: 'Image upload failed, please try again.',
            status: 'error',
          })
          return false
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
  }

  useEffect(() => {
    Quill.register('modules/imageUploader', ImageUploader)
    Quill.register('modules/imageEdit', ImageEdit)

    const editor = new Quill(`#${editorDOMID}`, {
      modules: editorModules,
      readOnly: isReadOnly,
      theme: 'snow',
      placeholder: 'The description of the entry .....',
      scrollingContainer: `#${ID.entry.editEntryScrollContainer}`,
    })

    if (value) {
      const textValue = JSON.parse(value)

      editor.setContents(textValue, 'api')
    }

    editor.keyboard.addBinding(
      {
        key: 'up',
      },
      function (range) {
        if (range.index === 0 && range.length === 0) {
          document.getElementById('entry-description-input')?.focus()
          return false
        }

        return true
      },
    )

    setQuillObj(editor)
  }, [])

  const handleQueryChange = useCallback(
    (delta: DeltaStatic) => {
      const contents = quillObj.current?.getContents()

      if (
        delta &&
        delta.ops &&
        delta.ops[2] &&
        delta.ops[2].attributes &&
        delta.ops[2].attributes.imageBlot
      ) {
        return
      }

      if (handleChange) {
        handleChange(name, JSON.stringify(contents))
      }
    },
    [handleChange],
  )

  useEffect(() => {
    quillObj.current?.on('text-change', handleQueryChange)

    return () => {
      quillObj.current?.off('text-change', handleQueryChange)
    }
  }, [handleChange, quillObj])

  useEffect(() => {
    if (focusFlag) {
      quillObj.current?.focus()
    }
  }, [focusFlag])

  return (
    <div className={classes.container}>
      <div id={editorDOMID}>
        <div id="drag-and-drop-container"></div>
      </div>
    </div>
  )
}
