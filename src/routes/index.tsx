import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Clock3,
  Coffee,
  Gamepad2,
  Heart,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  MessageCircle,
  PawPrint,
  Phone,
  Sparkles,
  Star,
  Tv,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import hangoutPhoto from "@/assets/boho-cafe-hangout.jpg";
import dogPhoto from "@/assets/boho-cafe-dog.jpg";
import foodPhoto from "@/assets/boho-cafe-food.jpg";
import gamesPhoto from "@/assets/boho-cafe-games.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Boho Cafe Tathawade — Come sit with us awhile" },
      {
        name: "description",
        content:
          "A cozy, pet-friendly neighborhood cafe on Dam Road, Tathawade, with comfort food, cold coffee, games and match nights.",
      },
      { property: "og:title", content: "Boho Cafe Tathawade — Come sit with us awhile" },
      {
        property: "og:description",
        content: "Coffee, comfort food, card nights and cozy corners in Tathawade, Pune.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const menu = [
  {
    title: "Things to munch",
    icon: "🥪",
    items: [
      ["Grilled veggie sandwich", "₹129"],
      ["Cheesy masala frankie", "₹139"],
      ["Loaded nachos", "₹159"],
      ["Peri peri fries", "₹119"],
    ],
  },
  {
    title: "Things to sip",
    icon: "🥤",
    items: [
      ["Boho cold coffee", "₹129"],
      ["Chocolate milkshake", "₹149"],
      ["Minty lime cooler", "₹99"],
      ["Classic hot coffee", "₹79"],
    ],
  },
];

function Doodle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute font-display ${className}`}>
      {children}
    </span>
  );
}

function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 500 38" fill="none">
      <path d="M3 19c25-25 50 25 75 0s50 25 75 0 50 25 75 0 50 25 75 0 50 25 75 0 50 25 75 0 50 25 75 0" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function Polaroid({ src, alt, caption, rotate, className = "", priority = false }: { src: string; alt: string; caption: string; rotate: string; className?: string; priority?: boolean }) {
  return (
    <figure className={`group relative bg-paper p-3 pb-5 doodle-border transition-all duration-300 hover:z-20 hover:rotate-0 hover:-translate-y-2 ${rotate} ${className}`}>
      <span className="tape absolute -top-4 left-1/2 z-10 h-8 w-24 -translate-x-1/2 rotate-2" />
      <img src={src} alt={alt} width={1200} height={900} loading={priority ? "eager" : "lazy"} className="aspect-[4/3] w-full object-cover saturate-[.9]" />
      <figcaption className="pt-3 text-center font-hand text-xl text-foreground">{caption}</figcaption>
    </figure>
  );
}

function WhatsAppButton({ label, className = "" }: { label: string; className?: string }) {
  const [burst, setBurst] = useState(false);
  return (
    <span className={`relative inline-flex ${className}`}>
      <Button
        variant="berry"
        size="chunky"
        onClick={() => {
          setBurst(true);
          window.setTimeout(() => setBurst(false), 800);
          document.querySelector("#contact-note")?.scrollIntoView({ behavior: "smooth", block: "center" });
        }}
      >
        <MessageCircle /> {label} <PawPrint />
      </Button>
      {burst && (
        <span aria-hidden="true" className="absolute inset-0">
          {["♥", "✦", "★", "♥", "✦"].map((piece, index) => <span key={index} className="burst-piece text-2xl text-primary">{piece}</span>)}
        </span>
      )}
    </span>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="sticky top-0 z-50 border-b-2 border-foreground bg-background/95 backdrop-blur-sm">
        <nav className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2" aria-label="Boho Cafe home">
            <span className="flex size-11 rotate-[-5deg] items-center justify-center rounded-full border-2 border-foreground bg-accent shadow-playful">
              <Coffee className="size-6" />
            </span>
            <span className="font-display text-3xl font-bold leading-none">boho cafe</span>
          </a>
          <div className="hidden items-center gap-7 md:flex">
            {["our vibe", "menu", "memories", "visit us"].map((item) => (
              <a key={item} href={`#${item.replace(" ", "-")}`} className="wiggle-hover font-bold lowercase decoration-2 underline-offset-4 hover:underline">{item}</a>
            ))}
          </div>
          <div className="hidden sm:block"><WhatsAppButton label="Order on WhatsApp" /></div>
          <Button variant="mustard" size="icon" className="sm:hidden" aria-label="Toggle menu" onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X /> : <MenuIcon />}
          </Button>
        </nav>
        {menuOpen && (
          <div className="border-t-2 border-foreground bg-rose px-5 py-5 sm:hidden">
            <div className="flex flex-col items-stretch gap-4 text-center font-display text-2xl font-bold">
              {["our vibe", "menu", "memories", "visit us"].map((item) => <a key={item} href={`#${item.replace(" ", "-")}`} onClick={closeMenu}>{item}</a>)}
              <WhatsAppButton label="Order on WhatsApp" className="justify-center" />
            </div>
          </div>
        )}
      </header>

      <section id="top" className="relative overflow-hidden px-4 pb-20 pt-10 sm:px-6 lg:pb-24 lg:pt-14">
        <Doodle className="floaty left-[4%] top-24 text-5xl text-primary">♥</Doodle>
        <Doodle className="right-[7%] top-16 rotate-12 text-6xl text-sage">✿</Doodle>
        <Doodle className="bottom-24 left-[8%] hidden text-6xl text-coral md:block">〰</Doodle>
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.05fr_.95fr]">
          <div className="relative z-10 text-center lg:text-left">
            <div className="mb-5 inline-flex -rotate-2 items-center gap-2 rounded-full border-2 border-foreground bg-sage px-4 py-2 font-bold shadow-playful">
              <MapPin className="size-4" /> Dam Road · Tathawade
            </div>
            <h1 className="mx-auto max-w-3xl text-[clamp(4rem,10vw,8.75rem)] font-bold leading-[.75] text-foreground lg:mx-0">
              come sit<br />with us <span className="inline-block text-primary">awhile</span>
            </h1>
            <p className="mx-auto mt-7 max-w-xl text-lg font-semibold leading-relaxed sm:text-xl lg:mx-0">
              Bring your people, bring your pup, and forget what time it is. We’ve got coffee, comfort food, and one more round of cards.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
              {["pet friendly 🐶", "open till 11 pm ✨", "weekend card nights 🃏"].map((chip, index) => (
                <span key={chip} className={`rounded-full border-2 border-foreground px-4 py-2 text-sm font-extrabold shadow-playful ${index === 0 ? "bg-rose -rotate-2" : index === 1 ? "bg-butter rotate-1" : "bg-sage -rotate-1"}`}>{chip}</span>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Button asChild variant="berry" size="chunky"><a href="#menu">Peep the menu <ArrowDown /></a></Button>
              <Button asChild variant="cream" size="chunky"><a href="#visit-us">Come hang out <Heart /></a></Button>
            </div>
            <p className="mt-5 -rotate-2 font-hand text-xl text-primary">no dress code, only good vibes ↗</p>
          </div>
          <div className="relative mx-auto w-full max-w-xl px-7 pb-10 pt-8">
            <div className="absolute right-0 sm:-right-2 -top-2 sm:top-0 z-40 rotate-6 rounded-full border-2 border-foreground bg-coral px-4 py-3 font-display text-xl font-bold text-primary-foreground shadow-playful">your new fav spot!</div>
            <Polaroid src={hangoutPhoto} alt="Friends playing cards over coffee and sandwiches in a cozy cafe" caption="just one more game... ☕" rotate="rotate-3" priority />
            <Doodle className="steam -left-2 top-8 text-6xl text-primary">♨</Doodle>
            <Doodle className="floaty -bottom-2 right-4 text-5xl">🐾</Doodle>
          </div>
        </div>
      </section>

      <div className="overflow-hidden text-primary"><Squiggle className="h-10 min-w-[800px] w-full" /></div>

      <section id="our-vibe" className="relative overflow-hidden bg-rose px-4 py-20 sm:px-6">
        <Doodle className="right-[8%] top-8 text-5xl text-primary">✦</Doodle>
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="reveal relative mx-auto grid max-w-xl grid-cols-2 gap-5 px-3">
              <Polaroid src={dogPhoto} alt="A happy dog relaxing inside the cafe" caption="pups = VIPs" rotate="-rotate-3" className="mt-12" />
              <Polaroid src={gamesPhoto} alt="Friends enjoying a board game with a match on TV" caption="weekend plans sorted" rotate="rotate-3" />
              <span className="absolute left-[42%] top-[42%] z-40 rotate-6 rounded-full border-2 border-foreground bg-butter px-4 py-3 font-display text-xl font-bold shadow-playful">certified cozy ✓</span>
            </div>
            <div className="reveal">
              <p className="font-hand text-2xl text-primary">a little note from us ♡</p>
              <h2 className="mt-2 max-w-2xl text-6xl font-bold leading-[.85] sm:text-7xl">We made a place we’d never want to leave.</h2>
              <p className="mt-7 max-w-xl text-lg font-semibold leading-relaxed">Boho is your neighbourhood living room — except we make the cold coffee and clean up the cards. Come with family, bring the whole group chat, or claim a sunny corner with your furry sidekick.</p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed">Stay for the snacks. Linger for the match on our little corner TV. Nobody’s rushing you out.</p>
            </div>
          </div>
          <div className="mt-16 grid gap-5 sm:grid-cols-3">
            {[
              [PawPrint, "Paws welcome", "Water bowls, pats, and zero side-eye."],
              [Gamepad2, "Games get serious", "Cards and board games all weekend."],
              [Tv, "Match corner", "Cheer, snack, repeat on the corner TV."],
            ].map(([Icon, title, copy], index) => {
              const FeatureIcon = Icon as typeof PawPrint;
              return <article key={String(title)} className={`reveal doodle-border p-6 text-center ${index === 0 ? "bg-butter -rotate-1" : index === 1 ? "bg-paper rotate-1" : "bg-sage -rotate-1"}`}>
                <FeatureIcon className="wiggle-hover mx-auto size-12" />
                <h3 className="mt-3 text-3xl font-bold">{String(title)}</h3>
                <p className="mt-1 font-semibold">{String(copy)}</p>
              </article>;
            })}
          </div>
        </div>
      </section>

      <section id="menu" className="relative overflow-hidden px-4 py-20 sm:px-6">
        <Doodle className="floaty left-[5%] top-16 text-5xl">🥪</Doodle>
        <Doodle className="right-[5%] top-24 rotate-12 text-5xl">🥤</Doodle>
        <div className="mx-auto max-w-5xl">
          <div className="reveal text-center">
            <p className="font-hand text-2xl text-primary">made for sharing (but you don’t have to)</p>
            <h2 className="text-7xl font-bold sm:text-8xl">the good stuff</h2>
          </div>
          <div className="reveal relative mt-12 rotate-[.5deg] border-[3px] border-foreground bg-foreground p-6 text-background shadow-[8px_9px_0_var(--rose)] sm:p-10">
            <span className="absolute left-0 sm:-left-4 -top-5 z-40 -rotate-6 bg-butter px-5 py-2 font-hand text-xl text-foreground">tiny menu, big feelings</span>
            <div className="grid gap-12 md:grid-cols-2 md:gap-14">
              {menu.map((category) => (
                <div key={category.title}>
                  <h3 className="flex items-center gap-3 text-4xl font-bold text-accent"><span>{category.icon}</span>{category.title}</h3>
                  <Squiggle className="my-5 h-5 w-full text-rose" />
                  <div className="space-y-5">
                    {category.items.map(([name, price]) => (
                      <div key={name} className="flex items-end gap-2 font-bold">
                        <span className="text-lg">{name}</span><span className="mb-1 min-w-5 flex-1 border-b-2 border-dotted border-background/60" /><span className="text-xl text-accent">{price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-10 text-center font-hand text-lg text-rose">menu and prices shown for concept purposes — please check at the cafe for the latest ♡</p>
          </div>
        </div>
      </section>

      <div className="overflow-hidden text-sage"><Squiggle className="h-10 min-w-[800px] w-full" /></div>

      <section id="memories" className="overflow-hidden bg-sage px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="reveal flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <div><p className="font-hand text-2xl text-primary">proof we have too much fun</p><h2 className="text-7xl font-bold sm:text-8xl">vibe check ✦</h2></div>
            <div className="max-w-xs rotate-2 rounded-full border-2 border-foreground bg-butter px-5 py-3 font-bold shadow-playful">camera roll energy only 📸</div>
          </div>
          <div className="mt-14 grid items-start gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Polaroid src={foodPhoto} alt="Sandwiches, nachos, frankie and cold coffees around a game of cards" caption="table full, hearts fuller" rotate="-rotate-3" className="reveal lg:mt-14" />
            <Polaroid src={dogPhoto} alt="Cafe's four-legged guest" caption="the cutest regular" rotate="rotate-2" className="reveal" />
            <Polaroid src={hangoutPhoto} alt="A group of friends laughing over a card game" caption="group chat, but IRL" rotate="-rotate-2" className="reveal lg:mt-20" />
            <Polaroid src={gamesPhoto} alt="Board game evening at the cafe" caption="competitive? us? never." rotate="rotate-3" className="reveal lg:mt-5" />
          </div>
        </div>
      </section>

      <section id="visit-us" className="relative overflow-hidden px-4 py-20 sm:px-6">
        <Doodle className="floaty left-[4%] top-16 hidden text-7xl text-primary sm:block">☕</Doodle>
        <div className="mx-auto max-w-6xl">
          <div className="reveal text-center"><p className="font-hand text-2xl text-primary">you coming or what?</p><h2 className="text-7xl font-bold sm:text-8xl">find your way here</h2></div>
          <div className="mt-12 grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
            <div className="reveal relative doodle-border rotate-[-1deg] bg-coral p-7 text-primary-foreground sm:p-9">
              <div className="absolute right-0 sm:-right-5 -top-5 z-40 flex size-20 rotate-6 items-center justify-center rounded-full border-2 border-foreground bg-butter text-foreground shadow-playful"><MapPin className="size-10" /></div>
              <h3 className="text-5xl font-bold">Boho Cafe</h3>
              <div className="mt-7 space-y-5 text-lg font-bold">
                <p className="flex gap-3"><MapPin className="mt-1 shrink-0" /> Dam Road, Tathawade,<br />Pimpri-Chinchwad, Pune</p>
                <p className="flex gap-3"><Clock3 className="mt-1 shrink-0" /> Open daily · up to 11 pm</p>
                <p className="flex gap-3"><Phone className="mt-1 shrink-0" /> +91 98765 43210</p>
              </div>
            </div>
            <div className="reveal relative min-h-96 overflow-hidden doodle-border bg-butter p-7 sm:p-10">
              <div aria-hidden="true" className="doodle-map absolute inset-0 opacity-30" />
              <div className="relative flex h-full flex-col items-center justify-center text-center">
                <div className="flex size-28 items-center justify-center rounded-full border-[3px] border-foreground bg-rose shadow-playful"><MapPin className="size-14" /></div>
                <p className="mt-7 max-w-md font-display text-4xl font-bold">somewhere between “one coffee” and “okay, last game”</p>
                <div className="mt-7 flex flex-wrap justify-center gap-4">
                  <WhatsAppButton label="Message us" />
                  <Button asChild variant="cream" size="chunky"><a href="https://maps.app.goo.gl/1uP9tQb2QUZ8Pj6e8" target="_blank" rel="noreferrer">Get directions <ArrowUpRight /></a></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t-[3px] border-foreground bg-foreground px-4 py-10 text-background sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-7 text-center sm:flex-row sm:text-left">
          <div><p className="font-display text-4xl font-bold text-accent">see you soon, pookie ☕🐾</p><p className="mt-1 font-semibold">Come hungry. Stay unreasonably long.</p></div>
          <a href="#top" className="wiggle-hover flex items-center gap-2 font-bold">back to the top <Sparkles /></a>
          <div className="flex items-center gap-3"><Instagram /><Star className="text-accent" /><Heart className="text-rose" /></div>
        </div>
        <p className="mx-auto mt-8 max-w-7xl border-t border-background/30 pt-5 text-center text-xs font-semibold text-background/75">Concept design by <a href="https://veloizstudios.in" target="_blank" rel="noreferrer" className="underline hover:text-accent">Veloiz Studios</a> — an unaffiliated portfolio piece, not the cafe’s actual website.</p>
      </footer>
    </main>
  );
}