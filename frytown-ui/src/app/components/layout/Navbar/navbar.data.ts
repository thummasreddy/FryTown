export type NavLink = { label: string; to: string };
export type NavGroup = {
  label: string;
  to?: string;
  children?: NavLink[];
};

export const NAV_ITEMS: NavGroup[] = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  {
    label: "Menu",
    to: "/menu",
    children: [
      { label: "Fries", to: "/menu#fries" },
      { label: "Specialty", to: "/menu#specialty" },
      { label: "Dips", to: "/menu#dips" },
      { label: "Drinks", to: "/menu#drinks" },
    ],
  },
  {
    label: "Promotions",
    to: "/promotions",
    children: [
      { label: "Combos", to: "/promotions#combos" },
      { label: "Offers", to: "/promotions#offers" },
    ],
  },
  {
    label: "Franchising",
    to: "/franchising",
    children: [
      { label: "Why Partner", to: "/franchising#why" },
      { label: "Investment", to: "/franchising#investment" },
      { label: "Apply", to: "/franchising#apply" },
    ],
  },
  {
    label: "Account",
    to: "/account",
    children: [
      { label: "Login", to: "/account/login" },
      { label: "Register", to: "/account/register" },
    ],
  },
];
