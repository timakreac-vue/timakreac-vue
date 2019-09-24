<template>
  <div id="genres">
    <h2>Choose genre of the games:</h2>
    <ul>
      <li v-for="genre in genres" :key="genre.id">
        <router-link :to="'/games/' + genre.slug">
          <span :data-slug="genre.slug" @click="chosenGenre($event)">{{genre.name}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      genres: [
        {
          name: "Point-and-click",
          slug: "point-and-click"
        },
        {
          name: "Fighting",
          slug: "fighting"
        },
        {
          name: "Shooter",
          slug: "shooter"
        },
        {
          name: "Music",
          slug: "music"
        },
        {
          name: "Platform",
          slug: "platform"
        },
        {
          name: "Puzzle",
          slug: "puzzle"
        },
        {
          name: "Racing",
          slug: "racing"
        },
        {
          name: "Real Time Strategy (RTS)",
          slug: "real-time-strategy-rts"
        },
        {
          name: "Role-playing (RPG)",
          slug: "role-playing-rpg"
        },
        {
          name: "Simulator",
          slug: "simulator"
        },
        {
          name: "Sport",
          slug: "sport"
        },
        {
          name: "Strategy",
          slug: "strategy"
        },
        {
          name: "Turn-based strategy (TBS)",
          slug: "turn-based-strategy-tbs"
        },
        {
          name: "Tactical",
          slug: "tactical"
        },
        {
          name: "Hack and slash/Beat 'em up",
          slug: "hack-and-slash-beat-em-up"
        },
        {
          name: "Quiz/Trivia",
          slug: "quiz-trivia"
        },
        {
          name: "Pinball",
          slug: "pinball"
        },
        {
          name: "Adventure",
          slug: "adventure"
        },
        {
          name: "Indie",
          slug: "indie"
        },
        {
          name: "Arcade",
          slug: "arcade"
        }
      ]
    };
  },
  methods: {
    chosenGenre(e) {
      this.$store.commit("setChosenGenre", e.target.textContent);
    }
  }
};
</script>

<style scoped>
#genres {
  display: flex;
  flex-direction: column;
  margin: auto;
  text-align: center;
}
h2 {
  font-size: 26px;
  margin: 20px 0;
  font-weight: 600;
}
ul {
  margin: 0 auto;
  max-width: 800px;
}
li {
  margin: 5px 10px;
  padding: 10px 10px;
  border: 1px solid #000;
  border-radius: 10px;
  transition: all 0.5s;
  display: inline-block;
}
li:hover {
  background: #000;
}
li:hover a {
  color: #fff;
}
a {
  cursor: pointer;
  display: inline-block;
  color: #333;
  font-size: 18px;
}
</style>