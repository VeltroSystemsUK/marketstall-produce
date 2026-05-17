import Image from "next/image";
import Link from "next/link";
import config from "@/site.config";
import {
  ArrowRight,
  Star,
  ShieldCheck,
  Truck,
  RefreshCw,
  PackageCheck,
  Sprout,
  Sun,
} from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { MOCK_PRODUCTS, MOCK_REVIEWS, MOCK_PRODUCERS } from "@/lib/mock-data";

const FEATURED_PRODUCTS = MOCK_PRODUCTS.filter((p) => p.featured).slice(0, 4);
const PRODUCER = MOCK_PRODUCERS[0];

const MARKETPLACE_STATS = [
  { value: "150+", label: "Local Producers" },
  { value: "2,000+", label: "Products Listed" },
  { value: "12,000+", label: "Happy Customers" },
  { value: "4 Counties", label: "East Midlands" },
];

const STATS = config.stats ?? MARKETPLACE_STATS;

const HOW_IT_WORKS = config.features.multiProducer
  ? [
      {
        icon: Sprout,
        title: "Discover local producers",
        body: "Browse farms and artisans across the East Midlands. Read their stories, see their methods, and find your favourites.",
      },
      {
        icon: ShieldCheck,
        title: "Order with confidence",
        body: "Secure checkout, flexible fulfilment — delivery to your door or click & collect from the farm.",
      },
      {
        icon: PackageCheck,
        title: "Taste the difference",
        body: "Food grown and prepared at its best. You'll taste why it matters.",
      },
    ]
  : [
      {
        icon: Sprout,
        title: "Choose your box",
        body: "Pick a seasonal veg box or shop individual lines — heritage tomatoes, salad leaves, eggs, and preserves all grown or made on our Leicestershire farm.",
      },
      {
        icon: ShieldCheck,
        title: "Order securely",
        body: "Checkout with Stripe-powered payment. Choose next-morning delivery or collect from the farm shop on Lubenham Hill.",
      },
      {
        icon: PackageCheck,
        title: "Harvested, packed, dispatched same morning",
        body: "We harvest before dawn on dispatch days. Everything is packed and collected by the courier before 9am — field to door in under 24 hours.",
      },
    ];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&q=85"
          alt="Fresh seasonal vegetables harvested from the market garden"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="gradient-hero absolute inset-0" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            <Sun className="h-3.5 w-3.5 text-harvest-400" />
            {config.brand.location} · Harvested Today · Est.{" "}
            {config.brand.foundedYear}
          </div>
          <h1 className="font-display mb-6 text-5xl font-bold leading-tight text-balance sm:text-6xl lg:text-7xl">
            Food that tastes
            <span className="block italic text-harvest-400">of the field.</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
            {config.brand.tagline}. Harvested before dawn, packed by hand, and
            at your door before you&apos;ve thought about dinner.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-2xl bg-harvest-500 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-harvest-600 hover:shadow-xl"
            >
              Shop our produce <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/producers/${PRODUCER.slug}`}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Our story
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="h-10 w-6 rounded-full border-2 border-white/40 p-1">
            <div className="h-2 w-full rounded-full bg-white/60" />
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────── */}
      <section className="bg-forest-800 py-8">
        <div className="mx-auto max-w-5xl px-4">
          <dl className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="font-display text-3xl font-bold text-harvest-400">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-sm text-forest-300">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ──────────────────────────────────── */}
      <section className="section-pad bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-harvest-600">
                Harvested this morning
              </p>
              <h2 className="font-display text-4xl font-bold text-gray-900">
                What&apos;s in season now
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden items-center gap-1 text-sm font-medium text-forest-700 hover:text-forest-900 sm:flex"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/shop" className="text-sm font-medium text-forest-700">
              View full range →
            </Link>
          </div>
        </div>
      </section>

      {/* ── OUR STORY ─────────────────────────────────────────── */}
      {config.features.multiProducer ? (
        <section className="section-pad relative overflow-hidden bg-forest-950">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-harvest-500">
                The people behind your food
              </p>
              <h2 className="font-display text-4xl font-bold text-white">
                Meet our producers
              </h2>
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/producers"
                className="inline-flex items-center gap-2 rounded-2xl border border-forest-700 px-6 py-3 text-sm font-medium text-forest-300 transition-colors hover:border-harvest-500 hover:text-harvest-400"
              >
                See all producers →
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section className="section-pad relative overflow-hidden bg-forest-950">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="https://images.unsplash.com/photo-1518843875459-f738682238a6?w=1600&q=60"
              alt=""
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-harvest-500">
                  Our story
                </p>
                <h2 className="font-display mb-6 text-4xl font-bold text-white sm:text-5xl">
                  Two Londoners, eight acres, sixty varieties.
                </h2>
                <p className="mb-4 text-base leading-relaxed text-forest-300">
                  {PRODUCER.story?.split(". ").slice(0, 3).join(". ")}.
                </p>
                <p className="mb-8 text-base leading-relaxed text-forest-300">
                  {PRODUCER.story?.split(". ").slice(3).join(". ")}
                </p>
                <Link
                  href={`/producers/${PRODUCER.slug}`}
                  className="inline-flex items-center gap-2 rounded-2xl bg-harvest-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-harvest-600"
                >
                  Meet the growers <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="relative h-80 overflow-hidden rounded-3xl lg:h-[480px]">
                <Image
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80"
                  alt="Rows of vegetables growing in the Fieldgate Farm polytunnel"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── HOW IT WORKS ───────────────────────────────────────── */}
      <section className="section-pad bg-cream">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-harvest-600">
              Field to door in 24 hours
            </p>
            <h2 className="font-display text-4xl font-bold text-gray-900">
              How {config.brand.name} works
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {HOW_IT_WORKS.map((step, idx) => (
              <div key={step.title} className="flex flex-col items-start">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-100">
                  <step.icon className="h-6 w-6 text-forest-700" />
                </div>
                <div className="mb-2 text-xs font-bold text-forest-500">
                  STEP {idx + 1}
                </div>
                <h3 className="font-display mb-2 text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES ───────────────────────────────────────── */}
      <section className="border-y border-gray-100 bg-white py-10">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-forest-50 p-3">
                <Truck className="h-6 w-6 text-forest-700" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  Next-morning delivery
                </h4>
                <p className="text-sm text-gray-500">
                  Order before 6pm for next-morning delivery across the
                  Midlands. Harvested that morning, at your door by noon.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-forest-50 p-3">
                <RefreshCw className="h-6 w-6 text-forest-700" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">No cold storage</h4>
                <p className="text-sm text-gray-500">
                  Nothing sits in a distribution centre for four days. Every
                  item goes from our field directly into your delivery box.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-forest-50 p-3">
                <ShieldCheck className="h-6 w-6 text-forest-700" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  No-dig, no-spray
                </h4>
                <p className="text-sm text-gray-500">
                  We farm using no-dig methods and homemade compost. No
                  herbicides, no synthetic fertilisers — just healthy soil.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────── */}
      <section className="section-pad bg-earth-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-harvest-600">
              Happy customers
            </p>
            <h2 className="font-display text-4xl font-bold text-gray-900">
              What people say
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {MOCK_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
              >
                <div className="mb-3 flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
                    />
                  ))}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-gray-700">
                  &ldquo;{review.comment}&rdquo;
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {review.consumerName}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-forest-800 py-24">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&q=60"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-display mb-4 text-4xl font-bold text-white sm:text-5xl">
            Taste what vegetables are supposed to taste like.
          </h2>
          <p className="mb-8 text-lg text-forest-300">
            Harvested that morning, no cold storage, no middlemen. Join over
            2,600 households who&apos;ve never gone back.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-2xl bg-harvest-500 px-10 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-harvest-600"
          >
            Shop our produce <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
