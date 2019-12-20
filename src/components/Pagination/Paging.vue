<template>
  <div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="prePages"
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>

export default {
  name: "paging",
  data() {
    return {
      prePages: 10,
      oldlist: [],
      pageSizes: [10, 20, 30, 40],
      currentPage: 1,
    };
  },
  props: {
    list:{
      type:Array,
      default:()=>[]
    }
  },
  components: {},
  methods: {
      handleSizeChange(val) {
      this.prePages = val;
      this.currentPage = 1;
      // console.log(`每页 ${val} 条`);
      this.oldlist = this.list.filter((item, index) => {
        return index < val;
      });
     this.$emit("updates",[this.oldlist,this.prePages])
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      // console.log(`当前页: ${val}`);
      this.oldlist = this.list.filter((item, index) => {
        return (
          index < val * this.prePages && index >= (val - 1) * this.prePages
        );
      });
      this.$emit("updates",[this.oldlist,this.prePages])
    }
  },
  mounted() {
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>