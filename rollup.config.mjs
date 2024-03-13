import typescript from '@rollup/plugin-typescript'
import pkg from './package.json' assert { type: 'json' }

const input = 'src/index.ts'
const output = { sourcemap: true }
const outputDir = 'dist'
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {})
]
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
  ],
  external
}))

export default config
