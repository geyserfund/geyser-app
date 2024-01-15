import { ReactElement } from "react";

export const DownloadInvoice = ({
    orderId,
    content
  }: {
    orderId?: Number | null
    content?: ReactElement
  }) => {

  if (!orderId) {
    return null
  }

  return (
    <div onClick={() => {
        // retrive the order Id
        alert('retrive the orderId');
    }}>
        {content}
    </div>
  )
}
