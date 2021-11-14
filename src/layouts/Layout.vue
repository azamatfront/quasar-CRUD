<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center"> Products </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab
          v-for="link in links"
          :key="link.title"
          :icon="link.icon"
          :label="link.title"
          :to="link.link"
          exact
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      :breakpoint="785"
      :width="250"
      class="bg-primary"
      show-if-above
      bordered
    >
      <q-list dark>
        <q-item-label header> Navigation </q-item-label>

        <Links v-for="link in links" :key="link.title" :="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import Links from "../components/Links.vue";

const linksList = [
  {
    title: "Products",
    icon: "inventory_2",
    link: "/",
  },
	{
		title: "Settings",
		icon: "settings",
		link: '/settings'
	}
];

export default defineComponent({
  name: "Layout",

  components: {
    Links,
  },

  setup() {
    return {
      links: linksList,
    };
  },
});
</script>

<style lang="scss" scoped>
@media screen and (min-width: 767px) {
  .q-footer {
    display: none;
  }
}

.q-drawer {
  .q-router-link--exact-active {
    color: $white !important;
  }
}
</style>