<template>
  <div>
    <div> <ve-radar :data="chartData"></ve-radar></div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
        chartData: {
          columns: ['name','sales', 'marketing', 'techology', 'delelopmer'],
          rows: [

          ]
        }
    };
  },
  props: {},
  components: {},
  methods: { getdata() {
      this.$axios
        .req("radarChat")
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
</style>