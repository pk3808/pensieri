"use client";

import React from 'react';
import styles from './Newsletter.module.css';

export default function Newsletter() {
    return (
        <section className={styles.newsletterSection}>
            <div className="container">
                <div className={styles.newsletterContainer}>

                    <div className={styles.newsletterTextSide}>
                        <h2 className={styles.newsletterTitle}>The Weekly Digest</h2>
                        <p className={styles.newsletterText}>
                            Curated stories on design, culture, and tech. Delivered every Sunday.
                        </p>
                    </div>

                    <div className={styles.newsletterFormSide}>
                        <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className={styles.newsletterInput}
                            />
                            <button type="submit" className={styles.subscribeBtn}>
                                Subscribe
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}
