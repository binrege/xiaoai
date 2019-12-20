<template>
  <div class="uploade">
    <div class="elem">
      <div class="titles">ElementUI的拖拽上传</div>
      <el-upload class="upload-demo" drag action="/api/upload" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
    <div>
      <div class="titles">vue-image-crop-upload支持裁剪</div>
      <button class="btn" @click="toggleShow">上传图片</button>
      <my-upload
        @crop-success="cropSuccess"
        @crop-upload-success="cropUploadSuccess"
        @crop-upload-fail="cropUploadFail"
        v-model="show"
        :width="200"
        :height="200"
        img-format="png"
        :size="size"
        langType="zh"
        :noRotate="false"
        field="file"
        url="/api/upload"
      ></my-upload>
      <img :src="imgDataUrl" />
    </div>
  </div>
</template>

<script>
import "babel-polyfill"; // es6 shim
import myUpload from "vue-image-crop-upload";
export default {
  name: "",
  data() {
    return {
      imgDataUrl: "",
      show: false,
      size: 2.1
    };
  },
  props: {},
  components: {
    myUpload
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------", imgDataUrl, field);
    },
    //上传成功回调
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      this.imgDataUrl = jsonData.files.Avatar1;
      console.log(jsonData);
      console.log("field: " + field);
    },
    //上传失败回调
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log("上传失败状态" + status);
      console.log("field: " + field);
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.uploade {
  padding: 20px;
  height: 100vh;
  background: white;
}
.elem {
  background: white;
  overflow: hidden;
}
.titles {
  padding-left: 20px;
  display: flex;
  align-items: center;
  width: 80%;
  background: #ccc;
  margin-top: 20px;
  margin-bottom: 10px;
  height: 30px;
}
</style>