import localFont from "next/font/local";

export const ProductSans = localFont({
  src: [
    {
      path: "../../public/fonts/Product-Sans/ProductSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

export const BooksellerBk = localFont({
  src: [
    {
      path: "../../public/fonts/Bookseller-Bk/BooksellerBk-AmpleItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/Bookseller-Bk/BooksellerBk-Ample.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});
