<template>
  <div>
    <!-- <h2
      v-for="itm in list"
      :key="itm.title"
      :class="itm.to == $route.path ? '' : 'd-none'"
    >
      <v-icon large>{{ itm.to == $route.path ? itm.icon : '' }}</v-icon>
      {{ itm.to == $route.path ? itm.title : '' }}
    </h2> -->
    <div style="background: #f5f5f5" class="mt-5">
      <v-breadcrumbs :items="items">
        <template #item="{ item }">
          <v-breadcrumbs-item :to="item.to" :disabled="item.disabled">
            {{ item.text }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </div>
  </div>
</template>
<script>
import listdasboard from '@/helpers/listdasboard'
export default {
  mixins: [listdasboard],
  data() {
    return {
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          to: '/',
        },
        {
          text:
            this.$route.name.charAt(0).toUpperCase() +
            this.$route.name.slice(1),
          disabled: true,
          to: this.$route.path,
        },
      ],
    }
  },
  mounted() {},
}
</script>
