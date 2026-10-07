import DailyDeals from "@/components/DailyDeals";
import ExclusiveCollection from "@/components/ExclusiveCollection";
import Hero from "@/components/Hero";
import NewCollection from "@/components/NewCollection";
import PopularCategories from "@/components/PopularCategories";
// import UnlimitedOffer from "@/components/UnlimitedOffer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white font-sans">
      <Hero />
      {/* <UnlimitedOffer /> */}
      <ExclusiveCollection />
      <PopularCategories />
      <DailyDeals />
      <NewCollection />
    </div>
  );
}
