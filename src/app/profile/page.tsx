"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { Edit2, BookOpen, Clock, Heart, Camera, Save, X } from 'lucide-react';

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ name: '', bio: '', avatar: '' });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!loggedIn) {
            router.push('/login');
            return;
        }

        const userData = localStorage.getItem('currentUser');
        if (userData) {
            const parsed = JSON.parse(userData);
            setUser(parsed);
            setEditForm(parsed);
        }
        setIsLoading(false);
    }, [router]);

    const handleSave = () => {
        const updatedUser = { ...user, ...editForm };
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        setIsEditing(false);
    };

    if (isLoading) return null; // Or a loading spinner

    if (!user) return null;

    return (
        <div className={styles.container}>
            <div className={styles.profileHeader}>
                <div className={styles.avatarSection}>
                    <img src={user.avatar} alt={user.name} className={styles.avatar} />
                    {isEditing && (
                        <button className={styles.editAvatarBtn} title="Change Avatar">
                            <Camera size={16} />
                        </button>
                    )}
                </div>

                <div className={styles.infoSection}>
                    {isEditing ? (
                        <div className={styles.editForm}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Full Name</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    value={editForm.name}
                                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Bio</label>
                                <textarea
                                    className={styles.textarea}
                                    value={editForm.bio}
                                    onChange={e => setEditForm({ ...editForm, bio: e.target.value })}
                                />
                            </div>
                            <div className={styles.buttonGroup}>
                                <button className={styles.cancelBtn} onClick={() => setIsEditing(false)}>
                                    <X size={18} style={{ marginRight: '0.5rem' }} /> Cancel
                                </button>
                                <button className={styles.saveBtn} onClick={handleSave}>
                                    <Save size={18} style={{ marginRight: '0.5rem' }} /> Save Changes
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className={styles.nameRow}>
                                <div>
                                    <h1 className={styles.name}>{user.name}</h1>
                                    <p className={styles.email}>{user.email}</p>
                                </div>
                                <button className={styles.editBtn} onClick={() => setIsEditing(true)}>
                                    <Edit2 size={16} />
                                    <span>Edit Profile</span>
                                </button>
                            </div>

                            <div className={styles.bioSection}>
                                <span className={styles.bioLabel}>About</span>
                                <p className={styles.bioText}>{user.bio || "No bio yet."}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <h2 className={styles.sectionTitle}>Analytics</h2>
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}><BookOpen size={24} /></div>
                    <div className={styles.statInfo}>
                        <span className={styles.statValue}>42</span>
                        <span className={styles.statLabel}>Stories Read</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}><Clock size={24} /></div>
                    <div className={styles.statInfo}>
                        <span className={styles.statValue}>12.5h</span>
                        <span className={styles.statLabel}>Reading Time</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}><Heart size={24} /></div>
                    <div className={styles.statInfo}>
                        <span className={styles.statValue}>128</span>
                        <span className={styles.statLabel}>Appreciations</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
