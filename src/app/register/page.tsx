"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { ArrowLeft } from 'lucide-react';
import GoogleIcon from '../../components/GoogleIcon';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // New states for OTP
    const [step, setStep] = useState<'details' | 'otp'>('details');
    const [otp, setOtp] = useState('');
    const router = useRouter();

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            // 1. Open Google Login Popup
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // 2. GET THE TOKEN (Critical Step)
            const idToken = await user.getIdToken();

            // 3. Send Token to Spring Boot Backend
            const response = await fetch("http://localhost:8080/api/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: idToken }), // Aligning with login page implementation
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Registration/Login Successful on Backend:", data);

                localStorage.setItem("currentUser", JSON.stringify(data.user || user));
                localStorage.setItem("blog_token", data.token);
                localStorage.setItem('isLoggedIn', 'true');

                router.push("/");
            } else {
                console.error("Backend verification failed");
                alert("Google Sign-In failed. Please try again.");
            }
        } catch (error: any) {
            console.error("Error during Google Sign-In:", error.message);
            alert("Error during Google Sign-In: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        setLoading(true);

        // Mock sending OTP
        setTimeout(() => {
            setLoading(false);
            setStep('otp');
            alert(`OTP sent to ${email}`); // Simulate email sending
        }, 1000);
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Mock verify OTP
        setTimeout(() => {
            setLoading(false);
            if (otp === "123456") { // Mock validation or just accept any for now
                // Redirect or complete
                alert("Registration Successful!");
                // In a real app, you'd router.push('/dashboard') or similar here
                window.location.href = '/login';
            } else {
                // For now accept anything or mock check
                alert("Registration Successful!");
                window.location.href = '/login';
            }
        }, 1000);
    }

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
                    <h1 className={styles.brandTitle}>Join the Club.</h1>
                    <p className={styles.brandSubtitle}>
                        Create an account to become a part of our growing community of writers, thinkers, and creators.
                    </p>
                </div>

                {/* RIGHT SIDE: Form */}
                <div className={styles.formSection}>
                    <div className={styles.staticContent}>
                        <div className={styles.formHeader}>
                            <h2 className={styles.formTitle}>
                                {step === 'details' ? 'Create Account' : 'Verify Email'}
                            </h2>
                            <p className={styles.formSubtitle}>
                                {step === 'details'
                                    ? 'Enter your details to get started.'
                                    : `We've sent a code to ${email}`}
                            </p>
                        </div>

                        {step === 'details' && (
                            <>
                                <button type="button" className={styles.googleBtn} onClick={handleGoogleLogin} disabled={loading}>
                                    <GoogleIcon />
                                    {loading ? "Signing up..." : "Sign up with Google"}
                                </button>
                                <div className={styles.divider}>or with email</div>
                            </>
                        )}
                    </div>

                    <div className={styles.scrollableContent}>
                        {step === 'details' ? (
                            <form onSubmit={handleRegister} className={styles.form}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="name" className={styles.label}>Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className={styles.input}
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

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

                                <div className={styles.row}>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="city" className={styles.label}>City</label>
                                        <input
                                            type="text"
                                            id="city"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            className={styles.input}
                                            placeholder="New York"
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label htmlFor="state" className={styles.label}>State</label>
                                        <select
                                            id="state"
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                            className={styles.input}
                                        >
                                            <option value="">Select...</option>
                                            <option value="CA">California</option>
                                            <option value="NY">New York</option>
                                            <option value="TX">Texas</option>
                                            <option value="FL">Florida</option>
                                            <option value="IL">Illinois</option>
                                            {/* Add more states as needed */}
                                        </select>
                                    </div>
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
                                            placeholder="•••••"
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
                                <div className={styles.inputGroup}>
                                    <label htmlFor="confirmPassword" className={styles.label}>Confirm</label>
                                    <div className={styles.passwordWrapper}>
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            id="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className={styles.input}
                                            placeholder="•••••"
                                            required
                                        />
                                        <button
                                            type="button"
                                            className={styles.toggleBtn}
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                        >
                                            {showConfirmPassword ? (
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

                                <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={loading}>
                                    {loading ? 'Sending OTP...' : 'Register'}
                                </button>

                                <div className={styles.footer}>
                                    Already have an account?
                                    <Link href="/login" className={styles.link}>Sign In</Link>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleVerifyOTP} className={styles.form}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="otp" className={styles.label}>Enter Verification Code</label>
                                    <input
                                        type="text"
                                        id="otp"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className={styles.input}
                                        placeholder="EXAMPLE: 123456"
                                        required
                                    />
                                </div>

                                <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={loading}>
                                    {loading ? 'Verifying...' : 'Verify & Create Account'}
                                </button>

                                <button
                                    type="button"
                                    className={styles.toggleBtn}
                                    style={{ position: 'static', width: '100%', marginTop: '0.5rem', color: 'var(--text-secondary)' }}
                                    onClick={() => setStep('details')}
                                >
                                    Back to details
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
