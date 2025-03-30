import React from 'react';
import { ShieldCheck, Fingerprint, Lock, KeyRound, CheckCircle } from 'lucide-react';
import { cn } from "@/lib/utils";
import Container from '@/components/global/container';
import SectionBadge from '@/components/ui/section-badge';

const Security = () => {
    return (
      
            <div className="relative">
                 <div className="hidden lg:block absolute bottom-0 -left-1/4 bg-blue-500 w-72 h-72 rounded-full -z-10 blur-[14rem]"></div>
                <section className=" py-16 max-w-7xl mx-auto">
            <div className="container mx-auto px-4">
                <Container>
                <div className="text-center mb-12 max-w-2xl mx-auto">
                     <SectionBadge title="Security" />
                    <h2 className="text-3xl lg:text-4xl font-semibold mt-6">
                        Your Financial Security is Our Top Priority
                    </h2>
                    <p className="text-muted-foreground mt-6">
                        We are committed to ensuring the highest level of security for your data. We use cutting-edge technology and strict security protocols to protect your sensitive information.
                    </p>
                </div>
                </Container>

                <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Feature 1: End-to-End Encryption */}
                    <div className=" backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/10 hover:shadow-blue-500/20 transition-all duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <ShieldCheck className="w-8 h-8 text-blue-400" />
                            <h3 className="text-xl font-semibold text-white">End-to-End Encryption</h3>
                        </div>
                        <p className="text-gray-300">
                            Your data is encrypted from your device to our servers, so no third party can see it.
                        </p>
                    </div>

                    {/* Feature 2: Biometric Authentication */}
                    <div className=" backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/10 hover:shadow-purple-500/20 transition-all duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <Fingerprint className="w-8 h-8 text-purple-400" />
                            <h3 className="text-xl font-semibold text-white">Biometric Authentication</h3>
                        </div>
                        <p className="text-gray-300">
                            Use biometric authentication like Face ID or Fingerprint for added security.
                        </p>
                    </div>

                    {/* Feature 3: Multi-Factor Authentication */}
                    <div className=" backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/10 hover:shadow-green-500/20 transition-all duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <Lock className="w-8 h-8 text-green-400" />
                            <h3 className="text-xl font-semibold text-white">Multi-Factor Authentication</h3>
                        </div>
                        <p className="text-gray-300">
                            Set up multiple verification steps, such as a password and OTP, to log in to your account.
                        </p>
                    </div>

                    {/* Feature 4: Regular Security Audits */}
                    <div className=" backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/10 hover:shadow-yellow-500/20 transition-all duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <KeyRound className="w-8 h-8 text-yellow-400" />
                            <h3 className="text-xl font-semibold text-white">Regular Security Audits</h3>
                        </div>
                        <p className="text-gray-300">
                            We regularly test our security systems and quickly resolve any vulnerabilities.
                        </p>
                    </div>

                    {/* Feature 5: Data Privacy */}
                    <div className=" backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/10 hover:shadow-pink-500/20 transition-all duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <CheckCircle className="w-8 h-8 text-pink-400" />
                            <h3 className="text-xl font-semibold text-white">Data Privacy</h3>
                        </div>
                        <p className="text-gray-300">
                            We keep your personal information strictly confidential and do not share it with any third party.
                        </p>
                    </div>

                     {/* Feature 6: 24/7 Monitoring */}
                    <div className=" backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/10 hover:shadow-cyan-500/20 transition-all duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <Lock className="w-8 h-8 text-cyan-400" />
                            <h3 className="text-xl font-semibold text-white">24/7 Monitoring</h3>
                        </div>
                        <p className="text-gray-300">
                            Our systems are monitored 24/7 to keep your data secure.
                        </p>
                    </div>
                </div>
                </Container>
            </div>
        </section>
            </div>
        
    );
};

export default Security;
