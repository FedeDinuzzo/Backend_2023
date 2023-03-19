import { fileURLToPath } from 'url'
import { dirname } from 'path'

export const __filename = fileURLToPath(import.meta.utl) // Ruta del archivo
export const __dirname = dirname(__filename)