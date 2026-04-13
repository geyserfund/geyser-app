import { Box } from '@chakra-ui/react'
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  InsertCodeBlock,
  InsertImage,
  InsertTable,
  ListsToggle,
  Separator,
  UndoRedo,
  useCellValue,
  viewMode$,
} from '@mdxeditor/editor'

import { MdxInsertTweetButton, MdxInsertVideoButton } from './MdxEditorEmbeds.tsx'
import { MdxEditorModeToggle } from './MdxEditorModeToggle.tsx'

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
          <Separator />
          <CreateLink />
          <InsertImage />
          <MdxInsertVideoButton />
          <MdxInsertTweetButton />
          <InsertTable />
          <InsertCodeBlock />
        </>
      )}

      <Box marginInlineStart="auto" display="flex">
        <MdxEditorModeToggle />
      </Box>
    </>
  )
}
