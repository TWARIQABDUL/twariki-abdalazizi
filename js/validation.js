// Form validation functionality

// Validation rules
const validationRules = {
    name: {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Z\s]+$/
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    subject: {
        required: true,
        minLength: 5,
        maxLength: 100
    },
    message: {
        required: true,
        minLength: 10,
        maxLength: 1000
    }
};

// Error messages
const errorMessages = {
    required: 'This field is required',
    minLength: 'Must be at least {min} characters long',
    maxLength: 'Must not exceed {max} characters',
    pattern: 'Please enter a valid {field}',
    email: 'Please enter a valid email address',
    name: 'Name should only contain letters and spaces'
};

class FormValidator {
    constructor(formElement) {
        this.form = formElement;
        this.errors = {};
        this.initialize();
    }

    initialize() {
        // Add event listeners
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        
        // Add real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        
        if (this.validateForm()) {
            this.submitForm();
        }
    }

    validateForm() {
        this.errors = {};
        const inputs = this.form.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const fieldName = field.name;
        const fieldValue = field.value.trim();
        const rules = validationRules[fieldName];

        if (!rules) return true;

        // Clear previous errors
        this.clearFieldError(field);

        // Required validation
        if (rules.required && !fieldValue) {
            this.setFieldError(field, errorMessages.required);
            return false;
        }

        // Skip other validations if field is empty and not required
        if (!fieldValue && !rules.required) {
            return true;
        }

        // Minimum length validation
        if (rules.minLength && fieldValue.length < rules.minLength) {
            this.setFieldError(field, errorMessages.minLength.replace('{min}', rules.minLength));
            return false;
        }

        // Maximum length validation
        if (rules.maxLength && fieldValue.length > rules.maxLength) {
            this.setFieldError(field, errorMessages.maxLength.replace('{max}', rules.maxLength));
            return false;
        }

        // Pattern validation
        if (rules.pattern && !rules.pattern.test(fieldValue)) {
            let message = errorMessages.pattern.replace('{field}', fieldName);
            
            // Specific messages for different fields
            switch (fieldName) {
                case 'email':
                    message = errorMessages.email;
                    break;
                case 'name':
                    message = errorMessages.name;
                    break;
            }
            
            this.setFieldError(field, message);
            return false;
        }

        return true;
    }

    setFieldError(field, message) {
        const errorElement = document.getElementById(field.name + 'Error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        field.classList.add('error');
        this.errors[field.name] = message;
    }

    clearFieldError(field) {
        const errorElement = document.getElementById(field.name + 'Error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        
        field.classList.remove('error');
        delete this.errors[field.name];
    }

    showFormStatus(message, type = 'success') {
        const statusElement = document.getElementById('formStatus');
        if (statusElement) {
            statusElement.textContent = message;
            statusElement.className = `form-status ${type}`;
            statusElement.style.opacity = '1';
            
            // Hide after 5 seconds
            setTimeout(() => {
                statusElement.style.opacity = '0';
            }, 5000);
        }
    }

    async submitForm() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());
        
        // Show loading state
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        try {
            // Simulate API call (replace with actual endpoint)
            await this.simulateAPICall(data);
            
            // Success
            this.showFormStatus('Thank you! Your message has been sent successfully.', 'success');
            this.form.reset();
            
        } catch (error) {
            // Error
            this.showFormStatus('Sorry, there was an error sending your message. Please try again.', 'error');
            console.error('Form submission error:', error);
            
        } finally {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }

    async simulateAPICall(data) {
        // Simulate network delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success (90% of the time)
                if (Math.random() > 0.1) {
                    resolve(data);
                } else {
                    reject(new Error('Network error'));
                }
            }, 1500);
        });
    }
}

// Additional validation utilities
class ValidationUtils {
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static isValidPhone(phone) {
        const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }

    static sanitizeInput(input) {
        return input.trim().replace(/[<>]/g, '');
    }

    static validateLength(value, min, max) {
        const length = value.length;
        return length >= min && length <= max;
    }

    static validateRequired(value) {
        return value.trim().length > 0;
    }

    static showTooltip(element, message) {
        const tooltip = document.createElement('div');
        tooltip.className = 'validation-tooltip';
        tooltip.textContent = message;
        tooltip.style.cssText = `
            position: absolute;
            background: #333;
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 1000;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';
        
        setTimeout(() => tooltip.style.opacity = '1', 10);
        
        setTimeout(() => {
            tooltip.style.opacity = '0';
            setTimeout(() => tooltip.remove(), 300);
        }, 3000);
    }
}

// Enhanced form validation with accessibility
class AccessibleFormValidator extends FormValidator {
    constructor(formElement) {
        super(formElement);
        this.initializeAccessibility();
    }

    initializeAccessibility() {
        // Add ARIA attributes
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            const errorId = input.name + 'Error';
            input.setAttribute('aria-describedby', errorId);
            
            // Add aria-invalid attribute
            input.addEventListener('blur', () => {
                const hasError = this.errors[input.name];
                input.setAttribute('aria-invalid', hasError ? 'true' : 'false');
            });
        });
    }

    setFieldError(field, message) {
        super.setFieldError(field, message);
        
        // Announce error to screen readers
        field.setAttribute('aria-invalid', 'true');
        
        // Optional: Create live region for immediate feedback
        this.announceError(message);
    }

    clearFieldError(field) {
        super.clearFieldError(field);
        field.setAttribute('aria-invalid', 'false');
    }

    announceError(message) {
        let liveRegion = document.getElementById('validation-live-region');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'validation-live-region';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.style.cssText = `
                position: absolute;
                left: -10000px;
                width: 1px;
                height: 1px;
                overflow: hidden;
            `;
            document.body.appendChild(liveRegion);
        }
        
        liveRegion.textContent = message;
    }
}

// Initialize form validation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        new AccessibleFormValidator(contactForm);
    }
});

// Custom validation for specific use cases
class CustomValidators {
    static validatePassword(password) {
        const rules = {
            minLength: 8,
            hasUppercase: /[A-Z]/,
            hasLowercase: /[a-z]/,
            hasNumbers: /\d/,
            hasSpecialChars: /[!@#$%^&*(),.?":{}|<>]/
        };
        
        const errors = [];
        
        if (password.length < rules.minLength) {
            errors.push(`Password must be at least ${rules.minLength} characters long`);
        }
        
        if (!rules.hasUppercase.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }
        
        if (!rules.hasLowercase.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }
        
        if (!rules.hasNumbers.test(password)) {
            errors.push('Password must contain at least one number');
        }
        
        if (!rules.hasSpecialChars.test(password)) {
            errors.push('Password must contain at least one special character');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    static validateFileUpload(file, options = {}) {
        const defaultOptions = {
            maxSize: 5 * 1024 * 1024, // 5MB
            allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
            maxFiles: 1
        };
        
        const settings = { ...defaultOptions, ...options };
        const errors = [];
        
        if (file.size > settings.maxSize) {
            errors.push(`File size must be less than ${settings.maxSize / 1024 / 1024}MB`);
        }
        
        if (!settings.allowedTypes.includes(file.type)) {
            errors.push('File type not allowed');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
}

// Export for use in other modules
window.FormValidation = {
    FormValidator,
    AccessibleFormValidator,
    ValidationUtils,
    CustomValidators
};