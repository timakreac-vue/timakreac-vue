<template>
  <div id="app">
    <transition-group name="slideInBottom" mode="in-out">
      <app-genres v-if="!isGenreChosen" :key="1"></app-genres>
      <template v-else>
        <app-header :key="2"></app-header>
        <app-games :key="3"></app-games>
        <app-footer :key="4"></app-footer>
      </template>
    </transition-group>
  </div>
</template>

<script>
import AppHeader from "./components/Header";
import AppGames from "./components/Games";
import AppFooter from "./components/Footer";
import AppGenres from "./components/Genres";

import { mapGetters } from "vuex";

export default {
  components: {
    AppHeader,
    AppGames,
    AppFooter,
    AppGenres
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["isGenreChosen"])
  }
};
</script>

