"use client";

import React, { useState, useEffect } from 'react';
import styles from './InteractionBar.module.css';
import { MessageSquare, Share2, Bookmark, Flag } from 'lucide-react';
import ReportModal from './ReportModal';
import { useBookmarks } from '@/context/BookmarkContext';
import { useParams } from 'next/navigation';

export default function InteractionBar() {
    const [inkCount, setInkCount] = useState(124);
    const [isLiked, setIsLiked] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showShareTooltip, setShowShareTooltip] = useState(false);

    const { isBookmarked: checkBookmarked, toggleBookmark } = useBookmarks();
    const params = useParams();
    const slug = params?.slug as string;

    const isBookmarked = checkBookmarked(slug);

    // Report state
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show if scrolling up, hide if scrolling down
            // Also show if at the top of the page
            if (currentScrollY < lastScrollY || currentScrollY < 100) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const handleInk = () => {
        setInkCount(prev => prev + 1);
        setIsLiked(true);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 600);
    };

    const handleShare = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href);
            setShowShareTooltip(true);
            setTimeout(() => setShowShareTooltip(false), 2000);
        }
    };

    const handleCommentClick = () => {
        const commentSection = document.getElementById('comments');
        if (commentSection) {
            commentSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleBookmark = () => {
        if (slug) toggleBookmark(slug);
    };

    return (
        <>
            <div className={`${styles.bar} ${!isVisible ? styles.hidden : ''}`}>
                {/* Like / Ink Group */}
                <div className={styles.group}>
                    <button
                        className={`${styles.btn} ${styles.inkBtn} ${isLiked ? styles.active : ''} ${isAnimating ? styles.animating : ''}`}
                        onClick={handleInk}
                        aria-label="Give Ink"
                    >
                        {/* Keep Custom Ink Bottle Icon for the brand */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                        </svg>
                        <span className={styles.splat}></span>
                    </button>
                    <span className={styles.count}>{inkCount}</span>
                </div>

                <div className={styles.divider}></div>

                {/* Comment Group */}
                <div className={styles.group}>
                    <button className={styles.btn} onClick={handleCommentClick} aria-label="Comments">
                        <MessageSquare size={22} />
                    </button>
                    <span className={styles.count}>4</span>
                </div>

                <div className={styles.divider}></div>

                {/* Bookmark Group */}
                <div className={styles.group}>
                    <button
                        className={`${styles.btn} ${isBookmarked ? styles.active : ''}`}
                        onClick={handleBookmark}
                        aria-label="Save / Bookmark"
                    >
                        <Bookmark size={22} fill={isBookmarked ? "currentColor" : "none"} />
                    </button>
                </div>

                <div className={styles.divider}></div>

                {/* Share Group */}
                <div className={styles.group}>
                    <button className={styles.btn} onClick={handleShare} aria-label="Share">
                        <Share2 size={22} />
                        {showShareTooltip && (
                            <div className={`${styles.shareTooltip} ${styles.show}`}>
                                Copied!
                            </div>
                        )}
                    </button>
                </div>

                <div className={styles.divider}></div>

                {/* Report Group */}
                <div className={styles.group}>
                    <button
                        className={styles.btn}
                        onClick={() => setIsReportModalOpen(true)}
                        aria-label="Report"
                        title="Report this article"
                    >
                        <Flag size={22} />
                    </button>
                </div>
            </div>

            <ReportModal
                isOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                type="blog"
            />
        </>
    );
}
