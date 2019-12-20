<template>
  <div class="home">
    <div>
      <el-button @click="resetForm" type="primary">返回</el-button>
    </div>
    <div class="contain">
      <div class="title">{{ArticleData.title}}</div>
      <div class="abstract">摘要:{{ArticleData.abstract}}</div>
      <div class="author">作者:{{ArticleData.author}}</div>
    </div>
    <div class="text">
      <no-ssr>
        <mavon-editor
          v-model="ArticleData.text"
          :subfield="false"
          :boxShadow="true"
          defaultOpen="preview"
          :toolbarsFlag="false"
        />
      </no-ssr>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      ArticleData: {}
    };
  },
  props: {},
  components: {},
  methods: {
    //获取文章数据
    getdata() {
      this.$axios
        .req("article/article", {
          _id: this.$route.query.id
        })
        .then(res => {
          this.ArticleData = res.data;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
     resetForm(){
        this.$router.push("/published")
    },
  },
  mounted() {
    this.getdata();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.home {
  height: 500px;
  // background: white;
}
.contain {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.text{
  // padding:5px;
  height: 600px;
}
.title{
  font-weight: 800;
  
}
.abstract{
  font-size: 14px;
  color:rgb(51, 36, 36);
  margin:20px 0;
}
.author{
  font-size: 12px;
  color: rgb(64, 133, 133);
  margin-bottom: 20px;
}
</style>
