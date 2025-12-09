import Link from 'next/link'
import { type SanityDocument } from 'next-sanity'
import { client } from '../../sanity/client'
import { CategoryFilter } from './CategoryFilter'

const PLANTS_QUERY = `*[
  _type == "plant" 
  && defined(slug.current)
  && ($category == null || category == $category)
]{
  _id,
  name,
  slug,
  description,
  category,
  "imageUrl": image.asset->url,
  careGuide->{
    title,
    watering,
    sunlight
  }
} | order(name asc)`

const options = { next: { revalidate: 30 } }

// 🔹 Note: searchParams is a Promise in your Next version
type PlantsPageProps = {
  searchParams: Promise<{
    category?: string
  }>
}

export default async function IndexPage({ searchParams }: PlantsPageProps) {
  // ✅ unwrap the Promise
  const { category: rawCategory } = await searchParams

  // ✅ always pass a param to Sanity (null when not set)
  const category = rawCategory || null

  const plants = await client.fetch<SanityDocument[]>(PLANTS_QUERY, { category }, options)

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <p className="mb-4 text-xl">Hei, jeg heter Elmir og jeg elsker planter!</p>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold">Plant Collection</h2>
        <CategoryFilter />
      </div>

      {rawCategory && (
        <p className="mb-4 text-sm text-gray-300">
          Viser planter i kategori: <span className="font-semibold">{rawCategory}</span>
        </p>
      )}

      <ul className="space-y-6">
        {plants.map((plant: any) => (
          <li
            key={plant._id}
            className="rounded-lg border border-emerald-800/40 bg-black/40 p-4 shadow-sm"
          >
            <Link href={`/plants/${plant.slug.current}`}>
              {plant.imageUrl && (
                <img
                  src={plant.imageUrl}
                  alt={plant.name}
                  className="mb-3 h-48 w-full rounded-md object-cover"
                />
              )}

              <h3 className="text-xl font-semibold text-emerald-100">{plant.name}</h3>
            </Link>

            {plant.category && (
              <p className="mt-1 text-xs tracking-wide text-emerald-300/80 uppercase">
                {plant.category}
              </p>
            )}

            <p className="mt-2 text-sm text-gray-300">{plant.description}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
