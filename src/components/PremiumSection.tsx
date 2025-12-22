import Link from 'next/link';
import styles from './PremiumSection.module.css';
import { PREMIUM_BLOGS } from '@/data/mockData';
import { useState, useEffect } from 'react';

export default function PremiumSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            // Trigger Exit Animation
            setIsExiting(true);

            // Wait for exit animation to complete (400ms) before swapping data
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % PREMIUM_BLOGS.length);
                setIsExiting(false); // This triggers entry animation for new content
            }, 400);

        }, 5000 + 400); // Add delay to total cycle

        return () => clearInterval(interval);
    }, [isPaused]);

    // Reorder blogs so currentIndex is always the first (featured) item
    const displayedBlogs = [
        ...PREMIUM_BLOGS.slice(currentIndex),
        ...PREMIUM_BLOGS.slice(0, currentIndex)
    ];

    return (
        <section className={styles.premiumSection}>
            <div className={`container ${styles.container}`}>
                <header className={styles.header}>
                    <span className={styles.label}>Pensieri Black</span>
                    <h2 className={styles.title}>The Collection</h2>
                    <p className={styles.subtitle}>
                        Curated deep dives and masterclasses.
                    </p>
                </header>

                <div
                    className={styles.grid}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {displayedBlogs.map((blog, index) => {
                        const isFeatured = index === 0;
                        return (
                            <div
                                key={`${blog.slug}-${currentIndex}`} // Unique key forces animation on rotation
                                className={`
                                    ${styles.card} 
                                    ${isFeatured ? styles.featured : styles.standard}
                                    ${isExiting ? styles.exiting : ''}
                                `}
                            >
                                {/* Background Image covering entire card */}
                                <img src={blog.image} alt={blog.title} className={styles.bgImage} />

                                {/* Dark Gradient Overlay */}
                                <div className={styles.overlay} />

                                {/* Content overlaid on image */}
                                <div className={styles.cardContent}>
                                    {/* Floating Glass Tags - Moved inside for flex spacing */}
                                    <div className={styles.topTags}>
                                        <span className={styles.glassTag}>
                                            {blog.category}
                                        </span>
                                        <span className={styles.glassTag}>
                                            {/* Lock Icon */}
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                            </svg>
                                            Premium
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className={styles.cardTitle}>{blog.title}</h3>
                                        {isFeatured && <p className={styles.excerpt}>{blog.excerpt}</p>}

                                        <div className={styles.footer}>
                                            <span className={styles.author}>{blog.author}</span>
                                            <span>•</span>
                                            <span>{blog.readTime}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Action Button */}
                                <div className={styles.actionBtn}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
