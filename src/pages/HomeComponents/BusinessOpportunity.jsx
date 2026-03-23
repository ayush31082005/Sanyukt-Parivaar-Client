import React from 'react';
import { Check } from 'lucide-react';

const BusinessOpportunity = ({ businessHighlights, businessImage, handleNavigation }) => {
    return (
        <section className="py-10 bg-[#0D0D0D] text-white relative overflow-hidden active-glow border-y border-[#C8A96A]/10" >
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-3">
                        <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#F5E6C8] mb-3 leading-tight">
                            A Powerful <span className="text-[#C8A96A]">Business Opportunity</span>
                        </h2>
                        <p className="text-[#F5E6C8]/80 text-sm font-light leading-relaxed mb-4">
                            Sanyukt Parivaar & Rich Life Pvt.Ltd. offers a proven MLM business plan that allows individuals to earn through product sales, team building, and leadership development.
                        </p>
                        <div className="space-y-2 mb-5">
                            {businessHighlights.map((highlight, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <div className="w-5 h-5 rounded-full bg-[#C8A96A]/20 flex items-center justify-center flex-shrink-0">
                                        <Check className="w-3 h-3 text-[#C8A96A]" />
                                    </div>
                                    <span className="text-sm text-[#F5E6C8]/90 font-medium">{highlight}</span>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => handleNavigation('/opportunity')}
                            className="inline-block px-8 py-3 bg-gradient-to-r from-[#C8A96A] to-[#D4AF37] text-[#0D0D0D] text-xs font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-gold-900/20 uppercase tracking-widest"
                        >
                            View Opportunities
                        </button>
                    </div>
                    <div className="relative">
                        <img src={businessImage} alt="Business Opportunity" className="rounded-lg shadow-2xl w-full h-40 md:h-56 object-cover" />
                        <div className="absolute -top-4 -right-4 bg-gradient-to-br from-[#C8A96A] to-[#D4AF37] p-5 rounded-2xl shadow-2xl glass-morphism border border-white/20">
                            <div className="text-xl font-bold text-[#0D0D0D]">Unlimited</div>
                            <div className="text-[10px] font-bold text-[#0D0D0D]/70 uppercase tracking-widest">Income Potential</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BusinessOpportunity;
