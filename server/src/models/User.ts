import { Schema, model, type InferSchemaType, type Types } from 'mongoose'

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    businessId: { type: Schema.Types.ObjectId, default: null },
    role: { type: String, enum: ['owner'] as const, default: 'owner' },
    emailVerified: { type: Boolean, default: false },
    emailVerifyTokenHash: { type: String, default: null },
    emailVerifyExpires: { type: Date, default: null },
    passwordResetTokenHash: { type: String, default: null },
    passwordResetExpires: { type: Date, default: null },
    refreshTokenHash: { type: String, default: null },
  },
  { timestamps: true },
)

userSchema.index({ email: 1 }, { unique: true })
userSchema.index({ businessId: 1 })

userSchema.set('toJSON', {
  transform(_doc, ret: Record<string, unknown>) {
    ret.id = String(ret._id)
    delete ret._id
    delete ret.__v
    delete ret.passwordHash
    delete ret.emailVerifyTokenHash
    delete ret.passwordResetTokenHash
    delete ret.refreshTokenHash
    return ret
  },
})

export type UserDocument = InferSchemaType<typeof userSchema> & {
  _id: Types.ObjectId
}

export const User = model('User', userSchema)
