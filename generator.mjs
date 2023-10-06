import { pascalCase, camelCase } from 'change-case'
import { exec } from 'child_process'
import fs from 'fs'
import { readdir } from 'fs/promises'
import inquirer from 'inquirer'
import inquirerPrompt from 'inquirer-autocomplete-prompt'

inquirer.registerPrompt('autocomplete', inquirerPrompt)

const SRC_ROOT_PATH_ALIAS = '@'

/**
 * @value {`;` | ''}
 */
const SEMICOLON = ''

/**
 * @value {`'` | `"`}
 */
const QUOTE = `'`

const USE_NEXT_APP_ROUTING = true
const NEXT_APP_ROUTEING_DIR = './src/app'

const PAGE_DIR = './src/pages'

/**
 * @value {null | string}
 * @description Setting to null value does not create a page styled file.
 */
const PAGE_STYLED_DIR = './src/styles/pageStyled'

/**
 * input: 'test'
 * value: 'Page'
 * output: 'TestPage'
 */
const PAGE_COMPONENT_NAME_SUFFIX = 'Page'

/**
 * input: 'test/index'
 *
 * value: true
 * output: Test
 *
 * value: false
 * output: TestIndex
 */
const PAGE_COMPONENT_NAME_REMOVE_INDEX = true

const COMPONENT_DIR = './src/components'
const FEATURES_DIR = './src/features'

const getDirectories = async source =>
  (await readdir(source, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const createIndexFileText = name => {
  return [
    // prettier-ignore
    `export * from ${QUOTE}./${name}${QUOTE}${SEMICOLON}`,
    `export { default } from ${QUOTE}./${name}${QUOTE}${SEMICOLON}`,
    ``,
  ].join('\n')
}

const createComponentFileText = name => {
  return [
    `import { ReactNode } from ${QUOTE}react${QUOTE}${SEMICOLON}`,
    ``,
    `import clsx from ${QUOTE}clsx${QUOTE}${SEMICOLON}`,
    ``,
    `import * as Styled from ${QUOTE}./${name}.styled${QUOTE}${SEMICOLON}`,
    ``,
    `export interface ${name}Props {`,
    `  className?: string${SEMICOLON}`,
    `  children?: ReactNode${SEMICOLON}`,
    `}`,
    ``,
    `const ${name} = ({ className, children }: ${name}Props) => {`,
    `  return (`,
    `    <Styled.Root className={clsx(${QUOTE}${name}${QUOTE}, className)}>`,
    `      {children}`,
    `    </Styled.Root>`,
    `  )${SEMICOLON}`,
    `}${SEMICOLON}`,
    ``,
    `export default ${name}${SEMICOLON}`,
    ``,
  ].join('\n')
}

const createStyledFileText = () => {
  return [
    `import { styled } from ${QUOTE}@styled-system/jsx${QUOTE}${SEMICOLON}`,
    ``,
    `export const Root = styled('div', {`,
    `  base: {`,
    `    `,
    `  },`,
    `})`,
    ``,
  ].join('\n')
}

const createPageFileText = name => {
  const pageComponentName = name + PAGE_COMPONENT_NAME_SUFFIX

  return [
    // prettier-ignore
    `import * as Styled from ${QUOTE}${SRC_ROOT_PATH_ALIAS}/styles/pageStyled/${pageComponentName}.styled${QUOTE}${SEMICOLON}`,
    ``,
    `const ${pageComponentName} = () => {`,
    `  return (`,
    `    <Styled.Root>`,
    `      `,
    `    </Styled.Root>`,
    `  )${SEMICOLON}`,
    `}${SEMICOLON}`,
    ``,
    `export default ${pageComponentName}${SEMICOLON}`,
    ``,
  ].join('\n')
}

const createPromptInput = options => {
  const { name = 'name', label } = options

  return {
    type: 'input',
    name,
    message: `${label}:`,
    validate: input => {
      return String(input).trim().length > 0 || `${label} is required`
    },
  }
}

const editParentComponentExportFile = async parentComponentName => {
  const parentComponentDir = `${COMPONENT_DIR}/${parentComponentName}`
  const parentComponentExportFile = `${parentComponentDir}/index.ts`

  const subComponentNames = await getDirectories(parentComponentDir)

  let texts = [
    `// === Automatically generated file. Don't edit it. ===`,
    `import _${parentComponentName} from ${QUOTE}./${parentComponentName}${QUOTE}${SEMICOLON}`,
  ]

  texts.push(
    ...subComponentNames.map(
      subComponentName =>
        `import ${subComponentName} from ${QUOTE}./${subComponentName}${QUOTE}${SEMICOLON}`,
    ),
  )

  texts.push(
    ...[
      ``,
      `type _${parentComponentName} = typeof _${parentComponentName}${SEMICOLON}`,
      ``,
      `interface ${parentComponentName}Type extends _${parentComponentName} {`,
      ...subComponentNames.map(
        subComponentName => `  ${subComponentName}: typeof ${subComponentName}${SEMICOLON}`,
      ),
      `}`,
      ``,
      `const ${parentComponentName} = _${parentComponentName} as ${parentComponentName}Type${SEMICOLON}`,
      ``,
      ...subComponentNames.map(
        subComponentName =>
          `${parentComponentName}.${subComponentName} = ${subComponentName}${SEMICOLON}`,
      ),
      ``,
      `export default ${parentComponentName}${SEMICOLON}`,
      ``,
    ],
  )

  fs.writeFileSync(parentComponentExportFile, texts.join('\n'))
}

const createComponentAndFileOpen = (dir, name) => {
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(`${dir}/${name}.styled.ts`, createStyledFileText())
  fs.writeFileSync(`${dir}/${name}.tsx`, createComponentFileText(name))
  fs.writeFileSync(`${dir}/index.ts`, createIndexFileText(name))

  console.log(`🎉 Component [${name}] created`)
  console.log(`📂 Open file...`)

  exec(`code -g ${dir}/${name}.tsx:15:17`)
}

const start = async () => {
  const { type } = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Choose type',
      choices: ['feature', 'page', 'component', 'sub-component'],
      default: 'feature',
    },
  ])

  switch (type) {
    case 'feature': {
      const { featureName, componentName } = await inquirer.prompt([
        createPromptInput({ name: 'featureName', label: 'Feature name (camelCase)' }),
        createPromptInput({
          name: 'componentName',
          label: 'Component name (PascalCase)',
        }),
      ])

      const featureDir = `${FEATURES_DIR}/${featureName}`
      const componentDir = `${featureDir}/${componentName}`

      // check component dir already exists
      if (fs.existsSync(componentDir)) {
        console.log(`🛑 Component [${componentName}] already exists`)
        process.exit(0)
      }

      // not found feature dir -> create dir
      if (!fs.existsSync(featureDir)) {
        fs.mkdirSync(featureDir, { recursive: true })
      }

      createComponentAndFileOpen(componentDir, componentName)
      break
    }

    case 'component': {
      const { componentName } = await inquirer.prompt([
        createPromptInput({
          name: 'componentName',
          label: 'Component name (PascalCase)',
        }),
      ])

      const componentDir = `${COMPONENT_DIR}/${componentName}`

      // check component dir already exists
      if (fs.existsSync(componentDir)) {
        console.log(`🛑 Component [${componentName}] already exists`)
        process.exit(0)
      }

      createComponentAndFileOpen(componentDir, componentName)

      break
    }

    case 'sub-component': {
      const componentNames = await getDirectories(COMPONENT_DIR)

      const { parentComponentName } = await inquirer.prompt([
        {
          type: 'autocomplete',
          name: 'parentComponentName',
          message: 'Choose component',
          source: (_, input) => {
            return componentNames.filter(name =>
              name.toLowerCase().includes((input || '').toLowerCase()),
            )
          },
        },
      ])

      const { componentName } = await inquirer.prompt([
        createPromptInput({
          name: 'componentName',
          label: 'Sub component name (PascalCase)',
        }),
      ])

      const componentDir = `${COMPONENT_DIR}/${parentComponentName}/${componentName}`

      // check component dir already exists
      if (fs.existsSync(componentDir)) {
        console.log(`🛑 Component [${componentName}] already exists`)
        process.exit(0)
      }

      createComponentAndFileOpen(componentDir, componentName)
      await editParentComponentExportFile(parentComponentName)

      break
    }

    case 'page': {
      let { input } = await inquirer.prompt([
        createPromptInput({
          name: 'input',
          label: 'Page path (ex: sign/in = sign/in.tsx) (lowercase)',
        }),
      ])

      input = String(input.replace(/\.tsx?/, '')).toLowerCase()

      const path = `${USE_NEXT_APP_ROUTING ? NEXT_APP_ROUTEING_DIR : PAGE_DIR}/${
        USE_NEXT_APP_ROUTING ? `${`${input}/`.replace('index/', '')}page` : input
      }.tsx`
      const dir = path.split('/').slice(0, -1).join('/')

      let name = pascalCase(input)

      if (PAGE_COMPONENT_NAME_REMOVE_INDEX) {
        name = name.replace(/Index$/, '')

        if (name === '') {
          name = 'Home'
        }
      }

      const styledPath = `${PAGE_STYLED_DIR}/${name + PAGE_COMPONENT_NAME_SUFFIX}.styled.ts`

      // check page file already exists
      if (fs.existsSync(path)) {
        console.log(`🛑 [${path}] already exists`)
        process.exit(0)
      }

      // not found page dir -> create dir
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }

      if (PAGE_STYLED_DIR !== null) {
        // check page styled file already exists
        if (fs.existsSync(styledPath)) {
          console.log(`🛑 [${styledPath}] already exists`)
          process.exit(0)
        }

        // not found styled dir -> create dir
        if (!fs.existsSync(PAGE_STYLED_DIR)) {
          fs.mkdirSync(PAGE_STYLED_DIR, { recursive: true })
        }

        // create styled file
        fs.writeFileSync(styledPath, createStyledFileText())
      }

      // create page file
      fs.writeFileSync(path, createPageFileText(name))

      console.log(`🎉 Page [${name}] created`)
      console.log(`📂 Open file...`)

      exec(`code -g ${path}:6:7`)
      break
    }
  }
}

start()
