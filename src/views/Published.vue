<template>
  <div>
    <template>
      <el-table :data="NewtableData" style="width: 100%">
        <el-table-column align="center" label="标题" prop="NAME" width="400"></el-table-column>
        <el-table-column align="center" label="作者" prop="GOODS_SERIAL_NUMBER" width="200"></el-table-column>
        <el-table-column align="center" label="类目" prop="ORI_PRICE" width="120"></el-table-column>
        <el-table-column align="center" label="来源" prop="PRESENT_PRICE" width="130"></el-table-column>
        <el-table-column align="center" label="重要性" prop="PRESENT_PRICE" width="160"></el-table-column>
        <el-table-column align="center" label="发布时间" prop="PRESENT_PRICE" width="160"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      NewtableData: []
    };
  },
  props: {},
  components: {},
  methods: {
    //修改方法
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.form = row;
      console.log(index, row);
    },
    handleDelete(indexs, row) {
      this.NewtableData = this.tableData.filter((item, index) => {
        return item !== row;
      });
      this.oldlist = this.oldlist.filter((item, index) => {
        return item !== row;
      });
      this.tableData = this.NewtableData;
      this.NewtableData = this.tableData.filter((item, index) => {
        return index < this.prePages;
      });
      this.$message({
        type: "success",
        message: "删除成功"
      });
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
</style>