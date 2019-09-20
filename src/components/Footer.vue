<template>
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
        <button class="install" @click="onInstall" v-if="canInstall">Install as App</button>
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

<script>
export default {
  data() {
    return {};
  },
  computed: {
    installPrompt() {
      return this.$store.getters.installPrompt;
    },
    canInstall() {
      return this.$store.getters.canInstall;
    }
  },
  methods: {
    onInstall() {
      this.installPrompt.prompt();
    }
  }
};
</script>

<style>
.install {
  width: 160px;
  color: #fff;
  height: 50px;
  border-radius: 10px;
  margin: 20px 0 0 0;
  border: 0;
  background: #0652d9;
}
</style>