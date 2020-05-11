<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>site: {{ site }}</h1>
    <h1>url: {{ url }}</h1>
    <h1>details: {{ details() }}</h1>
    <h1>film: {{ film }}</h1>
    <h3 v-for="name in names" :key="name">{{name}}</h3>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'apiping',
  data () {
    return {
      msg: 'hello vue.js and axios with golang Gin',
      site: 'laputa',
      url: 'http://laputa.world',
      film: null,
      names: null
    }
  },

  method: {
    details: function () {
      return this.site
    }
  },

  mounted () {
    axios
      .get('127.0.0.1:9877/ikhnaie/v1/ping')
      .then(response => {
        this.cartoon = response.data.cartoon
        this.names = response.data.names
      }, error => {
        console.log('ping failed: ', error)
      })
  }
}
</script>
