
import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import Reveal from '../components/Reveal';
import Button from '../components/Button';
import { ChevronDownIcon } from '../components/icons';
import { LanguageContext } from '../context/LanguageContext';

const FaqAccordion: React.FC<{ question: string; answer: string; }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 py-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left"
            >
                <h3 className="text-lg font-semibold">{question}</h3>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDownIcon className="h-6 w-6 text-gray-500" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <p className="pt-4 text-gray-600">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FaqPage: React.FC = () => {
    const { t } = useContext(LanguageContext)!;

    return (
        <div>
            {/* Hero Section */}
            <section className="py-20">
                <div className="container mx-auto px-6 text-center">
                    <Reveal>
                        <SectionHeader 
                            title={t.faq.hero.title}
                            subtitle={t.faq.hero.subtitle}
                        />
                    </Reveal>
                </div>
            </section>

            {/* FAQ Accordions */}
            <section className="pb-20">
                <div className="container mx-auto px-6 max-w-3xl">
                    {t.FAQ_DATA.map(category => (
                        <div key={category.title} className="mb-12">
                            <Reveal>
                                <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
                                {category.items.map(item => <FaqAccordion key={item.question} question={item.question} answer={item.answer} />)}
                            </Reveal>
                        </div>
                    ))}
                </div>
            </section>

             {/* Final Help CTA */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <Reveal>
                        <h2 className="text-4xl font-extrabold text-[#0F2233] mb-4">{t.faq.cta.title}</h2>
                        <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-8">{t.faq.cta.subtitle}</p>
                        <div className="flex justify-center gap-4">
                            <Button href="#" variant="secondary">{t.faq.cta.button1}</Button>
                            <Button href="#" variant="primary">{t.faq.cta.button2}</Button>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
};

export default FaqPage;