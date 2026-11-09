export {}

declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: string
        businessId: string | null
        role: 'owner'
      }
    }
  }
}
