import pkg from './package.json';
import buble from 'rollup-plugin-buble';

export default {
  entry: 'src/index.js',
  plugins: [
    buble()
  ],
  targets: [
    { dest: pkg.main, format: 'cjs' },
    { dest: pkg.module, format: 'es' }
  ]
}
