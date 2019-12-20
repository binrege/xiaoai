<template>
  <div class="home">
    <template>
      <el-table :data="ArticleData" style="width: 100%">
        <el-table-column align="center" label="编号" type="index"  width="60"></el-table-column>
        <el-table-column align="center" label="标题" prop="title" width="180"></el-table-column>
        <el-table-column align="center" label="作者" prop="author" width="120"></el-table-column>
        <el-table-column align="center" label="类目" prop="category" width="120"></el-table-column>
        <el-table-column align="center" label="来源" prop="source" width="130"></el-table-column>
        <el-table-column align="center" label="重要性" width="230">
          <template slot-scope="scope">
            <el-rate disabled :value="scope.row.star*1"></el-rate>
          </template>
        </el-table-column>
        <el-table-column align="center" label="发布时间" width="160">
          <template slot-scope="scope">{{formatTime(scope.row.date)}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button size="mini" type="primary" @click="checke(scope.$index, scope.row)">查看</el-button>
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
      ArticleData: []
    };
  },
  props: {},
  components: {},
  methods: {
    formatTime(val){
      return  this.$dayjs(val).format("YYYY-MM-DD HH:mm:ss")
    },
    //修改方法
    handleEdit(index, row) {
     this.$router.push({path:"/details",query:{id:row._id}})
      console.log(index, row);
    },
    handleDelete(indexs, row) {
      this.deleteArticle(row._id)
      this.getdata()
      this.$message({
        type: "success",
        message: "删除成功"
      });
    },
    //获取文章数据
    getdata() {
      this.$axios
        .req("article/allArticle")
        .then(res => {
          this.ArticleData = res.data;
          this.ArticleData.reverse()
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除文章
    deleteArticle(id){
     this.$axios
        .req("article/delete",{_id:id})
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //查看文章
    checke(index,row){
        this.$router.push({path:"/check",query:{id:row._id}})
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
.home{
  height: 100vh;
}
</style>