import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  DiffSourceToggleWrapper,
  InsertCodeBlock,
  InsertImage,
  InsertTable,
  ListsToggle,
  Separator,
  UndoRedo,
} from '@mdxeditor/editor'

import { MdxInsertTweetButton, MdxInsertVideoButton } from './MdxEditorEmbeds.tsx'

/** Shared, project-wide MDX toolbar with a unified top-sticky control layout. */
export const MdxEditorToolbar = () => {
  return (
    <DiffSourceToggleWrapper options={['rich-text', 'source']}>
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
    </DiffSourceToggleWrapper>
  )
}
