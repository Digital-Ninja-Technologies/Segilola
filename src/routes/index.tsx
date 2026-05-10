import { createFileRoute } from "@tanstack/react-router";
import poster from "@/assets/segilola-poster.jpg";
import { Play, Ticket, Calendar, Clock, Globe, MapPin } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const SITE_URL =
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") ??
  "https://segilola-villain-showcase.lovable.app";
const POSTER_URL = `${SITE_URL}${poster}`;
const TRAILER_URL = "https://www.youtube.com/watch?v=BbUx334038U";
const TITLE = "Sègilolá (The Villain) — In Cinemas Nationwide May 1, 2026";
const DESCRIPTION =
  "A Stranger Rises. A Tyrant Strikes. A Kingdom Trembles. Sègilolá (The Villain), a FM Destiny Production, arrives in cinemas nationwide May 1, 2026. Starring Ibrahim Chatta, 9ice, Odunlade Adekola and Bimbo Akintola.";

const movieJsonLd = {
  "@context": "https://schema.org",
  "@type": "Movie",
  name: "Sègilolá (The Villain)",
  alternateName: "Segilola The Villain",
  description: DESCRIPTION,
  image: POSTER_URL,
  url: SITE_URL,
  inLanguage: "yo",
  countryOfOrigin: { "@type": "Country", name: "Nigeria" },
  genre: ["Epic", "Drama", "Historical"],
  datePublished: "2026-05-01",
  trailer: {
    "@type": "VideoObject",
    name: "Sègilolá (The Villain) — Official Trailer",
    description: DESCRIPTION,
    thumbnailUrl: POSTER_URL,
    uploadDate: "2026-03-01",
    embedUrl: "https://www.youtube.com/embed/BbUx334038U",
    contentUrl: TRAILER_URL,
  },
  director: [
    { "@type": "Person", name: "Muhydeen S. Ayinde" },
    { "@type": "Person", name: "Seun Olaiya" },
  ],
  productionCompany: { "@type": "Organization", name: "FM Destiny Productions" },
  distributor: { "@type": "Organization", name: "The Nile Entertainment" },
  actor: [
    "Ibrahim Chatta",
    "9ice (Akande Abolore Adegbola)",
    "Odunlade Adekola",
    "Bimbo Akintola",
    "Antar Laniyan",
    "Faith Williams",
    "Funmilayo Omikunle",
    "Toyosi Adesanya",
    "Fali Werepe",
  ].map((name) => ({ "@type": "Person", name })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "Segilola, Segilola The Villain, Sègilolá, Yoruba movie 2026, Nollywood epic, Ibrahim Chatta, 9ice, Odunlade Adekola, FM Destiny Productions, Nile Entertainment, May 1 2026",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "theme-color", content: "#1a0a0a" },

      // Open Graph (video.movie)
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "video.movie" },
      { property: "og:url", content: SITE_URL },
      { property: "og:site_name", content: "Sègilolá (The Villain)" },
      { property: "og:locale", content: "en_US" },
      { property: "og:image", content: POSTER_URL },
      { property: "og:image:secure_url", content: POSTER_URL },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "1800" },
      { property: "og:image:alt", content: "Sègilolá (The Villain) — official movie poster" },
      { property: "video:release_date", content: "2026-05-01" },
      { property: "video:duration", content: "7200" },
      { property: "og:video", content: TRAILER_URL },
      { property: "og:video:url", content: TRAILER_URL },
      { property: "og:video:secure_url", content: "https://www.youtube.com/embed/BbUx334038U" },
      { property: "og:video:type", content: "text/html" },

      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: POSTER_URL },
      { name: "twitter:image:alt", content: "Sègilolá (The Villain) — official movie poster" },
      { name: "twitter:player", content: "https://www.youtube.com/embed/BbUx334038U" },
      { name: "twitter:player:width", content: "1280" },
      { name: "twitter:player:height", content: "720" },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(movieJsonLd),
      },
    ],
  }),
  component: Landing,
});

const cast = [
  "Ibrahim Chatta",
  "9ice (Akande Abolore Adegbola)",
  "Odunlade Adekola",
  "Bimbo Akintola",
  "Antar Laniyan",
  "Faith Williams",
  "Funmilayo Omikunle",
  "Toyosi Adesanya",
  "Fali Werepe",
];

const scenes = [
  {
    title: "The Stranger Arrives",
    tag: "Act I",
    gradient: "from-burgundy via-background to-background",
  },
  {
    title: "A Grudge Ignites",
    tag: "Act I",
    gradient: "from-background via-burgundy/60 to-gold/20",
  },
  {
    title: "Whispers in the Palace",
    tag: "Act II",
    gradient: "from-gold/30 via-background to-burgundy/40",
  },
  {
    title: "The Tyrant Strikes",
    tag: "Act II",
    gradient: "from-burgundy via-burgundy/70 to-background",
  },
  {
    title: "A Kingdom Trembles",
    tag: "Act III",
    gradient: "from-background via-gold/20 to-burgundy",
  },
  {
    title: "Who Will Rise?",
    tag: "Finale",
    gradient: "from-gold/40 via-burgundy/60 to-background",
  },
];

const cinemas = [
  { name: "Silverbird Cinemas", city: "Lagos · Abuja · Port Harcourt" },
  { name: "Filmhouse Cinemas", city: "Nationwide" },
  { name: "Genesis Cinemas", city: "Lagos · Abuja · Asaba" },
  { name: "EbonyLife Place", city: "Victoria Island, Lagos" },
  { name: "Ozone Cinemas", city: "Yaba, Lagos" },
  { name: "Magic Land Cinemas", city: "Abuja" },
];

function Landing() {
  useScrollReveal();
  const embers = Array.from({ length: 28 });
  return (
    <main className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-screen bg-cinematic bg-grain bg-vignette overflow-hidden">
        {/* faded poster watermark */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.10] bg-center bg-cover animate-slow-zoom mix-blend-screen"
          style={{ backgroundImage: `url(${poster})` }}
        />

        {/* floating embers */}
        <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
          {embers.map((_, i) => {
            const left = (i * 37) % 100;
            const dur = 9 + ((i * 13) % 14);
            const delay = (i * 0.7) % 12;
            const size = 2 + (i % 4);
            return (
              <span
                key={i}
                className="ember"
                style={{
                  left: `${left}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  animationDuration: `${dur}s`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
          <div className="font-display text-gold text-lg md:text-xl tracking-[0.3em]">
            FM DESTINY
          </div>
          <nav className="hidden md:flex gap-8 text-sm tracking-widest text-foreground/80">
            <a href="#story" className="hover:text-gold transition">
              STORY
            </a>
            <a href="#trailer" className="hover:text-gold transition">
              TRAILER
            </a>
            <a href="#gallery" className="hover:text-gold transition">
              GALLERY
            </a>
            <a href="#cast" className="hover:text-gold transition">
              CAST
            </a>
            <a href="#showtimes" className="hover:text-gold transition">
              SHOWTIMES
            </a>
          </nav>
          <div className="text-xs md:text-sm tracking-widest text-gold/80">A NILE RELEASE</div>
        </header>

        {/* Cinematic flash overlay */}
        <div className="absolute inset-0 bg-white/80 animate-hero-flash z-20" />

        {/* Hero content */}
        <div className="relative z-10 grid lg:grid-cols-[auto,1fr] gap-12 lg:gap-16 items-center px-6 md:px-12 lg:px-20 pt-8 pb-24">
          <div className="animate-dramatic-poster mx-auto lg:mx-0">
            <img
              src={poster}
              alt="Sègilolá (The Villain) official movie poster"
              className="w-[280px] md:w-[360px] lg:w-[420px] rounded-md shadow-poster animate-soft-float hover-soft"
            />
          </div>

          <div className="text-center lg:text-left max-w-2xl">
            <div
              className="animate-dramatic-sweep inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/5 text-gold text-xs tracking-[0.25em] mb-6"
              style={{ animationDelay: "0.4s" }}
            >
              <Ticket className="w-3.5 h-3.5" /> IN CINEMAS MAY 1, 2026
            </div>
            <h1
              className="animate-dramatic-rise font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] text-gradient-gold"
              style={{ animationDelay: "0.6s" }}
            >
              SÈGILOLÁ
            </h1>
            <p
              className="animate-dramatic-sweep font-display tracking-[0.4em] text-foreground/70 mt-4 text-sm md:text-base"
              style={{ animationDelay: "1.0s" }}
            >
              ( THE&nbsp;&nbsp;VILLAIN )
            </p>
            <p
              className="animate-dramatic-sweep mt-8 text-lg md:text-xl text-foreground/85 italic font-light"
              style={{ animationDelay: "1.2s" }}
            >
              "A Stranger Rises. A Tyrant Strikes. A Kingdom Trembles."
            </p>

            <div
              className="animate-dramatic-sweep mt-10 flex flex-wrap gap-4 justify-center lg:justify-start"
              style={{ animationDelay: "1.4s" }}
            >
              <a
                href="https://www.youtube.com/watch?v=BbUx334038U"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-gold text-primary-foreground font-semibold px-7 py-3.5 rounded-full hover-soft animate-soft-glow shadow-lg shadow-gold/20"
              >
                <Play className="w-5 h-5 fill-current" /> Watch Trailer
              </a>
              <a
                href="#showtimes"
                className="inline-flex items-center gap-3 border border-gold/50 text-gold px-7 py-3.5 rounded-full hover-soft hover:bg-gold/10"
              >
                <Ticket className="w-5 h-5" /> Find Showtimes
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 justify-center lg:justify-start text-sm text-foreground/70">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold" /> May 1, 2026
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold" /> 2h 00m
              </span>
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gold" /> Yoruba (Eng. Subs)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section
        id="story"
        className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t border-border/40"
      >
        <div className="max-w-4xl mx-auto text-center reveal">
          <p className="text-gold tracking-[0.3em] text-xs mb-6">— THE STORY —</p>
          <h2 className="font-display text-3xl md:text-5xl text-gradient-gold mb-10 leading-tight">
            A petty grudge.
            <br />
            An empire on fire.
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
            In the rich, textured backdrop of precolonial Yorùbáland, a ruthless and wealthy woman
            named <span className="text-gold">Sègilolá</span> sets her sights on a powerful man over
            a personal grudge. As her obsession unravels the peace of a quiet village, loyalties
            fracture, secrets surface, and a looming threat emerges from the shadows.
          </p>
          <p className="mt-6 text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
            When tyranny strikes the throne — who will rise to save them all?
          </p>
        </div>
      </section>

      {/* TRAILER */}
      <section
        id="trailer"
        className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t border-border/40 bg-cinematic bg-grain overflow-hidden"
      >
        <div className="max-w-5xl mx-auto text-center reveal">
          <p className="text-gold tracking-[0.3em] text-xs mb-6">— OFFICIAL TRAILER —</p>
          <h2 className="font-display text-3xl md:text-5xl text-gradient-gold mb-12 leading-tight">
            Witness the Rise of a Villain
          </h2>
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-poster border border-gold/30 hover-soft">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/BbUx334038U"
              title="Sègilolá (The Villain) — Official Trailer"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section
        id="gallery"
        className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 border-t border-border/40"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-gold tracking-[0.3em] text-xs mb-6">— SCENES FROM THE FILM —</p>
            <h2 className="font-display text-3xl md:text-5xl text-gradient-gold">
              A Glimpse Into the Epic
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 reveal">
            {scenes.map((s, i) => (
              <figure
                key={s.title}
                className="group relative aspect-[4/3] overflow-hidden rounded-md border border-border/60 hover:border-gold/60 hover-soft cursor-pointer"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${s.gradient} animate-slow-zoom`}
                  style={{ animationDelay: `${i * 0.4}s` }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-30 mix-blend-overlay bg-center bg-cover"
                  style={{ backgroundImage: `url(${poster})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-gold/80 text-[10px] tracking-[0.3em] mb-1">{s.tag}</p>
                  <p className="font-display text-base md:text-lg text-foreground group-hover:text-gold transition-colors duration-500">
                    {s.title}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CAST */}
      <section
        id="cast"
        className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-card/30 border-y border-border/40"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-gold tracking-[0.3em] text-xs mb-6">— THE ENSEMBLE —</p>
            <h2 className="font-display text-3xl md:text-5xl text-gradient-gold">
              A Cast of Titans
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border/40 border border-border/40 reveal">
            {cast.map((name) => (
              <div
                key={name}
                className="bg-background/60 px-6 py-8 text-center hover:bg-gold/5 hover-soft group"
              >
                <p className="font-display text-base md:text-lg text-foreground group-hover:text-gold transition-colors duration-500">
                  {name}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8 text-center text-sm">
            <div>
              <p className="text-gold/70 tracking-widest text-xs mb-2">DIRECTED BY</p>
              <p className="font-display text-lg">Muhydeen S. Ayinde</p>
              <p className="font-display text-lg">Seun Olaiya</p>
            </div>
            <div>
              <p className="text-gold/70 tracking-widest text-xs mb-2">PRODUCED BY</p>
              <p className="font-display text-lg">FM Destiny Productions</p>
            </div>
            <div>
              <p className="text-gold/70 tracking-widest text-xs mb-2">DISTRIBUTED BY</p>
              <p className="font-display text-lg">The Nile Entertainment</p>
            </div>
          </div>
        </div>
      </section>

      {/* SHOWTIMES */}
      <section id="showtimes" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold tracking-[0.3em] text-xs mb-6">— SHOWING AT —</p>
            <h2 className="font-display text-3xl md:text-5xl text-gradient-gold">
              Cinemas Nationwide
            </h2>
            <p className="mt-4 text-foreground/70">From Friday, May 1, 2026</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 reveal">
            {cinemas.map((c) => (
              <div
                key={c.name}
                className="border border-border bg-card/40 p-6 rounded-md hover:border-gold/60 hover-soft group"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <div>
                    <p className="font-display text-lg group-hover:text-gold transition-colors duration-500">
                      {c.name}
                    </p>
                    <p className="text-sm text-foreground/60 mt-1">{c.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center reveal">
            <a
              href="https://silverbirdcinemas.com/movie/segilola-the-villain/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-gold text-primary-foreground font-semibold px-8 py-4 rounded-full hover-soft animate-soft-glow shadow-lg shadow-gold/20"
            >
              <Ticket className="w-5 h-5" /> Book Your Tickets
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/40 bg-burgundy/30 py-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-center justify-between text-sm text-foreground/60">
          <div className="font-display text-gold tracking-[0.3em]">SÈGILOLÁ — 2026</div>
          <div className="text-center">© FM Destiny Productions. A Nile Entertainment Release.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold transition">
              Instagram
            </a>
            <a href="#" className="hover:text-gold transition">
              X
            </a>
            <a href="#" className="hover:text-gold transition">
              YouTube
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
