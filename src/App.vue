<template>
  <div id="app">
    <template v-if="false">
      <h2 class="chooseGenre-title">Выбрать жанр</h2>
      <ul class="chooseGenre">
        <li v-for="(genre,index) in gamesGenres" :key="index">
          <a href="#" class="chooseGenre-link" @click="chooseGenre($event)">{{ genre.name }}</a>
        </li>
      </ul>
    </template>
    <template v-if="true">
      <header class="header">
        <div class="container d-flex jcsb">
          <div>
            <a href="#" class="header-logo">
              Game
              <span>Box</span>
            </a>
            <transition name="slideInRight" appear>
              <h1 class="header-gameTitle">God of war</h1>
            </transition>
            <transition name="slideInRight" appear>
              <div class="header-gameInfo" style="transition-delay: 0.2s;">
                <span class="header-gameInfo_date">20th Apr, 2018</span>
                <span class="header-gameInfo_studio">SIE Santa Monica Studio</span>
              </div>
            </transition>
            <transition name="slideInRight" appear>
              <a href="#" class="header-btn" style="transition-delay: 0.4s;">View info</a>
            </transition>
          </div>
          <transition name="slideInLeft" appear>
            <div class="header-gameRating d-flex jcsb" style="transition-delay: 0.6s;">
              <div>
                <h4 class="header-gameRating_title">Rating</h4>
                <p class="header-gameRating_base">
                  Based on {{ gamesCard.length }}
                  <br />member ratings
                </p>
              </div>
              <span class="header-gameRating_value">{{ setBestRating }}</span>
            </div>
          </transition>
        </div>
      </header>

      <section class="games">
        <div class="container">
          <h2 class="games-title">TOP 100</h2>

          <div class="games-cards">
            <div class="games-card" v-for="(card,index) in gamesCard" :key="index">
              <!-- v-show="gamesGenres[index].name == chosenGenre" -->

              <div class="games-card_img">
                <img :src="setUrlImg(index)" :alt="card.slug" />
                <span>{{card.genre}}</span>
              </div>
              <div class="games-cardBody">
                <h3 class="games-cardBody_title">{{ card.name }}</h3>
                <p class="games-cardBody_genre">{{ gamesGenres[index].name }}</p>
                <div
                  class="games-cardBody_rating"
                >{{ card.total_rating ? parseInt(card.total_rating) : 'N/A'}}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="footer">
        <div class="container">
          <div class="d-flex jcsb aic">
            <a href="#" class="footer-logo">
              Game
              <span>Box</span>
            </a>
            <ul class="footer-menu">
              <li>
                <a href="#" class="footer-menu_link">About</a>
              </li>
              <li>
                <a href="#" class="footer-menu_link">Games</a>
              </li>
              <li>
                <a href="#" class="footer-menu_link">Ratings</a>
              </li>
              <li>
                <a href="#" class="footer-menu_link">Contact</a>
              </li>
            </ul>
          </div>
          <hr />
          <div class="d-flex jcsb aic">
            <span class="designed">Designed by ITL</span>
            <div class="footer-social">
              <a href="#">
                <img src="img/facebook.svg" alt="facebook" />
              </a>
              <a href="#">
                <img src="img/pinterest.svg" alt="pinterest" />
              </a>
              <a href="#">
                <img src="img/twitter.svg" alt="twitter" />
              </a>
              <a href="#">
                <img src="img/linkedin.svg" alt="linkedin" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </template>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      gamesCard: [],
      gamesGenres: [],
      gamesImages: [],
      cardLength: 20,
      page: 1,
      perPage: 9,
      chosenGenre: "",
      pages: [],
      API_KEY: "a46549452918dfeab1f37161286dd77d",
      baseUrl: "https://api-v3.igdb.com/",
      proxyUrl: "https://cors-anywhere.herokuapp.com/"
    };
  },
  created() {
    this.getGamesCard();
    this.getGameGenres();
    this.getGamesImages();
  },
  computed: {
    setBestRating() {
      let rating = [];
      for (let i = 0; i < this.gamesCard.length; i++) {
        rating.push(parseInt(this.gamesCard[i].total_rating));
      }
      return rating.reduce(
        (result, number) => (number > result ? number : result),
        0
      );
    }
  },
  methods: {
    getGamesCard() {
      axios(this.proxyUrl + `${this.baseUrl}games`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "user-key": this.API_KEY
        },
        data: `fields name,cover,slug,genres,total_rating;where total_rating > 0 & genres > 0 & cover > 0;limit ${this.cardLength};`
      })
        .then(response => {
          this.gamesCard = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getGameGenres() {
      axios(this.proxyUrl + `${this.baseUrl}genres`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "user-key": this.API_KEY
        },
        data: `fields name;limit ${this.cardLength};` //where id = (11,15);
      })
        .then(response => {
          this.gamesGenres = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getGamesImages() {
      axios(this.proxyUrl + `${this.baseUrl}covers`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "user-key": this.API_KEY
        },
        data: `fields url;limit ${this.cardLength};` //where id = 448;
      })
        .then(response => {
          this.gamesImages = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    chooseGenre(e) {
      e.preventDefault();
      this.chosenGenre = e.target.textContent;
    },
    setUrlImg(index) {
      return (this.gamesImages[index].url = this.gamesImages[index].url.replace(
        "t_thumb",
        "t_cover_big"
      ));
    }
  }
};
</script>

