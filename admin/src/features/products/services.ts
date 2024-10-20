import { Product } from "@/features/products/types";

const products: Product[] = [
	{
		image: "https://picsum.photos/seed/picsum/200/200",
		name: "Smartphone X10",
		brand: "TechGenius",
		visibility: true,
		price: 499.99,
		SKU: "TGSPX10001",
		quantity: 50,
	},
	{
		image: "https://picsum.photos/seed/picsm/200/200",
		name: "Wireless Earbuds Pro",
		brand: "AudioWave",
		visibility: false,
		price: 129.95,
		SKU: "AWEARBUDS2023",
		quantity: 100,
	},
	{
		image: "https://picsum.photos/seed/picssum/200/200",
		name: "Eco-Friendly Water Bottle",
		brand: "GreenSip",
		visibility: true,
		price: 19.99,
		SKU: "GSWATERBTL01",
		quantity: 200,
	},
	{
		image: "https://picsum.photos/seed/pisum/200/200",
		name: "Smart Home Thermostat",
		brand: "ClimateMind",
		visibility: true,
		price: 249.0,
		SKU: "CLMTHMST001",
		quantity: 30,
	},
	{
		image: "https://picsum.photos/seed/icsum/200/200",
		name: "Laptop UltraLite M3",
		brand: "SwiftTech",
		visibility: true,
		price: 899.99,
		SKU: "SWFTLTPCM3",
		quantity: 75,
	},
	{
		image: "https://picsum.photos/seed/picsaum/200/200",
		name: "Gaming Console NextGen",
		brand: "PlayVision",
		visibility: false,
		price: 599.0,
		SKU: "PVNGC2024",
		quantity: 90,
	},
	{
		image: "https://picsum.photos/seed/pqicsum/200/200",
		name: "Fitness Tracker FitLife",
		brand: "WellnessTrack",
		visibility: true,
		price: 99.99,
		SKU: "WLNTFKRTLIFE",
		quantity: 150,
	},
	{
		image: "https://picsum.photos/seed/picsukm/200/200",
		name: "Premium Leather Backpack",
		brand: "UrbanCarry",
		visibility: true,
		price: 149.0,
		SKU: "URBCRBPK007",
		quantity: 60,
	},
	{
		image: "https://picsum.photos/seed/picsuml/200/200",
		name: "Smart Kitchen Scale",
		brand: "CookSmart",
		visibility: false,
		price: 49.95,
		SKU: "CKSMTHSCALE1",
		quantity: 80,
	},
	{
		image: "https://picsum.photos/seed/picswum/200/200",
		name: "LED Smart Bulb Kit",
		brand: "IllumiNex",
		visibility: true,
		price: 59.99,
		SKU: "ILMXBULBKIT2",
		quantity: 120,
	},
];

export function getProducts() {
	return products;
}