import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { DateTime } from 'luxon'
import { useTranslation } from 'react-i18next'

import { ProjectState } from '@/modules/project/state/projectAtom'
import { lightModeColors } from '@/shared/styles'

const styles = StyleSheet.create({
  page: {
    width: '600px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: lightModeColors.utils.pbg,
    padding: 20,
    gap: '20px',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: '8px',
    backgroundColor: lightModeColors.primary1[9],
    alignItems: 'center',
    padding: '10px',
    gap: '10px',
  },
  imageStyle: {
    height: '30px',
    width: 'auto',
  },
  exportDateContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  exportDate: {
    fontSize: '14px',
    color: lightModeColors.primary1[11],
    fontWeight: 500,
    textAlign: 'center',
  },
  title: {
    fontSize: '18px',
    color: lightModeColors.utils.text,
    fontWeight: 600,
  },
  normalText: {
    fontSize: '14px',
    color: lightModeColors.neutral1[11],
    fontWeight: 500,
  },
  noteContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
    gap: '10px',
  },
  noteInnerContainer: { display: 'flex', gap: '2px', flexDirection: 'row' },
  infoHeaderContainer: {
    width: '100%',
    backgroundColor: lightModeColors.neutral1[6],
    display: 'flex',
    flexDirection: 'row',
    borderTopRightRadius: '8px',
    borderTopLeftRadius: '8px',
    padding: '10px',
  },
  infoBox: {
    width: '100%',
    border: `2px solid ${lightModeColors.neutral1[6]}`,
    padding: '10px',
    gap: '5px',
  },
  infoBoxLast: {
    width: '100%',
    border: `2px solid ${lightModeColors.neutral1[6]}`,
    padding: '10px',
    gap: '5px',
    borderBottomRightRadius: '8px',
    borderBottomLeftRadius: '8px',
  },
  headerText: {
    fontSize: '16px',
    color: lightModeColors.utils.text,
    fontWeight: 700,
  },
})

export const ExportNostrKeysPDF = ({
  projectTitle,
  publicKey,
  privateKey,
}: {
  projectTitle: ProjectState['title']
  publicKey: string
  privateKey: string
}) => {
  const { t } = useTranslation()

  const date = DateTime.now().toFormat('dd/MM/yyyy')

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Image
            style={styles.imageStyle}
            src={'https://storage.googleapis.com/geyser-projects-media/app/geyser-padded-logo.png'}
          />
          <Text style={styles.title}>{t('Project Private Key Kit (nsec)')}</Text>
        </View>
        <View style={styles.exportDateContainer}>
          <Text style={styles.exportDate}>{`${t('Exported on')} ${date}`}</Text>
        </View>
        <View style={styles.noteContainer}>
          <Text style={styles.normalText}>
            {t(
              'If you get locked out of your project from Geyser you can access your project from any other Nostr client by using your Private Key, which has been backed up by Geyser for you.',
            )}
          </Text>
          <Text style={styles.normalText}>
            1. {t('Get your Private Key Kit off your computer and print out a copy')}
          </Text>
          <Text style={styles.normalText}>2. {t('Store it somewhere safe.')}</Text>
        </View>

        <View>
          <View style={styles.infoHeaderContainer}>
            <Text style={styles.headerText}>{t('Nostr Private Key information')}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.headerText}>{t('Title')}</Text>
            <Text style={styles.normalText}>{projectTitle}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.headerText}>{t('Public Key')}</Text>
            <Text style={styles.normalText}>{publicKey}</Text>
          </View>
          <View style={styles.infoBoxLast}>
            <Text style={styles.headerText}>{t('Private Key')}</Text>
            <Text style={styles.normalText}>{privateKey}</Text>
          </View>
        </View>

        <View style={styles.noteContainer}>
          <Text style={styles.normalText}>{t('Be aware of the following:')}</Text>
          <View style={styles.noteInnerContainer}>
            <Text style={styles.normalText}>-</Text>
            <Text style={styles.normalText}>
              {t(
                'If you lose or leak your private keys your project risks being compromised, and there is nothing Geyser can do about this.',
              )}
            </Text>
          </View>
          <View style={styles.noteInnerContainer}>
            <Text style={styles.normalText}>-</Text>
            <Text style={styles.normalText}>
              {t(
                "Geyser takes custody of your private keys, therefore we don't recommend using these private keys for the non-custodial Nostr experience.",
              )}
            </Text>
          </View>
          <View style={styles.noteInnerContainer}>
            <Text style={styles.normalText}>-</Text>
            <Text style={styles.normalText}>
              {t(
                'Not all Geyser features are built on Nostr yet, therefore not all content you create on Geyser will interoperate with the rest of the Nostr Network.',
              )}
            </Text>
          </View>
          <View style={styles.noteInnerContainer}>
            <Text style={styles.normalText}>-</Text>
            <Text style={styles.normalText}>
              {t(
                'If you change your Geyser lightning address from other clients Geyser has no way to verify the Zaps being made from other clients, therefore, these Zaps won’t show up on Geyser.',
              )}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
