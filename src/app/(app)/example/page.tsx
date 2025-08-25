"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/badge";
import { Text } from "@/components/text";
import Card from "@/components/card";
import { Link } from "@/components/link";
import { Button } from "@/components/button";
import { Heading, Subheading } from "@/components/heading";
import Head from "next/head";

// Simple utility components (kept local to avoid external UI deps)
const Container: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = "", children }) => (
  <div className={`mx-auto w-full container px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const SectionTitle: React.FC<React.PropsWithChildren<{ eyebrow?: string; id?: string }>> = ({ eyebrow, children, id }) => (
  <div id={id} className="text-center mb-8">
    {eyebrow && <Text className="text-sm font-semibold tracking-widest uppercase">{eyebrow}</Text>}
    <Heading>{children}</Heading>
  </div>
);

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 flex-none"><path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

export default function PFLeagueLanding() {
  return (
    <div className="min-h-screen">
      

      {/* Hero */}
      <section id="overview" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-sky-50 to-white" />
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge>3 Leagues</Badge>
              <Heading className='text-2xl sm:text-3xl'>
                Weekend matches for youth players of all levels
              </Heading>
              <Text>
                This program is designed to give youth players more opportunities to play real matches in a supportive and competitive environment across various leagues in Metro Vancouver based on their level and age.
              </Text>
              <Text>
                Keep training with your personal trainers, coaches, academies, or clubs — then showcase what you’ve learned in real games.
              </Text>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button href="#register" className="inline-flex items-center justify-center" color="primary">
                    Get Started — $280 / player
                </Button>

                <Button href="#leagues" className="inline-flex items-center justify-center" color="light">
                  Explore Leagues
                </Button>
              </div>
            </motion.div>
            
            <Card className="p-6" rounded="full">
                <div>
                    <Heading>Progressive Academy League Series</Heading>
                    <Subheading className="mt-2 text-2xl font-bold">$200 per player</Subheading>
                    <ul className="mt-3 space-y-2 text-sm/6">
                        <li className="flex items-center gap-2"><Check /> Extra weekend matches</li>
                        <li className="flex items-center gap-2"><Check /> Open to club & non‑club players</li>
                        <li className="flex items-center gap-2"><Check /> Positive, competitive environments</li>
                    </ul>
                </div>
                <div className="p-4 rounded-xl bg-slate-600/10 mt-4">
                    <Subheading>Locations</Subheading>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {["Richmond","Newton","South Surrey","White Rock"].map((city, idx)=> (
                        <Badge key={city} color={["lime", 'rose', 'blue', 'cyan', 'purple', 'fuschia'][idx] as any}>{city}</Badge>
                        ))}
                    </div>
                </div>
            </Card>
        
          </div>
        </Container>
      </section>

      {/* How it Works */}
      <section id="how" className="py-16 sm:py-20">
        <Container>
          <SectionTitle eyebrow="How it works">Simple, flexible, parent‑friendly</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Choose the right league",
                body: "Pick the stage that fits your child today: Player Development, Progressive, or Competitive Performance.",
              },
              {
                title: "Register & receive details",
                body: "Complete a short form, pay $99 per player, and get match info (time, venue, format).",
              },
              {
                title: "Play on weekends",
                body: "Showcase training gains in real matches while continuing with your usual coaches or clubs.",
              },
            ].map((item, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 h-6 w-6 rounded-lg bg-primary text-white flex items-center justify-center text-sm font-bold">{i+1}</div>
                  <div className="flex-1">
                    <Subheading>{item.title}</Subheading>
                    <Text>{item.body}</Text>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Leagues */}
      <section id="leagues" className="py-16 sm:py-20 bg-zinc-900">
        <Container>
          <SectionTitle eyebrow="Three Leagues">A clear pathway for every player</SectionTitle>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* PDSL */}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <Heading className="text-xl font-bold">Player Development Soccer League</Heading>
                <Badge color="purple">PDSL</Badge>
              </div>
              <Text>The foundation stage for recreational players and beginners in a positive, supportive environment.</Text>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex gap-2"><Check /> Fundamentals, creativity, enjoyment</li>
                <li className="flex gap-2"><Check /> Build confidence and love for the game</li>
                <li className="flex gap-2"><Check /> Prepares players for the Progressive League</li>
              </ul>
            </Card>

            {/* PSL */}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <Heading className="text-xl font-bold">Progressive Soccer League</Heading>
                <Badge color="lime">PSL</Badge>
              </div>
              <Text className="mt-2 text-sm text-primary">For players with strong fundamentals who want more challenge and responsibility in games.</Text>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex gap-2"><Check /> Small‑sided formats to maximize touches</li>
                <li className="flex gap-2"><Check /> Decision‑making under pressure</li>
                <li className="flex gap-2"><Check /> Bridge to higher‑level competition (Div 1–2)</li>
              </ul>
            </Card>

            {/* CPL */}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <Heading className="text-xl font-bold">Academy Super League</Heading>
                <Badge color="red">ASL</Badge>
              </div>
              <Text className="mt-2 text-sm text-primary">For advanced players seeking high‑intensity, fast‑paced matches with tactical demands.</Text>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex gap-2"><Check /> High tempo & advanced decision‑making</li>
                <li className="flex gap-2"><Check /> Suited for club/academy experience</li>
                <li className="flex gap-2"><Check /> Pathway to Div 1, Select & elite</li>
              </ul>
            </Card>
          </div>

          {/* Pathway */}
          <div className="mt-10">
            <div className="hidden md:flex items-center justify-center gap-4">
              <Badge color="green">PDSL</Badge>
              <ArrowRight />
              <Badge color="blue">PSL</Badge>
              <ArrowRight />
              <Badge color="amber">CPL</Badge>
            </div>
            <Subheading className="mx-auto text-center">Development ➝ Progressive ➝ Competitive Performance</Subheading>
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 sm:py-20">
        <Container>
          <SectionTitle eyebrow="Pricing">Simple, transparent pricing</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <Card className="p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold">Drop‑In Play</h3>
                <p className="mt-2 text-sm text-primary">Perfect for players seeking extra weekend matches while continuing with their current training.</p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex gap-2"><Check /> $99 per player</li>
                  <li className="flex gap-2"><Check /> No long‑term commitment</li>
                  <li className="flex gap-2"><Check /> Open to club & non‑club players</li>
                </ul>
              </div>
              <a id="register" href="#contact" className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-white font-semibold shadow-sm hover:bg-slate-700">
                Register Interest
              </a>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-bold">What parents can expect</h3>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {[
                  "Friendly, supportive coaches",
                  "Age‑appropriate formats",
                  "Clear schedule & locations",
                  "Focus on development first",
                  "Safe, inclusive environment",
                  "Positive match experience",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2"><Check /><span>{item}</span></div>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-16 sm:py-20 bg-primary-50">
        <Container>
          <SectionTitle eyebrow="FAQs">Answers for parents</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                q: "Do players need to belong to a club?",
                a: "No. Players with or without club affiliation are welcome. Many families use Drop‑In Play to add match experience alongside their club or academy training.",
              },
              {
                q: "Which league should my child join?",
                a: "Start with PDSL for beginners/recreational. If your player has strong fundamentals and wants more challenge, choose PSL. For advanced players with club experience, CPL is ideal.",
              },
              {
                q: "How often are matches?",
                a: "Most games are scheduled on weekends. You’ll receive exact times/venues after registering interest.",
              },
              {
                q: "Is there a trial or refund?",
                a: "Contact us if your player is misplaced. We’ll help move them to the appropriate league to ensure a positive experience.",
              },
              {
                q: "Can my child stay with their coach/trainer?",
                a: "Absolutely. Drop‑In Play is designed to complement ongoing training with personal trainers, coaches, academies, or clubs.",
              },
              {
                q: "What ages are accepted?",
                a: "We group by age and level to ensure safe, appropriate match environments across youth age groups.",
              },
            ].map(({ q, a }) => (
              <Card key={q} className="p-5">
                <p className="font-semibold">{q}</p>
                <p className="mt-1 text-sm text-primary">{a}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="py-16 sm:py-20">
        <Container>
          <Card className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold">Ready to play?</h3>
                <p className="mt-2 text-primary">Share your player’s age and current level, and we’ll place them in the best‑fit league and location.</p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div className="rounded-xl border border-slate-200 p-3">
                    <p className="text-primary-500">Email</p>
                    <p className="font-medium">register@progressfooty.com</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 p-3">
                    <p className="text-primary-500">Metro Areas</p>
                    <p className="font-medium">Vancouver • Richmond • Surrey • Langley</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 p-3">
                    <p className="text-primary-500">Commitment</p>
                    <p className="font-medium">Drop‑in • Flexible • $99/player</p>
                  </div>
                </div>
              </div>
              <form className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input required placeholder="Parent name" className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                  <input required placeholder="Email" type="email" className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input required placeholder="Player name" className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                  <input required placeholder="Birth year (e.g., 2012)" className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
                <select className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600">
                  <option>League interest — select one</option>
                  <option>PDSL (Player Development)</option>
                  <option>PSL (Progressive)</option>
                  <option>CPL (Competitive Performance)</option>
                </select>
                <textarea placeholder="Notes (current club/academy, preferred location)" className="w-full rounded-xl border border-slate-300 px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                <Button type="button" className="w-full inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-white font-semibold shadow-sm hover:bg-slate-700">
                  Submit Interest
                </Button>
                <p className="text-xs text-primary-500">Submitting this form expresses interest only. We’ll follow up with schedule, venue, and payment steps.</p>
              </form>
            </div>
          </Card>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 text-sm text-primary">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} PF Academy. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#leagues" className="hover:text-slate-700">Leagues</a>
            <a href="#pricing" className="hover:text-slate-700">Pricing</a>
            <a href="#contact" className="hover:text-slate-700">Contact</a>
          </div>
        </Container>
      </footer>
    </div>
  );
}
