export const metadata = {
  title: "Home - Simple",
  description: "Page description",
};

import Hero from "@/components/hero-home";
import Cta from "@/components/cta";


export default function Home() {
  return (
    <>
      <Hero isAdmin={false}/>
      <Cta />
    </>
  );
}

