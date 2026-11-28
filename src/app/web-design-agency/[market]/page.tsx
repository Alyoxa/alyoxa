import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MarketPage from "@/components/sections/Market/MarketPage";
import { markets, getMarket } from "@/lib/markets";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ market: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return markets.filter(market => market.lang === "en").map(market => ({ market: market.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const market = getMarket((await params).market);
  return market ? pageMetadata(market.path as `/web-design-agency/${string}`) : {};
}
export default async function Page({ params }: Props) {
  const market = getMarket((await params).market);
  if (!market || market.lang !== "en") notFound();
  return <MarketPage market={market} />;
}
