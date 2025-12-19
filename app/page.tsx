import ListingCard from "@/components/listing/ListingCard";
import { getListingByLocation } from "@/lib/actions/listing";
import Link from "next/link";
import { Suspense } from "react";
import { FaAngleRight } from "react-icons/fa6";

function ListingSkeleton() {
  return (
    <div className="w-full space-y-5">
      <div className="h-6 w-64 bg-border rounded-lg" />
      <div className="w-full flex flex-row gap-x-5 overflow-x-hidden">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="w-full min-w-52.5 flex flex-col gap-y-4 items-stretch"
          >
            <div className="h-48 w-full rounded-3xl bg-border" />
            <div className="space-y-1 px-2">
              <div className="h-4 w-3/4 bg-border rounded-lg" />
              <div className="h-4 w-1/2 bg-border rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

async function ListingSection({
  city,
  title,
  priority = false,
}: {
  city: string;
  title: string;
  priority?: boolean;
}) {
  try {
    const listings = await getListingByLocation();

    return (
      <div className="space-y-5 w-full">
        <Link
          href={`/search?location=${city}`}
          className="flex w-fit flex-row gap-x-1 items-center font-medium text-xl"
        >
          <span>{title}</span>
          <FaAngleRight className="text-sm" />
        </Link>
        <div className="w-full flex gap-x-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth">
          {listings.map((listing: any) => {
            return <ListingCard key={listing.id} listing={listing} />;
          })}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Failed to load {title}
      </div>
    );
  }
}

export default async function Home() {
  return (
    <div className="flex mx-auto flex-col gap-10">
      <Suspense fallback={<ListingSkeleton />}>
        <ListingSection
          city="bharatpur"
          title="Popular bikes in Bharatpur"
          priority={true}
        />
      </Suspense>

      <Suspense fallback={<ListingSkeleton />}>
        <ListingSection
          city="kathmandu"
          title="Available vehicles in Kathmandu"
        />
      </Suspense>

      <Suspense fallback={<ListingSkeleton />}>
        <ListingSection city="pokhara" title="Rent and ride within Pokhara" />
      </Suspense>
    </div>
  );
}
