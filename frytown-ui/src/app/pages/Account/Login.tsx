
'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaArrowRight, FaGoogle, FaFacebook, FaCheckCircle } from 'react-icons/fa';
import styles from './Register.module.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email address';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      console.log('Login data:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Redirect to dashboard or home after successful login
      // router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({
        ...errors,
        submit: 'Invalid email or password. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.registerContainer}>
      <section className={styles.leftSection} aria-hidden="true">
        <div className={styles.heroInner}>
          <h2 className={styles.heroTitle}>Welcome Back! 🍟</h2>
          <p className={styles.heroSubtitle}>
            Sign in to access your account, track orders, and enjoy exclusive member benefits.
          </p>

          <ul className={styles.heroList}>
            <li><FaCheckCircle /> Track your orders in real-time</li>
            <li><FaCheckCircle /> Save your favorite menu items</li>
            <li><FaCheckCircle /> Get personalized offers and rewards</li>
          </ul>

          <div className={styles.heroGlow} />
        </div>
      </section>

      <section className={styles.rightSection}>
        <div className={styles.registerCard}>
          <div className={styles.registerHeader}>
            <h1>Login to FryTown</h1>
          </div>

          <div className={styles.socialAuth}>
            <button type="button" className={`${styles.socialButton} ${styles.googleButton}`}>
              <FaGoogle /> Continue with Google
            </button>
            <button type="button" className={`${styles.socialButton} ${styles.facebookButton}`}>
              <FaFacebook /> Continue with Facebook
            </button>
          </div>

          <div className={styles.divider}><span>or</span></div>

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
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address *"
                  className={`${styles.inputField} ${errors.email ? styles.inputError : ''}`}
                  autoComplete="username"
                />
              </div>
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            <div className={styles.formGroup}>
              <div className={styles.inputContainer}>
                <FaLock className={styles.inputIcon} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password *"
                  className={`${styles.inputField} ${errors.password ? styles.inputError : ''}`}
                  autoComplete="current-password"
                />
              </div>
              {errors.password && <span className={styles.errorText}>{errors.password}</span>}
              <div className={styles.rememberForgot}>
                <label className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className={styles.checkboxInput}
                  />
                  <span className={styles.checkboxCustom}></span>
                  Remember me
                </label>
                <Link to="/account/forgot-password" className={styles.forgotPassword}>
                  Forgot password?
                </Link>
              </div>
            </div>

            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Sign In'}
              <FaArrowRight className={styles.buttonIcon} />
            </button>
          </form>

          <div className={styles.loginLink}>
            Don't have an account? <Link to="/account/register">Sign up</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
