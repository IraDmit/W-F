<template>
  <div class="home">
    <input type="text" v-model='region'>
    <div class="reg" v-for="(r, idx) in cloud" :key="idx">
      {{r}}
    </div>

  </div>
</template>

<script>

export default {
  name: 'HomeView',
  data() {
    return {
      region: null,
      cloud: null,
      key: null
    }
  },
    watch: {
      async region() {
        const {data} = await this.axios.get(`http://api.weatherapi.com/v1/current.json?key=81200ab647f143a39fb154726231905&q=${this.region}`)
        this.cloud = data
      }
    },
  async mounted () {
    this.key = await this.axios.get('http://api.weatherapi.com/v1/search.json?key=81200ab647f143a39fb154726231905&q=Moscow')
    this.key = this.key.data
  },
}
</script>
