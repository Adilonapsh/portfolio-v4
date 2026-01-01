"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare, Send } from "lucide-react"

export default function Contact() {
    return (
        <section id="contact" className="py-24 bg-muted/30">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight uppercase">MARI BICARA</h2>
                            <p className="text-muted-foreground text-lg">
                                Punya ide proyek atau ingin sekadar menyapa? Jangan ragu untuk menghubungi saya!
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                                    <a href="mailto:hire@truenapsh.my.id" className="font-bold">hire@truenapsh.my.id</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <MessageSquare className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Sosial Media</p>
                                    <p className="font-bold">@Noreplyao</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Card className="border-none shadow-xl bg-background/50 backdrop-blur-sm">
                        <CardContent className="p-8 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium uppercase tracking-wider">Nama</label>
                                    <Input placeholder="John Doe" className="bg-muted/50 border-none rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium uppercase tracking-wider">Email</label>
                                    <Input placeholder="john@example.com" className="bg-muted/50 border-none rounded-xl" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium uppercase tracking-wider">Pesan</label>
                                <Textarea placeholder="Tulis pesan Anda di sini..." className="min-h-[150px] bg-muted/50 border-none rounded-2xl resize-none" />
                            </div>
                            <Button className="w-full rounded-full h-12 text-lg font-bold gap-2">
                                <Send className="h-5 w-5" /> Kirim Pesan
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
