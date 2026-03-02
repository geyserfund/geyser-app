import { useParams } from 'react-router'

import { ProductsGrid } from '../components/ProductsGrid.tsx'

export const CategoryProducts = () => {
  const { category } = useParams<{ category: string }>()

  const decodedCategory = category ? decodeURIComponent(category) : undefined
  const normalizedCategory = decodedCategory === 'Mining Hardware' ? 'Hardware' : decodedCategory

  return <ProductsGrid category={normalizedCategory} />
}
