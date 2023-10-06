export const isValidPhone = (phone) => {
    const pattern = /^\+?7[1-9]\d{1,14}$/;  // This is a very basic pattern for international phone numbers
    return pattern.test(phone);
}

export const isValidEmail = (email) => {
    const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return pattern.test(email);
}