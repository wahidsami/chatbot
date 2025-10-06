
import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '../components/Reveal';
import Button from '../components/Button';
import SectionHeader from '../components/SectionHeader';
import { BlogPost } from '../types';
import { LanguageContext } from '../context/LanguageContext';

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-card overflow-hidden group"
    >
        <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="p-6">
            <p className="text-sm text-[#F36A10] font-semibold mb-2">{post.category}</p>
            <h3 className="text-xl font-bold mb-3 h-14">{post.title}</h3>
            <div className="text-sm text-gray-500 flex justify-between items-center">
                <span>{post.author}</span>
                <span>{post.readTime}</span>
            </div>
        </div>
    </motion.div>
);

const BlogPage: React.FC = () => {
    const { t } = useContext(LanguageContext)!;
    const [activeCategory, setActiveCategory] = useState('All');
    
    const filteredPosts = activeCategory === 'All' || activeCategory === t.BLOG_CATEGORIES[0]
        ? t.BLOG_POSTS
        : t.BLOG_POSTS.filter((post: BlogPost) => post.category === activeCategory);

    return (
        <div>
            {/* Hero Section */}
            <section className="py-20">
                <div className="container mx-auto px-6 text-center">
                    <Reveal>
                        <SectionHeader 
                            title={t.blog.hero.title}
                            subtitle={t.blog.hero.subtitle}
                        />
                    </Reveal>
                </div>
            </section>

            {/* Categories & Posts */}
            <section className="pb-20">
                <div className="container mx-auto px-6">
                    <div className="flex justify-center flex-wrap gap-2 mb-12">
                        {t.BLOG_CATEGORIES.map((category: string) => (
                            <button 
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                                    activeCategory === category 
                                        ? 'bg-[#0F2233] text-white' 
                                        : 'bg-white text-[#0F2233] hover:bg-gray-100'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                           {filteredPosts.map((post: BlogPost) => <BlogCard key={post.id} post={post} />)}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <Reveal>
                         <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-3xl font-bold mb-4">{t.blog.newsletter.title}</h2>
                            <p className="text-gray-600 mb-8">{t.blog.newsletter.subtitle}</p>
                            <form className="flex flex-col sm:flex-row gap-4">
                                <input type="email" placeholder={t.blog.newsletter.placeholder} className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F36A10] focus:outline-none" />
                                <Button type="submit" variant="primary">{t.blog.newsletter.button}</Button>
                            </form>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
};

export default BlogPage;