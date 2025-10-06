
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import SectionHeader from '../components/SectionHeader';
import Reveal, { StaggeredReveal, childVariants } from '../components/Reveal';
import { CheckCircleIcon, CodeBracketIcon, ShoppingCartIcon, DocumentTextIcon, ChatBubbleOvalLeftEllipsisIcon } from '../components/icons';
import { LanguageContext } from '../context/LanguageContext';

const featureCards = [
    { 
        titleKey: 'noCode',
        descriptionKey: 'noCodeDesc',
        icon: <CodeBracketIcon className="h-6 w-6" /> 
    },
    { 
        titleKey: 'ecommerce',
        descriptionKey: 'ecommerceDesc',
        icon: <ShoppingCartIcon className="h-6 w-6" /> 
    },
    { 
        titleKey: 'document',
        descriptionKey: 'documentDesc',
        icon: <DocumentTextIcon className="h-6 w-6" /> 
    },
    { 
        titleKey: 'omnichannel',
        descriptionKey: 'omnichannelDesc',
        icon: <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" /> 
    },
];

const FeatureCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
    <motion.div variants={childVariants} className="bg-white p-6 rounded-2xl shadow-card hover:shadow-xl transition-shadow duration-300">
        <div className="bg-[#F36A10]/10 text-[#F36A10] rounded-xl p-3 w-12 h-12 mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </motion.div>
);

const TestimonialCard: React.FC<{ quote: string; author: string; location: string; }> = ({ quote, author, location }) => (
     <motion.div variants={childVariants} className="bg-white p-8 rounded-2xl shadow-card text-center">
        <p className="text-lg text-gray-700 italic mb-6">"{quote}"</p>
        <div>
            <p className="font-bold text-[#0F2233]">{author}</p>
            <p className="text-gray-500">{location}</p>
        </div>
     </motion.div>
);


const HomePage: React.FC = () => {
  const { t } = useContext(LanguageContext)!;

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 text-center bg-grid-pattern">
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F8F9FB]"></div>
        <div className="container mx-auto px-6 relative">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#0F2233] leading-tight mb-6" dangerouslySetInnerHTML={{ __html: t.home.heroTitle }}></h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 mb-8">
              {t.home.heroSubtitle}
            </p>
            <div className="flex justify-center gap-4 mb-4">
              <Button href="/pricing" variant="primary" data-cta="try-free-hero">{t.common.tryFree}</Button>
              <Button href="#" variant="secondary">{t.common.bookDemo}</Button>
            </div>
            <p className="text-sm text-gray-500">{t.home.heroCaption}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-16 max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-4">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-400">{t.home.dashboardMockup}</p>
                </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <StaggeredReveal className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featureCards.map(card => (
                <FeatureCard 
                    key={card.titleKey}
                    title={t.home.features[card.titleKey]}
                    description={t.home.features[card.descriptionKey]}
                    icon={card.icon} 
                />
            ))}
          </StaggeredReveal>
        </div>
      </section>

      {/* Feature Details Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
            <Reveal>
                <SectionHeader 
                    eyebrow={t.home.featureSection.eyebrow}
                    title={t.home.featureSection.title}
                    subtitle={t.home.featureSection.subtitle}
                />
            </Reveal>
            <div className="mt-16 grid lg:grid-cols-2 gap-16 items-center">
                <Reveal>
                    <img src="https://picsum.photos/600/500?random=10" alt="E-commerce Integration" className="rounded-2xl shadow-lg"/>
                </Reveal>
                <Reveal>
                    <h3 className="text-3xl font-bold mb-4">{t.home.salesAssistant.title}</h3>
                    <p className="text-gray-600 mb-6">{t.home.salesAssistant.description}</p>
                    <ul className="space-y-3">
                        {t.home.salesAssistant.points.map((point, i) => (
                           <li key={i} className="flex items-start"><CheckCircleIcon className="h-6 w-6 text-[#F36A10] ltr:mr-3 rtl:ml-3 flex-shrink-0 mt-1" /><span>{point}</span></li>
                        ))}
                    </ul>
                </Reveal>
            </div>
             <div className="mt-24 grid lg:grid-cols-2 gap-16 items-center">
                 <Reveal className="lg:order-2">
                    <img src="https://picsum.photos/600/500?random=11" alt="Intelligent Knowledge Training" className="rounded-2xl shadow-lg"/>
                </Reveal>
                <Reveal className="lg:order-1">
                    <h3 className="text-3xl font-bold mb-4">{t.home.teachBot.title}</h3>
                    <p className="text-gray-600 mb-6">{t.home.teachBot.description}</p>
                    <ul className="space-y-3">
                        {t.home.teachBot.points.map((point, i) => (
                           <li key={i} className="flex items-start"><CheckCircleIcon className="h-6 w-6 text-[#F36A10] ltr:mr-3 rtl:ml-3 flex-shrink-0 mt-1" /><span>{point}</span></li>
                        ))}
                    </ul>
                </Reveal>
            </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
            <Reveal>
                 <SectionHeader 
                    eyebrow={t.home.testimonials.eyebrow}
                    title={t.home.testimonials.title}
                />
            </Reveal>
            <StaggeredReveal className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <TestimonialCard quote={t.home.testimonials.testimonial1.quote} author={t.home.testimonials.testimonial1.author} location={t.home.testimonials.testimonial1.location} />
                <TestimonialCard quote={t.home.testimonials.testimonial2.quote} author={t.home.testimonials.testimonial2.author} location={t.home.testimonials.testimonial2.location} />
            </StaggeredReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
            <Reveal>
                <h2 className="text-4xl font-extrabold text-[#0F2233] mb-4">{t.home.cta.title}</h2>
                <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-8">{t.home.cta.subtitle}</p>
                <div className="flex justify-center gap-4">
                    <Button href="/pricing" variant="primary" data-cta="try-free-footer">{t.common.tryFree}</Button>
                    <Button href="#" variant="secondary">{t.common.bookDemo}</Button>
                </div>
            </Reveal>
        </div>
      </section>
    </div>
  );
};

export default HomePage;