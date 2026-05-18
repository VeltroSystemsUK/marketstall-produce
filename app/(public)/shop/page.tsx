import type { Metadata } from "next";
import { Suspense } from "react";
import ProductCard from "@/components/products/ProductCard";
import ViewToggle from "@/components/shop/ViewToggle";
import { MOCK_PRODUCTS } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse our full range of artisan products.",
};

interface Props {
  searchParams: Promise<{ category?: string; q?: string; view?: string }>;
}

export default async function ShopPage({ searchParams }: Props) {
  const { category, q, view } = await searchParams;
  const isGrid = view !== "list";

  let products = MOCK_PRODUCTS.filter((p) => p.available);

  if (category) products = products.filter((p) => p.category === category);
  if (q) {
    const lower = q.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower),
    );
  }

  const categories = Array.from(
    new Set(MOCK_PRODUCTS.filter((p) => p.available).map((p) => p.category)),
  ).sort();

  const viewParam = isGrid ? "" : "&view=list";

  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-white border-b border-gray-100 px-4 pb-6 pt-24 sm:px-6">
        <div className="mx-auto max-w-6xl flex items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
              Shop
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {products.length} {products.length === 1 ? "product" : "products"}{" "}
              available
            </p>
          </div>
          <Suspense>
            <ViewToggle view={isGrid ? "grid" : "list"} />
          </Suspense>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {categories.length > 1 && (
          <div className="mb-6 flex flex-wrap gap-2">
            <a
              href={isGrid ? "/shop" : "/shop?view=list"}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                !category
                  ? "bg-forest-700 text-white"
                  : "bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-forest-50 hover:text-forest-700"
              }`}
            >
              All
            </a>
            {categories.map((cat) => (
              <a
                key={cat}
                href={`/shop?category=${encodeURIComponent(cat)}${viewParam}`}
                className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                  category === cat
                    ? "bg-forest-700 text-white"
                    : "bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-forest-50 hover:text-forest-700"
                }`}
              >
                {cat}
              </a>
            ))}
          </div>
        )}

        {products.length > 0 ? (
          <div
            className={
              isGrid
                ? "grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
                : "flex flex-col gap-3"
            }
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                view={isGrid ? "grid" : "list"}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center text-gray-400">
            <p className="text-lg font-medium">No products found</p>
            <p className="mt-1 text-sm">Try a different category.</p>
            <a
              href="/shop"
              className="mt-4 inline-block text-sm font-medium text-forest-700 hover:underline"
            >
              View all products
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
