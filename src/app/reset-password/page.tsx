"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        setLoading(true);
        // Mock API call
        setTimeout(() => {
            setLoading(false);
            setIsSuccess(true);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <main className={styles.container}>
                <div className={styles.splitCard} style={{ maxWidth: '500px', display: 'block', textAlign: 'center', padding: '4rem 2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <CheckCircle2 size={64} color="var(--accent)" strokeWidth={1.5} />
                    </div>
                    <h1 className={styles.formTitle} style={{ marginBottom: '1rem' }}>Password Updated</h1>
                    <p className={styles.formSubtitle} style={{ marginBottom: '2.5rem' }}>
                        Your password has been successfully reset. You can now use your new password to sign in to your account.
                    </p>
                    <Link href="/login" className={`btn btn-primary ${styles.submitBtn}`} style={{ display: 'inline-flex', textDecoration: 'none' }}>
                        Sign In Now
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.container}>
            <Link href="/login" className={styles.backButton} aria-label="Back to Login">
                <ArrowLeft size={24} />
            </Link>

            <div className={styles.splitCard}>
                {/* LEFT SIDE: Brand */}
                <div className={styles.brandSection}>
                    <Link href="/" className={styles.logo}>
                        <img src="/inkwise.png" alt="Pensieri Logo" className={styles.logoImage} />
                        Pensieri
                    </Link>
                    <h1 className={styles.brandTitle}>Secure Your Account.</h1>
                    <p className={styles.brandSubtitle}>
                        Your safety is our priority. Please choose a strong password that you haven&apos;t used elsewhere to keep your stories and data private.
                    </p>
                </div>

                {/* RIGHT SIDE: Form */}
                <div className={styles.formSection}>
                    <div className={styles.formHeader}>
                        <h2 className={styles.formTitle}>Set New Password</h2>
                        <p className={styles.formSubtitle}>Create a new password to regain access.</p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="password" className={styles.label}>New Password</label>
                            <div className={styles.passwordWrapper}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={styles.input}
                                    placeholder="••••••••"
                                    required
                                    minLength={8}
                                />
                                <button
                                    type="button"
                                    className={styles.toggleBtn}
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <img src="/book.png" alt="Hide" className={`${styles.iconAnimate} ${styles.iconImage}`} />
                                    ) : (
                                        <img src="/lock.png" alt="Show" className={`${styles.iconAnimate} ${styles.iconImage}`} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="confirmPassword" className={styles.label}>Confirm New Password</label>
                            <div className={styles.passwordWrapper}>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={styles.input}
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    className={styles.toggleBtn}
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                >
                                    {showConfirmPassword ? (
                                        <img src="/book.png" alt="Hide" className={`${styles.iconAnimate} ${styles.iconImage}`} />
                                    ) : (
                                        <img src="/lock.png" alt="Show" className={`${styles.iconAnimate} ${styles.iconImage}`} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={loading}>
                            {loading ? 'Updating Password...' : 'Reset Password'}
                        </button>
                    </form>

                    <div className={styles.footer}>
                        Remember your password?
                        <Link href="/login" className={styles.link}>Back to Sign In</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
