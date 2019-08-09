<template>
  <div class="maskLoad">
    <el-container>
      <el-header>
        <h2 style="font-size:20px;font-weight:700">新建问题</h2>
        <i class="el-icon-circle-close closeBtn" @click="$parent.newIssue = false"></i>
      </el-header>
      <el-main ref="mainBox">
        <el-form ref="issueform" :model="form" label-width="80px">
          <el-form-item
            label="项目名称"
            prop="project_id"
            :rules="{required: true, message: '项目不能为空',trigger: 'blur'}"
          >
            <el-select style="width:100%" v-model="form.project_id" placeholder="请选择项目">
              <el-option
                :label="item.project_name"
                :value="item.id"
                v-for="(item,index) in projectList"
                :key="index"
              >
               <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-xiangmu" />
                </svg>
                {{item.project_name}}
              </el-option>
            </el-select>
          </el-form-item>


          <el-form-item
            label="问题标题"
            prop="subject"
            :rules="{required: true, message: '标题不能为空',trigger: 'blur'}">
            <el-input v-model="form.subject" placeholder="请输入问题标题"></el-input>
          </el-form-item>



          <el-form-item
            label="问题类型"
            prop="problemTypes"
            :rules="{required: true, message: '类型不能为空',trigger: 'blur'}">
            <el-select
              style="width:100%"
              v-model="form.problemTypes"
              placeholder="问题创建类型"
            >
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="(item,index) in configInfo.problemType"
                :key="index"
              >
                <svg class="icon" aria-hidden="true" v-if="item.value == 1">
                  <use xlink:href="#icon-gongneng" />
                </svg>
                <svg class="icon" aria-hidden="true" v-if="item.value == 2">
                  <use xlink:href="#icon-bug" />
                </svg>
                <svg class="icon" aria-hidden="true" v-if="item.value == 3">
                  <use xlink:href="#icon-renwu" />
                </svg>
                {{item.label}}
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="紧急程度">
            <el-select style="width:100%" v-model="form.emergency_level" placeholder="问题处理状况">
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="(item,index) in configInfo.emergencyLevel"
                :key="index"
              >
                <svg class="icon" aria-hidden="true" v-if="item.value == 1">
                  <use xlink:href="#icon-wugui" />
                </svg>
                <svg class="icon" aria-hidden="true" v-if="item.value == 2">
                  <use xlink:href="#icon-tuzi" />
                </svg>
                <svg class="icon" aria-hidden="true" v-if="item.value == 3">
                  <use xlink:href="#icon-shizi" />
                </svg>
                {{item.label}}
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="指派人员">
            <el-select style="width:100%" v-model="form.appoint_user_id" placeholder="是否指定人员处理">
              <el-option
                :label="item.username"
                :value="item.id"
                v-for="(item,index) in configInfo.users"
                :key="index"
              >
                <svg class="icon" aria-hidden="true" v-if="item.sex == 1">
                  <use xlink:href="#icon-shuaige" />
                </svg>
                <svg class="icon" aria-hidden="true" v-if="item.sex == 2">
                  <use xlink:href="#icon-meinv" />
                </svg>
                {{item.username}}
              </el-option>
            </el-select>
          </el-form-item>

          <!-- <el-form-item  label="问题描述"  prop="content" :rules="{required: true, message: '问题描述不能为空',trigger: 'blur'}"
          >
            <el-input v-model="form.content" placeholder="请输入问题描述"></el-input>
          </el-form-item> -->
        </el-form>
        <quill-editor v-model="form.content"  ref="myQuillEditor2" :options="editorOption" @change="onEditorChange($event)">
        </quill-editor>

      </el-main>
      <el-footer>
        <el-button type="primary" style="font-size:20px" @click="emitBtn">
          提交问题
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import { quillEditor} from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import quillConfig from "@/common/editor.js";
export default {
  name: "maskLoad",
  data() {
    return {
      editorOption:quillConfig,
      form:{
        project_id: "",
        problemTypes: "",
        content:"",
        appoint_user_id: "",
        subject:"" ,
        emergency_level:"",
        parent_id:""
      },
      configInfo: {},
      projectList: []
    };
  },
  created() {
    this.fetchConfig();
    this.fetchProjectList();
  },
  methods: {
    fetchConfig() {
      //获取配置信息
      let url = "project/config";
      this.$request.get(url).then(res => {
        if (res.data.code === 200 && res.data.data != {}) {
          this.configInfo = res.data.data;
        }
      });
    },
    fetchProjectList() {
      //获取项目列表
      let url = "project/getProjectList";
      this.$request.get(url).then(res => {
        if (res.data.code === 200 && res.data.data != {}) {
          this.projectList = res.data.data;
          // console.log(this.projectList);
        }
      });
    },
    emitBtn(){
       let url = "project/createProblem";
        this.$refs['issueform'].validate((valid) => {
          if (valid) {
            this.$request.post(url,this.form).then( res => {
                  console.log(res);
                   if(res.data.code === 200){
                        this.$message({
                            message: '创建项目成功!',
                            center: true,
                            type:'success'
                        });
                this.$parent.newIssue = false;
                }
            })   
          }else{
            return false;
          }
        }); 
     },
     onEditorChange(e){
       console.log(this.form.content);
     },
  },
  components:{quillEditor}
};
</script>
<style lang="scss" scoped>
.maskLoad {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
  padding: 100px 100px;
}

/deep/.quill-editor{
  .ql-container{
   min-height:300px;
  }
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

.maskLoad .el-container {
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

.el-select-dropdown__item{
  display:flex;
  align-items:center;
}
</style>

