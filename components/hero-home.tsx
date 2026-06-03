import Image from "next/image";
import PageIllustration from "./page-illustration";
import {
  Hammer,
  Zap,
  Paintbrush,
  Wrench
} from "lucide-react";
import {supabase} from "@/lib/supabase/client"
import {prisma} from "@/lib/prisma/prisma"
import { HomepageImageModal } from "./admin/editAdminButton";

type HeroProps= {
  isAdmin?: boolean

}

export default async function HeroHome({isAdmin=false}: HeroProps) {

  const images = await prisma.image.findMany({
    where: {
      section: "homepage",
    },

    orderBy: {
      sortOrder: "asc",
    }
  })
  const homepageImages = images.map((image) => ({
  ...image,
  url: supabase.storage
    .from("images-bigbang")
    .getPublicUrl(image.path).data.publicUrl,
}));
    
    
    

  return (
    <section className="relative">
      <PageIllustration />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-16">
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              data-aos="zoom-y-out"
            >
              {homepageImages.map((image)=>(
              <div key={image.id}
              className="relative h-64 w-full aspect-video overflow-hidden rounded-xl">
                <Image
                  className="object-cover"
                  src={image.url}
                  fill
                  alt="Avatar 01"
                />
                {isAdmin && (
                <div className="absolute right-3 top-3 z-20">
                  <HomepageImageModal
                    imageId={image.id}
                    currentImageUrl={image.url}
                  />
                </div>
              )}
              </div>
              ))}
              
            </div>
            <h1
              className="mt-10 mb-6 border-y text-5xl font-bold [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1] md:text-6xl"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              NOUS TRANSFORMONS  <br className="max-lg:hidden" />
               VOS PROJETS EN REALITE
            </h1>
            <div className="mx-auto max-w-3xl">
              <p
                className="mb-8 text-lg text-gray-700"
                data-aos="zoom-y-out"
                data-aos-delay={300}
              >
              Notre mission est d'accompagner les professionnels et les particuliers dans leurs projets de rénovation, d'électricité, de plomberie et de peinture.  
              Nous intervenons rapidement et efficacement en Île-de-France ainsi que dans toute la région parisienne.
              </p>
              <div className="relative before:absolute before:inset-0 before:border-y before:[border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1]">
                <div
                  className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center"
                  data-aos="zoom-y-out"
                  data-aos-delay={450}
                >
                  <a
                    className="btn group mb-4 w-full bg-linear-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                    href="#0"
                  >
                    <span className="relative inline-flex items-center">
                      Demande de devis{" "}
                      <span className="ml-1 tracking-normal text-blue-300 transition-transform group-hover:translate-x-0.5">
                        -&gt;
                      </span>
                    </span>
                  </a>
                  <a
                    className="btn w-full bg-white text-gray-800 shadow-sm hover:bg-gray-50 sm:ml-4 sm:w-auto"
                    href="#0"
                  >
                    Voir nos projets
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Hero image */}
          <div
            className="mx-auto max-w-3xl"
            data-aos="zoom-y-out"
            data-aos-delay={600}
          >
            <div className="relative rounded-2xl bg-gray-900 px-5 py-6 shadow-xl before:pointer-events-none before:absolute before:-inset-5 before:border-y before:[border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1] after:absolute after:-inset-5 after:-z-10 after:border-x after:[border-image:linear-gradient(to_bottom,transparent,--theme(--color-slate-300/.8),transparent)1]">
              <div className="grid grid-cols-2 gap-3 h-full">
                <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-2 hover:border-blue-400 hover:bg-white/10">
                  <div className="mb-5 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10 border border-blue-400/20">
                      <Hammer className="mb-4 h-14 w-14 text-blue-400 transition-transform duration-300 group-hover:scale-110h-10 w-10 text-blue-400 transition-transform duration-300 group-hover:scale-110"/>
                    </div>
                  </div>
                  <div className="mb-5 flex justify-center">
                    <h3 className="text-x1 font-bold text-white">
                      Rénovation
                    </h3>
                  </div>
                  <div className="mb-5 flex justify-center">
                    <p className="mt-2 text-sm text-gray-400">
                      Modernisations complète de vos espaces
                    </p>
                  </div>
                </div>
                
                <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-2 hover:border-blue-400 hover:bg-white/10">
                  <div className="mb-5 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10 border border-blue-400/20">
                      <Zap className="mb-4 h-14 w-14 text-blue-400 transition-transform duration-300 group-hover:scale-110h-10 w-10 text-blue-400 transition-transform duration-300 group-hover:scale-110"/>
                    </div>
                  </div>
                  <div className="mb-5 flex justify-center">
                    <h3 className="text-x1 font-bold text-white">
                      Electricité
                    </h3>
                  </div>
                  <div className="mb-5 flex justify-center">
                    <p className="mt-2 text-sm text-gray-400">
                      Installation et depannage électrique
                    </p>
                  </div>
                </div>
                <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-2 hover:border-blue-400 hover:bg-white/10">
                  <div className="mb-5 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10 border border-blue-400/20">
                      <Wrench className="mb-4 text-5x1mb-4 h-14 w-14 text-blue-400 transition-transform duration-300 group-hover:scale-110h-10 w-10 text-blue-400 transition-transform duration-300 group-hover:scale-110"/>
                    </div>
                  </div>
                    <div className="mb-5 flex justify-center">
                      <h3 className="text-x1 font-bold text-white">
                        Plomberie
                      </h3>
                    </div>
                    <div className="mb-5 flex justify-center">
                      <p className="mt-2 text-sm text-gray-400">
                        Réparation et installation sanitaire
                      </p>
                    </div>
                </div>
                <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-2 hover:border-blue-400 hover:bg-white/10">
                  <div className="mb-5 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10 border border-blue-400/20">
                      <Paintbrush className="mb-4 text-5x1mb-4 h-14 w-14 text-blue-400 transition-transform duration-300 group-hover:scale-110h-10 w-10 text-blue-400 transition-transform duration-300 group-hover:scale-110"/>
                    </div>
                  </div>
                  <div className="mb-5 flex justify-center">
                    <h3 className="text-x1 font-bold text-white">
                      Peinture
                    </h3>
                  </div>
                  <div className="mb-5 flex justify-center">
                    <p className="mt-2 text-sm text-gray-400">
                      Finitions modernes et élégantes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
