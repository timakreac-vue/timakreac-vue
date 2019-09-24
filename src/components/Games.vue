<template>
  <div>
    <app-header></app-header>
    <app-cards></app-cards>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from "./Header";
import AppCards from "./Cards";
import AppFooter from "./Footer";

export default {
  components: {
    AppHeader,
    AppCards,
    AppFooter
  },
  created() {
    this.$store.commit("setGameSlug", this.genre);
  },
  computed: {
    genre() {
      return this.$route.params.genre;
    }
  },
  data() {
    return {};
  }
};
</script>