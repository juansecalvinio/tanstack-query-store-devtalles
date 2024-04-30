import { Card, Image } from '@nextui-org/react'
import { Product } from '../interfaces/product'
import { Link } from 'react-router-dom'

interface Props {
  product: Product
  fullDescription?: boolean
  prefetchProduct?: (id: number) => void
}

export const ProductCard = ({
  product,
  fullDescription = false,
  prefetchProduct
}: Props) => {
  return (
    <Link
      to={`/product/${product.id}`}
      onMouseLeave={() => prefetchProduct && prefetchProduct(product.id)}
    >
      <Card className='relative flex flex-col max-w-xs min-h-full p-3 mx-auto space-y-3 bg-white border border-white shadow-lg md:flex-row md:space-x-5 md:space-y-0 rounded-xl md:max-w-3xl'>
        <div className='grid w-full bg-white md:w-1/3 place-items-center'>
          <Image
            src={product.image}
            alt='tailwind logo'
            width={300}
            height={400}
            className='p-5 bg-white rounded-xl sm:p-0'
          />
        </div>
        <div className='flex flex-col w-full p-3 space-y-2 bg-white md:w-2/3'>
          <div className='flex justify-between item-center'>
            <p className='hidden font-medium text-gray-500 md:block'>
              {product.category}
            </p>
          </div>
          <h3 className='text-xl font-black text-gray-800 md:text-xl'>
            {product.title}
          </h3>

          <p className='text-base text-gray-500 md:text-lg'>
            {fullDescription
              ? product.description
              : product.description.slice(0, 50) + '...'}
          </p>

          <p className='text-xl font-black text-gray-800'>
            ${product.price}
            <span className='text-base font-normal text-gray-600'>
              {' '}
              +impuesto
            </span>
          </p>
        </div>
      </Card>
    </Link>
  )
}
