await Bun.build({
  entrypoints: ['./index.ts'],
  outdir: './dist',
  target: 'node',
  format: 'esm',
  minify: false,
  sourcemap: 'linked',
});

await Bun.build({
  entrypoints: ['./index.ts'],
  outdir: './dist',
  target: 'node',
  format: 'cjs',
  minify: false,
  sourcemap: 'linked',
  naming: {
    entry: '[dir]/[name].cjs',
  },
});

console.log('Build completed successfully!');
