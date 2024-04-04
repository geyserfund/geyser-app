export interface TableTextProps {
  content: string
}

export const TableText = ({ content }: TableTextProps) => {
  return <p>{content}</p>
}
