import prisma from "../prisma";

export async function getListingByLocation (location?: string) {
    const listings = await prisma.listing.findMany({
        where: {
            ...(location && {
                location: {
                    contains: location,
                    mode: 'insensitive'
                }
            }),
            isAvailable: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return listings;
}