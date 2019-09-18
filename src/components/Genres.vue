<template>
  <div id="genres">
    <h2>Выберите игры по жанру:</h2>
    <ul>
      <li v-for="genre in genres" :key="genre.id">
        <a :data-id="genre.id" @click="chosenGenre($event)">{{genre.name}}</a>
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
          id: 2
        },
        {
          name: "Fighting",
          id: 4
        },
        {
          name: "Shooter",
          id: 5
        },
        {
          name: "Music",
          id: 7
        },
        {
          name: "Platform",
          id: 8
        },
        {
          name: "Puzzle",
          id: 9
        },
        {
          name: "Racing",
          id: 10
        },
        {
          name: "Real Time Strategy (RTS)",
          id: 11
        },
        {
          name: "Role-playing (RPG)",
          id: 12
        },
        {
          name: "Simulator",
          id: 13
        },
        {
          name: "Sport",
          id: 14
        },
        {
          name: "Strategy",
          id: 15
        },
        {
          name: "Turn-based strategy (TBS)",
          id: 16
        },
        {
          name: "Tactical",
          id: 24
        },
        {
          name: "Hack and slash/Beat 'em up",
          id: 25
        },
        {
          name: "Quiz/Trivia",
          id: 26
        },
        {
          name: "Pinball",
          id: 30
        },
        {
          name: "Adventure",
          id: 31
        },
        {
          name: "Indie",
          id: 32
        },
        {
          name: "Arcade",
          id: 33
        }
      ]
    };
  },
  methods: {
    chosenGenre(e) {
      this.$store.commit("setChosenGenre", [
        e.target.dataset.id,
        e.target.textContent
      ]);
    }
  }
};
</script>

<style scoped>
#genres {
  text-align: center;
}
h2 {
  font-size: 26px;
  margin: 20px 0;
}
a {
  cursor: pointer;
  display: block;
  color: #333;
  font-size: 18px;
  margin: 15px 0;
}
</style>