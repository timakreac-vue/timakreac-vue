<template>
  <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave">
    <slot />
  </transition>
</template>

<script>
export default {
  props: {
    duration: Number
  },
  data: () => ({
    show: false
  }),
  methods: {
    beforeEnter: function(el) {
      el.style.opacity = 0;
    },
    enter: function(el, done) {
      Velocity(el, { opacity: 1 }, { duration: this.duration, complete: done });
    },
    leave: function(el, done) {
      Velocity(el, { opacity: 0 }, { complete: done, duration: this.duration });
    }
  }
};
</script>