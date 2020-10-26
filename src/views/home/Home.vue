<template>
  <div class="home-wrapper">
    <v-data-select :dp="select.dp" style="min-width: 200px;" showSearch />

    <base-card title="Base Card">
      <span style="padding: 10px;">This is a basic card</span>
    </base-card>

    <cust-card title="Cust Card">
      <span>This is a custimized card</span>
    </cust-card>
  </div>
</template>

<script>
import {mapi, mock} from '@/mocks/index.js';
import DataProvider from '@/models/DataProvider.js';
import BaseCard from './_components/BaseCard.vue';
import CustCard from './_components/CustCard.vue';

export default {
  name: 'home',
  components: {
    [BaseCard.name]: BaseCard,
    [CustCard.name]: CustCard
  },
  data() {
    return {
      select: {
        dp: new DataProvider({
          request: {
            api: (params) => mapi({
              success: true,
              res: mock({
                data: {
                  'list|20': [{
                    'value|+1': 1,
                    label: 'Label @value',
                  }],
                  'total|100-1000': 1
                }

              })
            })
          }
        })
      }
    };
  },
};
</script>

<style lang="less" scoped>

</style>
