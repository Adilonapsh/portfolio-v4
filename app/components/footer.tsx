"use client"

import CTASection from "./cta-section"
import { Github, Instagram, Dribbble, Globe, Twitter, Figma } from "lucide-react"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="w-full">
            {/* MAIN FOOTER */}
            <div className="flex flex-col lg:flex-row min-h-125">
                <div className="lg:w-2/5 bg-[#0a0c10] p-12 lg:p-20 relative overflow-hidden flex flex-col justify-between text-white border-r border-gray-800">
                    <div className="absolute left-0 inset-0 opacity-10 pointer-events-none">
                        <img src="/images/footer.webp" alt="Footer background" className="w-full h-full object-cover" />
                    </div>

                    <div className="relative z-10 space-y-8">
                        <div className="h-16 w-16 bg-[#28c791] rounded-2xl flex items-center justify-center">
                            <span className="text-3xl font-black italic">TN</span>
                        </div>
                        <h3 className="text-5xl md:text-7xl font-black flex flex-col uppercase leading-none tracking-tighter gap-5">
                            <span>Dream</span>
                            <span>Build</span>
                            <span>Ship</span>
                        </h3>
                    </div>

                    <div className="relative z-10 space-y-6 mt-5">
                        {/* <p className="text-sm font-medium opacity-60 uppercase tracking-widest">Catch me</p> */}
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white/20">
                                <img
                                    src="https://yt3.googleusercontent.com/ytc/AIdro_kZWIthG23zlk1BAJzcNmw8lWhul9RFFIk_wabsiRd58g=s160-c-k-c0x00ffffff-no-rj"
                                    alt="Adil Ivansyah L"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-xl font-bold">Adil Ivansyah L</span>
                        </div>
                    </div>
                </div>

                {/* Right Side - Detailed Links */}
                <div className="relative lg:w-3/5 bg-white text-black p-12 lg:p-20 flex flex-col justify-between overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 z-10">
                        {/* Company Info */}
                        <div className="space-y-6 lg:col-span-1">
                            <div className="flex items-center gap-2 group cursor-pointer">
                                <span className="text-3xl font-black tracking-tight">Truenapsh</span>
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                                Truenapsh adalah studio kreatif yang berfokus pada pengembangan solusi digital mulai dari desain UI/UX, pengembangan website modern, hingga pembuatan produk digital siap pakai. Kami menggabungkan kreativitas dan teknologi untuk membantu brand tumbuh di era digital.
                            </p>

                            <div className="space-y-1 text-sm text-gray-400">
                                <p>Monday to Friday: 8am - 12pm</p>
                                <p>Weekend: 09am - 10pm</p>
                            </div>

                            <div className="flex gap-4 text-gray-400">
                                <a href="https://instagram.com/noreplyao" target="_blank">
                                    <Instagram className="h-5 w-5 hover:text-black cursor-pointer" />
                                </a>
                                <a href="https://twitter.com/adilonapsh" target="_blank">
                                    <Twitter className="h-5 w-5 hover:text-black cursor-pointer" />
                                </a>
                                <a href="https://github.com/adilonapsh" target="_blank">
                                    <Github className="h-5 w-5 hover:text-black cursor-pointer" />
                                </a>
                                <a href="https://dribbble.com/adilonapsh" target="_blank">
                                    <Dribbble className="h-5 w-5 hover:text-black cursor-pointer" />
                                </a>
                                <a href="https://www.figma.com/@adilonapsh" target="_blank">
                                    <Figma className="h-5 w-5 hover:text-black cursor-pointer" />
                                </a>
                                <a href="https://truenapsh.my.id" target="_blank">
                                    <Globe className="h-5 w-5 hover:text-black cursor-pointer" />
                                </a>
                            </div>
                        </div>

                        {/* Menus */}
                        <div className="space-y-6">
                            <h4 className="font-bold text-gray-400 uppercase tracking-widest text-xs">Services</h4>
                            <ul className="space-y-3 font-semibold text-gray-700">
                                <li className="hover:text-black cursor-pointer"><Link href="/" className="hover:text-black cursor-pointer">Home</Link></li>
                                <li className="hover:text-black cursor-pointer"><Link href="/blog" className="hover:text-black cursor-pointer">Blog</Link></li>
                                <li className="hover:text-black cursor-pointer"><Link href="/projects" className="hover:text-black cursor-pointer">Portofolio</Link></li>
                                {/* <li className="hover:text-black cursor-pointer">Pricing</li> */}
                                <li className="hover:text-black cursor-pointer"><Link href="/about" className="hover:text-black cursor-pointer">About</Link></li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h4 className="font-bold text-gray-400 uppercase tracking-widest text-xs">About Truenapsh</h4>
                            <ul className="space-y-3 font-semibold text-gray-700">
                                <li className="hover:text-black cursor-pointer">About</li>
                                <li className="hover:text-black cursor-pointer">Meet the creator</li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-gray-400 z-10">
                        <div className="flex gap-6 uppercase tracking-widest">
                            <span className="hover:text-black cursor-pointer">Terms & Conditions</span>
                            <span className="hover:text-black cursor-pointer">Privacy Policy</span>
                            <span className="hover:text-black cursor-pointer">Cookies</span>
                        </div>
                        <p className="uppercase tracking-widest">© 2025. Truenapsh. All rights reserved.</p>
                    </div>

                    <div className="absolute -bottom-0 -right-10 lg:bottom-0 lg:right-0 text-[150px] lg:text-[300px] font-black uppercase tracking-tighter opacity-5 select-none pointer-events-none [writing-mode:vertical-rl] lg:[writing-mode:horizontal-tb]">
                        TRUENAPSH
                    </div>
                </div>
            </div>
        </footer>
    )
}
