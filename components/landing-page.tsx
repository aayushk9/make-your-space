"use client"

import { useState, useEffect } from "react"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"

export function LandingPage() {
    const [email, setEmail] = useState("")
    const [count, setCount] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const URL = process.env.NEXT_PUBLIC_API

    const contactMe = () => {
        window.open("https://cal.com/aayushdev/chat?Iuser=aayushdev&duration=5", "_blank")
    }

    const joinWaitList = async () => {
        if (!email || !email.includes("@")) {
            alert("Please enter a valid email address")
            return
        }

        setIsLoading(true)
        try {
            const res = await fetch(`${URL}/waitlist`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })

            const data = await res.json()
            if (res.status === 201) {
                setIsSuccess(true)
                setEmail("")
                renderBetaUsers()
                setTimeout(() => setIsSuccess(false), 3000)
            } else if (res.status === 200) {
                alert("You're already on our waitlist!")
            } else {
                alert("Invalid email")
            }
        } catch (err) {
            console.log(err)
            alert("Server down, please try again later")
        } finally {
            setIsLoading(false)
        }
    }

    const renderBetaUsers = async () => {
        try {
            const res = await fetch(`${URL}/waitlist`)
            const data = await res.json()
            setCount(data.count)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        renderBetaUsers()
    }, [])

    const scrollToFeatures = () => {
        document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
            <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6">
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <div className="text-2xl font-bold text-white">mak3space</div>
                    <Button onClick={contactMe} variant="ghost" className="text-white hover:bg-white/10 transition-all">
                        CONNECT
                    </Button>
                </div>
            </header>

            <section className="relative h-screen flex flex-col justify-center items-center">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>

                    <div className="absolute inset-0 opacity-30">
                        {Array.from({ length: 100 }).map((_, i) => (
                            <div
                                key={i}
                                className="absolute h-px w-px bg-white rounded-full animate-pulse"

                            />
                        ))}
                    </div>

                    <div className="absolute inset-0">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="absolute h-px w-full bg-white/5" style={{ top: `${10 + i * 8}%` }} />
                        ))}
                    </div>
                </div>

                <div className="relative z-10 container mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-7xl md:text-9xl font-bold mb-4 tracking-tight"
                    >
                        JOIN
                        <br />
                        <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                            MAK3SPACE
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-2xl md:text-3xl italic font-light mt-6 mb-16 text-white/80"
                    >
                        Private Spaces for Couples & Friends
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-md mx-auto mt-12"
                    >
                        <div className="flex gap-2 mb-4">
                            <Input
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 text-lg"
                            />
                            <Button
                                onClick={joinWaitList}
                                disabled={isLoading || isSuccess}
                                className="bg-white text-black hover:bg-white/90 h-12 px-6 text-lg font-medium"
                            >
                                {isLoading ? "..." : isSuccess ? "JOINED" : "JOIN"}
                            </Button>
                        </div>

                        {count !== null && (
                            <div className="text-white/60 text-lg flex items-center justify-center gap-2">
                                <div className="flex overflow-hidden h-8">
                                    {count
                                        .toString()
                                        .split("")
                                        .map((digit, index) => (
                                            <motion.span
                                                key={index}
                                                className="flex items-center justify-center text-white/120"
                                                initial={{ y: 40 }}
                                                animate={{ y: 0 }}
                                                transition={{
                                                    duration: 0.3,
                                                    delay: index * 0.1,
                                                    ease: "easeOut",
                                                }}
                                            >
                                                <strong>{digit}</strong>
                                            </motion.span>
                                        ))}
                                </div>
                                <span>people have already joined the waitlist</span>
                            </div>
                        )}


                    </motion.div>

                    <div className="flex justify-center mt-4">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1 }}
                        >
                            <ArrowDown className="h-8 w-8 text-white animate-bounce" />
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="absolute bottom-0 left-0 right-0 flex justify-center"
                    >
                        <button onClick={scrollToFeatures} className="text-white/50 hover:text-white transition-colors">
                            <ArrowDown className="h-8 w-8 animate-bounce" />
                        </button>
                    </motion.div>
                </div>
            </section>

            <section id="features" className="py-32 relative">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div
                                key={i}
                                className="absolute h-[200%] w-px bg-white/5 -rotate-45"
                                style={{
                                    left: `${i * 10}%`,
                                    top: "-50%",
                                }}
                            />
                        ))}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-24 text-center">DUAL MODES</h2>

                    <div className="grid md:grid-cols-2 gap-16 mb-32">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="border border-white/10 p-12 relative backdrop-blur-sm"
                        >
                            <h3 className="text-3xl font-bold mb-6">Couple Mode</h3>
                            <p className="text-white/70 text-lg leading-relaxed">
                                Create a private space with your partner using a unique code. Perfect for planning dates, tracking
                                shared expenses, and building accountability.
                            </p>
                            <div className="absolute -top-4 -right-4 bg-pink-500 h-8 w-8"></div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="border border-white/10 p-12 relative backdrop-blur-sm"
                        >
                            <h3 className="text-3xl font-bold mb-6">Friends Mode</h3>
                            <p className="text-white/70 text-lg leading-relaxed">
                                Invite your close friend group to share a space together using a unique code. Great for planning trips,
                                splitting bills and friendly challenges.
                            </p>
                            <div className="absolute -top-4 -right-4 bg-purple-500 h-8 w-8"></div>
                        </motion.div>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-24 text-center">CORE FEATURES</h2>

                    <div className="grid md:grid-cols-3 gap-8 mb-32">
                        {[
                            {
                                title: "Shared Calendar",
                                description: "Plan together. Add birthdays, dates, trips and group events with reminders.",
                            },
                            {
                                title: "Countdown Timers",
                                description: "Add countdowns to your next meetup, a surprise moment or deadline reminders.",
                            },
                            {
                                title: "Bill & Expense Tracker",
                                description: "Easily split bills, track who paid and see outstanding balances.",
                            },
                            {
                                title: "Win the Weekend Challenge",
                                description: "Set personal/group todos. The first to complete them gets pooled tokens or recognition.",
                            },
                            {
                                title: "Memory Albums",
                                description: "Save private moments with stylized memory cards instead of posting on social media.",
                            },
                            {
                                title: "Token System",
                                description: "Stake on challenges, claim tokens from others and unlock premium features.",
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="border border-white/10 p-8 hover:bg-white/5 transition-colors backdrop-blur-sm"
                            >
                                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-white/70">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-32 relative">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-900/20 via-black to-black"></div>

                    <div className="absolute inset-0">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="absolute h-px w-full bg-white/5" style={{ top: `${10 + i * 8}%` }} />
                        ))}
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="absolute w-px h-full bg-white/5" style={{ left: `${10 + i * 8}%` }} />
                        ))}
                    </div>
                </div>

                <div className="container mx-auto px-4 max-w-4xl relative z-10">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-16 text-center"
                    >
                        WHY WE'RE BUILDING THIS
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-white/80 text-xl leading-relaxed text-center"
                    >
                        We want to help people show up better for the people they care about. Whether it's your partner or your
                        closest crew, mak3space makes it easy and fun to:
                    </motion.p>

                    <div className="grid md:grid-cols-2 gap-8 mt-16">
                        {["Keep promises", "Stay consistent", "Celebrate private moments", "Avoid the noise of social media"].map(
                            (item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="border border-white/10 p-8 flex items-center justify-center backdrop-blur-sm"
                                >
                                    <p className="text-2xl font-light">{item}</p>
                                </motion.div>
                            ),
                        )}
                    </div>
                </div>
            </section>

            <section className="py-32 relative">
                <div className="absolute inset-0 overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-50"
                        style={{
                            backgroundImage:
                                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
                            backgroundSize: "200px 200px",
                        }}
                    ></div>

                    <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black"></div>
                </div>

                <div className="container mx-auto px-4 max-w-3xl relative z-10">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-16 text-center"
                    >
                        FAQ
                    </motion.h2>

                    <Accordion type="single" collapsible className="space-y-6">
                        {[
                            {
                                question: "How is mak3space different from regular calendar apps?",
                                answer:
                                    "mak3space combines calendar functionality with accountability features, token rewards and private memory sharing specifically designed for couples and close friends. It's a complete solution for meaningful coordination and connection.",
                            },
                            {
                                question: "Do I need to use the token system?",
                                answer:
                                    "No, the token system is completely optional. All core features can be used without tokens. Tokens simply add an extra layer of accountability and unlock premium features like memory albums.",
                            },
                            {
                                question: "How does the Solana integration work?",
                                answer:
                                    "You can purchase tokens using Solana (and get 2x more tokens compared to credit card/UPI/GPay). These tokens can be staked on challenges and countdowns, creating real accountability with your partner or friends.",
                            },
                            {
                                question: "Is my data private and secure?",
                                answer:
                                    "Absolutely. We've built mak3space with privacy as a core principle. Your shared spaces are private and only accessible to those you invite. We don't sell your data or push you to share on social media.",
                            },
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <AccordionItem value={`item-${index}`} className="border border-white/10 backdrop-blur-sm">
                                    <AccordionTrigger className="px-6 py-4 text-xl font-medium hover:bg-white/5 text-left">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-6 text-white/70 text-lg">{faq.answer}</AccordionContent>
                                </AccordionItem>
                            </motion.div>
                        ))}
                    </Accordion>
                </div>
            </section>

            <section className="py-32 relative">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div
                                key={i}
                                className="absolute border-l border-r border-white/5"
                                style={{
                                    left: `${5 + i * 5}%`,
                                    height: "100%",
                                    width: "10%",
                                    borderWidth: "1px",
                                }}
                            />
                        ))}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-b from-black via-pink-950/10 to-black"></div>
                </div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold mb-8"
                    >
                        READY TO JOIN?
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="max-w-md mx-auto mt-12"
                    >
                        <div className="flex gap-2 mb-4">
                            <Input
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 text-lg"
                            />
                            <Button
                                onClick={joinWaitList}
                                disabled={isLoading || isSuccess}
                                className="bg-white text-black hover:bg-white/90 h-12 px-6 text-lg font-medium"
                            >
                                {isLoading ? "..." : isSuccess ? "JOINED" : "JOIN"}
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            <footer className="py-12 border-t border-white/10 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/10 to-black"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-xl font-bold text-white mb-4 md:mb-0">mak3space</div>
                        <div className="text-white/50">© {new Date().getFullYear()} mak3space. All rights reserved.</div>
                    </div>
                </div>
            </footer>
        </div>
    )
}