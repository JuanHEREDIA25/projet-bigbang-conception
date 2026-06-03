import Image from "next/image"
import Link from "next/link"
import PageIllustration from "./page-illustration"
import { Hammer, Zap, Paintbrush, Wrench } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { prisma } from "@/lib/prisma/prisma"
import { HomepageImageModal } from "./admin/editAdminButton"

type HeroProps = {
  isAdmin?: boolean
}

const services = [
  {
    title: "Rénovation",
    description: "Modernisation complète de vos espaces.",
    icon: Hammer,
  },
  {
    title: "Électricité",
    description: "Installation et dépannage électrique.",
    icon: Zap,
  },
  {
    title: "Plomberie",
    description: "Réparation et installation sanitaire.",
    icon: Wrench,
  },
  {
    title: "Peinture",
    description: "Finitions modernes et élégantes.",
    icon: Paintbrush,
  },
]

export default async function HeroHome({ isAdmin = false }: HeroProps) {
  const images = await prisma.image.findMany({
    where: {
      section: "homepage",
    },
    orderBy: {
      sortOrder: "asc",
    },
  })

  const homepageImages = images.map((image) => ({
    ...image,
    url: supabase.storage
      .from("images-bigbang")
      .getPublicUrl(image.path).data.publicUrl,
  }))

  return (
    <section className="relative">
      <PageIllustration />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 pt-28 md:pb-20 md:pt-40">
          <div className="pb-12 text-center md:pb-16">
            <div
              className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
              data-aos="zoom-y-out"
            >
              {homepageImages.map((image) => (
                <div
                  key={image.id}
                  className="relative aspect-video overflow-hidden rounded-2xl bg-gray-100 shadow-sm"
                >
                  <Image
                    src={image.url}
                    alt="Réalisation Big Bang Conception"
                    fill
                    className="object-cover"
                    priority
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
              className="mt-8 border-y py-5 text-balance text-3xl font-bold leading-tight tracking-tight text-gray-900 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1] sm:mt-10 sm:text-4xl md:py-6 md:text-5xl lg:text-6xl"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              Nous transformons vos projets en réalité
            </h1>

            <div className="mx-auto mt-6 max-w-3xl">
              <p
                className="text-pretty text-base leading-7 text-gray-700 sm:text-lg sm:leading-8"
                data-aos="zoom-y-out"
                data-aos-delay={300}
              >
                Big Bang Conception accompagne les particuliers et les
                professionnels dans leurs projets de rénovation, d’électricité,
                de plomberie et de peinture.
                <span className="mt-3 block">
                  Nous intervenons rapidement en Île-de-France et dans toute la
                  région parisienne avec un accompagnement personnalisé.
                </span>
              </p>

              <div
                className="mt-8 border-y py-6 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-300/.8),transparent)1]"
                data-aos="zoom-y-out"
                data-aos-delay={450}
              >
                <div className="mx-auto flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
                  <Link
                    href="/devis"
                    className="btn group w-full justify-center bg-linear-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%] sm:w-auto"
                  >
                    <span className="relative inline-flex items-center">
                      Demande de devis
                      <span className="ml-2 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </Link>

                  <Link
                    href="/projets"
                    className="btn w-full justify-center bg-white text-gray-800 shadow-sm hover:bg-gray-50 sm:w-auto"
                  >
                    Voir nos projets
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div
            className="mx-auto max-w-3xl"
            data-aos="zoom-y-out"
            data-aos-delay={600}
          >
            <div className="relative rounded-2xl bg-gray-900 px-4 py-5 shadow-xl sm:px-5 sm:py-6">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {services.map((service) => {
                  const Icon = service.icon

                  return (
                    <div
                      key={service.title}
                      className="group rounded-2xl border border-white/10 bg-white/5 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:bg-white/10"
                    >
                      <div className="mb-4 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/10 sm:h-20 sm:w-20">
                          <Icon className="h-9 w-9 text-blue-400 transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12" />
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-white">
                        {service.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-gray-400">
                        {service.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}