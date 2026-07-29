export const cars = [
  // --- NEW DELHI (DL) ---
  {
    brand: "BMW", model: "X5", registrationNumber: "DL 01 RF 2245", year: 2023, category: "SUV", pricePerDay: 8000,
    location: "New Delhi", seatingCapacity: 5, fuel: "Petrol", transmission: "Automatic", rating: 4.8,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop",
    description: "A commanding SUV with a smooth ride, generous cabin space, and confident handling on any road.",
  },
  {
    brand: "Audi", model: "A4", registrationNumber: "DL 03 CA 2776", year: 2022, category: "Sedan", pricePerDay: 7000,
    location: "New Delhi", seatingCapacity: 5, fuel: "Petrol", transmission: "Automatic", rating: 4.6, 
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop",
    description: "Understated luxury sedan that balances comfort, efficiency, and everyday practicality.",
  },
  {
    brand: "Hyundai", model: "Creta", registrationNumber: "DL 04 EF 9012", year: 2023, category: "SUV", pricePerDay: 3500,
    location: "New Delhi", seatingCapacity: 5, fuel: "Petrol", transmission: "Automatic", rating: 4.7,
    image: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800&auto=format&fit=crop",
    description: "India's favorite compact SUV offering premium features, a panoramic sunroof, and a smooth drive.",
  },
  {
    brand: "Maruti Suzuki", model: "Baleno", registrationNumber: "DL 08 CD 4321", year: 2022, category: "Hatchback", pricePerDay: 1800,
    location: "New Delhi", seatingCapacity: 5, fuel: "Petrol", transmission: "Manual", rating: 4.3,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop",
    description: "A premium hatchback with a spacious cabin, excellent fuel efficiency, and a refined engine.",
  },
  {
    brand: "Tesla", model: "Model 3", registrationNumber: "DL 12 EV 2477", year: 2024, category: "Luxury", pricePerDay: 12000,
    location: "New Delhi", seatingCapacity: 5, fuel: "Electric", transmission: "Automatic", rating: 4.7, 
    image: "https://images.unsplash.com/photo-1554744512-d6c603f27c54?w=800&auto=format&fit=crop",
    description: "Instant torque, minimalist cabin, and zero emissions — driving reimagined.",
  },

  // --- MUMBAI (MH) ---
  {
    brand: "Mercedes-Benz", model: "S-Class", registrationNumber: "MH 01 AB 4856", year: 2023, category: "Luxury", pricePerDay: 22000,
    location: "Mumbai", seatingCapacity: 4, fuel: "Petrol", transmission: "Automatic", rating: 4.9, 
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop",
    description: "The flagship of refined travel — quiet, powerful, and finished to the last detail.",
  },
  {
    brand: "Toyota", model: "Innova Crysta", registrationNumber: "MH 02 XY 1245", year: 2022, category: "SUV", pricePerDay: 4500,
    location: "Mumbai", seatingCapacity: 7, fuel: "Diesel", transmission: "Manual", rating: 4.5, 
    image: "https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=800&auto=format&fit=crop",
    description: "Spacious, dependable, and family-friendly — built for long drives with room to spare.",
  },
  {
    brand: "Tata", model: "Nexon EV", registrationNumber: "MH 04 EE 9988", year: 2023, category: "SUV", pricePerDay: 3800,
    location: "Mumbai", seatingCapacity: 5, fuel: "Electric", transmission: "Automatic", rating: 4.6,
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop",
    description: "India's best-selling electric SUV. Zippy, silent, and perfect for city commutes.",
  },
  {
    brand: "Skoda", model: "Kushaq", registrationNumber: "MH 47 LM 5566", year: 2023, category: "SUV", pricePerDay: 3800,
    location: "Mumbai", seatingCapacity: 5, fuel: "Petrol", transmission: "Automatic", rating: 4.7,
    image: "https://unsplash.com/photos/blue-coupe-beside-gray-house-p7tai9P7H-s?w=800&auto=format&fit=crop",
    description: "European build quality meets striking design. A driver's SUV with impeccable handling.",
  },
  {
    brand: "Volkswagen", model: "Virtus", registrationNumber: "MH 03 PQ 8822", year: 2024, category: "Sedan", pricePerDay: 3500,
    location: "Mumbai", seatingCapacity: 5, fuel: "Petrol", transmission: "Automatic", rating: 4.8,
    image: "https://unsplash.com/photos/blue-chevrolet-coupe-2AovfzYV3rc?w=800&auto=format&fit=crop",
    description: "A gorgeous premium sedan offering class-leading space and thrilling driving dynamics.",
  },

  // --- BENGALURU (KA) ---
  {
    brand: "Honda", model: "City", registrationNumber: "KA 01 MX 3456", year: 2023, category: "Sedan", pricePerDay: 3000,
    location: "Bengaluru", seatingCapacity: 5, fuel: "Petrol", transmission: "Automatic", rating: 4.4, 
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&auto=format&fit=crop",
    description: "A well-mannered sedan with responsive handling and a comfortable, quiet cabin.",
  },
  {
    brand: "Mahindra", model: "XUV700", registrationNumber: "KA 05 RT 7788", year: 2023, category: "SUV", pricePerDay: 5500,
    location: "Bengaluru", seatingCapacity: 7, fuel: "Diesel", transmission: "Automatic", rating: 4.9,
    image: "https://images.unsplash.com/photo-1632245889029-e406faaa34cd?w=800&auto=format&fit=crop",
    description: "A tech-laden powerhouse featuring advanced ADAS, luxury interiors, and raw performance.",
  },
  {
    brand: "Toyota", model: "Fortuner", registrationNumber: "KA 51 AB 1111", year: 2022, category: "SUV", pricePerDay: 8500,
    location: "Bengaluru", seatingCapacity: 7, fuel: "Diesel", transmission: "Automatic", rating: 4.8,
    image: "https://unsplash.com/photos/yellow-porsche-911-on-road-during-daytime-DwxlhTvC16Q?w=800&auto=format&fit=crop",
    description: "The undisputed king of Indian roads. Imposing presence and unmatched reliability.",
  },
  {
    brand: "Tata", model: "Altroz", registrationNumber: "KA 03 GH 4433", year: 2022, category: "Hatchback", pricePerDay: 2000,
    location: "Bengaluru", seatingCapacity: 5, fuel: "Diesel", transmission: "Manual", rating: 4.5,
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop",
    description: "India's safest premium hatchback with striking styling and stellar highway stability.",
  },
  {
    brand: "Audi", model: "Q5", registrationNumber: "KA 04 KL 9090", year: 2023, category: "Luxury", pricePerDay: 13000,
    location: "Bengaluru", seatingCapacity: 5, fuel: "Petrol", transmission: "Automatic", rating: 4.7,
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&auto=format&fit=crop",
    description: "A progressive luxury SUV blending sporty performance with everyday usability.",
  },

  // --- CHENNAI (TN) ---
  {
    brand: "Maruti Suzuki", model: "Swift", registrationNumber: "TN 01 BX 2456", year: 2023, category: "Hatchback", pricePerDay: 1800,
    location: "Chennai", seatingCapacity: 5, fuel: "Petrol", transmission: "Manual", rating: 4.2, 
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&auto=format&fit=crop",
    description: "Nimble, economical, and easy to park — the practical choice for city driving.",
  },
  {
    brand: "MG", model: "Hector", registrationNumber: "TN 22 CV 6677", year: 2023, category: "SUV", pricePerDay: 4200,
    location: "Chennai", seatingCapacity: 5, fuel: "Petrol", transmission: "Automatic", rating: 4.6,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop",
    description: "India's first internet car. Packed with tech, voice commands, and massive interior space.",
  },
  {
    brand: "Kia", model: "Sonet", registrationNumber: "TN 07 FQ 3344", year: 2024, category: "SUV", pricePerDay: 3000,
    location: "Chennai", seatingCapacity: 5, fuel: "Diesel", transmission: "Automatic", rating: 4.5,
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&auto=format&fit=crop",
    description: "Wild by design. A feature-rich compact SUV that makes a statement everywhere it goes.",
  },
  {
    brand: "Volvo", model: "XC60", registrationNumber: "TN 09 AZ 8899", year: 2023, category: "Luxury", pricePerDay: 14000,
    location: "Chennai", seatingCapacity: 5, fuel: "Petrol", transmission: "Automatic", rating: 4.9,
    image: "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?w=800&auto=format&fit=crop",
    description: "Scandinavian elegance and world-class safety features in a refined SUV package.",
  },
  {
    brand: "Hyundai", model: "Verna", registrationNumber: "TN 10 MN 1122", year: 2024, category: "Sedan", pricePerDay: 3200,
    location: "Chennai", seatingCapacity: 5, fuel: "Petrol", transmission: "Automatic", rating: 4.7,
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&auto=format&fit=crop",
    description: "Futuristic design paired with thrilling turbo performance and premium interiors.",
  },

  // --- HYDERABAD (TS) ---
  {
    brand: "Tata", model: "Harrier", registrationNumber: "TS 07 EA 1234", year: 2023, category: "SUV", pricePerDay: 5000,
    location: "Hyderabad", seatingCapacity: 5, fuel: "Diesel", transmission: "Automatic", rating: 4.8,
    image: "https://images.unsplash.com/photo-1605515298946-d062f2e9da53?w=800&auto=format&fit=crop",
    description: "Built on Land Rover's pedigree, the Harrier is a beast on the highway and rough terrains.",
  },
  {
    brand: "Hyundai", model: "Venue", registrationNumber: "TS 08 XY 5678", year: 2022, category: "SUV", pricePerDay: 2500,
    location: "Hyderabad", seatingCapacity: 5, fuel: "Petrol", transmission: "Manual", rating: 4.4,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop",
    description: "A compact, connected SUV that navigates heavy traffic with ease and style.",
  },
  {
    brand: "Maruti Suzuki", model: "Dzire", registrationNumber: "TS 09 QW 4321", year: 2023, category: "Sedan", pricePerDay: 2200,
    location: "Hyderabad", seatingCapacity: 5, fuel: "Petrol", transmission: "Manual", rating: 4.1,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop",
    description: "Highly reliable and incredibly fuel-efficient. The perfect companion for daily commutes.",
  },
  {
    brand: "BMW", model: "X3", registrationNumber: "TS 10 ZZ 9999", year: 2023, category: "Luxury", pricePerDay: 15000,
    location: "Hyderabad", seatingCapacity: 5, fuel: "Diesel", transmission: "Automatic", rating: 4.8,
    image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800&auto=format&fit=crop",
    description: "Dynamic driving capabilities, luxurious interior, and striking sporty aesthetics.",
  },
  {
    brand: "Toyota", model: "Glanza", registrationNumber: "TS 11 MN 7654", year: 2022, category: "Hatchback", pricePerDay: 1900,
    location: "Hyderabad", seatingCapacity: 5, fuel: "Petrol", transmission: "Automatic", rating: 4.3,
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&auto=format&fit=crop",
    description: "A stylish, feature-loaded premium hatchback backed by Toyota's legendary reliability.",
  },

  // --- PUNE (MH) ---
  {
    brand: "Mahindra", model: "Scorpio-N", registrationNumber: "MH 12 AB 6789", year: 2024, category: "SUV", pricePerDay: 6000,
    location: "Pune", seatingCapacity: 7, fuel: "Diesel", transmission: "Automatic", rating: 4.9,
    image: "https://unsplash.com/photos/yellow-porsche-911-on-road-during-daytime-DwxlhTvC16Q?w=800&auto=format&fit=crop",
    description: "The Big Daddy of SUVs. Unmatched road presence and true 4x4 capabilities.",
  },
  {
    brand: "Volkswagen", model: "Taigun", registrationNumber: "MH 14 CD 9876", year: 2023, category: "SUV", pricePerDay: 3800,
    location: "Pune", seatingCapacity: 5, fuel: "Petrol", transmission: "Manual", rating: 4.6,
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&auto=format&fit=crop",
    description: "Hustle mode on. A vibrant, sporty SUV engineered for driving enthusiasts.",
  },
  {
    brand: "Tata", model: "Safari", registrationNumber: "MH 12 EF 5432", year: 2023, category: "SUV", pricePerDay: 6500,
    location: "Pune", seatingCapacity: 7, fuel: "Diesel", transmission: "Automatic", rating: 4.8,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop",
    description: "Reclaim your life with the iconic Safari. Supreme comfort for all 7 passengers.",
  },
  {
    brand: "Renault", model: "Kiger", registrationNumber: "MH 14 GH 1122", year: 2022, category: "SUV", pricePerDay: 2200,
    location: "Pune", seatingCapacity: 5, fuel: "Petrol", transmission: "Automatic", rating: 4.2,
    image: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800&auto=format&fit=crop",
    description: "Stunning design, smart cabin, and excellent fuel economy in a compact form.",
  },
  {
    brand: "Mercedes-Benz", model: "GLC", registrationNumber: "MH 12 ZZ 0001", year: 2024, category: "Luxury", pricePerDay: 16000,
    location: "Pune", seatingCapacity: 5, fuel: "Petrol", transmission: "Automatic", rating: 4.9,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop",
    description: "The epitome of modern luxury, combining progressive design with high-end tech.",
  },

  // --- KOLKATA (WB) ---
  {
    brand: "Hyundai", model: "Grand i10 Nios", registrationNumber: "WB 02 AB 3456", year: 2022, category: "Hatchback", pricePerDay: 1600,
    location: "Kolkata", seatingCapacity: 5, fuel: "Petrol", transmission: "Manual", rating: 4.3,
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&auto=format&fit=crop",
    description: "A trendy, youthful hatchback that zips through tight city lanes effortlessly.",
  },
  {
    brand: "Maruti Suzuki", model: "Brezza", registrationNumber: "WB 06 EF 7890", year: 2023, category: "SUV", pricePerDay: 3000,
    location: "Kolkata", seatingCapacity: 5, fuel: "Petrol", transmission: "Automatic", rating: 4.5,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop",
    description: "A hot-selling compact SUV known for its peppy engine and rugged reliability.",
  },
  {
    brand: "Honda", model: "Elevate", registrationNumber: "WB 08 KL 1234", year: 2024, category: "SUV", pricePerDay: 3200,
    location: "Kolkata", seatingCapacity: 5, fuel: "Petrol", transmission: "Manual", rating: 4.6,
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&auto=format&fit=crop",
    description: "Bold, masculine exterior paired with a spacious, beautifully crafted interior.",
  },
  {
    brand: "Skoda", model: "Slavia", registrationNumber: "WB 20 MN 5678", year: 2023, category: "Sedan", pricePerDay: 3500,
    location: "Kolkata", seatingCapacity: 5, fuel: "Petrol", transmission: "Automatic", rating: 4.7,
    image: "https://unsplash.com/photos/yellow-porsche-911-on-road-during-daytime-DwxlhTvC16Q?w=800&auto=format&fit=crop",
    description: "A beautifully sculpted sedan offering incredible driving dynamics and high safety.",
  },
  {
    brand: "Audi", model: "A6", registrationNumber: "WB 02 XY 0007", year: 2023, category: "Luxury", pricePerDay: 14000,
    location: "Kolkata", seatingCapacity: 5, fuel: "Petrol", transmission: "Automatic", rating: 4.8,
    image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop",
    description: "Business-class luxury. Intuitive technology wrapped in a stunning aerodynamic body.",
  },

  // --- JAIPUR (RJ) ---
  {
    brand: "Mahindra", model: "Thar", registrationNumber: "RJ 14 CF 2456", year: 2023, category: "SUV", pricePerDay: 4500,
    location: "Jaipur", seatingCapacity: 4, fuel: "Diesel", transmission: "Manual", rating: 4.6, 
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop",
    description: "Rugged and raw — built for off-road adventure and open-top thrills.",
  },
  {
    brand: "Toyota", model: "Innova Hycross", registrationNumber: "RJ 14 XY 9988", year: 2024, category: "SUV", pricePerDay: 6800,
    location: "Jaipur", seatingCapacity: 7, fuel: "Hybrid", transmission: "Automatic", rating: 4.9,
    image: "https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=800&auto=format&fit=crop",
    description: "The ultimate family mover now with a powerful, silent, and efficient hybrid engine.",
  },
  {
    brand: "Maruti Suzuki", model: "Fronx", registrationNumber: "RJ 45 DF 1122", year: 2023, category: "SUV", pricePerDay: 2500,
    location: "Jaipur", seatingCapacity: 5, fuel: "Petrol", transmission: "Automatic", rating: 4.4,
    image: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800&auto=format&fit=crop",
    description: "A sporty compact crossover that blends agility with bold SUV styling.",
  },
  {
    brand: "Hyundai", model: "Aura", registrationNumber: "RJ 14 KL 3344", year: 2022, category: "Sedan", pricePerDay: 2000,
    location: "Jaipur", seatingCapacity: 5, fuel: "Petrol", transmission: "Manual", rating: 4.2,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop",
    description: "A comfortable, feature-packed compact sedan perfect for exploring city monuments.",
  },
  {
    brand: "Land Rover", model: "Range Rover Evoque", registrationNumber: "RJ 14 ZZ 0009", year: 2023, category: "Luxury", pricePerDay: 18000,
    location: "Jaipur", seatingCapacity: 5, fuel: "Diesel", transmission: "Automatic", rating: 4.8,
    image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&auto=format&fit=crop",
    description: "A charismatic luxury compact SUV that blends British elegance with off-road pedigree.",
  },

  // --- AHMEDABAD (GJ) ---
  {
    brand: "Tata", model: "Punch", registrationNumber: "GJ 01 AB 5566", year: 2023, category: "SUV", pricePerDay: 2200,
    location: "Ahmedabad", seatingCapacity: 5, fuel: "Petrol", transmission: "Manual", rating: 4.5,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop",
    description: "A micro-SUV that punches above its weight with 5-star safety and high ground clearance.",
  },
  {
    brand: "MG", model: "Astor", registrationNumber: "GJ 01 CD 7788", year: 2022, category: "SUV", pricePerDay: 3600,
    location: "Ahmedabad", seatingCapacity: 5, fuel: "Petrol", transmission: "Automatic", rating: 4.4,
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&auto=format&fit=crop",
    description: "A smart SUV with a personal AI assistant, premium interiors, and Level 2 ADAS.",
  },
  {
    brand: "Kia", model: "Carens", registrationNumber: "GJ 27 EF 9900", year: 2023, category: "SUV", pricePerDay: 4500,
    location: "Ahmedabad", seatingCapacity: 7, fuel: "Diesel", transmission: "Automatic", rating: 4.7,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop",
    description: "A recreational vehicle redefining family travel with space, safety, and sophisticated tech.",
  },
  {
    brand: "Maruti Suzuki", model: "Ciaz", registrationNumber: "GJ 01 GH 1122", year: 2022, category: "Sedan", pricePerDay: 2800,
    location: "Ahmedabad", seatingCapacity: 5, fuel: "Petrol", transmission: "Manual", rating: 4.3,
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&auto=format&fit=crop",
    description: "An elegant and highly spacious premium sedan that offers a quiet, relaxed drive.",
  },
  {
    brand: "Porsche", model: "Macan", registrationNumber: "GJ 01 XX 9999", year: 2024, category: "Luxury", pricePerDay: 25000,
    location: "Ahmedabad", seatingCapacity: 5, fuel: "Petrol", transmission: "Automatic", rating: 4.9,
    image: "https://unsplash.com/photos/red-porsche-vehicle-during-daytime-axs76t7S-zg&auto=format&fit=crop",
    description: "Sports car performance wrapped in a versatile and stunning SUV silhouette.",
  },

  // --- GOA (GA) ---
  {
    brand: "Mahindra", model: "XUV300", registrationNumber: "GA 03 AB 1234", year: 2022, category: "SUV", pricePerDay: 2800,
    location: "Goa", seatingCapacity: 5, fuel: "Petrol", transmission: "Manual", rating: 4.5,
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&auto=format&fit=crop",
    description: "Thrilling performance and segment-leading safety make it perfect for coastal drives.",
  },
  {
    brand: "Hyundai", model: "Alcazar", registrationNumber: "GA 03 CD 5678", year: 2023, category: "SUV", pricePerDay: 5000,
    location: "Goa", seatingCapacity: 7, fuel: "Diesel", transmission: "Automatic", rating: 4.6,
    image: "https://images.unsplash.com/photo-1632245889029-e406faaa34cd?w=800&auto=format&fit=crop",
    description: "A premium 6/7 seater SUV crafted for grand journeys and comfortable touring.",
  },
  {
    brand: "Maruti Suzuki", model: "Ertiga", registrationNumber: "GA 03 EF 9012", year: 2023, category: "SUV", pricePerDay: 3200,
    location: "Goa", seatingCapacity: 7, fuel: "Petrol", transmission: "Manual", rating: 4.4,
    image: "https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=800&auto=format&fit=crop",
    description: "The most popular MPV for group trips. Highly efficient, comfortable, and reliable.",
  },
  {
    brand: "Volkswagen", model: "Polo", registrationNumber: "GA 03 GH 3456", year: 2021, category: "Hatchback", pricePerDay: 2200,
    location: "Goa", seatingCapacity: 5, fuel: "Petrol", transmission: "Automatic", rating: 4.7,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop",
    description: "A timeless driver's hatchback with a punchy turbocharged engine and solid build.",
  },
  {
    brand: "Mini", model: "Cooper S", registrationNumber: "GA 03 XX 0007", year: 2023, category: "Luxury", pricePerDay: 10000,
    location: "Goa", seatingCapacity: 4, fuel: "Petrol", transmission: "Automatic", rating: 4.8,
    image: "https://images.unsplash.com/photo-1570533136641-42a19b882333?w=800&auto=format&fit=crop",
    description: "Iconic styling, go-kart handling, and open-top fun for the perfect beach vacation.",
  }
];