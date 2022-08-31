declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string
    MG_DOMAIN: string
    MG_PRIVATE_KEY: string
    MG_PUBLIC_KEY: string
    MG_WEBHOOK_KEY: string
  }
}
