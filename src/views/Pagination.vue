// 分页表格
<template>
  <div class="search">
    <input
      type="text"
      @keyup.enter="changeItem(value)"
      v-model="value"
      @input="changeItem(value)"
      placeholder="请输入你要搜索的商品名称"
    />
    <div>
      <template>
        <el-table :data="NewtableData" style="width: 100%">
          <el-table-column align="center" label="名称" prop="NAME" width="400"></el-table-column>
          <el-table-column align="center" label="商品编号" prop="GOODS_SERIAL_NUMBER" width="230"></el-table-column>
          <el-table-column align="center" label="原价" prop="ORI_PRICE" width="120"></el-table-column>
          <el-table-column align="center" label="现价" prop="PRESENT_PRICE" width="180"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <Paging :list="tableData" @updates="updates"></Paging>
    </div>
    <!-- 修改tableData -->
    <el-dialog title="修改商品" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.NAME" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品编号" :label-width="formLabelWidth">
          <el-input v-model="form.GOODS_SERIAL_NUMBER" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="原价" :label-width="formLabelWidth">
          <el-input v-model="form.ORI_PRICE" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="现价" :label-width="formLabelWidth">
          <el-input v-model="form.PRESENT_PRICE" autocomplete="off"></el-input>
        </el-form-item>



       
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="updateShop">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Paging from "../components/Pagination/Paging";
export default {
  name: "",
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
       
      },
      oragin:null,
      formLabelWidth: "120px",
      tableData: [],
      NewtableData: [],
      value: null,
      oldlist: [],
      prePages: 10
    };
  },
  props: {},
  components: {
    Paging
  },
  methods: {
    getdata() {
      this.$axios
        .req("tableData")
        .then(res => {
          this.tableData = res.data;
          this.oldlist = res.data;
          this.NewtableData = this.tableData.filter((item, index) => {
            return index < this.prePages;
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    //取消
    cancel(){
      this.dialogFormVisible = false
        this.NewtableData=JSON.parse(this.oragin)
    },
    //修改方法 
    handleEdit(index, row) {
      this.oragin=JSON.stringify(this.NewtableData)
      this.dialogFormVisible = true;
      this.form=row
    },
    handleDelete(indexs, row) {
      this.NewtableData = this.tableData.filter((item, index) => {
        return item !== row;
      });
      this.oldlist=this.oldlist.filter((item, index) => {
        return item !== row;
      });
      //现将修改后的NewtableData保存在tableData,传给分页组件处理
      this.tableData = this.NewtableData;
      //展示到页面的数据
      this.NewtableData = this.tableData.filter((item, index) => {
        return index < this.prePages;
      });
      this.$message({
              type: "success",
              message: "删除成功"
            });
    },
    //更新分页组件传过来展示到首页的数据
    updates(data) {
      // console.log(data);
      this.NewtableData = data[0];
      this.prePages = data[1];
    },
    changeItem(val) {
      this.NewtableData = this.oldlist.filter((item, index) => {
        console.log(item.toString());
        return JSON.stringify(item).indexOf(val) > -1;
      });
      this.tableData = this.NewtableData;
      this.NewtableData = this.tableData.filter((item, index) => {
        return index < this.prePages;
      });
    },
    updateShop(){
      this.dialogFormVisible = false
       this.$message({
              type: "success",
              message: "修改成功"
            });
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
.search {
  margin-top: 15px;
  padding-left: 10px;
  input {
    width: 250px;
    height: 30px;
    padding: 0 10px;
    border: none;
    margin: 10px 0;
  }
}
</style>