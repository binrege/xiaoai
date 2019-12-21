<template>
  <div class="order">
    <template>
      <el-table height="435px" :data="datas" style="width: 100%">
        <el-table-column align="center" prop="num" label="Order_No" width="320"></el-table-column>
        <el-table-column align="center" prop="price" label="Price" width="130"></el-table-column>
        <el-table-column align="center" prop="status" label="Status" width="100" :filters="[{ text: '0', value: 'pending' }, { text: '1', value: 'success' }]" :filter-method="filterTag" filter-placement="bottom-end">
         <template slot-scope="scope">
        <el-tag
          :type="scope.row.status === 0 ? 'primary' : 'success'"
          disable-transitions>{{scope.row.status === 0 ? 'pending' : 'success'}}</el-tag>
      </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      datas: []
    };
  },
  props: {},
  components: {},
  methods: {
    getdata() {
      this.$axios
        .req("orderData")
        .then(res => {
          this.datas = res.data;
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    filterTag(value, row) {
        return row.status === value;
      }
  },
  mounted() {
    this.getdata();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.order{
  margin-top: 20px;
  margin-left: 4px;
}
</style>