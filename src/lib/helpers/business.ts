// Helper functions for the business registration process

export const formatBusinessType = (type: string) => {
  return type.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ')
}

export const validatePhoneNumber = (phone: string) => {
  // Basic phone number validation
  const phoneRegex = /^\+?[1-9]\d{1,14}$/
  return phoneRegex.test(phone)
}

export const generateRegistrationNumber = () => {
  // Generate a unique registration number
  const prefix = 'BR'
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `${prefix}${timestamp}${random}`
}
