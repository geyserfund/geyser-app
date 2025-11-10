/* eslint-disable complexity */
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { DateTime } from 'luxon'

import { ProjectState } from '@/modules/project/state/projectAtom'
import { lightModeColors, utilColors } from '@/shared/styles'
import {
  ContributionForDownloadInvoiceFragment,
  FeeCurrency,
  PaymentFeePayer,
  PaymentStatus,
  ProjectOwnerUserForInvoiceFragment,
} from '@/types/index.ts'
import { convertSatsToUsdFormatted, convertUsdCentsToSatsFormatted } from '@/utils/index.ts'

const styles = StyleSheet.create({
  page: {
    width: '600px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: utilColors.light.pbg,
    padding: 20,
    gap: '10px',
  },
  headerText: {
    fontSize: '35px',
    color: utilColors.light.text,
    fontWeight: 700,
  },
  subHeaderText: {
    fontSize: '20px',
    color: utilColors.light.text,
    fontWeight: 500,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  rowItem: {
    flex: 1,
    display: 'flex',
    gap: '5px',
    flexDirection: 'column',
  },
  rowItem2: {
    flex: 2,
    display: 'flex',
    gap: '5px',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '5px',
  },
  rowTitle: {
    fontSize: '12px',
    color: utilColors.light.text,
    fontWeight: 700,
  },
  rowContent: {
    fontSize: '12px',
    color: lightModeColors.neutral1[11],
    fontWeight: 400,
    textWrap: 'wrap',
  },
  inline: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tableView: {
    marginTop: '20px',
  },
  tableHeader: {
    marginTop: '10px',
    backgroundColor: lightModeColors.neutral1[3],
    borderBottom: `1px solid ${lightModeColors.neutral1[6]}`,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '10px',
    padding: '10px',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  },
  tableRow: {
    borderBottom: `1px solid ${lightModeColors.neutral1[6]}`,
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
    color: utilColors.light.text,
    fontWeight: 500,
  },
  tableRegularFont: {
    fontSize: '14px',
    color: lightModeColors.neutral1[11],
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
    backgroundColor: lightModeColors.primary1[9],
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '5px',
    padding: '10px',
    borderRadius: '8px',
  },
  invoiceTotalTitle: {
    fontSize: '18px',
    color: utilColors.light.text,
    fontWeight: 600,
  },
  invoiceTotalPrice: {
    fontSize: '16px',
    color: utilColors.light.text,
    fontWeight: 500,
  },
  satsFont: {
    fontSize: '12px',
    color: lightModeColors.neutral1[11],
    fontWeight: 400,
  },
})

export const DownloadInvoicePDF = ({
  invoiceData,
  projectData,
  showFee,
  ownerUser,
}: {
  invoiceData: ContributionForDownloadInvoiceFragment
  projectData: Pick<ProjectState, 'title'>
  showFee?: boolean
  ownerUser?: ProjectOwnerUserForInvoiceFragment
}) => {
  const datePaid = invoiceData.confirmedAt ? DateTime.fromMillis(invoiceData.confirmedAt).toFormat('LLLL d') : ''
  const bitcoinQuote = invoiceData?.bitcoinQuote?.quote || 0

  const { user } = invoiceData.funder
  const creator = invoiceData.creatorTaxProfile

  const paidPayment = invoiceData.payments.find((payment) => payment.status === PaymentStatus.Paid)

  const fees =
    paidPayment?.fees.reduce((acc, fee) => {
      if (fee.feePayer === PaymentFeePayer.Contributor) {
        return acc + fee.feeAmount
      }

      return acc
    }, 0) || 0

  const totalAmountInSats = invoiceData.donationAmount + (invoiceData.order ? invoiceData.order.totalInSats : 0) + fees
  console.log(paidPayment)
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.headerText}>Invoice</Text>
        <View style={styles.rowContainer}>
          <View style={styles.rowItem}>
            <Text style={styles.subHeaderText}>Payer</Text>
            <InvoiceListItem title="Name" value={user?.taxProfile ? user.taxProfile?.fullName || user.username : ''} />
            <InvoiceListItem title="Email" value={invoiceData.funder.user ? `${invoiceData.funder.user.email}` : ''} />
            <InvoiceListItem title="TaxId" value={user?.taxProfile?.taxId ? user.taxProfile?.taxId || '' : ''} />
            <InvoiceListItem title="Date" value={datePaid ? datePaid || '' : ''} />
          </View>
          <View style={styles.rowItem2}>
            <Text style={styles.subHeaderText}>Payee</Text>
            <InvoiceListItem title="Project Name" value={projectData.title || ''} />
            <InvoiceListItem title="Name" value={creator?.fullName || ownerUser?.username || ''} />
            <InvoiceListItem title="Email" value={invoiceData.creatorEmail || ''} />
            <InvoiceListItem title="TaxId" value={creator?.taxId ? creator.taxId : ''} />
            {ownerUser?.complianceDetails.verifiedDetails.identity?.verified && (
              <InvoiceListItem title="Identify verified" value={'Sumsub has verified the identity of this creator.'} />
            )}
          </View>
        </View>

        <View style={styles.tableView}>
          <Text style={styles.subHeaderText}>Contribution</Text>
          <InvoiceListItem title="Reference code: " value={invoiceData.uuid || ''} />
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

        <View style={styles.invoiceTotalRow}>
          <Text style={styles.invoiceTotalTitle}>Total Amount</Text>
          <Text style={styles.invoiceTotalPrice}>
            {totalAmountInSats.toLocaleString()} sats{' '}
            {bitcoinQuote ? `($${((bitcoinQuote / 100000000) * totalAmountInSats).toFixed(2)})` : ''}
          </Text>
        </View>
        {paidPayment?.fees.length && paidPayment?.fees.length > 0 && (
          <View style={styles.tableView}>
            <Text style={styles.subHeaderText}>Fees:</Text>
            {paidPayment?.fees.map((fee) => {
              return (
                <InvoiceFiatFees
                  key={fee.feeType}
                  label={fee.description || fee.feeType || ''}
                  value={
                    fee.feeCurrency === FeeCurrency.Btcsat
                      ? `${fee.feeAmount} sats ( ${convertSatsToUsdFormatted({
                          sats: fee.feeAmount,
                          bitcoinQuote: invoiceData?.bitcoinQuote,
                        })})`
                      : `$${fee.feeAmount} (${convertUsdCentsToSatsFormatted({
                          usdCents: fee.feeAmount,
                          bitcoinQuote: invoiceData?.bitcoinQuote,
                        })})`
                  }
                />
              )
            })}
          </View>
        )}
      </Page>
    </Document>
  )
}

export const InvoiceListItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.rowTitle}>{title}:</Text>
      <Text style={styles.rowContent}>{value}</Text>
    </View>
  )
}

export const InvoiceFiatFees = ({ label, value }: { label: string; value: string }) => {
  return (
    <View style={styles.geyserFeeRow}>
      <Text style={styles.tableRegularFont}>{label}:</Text>
      <View style={styles.geyserFeeFixed}>
        <Text style={styles.tableRegularFont}>{value}</Text>
      </View>
    </View>
  )
}
