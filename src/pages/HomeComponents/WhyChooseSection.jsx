import React from 'react';

const WhyChooseSection = ({ whyChoosePoints }) => {
    return (
        <section className="py-10 bg-[#0D0D0D] relative">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-4xl font-serif font-bold text-center text-[#F5E6C8] mb-2">
                    Why Choose <span className="text-[#C8A96A]">Sanyukt Parivaar</span>?
                </h2>
                <p className="text-center text-[#F5E6C8]/60 mb-6 max-w-2xl mx-auto text-xs md:text-base font-light leading-relaxed">
                    Discover what makes us the preferred choice for thousands of entrepreneurs who value trust, relationship, and growth.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {whyChoosePoints.map((point, index) => (
                        <div
                            key={index}
                            className="group p-4 bg-[#1A1A1A] rounded-[20px] border border-[#C8A96A]/5 hover:border-[#C8A96A]/30 hover:shadow-2xl hover:shadow-gold-900/10 transition-all duration-500 card-shine"
                        >
                            <div className="w-10 h-10 bg-gradient-to-br from-[#C8A96A] to-[#D4AF37] rounded-xl flex items-center justify-center text-[#0D0D0D] mb-2 group-hover:scale-110 transition-transform duration-500">
                                {React.cloneElement(point.icon, { className: "w-5 h-5" })}
                            </div>
                            <p className="text-[#F5E6C8] text-xs md:text-sm font-medium leading-relaxed">{point.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseSection;
