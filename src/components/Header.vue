<template>
  <header class="header" :style="setBgImage">
    <div class="container d-flex jcsb">
      <div>
        <a href="#" class="header-logo">
          Game
          <span>Box</span>
        </a>
        <transition name="slideInRight" appear>
          <h1 class="header-gameTitle" style="transition-delay: 0.4s;">{{theBestGameName}}</h1>
        </transition>
        <transition name="slideInRight" appear>
          <div class="header-gameInfo" style="transition-delay: 0.6s;">
            <span class="header-gameInfo_date">{{theDateOfReleaseGame}}</span>
            <span class="header-gameInfo_studio">{{theBestCompany}}</span>
          </div>
        </transition>
        <transition name="slideInRight" appear>
          <a href="#" class="header-btn" style="transition-delay: 0.8s;">View info</a>
        </transition>
      </div>
      <transition name="slideInLeft" appear>
        <div class="header-gameRating d-flex jcsb" style="transition-delay: 0.6s;">
          <div>
            <h4 class="header-gameRating_title">Rating</h4>
            <p class="header-gameRating_base">
              Based on {{ cardCount }}
              <br />member ratings
            </p>
          </div>
          <span class="header-gameRating_value">{{ theBestRating }}</span>
        </div>
      </transition>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      theBestGameName: "."
    };
  },
  beforeUpdate() {
    for (let i = 0; i < this.gameCards.length; i++) {
      if (parseInt(this.gameCards[i].total_rating) === +this.theBestRating) {
        this.theBestGameName = this.gameCards[i].name;
        this.$store.dispatch(
          "getTopScreenshot",
          this.gameCards[i].screenshots[0]
        );
        this.$store.dispatch("getTheBestCompany", this.gameCards[i].id);
        this.$store.dispatch("getTheDateOfReleaseGame", this.gameCards[i].id);
        return;
      }
    }
  },
  computed: {
    ...mapGetters([
      "theBestRating",
      "cardCount",
      "gameCards",
      "topScreenshot",
      "theBestCompany",
      "theDateOfReleaseGame"
    ]),
    setBgImage() {
      return {
        background: `#000 url(${this.topScreenshot})`
      };
    }
  }
};
</script>