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
    chosenGenre: {
      name: "",
      id: null
    },
    isGenreChosen: false,
    theBestRating: null,
    theBestCompany: "Company",
    theDateOfReleaseGame: "date",
    cardCount: null,
    limit: 10,
    topScreenshot: "",
    gameImages: [],
    gameCards: []
    // gameScreenshots: []
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
    gameImages(state) {
      return state.gameImages;
    },
    topScreenshot(state) {
      return state.topScreenshot;
    },
    theBestRating(state) {
      return state.theBestRating;
    },
    chosenGenre(state) {
      return state.chosenGenre;
    },
    cardCount(state) {
      return state.cardCount;
    },
    isGenreChosen(state) {
      return state.isGenreChosen;
    },
    theBestCompany(state) {
      return state.theBestCompany;
    },
    theDateOfReleaseGame(state) {
      return state.theDateOfReleaseGame;
    }
  },
  mutations: {
    setInstallPrompt(state, data) {
      state.installPrompt = data;
    },
    setBestRating(state, data) {
      state.theBestRating = data;
    },
    setChosenGenre(state, data) {
      state.chosenGenre.name = data[1];
      state.chosenGenre.id = data[0];
      state.isGenreChosen = true;
    },
    setCardCount(state, data) {
      state.cardCount = data;
    },
    setGameCards(state, data) {
      state.gameCards = data;
    },
    setTopScreenshot(state, data) {
      let size = "1080p";
      let hash = data;
      let screenshot = `https://images.igdb.com/igdb/image/upload/t_${size}/${hash}.jpg`;
      state.topScreenshot = screenshot;
    },
    setCardImages(state, data) {
      let gameCards = state.gameCards;
      let size = "720p";
      for (let i = 0; i < gameCards.length; i++) {
        for (let j = gameCards.length - 1; j >= 0; j--) {
          if (gameCards[i].cover === data[j].id) {
            let hash = data[j].image_id;
            state.gameImages.push(
              `https://images.igdb.com/igdb/image/upload/t_${size}/${hash}.jpg`
            );
          }
        }
      }
    },
    setTheBestCompany(state, data) {
      state.theBestCompany = data;
    },
    setTheDateOfReleaseGame(state, data) {
      state.theDateOfReleaseGame = data;
    }
  },
  actions: {
    getGameCards(context) {
      axios(context.state.proxyUrl + context.state.baseUrl + "games", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "user-key": context.state.API_KEY
        },
        data: `f name,cover,genres,total_rating,screenshots,involved_companies;
        w involved_companies != null & screenshots != null & total_rating != null & genres = (${context.state.chosenGenre.id}) & cover != null;limit ${context.state.limit};`
      })
        .then(response => {
          context.commit("setGameCards", response.data);
          let covers = [];
          for (let i = 0; i < response.data.length; i++) {
            covers.push(response.data[i].cover);
          }
          return covers;
        })
        .then(covers => {
          axios(context.state.proxyUrl + context.state.baseUrl + "covers", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
              "user-key": context.state.API_KEY
            },
            data: `f image_id;where id = (${covers});limit ${context.state.limit};`
          }).then(response => {
            context.commit("setCardImages", response.data);
          });
        })
        .catch(err => {
          console.log("ошибка" + err);
        });
    },
    getTopScreenshot(context, data) {
      axios(context.state.proxyUrl + context.state.baseUrl + "screenshots", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "user-key": context.state.API_KEY
        },
        data: `f image_id;w id = ${data};limit 1;`
      }).then(response => {
        context.commit("setTopScreenshot", response.data[0].image_id);
      });
    },
    getTheBestCompany(context, data) {
      axios(
        context.state.proxyUrl + context.state.baseUrl + "involved_companies",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "user-key": context.state.API_KEY
          },
          data: `f company;w game = ${data};limit 1;`
        }
      )
        .then(response => {
          return response.data[0].company;
        })
        .then(data => {
          axios(context.state.proxyUrl + context.state.baseUrl + "companies", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
              "user-key": context.state.API_KEY
            },
            data: `f name;w id = ${data};limit 1;`
          }).then(response => {
            context.commit("setTheBestCompany", response.data[0].name);
          });
        })
        .catch(err => {
          console.log("ошибка" + err);
        });
    },
    getTheDateOfReleaseGame(context, data) {
      axios(context.state.proxyUrl + context.state.baseUrl + "release_dates", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "user-key": context.state.API_KEY
        },
        data: `f human; w game = ${data};limit 1;`
      }).then(response => {
        context.commit("setTheDateOfReleaseGame", response.data[0].human);
      });
    }
  }
});
