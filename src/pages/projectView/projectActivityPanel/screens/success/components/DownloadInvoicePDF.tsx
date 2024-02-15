import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'

import { neutralColorsLight, primaryColorsLight } from '../../../../../../styles'
import { FundingTx, Project } from '../../../../../../types'

const styles = StyleSheet.create({
  page: {
    width: '600px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: neutralColorsLight[0],
    padding: 20,
    gap: '10px',
  },
  headerText: {
    fontSize: '35px',
    color: neutralColorsLight[900],
    fontWeight: 700,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowTitle: {
    fontSize: '16px',
    color: neutralColorsLight[900],
    fontWeight: 700,
  },
  rowContent: {
    fontSize: '14px',
    color: neutralColorsLight[600],
    fontWeight: 400,
  },
  inline: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tableView: {
    marginTop: '45px',
  },
  tableHeader: {
    backgroundColor: neutralColorsLight[100],
    borderBottom: `1px solid ${neutralColorsLight[400]}`,
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    padding: '10px',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  },
  tableRow: {
    borderBottom: `1px solid ${neutralColorsLight[400]}`,
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    padding: '10px',
  },
  tableType: {
    width: '92px',
  },
  tableName: {
    display: 'flex',
    flex: 1,
  },
  tableQuantity: {
    width: '104px',
  },
  tableAmount: {
    width: '104px',
  },
  tableBoldFont: {
    fontSize: '14px',
    color: neutralColorsLight[900],
    fontWeight: 500,
  },
  tableRegularFont: {
    fontSize: '14px',
    color: neutralColorsLight[600],
    fontWeight: 400,
  },
  geyserFeeRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '25px',
    padding: '0 10px',
  },
  geyserFeeFixed: {
    width: '104px',
  },
  invoiceTotalRow: {
    backgroundColor: primaryColorsLight[400],
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '25px',
    padding: '10px',
    borderRadius: '8px',
  },
  invoiceTotalTitle: {
    fontSize: '18px',
    color: neutralColorsLight[900],
    fontWeight: 600,
  },
  invoiceTotalPrice: {
    fontSize: '16px',
    color: neutralColorsLight[900],
    fontWeight: 500,
  },
  satsFont: {
    fontSize: '12px',
    color: neutralColorsLight[600],
    fontWeight: 400,
  },
})

export const DownloadInvoicePDF = ({
  invoiceData,
  projectData,
  showFee,
}: {
  invoiceData: FundingTx
  projectData: Project
  showFee?: false
}) => {
  const datePaid = new Date(invoiceData.paidAt)
  const datePaidMonth = datePaid.toLocaleString('default', { month: 'long' })
  const datePaidDay = datePaid.getDate().toString().padStart(2, '0')
  const totalAmountInSats = invoiceData.donationAmount + (invoiceData.order ? invoiceData.order.totalInSats : 0)
  const bitcoinQuote = invoiceData?.bitcoinQuote?.quote || 0

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.headerText}>Invoice</Text>
        {invoiceData.uuid && (
          <View style={styles.row}>
            <Text style={styles.rowTitle}>Reference Code:</Text>
            <Text style={styles.rowContent}>{invoiceData.uuid}</Text>
          </View>
        )}
        <View style={styles.row}>
          <Text style={styles.rowTitle}>Date:</Text>
          <Text style={styles.rowContent}>{`${datePaidMonth} ${datePaidDay}`}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowTitle}>Project Funded:</Text>
          <Text style={styles.rowContent}>{projectData.title}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowTitle}>Funding as:</Text>
          <Text style={styles.rowContent}>
            {invoiceData.funder.user ? invoiceData.funder.user.username : 'Anonymous'}
          </Text>
        </View>
        <View style={styles.tableView}>
          <View style={styles.tableHeader}>
            <View style={styles.tableType}>
              <Text style={styles.tableBoldFont}>Type</Text>
            </View>
            <View style={styles.tableName}>
              <Text style={styles.tableBoldFont}>Name</Text>
            </View>
            <View style={styles.tableQuantity}>
              <Text style={styles.tableBoldFont}>Quantity</Text>
            </View>
            <View style={styles.tableAmount}>
              <Text style={styles.tableBoldFont}>Amount</Text>
            </View>
          </View>
          {invoiceData.donationAmount > 0 && (
            <View style={styles.tableRow}>
              <View style={styles.tableType}>
                <Text style={styles.tableRegularFont}>Donation</Text>
              </View>
              <View style={styles.tableName}>
                <Text style={styles.tableRegularFont}>-</Text>
              </View>
              <View style={styles.tableQuantity}>
                <Text style={styles.tableRegularFont}>-</Text>
              </View>
              <View style={styles.tableAmount}>
                <Text style={styles.tableRegularFont}>{invoiceData.donationAmount.toLocaleString()} sats</Text>
              </View>
            </View>
          )}
          {invoiceData.order &&
            invoiceData.order.items.length > 0 &&
            invoiceData.order.items.map((item, i) => (
              <View style={styles.tableRow} key={i}>
                <View style={styles.tableType}>
                  <Text style={styles.tableRegularFont}>Reward</Text>
                </View>
                <View style={styles.tableName}>
                  <Text style={styles.tableRegularFont}>{item.item.name}</Text>
                </View>
                <View style={styles.tableQuantity}>
                  <Text style={styles.tableRegularFont}>{item.quantity}</Text>
                </View>
                <View style={styles.tableAmount}>
                  <Text style={styles.tableRegularFont}>{item.unitPriceInSats.toLocaleString()} sats</Text>
                </View>
              </View>
            ))}
        </View>
        {showFee && (
          <View style={styles.geyserFeeRow}>
            <Text style={styles.tableRegularFont}>Geyser fee:</Text>
            <View style={styles.geyserFeeFixed}>
              <Text style={styles.tableRegularFont}>
                {Math.round(totalAmountInSats * 0.02).toLocaleString()} sats (2%)
              </Text>
            </View>
          </View>
        )}
        <View style={styles.invoiceTotalRow}>
          <Text style={styles.invoiceTotalTitle}>Amount</Text>
          <Text style={styles.invoiceTotalPrice}>
            {totalAmountInSats.toLocaleString()} sats{' '}
            {bitcoinQuote ? `($${((bitcoinQuote / 100000000) * totalAmountInSats).toFixed(2)})` : ''}
          </Text>
        </View>
      </Page>
    </Document>
  )
}
