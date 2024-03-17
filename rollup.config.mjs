import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import { globSync } from 'glob'

const sources = globSync('src/*.ts', {
  ignore: ['src/utils.ts', 'src/type.ts']
})
const input = 'src/index.ts'
const output = { sourcemap: true }
const outputDir = 'dist'
const config = ['es', 'cjs'].flatMap(format => [
  {
    input: sources,
    output: {
      ...output,
      dir: `${outputDir}/${format}`,
      format
    },
    plugins: [
      typescript({
        declarationDir: `${outputDir}/${format}`
      })
    ]
  },
  {
    input: sources,
    output: {
      ...output,
      dir: `${outputDir}/min/${format}`,
      format,
      plugins: [terser()]
    },
    plugins: [
      typescript({
        declarationDir: `${outputDir}/min/${format}`
      })
    ]
  }
])

export default config
