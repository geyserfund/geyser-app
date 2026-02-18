import { useParams } from 'react-router'

import { ProductsGrid } from '../components/ProductsGrid.tsx'

export const CategoryProducts = () => {
  const { category } = useParams<{ category: string }>()

  const decodedCategory = category ? decodeURIComponent(category) : undefined

  return <ProductsGrid category={decodedCategory} />
}
