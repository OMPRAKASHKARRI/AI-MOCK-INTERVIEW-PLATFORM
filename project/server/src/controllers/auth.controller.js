import * as authService from '../services/auth.service.js'

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      })
    }

    const result =
      await authService.registerUser(
        name,
        email,
        password
      )

    res.status(201).json({
      success: true,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          'Email and password are required',
      })
    }

    const result =
      await authService.loginUser(
        email,
        password
      )

    res.status(200).json({
      success: true,
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const getMe = async (
  req,
  res,
  next
) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user,
    })
  } catch (error) {
    next(error)
  }
}
export const logout = async (
  req,
  res,
  next
) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    })
  } catch (error) {
    next(error)
  }
};

export default {
  register,
  login
  , getMe, logout
}