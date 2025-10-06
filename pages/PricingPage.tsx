import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import SectionHeader from '../components/SectionHeader';
import Reveal, { StaggeredReveal, childVariants } from '../components/Reveal';
import { CheckCircleIcon } from '../components/icons';
import { LanguageContext } from '../context/LanguageContext';
import { PricingPlan } from '../types';

const PlanToggle: React.FC<{ billingCycle: 'monthly' | 'annually'; setBillingCycle: (cycle: 'monthly' | 'annually') => void; monthlyLabel: string; annuallyLabel: string; saveLabel: string; }> = ({ billingCycle, setBillingCycle, monthlyLabel, annuallyLabel, saveLabel }) => {
    return (
        <div className="relative flex items-center p-1 bg-gray-200 rounded-full w-fit mx-auto">
             <motion.div
                className="absolute h-[calc(100%-0.5rem)] w-1/2 bg-white rounded-full shadow-md"
                initial={false}
                animate={{ x: billingCycle === 'monthly' ? '0%' : '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
            <button onClick={() => setBillingCycle('monthly')} className={`relative px-6 py-2 rounded-full text-sm font-semibold transition-colors ${billingCycle === 'monthly' ? 'text-[#0F2233]' : 'text-gray-500'}`}>{monthlyLabel}</button>
            <button onClick={() => setBillingCycle('annually')} className={`relative px-6 py-2 rounded-full text-sm font-semibold transition-colors ${billingCycle === 'annually' ? 'text-[#0F2233]' : 'text-gray-500'}`}>
                {annuallyLabel} <span className="text-[#F36A10]">({saveLabel})</span>
            </button>
        </div>
    );
};

// Fix: Pass translation strings for 'free' and 'custom' as props to fix "Cannot find name 't'" error.
const PricingCard: React.FC<{ plan: PricingPlan; billingCycle: 'monthly' | 'annually'; popularLabel: string; buttonLabel: string; perMonthLabel: string; freeLabel: string; customLabel: string;}> = ({ plan, billingCycle, popularLabel, buttonLabel, perMonthLabel, freeLabel, customLabel }) => {
    return (
        <motion.div variants={childVariants} className={`p-8 rounded-2xl border-2 ${plan.isPopular ? 'border-[#F36A10] shadow-2xl' : 'border-gray-200 bg-white'}`}>
             {plan.isPopular && <p className="text-center font-semibold bg-[#F36A10] text-white py-1 px-4 rounded-full w-fit mx-auto -mt-12 mb-6">{popularLabel}</p>}
             <h3 className="text-2xl font-bold text-center mb-2">{plan.name}</h3>
             <p className="text-gray-600 text-center mb-6 h-12">{plan.description}</p>
             <p className="text-center mb-8">
                <span className="text-5xl font-extrabold">{plan.price[billingCycle]}</span>
                <span className="text-gray-500">{plan.price.monthly !== freeLabel && plan.price.monthly !== customLabel ? perMonthLabel : ''}</span>
             </p>
             <Button href="#" variant={plan.isPopular ? 'primary' : 'secondary'} fullWidth>{buttonLabel}</Button>
             <ul className="mt-8 space-y-4">
                {plan.features.map(feature => (
                    <li key={feature} className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 ltr:mr-3 rtl:ml-3 mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                    </li>
                ))}
             </ul>
        </motion.div>
    );
};

const PricingPage: React.FC = () => {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');
    const { t } = useContext(LanguageContext)!;

    return (
        <div>
            {/* Hero Section */}
            <section className="py-20">
                <div className="container mx-auto px-6 text-center">
                    <Reveal>
                        <SectionHeader 
                            title={t.pricing.hero.title}
                            subtitle={t.pricing.hero.subtitle}
                        />
                        <div className="mt-8">
                             <PlanToggle 
                                billingCycle={billingCycle} 
                                setBillingCycle={setBillingCycle}
                                monthlyLabel={t.pricing.monthly}
                                annuallyLabel={t.pricing.annually}
                                saveLabel={t.pricing.save}
                            />
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Pricing Plans */}
            <section className="pb-20">
                <div className="container mx-auto px-6">
                    <StaggeredReveal className="grid lg:grid-cols-4 gap-8 items-start">
                        {t.PRICING_PLANS.map((plan: PricingPlan) => <PricingCard key={plan.name} plan={plan} billingCycle={billingCycle} popularLabel={t.pricing.mostPopular} buttonLabel={t.common.getStarted} perMonthLabel={t.pricing.perMonth} freeLabel={t.pricing.free} customLabel={t.pricing.custom} />)}
                    </StaggeredReveal>
                </div>
            </section>

            {/* Feature Comparison */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <Reveal>
                        {/* Fix: Add `compare` property to `t.pricing` in i18n.ts to resolve this error. */}
                        <SectionHeader title={t.pricing.compare.title} />
                    </Reveal>
                     <div className="mt-12 overflow-x-auto">
                        <table className="w-full min-w-[800px] ltr:text-left rtl:text-right">
                            <thead>
                                <tr>
                                    <th className="p-4 w-1/3"></th>
                                    {t.PRICING_PLANS.map((p: PricingPlan) => <th key={p.name} className="p-4 text-center font-bold text-lg">{p.name}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {t.PLAN_FEATURES.map((feature, index) => (
                                    <tr key={feature.name} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                        <td className="p-4 font-semibold">{feature.name}</td>
                                        <td className="p-4 text-center">{typeof feature.starter === 'boolean' ? (feature.starter ? '✔️' : '—') : feature.starter}</td>
                                        <td className="p-4 text-center">{typeof feature.growth === 'boolean' ? (feature.growth ? '✔️' : '—') : feature.growth}</td>
                                        <td className="p-4 text-center">{typeof feature.pro === 'boolean' ? (feature.pro ? '✔️' : '—') : feature.pro}</td>
                                        <td className="p-4 text-center">{typeof feature.enterprise === 'boolean' ? (feature.enterprise ? '✔️' : '—') : feature.enterprise}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PricingPage;