<template>
  <div>
    <h2>产品</h2>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }}-{{ product.price }}
        <br />
        <input v-model="product.productSum" />
        <button
          @click="addProductToCart(product)"
          :disabled="!product.inventory"
        >
          加入购物车
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: mapState({
    products: (state) => state.products.all,
  }),
  methods: mapActions("cart", ["addProductToCart"]),
  created() {
    this.$store.dispatch("products/getAllProducts");
  },
 
};
</script>
