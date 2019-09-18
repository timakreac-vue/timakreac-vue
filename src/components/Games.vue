<template>
  <main class="games">
    <div class="container">
      <h2 class="games-title">Жанр: {{chosenGenre.name}}</h2>

      <div class="games-cards">
        <div class="games-card" v-for="(card,index) in gameCards" :key="index">
          <div class="games-card_img">
            <img :src="gameImages[index]" :alt="card.slug" />
          </div>
          <div class="games-cardBody">
            <h3 class="games-cardBody_title">{{ card.name }}</h3>
            <p class="games-cardBody_genre">{{chosenGenre.name}}</p>
            <div
              class="games-cardBody_rating"
            >{{ card.total_rating ? parseInt(card.total_rating) : 'N/A'}}</div>
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
  beforeUpdate() {
    const cards = document.querySelectorAll(".games-cardBody_rating");
    const cardRatings = [];
    cards.forEach(card => {
      cardRatings.push(card.textContent);
    });
    const theBest = cardRatings.reduce(
      (result, number) => (number > result ? number : result),
      0
    );
    this.$store.commit("setBestRating", theBest);
    this.$store.commit("setCardCount", cards.length);
  },
  computed: {
    ...mapGetters(["gameCards", "gameImages", "chosenGenre"])
  }
};
</script>