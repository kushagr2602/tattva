export type Category = "Diwali" | "Wedding" | "Pooja" | "Home & Table";

export const categories: Category[] = ["Diwali", "Wedding", "Pooja", "Home & Table"];

export type Product = {
  id: string;
  name: string;
  category: Category;
  blurb: string;
  // The "second life", how the piece gets reused after the occasion.
  reuse: string;
  // Photo path under /public/products. The file is <id>.jpg by convention.
  image: string;
};

// These are Tattva's real pieces. Reword names, blurbs and categories freely, 
// and to add a new item, copy a block, give it an id, and drop <id>.jpg in /public/products.
export const products: Product[] = [
  {
    id: "pooja-thali-footed",
    name: "Footed Antique Pooja Thali",
    category: "Pooja",
    blurb: "A raised thali hung with tiny bells, complete with diya, kalash, bell and bowls, a full aarti in a single piece.",
    reuse: "The centrepiece of every festival and puja, brought out year after year.",
    image: "/products/pooja-thali-footed.jpg",
  },
  {
    id: "rose-pooja-thali",
    name: "Rose Pooja Thali Set",
    category: "Pooja",
    blurb: "A scalloped thali with bell, incense burner, kumkum box and bowl, rose-engraved throughout.",
    reuse: "Comes out for every prayer and returns to the mandir shelf between them.",
    image: "/products/rose-pooja-thali.jpg",
  },
  {
    id: "elephant-pooja-thali",
    name: "Elephant Pooja Thali Set",
    category: "Pooja",
    blurb: "A thali flanked by cast elephant heads, with a matching bell and kalash.",
    reuse: "Used at festivals, and sits as a decor piece on the console in between.",
    image: "/products/elephant-pooja-thali.jpg",
  },
  {
    id: "boxed-pooja-thali-oval",
    name: "Boxed Pooja Thali, Oval",
    category: "Pooja",
    blurb: "An oval thali with bell, kalash and plate, presented in a soft velvet gift box.",
    reuse: "Kept and used at the mandir for years after.",
    image: "/products/boxed-pooja-thali-oval.jpg",
  },
  {
    id: "boxed-pooja-thali-grand",
    name: "Boxed Pooja Thali, Grand",
    category: "Pooja",
    blurb: "A full scalloped thali, incense shaker, kalash, lidded box and bowls, in a keepsake box.",
    reuse: "Everything a home puja needs, brought out again and again.",
    image: "/products/boxed-pooja-thali-grand.jpg",
  },
  {
    id: "peacock-dryfruit-platter",
    name: "Peacock Dry-Fruit Platter",
    category: "Diwali",
    blurb: "A two-part paisley platter with peacock handles, sized for an assortment of mewa.",
    reuse: "Serves nuts and snacks at every gathering, long after Diwali.",
    image: "/products/peacock-dryfruit-platter.jpg",
  },
  {
    id: "filigree-dryfruit-platter",
    name: "Filigree Dry-Fruit Platter",
    category: "Diwali",
    blurb: "A wide lace-edged platter, wrapped and ready as a Diwali hamper of dry fruit.",
    reuse: "A serving centrepiece for years of festivals and dinners.",
    image: "/products/filigree-dryfruit-platter.jpg",
  },
  {
    id: "boxed-dryfruit-plate",
    name: "Boxed Dry-Fruit Plate",
    category: "Diwali",
    blurb: "A lace-edged plate with a flower bowl, boxed and ready to gift full of mewa.",
    reuse: "Used as a dessert or dry-fruit plate for years after.",
    image: "/products/boxed-dryfruit-plate.jpg",
  },
  {
    id: "heritage-gift-box",
    name: "Peacock Heritage Gift Box",
    category: "Wedding",
    blurb: "A large engraved box topped with Ganesh and peacocks, with a baraat scene around the sides. Arrives full and kept long after.",
    reuse: "Kept as a family box for jewellery, letters and small keepsakes.",
    image: "/products/heritage-gift-box.jpg",
  },
  {
    id: "laxmi-ganesh-set",
    name: "Laxmi-Ganesh Shagun Set",
    category: "Wedding",
    blurb: "Laxmi and Ganesh idols with a mirrored tray and photo frame, a complete shagun for weddings and housewarmings.",
    reuse: "The idols stay on the mandir for good; the tray keeps hosting guests.",
    image: "/products/laxmi-ganesh-set.jpg",
  },
  {
    id: "wedding-pooja-tray",
    name: "Wedding Pooja Tray Set",
    category: "Wedding",
    blurb: "A pierced-rail tray set with photo frame, Ganesh, bell, kalash and trinket boxes, one gift that covers the whole ceremony.",
    reuse: "Each piece finds its own place in the new home.",
    image: "/products/wedding-pooja-tray.jpg",
  },
  {
    id: "charger-plate",
    name: "Engraved Charger Plate",
    category: "Wedding",
    blurb: "A scalloped plate with a baraat engraved across it. Works as a charger, a fruit plate, or wall decor.",
    reuse: "From wedding table to everyday charger to display piece.",
    image: "/products/charger-plate.jpg",
  },
  {
    id: "peacock-katori-set",
    name: "Peacock Katori & Tray Set",
    category: "Home & Table",
    blurb: "A pair of lidded katoris crowned with peacocks, on a matching engraved tray, for serving mithai or dry fruit.",
    reuse: "Everyday katoris for chutneys and sweets once the festival's over.",
    image: "/products/peacock-katori-set.jpg",
  },
  {
    id: "rose-bowl-set",
    name: "Rose Dome Katori Set",
    category: "Home & Table",
    blurb: "Two domed, rose-engraved bowls on a tray, for sindoor, sweets or trinkets.",
    reuse: "Trinket or dry-fruit bowls that never leave the table.",
    image: "/products/rose-bowl-set.jpg",
  },
  {
    id: "fruit-basket",
    name: "Ginkgo Filigree Fruit Basket",
    category: "Home & Table",
    blurb: "A square lace basket with a leaf border, for fruit, flowers, or a styled gift.",
    reuse: "A fruit bowl or centrepiece for the everyday, not just the occasion.",
    image: "/products/fruit-basket.jpg",
  },
];
