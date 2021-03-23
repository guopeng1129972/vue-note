<template>
<div>
  <h2>产品</h2>
  <ul>
    <li v-for="product in products" :key="product.id">
      {{ product.title }}-{{ product.price }}
      <br />
      <select v-model="numbers[product.id]">
        <option v-for="n in product.inventory" :key="n" :value="n">{{n}}</option>
      </select>
      <button @click="addProductToCart(product)" :disabled="!product.inventory">
        加入购物车
      </button>
    </li>
  </ul>
</div>
</template>

<script>
import {
  mapState,
  // mapActions
} from "vuex";
export default {
  computed: mapState({
    products: (state) => state.products.all,
  }),
  data() {
    return {
      numbers: {}
    }
  },
  watch: {
    products: {
      handler: function (val) {
        val.forEach(product => {
          if (this.numbers[product.id] === undefined) {
            this.$set(this.numbers, product.id, 1)
          }
        })
      },
      // immediate:true 将当前watch的内容变成为响应式的（products）
      immediate: true
    }
  },
  // methods: mapActions("cart", ["addProductToCart"]),
  methods: {
    addProductToCart(product) {
      this.$store.dispatch('cart/addProductToCart', {
        product,
        number: this.numbers[product.id]
      })
      this.numbers[product.id] = 1
    }
  },
  created() {
    this.$store.dispatch("products/getAllProducts");
  },

};
</script>
