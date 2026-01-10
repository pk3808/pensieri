"use client";

import React from 'react';
import styles from './BrandedLoader.module.css';
import { useBookmarks } from '@/context/BookmarkContext';
import { MOCK_BLOGS } from '@/data/mockData';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';

const WRITING_QUOTES = [
    "“Writing is painting to voice.”",
    "“The pen is the tongue of the mind.”",
    "“Poetry is truth in its Sunday clothes.”",
    "“Start writing, no matter what. The water does not flow until the faucet is turned on.”",
    "“There is no greater agony than bearing an untold story inside you.”",
    "“Fill your paper with the breathings of your heart.”",
    "“Words are our most inexhaustible source of magic.”"
];

interface BrandedLoaderProps {
    text?: string;
    fullScreen?: boolean;
    showQuotes?: boolean;
}

export default function BrandedLoader({ text = "Loading Experience...", fullScreen = true, showQuotes = false }: BrandedLoaderProps) {
    const { bookmarks } = useBookmarks();
    const [quote, setQuote] = React.useState(text);

    React.useEffect(() => {
        if (showQuotes) {
            const randomQuote = WRITING_QUOTES[Math.floor(Math.random() * WRITING_QUOTES.length)];
            setQuote(randomQuote);
        }
    }, [showQuotes]);

    return (
        <div className={styles.loaderContainer} style={!fullScreen ? { height: '100%', minHeight: '300px' } : {}}>
            <div className={styles.logoWrapper}>
                <div className={styles.ripple}></div>
                <div className={styles.ripple}></div>
                <img src="/inkwise.png" alt="Logo" className={styles.logoImage} />
            </div>

            <span className={styles.loadingText} style={showQuotes ? { textTransform: 'none', fontStyle: 'italic', maxWidth: '600px', textAlign: 'center', lineHeight: '1.5' } : {}}>
                {quote}
            </span>

            <div className={styles.progressBar}>
                <div className={styles.progressFill}></div>
            </div>

            {bookmarks.length > 0 && showQuotes && (
                <div className={styles.savedReads}>
                    <div className={styles.savedHeader}>
                        <Bookmark size={16} className={styles.savedIcon} />
                        <span>Your Saved Reads</span>
                    </div>
                    <div className={styles.savedList}>
                        {MOCK_BLOGS.filter(blog => bookmarks.includes(blog.slug)).slice(0, 3).map(blog => (
                            <Link key={blog.slug} href={`/blog/${blog.slug}`} className={styles.savedItem}>
                                {blog.title}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
