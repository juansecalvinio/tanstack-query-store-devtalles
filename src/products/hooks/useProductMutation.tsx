import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Product, productActions } from '..'

export const useProductMutation = () => {
  const queryClient = useQueryClient()

  const productMutation = useMutation({
    mutationFn: productActions.createProduct,
    onMutate: product => {
      console.log('Mutando - Optimistic update')

      // Optimistic product
      const optimisticProduct = {
        id: Math.random(),
        ...product
      }
      console.log({ optimisticProduct })

      // Almacenar producto en cache del queryClient
      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: product.category }],
        old => {
          if (!old) return [optimisticProduct]
          return [...old, optimisticProduct]
        }
      )

      return { optimisticProduct }
    },
    onSuccess: (product: Product, variables, context) => {
      console.log({ product, variables, context })

      // queryClient.invalidateQueries({
      //   queryKey: ['products', { filterKey: product.category }]
      // })

      // Elimino la query con el id generado aleatoriamente
      queryClient.removeQueries({
        queryKey: ['products', context?.optimisticProduct.id]
      })

      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: product.category }],
        prevProducts => {
          if (!prevProducts) return [product]

          return prevProducts.map(prevProduct => {
            return prevProduct.id === context?.optimisticProduct.id
              ? product
              : prevProduct
          })
        }
      )
    },

    onError: (error, variables, context) => {
      console.log({ error, variables, context })

      // Elimino la query con el id generado aleatoriamente
      queryClient.removeQueries({
        queryKey: ['products', context?.optimisticProduct.id]
      })

      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: variables.category }],
        prevProducts => {
          if (!prevProducts) return []

          return prevProducts.filter(prevProduct => {
            return prevProduct.id !== context?.optimisticProduct.id
          })
        }
      )
    }
  })

  return productMutation
}
