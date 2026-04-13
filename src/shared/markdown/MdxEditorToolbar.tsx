import { Box } from '@chakra-ui/react'
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  InsertCodeBlock,
  InsertImage,
  ListsToggle,
  Separator,
  UndoRedo,
  useCellValue,
  viewMode$,
} from '@mdxeditor/editor'

import { MdxInsertTweetButton, MdxInsertVideoButton } from './MdxEditorEmbeds.tsx'
import { MdxEditorModeToggle } from './MdxEditorModeToggle.tsx'
import { MdxInsertTableButton, MdxTextAlignmentButtons } from './MdxEditorTableControls.tsx'

/** Shared, project-wide MDX toolbar with a unified top-sticky control layout. */
export const MdxEditorToolbar = () => {
  const viewMode = useCellValue(viewMode$)
  const isRichTextMode = viewMode === 'rich-text'

  return (
    <>
      {isRichTextMode && (
        <>
          <UndoRedo />
          <Separator />
          <BoldItalicUnderlineToggles />
          <CodeToggle />
          <Separator />
          <ListsToggle options={['bullet', 'number']} />
          <BlockTypeSelect />
          <MdxTextAlignmentButtons />
          <Separator />
          <CreateLink />
          <InsertImage />
          <MdxInsertVideoButton />
          <MdxInsertTweetButton />
          <MdxInsertTableButton />
          <InsertCodeBlock />
        </>
      )}

      <Box marginInlineStart="auto" display="flex">
        <MdxEditorModeToggle />
      </Box>
    </>
  )
}
