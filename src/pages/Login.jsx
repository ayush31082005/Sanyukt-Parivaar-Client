import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Home,
    User,
    Lock,
    Eye,
    EyeOff,
    CheckCircle
} from 'lucide-react';
import api from '../api';

const UserLogin = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successData, setSuccessData] = useState(null);
    const [countdown, setCountdown] = useState(3);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await api.post('/login', {
                email: formData.email,
                password: formData.password
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));

                const userRole = response.data.user?.role || 'user';
                setSuccessData({ email: formData.email, role: userRole });

                let count = 3;
                setCountdown(3);

                const timer = setInterval(() => {
                    count -= 1;
                    setCountdown(count);

                    if (count === 0) {
                        clearInterval(timer);
                        navigate(userRole === 'admin' ? '/admin' : '/');
                    }
                }, 1000);
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'Invalid email or password');
            } else if (error.request) {
                setError(`No response from server. Check if backend is live at: ${api.defaults.baseURL}`);
            } else {
                setError('An error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0D0D0D] font-sans text-[#F5E6C8] selection:bg-[#C8A96A]/30 relative overflow-hidden">
            {successData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
                    <div
                        className="luxury-box w-full max-w-sm mx-4"
                        style={{ animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
                    >
                        <div className="h-1 bg-gradient-to-r from-transparent via-[#C8A96A] to-transparent w-full" />

                        <div className="p-10 text-center">
                            <div className="flex justify-center mb-6">
                                <div className="w-20 h-20 rounded-full bg-[#0D0D0D] border border-[#C8A96A]/30 flex items-center justify-center shadow-gold-900/20 shadow-2xl animate-pulse">
                                    <CheckCircle className="w-10 h-10 text-[#C8A96A]" strokeWidth={1.5} />
                                </div>
                            </div>

                            <h2 className="text-2xl font-serif font-bold text-[#F5E6C8] mb-2 tracking-tight">
                                Access Granted
                            </h2>
                            <p className="text-[#C8A96A]/60 text-xs font-bold uppercase tracking-widest italic mb-8">
                                Welcome to the inner circle
                            </p>

                            <div className="bg-[#0D0D0D] rounded-2xl border border-[#C8A96A]/10 p-5 flex items-center justify-between mb-8 text-left group">
                                <div className="overflow-hidden">
                                    <p className="text-[10px] text-[#C8A96A]/40 uppercase tracking-[0.2em] font-black mb-1">
                                        Identity Confirmed
                                    </p>
                                    <p className="text-[#F5E6C8] font-bold text-sm truncate">
                                        {successData.email}
                                    </p>
                                </div>

                                <span
                                    className={`ml-3 flex-shrink-0 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border ${successData.role === 'admin'
                                        ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30'
                                        : 'bg-[#C8A96A]/10 text-[#C8A96A] border-[#C8A96A]/30'
                                        }`}
                                >
                                    {successData.role === 'admin'
                                        ? 'Architect'
                                        : 'Sanyukt Parivaar Member'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[#C8A96A]/40 mb-3">
                                <span>Establishing Uplink...</span>
                                <span className="text-[#C8A96A] tabular-nums">{countdown}s</span>
                            </div>

                            <div className="h-1 bg-[#0D0D0D] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-[#C8A96A] to-[#D4AF37] rounded-full shadow-gold"
                                    style={{
                                        width: `${((3 - countdown) / 3) * 100}%`,
                                        transition: 'width 1s linear'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <style>{`
                        @keyframes slideUp {
                            from { opacity: 0; transform: translateY(40px) scale(0.95); }
                            to { opacity: 1; transform: translateY(0) scale(1); }
                        }
                    `}</style>
                </div>
            )}

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#C8A96A]/5 rounded-full blur-[140px] animate-pulse"></div>
                <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] animate-pulse delay-700"></div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10 px-4">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-center justify-center py-1 md:py-2 min-h-[calc(100vh-80px)]">
                    <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-2">
                        <div className="inline-block mb-1 px-3 py-1 rounded-full border border-[#C8A96A]/20 bg-[#C8A96A]/5">
                            <span className="text-[9px] font-black uppercase tracking-[0.35em] text-[#C8A96A]">
                                Sanyukt Parivaar Portal
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#F5E6C8] mb-1 tracking-tight uppercase leading-tight">
                            Welcome <span className="text-[#C8A96A]">Back</span>
                        </h1>

                        <p className="text-[#F5E6C8]/60 text-[10px] sm:text-xs max-w-sm leading-relaxed font-black uppercase tracking-widest mb-1">
                            Secure access to your high-performance business ecosystem and legacy dashboard.
                        </p>

                        {error && (
                            <div className="p-2 bg-red-900/20 border border-red-500/30 text-red-400 rounded-xl text-[10px] font-bold max-w-md w-full">
                                {error}
                            </div>
                        )}

                        <div className="luxury-box p-2 max-w-[280px] w-full shadow-xl flex items-start gap-2 group transition-all duration-500">
                            <div className="bg-[#0D0D0D] p-1.5 rounded-lg text-[#C8A96A] border border-[#C8A96A]/20 group-hover:bg-[#C8A96A] group-hover:text-[#0D0D0D] transition-all duration-500">
                                <Lock className="w-4 h-4" />
                            </div>

                            <div>
                                <h3 className="font-serif font-bold text-[#F5E6C8] mb-0.5 tracking-wide uppercase text-[9px]">
                                    Fortified Access
                                </h3>
                                <p className="text-[9px] text-[#F5E6C8]/40 leading-tight font-medium">
                                    Administrative architects will be routed to the command center upon biometric verification.
                                </p>
                            </div>
                        </div>

                        <div className="mt-2 grid grid-cols-2 gap-2 max-w-[260px] w-full">
                            {[
                                { val: '10K+', label: 'Sanyukt Parivaar Estates' },
                                { val: '50+', label: 'Global Regions' }
                            ].map((stat, i) => (
                                <div
                                    key={i}
                                    className="luxury-box p-2 md:p-2.5 transition-all duration-500 group text-center"
                                >
                                    <p className="text-xl md:text-[22px] font-serif font-bold text-[#C8A96A] mb-0.5 group-hover:scale-110 transition-transform">
                                        {stat.val}
                                    </p>
                                    <p className="text-[6px] font-black text-[#F5E6C8]/30 uppercase tracking-[0.18em] leading-tight">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                        <div className="luxury-box w-full max-w-[400px] group transition-all duration-700">
                            <div className="bg-[#121212] p-4 md:p-5 border-b border-[#C8A96A]/30 relative overflow-hidden text-center">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8A96A]/5 rounded-full blur-3xl"></div>

                                <h2 className="text-2xl font-serif font-bold text-[#F5E6C8] mb-2 tracking-tight">
                                    User <span className="text-[#C8A96A]">Login</span>
                                </h2>

                                <div className="flex items-center justify-center space-x-3 text-[#C8A96A]/40">
                                    <Home className="h-3 w-3" />
                                    <Link
                                        to="/"
                                        className="text-[9px] font-black uppercase tracking-widest hover:text-[#C8A96A] transition-colors"
                                    >
                                        Origins
                                    </Link>
                                    <span className="w-1 h-1 rounded-full bg-[#C8A96A]/20"></span>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-[#C8A96A]">
                                        Access
                                    </span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="p-4 md:p-5 space-y-3">
                                <div className="space-y-3">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#C8A96A]">
                                            Email / Sponsor ID
                                        </label>
                                        <div className="relative group/input">
                                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#C8A96A]/40 group-hover/input:text-[#C8A96A] transition-colors" />
                                            <input
                                                type="text"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Email / Sponsor ID"
                                                className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl pl-10 pr-3 py-2.5 text-[#F5E6C8] placeholder:text-[#F5E6C8]/20 focus:border-[#C8A96A] outline-none transition-all font-medium text-xs"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#C8A96A]">
                                            Password
                                        </label>
                                        <div className="relative group/input">
                                            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#C8A96A]/40 group-hover/input:text-[#C8A96A] transition-colors" />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Enter Secured Key"
                                                className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl pl-10 pr-12 py-2.5 text-[#F5E6C8] placeholder:text-[#F5E6C8]/20 focus:border-[#C8A96A] outline-none transition-all font-medium text-xs"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C8A96A]/40 hover:text-[#C8A96A] transition-colors"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-5 w-5" />
                                                ) : (
                                                    <Eye className="h-5 w-5" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                        <label className="flex items-center space-x-3 cursor-pointer group/check">
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    checked={rememberMe}
                                                    onChange={(e) => setRememberMe(e.target.checked)}
                                                    className="sr-only"
                                                />
                                                <div
                                                    className={`w-5 h-5 rounded-md border border-[#C8A96A]/30 transition-all ${rememberMe
                                                        ? 'bg-[#C8A96A] border-[#C8A96A]'
                                                        : 'bg-transparent'
                                                        }`}
                                                >
                                                    {rememberMe && (
                                                        <CheckCircle className="w-full h-full text-[#0D0D0D] p-0.5" />
                                                    )}
                                                </div>
                                            </div>
                                            <span className="text-[#F5E6C8]/40 group-hover/check:text-[#C8A96A] transition-colors">
                                                Remember
                                            </span>
                                        </label>

                                        <Link
                                            to="/forgot-password"
                                            className="text-[#C8A96A]/40 hover:text-[#C8A96A] transition-colors italic"
                                        >
                                            Forget Password
                                        </Link>
                                    </div>

                                    <div className="pt-1">
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="luxury-button w-full relative z-10 flex items-center justify-center gap-3 p-2.5 disabled:opacity-50"
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-2 text-xs">
                                                {isLoading ? 'Verifying...' : 'LOGIN'}
                                            </span>
                                        </button>
                                    </div>

                                    <div className="text-center pt-2">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#F5E6C8]/30">
                                            No membership?{' '}
                                            <Link
                                                to="/register"
                                                className="text-[#C8A96A] hover:underline transition-all"
                                            >
                                                Sign up
                                            </Link>
                                        </p>
                                    </div>

                                    <div className="mt-1 p-2 bg-[#0D0D0D] rounded-xl border border-[#C8A96A]/10">
                                        <p className="text-[9px] text-[#F5E6C8]/20 text-center leading-relaxed">
                                            <span className="font-black text-[#C8A96A] block mb-1 tracking-widest uppercase">
                                                System Defaults
                                            </span>
                                            <span className="font-bold">Architect:</span> admin@example.com / admin123
                                            <br />
                                            <span className="font-bold">Member:</span> user@example.com / password123
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;