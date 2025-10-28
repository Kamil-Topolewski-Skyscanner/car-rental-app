/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CARS_API_URL: string
  readonly VITE_RESERVATIONS_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
