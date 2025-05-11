/**
 * Validation utility functions for form inputs.
 */

/**
 * Validates an email address.
 */
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  /**
   * Validates a phone number (e.g., +1234567890).
   */
  export const validatePhoneNumber = (phone) => {
    const re = /^\+\d{6,15}$/;
    return re.test(phone);
  };
  
  /**
   * Validates a URL.
   */
  export const validateURL = (url) => {
    const re = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i;
    return re.test(url);
  };
  
  /**
   * Validates a password (8+ characters, letters and numbers).
   */
  export const validatePassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
  };