import Image from 'next/image'
import { client } from '../../../sanity/client'

const PLANT_QUERY = `*[_type == "plant" && slug.current == $slug][0]{
  _id,
  name,
  description,
  "imageUrl": image.asset->url,
  careGuide->{
    title,
    wateringInstructions,
    lightRequirements,
    soilType,
    fertilizer,
    difficulty
  }
}`

// NOTE: params is a Promise in the latest Next.js
type PlantPageProps = {
  params: Promise<{ slug: string }>
}

export default async function PlantPage({ params }: PlantPageProps) {
  const { slug } = await params // 🔹 unwrap the Promise

  const plant = await client.fetch(PLANT_QUERY, { slug }) // 🔹 now $slug is provided

  if (!plant) {
    return <main className="p-8">Plant not found</main>
  }

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="mb-4 text-3xl font-bold">{plant.name}</h1>

      {plant.imageUrl && (
        <Image
          src={plant.imageUrl}
          alt={plant.name}
          width={600}
          height={400}
          className="mb-6 rounded-lg object-cover"
        />
      )}

      <p className="text-gray-700">{plant.description}</p>

      {plant.careGuide && (
        <section className="mt-8 rounded-xl border border-emerald-800/50 bg-emerald-900/20 p-6">
          <h2 className="mb-3 text-lg font-semibold text-emerald-100">Care Guide</h2>

          <dl className="space-y-2 text-sm text-emerald-50">
            {plant.careGuide.wateringInstructions && (
              <div className="flex gap-2">
                <dt className="font-semibold text-emerald-200">Watering:</dt>
                <dd>{plant.careGuide.wateringInstructions}</dd>
              </div>
            )}

            {plant.careGuide.lightRequirements && (
              <div className="flex gap-2">
                <dt className="font-semibold text-emerald-200">Light:</dt>
                <dd className="capitalize">{plant.careGuide.lightRequirements}</dd>
              </div>
            )}

            {plant.careGuide.soilType && (
              <div className="flex gap-2">
                <dt className="font-semibold text-emerald-200">Soil:</dt>
                <dd>{plant.careGuide.soilType}</dd>
              </div>
            )}

            {plant.careGuide.fertilizer && (
              <div className="flex gap-2">
                <dt className="font-semibold text-emerald-200">Fertilizer:</dt>
                <dd>{plant.careGuide.fertilizer}</dd>
              </div>
            )}

            {plant.careGuide.difficulty && (
              <div className="flex gap-2">
                <dt className="font-semibold text-emerald-200">Difficulty:</dt>
                <dd className="capitalize">{plant.careGuide.difficulty}</dd>
              </div>
            )}
          </dl>
        </section>
      )}
    </main>
  )
}
