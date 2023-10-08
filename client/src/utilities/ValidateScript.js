export const isValidPhone = (phone) => {
    const cleanedPhone = phone.replace(/[+() -]/g, '')
    const pattern = /^[7-8]\d{1,11}$/;
    return pattern.test(cleanedPhone)
}

export const isValidEmail = (email) => {
    const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    return pattern.test(email)
}

export const validateRequiredFields = (formData, requiredFields) => {
    const missingFields = requiredFields.filter(fieldName => !formData[fieldName])
    if (missingFields.length) {
        return `Поля ${missingFields.join(', ')} не может быть пустое`
    }
    return null
}
