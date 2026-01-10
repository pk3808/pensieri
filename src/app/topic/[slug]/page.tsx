import { MOCK_BLOGS, CATEGORIES } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import styles from "../../page.module.css"; // Reuse main styles for grid
import textStyles from "../../static.module.css"; // Reuse header typography

export function generateStaticParams() {
    return CATEGORIES.map((cat) => ({
        slug: cat.slug,
    }));
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const category = CATEGORIES.find((c) => c.slug === slug);
    const blogs = MOCK_BLOGS.filter((b) => b.category.toLowerCase() === slug.toLowerCase());

    if (!category) {
        return <div>Topic not found</div>;
    }

    return (
        <main className={styles.main}>
            <Navbar />

            <div className="container">
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <header className={textStyles.header} style={{ marginTop: '4rem' }}>
                        <h1 className={textStyles.title} style={{ fontSize: '3.5rem' }}>{category.name}</h1>
                        <p className={textStyles.subtitle}>
                            Explore our best stories on {category.name.toLowerCase()}.
                        </p>
                    </header>
                </div>

                <div className={styles.simpleGrid} style={{
                    marginTop: '4rem',
                    marginBottom: '6rem',
                }}>
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <BlogCard key={blog.slug} blog={blog} />
                        ))
                    ) : (
                        <p>No stories found for this topic yet.</p>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    );
}
