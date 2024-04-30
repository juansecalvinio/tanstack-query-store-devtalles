import { Button, Image, Input, Textarea } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useProductMutation } from '..'

interface FormInputs {
  title: string
  price: number
  description: string
  category: string
  image: string
}

export const NewProduct = () => {
  const [tempImage, setTempImage] = useState('')

  const productMutation = useProductMutation()

  const { control, handleSubmit, watch } = useForm<FormInputs>({
    defaultValues: {
      title: '',
      price: 0,
      description: '',
      category: "men's clothing",
      image: tempImage
    }
  })

  const newImage = watch('image')

  useEffect(() => {
    setTempImage(newImage)
  }, [newImage])

  const onSubmit: SubmitHandler<FormInputs> = data => {
    productMutation.mutate(data)
  }

  return (
    <div className='flex-col w-full'>
      <h1 className='text-2xl font-bold'>Nuevo producto</h1>

      <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex items-center justify-around'>
          <div className='flex-col w-[500px]'>
            {/* Title */}
            <Controller
              control={control}
              name='title'
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  className='mt-2'
                  type='text'
                  label='Titulo del producto'
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {/* Price */}
            <Controller
              control={control}
              name='price'
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  className='mt-2'
                  type='number'
                  label='Precio del producto'
                  value={field.value?.toString()}
                  onChange={event => field.onChange(+event.target.value)}
                />
              )}
            />
            {/* Image */}
            <Controller
              control={control}
              name='image'
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  className='mt-2'
                  type='url'
                  label='Url del producto'
                  value={field.value?.toString()}
                  onChange={field.onChange}
                />
              )}
            />
            {/* Description */}
            <Controller
              control={control}
              name='description'
              rules={{ required: true }}
              render={({ field }) => (
                <Textarea
                  className='mt-2'
                  label='Descripcion del producto'
                  value={field.value?.toString()}
                  onChange={field.onChange}
                />
              )}
            />
            {/* Category */}
            <Controller
              control={control}
              name='category'
              rules={{ required: true }}
              render={({ field }) => (
                <select
                  value={field.value}
                  onChange={field.onChange}
                  className='w-full p-3 mt-2 bg-gray-800 rounded-md'
                >
                  <option value="men's clothing">Men's clothing</option>
                  <option value="women's clothing">Women's clothing</option>
                  <option value='jewelery'>Jewelery</option>
                  <option value='electronics'>Electronics</option>
                </select>
              )}
            />

            <br />
            <Button
              className='mt-2'
              color='primary'
              type='submit'
              isDisabled={productMutation.isPending}
            >
              {productMutation.isPending ? 'Cargando...' : 'Crear producto'}
            </Button>
          </div>

          <div
            className='flex items-center p-10 bg-white rounded-2xl'
            style={{
              width: '500px',
              height: '600px'
            }}
          >
            <Image src={tempImage} />
          </div>
        </div>
      </form>
    </div>
  )
}
