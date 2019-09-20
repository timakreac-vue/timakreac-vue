<template>
  <header class="header" :style="theBestBg">
    <div class="container d-flex jcsb">
      <div>
        <a href="#" class="header-logo">
          Game
          <span>Box</span>
        </a>
        <transition name="slideInRight" appear>
          <h1
            class="header-gameTitle"
            style="transition-delay: 0.4s;"
          >{{theBestCard.name ? theBestCard.name : 'Name of the game'}}</h1>
        </transition>
        <transition name="slideInRight" appear>
          <div class="header-gameInfo" style="transition-delay: 0.6s;">
            <span
              class="header-gameInfo_date"
            >{{theBestCard.release_dates ? theBestCard.release_dates[0].human : 'date'}}</span>
            <span
              class="header-gameInfo_studio"
            >{{theBestCard.involved_companies ? theBestCard.involved_companies[0].company.name : 'company'}}</span>
          </div>
        </transition>
        <transition name="slideInRightBtn" appear>
          <a href="#" class="header-btn">View info</a>
        </transition>
      </div>
      <transition name="slideInLeft" appear>
        <div class="header-gameRating d-flex jcsb" style="transition-delay: 0.6s;">
          <div>
            <h4 class="header-gameRating_title">Rating</h4>
            <p class="header-gameRating_base">
              Based on {{cardLength}}
              <br />member ratings
            </p>
          </div>
          <span
            class="header-gameRating_value"
          >{{theBestCard.total_rating ? parseInt(theBestCard.total_rating) : '0'}}</span>
        </div>
      </transition>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["theBestCard", "cardLength"]),
    theBestBg() {
      if (this.theBestCard.screenshots) {
        let hash = this.theBestCard.screenshots[0].image_id;

        return {
          background: `url(https://images.igdb.com/igdb/image/upload/t_1080p/${hash}.jpg)`
        };
      }
    }
  }
};
</script>