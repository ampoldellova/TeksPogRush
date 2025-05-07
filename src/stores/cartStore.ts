import type { cartItem } from '@/components/models/types'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]') as cartItem[],
  }),
  getters: {
    getCartItems: (state) => state.cartItems,
    // getTotalPrice: (state) =>
    //   state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
  },
  actions: {
    addToCart(item: cartItem) {
      const existingItem = this.cartItems.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        const user = localStorage.getItem('loginStatus')
        console.log('User:', user)
        existingItem.quantity += 1
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
        ElMessage({
          message: 'Item added to cart!',
          grouping: true,
          type: 'success',
        })
      } else {
        this.cartItems.push(item)
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
        ElMessage({
          message: 'Item added to cart!',
          grouping: true,
          type: 'success',
        })
      }
    },
    // removeFromCart(itemId: string) {
    //   this.cartItems = this.cartItems.filter((item) => item.id !== itemId)
    // },
    // clearCart() {
    //   this.cartItems = []
    // },
  },
})
