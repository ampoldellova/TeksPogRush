import { ref } from 'vue'
import gcash from '@/assets/shop/gcash.png'
import creditCard from '@/assets/shop/creditCard.png'

export const paymentMethods = ref([
  {
    id: '001',
    name: 'GCash',
    image: gcash,
  },
  {
    id: '002',
    name: 'Credit Card',
    image: creditCard,
  },
])
