<template>
  <div class="ting">
    <div> <ve-pie width="100px" :data="chartData" :settings="chartSettings"></ve-pie></div>
  </div>
</template>

<script>
export default {
  name: "",
  data () {
      this.chartSettings = {
        roseType: 'radius',
      }
      return {
        chartData: {
          columns: ['name', 'data'],
          rows: [
    
          ]
        },
      }
    },
  props: {},
  components: {},
  methods: { getdata() {
      this.$axios
        .req("ringChat")
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
.ting{
  width: 400px!important;
}
</style>