import sharp from "sharp"
import { createClient } from "@supabase/supabase-js"

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const MAX_SIZE = 300 * 1024 // 300 Ko

export async function optimizeToWebp(file: File, maxWidth = 1600) {
  const arrayBuffer = await file.arrayBuffer()
  const inputBuffer = Buffer.from(arrayBuffer)

  let quality = 80
  let outputBuffer = await sharp(inputBuffer)
    .resize({
      width: maxWidth,
      withoutEnlargement: true,
    })
    .webp({ quality })
    .toBuffer()

  while (outputBuffer.length > MAX_SIZE && quality > 40) {
    quality -= 10

    outputBuffer = await sharp(inputBuffer)
      .resize({
        width: maxWidth,
        withoutEnlargement: true,
      })
      .webp({ quality })
      .toBuffer()
  }

  if (outputBuffer.length > MAX_SIZE) {
    throw new Error("L’image est trop lourde. Veuillez utiliser une image plus légère.")
  }

  return outputBuffer
}

export async function uploadOptimizedImage(
  file: File,
  folder: string,
  maxWidth = 1600
) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Le fichier doit être une image")
  }

  const buffer = await optimizeToWebp(file, maxWidth)

  const filePath = `${folder}/${Date.now()}-${crypto.randomUUID()}.webp`

  const { error } = await supabaseAdmin.storage
    .from("images-bigbang")
    .upload(filePath, buffer, {
      contentType: "image/webp",
      upsert: false,
    })

  if (error) {
    throw new Error(error.message)
  }

  return filePath
}

export { supabaseAdmin }