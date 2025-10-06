
import React, { useContext } from 'react';
import SectionHeader from '../components/SectionHeader';
import Reveal from '../components/Reveal';
import Button from '../components/Button';
import { LanguageContext } from '../context/LanguageContext';
import { 
    ScaleIcon, SparklesIcon, LockClosedIcon, 
    RocketLaunchIcon, MapPinIcon 
} from '../components/icons';

const valueIcons: { [key: string]: React.ReactNode } = {
    accessibility: <ScaleIcon className="h-8 w-8 text-[#F36A10]" />,
    simplicity: <SparklesIcon className="h-8 w-8 text-[#F36A10]" />,
    trust: <LockClosedIcon className="h-8 w-8 text-[#F36A10]" />,
    innovation: <RocketLaunchIcon className="h-8 w-8 text-[#F36A10]" />,
    localization: <MapPinIcon className="h-8 w-8 text-[#F36A10]" />,
};

const ValueCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-card text-start">
        <div className="mb-3">{icon}</div>
        <h3 className="text-xl font-bold text-[#0F2233] mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const AboutPage: React.FC = () => {
    const { t } = useContext(LanguageContext)!;

    return (
        <div>
            {/* Hero Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <Reveal>
                        <SectionHeader 
                            title={t.about.hero.title}
                            subtitle={t.about.hero.subtitle}
                        />
                    </Reveal>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                    <Reveal>
                        <h2 className="text-3xl font-bold mb-4">{t.about.vision.title}</h2>
                        <p className="text-gray-600 text-lg" dangerouslySetInnerHTML={{ __html: t.about.vision.description }}></p>
                    </Reveal>
                    <Reveal>
                         <img src="https://picsum.photos/500/350?random=30" alt="Our Vision" className="rounded-2xl shadow-lg" />
                    </Reveal>
                </div>
            </section>

             {/* Our Story */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-3xl text-center">
                    <Reveal>
                        <SectionHeader 
                            eyebrow={t.about.story.eyebrow}
                            title={t.about.story.title}
                            subtitle={t.about.story.subtitle}
                        />
                    </Reveal>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <Reveal>
                        <SectionHeader title={t.about.values.title} />
                    </Reveal>
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {t.about.values.items.map((item, index) => (
                             <Reveal delay={(index + 1) * 0.1} key={item.id}>
                                <ValueCard 
                                    title={item.title} 
                                    description={item.description} 
                                    icon={valueIcons[item.id]} 
                                />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Final CTA */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <Reveal>
                        <h2 className="text-4xl font-extrabold text-[#0F2233] mb-4">{t.about.cta.title}</h2>
                        <div className="flex justify-center gap-4 mt-8">
                            <Button href="/pricing" variant="primary">{t.common.startFreeTrial}</Button>
                            <Button href="#" variant="secondary">{t.common.contactUs}</Button>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;