<template>
  <main class="games">
    <div class="container">
      <h2 class="games-title">Genre: {{chosenGenre.name}}</h2>

      <div class="games-cards">
        <div class="games-card" v-for="(card,index) in gameCards" :key="index">
          <div class="games-card_img">
            <img :src="cardCover(index)" alt="1" />
            <span>{{card.release_dates[0].y}}</span>
          </div>
          <div class="games-cardBody">
            <h3 class="games-cardBody_title">
              <a href="#">{{ card.name }}</a>
            </h3>
            <p class="games-cardBody_genre">{{card.genres[0].name}}</p>
            <div class="games-cardBody_rating">{{ parseInt(card.total_rating) }}</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("getGameCards");
  },
  computed: {
    ...mapGetters(["gameCards", "chosenGenre"])
  },
  methods: {
    cardCover(index) {
      let hash = this.gameCards[index].cover.image_id;
      let size = "720p";
      let coverMask = `https://images.igdb.com/igdb/image/upload/t_${size}/${hash}.jpg`;
      return coverMask;
    }
  }
};
</script>