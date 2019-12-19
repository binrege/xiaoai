<template>
  <div class="Brok">
    <div><ve-line :data="chartData"></ve-line></div>
    
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
          console.log(res);
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
.Brok{
  margin-top: 20px;
  margin:20px auto;
  margin-left: 5px;
  width: 98%;
  height: 380px;
  background: white;
  box-shadow: 0 4px 9px rgba(0, 0, 0, 0.4);

}
</style>