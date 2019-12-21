<template>
  <div class="ting">
    <div>
      <ve-histogram :judge-width="true" width="40 0px" :data="chartData"></ve-histogram>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      chartData:{
        columns: ['date', 'expected', 'actual'],
        rows:[]
      }
    };
  },
  props: {},
  components: {},
  methods: {
    getdata() {
      this.$axios
        .req("homeChat")
        .then(res => {
         this.chartData.rows = res.data;
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getdata()
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.ting {
  background: white;
  width: 400px;
  height: 400px;
}
</style>