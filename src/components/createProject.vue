<template>
  <section class="newProject">
    <el-container>
      <el-header>
        <h2 style="font-size:20px;font-weight:700">新建项目</h2>
        <i class="el-icon-circle-close closeBtn" @click="$parent.newProject = false"></i>
      </el-header>
      <el-main>
        <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" ref="projectForm">
          <el-form-item
            prop="name"
            label="项目名称"
            :rules="{required: true, message: '项目名称不能为空',trigger: 'blur'}"
          >
            <el-input v-model="formLabelAlign.name" placeholder="请输入项目名称"></el-input>
          </el-form-item>
          <el-form-item label="项目描述" prop="description" :rules="{required: true, message: '项目描述不能为空',trigger: 'blur'}">
            <el-input v-model="formLabelAlign.description" placeholder="请输入项目描述"></el-input>
          </el-form-item>
          <el-form-item label="标签">
            <el-select
              style="width:100%;"
              v-model="formLabelAlign.tag_id"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择标签"
            >
              <el-option v-for="item in options" :key="item.id" :label="item.tag_name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-main>
      <el-footer>
        <el-button type="primary" style="font-size:20px" @click="submitBtn">
          创建项目
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </el-footer>
    </el-container>
  </section>
</template>
<script>
export default {
  name: "newProject",
  data() {
    return {
      labelPosition:"right",
      formLabelAlign:{
        name:"",
        description:"",
        tag_id:[]
      },
      options:[]
    };
  },
  created(){
    this.fetchTags();
  },
  methods: {
    fetchTags(){
       let url = "project/getTagList";
       this.$request.get(url).then(res =>{
           if(res.data.code === 200){
               this.options = res.data.data;
           }
       })
    },
    submitBtn() {
      // console.log(this.formLabelAlign.tag_id);
      let url = "project/createProject";
       this.$refs['projectForm'].validate((valid) => {
          if (valid) {
                this.$request.post(url,this.formLabelAlign).then(res => {
                    if(res.data.code === 200){
                        this.$message({
                            message: '创建项目成功!',
                            center: true,
                            type:'success'
                        });
                this.$parent.newProject = false;
                }
            });    
          } else {
            return;
          }
        }); 
      }
  }
};
</script>
<style lang="scss" scoped>
.newProject {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
  padding: 100px 100px;
}
.el-header {
  height: 80px !important;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  background: #f5f5f6;
}

.newProject .el-container {
  width: 100%;
  height: 100%;
  background: #ffffff;
}

.el-container .closeBtn {
  font-size: 25px;
  transition: all 1.5s linear;
  cursor: pointer;
}

.el-container .closeBtn:hover {
  color: red;
  font-weight: bold;
  transform: rotate(360deg);
}
</style>
