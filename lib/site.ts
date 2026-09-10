// Edit everything about the business here, one place.

export const site = {
  brand: "Tattva",
  owner: "Stories",
  tagline: "Where every gift becomes a story.",
  // Logo file in /public. Save the lotus logo as public/logo.png, it appears
  // automatically. Until the file exists, the "Tattva" wordmark shows instead.
  logo: "/logo.png",
  // WhatsApp number in international format, digits only (country code + number),
  // e.g. India "91" + number. Used for the "Enquire on WhatsApp" buttons.
  whatsapp: "919871161810",
  email: "hello@example.com", // TODO: real email
  city: "India",
  instagram: "", // e.g. "https://instagram.com/tattva", leave "" to hide
};

// The About section. Replace the placeholder paragraphs with Manisha's own words.
export const about = {
  heading: "The hands behind the gifts",
  // Photo of Manisha: save as public/manisha.jpg, it appears automatically. Until then, an "M" monogram shows.
  photo: "/manisha.jpg",
  // Manisha's story, in her own voice. Reword freely.
  paragraphs: [
    "I'm Manisha, an artist by training, a baker and chef by trade, and someone who has spent more than thirty years living around the art world. Tattva is where those two lives finally meet.",
    "For years I put these gifts together for friends and family, purely out of love, choosing each piece, thinking about who it was for. Enough people asked that I decided to open it up to anyone looking for gifting that's a little more thoughtful, and a little more personal.",
    "On the side I run Chef's Studio, teaching culinary and baking courses and helping restaurants and cafés shape their recipes. But I've always been an artist first, and that's the eye I bring to every Tattva package.",
  ],
  // Optional link to Manisha's other venture. Leave url "" to hide.
  chefStudio: { name: "Chef's Studio", url: "https://chefs-studio.com/" },
};

// Site navigation, used by the header and footer on every page.
export const nav = [
  { href: "/", label: "Home" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/about", label: "About" },
  { href: "/sustainability", label: "Sustainability" },
  { href: "/contact", label: "Contact" },
];

// The live site URL (used for WhatsApp link previews and page metadata).
export const siteUrl = "https://tattvastories.com";

// Prefilled WhatsApp message. Passing a product URL appends it on its own line, so
// WhatsApp shows a rich preview (the item's photo) from that page's Open Graph tags.
export function whatsappLink(productName?: string, productUrl?: string) {
  let text = productName
    ? `Hi ${site.brand}, I'd like to enquire about the "${productName}" from your catalogue.`
    : `Hi ${site.brand}, I'd like to enquire about your silver gifting.`;
  if (productUrl) text += `\n${productUrl}`;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
