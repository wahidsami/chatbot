
import React, { useContext } from 'react';
import SectionHeader from '../components/SectionHeader';
import Reveal, { StaggeredReveal, childVariants } from '../components/Reveal';
import Button from '../components/Button';
import { motion } from 'framer-motion';
import { LanguageContext } from '../context/LanguageContext';
import { 
    CodeBracketIcon, ShoppingCartIcon, DocumentTextIcon, ChatBubbleOvalLeftEllipsisIcon,
    TicketIcon, ChartBarIcon, PaintBrushIcon, GlobeAltIcon, ShieldCheckIcon,
    MicrophoneIcon, CircleStackIcon, AdjustmentsHorizontalIcon, BuildingLibraryIcon
} from '../components/icons';

const featureIcons: { [key: string]: React.ReactNode } = {
    'noCode': <CodeBracketIcon className="h-8 w-8 text-[#F36A10]" />,
    'ecommerce': <ShoppingCartIcon className="h-8 w-8 text-[#F36A10]" />,
    'knowledge': <DocumentTextIcon className="h-8 w-8 text-[#F36A10]" />,
    'multiChannel': <ChatBubbleOvalLeftEllipsisIcon className="h-8 w-8 text-[#F36A10]" />,
    'handoff': <TicketIcon className="h-8 w-8 text-[#F36A10]" />,
    'analytics': <ChartBarIcon className="h-8 w-8 text-[#F36A10]" />,
    'personalization': <PaintBrushIcon className="h-8 w-8 text-[#F36A10]" />,
    'multiLanguage': <GlobeAltIcon className="h-8 w-8 text-[#F36A10]" />,
    'security': <ShieldCheckIcon className="h-8 w-8 text-[#F36A10]" />,
};

const addonIcons: { [key: string]: React.ReactNode } = {
    'voice': <MicrophoneIcon className="h-10 w-10 mx-auto text-gray-400" />,
    'crm': <CircleStackIcon className="h-10 w-10 mx-auto text-gray-400" />,
    'tuning': <AdjustmentsHorizontalIcon className="h-10 w-10 mx-auto text-gray-400" />,
    'reseller': <BuildingLibraryIcon className="h-10 w-10 mx-auto text-gray-400" />,
}

const FeatureBlock: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
    <motion.div variants={childVariants} className="bg-white p-6 rounded-xl shadow-card flex flex-col items-start text-start">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-[#0F2233] mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </motion.div>
);

const FeaturesPage: React.FC = () => {
  const { t } = useContext(LanguageContext)!;

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F2233] mb-4">
              {t.features.hero.title}
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              {t.features.hero.subtitle}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <StaggeredReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.features.featureList.map(feature => (
              <FeatureBlock key={feature.id} title={feature.title} description={feature.description} icon={featureIcons[feature.id]} />
            ))}
          </StaggeredReveal>
        </div>
      </section>

      {/* Add-Ons / Roadmap Section */}
      <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
              <Reveal>
                  <SectionHeader
                      eyebrow={t.features.addons.eyebrow}
                      title={t.features.addons.title}
                      subtitle={t.features.addons.subtitle}
                  />
              </Reveal>
              <div className="mt-12 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  {t.features.addons.items.map((item, index) => (
                    <Reveal delay={(index + 1) * 0.1} key={item.id}>
                        <div className="p-4">
                            {addonIcons[item.id]}
                            <h4 className="font-bold text-lg mt-4">{item.title}</h4>
                        </div>
                    </Reveal>
                  ))}
              </div>
          </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-4xl font-extrabold text-[#0F2233] mb-4">{t.features.cta.title}</h2>
            <div className="flex justify-center gap-4 mt-8">
              <Button href="/pricing" variant="primary" data-cta="try-free">{t.common.tryFree}</Button>
              <Button href="#" variant="secondary">{t.common.bookDemo}</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;