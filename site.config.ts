import type { SiteConfig } from "@/lib/site-config.types";

const config: SiteConfig = {
  mode: "single-store",

  brand: {
    name: "Fieldgate Farm Shop",
    tagline: "Seasonal vegetables, salads & preserves grown on our farm",
    description:
      "We grow over 60 varieties of vegetable, salad, and herb on our Leicestershire market garden, harvested the morning it's dispatched. No middlemen, no distribution centres — straight from the field to your door.",
    email: "hello@fieldgatefarm.co.uk",
    location: "Market Harborough, Leicestershire",
    foundedYear: 2009,
    socialInstagram: "https://instagram.com/fieldgatefarm",
    socialFacebook: "https://facebook.com/fieldgatefarm",
  },

  features: {
    producerOnboarding: false,
    adminPanel: false,
    multiProducer: false,
    stripeConnect: false,
    reviews: true,
  },

  stats: [
    { value: "60+", label: "Varieties Grown" },
    { value: "8 Acres", label: "Market Garden" },
    { value: "4.9★", label: "Average Rating" },
    { value: "Est. 2009", label: "Leicestershire" },
  ],
};

export default config;
