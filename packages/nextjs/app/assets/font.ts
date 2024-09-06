import { Anonymous_Pro, Italiana, Pacifico } from "next/font/google";

const italiana = Italiana({
  weight: "400",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

export const anonymousPro = Anonymous_Pro({
  weight: "700",
  subsets: ["latin"],
});

export { italiana, pacifico };
