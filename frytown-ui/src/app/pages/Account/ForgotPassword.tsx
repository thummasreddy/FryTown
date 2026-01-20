'use client';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import styles from './Register.module.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{email?: string; submit?: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: {email?: string} = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      console.log('Password reset requested for:', email);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (error) {
      console.error('Password reset request failed:', error);
      setErrors({
        ...errors,
        submit: 'Failed to process your request. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className={styles.registerContainer}>
        <section className={styles.leftSection} aria-hidden="true">
          <div className={styles.heroInner}>
            <h2 className={styles.heroTitle}>Check Your Email! ✉️</h2>
            <p className={styles.heroSubtitle}>
              We've sent password reset instructions to your email address.
            </p>
            <ul className={styles.heroList}>
              <li><FaCheckCircle /> Check your inbox for our email</li>
              <li><FaCheckCircle /> Follow the link to reset your password</li>
              <li><FaCheckCircle /> Can't find it? Check your spam folder</li>
            </ul>
          </div>
        </section>

        <section className={styles.rightSection}>
          <div className={styles.registerCard}>
            <div className={styles.registerHeader}>
              <h1>Email Sent</h1>
              <p className={styles.successMessage}>
                We've sent password reset instructions to <strong>{email}</strong>.
              </p>
            </div>
            
            <div className={styles.formGroup}>
              <button 
                onClick={() => navigate('/account/login')} 
                className={styles.submitButton}
              >
                Back to Login <FaArrowRight className={styles.buttonIcon} />
              </button>
            </div>

            <div className={styles.loginLink}>
              Didn't receive the email?{' '}
              <button 
                onClick={() => setIsSubmitted(false)}
                className={styles.linkButton}
              >
                Resend email
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.registerContainer}>
      <section className={styles.leftSection} aria-hidden="true">
        <div className={styles.heroInner}>
          <h2 className={styles.heroTitle}>Forgot Your Password? </h2>
          <p className={styles.heroSubtitle}>
            No worries! Enter your email address and we'll send you a link to reset your password.
          </p>
          <ul className={styles.heroList}>
            <li><FaCheckCircle /> Secure password reset process</li>
            <li><FaCheckCircle /> Get back to your account quickly</li>
            <li><FaCheckCircle /> 24/7 account recovery support</li>
          </ul>
        </div>
      </section>

      <section className={styles.rightSection}>
        <div className={styles.registerCard}>
          <div className={styles.registerHeader}>
            <h1>Reset Password</h1>
            <p>Enter your email to receive a password reset link</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.registerForm}>
            {errors.submit && (
              <div className={styles.errorBox}>
                {errors.submit}
              </div>
            )}

            <div className={styles.formGroup}>
              <div className={styles.inputContainer}>
                <FaEnvelope className={styles.inputIcon} />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({...errors, email: ''});
                  }}
                  placeholder="Email Address *"
                  className={`${styles.inputField} ${errors.email ? styles.inputError : ''}`}
                  autoComplete="email"
                  autoFocus
                />
              </div>
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            <button 
              type="submit" 
              className={styles.submitButton} 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
              <FaArrowRight className={styles.buttonIcon} />
            </button>
          </form>

          <div className={styles.loginLink}>
            <Link to="/account/login" className={styles.backToLogin}>
              <FaArrowLeft className={styles.backIcon} /> Back to Login
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
