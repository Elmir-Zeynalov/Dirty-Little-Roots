'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type React from 'react'

const CATEGORIES = [
  { label: 'Alle kategorier', value: '' },
  { label: 'Easy care', value: 'easy' },
  { label: 'Sun lover', value: 'sun' },
  { label: 'Shade lover', value: 'shade' },
  { label: 'Pet safe', value: 'petSafe' },
]

export function CategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const current = searchParams.get('category') ?? ''

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set('category', value)
    } else {
      params.delete('category')
    }

    const query = params.toString()
    router.push(query ? `/plants?${query}` : '/plants')
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="category" className="text-sm text-emerald-50">
        Filter:
      </label>
      <select
        id="category"
        value={current}
        onChange={handleChange}
        className="rounded-md border border-emerald-700 bg-black/60 px-3 py-1 text-sm text-emerald-50"
      >
        {CATEGORIES.map((cat) => (
          <option key={cat.value || 'all'} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
    </div>
  )
}
