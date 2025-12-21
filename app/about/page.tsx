import Image from 'next/image'
import { Mail } from 'lucide-react'

const experiences = [
    {
        title: "Fullstack Developer",
        company: "PT. Real Media Lab",
        period: "2020 - Sekarang",
        description: "Pengalaman yang menarik disini, saat disini saya mulai fokus dalam hal Fullstack Developer, di perusahaan ini saya juga mengerjakan fullstack developer untuk website, serta juga saya memimpin dalam setiap perencanaan api dan database."
    },
    {
        title: "Fullstack Developer",
        company: "Truenapsh",
        period: "2024 - Sekarang",
        description: "Pengalaman yang menarik disini, saat disini saya mulai fokus dalam hal Fullstack Developer, di perusahaan ini saya juga mengerjakan fullstack developer untuk website, serta juga saya memimpin dalam setiap perencanaan api dan database."
    },
]

export default function AboutPage() {
    return (
        <div className="min-h-screen font-sans">
            {/* Intro Section */}
            <section className="container mx-auto px-6 pt-32 pb-16 lg:pt-48 lg:pb-32 flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="max-w-2xl text-center lg:text-left">
                    <p className="text-[#a3e635] font-bold text-sm uppercase tracking-widest mb-6">Profile Saya</p>
                    <h1 className="text-5xl lg:text-8xl font-black mb-4 leading-tight">
                        Hello folks, I'm
                    </h1>
                    <h2 className="text-5xl lg:text-8xl font-black text-[#a3e635] mb-8 leading-tight">
                        Fullstack Developer
                    </h2>
                    <p className="text-lg text-gray-400 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                        Membangun aplikasi yang sukses adalah sebuah tantangan. Saya sangat bersemangat dalam menghadirkan pengalaman pengguna yang luar biasa, antarmuka yang intuitif, dan pengembangan web yang skalabel.
                    </p>
                </div>

                <div className="relative group">
                    <div className="w-64 h-64 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-gray-800 relative z-10 bg-gray-900 shadow-2xl">
                        {/* Placeholder for Profile Image */}
                        <div className="w-full h-full flex items-center justify-center text-4xl font-bold opacity-20">PROFILE</div>
                    </div>
                    {/* Decorative Shapes */}
                    <div className="absolute top-0 right-0 w-8 h-8 bg-[#fbbf24] rounded-full -translate-y-4 translate-x-4 blur-sm opacity-80" />
                    <div className="absolute bottom-10 right-0 w-12 h-12 bg-[#cbd5e1] rounded-full translate-x-12 blur-sm opacity-50" />
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#a3e635] rounded-full blur-3xl opacity-20 animate-pulse" />
                </div>
            </section>

            {/* About Me Card */}
            <section className="container mx-auto px-6 py-16">
                <div className="bg-foreground backdrop-blur-sm rounded-[2.5rem] p-8 lg:p-16 flex flex-col lg:flex-row items-center gap-12 text-[#1e293b]">
                    <div className="lg:w-1/3 flex flex-col items-center gap-6">
                        <div className="w-64 h-64 lg:w-80 lg:h-80 relative flex items-center justify-center bg-gray-100 rounded-3xl overflow-hidden shadow-inner">
                            {/* Placeholder for Memoji/Avatar Illustration */}
                            <div className="text-6xl font-black opacity-10 uppercase italic -rotate-12">Avatar</div>
                        </div>
                        <div className="bg-white rounded-2xl p-4 shadow-xl flex items-center gap-4 w-full max-w-sm border border-gray-100">
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                                <Mail className="w-6 h-6 text-[#6d5dfc]" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email saya</span>
                                <span className="text-sm font-bold text-gray-700">risingadityahalim18@gmail.com</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-2/3 space-y-6">
                        <p className="text-[#6d5dfc] font-bold text-sm uppercase tracking-widest">About Me</p>
                        <h3 className="text-4xl lg:text-6xl text-background font-black leading-tight tracking-tight uppercase">
                            Bangun Kreativitas dan Digitalisasi ke lingkungan kerja anda
                        </h3>
                        <p className="text-lg text-gray-400 font-medium leading-relaxed text-justify">
                            Saya adalah seorang Frontend Developer dan UI/UX Designer yang berfokus pada pembuatan antarmuka web yang modern, responsif, dan mudah digunakan. Berpengalaman menggunakan Next.js, React, TypeScript, Laravel, PHP serta integrasi dengan teknologi backend seperti Lumen, tRPC, Prisma, dan NextAuth. Kombinasi antara kemampuan teknis dan estetika desain membantu saya menciptakan produk digital yang tidak hanya berfungsi baik, tetapi juga memiliki pengalaman pengguna yang menarik dan profesional. Saya senang bekerja dalam lingkungan yang kolaboratif, berpikir kritis terhadap solusi yang efisien, serta terus belajar teknologi baru untuk meningkatkan kualitas hasil kerja.
                        </p>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="container mx-auto px-6 py-24">
                <div className="flex flex-col lg:flex-row gap-12 mb-16">
                    <div className="lg:w-1/3">
                        <p className="text-[#6d5dfc] font-bold text-sm uppercase tracking-widest mb-6">Experience</p>
                        <h4 className="text-5xl lg:text-7xl font-black uppercase tracking-tight mb-4">Tentang Karier saya</h4>
                        <p className="text-gray-400 font-medium opacity-80">ini adalah beberapa pengalaman saya selama berkarir dibidang IT</p>
                    </div>

                    <div className="lg:w-2/3 space-y-12 relative">
                        {/* Timeline Line */}
                        <div className="absolute left-1 top-2 bottom-0 w-0.5 bg-gray-800" />

                        {experiences.map((exp, index) => (
                            <div key={index} className="relative pl-12 group">
                                <div className="absolute left-0 top-3 w-3 h-3 bg-[#6d5dfc] rounded-full shadow-[0_0_10px_#6d5dfc] z-10 transition-transform group-hover:scale-150" />

                                <div className="space-y-4">
                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                        <h5 className="text-2xl lg:text-3xl font-bold text-[#a3e635] tracking-tight">{exp.title}</h5>
                                        <span className="px-4 py-1.5 bg-[#4f46e5] text-xs font-bold rounded-full text-white uppercase tracking-widest">
                                            {exp.period}
                                        </span>
                                    </div>
                                    <p className="text-lg font-bold text-gray-600 opacity-80 uppercase tracking-wide">{exp.company}</p>
                                    <p className="text-gray-400 font-medium leading-relaxed max-w-3xl">
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
