"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./ForgotPasswordModal.module.css";
import { X, MailCheck } from "lucide-react";

interface ForgotPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Mocking API call to send email
        setTimeout(() => {
            setLoading(false);
            setIsSent(true);

            // Redirect to the Reset Password page after showing success briefly
            setTimeout(() => {
                onClose();
                router.push('/reset-password');
            }, 2000);
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
                    <X size={18} />
                </button>

                {isSent ? (
                    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                            <MailCheck size={64} color="var(--accent)" strokeWidth={1.5} />
                        </div>
                        <h2 className={styles.title}>Email Sent!</h2>
                        <p className={styles.description}>
                            We&apos;ve sent a reset link to <strong>{email}</strong>. Opening the reset page for you...
                        </p>
                    </div>
                ) : (
                    <>
                        <div className={styles.header}>
                            <h2 className={styles.title}>Reset Password</h2>
                            <p className={styles.description}>
                                Enter your email address and we&apos;ll send you a link to restore your account.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="reset-email" className={styles.label}>Email Address</label>
                                <input
                                    type="email"
                                    id="reset-email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className={styles.input}
                                    autoFocus
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={styles.submitBtn}
                            >
                                {loading ? "Sending link..." : "Send Reset Link"}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
