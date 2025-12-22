import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice Don",
    email: "alice@gmail.com",
    salt: "sdjffsdflk",
    password: "Alice@15622",
    listings: {
        create: [
            {
                type: "Bike",
                name: "KTM Duke 390",
                description: "The KTM 390 Duke is a popular lightweight naked bike featuring a new 399cc liquid-cooled single-cylinder engine (around 45 hp/39 Nm torque), a lightweight frame with adjustable WP APEX suspension, upgraded ByBre brakes, and premium tech like Cornering ABS, Motorcycle Traction Control (MTC), and ride modes, offering agile handling and exciting performance for its class, with updated styling for recent models.",
                pricePerDay: 1000,
                location: "Bharatpur-10, Katarchwok, Chitwan",
                image: {url: "/vehicle1.jfif", publicId: "1"},
            },
            {
                type: "Scooter",
                name: "Honda Dio",
                description: "The KTM 390 Duke is a popular lightweight naked bike featuring a new 399cc liquid-cooled single-cylinder engine (around 45 hp/39 Nm torque), a lightweight frame with adjustable WP APEX suspension, upgraded ByBre brakes, and premium tech like Cornering ABS, Motorcycle Traction Control (MTC), and ride modes, offering agile handling and exciting performance for its class, with updated styling for recent models.",
                pricePerDay: 1000,
                location: "Bharatpur-10, Katarchwok, Chitwan",
                image: {url: "/vehicle.jfif", publicId: "12"},
            },
            {
                type: "Bike",
                name: "Royal Enfield",
                description: "The KTM 390 Duke is a popular lightweight naked bike featuring a new 399cc liquid-cooled single-cylinder engine (around 45 hp/39 Nm torque), a lightweight frame with adjustable WP APEX suspension, upgraded ByBre brakes, and premium tech like Cornering ABS, Motorcycle Traction Control (MTC), and ride modes, offering agile handling and exciting performance for its class, with updated styling for recent models.",
                pricePerDay: 1000,
                location: "Bharatpur-10, Katarchwok, Chitwan",
                image: {url: "/vehicle3.jfif", publicId: "123"},
            },
        ]
    }
  },
  {
    name: "Ayush Pandey",
    email: "ayush@gmail.com",
    salt: "sdkjfkldsflkjsd",
    password: "Ayush@15622",
    listings: {
        create: [
            {
                type: "Bike",
                name: "Yamaha MT-15",
                description: "The KTM 390 Duke is a popular lightweight naked bike featuring a new 399cc liquid-cooled single-cylinder engine (around 45 hp/39 Nm torque), a lightweight frame with adjustable WP APEX suspension, upgraded ByBre brakes, and premium tech like Cornering ABS, Motorcycle Traction Control (MTC), and ride modes, offering agile handling and exciting performance for its class, with updated styling for recent models.",
                pricePerDay: 1000,
                location: "Bharatpur-10, Katarchwok, Chitwan",
                image: {url: "/vehicle4.jfif", publicId: "1234"},
            },
            {
                type: "Bike",
                name: "Kawasaki Ninja",
                description: "The KTM 390 Duke is a popular lightweight naked bike featuring a new 399cc liquid-cooled single-cylinder engine (around 45 hp/39 Nm torque), a lightweight frame with adjustable WP APEX suspension, upgraded ByBre brakes, and premium tech like Cornering ABS, Motorcycle Traction Control (MTC), and ride modes, offering agile handling and exciting performance for its class, with updated styling for recent models.",
                pricePerDay: 1000,
                location: "Bharatpur-10, Katarchwok, Chitwan",
                image: {url: "/vehicle5.jfif", publicId: "12345"},
            },
            {
                type: "Bike",
                name: "Honda Dio",
                description: "The KTM 390 Duke is a popular lightweight naked bike featuring a new 399cc liquid-cooled single-cylinder engine (around 45 hp/39 Nm torque), a lightweight frame with adjustable WP APEX suspension, upgraded ByBre brakes, and premium tech like Cornering ABS, Motorcycle Traction Control (MTC), and ride modes, offering agile handling and exciting performance for its class, with updated styling for recent models.",
                pricePerDay: 1000,
                location: "Bharatpur-10, Katarchwok, Chitwan",
                image: {url: "/vehicle2.jfif", publicId: "123456"},
            },
        ]
    }
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();