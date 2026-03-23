import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HeroSection = ({ currentSlide, setCurrentSlide, heroSlides, isLoggedIn, userRole, handleNavigation }) => {
    // Content always LEFT, Image always RIGHT

    return (
        <section className="relative h-[calc(100vh-80px)] overflow-hidden bg-[#0D0D0D]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                >
                    <div className="container mx-auto px-6 h-full flex items-center relative z-20 py-6">
                        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center w-full">
                            
                            {/* Content Side */}
                            <motion.div
                                initial={{ x: -60, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="space-y-4 text-center md:text-left"
                            >
                                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-[#F5E6C8] tracking-tight">
                                    {heroSlides[currentSlide].title}
                                </h1>
                                <h2 className="text-sm sm:text-lg md:text-xl text-[#C8A96A] font-bold uppercase tracking-[0.3em]">
                                    {heroSlides[currentSlide].subtitle}
                                </h2>
                                <p className="text-xs sm:text-sm md:text-base text-[#F5E6C8]/60 leading-relaxed font-light max-w-xl">
                                    {heroSlides[currentSlide].description}
                                </p>
                                <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            if (isLoggedIn) {
                                                handleNavigation(userRole === 'admin' ? '/admin/dashboard' : '/my-account');
                                            } else {
                                                handleNavigation('/register');
                                            }
                                        }}
                                        className="px-6 py-3 bg-gradient-to-r from-[#C8A96A] to-[#D4AF37] text-[#0D0D0D] font-bold rounded-full hover:shadow-xl transition-all shadow-lg flex items-center space-x-2 text-sm"
                                    >
                                        <span>
                                            {isLoggedIn
                                                ? (userRole === 'admin' ? 'Admin Dashboard' : 'User Dashboard')
                                                : 'Join Now'
                                            }
                                        </span>
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleNavigation('/contact')}
                                        className="px-6 py-3 border-2 border-[#C8A96A]/30 text-[#F5E6C8] font-bold rounded-full hover:bg-[#C8A96A] hover:text-[#0D0D0D] transition-all text-sm"
                                    >
                                        Contact Us
                                    </motion.button>
                                </div>
                            </motion.div>

                            {/* Image Side */}
                            <motion.div
                                initial={{ x: 60, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="relative"
                            >
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#C8A96A]/10">
                                    <img
                                        src={heroSlides[currentSlide].image}
                                        alt={`Slide ${currentSlide + 1}`}
                                        className="w-full h-[250px] sm:h-[300px] md:h-[380px] object-cover"
                                    />
                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/40 via-transparent to-[#0D0D0D]/20"></div>
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-[#C8A96A]/20 rounded-3xl -z-10"></div>
                                <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-[#C8A96A]/10 rounded-2xl -z-10"></div>
                            </motion.div>

                        </div>
                    </div>

                    {/* Background subtle gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D0D] via-[#121212] to-[#0D0D0D] z-0"></div>
                </motion.div>
            </AnimatePresence>

            {/* Slide indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-10 bg-[#C8A96A]' : 'bg-white/30 hover:bg-white'}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSection;
