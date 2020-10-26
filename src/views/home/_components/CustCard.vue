<template>
  <base-card class="cust-card" v-bind="attrs" v-on="$listeners">
    <template v-for="item in slots" #[item]="slotProps">
      <slot :name="item" v-bind="slotProps">
      </slot>
    </template>

    <div class="cust-card-content">
      <slot />
    </div>
  </base-card>
</template>

<script>
import BaseCard from './BaseCard.vue';

export default {
  inheritAttrs: false,
  name: 'cust-card',
  components: {
    [BaseCard.name]: BaseCard,
  },
  props: {

  },
  data() {
    return {

    };
  },
  computed: {
    attrs() {
      const attrs = {};
      const mergeAttrs = {};
      return {...attrs, ...mergeAttrs, ...this.$attrs};
    },
    slots() {
      return Object.keys({
        ...{

        },
        ...this.$slots,
        ...this.$scopedSlots
      });
    }
  }
};
</script>

<style>

</style>
