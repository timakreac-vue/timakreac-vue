<template>
  <div>
    <h1>Page not found</h1>
    <h4>
      Start from
      <router-link to="/genres">genres</router-link>
    </h4>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
* {
  text-align: center;
}
h1 {
  font-size: 40px;
  margin-top: 40vh;
}
h4 {
  font-size: 20px;
  margin-top: 20px;
}
a {
  color: #333;
  padding-bottom: 2px;
  border-bottom: 2px solid #333;
}
</style>