<template>
  <div class="Brok">
    <div><ve-line :color="colors"  :data="chartData" :settings="charSettings"></ve-line></div>
    
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    
    this.colors = ['#c23531','#2f4554', '#61a0a8',
        '#d48265', '#91c7ae','#749f83', 
        '#ca8622', '#bda29a','#6e7074',
        '#546570', '#c4ccd3']
    return {
      chartData:{
        columns: ['date', 'expected', 'actual'],
        rows:[]
      },
       charSettings: {
                    metrics: ['expected', 'actual'],
                    // dimension:['expected','actual']
                },
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