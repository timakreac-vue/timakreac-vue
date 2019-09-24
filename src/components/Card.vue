<template>
  <div class="card">
    <div class="card-header">
      <div class="card-bg">
        <img :src="gameCardBg" alt />
      </div>
      <div class="container">
        <svg
          class="card-rating"
          width="105px"
          height="105px"
          style="width:105px;text-align:center;"
        >
          <circle cx="55" cy="55" r="50" fill="#FFFFFF" />
          <path
            stroke-linecap="round"
            stroke-width="6"
            stroke="#F3F3F3"
            fill="none"
            stroke-dasharray="251.2 251.2"
            d="M55 15 a 40 40 0 0 1 0 80 a 40 40 0 0 1 0 -80"
            data-reactid="89"
          />
          <path
            class="gauge-progress"
            stroke-linecap="round"
            stroke-width="5"
            fill="none"
            d="M55 15 a 40 40 0 0 1 0 80 a 40 40 0 0 1 0 -80"
            :style="`stroke-dasharray: ${gameCard.total_rating * 2.48}, 251.2; transition: stroke-dasharray 3s ease 0s;`"
          />
          <text
            x="55"
            y="60"
            text-anchor="middle"
            dy="7"
            fill="#34373b"
            font-size="34"
          >{{parseInt(gameCard.total_rating)}}</text>
        </svg>
        <a href="/" class="card-logo header-logo">
          Game
          <span>Box</span>
        </a>
        <div class="card-img">
          <img :src="gameCardImg" alt />
        </div>
        <div class="d-flex">
          <div class="card-wrapText">
            <div class="card-title">{{gameCard.name}}</div>
            <div
              class="card-date"
            >{{gameCard.release_dates ? gameCard.release_dates[0].human : 'date'}}</div>
            <div
              class="card-company"
            >{{gameCard.involved_companies ? gameCard.involved_companies[0].company.name : 'company'}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="container">
        <div class="card-genre">
          <div class="card-img-mob">
            <img :src="gameCardImg" alt />
          </div>
          <span class="card-genre_title">Genres:</span>
          <span
            v-for="(genre,i) in gameCard.genres"
            :key="i"
          >{{i > 0 ? ',&#32;' : ''}}{{genre.name}}</span>
        </div>
        <div class="card-descr">
          <span>
            Description:&nbsp;
            <br />
          </span>
          {{gameCard.summary}}
        </div>
        <div class="card-platform">
          <span class="card-platform_title">Platforms:</span>
          <span
            v-for="(platform,i) in gameCard.platforms"
            :key="i"
          >{{i > 0 ? ',&#32;' : ''}}{{platform.abbreviation}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  created() {
    this.$store.dispatch("getCardGameBySlug", this.id);
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    gameCard() {
      return this.$store.getters.cardGameBySlug;
    },
    gameCardImg() {
      if (this.gameCard.cover) {
        let hash = this.gameCard.cover.image_id;
        let size = "cover_big";
        let coverMask = `https://images.igdb.com/igdb/image/upload/t_${size}/${hash}.jpg`;
        return coverMask;
      }
    },
    gameCardBg() {
      if (this.gameCard.screenshots) {
        let hash = this.gameCard.screenshots[0].image_id;
        let size = "1080p";
        let coverMask = `https://images.igdb.com/igdb/image/upload/t_${size}/${hash}.jpg`;
        return coverMask;
      }
    }
  }
};
</script>

<style scoped>
.gauge-progress {
  stroke: #10af65;
}
.container {
  position: relative;
}
.card {
  padding-bottom: 50px;
  overflow: hidden;
  background: #fafafa;
  z-index: 0;
  padding-top: 50px;
  min-height: 800px;
  color: #fff;
  position: relative;
}
.card-header {
  height: 540px;
}
.card-logo {
  margin-bottom: 200px;
}
.card-bg {
  width: 100%;
  height: 540px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: -1;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  transform: scale(1.05);
}
.card-bg::before {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  z-index: 1;
  height: 22px;
  bottom: -17px;
  left: 0;
  background-color: #fafafa;
}
.card-bg img {
  position: relative;
  filter: blur(6px);
  height: 100%;
  width: 100%;
}

.card-bg::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
}
.card-img {
  width: 264px;
  height: 352px;
  position: absolute;
}
.card-img img {
  width: 264px;
  height: 352px;
}
.card-wrapText {
  margin-top: 10px;
  margin-left: 300px;
}
.card-title {
  font-size: 50px;
  letter-spacing: 1.5px;
  font-weight: 700;
  margin-bottom: 20px;
}
.card-date {
  opacity: 0.8;
  letter-spacing: 1.5px;
  font-size: 26px;
}
.card-company {
  opacity: 0.8;
  margin-top: 20px;
  letter-spacing: 1.5px;
  font-size: 18px;
}
.card-rating {
  position: absolute;
  right: 20px;
  top: 430px;
}
.card-body {
  color: #222;
}
.card-body > .container {
  padding-left: 300px;
}
.card-genre {
  letter-spacing: 1px;
}
.card-genre_title,
.card-platform_title,
.card-descr span {
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 0.5px;
  font-weight: 600;
}
.card-descr,
.card-platform {
  max-width: 500px;
  margin-top: 15px;
  line-height: 20px;
  letter-spacing: 1px;
}
.card-img-mob img {
  display: none;
}
@media screen and (max-width: 776px) {
  .card-title {
    font-size: 32px;
  }
  .card-date {
    font-size: 20px;
  }
  .card-company {
    font-size: 16px;
  }
  .card-body > .container {
    padding-left: 15px;
  }
  .card-genre {
    margin-top: 70px;
  }
  .card-descr {
    max-width: 100%;
  }
}
@media screen and (max-width: 640px) {
  .card-img {
    display: none;
  }
  .card-img-mob img {
    margin: 0 auto;
    display: block;
    margin-bottom: 30px;
  }
  .card-wrapText {
    margin-left: 15px;
  }
  .card-genre {
    margin-top: 30px;
  }
}
</style>