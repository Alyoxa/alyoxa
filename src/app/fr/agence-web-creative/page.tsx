import MarketPage from "@/components/sections/Market/MarketPage";
import { getMarket } from "@/lib/markets";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/fr/agence-web-creative");
export default function Page() { return <MarketPage market={getMarket("france")!} />; }
