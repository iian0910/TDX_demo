<template>
  <div id="app">
    <h1>TDX 串接</h1>
    <ul>
      <li v-for="bus in data" :key="bus.PlateNumb">{{bus.SubRouteName.Zh_tw}}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { token } from '@/assets/js/common.js'
export default {
  name: 'App',
  components: {},
  data () {
    return {
      data: []
    }
  },
  mounted () {
    this.getApiResponse()
  },
  methods: {
    async getApiResponse () {
      let getDt = []
      let accessTokenStr = await token.getToken()
      const config = {
        method: 'get',
        url: `${process.env.VUE_APP_TDX_URL}v2/Bus/RealTimeByFrequency/Streaming/City/Hsinchu?%24top=30&%24format=JSON`,
        headers: {
          "authorization": "Bearer " + accessTokenStr,                
        },
      };

      await axios(config)
        .then(function (response) {
          console.log('取得 data 成功', response.data);
          getDt = response.data
        })
        .catch(function (error) {
          console.error('getApiResponse 發生錯誤', error);
        });

      this.data = getDt
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  text-align: left;
}
</style>
