
import React, { useContext } from 'react';
import SectionHeader from '../components/SectionHeader';
import Reveal from '../components/Reveal';
import Button from '../components/Button';
import AnimatedNumber from '../components/AnimatedNumber';
import { LanguageContext } from '../context/LanguageContext';

interface UseCaseBlockProps {
    eyebrow: string;
    title: string;
    description: string;
    stats: { value: number; label: string, suffix?: string, prefix?: string }[];
    imageUrl: string;
    reverse?: boolean;
}

const UseCaseBlock: React.FC<UseCaseBlockProps> = ({ eyebrow, title, description, stats, imageUrl, reverse = false }) => (
    <div className={`grid md:grid-cols-2 gap-12 items-center ${reverse ? 'md:grid-flow-col-dense' : ''}`}>
        <Reveal className={`${reverse ? 'md:col-start-2' : ''}`}>
            <img src={imageUrl} alt={title} className="rounded-2xl shadow-lg" />
        </Reveal>
        <Reveal>
            <p className="text-sm font-semibold text-[#F36A10] uppercase tracking-wider mb-2">{eyebrow}</p>
            <h3 className="text-3xl font-bold mb-4">{title}</h3>
            <p className="text-gray-600 mb-8">{description}</p>
            <div className="flex space-x-8 rtl:space-x-reverse">
                {stats.map(stat => (
                    <div key={stat.label}>
                        <p className="text-4xl font-extrabold text-[#F36A10]">
                            <AnimatedNumber to={stat.value} suffix={stat.suffix || ''} />
                        </p>
                        <p className="text-gray-500">{stat.label}</p>
                    </div>
                ))}
            </div>
        </Reveal>
    </div>
);


const SolutionsPage: React.FC = () => {
    const { t } = useContext(LanguageContext)!;

    return (
        <div>
            {/* Hero Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <Reveal>
                        <SectionHeader 
                            title={t.solutions.hero.title}
                            subtitle={t.solutions.hero.subtitle}
                        />
                    </Reveal>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-20">
                <div className="container mx-auto px-6 space-y-24">
                    <UseCaseBlock 
                        eyebrow={t.solutions.useCases.ecommerce.eyebrow}
                        title={t.solutions.useCases.ecommerce.title}
                        description={t.solutions.useCases.ecommerce.description}
                        stats={t.solutions.useCases.ecommerce.stats}
                        imageUrl="https://picsum.photos/500/400?random=20"
                    />
                     <UseCaseBlock 
                        eyebrow={t.solutions.useCases.support.eyebrow}
                        title={t.solutions.useCases.support.title}
                        description={t.solutions.useCases.support.description}
                        stats={t.solutions.useCases.support.stats}
                        imageUrl="https://picsum.photos/500/400?random=21"
                        reverse
                    />
                     <UseCaseBlock 
                        eyebrow={t.solutions.useCases.enterprise.eyebrow}
                        title={t.solutions.useCases.enterprise.title}
                        description={t.solutions.useCases.enterprise.description}
                        stats={t.solutions.useCases.enterprise.stats}
                        imageUrl="https://picsum.photos/500/400?random=22"
                    />
                </div>
            </section>

             {/* CTA */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <Reveal>
                        <h2 className="text-4xl font-extrabold text-[#0F2233] mb-4">{t.solutions.cta.title}</h2>
                        <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-8">{t.solutions.cta.subtitle}</p>
                        <div className="flex justify-center gap-4">
                            <Button href="/pricing" variant="primary">{t.common.tryFree}</Button>
                            <Button href="#" variant="secondary">{t.solutions.cta.button}</Button>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
};

export default SolutionsPage;