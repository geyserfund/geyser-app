import {
  ButtonWithTooltip,
  editorInTable$,
  insertTable$,
  readOnly$,
  useCellValue,
  usePublisher,
} from '@mdxeditor/editor'
import { t } from 'i18next'
import { PiTable } from 'react-icons/pi'

const DEFAULT_TABLE_ROW_COUNT = 3
const DEFAULT_TABLE_COLUMN_COUNT = 3

/** Table insertion button that inserts a default-size table. */
export const MdxInsertTableButton = () => {
  const insertTable = usePublisher(insertTable$)
  const isReadOnly = useCellValue(readOnly$)
  const isInTable = useCellValue(editorInTable$)

  const isDisabled = isReadOnly || isInTable
  const handleInsertTable = () => {
    insertTable({
      rows: DEFAULT_TABLE_ROW_COUNT,
      columns: DEFAULT_TABLE_COLUMN_COUNT,
    })
  }

  return (
    <ButtonWithTooltip
      title={t('Insert table')}
      aria-label={t('Insert table')}
      disabled={isDisabled}
      onClick={handleInsertTable}
    >
      <PiTable size={16} />
    </ButtonWithTooltip>
  )
}
