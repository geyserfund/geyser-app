export const validateTLSCertificate = (cert: string): { isValid: boolean; formattedCert: string; error?: string } => {
  if (!cert.trim()) {
    return { isValid: false, formattedCert: '', error: 'TLS certificate is required' }
  }

  // Helper function to safely encode string to base64
  const safeBase64Encode = (str: string) => {
    try {
      // Convert string to UTF-8 bytes, then to base64
      return btoa(unescape(encodeURIComponent(str)))
    } catch (error) {
      console.error('Base64 encoding error:', error)
      throw new Error('Failed to encode certificate')
    }
  }

  try {
    // Case 1: Raw certificate starting with MII
    if (cert.startsWith('MII')) {
      const wrapped = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----`
      return { isValid: true, formattedCert: safeBase64Encode(wrapped) }
    }

    // Case 2: Already base64 encoded (starts with LS0tLS1CRUd)
    if (cert.startsWith('LS0tLS1CRUd')) {
      // Attempt to decode and verify it's a valid certificate
      try {
        const decoded = atob(cert)
        if (!decoded.includes('-----BEGIN CERTIFICATE-----') || !decoded.includes('-----END CERTIFICATE-----')) {
          return {
            isValid: false,
            formattedCert: '',
            error: 'Invalid base64 encoded certificate. Missing proper BEGIN/END markers.',
          }
        }

        return { isValid: true, formattedCert: cert }
      } catch (e) {
        return {
          isValid: false,
          formattedCert: '',
          error: 'Invalid base64 encoded certificate.',
        }
      }
    }

    // Case 3: Full certificate with BEGIN/END markers
    const beginMarker = '-----BEGIN CERTIFICATE-----'
    const endMarker = '-----END CERTIFICATE-----'

    if (cert.includes(beginMarker) && cert.includes(endMarker)) {
      // Verify proper format and order
      const beginIndex = cert.indexOf(beginMarker)
      const endIndex = cert.indexOf(endMarker)

      if (beginIndex === -1 || endIndex === -1 || beginIndex > endIndex) {
        return {
          isValid: false,
          formattedCert: '',
          error: 'Certificate markers are not in the correct order.',
        }
      }

      // Check if there's content between markers
      const contentBetweenMarkers = cert.substring(beginIndex + beginMarker.length, endIndex).trim()

      if (!contentBetweenMarkers) {
        return {
          isValid: false,
          formattedCert: '',
          error: 'Certificate is empty between markers.',
        }
      }

      return { isValid: true, formattedCert: safeBase64Encode(cert) }
    }

    return {
      isValid: false,
      formattedCert: '',
      error: 'Invalid TLS certificate format. Please provide a valid certificate with proper BEGIN/END markers.',
    }
  } catch (error) {
    return {
      isValid: false,
      formattedCert: '',
      error: 'Error processing TLS certificate. Please check the format.',
    }
  }
}
