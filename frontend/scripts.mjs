import { spawn } from 'child_process'
import 'dotenv/config'
import { copyFile } from 'fs/promises'

const [script] = process.argv.slice(2)

// if (!process.env.SUPABASE_PROJECT_ID) {
//   console.error(`Not found "SUPABASE_PROJECT_ID" env variable.`)
//   process.exit(1)
// }

switch (script) {
  case 'sb-type': {
    const child = spawn(
      'supabase',
      [`gen`, `types`, `typescript`, `--local`, `>`, `src/types/database-generated.types.ts`],
      {
        shell: true,
      },
    )
    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)

    child.on('close', async () => {
      await copyFile(
        `src/types/database-generated.types.ts`,
        `../supabase/functions/_shared/types/database-generated.types.ts`,
      )

      console.log('Done')
    })
    break
  }
}
