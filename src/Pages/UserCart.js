import { useState } from 'react';
import { CheckIcon, ClockIcon } from '@heroicons/react/20/solid';
import { Link, useNavigate } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Artwork Tee',
    href: '#',
    price: 32.0,
    inStock: true,
    description: 'A soft cotton t-shirt with a stylish wavey line pattern.',
    imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/checkout-page-03-product-04.jpg',
    imageAlt: 'Front side of mint cotton t-shirt with wavey lines pattern.',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    price: 32.0,
    inStock: false,
    leadTime: '7-8 years',
    description: 'Classic charcoal tee made from 100% organic cotton.',
    imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/shopping-cart-page-01-product-02.jpg',
    imageAlt: 'Front side of charcoal cotton t-shirt.',
  },
];

export default function ShoppingCart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(
    products.map((product) => ({ ...product, quantity: 1 }))
  );

  const updateQuantity = (id, quantity) => {
    setCart(cart.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>

        <form className="mt-12">
          <section aria-labelledby="cart-heading">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {cart.map((product) => (
                <li key={product.id} className="flex py-6">
                  <div className="shrink-0">
                    <img
                      alt={product.imageAlt}
                      src={product.imageSrc}
                      className="size-24 rounded-md object-cover sm:size-32"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                    {/* Clickable Product Details */}
                    <Link to={`/product/${product.id}`} className="block">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium text-gray-700 hover:text-gray-800">
                            {product.name}
                          </h4>
                          <p className="ml-4 text-sm font-medium text-gray-900">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                      </div>
                    </Link>

                    <div className="mt-4 flex items-center justify-between space-x-4">
                      {/* Stock Status */}
                      <p className="flex items-center text-sm text-gray-700">
                        {product.inStock ? (
                          <CheckIcon className="h-5 w-5 text-green-500" />
                        ) : (
                          <ClockIcon className="h-5 w-5 text-gray-300" />
                        )}
                        <span className="ml-2">
                          {product.inStock ? "In stock" : `Will ship in ${product.leadTime}`}
                        </span>
                      </p>

                      {/* Quantity Selector */}
                      <div className="flex items-center bg-gray-200 rounded-md">
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, Math.max(1, product.quantity - 1))}
                          className="px-3 py-1 text-gray-700"
                        >
                          -
                        </button>
                        <span className="px-4 text-sm font-medium">{product.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, product.quantity + 1)}
                          className="px-3 py-1 text-gray-700"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        className="text-sm font-medium text-red-600 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section aria-labelledby="summary-heading" className="mt-10">
            <h2 id="summary-heading" className="sr-only">Order summary</h2>

            <div>
              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">Subtotal</dt>
                  <dd className="ml-4 text-base font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                </div>
              </dl>
              <p className="mt-1 text-sm text-gray-500">Shipping and taxes will be calculated at checkout.</p>
            </div>

            <div className="mt-10">
              <button
                type="button"
                onClick={() => navigate('/payment-integration')}
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Checkout
              </button>
            </div>

            <div className="mt-6 text-center text-sm">
              <p>

                <a href="/home" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Continue Shopping <span aria-hidden="true"> &rarr;</span>
                </a>
              </p>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
