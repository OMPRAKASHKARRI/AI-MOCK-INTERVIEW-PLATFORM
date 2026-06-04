// services/auth.service.js

import bcrypt from 'bcryptjs'
import User from '../models/User.model.js'
import generateToken from '../utils/generateToken.js'

export const registerUser = async (
  name,
  email,
  password
) => {
  email = email.toLowerCase()

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    const error = new Error('User already exists')
    error.statusCode = 400
    throw error
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  const token = generateToken(user._id)

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  }
}

export const loginUser = async (
  email,
  password
) => {
  email = email.toLowerCase()

  const user = await User.findOne({ email })

  if (!user) {
    const error = new Error('Invalid credentials')
    error.statusCode = 401
    throw error
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  )

  if (!isMatch) {
    const error = new Error('Invalid credentials')
    error.statusCode = 401
    throw error
  }

  const token = generateToken(user._id)

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  }
}