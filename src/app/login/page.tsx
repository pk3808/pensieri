"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { ArrowLeft } from 'lucide-react';
import GoogleIcon from '../../components/GoogleIcon';
import ForgotPasswordModal from './ForgotPasswordModal';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Mock login
        setTimeout(() => {
            const mockUser = {
                name: "Alex Rivera",
                email: email || "alex.rivera@example.com",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                bio: "Digital minimalist and UI enthusiast. exploring the intersection of design and technology."
            };
            localStorage.setItem('currentUser', JSON.stringify(mockUser));
            localStorage.setItem('isLoggedIn', 'true');
            setLoading(false);
            window.location.href = '/';
        }, 1000);
    };

    return (
        <main className={styles.container}>
            <Link href="/" className={styles.backButton} aria-label="Back to Home">
                <ArrowLeft size={24} />
            </Link>

            <div className={styles.splitCard}>

                {/* LEFT SIDE: Brand */}
                <div className={styles.brandSection}>
                    <Link href="/" className={styles.logo}>
                        <img src="/inkwise.png" alt="Pensieri Logo" className={styles.logoImage} />
                        Pensieri
                    </Link>
                    <h1 className={styles.brandTitle}>Welcome Back.</h1>
                    <p className={styles.brandSubtitle}>
                        Log in to access your curated feed, saved stories, and personalized reading experience.
                    </p>
                </div>

                {/* RIGHT SIDE: Form */}
                <div className={styles.formSection}>
                    <div className={styles.formHeader}>
                        <h2 className={styles.formTitle}>Sign In</h2>
                        <p className={styles.formSubtitle}>Use your email or another service to continue.</p>
                    </div>

                    <form onSubmit={handleLogin} className={styles.form}>
                        <button type="button" className={styles.googleBtn}>
                            <GoogleIcon />
                            Continue with Google
                        </button>

                        <div className={styles.divider}>or with email</div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="email" className={styles.label}>Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.input}
                                placeholder="name@example.com"
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="password" className={styles.label}>Password</label>
                            <div className={styles.passwordWrapper}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={styles.input}
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    className={styles.toggleBtn}
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <img
                                            src="/book.png"
                                            alt="Hide"
                                            className={`${styles.iconAnimate} ${styles.iconImage}`}
                                        />
                                    ) : (
                                        <img
                                            src="/lock.png"
                                            alt="Show"
                                            className={`${styles.iconAnimate} ${styles.iconImage}`}
                                        />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className={styles.forgotLink}>
                            <button type="button" className={styles.forgotBtn} onClick={() => setShowForgotPassword(true)}>
                                Forgot password?
                            </button>
                        </div>

                        <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={loading}>
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                    <ForgotPasswordModal isOpen={showForgotPassword} onClose={() => setShowForgotPassword(false)} />

                    <div className={styles.footer}>
                        Don&apos;t have an account?
                        <Link href="/register" className={styles.link}>Register</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
