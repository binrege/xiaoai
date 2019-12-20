<template>
  <div>
    <div class="tops">
      <div class="top">
        <div>
          <!-- <input type="button" value="查看" /> -->
        </div>
        <div>
          <!-- <input type="button" value="发布" /> -->
        </div>
      </div>
    </div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      size="medium"
    >
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="文章摘要" prop="abstract">
        <el-input v-model="ruleForm.abstract"></el-input>
      </el-form-item>
      <div class="inputs">
        <el-form-item label="作者" prop="author" style="width:320px;">
          <el-input v-model="ruleForm.author"></el-input>
        </el-form-item>
        <el-form-item label="类目" prop="category">
          <el-select v-model="ruleForm.category" placeholder="请选择类目">
            <el-option label="Vue" value="Vue"></el-option>
            <el-option label="React" value="React"></el-option>
            <el-option label="Node.js" value="Node.js"></el-option>
            <el-option label="性能优化" value="性能优化"></el-option>
            <el-option label="JavaScript" value="JavaScript"></el-option>
            <el-option label="小程序" value="小程序"></el-option>
            <el-option label="工具类" value="工具类"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="来源" prop="source">
          <el-select v-model="ruleForm.source" placeholder="请选择来源">
            <el-option label="原创" value="原创"></el-option>
            <el-option label="转载" value="转载"></el-option>
            <el-option label="与他人合作" value="与他人合作"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="重要性" prop="star">
          <el-select v-model="ruleForm.star" placeholder="请选择重要性">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker
            v-model="value2"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
      </div>
      <!-- 
            @save: 按下 ctrl + s 时触发
            @change: 当值发生改变时 触发
      ishljs代码高亮 codeStyle markdown样式： 默认github, 可选配色方案
      
      -->
      <div class="mavondown">
        <mavon-editor
          :scrollStyle="true"
          @save="saveDoc"
          @change="updateDoc"
          @imgAdd="$imgAdd"
          :ishljs="true"
          codeStyle="code-github"
          ref="editor"
          v-model="value"
        ></mavon-editor>
      </div>

      <el-form-item>
        <div class="btn">
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">发布</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      value: "",
      value2: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      ruleForm: {
        title: "",
        abstract: "",
        author: "",
        category: "",
        source: "",
        star: ""
      },
      rules: {
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
        abstract: [
          { required: true, message: "请输入文章摘要", trigger: "blur" }
        ],
        author: [
          {
            required: true,
            message: "请输入作者",
            trigger: "blur"
          }
        ],
        category: [
          {
            required: true,
            message: "请选择类目",
            trigger: "blur"
          }
        ],
        source: [
          {
            required: true,
            message: "请选择来源",
            trigger: "blur"
          }
        ],
        star: [{ required: true, message: "请选择重要性", trigger: "blur" }],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  props: {},
  components: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(typeof this.$dayjs(this.value2).valueOf());
          // console.log(typeof this.$dayjs(new Date()).valueOf());
          if (
            this.$dayjs(this.value2).valueOf() >
            this.$dayjs(new Date()).valueOf()
          ) {
            this.$message({
              type: "warn",
              message: "请选择不超过当前时间的日期"
            });
          } else {
            if (this.$refs.editor.d_value === "") {
              this.$message({
                type: "warn",
                message: "请输入内容"
              });
            } else {
              console.log(this.ruleForm.source);
              this.$axios
                .req("article/create", {
                  title: this.ruleForm.title,
                  abstract: this.ruleForm.abstract,
                  author: this.ruleForm.author,
                  category: this.ruleForm.category,
                  source: this.ruleForm.source,
                  star: Number(this.ruleForm.star),
                  text: this.$refs.editor.d_value,
                  date: this.$dayjs(this.value2).format("YYYY-MM-DD HH:mm:ss")
                })
                .then(res => {
                  if (res.code === 200) {
                    this.$message({
                      type: "success",
                      message: "发布成功"
                    });
                    this.$router.push("/");
                  } else {
                    this.$message({
                      type: "error",
                      message: "发布失败"
                    });
                  }
                  console.log(res);
                })
                .catch(err => {
                  console.log(err);
                });
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$refs.editor.d_value = "";
      this.$refs.editor.d_value = "";
    },
    updateDoc(markdown, html) {
      // 此时会自动将 markdown 和 html 传递到这个方法中
      // console.log("markdown内容: " + markdown);
      // console.log("html内容:" + markdown);
    },
    saveDoc(markdown, html) {
      // 此时会自动将 markdown 和 html 传递到这个方法中
      // console.log("markdown内容:" + markdown);
      // console.log("html内容:" + html);
    },
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      console.log("触发图片上传");
      console.log(pos);
      console.log($file);
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("file", $file);
      console.log(formdata);
      imgeApi(formdata).then(res => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        console.log(res.data);
        let url = "/server/" + res.data.data;
        this.$refs.md.$img2Url(pos, url); //相应的md格式的文件内容就是它绑定的变量
        //得到相应的html/文件
        console.log(this.$refs.md.d_render);
      });
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.inputs {
  display: flex;
  justify-content: space-between;
}
.mavondown {
  margin: 10px auto;
}
.tops {
  height: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: rgb(68, 243, 161);
  margin-bottom: 20px;
}
.top {
  width: 140px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  input {
    border: none;
  }
}
.btn {
  margin: 20px auto;
  justify-content: space-between;
  display: flex;
  width: 300px;
}
</style>