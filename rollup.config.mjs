import typescript from '@rollup/plugin-typescript'

const input = 'src/index.ts'
const output = { sourcemap: true }
const outputDir = 'dist'
const config = ['es', 'cjs'].map(format => ({
  input,
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
}))

export default config
