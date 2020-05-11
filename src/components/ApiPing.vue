<template>
  <div class="hello">
    <h1>cartoon: {{ cartoon }}</h1>
    <h3 v-for="name in names" :key="name">{{name}}</h3>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'apiping',
  data () {
    return {
      cartoon: null,
      names: null
    }
  },

  mounted () {
    axios
      .get('http://localhost:9877/ikhnaie/v1/ping')
      .then(response => {
        this.cartoon = response.data.cartoon
        this.names = response.data.names
      }, error => {
        console.log('ping failed: ', error)
      })
  }
}
</script>

<style>
.hello {
  font-weight: normal;
  text-align:center;
  font-size:8pt;
}
h3
{
  text-align:center;
  font-size:20pt;
  color:red;
}
</style>
