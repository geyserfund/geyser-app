import 'react-quill/dist/quill.snow.css'

import { DeltaStatic } from 'quill'
import ImageEdit from 'quill-image-edit-module'
// @ts-ignore
import ImageUploader from 'quill-image-uploader'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { Quill } from 'react-quill'

import { AppTheme } from '../../../../../../../context'
import { ID } from '../../../../../../../shared/constants'
import { getSignedUploadAPI } from '../../../../../../../shared/hooks'
import { fonts } from '../../../../../../../styles'
import { useCustomTheme, useMobileMode, useNotification } from '../../../../../../../utils'

type Rules = string

type StyleProps = {
  isReadOnly?: boolean
  noPadding?: boolean
  isMobile?: boolean
}

const useStyles = createUseStyles<Rules, StyleProps, AppTheme>(({ colors, colorMode }) => ({
  container: ({ isReadOnly, noPadding, isMobile }: StyleProps) => ({
    width: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    '& .ql-toolbar': {
      position: 'fixed',
      display: isReadOnly ? 'none' : 'flex',
      bottom: '20px',
      float: 'center',
      zIndex: 99,
      background: colors.utils.pbg,
      borderRadius: '4px',
      border: '1px solid',
      borderColor: colors.neutral1[6],

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
      fontFamily: fonts.brand,
    },
    '& .ql-container.ql-snow': {
      border: 'none',
    },
    '& .ql-editor': {
      paddingBottom: '70px !important',
      paddingLeft: noPadding ? '0px !important' : undefined,
      paddingRight: noPadding ? '0px !important' : undefined,
      paddingTop: '0px !important',
      overflow: 'hidden',
      '&.ql-blank': {
        '&:before': {
          fontFamily: fonts.brand,
          fontSize: '16px',
          lineHeight: 1.5,
          fontStyle: 'normal',
          color: colorMode === 'light' ? 'var(--chakra-colors-gray-500)' : 'var(--chakra-colors-whiteAlpha-400)',
        },
      },
    },

    '& .ql-editor li': {
      fontSize: '16px',
    },

    '& p': {
      fontFamily: fonts.brand,
      fontSize: '16px',
      lineHeight: 1.5,
    },

    '& h1': {
      fontFamily: fonts.brand,
      fontSize: '28px',
      fontWeight: '500px',
    },
    '& h2': {
      fontFamily: fonts.brand,
      fontSize: '22px',
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
      backgroundColor: `${colors.neutral1[2]} !important`,
      color: `${colors.neutral1[8]} !important`,
    },
    '& .ql-video': {
      width: '100%',
      height: '40vw',
      maxHeight: '500px',
    },
    '& button.ql-active': {
      color: `${colors.primary1[9]} !important`,
    },
    '& button.ql-active .ql-stroke': {
      stroke: `${colors.primary1[9]} !important`,
    },
    '& button.ql-active .ql-fill': {
      fill: `${colors.primary1[9]} !important`,
    },
  }),
}))

type Props = {
  name: string
  value: string
  handleChange?: (name: any, content: string) => void
  isReadOnly?: boolean
  focusFlag?: string
  noPadding?: boolean
  placeholder?: string
}

const editorDOMID = 'editor'

type QuillType = InstanceType<typeof Quill>

export const ProjectEntryEditor = ({
  name,
  value,
  handleChange,
  isReadOnly,
  placeholder,
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

  const toast = useNotification()
  const classes = useStyles({ isReadOnly, noPadding, isMobile })
  const { colors } = useCustomTheme()

  const editorModules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image', 'video'],
      ],
    },
    imageUploader: {
      async upload(file: any) {
        try {
          const response = await getSignedUploadAPI(file)
          return response
        } catch {
          toast.error({
            title: 'Something went wrong',
            description: 'Image upload failed, please try again.',
          })
          return false
        }
      },
    },
    imageEdit: {
      modules: ['Resize', 'DisplaySize'],
      overlayStyles: {
        border: '2px solid',
        borderColor: colors.primary1[9],
        boxShadow: `0px 0px 0px 2px ${colors.primary1[9]}`,
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
      placeholder,
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

      if (delta && delta.ops && delta.ops[2] && delta.ops[2].attributes && delta.ops[2].attributes.imageBlot) {
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
