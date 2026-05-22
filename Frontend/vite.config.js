import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] || ''
const isProjectPage =
  process.env.GITHUB_ACTIONS === 'true' &&
  repositoryName &&
  !repositoryName.endsWith('.github.io')

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || (isProjectPage ? `/${repositoryName}/` : '/'),
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
