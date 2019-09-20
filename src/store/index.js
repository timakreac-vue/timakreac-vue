import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    installPrompt: null,
    API_KEY: "c1380b9d0bc21019803e5db32dafbf97",
    baseUrl: "https://api-v3.igdb.com/",
    proxyUrl: "https://cors-anywhere.herokuapp.com/",
    gameCards: [],
    theBestCard: "",
    cardLength: 0,
    chosenGenre: {
      id: null,
      name: ""
    },
    isGenreChosen: false
    // page: 1,
    // perPage: 9,
    // pages: [],
  },
  getters: {
    installPrompt(state) {
      return state.installPrompt;
    },
    canInstall(state) {
      return (
        "BeforeInstallPromptEvent" in window &&
        state.installPrompt instanceof BeforeInstallPromptEvent
      );
    },
    gameCards(state) {
      return state.gameCards;
    },
    theBestCard(state) {
      return state.theBestCard;
    },
    cardLength(state) {
      return state.cardLength;
    },
    chosenGenre(state) {
      return state.chosenGenre;
    },
    isGenreChosen(state) {
      return state.isGenreChosen;
    }
  },
  mutations: {
    setInstallPrompt(state, data) {
      state.installPrompt = data;
    },
    setGameCards(state, data) {
      state.gameCards = data;
      state.cardLength = data.length;
    },
    setTheBestCard(state, data) {
      state.theBestCard = data;
    },
    setChosenGenre(state, data) {
      state.chosenGenre.id = data[0];
      state.chosenGenre.name = data[1];
      state.isGenreChosen = true;
    }
  },
  actions: {
    getGameCards({ commit, state }) {
      axios(state.proxyUrl + state.baseUrl + "games", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "user-key": state.API_KEY
        },
        data: `f name, cover.image_id, genres.name,total_rating, screenshots.image_id, involved_companies.company.name, release_dates.human,release_dates.y;
        w cover != null & total_rating != null & screenshots != null & involved_companies != null & release_dates != null
        & genres = ${state.chosenGenre.id};
        limit 12;`
      })
        .then(res => {
          let max = res.data[0].total_rating;
          let theBestCard = res.data[0];
          for (let i = 1; i < res.data.length; i++) {
            if (res.data[i].total_rating > max) {
              max = res.data[i].total_rating;
              theBestCard = res.data[i];
            }
          }
          commit("setGameCards", res.data);
          commit("setTheBestCard", theBestCard);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
