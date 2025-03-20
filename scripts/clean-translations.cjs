/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)
const readdirAsync = promisify(fs.readdir)
const statAsync = promisify(fs.stat)

// Stats tracking
const stats = {
  totalFilesFound: 0,
  totalFilesByExtension: {},
  skippedFiles: [],
  processedFiles: [],
}

/**
 * Check if a file should be processed based on its extension
 * @param {string} filePath The file path to check
 * @returns {boolean} Whether the file should be processed
 */
function shouldProcessFile(filePath) {
  // File extensions to look for
  const validExtensions = ['.js', '.jsx', '.ts', '.tsx', '.json']
  const ext = path.extname(filePath).toLowerCase()

  // Track stats for each extension
  stats.totalFilesByExtension[ext] = (stats.totalFilesByExtension[ext] || 0) + 1

  const shouldProcess = validExtensions.includes(ext)
  if (!shouldProcess) {
    stats.skippedFiles.push(filePath)
  } else {
    stats.processedFiles.push(filePath)
  }

  return shouldProcess
}

// Function to recursively get all files in a directory
async function getAllFiles(dir, fileList = []) {
  try {
    // Check if directory exists
    const dirStat = await statAsync(dir).catch(() => null)
    if (!dirStat || !dirStat.isDirectory()) {
      console.error(`Warning: ${dir} is not a directory or doesn't exist`)
      return fileList
    }

    // Read directory contents
    const files = await readdirAsync(dir)
    stats.totalFilesFound += files.length

    // Process each item
    for (const file of files) {
      // Skip node_modules and .git directories
      if (file === 'node_modules' || file === '.git') continue

      const filePath = path.join(dir, file)

      try {
        const stat = await statAsync(filePath)

        if (stat.isDirectory()) {
          // Recursively process subdirectory
          const nestedFiles = await getAllFiles(filePath, [])
          fileList.push(...nestedFiles)
        } else if (shouldProcessFile(filePath)) {
          // Include file if it has a valid extension
          fileList.push(filePath)
        }
      } catch (error) {
        console.error(`Error checking file ${filePath}:`, error.message)
      }
    }

    return fileList
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message)
    return fileList
  }
}

// Extract all string literals from a file, with special handling for t() function calls
async function extractStringLiterals(filePath) {
  try {
    const content = await readFileAsync(filePath, 'utf-8')

    // Extract strings from different contexts
    const strings = []

    // 1. Match t() function calls - more flexible pattern to catch various forms
    // t("key"), t('key'), t(`key`), t(  "key"  ), etc.
    const tFunctionRegex = /t\(\s*(['"`])([^'"`\\]*(?:\\.[^'"`\\]*)*)\1\s*[,)]/g
    let match
    while ((match = tFunctionRegex.exec(content)) !== null) {
      strings.push(match[2])
    }

    // Also try to match t function calls with nested properties or in Trans components
    const tKeyRegex = /[tT](?:rans)?\s*\(\s*{[^}]*key\s*:\s*(['"`])([^'"`\\]*(?:\\.[^'"`\\]*)*)\1/g
    while ((match = tKeyRegex.exec(content)) !== null) {
      strings.push(match[2])
    }

    // 2. Match raw string literals (might be used as keys elsewhere)
    const singleQuoteRegex = /'([^'\\]|\\.|\\\\)*'/g
    const doubleQuoteRegex = /"([^"\\]|\\.|\\\\)*"/g
    const backtickRegex = /`([^`\\]|\\.|\\\\)*`/g

    const singleQuoteMatches = [...content.matchAll(singleQuoteRegex)].map((match) => match[0].slice(1, -1))
    const doubleQuoteMatches = [...content.matchAll(doubleQuoteRegex)].map((match) => match[0].slice(1, -1))
    const backtickMatches = [...content.matchAll(backtickRegex)].map((match) => match[0].slice(1, -1))

    return [...strings, ...singleQuoteMatches, ...doubleQuoteMatches, ...backtickMatches]
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message)
    return []
  }
}

// Helper function to check if a key is used in a file
async function isKeyUsedInFile(filePath, key) {
  try {
    const content = await readFileAsync(filePath, 'utf-8')
    const keyEscaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

    // Various patterns for how t() might be used
    const patterns = [
      new RegExp(`t\\s*\\(\\s*['"\`]${keyEscaped}['"\`]\\s*[,)]`), // t("key") or t('key')
      new RegExp(`key\\s*:\\s*['"\`]${keyEscaped}['"\`]`), // key: "key" in object
      new RegExp(`<Trans\\s[^>]*i18nKey=['"\`]${keyEscaped}['"\`]`), // <Trans i18nKey="key">
      new RegExp(`['"\`]${keyEscaped}['"\`]`), // Raw string that matches key
    ]

    for (const pattern of patterns) {
      if (pattern.test(content)) {
        return true
      }
    }

    return false
  } catch (error) {
    console.error(`Error checking key in file ${filePath}:`, error.message)
    return false
  }
}

// Main function to process the translation file
async function cleanTranslationFile(translationFilePath, srcDir) {
  try {
    console.log('Reading translation file...')
    const translationContent = await readFileAsync(translationFilePath, 'utf-8')
    const translations = JSON.parse(translationContent)

    console.log(`Found ${Object.keys(translations).length} translation keys in ${translationFilePath}`)

    // Run a shell command to count files for comparison
    console.log('\nCounting files in src directory...')
    try {
      const { execSync } = require('child_process')
      const gitLsOutput = execSync(`git ls-files "${srcDir}/" | wc -l`, { encoding: 'utf8' })
      console.log(`Git reports ${gitLsOutput.trim()} files in the src directory`)

      // Count by extension
      const extensionCounts = execSync(
        `git ls-files "${srcDir}/" | grep -E '\\.(js|jsx|ts|tsx|vue|svelte|html|md|mdx|json)$' | wc -l`,
        { encoding: 'utf8' },
      )
      console.log(`Git reports ${extensionCounts.trim()} files with relevant extensions`)
    } catch (error) {
      console.error('Error running git command:', error.message)
    }

    console.log('\nFinding all source files...')
    const sourceFiles = await getAllFiles(srcDir)
    console.log(`Found ${sourceFiles.length} source files to scan`)
    console.log(`Total files encountered during directory traversal: ${stats.totalFilesFound}`)

    // Log extension statistics
    console.log('\nFiles by extension:')
    Object.entries(stats.totalFilesByExtension).forEach(([ext, count]) => {
      console.log(`${ext}: ${count} files`)
    })

    // Log skipped files if any
    if (stats.skippedFiles.length > 0) {
      console.log(`\nSkipped ${stats.skippedFiles.length} files with unsupported extensions`)
      console.log('First 10 skipped files:')
      console.log(stats.skippedFiles.slice(0, 10))
    }

    // Check if AuthModal.tsx is in the list
    const authModalPath = path.join(srcDir, 'components/molecules/AuthModal.tsx')
    if (sourceFiles.includes(authModalPath)) {
      console.log(`\nAuthModal.tsx is included in the scan list`)
    } else {
      console.log(`\nWARNING: AuthModal.tsx was NOT found in the scan list!`)
      console.log(`Checking if file exists: ${fs.existsSync(authModalPath)}`)
    }

    console.log('\nExtracting all string literals from source files...')
    const allFileStrings = []

    // Process files in batches to avoid memory issues
    const BATCH_SIZE = 50
    for (let i = 0; i < sourceFiles.length; i += BATCH_SIZE) {
      const batch = sourceFiles.slice(i, i + BATCH_SIZE)
      const extractionPromises = batch.map((file) => extractStringLiterals(file))
      const batchResults = await Promise.all(extractionPromises)

      for (const strings of batchResults) {
        allFileStrings.push(...strings)
      }

      console.log(`Processed batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(sourceFiles.length / BATCH_SIZE)}`)
    }

    // Create a Set for faster lookups
    const allStringsSet = new Set(allFileStrings)
    console.log(`Extracted ${allStringsSet.size} unique string literals from source files`)

    // Show a sample of the strings found
    console.log('\nSample of extracted strings (first 20):')
    console.log(Array.from(allStringsSet).slice(0, 20))

    // Track used and unused keys
    const usedTranslations = {}
    const unusedTranslations = {}
    const keysFoundInFiles = {}

    // Check each translation key against our set of strings
    const keys = Object.keys(translations)
    console.log(`\nChecking ${keys.length} translation keys...`)

    // First pass: check if key is directly in the extracted strings
    for (const key of keys) {
      if (allStringsSet.has(key)) {
        usedTranslations[key] = translations[key]
        keysFoundInFiles[key] = 'string_literal'
      } else {
        unusedTranslations[key] = translations[key]
      }
    }

    console.log(`First pass found ${Object.keys(usedTranslations).length} used keys`)

    // Second pass: check remaining keys with more detailed matching
    const remainingKeys = Object.keys(unusedTranslations)

    console.log(`\nPerforming detailed check on ${remainingKeys.length} remaining keys...`)

    // Check in batches
    const KEY_BATCH_SIZE = 20
    for (let i = 0; i < remainingKeys.length; i += KEY_BATCH_SIZE) {
      const keyBatch = remainingKeys.slice(i, i + KEY_BATCH_SIZE)

      // Check each file for each key in the batch (more sequential but limits parallelism)
      for (const file of sourceFiles) {
        for (const key of keyBatch) {
          // Skip keys we've already found
          if (keysFoundInFiles[key]) continue

          if (await isKeyUsedInFile(file, key)) {
            usedTranslations[key] = unusedTranslations[key]
            keysFoundInFiles[key] = file
            // Remove from unused translations
            delete unusedTranslations[key]
          }
        }
      }

      console.log(
        `Processed detailed check batch ${Math.floor(i / KEY_BATCH_SIZE) + 1}/${Math.ceil(
          remainingKeys.length / KEY_BATCH_SIZE,
        )}`,
      )
    }

    // Generate paths for output files
    const unusedTranslationsPath = path.join(path.dirname(translationFilePath), 'en.unused.json')

    // Create a backup of the original file
    const backupPath = `${translationFilePath}.backup`
    await writeFileAsync(backupPath, translationContent, 'utf-8')
    console.log(`\nBackup of original translations saved to: ${backupPath}`)

    // Write the cleaned translations back to the original file
    await writeFileAsync(translationFilePath, JSON.stringify(usedTranslations, null, 2), 'utf-8')

    // Write the unused translations to a separate file
    await writeFileAsync(unusedTranslationsPath, JSON.stringify(unusedTranslations, null, 2), 'utf-8')

    console.log(`\nProcess complete:`)
    console.log(`- ${Object.keys(usedTranslations).length} keys are used and kept in ${translationFilePath}`)
    console.log(`- ${Object.keys(unusedTranslations).length} keys are unused and saved to ${unusedTranslationsPath}`)

    if (Object.keys(unusedTranslations).length > 0) {
      console.log(`\nUnused keys (first 20):`, Object.keys(unusedTranslations).slice(0, 20))
    }
  } catch (error) {
    console.error('Error processing translation file:', error.message)
  }
}

// Get the directory of the project root (one level up from scripts directory)
const projectRoot = path.resolve(__dirname, '..')

// Execute the script
const translationFilePath = path.resolve(projectRoot, 'language/translations/en.json')
const srcDir = path.resolve(projectRoot, 'src')

cleanTranslationFile(translationFilePath, srcDir)
  .then(() => console.log('Script execution completed.'))
  .catch((err) => console.error('Script execution failed:', err))
