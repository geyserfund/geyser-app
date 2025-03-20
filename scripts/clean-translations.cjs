const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)
const readdirAsync = promisify(fs.readdir)
const statAsync = promisify(fs.stat)

// Function to recursively get all files in a directory
async function getAllFiles(dir, fileList = []) {
  const files = await readdirAsync(dir)
  const promises = []

  for (const file of files) {
    const filePath = path.join(dir, file)
    promises.push(
      (async () => {
        const stat = await statAsync(filePath)
        if (stat.isDirectory()) {
          const nestedFiles = await getAllFiles(filePath, [])
          fileList.push(...nestedFiles)
        } else if (/\.(js|jsx|ts|tsx|vue|svelte)$/.test(file)) {
          // Include all relevant file types for scanning
          fileList.push(filePath)
        }
      })(),
    )
  }

  await Promise.all(promises)
  return fileList
}

// Extract all string literals from a file
async function extractStringLiterals(filePath) {
  try {
    const content = await readFileAsync(filePath, 'utf-8')

    // Match all strings in single or double quotes
    // This regex accounts for escaped quotes
    const singleQuoteRegex = /'([^'\\]|\\.|\\\\)*'/g
    const doubleQuoteRegex = /"([^"\\]|\\.|\\\\)*"/g

    const singleQuoteMatches = [...content.matchAll(singleQuoteRegex)].map((match) => match[0].slice(1, -1))
    const doubleQuoteMatches = [...content.matchAll(doubleQuoteRegex)].map((match) => match[0].slice(1, -1))

    return [...singleQuoteMatches, ...doubleQuoteMatches]
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)
    return []
  }
}

// Main function to process the translation file
async function cleanTranslationFile(translationFilePath, srcDir, outputFilePath) {
  try {
    console.log('Reading translation file...')
    const translationContent = await readFileAsync(translationFilePath, 'utf-8')
    const translations = JSON.parse(translationContent)

    console.log('Finding all source files...')
    const sourceFiles = await getAllFiles(srcDir)
    console.log(`Found ${sourceFiles.length} source files to scan`)

    console.log('Extracting all string literals from source files...')
    const extractionPromises = sourceFiles.map((file) => extractStringLiterals(file))
    const allFileStrings = await Promise.all(extractionPromises)

    // Flatten all strings into a single array and create a Set for faster lookups
    const allStringsSet = new Set(allFileStrings.flat())
    console.log(`Extracted ${allStringsSet.size} unique string literals from source files`)

    // Track used and unused keys
    const usedTranslations = {}
    const unusedKeys = []

    // Check each translation key against our set of strings
    const keys = Object.keys(translations)
    console.log(`Checking ${keys.length} translation keys...`)

    for (const key of keys) {
      if (allStringsSet.has(key)) {
        usedTranslations[key] = translations[key]
      } else {
        unusedKeys.push(key)
      }
    }

    // Write the cleaned translations to the output file
    await writeFileAsync(outputFilePath, JSON.stringify(usedTranslations, null, 2), 'utf-8')

    console.log(`\nProcess complete:`)
    console.log(`- ${Object.keys(usedTranslations).length} keys are used and kept`)
    console.log(`- ${unusedKeys.length} keys are unused and removed`)
    console.log(`\nUnused keys:`, unusedKeys)
    console.log(`\nCleaned translation file saved to: ${outputFilePath}`)
  } catch (error) {
    console.error('Error processing translation file:', error)
  }
}

// Get the directory of the project root (one level up from scripts directory)
const projectRoot = path.resolve(__dirname, '..')

// Execute the script
const translationFilePath = path.resolve(projectRoot, 'language/translations/en.json')
const srcDir = path.resolve(projectRoot, 'src')
const outputFilePath = path.resolve(projectRoot, 'language/translations/en.cleaned.json')

cleanTranslationFile(translationFilePath, srcDir, outputFilePath)
  .then(() => console.log('Script execution completed.'))
  .catch((err) => console.error('Script execution failed:', err))
