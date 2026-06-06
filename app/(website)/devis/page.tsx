import DevisUtilisateur from "@/components/devis";


  type Props = {
  searchParams: Promise<{
  success?: string
  }>
}

export default async function Devis({searchParams}: Props) {
    const { success } = await searchParams


    return(
        <>
            <DevisUtilisateur success={success}/>
            
        </>
    )
}