import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Capital Wave Studio',
  projectId: '8h2ezv9l',
  dataset: 'production',
  basePath: '/admin',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})
