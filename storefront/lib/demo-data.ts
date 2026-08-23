export const DEMO_BRAND = {
  name: "AURELIAN",
  monogram: "A",
  tagline: "Quiet luxury, crafted for the everyday",
  story: "Founded in 2023, Aurelian redefines modern elegance through considered design and exceptional materials. Each piece is made in small batches by ateliers in Portugal and Italy, where generations of craft meet contemporary sensibility. We believe luxury isn't about excess — it's about the quiet confidence of wearing something made to last.",
} as const;

export type DemoProduct = {
  id: string;
  handle: string;
  title: string;
  category: "clothing" | "footwear" | "bags-accessories";
  description: string;
  materials: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  price: number;
  images: string[];
  featured: boolean;
  isNew: boolean;
};

export const DEMO_PRODUCTS: DemoProduct[] = [
  {
    id: "aurelian-cashmere-coat",
    handle: "cashmere-coat",
    title: "The Cashmere Overcoat",
    category: "clothing",
    description: "A timeless double-breasted overcoat cut from Italian double-face cashmere. Unlined for a fluid drape, with hand-finished edges and horn buttons. The ultimate investment piece for autumn through spring.",
    materials: "100% Italian double-face cashmere; horn buttons; silk twill pocket lining",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal", hex: "#2D2D2D" },
      { name: "Camel", hex: "#C19A6B" },
      { name: "Midnight Navy", hex: "#1B2A4A" },
    ],
    price: 89000,
    images: ["/demo/cashmere-coat-1.jpg", "/demo/cashmere-coat-2.jpg", "/demo/cashmere-coat-3.jpg"],
    featured: true,
    isNew: true,
  },
  {
    id: "aurelian-silk-blazer",
    handle: "silk-blazer",
    title: "The Silk-Wool Blazer",
    category: "clothing",
    description: "An unstructured blazer in a luminous silk-wool blend that catches light with every movement. Natural shoulders, patch pockets, and a single vent for ease. Dress it up or down — it earns its place in any wardrobe.",
    materials: "55% silk, 45% merino wool; corozo buttons; Bemberg lining",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Sand", hex: "#E8DCC8" },
      { name: "Olive", hex: "#5A6B4F" },
      { name: "Black", hex: "#0B0B0C" },
    ],
    price: 42000,
    images: ["/demo/silk-blazer-1.jpg", "/demo/silk-blazer-2.jpg"],
    featured: true,
    isNew: false,
  },
  {
    id: "aurelian-merino-knit",
    handle: "merino-knit",
    title: "The Merino Rollneck",
    category: "clothing",
    description: "Extra-fine 18.5-micron merino, knitted in a dense 12-gauge for warmth without weight. Ribbed cuffs and hem hold their shape. A foundation layer that works alone or under tailoring.",
    materials: "100% extrafine merino wool (18.5 micron); fully fashioned construction",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Cream", hex: "#F5F1EA" },
      { name: "Charcoal", hex: "#2D2D2D" },
      { name: "Rust", hex: "#B85C3A" },
      { name: "Navy", hex: "#1B2A4A" },
    ],
    price: 14500,
    images: ["/demo/merino-knit-1.jpg", "/demo/merino-knit-2.jpg"],
    featured: false,
    isNew: true,
  },
  {
    id: "aurelian-linen-trouser",
    handle: "linen-trouser",
    title: "The Linen Trouser",
    category: "clothing",
    description: "Belgian linen with a washed finish for lived-in comfort from day one. Mid-rise, relaxed straight leg, side adjusters for a clean waistband. The warm-weather essential that improves with age.",
    materials: "100% Belgian linen (280 gsm); corozo buttons; cotton pocketing",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: [
      { name: "Flax", hex: "#D8CAB8" },
      { name: "White", hex: "#F5F1EA" },
      { name: "Slate", hex: "#6B737D" },
    ],
    price: 18500,
    images: ["/demo/linen-trouser-1.jpg", "/demo/linen-trouser-2.jpg"],
    featured: false,
    isNew: false,
  },
  {
    id: "aurelian-leather-chelsea",
    handle: "leather-chelsea",
    title: "The Leather Chelsea Boot",
    category: "footwear",
    description: "Hand-lasted in Portugal from single-origin Italian calfskin. Goodyear-welted for longevity, with a leather stack heel and crepe forefoot for silent steps. Elastic gussets shaped for a clean ankle line.",
    materials: "Italian calfskin upper; leather lining; Goodyear welt; leather sole with crepe insert",
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    colors: [
      { name: "Black", hex: "#0B0B0C" },
      { name: "Dark Brown", hex: "#3D2B1F" },
      { name: "Cognac", hex: "#8B5E3C" },
    ],
    price: 52000,
    images: ["/demo/leather-chelsea-1.jpg", "/demo/leather-chelsea-2.jpg", "/demo/leather-chelsea-3.jpg"],
    featured: true,
    isNew: false,
  },
  {
    id: "aurelian-suede-loafer",
    handle: "suede-loafer",
    title: "The Suede Penny Loafer",
    category: "footwear",
    description: "Unlined Italian suede molds to the foot over time. Blake-stitched for flexibility, with a leather sole and rubber forepart for grip. The strap is cut on the bias for a subtle architectural detail.",
    materials: "Italian suede upper; leather lining; Blake stitch; leather sole with rubber forepart",
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    colors: [
      { name: "Taupe", hex: "#A89B8C" },
      { name: "Navy", hex: "#1B2A4A" },
      { name: "Burgundy", hex: "#6B2D3A" },
    ],
    price: 38000,
    images: ["/demo/suede-loafer-1.jpg", "/demo/suede-loafer-2.jpg"],
    featured: true,
    isNew: true,
  },
  {
    id: "aurelian-leather-sneaker",
    handle: "leather-sneaker",
    title: "The Leather Court Sneaker",
    category: "footwear",
    description: "Minimalist low-top in full-grain Italian leather. Margom cup sole for cushioning, OrthoLite footbed, and tonal stitching. No logos — just proportion and material. Made in the Marche region.",
    materials: "Full-grain Italian leather; Margom cup sole; OrthoLite recycled footbed",
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    colors: [
      { name: "White", hex: "#F5F1EA" },
      { name: "Black", hex: "#0B0B0C" },
      { name: "Stone", hex: "#C4B8A8" },
    ],
    price: 29500,
    images: ["/demo/leather-sneaker-1.jpg", "/demo/leather-sneaker-2.jpg"],
    featured: false,
    isNew: true,
  },
  {
    id: "aurelian-tote-bag",
    handle: "tote-bag",
    title: "The Leather Tote",
    category: "bags-accessories",
    description: "Vegetable-tanned Tuscan leather that develops a rich patina. Spacious interior with a single zip pocket, magnetic closure, and detachable leather strap. Fits a 13\" laptop, documents, and daily essentials.",
    materials: "Vegetable-tanned Tuscan leather; cotton canvas lining; solid brass hardware",
    sizes: ["One Size"],
    colors: [
      { name: "Tan", hex: "#C19A6B" },
      { name: "Black", hex: "#0B0B0C" },
      { name: "Dark Green", hex: "#2D4235" },
    ],
    price: 65000,
    images: ["/demo/tote-bag-1.jpg", "/demo/tote-bag-2.jpg", "/demo/tote-bag-3.jpg"],
    featured: true,
    isNew: false,
  },
  {
    id: "aurelian-crossbody",
    handle: "crossbody-bag",
    title: "The Crossbody Bag",
    category: "bags-accessories",
    description: "Compact saddle bag in pebbled Italian calfskin. Adjustable strap, magnetic flap, and microfiber-lined interior with card slots. The everyday companion for phone, wallet, keys, and small essentials.",
    materials: "Pebbled Italian calfskin; microfiber lining; solid brass hardware",
    sizes: ["One Size"],
    colors: [
      { name: "Chocolate", hex: "#4A3728" },
      { name: "Black", hex: "#0B0B0C" },
      { name: "Sand", hex: "#E8DCC8" },
    ],
    price: 42000,
    images: ["/demo/crossbody-bag-1.jpg", "/demo/crossbody-bag-2.jpg"],
    featured: false,
    isNew: true,
  },
  {
    id: "aurelian-leather-belt",
    handle: "leather-belt",
    title: "The Leather Belt",
    category: "bags-accessories",
    description: "Single-piece Italian bridle leather, 32mm wide with a hand-burnished edge. Solid brass buckle with a subtle logo engraving. Made to order — each belt cut to your exact size.",
    materials: "Italian bridle leather (4mm); solid brass buckle; hand-burnished edges",
    sizes: ["80", "85", "90", "95", "100", "105", "110"],
    colors: [
      { name: "Black", hex: "#0B0B0C" },
      { name: "Dark Brown", hex: "#3D2B1F" },
      { name: "Tan", hex: "#C19A6B" },
    ],
    price: 12500,
    images: ["/demo/leather-belt-1.jpg", "/demo/leather-belt-2.jpg"],
    featured: false,
    isNew: false,
  },
  {
    id: "aurelian-scarf",
    handle: "cashmere-scarf",
    title: "The Cashmere Scarf",
    category: "bags-accessories",
    description: "Double-faced cashmere from the same mill as our overcoat. Generous 40x200cm dimensions for versatile styling. Hand-finished fringed edges. Comes in a signature gift box.",
    materials: "100% double-face cashmere; hand-rolled fringed edges",
    sizes: ["One Size"],
    colors: [
      { name: "Camel", hex: "#C19A6B" },
      { name: "Charcoal", hex: "#2D2D2D" },
      { name: "Ivory", hex: "#F5F1EA" },
    ],
    price: 22000,
    images: ["/demo/cashmere-scarf-1.jpg", "/demo/cashmere-scarf-2.jpg"],
    featured: false,
    isNew: true,
  },
  {
    id: "aurelian-sunglasses",
    handle: "sunglasses",
    title: "The Acetate Sunglasses",
    category: "bags-accessories",
    description: "Italian Mazzucchelli acetate frames with Carl Zeiss CR-39 lenses (100% UV protection). Five-barrel hinges, adjustable nose pads, and a hand-polished finish. Includes leather case and cleaning cloth.",
    materials: "Mazzucchelli M49 bio-acetate; Carl Zeiss CR-39 lenses; stainless steel hinges",
    sizes: ["One Size (52-21-145)"],
    colors: [
      { name: "Black", hex: "#0B0B0C" },
      { name: "Havana", hex: "#5D4E37" },
      { name: "Clear", hex: "#E8E8E8" },
    ],
    price: 28000,
    images: ["/demo/sunglasses-1.jpg", "/demo/sunglasses-2.jpg"],
    featured: false,
    isNew: false,
  },
  {
    id: "aurelian-wool-scarf",
    handle: "wool-scarf",
    title: "The Merino Wool Scarf",
    category: "bags-accessories",
    description: "Lightweight merino jersey, brushed for softness. 35x180cm — substantial but never bulky. The travel essential that regulates temperature and resists odors naturally.",
    materials: "100% extrafine merino wool jersey; rolled hem",
    sizes: ["One Size"],
    colors: [
      { name: "Heather Grey", hex: "#9CA3AF" },
      { name: "Navy", hex: "#1B2A4A" },
      { name: "Oatmeal", hex: "#E8DCC8" },
    ],
    price: 11000,
    images: ["/demo/wool-scarf-1.jpg", "/demo/wool-scarf-2.jpg"],
    featured: false,
    isNew: false,
  },
  {
    id: "aurelian-leather-gloves",
    handle: "leather-gloves",
    title: "The Leather Gloves",
    category: "bags-accessories",
    description: "Unlined Italian lambskin — buttery soft from the first wear. Touchscreen-compatible index and thumb. Hand-stitched points on the back. Each pair cut and sewn in Naples.",
    materials: "Italian lambskin; cashmere lining (optional); touchscreen-compatible fingertips",
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5"],
    colors: [
      { name: "Black", hex: "#0B0B0C" },
      { name: "Dark Brown", hex: "#3D2B1F" },
      { name: "Navy", hex: "#1B2A4A" },
    ],
    price: 16500,
    images: ["/demo/leather-gloves-1.jpg", "/demo/leather-gloves-2.jpg"],
    featured: false,
    isNew: true,
  },
  {
    id: "aurelian-silk-shirt",
    handle: "silk-shirt",
    title: "The Silk Shirt",
    category: "clothing",
    description: "22-momme mulberry silk charmeuse, cut with a relaxed camp collar. Mother-of-pearl buttons, single chest pocket, and a curved hem designed to be worn untucked. Fluid, breathable, effortless.",
    materials: "100% mulberry silk charmeuse (22 momme); mother-of-pearl buttons",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Champagne", hex: "#C8A96A" },
      { name: "Black", hex: "#0B0B0C" },
      { name: "Navy", hex: "#1B2A4A" },
    ],
    price: 24000,
    images: ["/demo/silk-shirt-1.jpg", "/demo/silk-shirt-2.jpg"],
    featured: true,
    isNew: true,
  },
  {
    id: "aurelian-tweed-jacket",
    handle: "tweed-jacket",
    title: "The Donegal Tweed Jacket",
    category: "clothing",
    description: "Authentic Donegal tweed from County Donegal, Ireland — flecked with heritage neps. Unstructured, three-roll-two button stance, patch pockets, working cuff buttons. A modern take on a classic.",
    materials: "100% Donegal wool tweed (380 gsm); corozo buttons; half-canvas construction",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Hearth", hex: "#6B5B4F" },
      { name: "Moss", hex: "#4A5D4E" },
      { name: "Charcoal", hex: "#2D2D2D" },
    ],
    price: 55000,
    images: ["/demo/tweed-jacket-1.jpg", "/demo/tweed-jacket-2.jpg"],
    featured: false,
    isNew: false,
  },
];

export function getProductsByCategory(category: DemoProduct["category"]): DemoProduct[] {
  return DEMO_PRODUCTS.filter((p) => p.category === category);
}

export function getProductByHandle(handle: string): DemoProduct | undefined {
  return DEMO_PRODUCTS.find((p) => p.handle === handle);
}

export function getFeaturedProducts(): DemoProduct[] {
  return DEMO_PRODUCTS.filter((p) => p.featured);
}

export function getNewProducts(): DemoProduct[] {
  return DEMO_PRODUCTS.filter((p) => p.isNew);
}

export const COLLECTIONS = [
  { slug: "clothing", label: "Clothing", description: "Tailoring, knitwear, and shirts — cut from the world's finest fabrics." },
  { slug: "footwear", label: "Footwear", description: "Goodyear-welted boots, Blake-stitched loafers, and minimal sneakers — made in Portugal and Italy." },
  { slug: "bags-accessories", label: "Bags & Accessories", description: "Vegetable-tanned leather bags, cashmere scarves, and small leather goods — designed to age beautifully." },
] as const;

export type CollectionSlug = typeof COLLECTIONS[number]["slug"];