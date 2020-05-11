<template>
  <div id="app">
    <img src="./assets/ikhnaie.jpeg">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script>
import ApiPing from './components/ApiPing'
export default {
  name: "ping",
  components: {
    ApiPing
  }
}
</script>

<script>
import Transaction from './components/ApiTransaction'
export default {
  name: 'transaction',
  components: {
    Transaction
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
