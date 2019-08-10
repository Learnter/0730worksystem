<template>
  <section class="workPage">
    <header class="pageTop">
      <div class="top_left">
        <img src="@/assets/gdlb_1.png" alt />
      </div>
      <div class="top_right flex_horizontal">
        <i class="el-icon-bell"></i>
        <i class="el-icon-question"></i>
        <el-avatar :src="userInfo.avatar" :size="35"></el-avatar>
         <el-dropdown  placement="bottom" >
            <span class="el-dropdown-link username">
             {{userInfo.username}}<i class="el-icon-arrow-down el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item  @click.native="dialogFormVisible = true">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-mima"/>
                </svg>
                修改密码
              </el-dropdown-item>
              <el-dropdown-item  @click.native="exit">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-tuichu"/>
                </svg>
                退出
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </div>
    </header>
    <el-container>
      <el-header>
          <i class="el-icon-s-flag"></i>
          <div class="refreshBtn"  @click="refreshBtn" :class="rotate?'refreshRotate':''">
            <img src="@/assets/gdlb_8.png" alt="">
          </div>
          <el-dropdown  placement="bottom" trigger="click" >
            <span class="el-dropdown-link">
             项目功能<i class="el-icon-arrow-down el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="newIssue = true">
                 <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-tubiao-"/>
                </svg>
                新建问题
               </el-dropdown-item>
              <el-dropdown-item @click.native="insertMember">
                 <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-wsmp-payuser"/>
                </svg>
                添加会员
                </el-dropdown-item>
              <el-dropdown-item @click.native="createdNewTags">
                 <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-biaoqian"/>
                </svg>
                创建标签
              </el-dropdown-item>
              <el-dropdown-item @click.native="createdNewProject">
                 <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiangmu" />
                </svg>
                新增项目
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown  size="medium" placement="bottom" trigger="click" @command="item => nowProject = item">
            <span class="el-dropdown-link">
              {{nowProject.project_name || '项目编号'}}
              <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item,index) in projectList " :key="index" :command="item" class="flex_horizontal">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-xiangmu" />
              </svg>
              {{item.project_name}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown placement="bottom" trigger="click" @command="item => projectStatus = item">
            <span class="el-dropdown-link">
              {{projectStatus.label}}
              <i class='el-icon-arrow-down el-icon-caret-bottom'></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item,index) in statuLists" :key="index" :command="item">
                <svg class="icon" aria-hidden="true" v-if="item.value == 0">
                    <use xlink:href="#icon-quanbu" />
                </svg>
                <svg class="icon" aria-hidden="true" v-if="item.value == 1">
                    <use xlink:href="#icon-xinjian" />
                </svg>
                  <svg class="icon" aria-hidden="true" v-if="item.value == 2">
                    <use xlink:href="#icon-chulizhong" />
                </svg>
                  <svg class="icon" aria-hidden="true" v-if="item.value == 3">
                    <use xlink:href="#icon-yijiejue" />
                </svg>
                  <svg class="icon" aria-hidden="true" v-if="item.value == 4">
                    <use xlink:href="#icon-daifankuide" />
                </svg>
                  <svg class="icon" aria-hidden="true" v-if="item.value == 5">
                    <use xlink:href="#icon-yiguanbi" />
                </svg>
                <svg class="icon" aria-hidden="true" v-if="item.value == 6">
                    <use xlink:href="#icon-zhongxin" />
                </svg>
                {{item.label}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-input size="mini" placeholder="请输入标题并按下回车键" v-model="searchVal" @keyup.enter.native="searchProject" prefix-icon="el-icon-search"></el-input>
        <!-- </div> -->
      </el-header>
      <el-main style="display:flex;">
        <div class="main_aside">
          <ul  v-infinite-scroll="fetchIssueList" infinite-scroll-disabled="disabled">    
            <li class="aside_item" :class="activeIssues == index ? 'activeIssues' : ''" v-for="(item,index) in issuesList" :key="index" @click ="switchIssuesList(item,index)">
              <el-badge is-dot></el-badge>
              <div class="aside_itme_right flex1">
                <div class="aside_item_right_top flex_horizontal">
                  <h3>
                    <span class="title">{{item.subject}}</span>
                  </h3>
                  <p v-if="item.edit_time">
                    更新时间&nbsp;:&nbsp;
                    <span>{{item.edit_time}}</span>
                  </p>
                </div>
                <div class="aside_item_right_footer flex_horizontal">
                  <el-tag size="mini" color="#FF9B49">{{item.number}}</el-tag>
                  <el-tag size="mini" color="#85CE61">{{item.status.label}}</el-tag>
                  <el-button type="text" icon="el-icon-user">{{item.creater_username}}</el-button>
                  <el-button type="text" icon="el-icon-view">{{item.appoint_user_info.username}}</el-button>
                  <el-button type="text" icon="el-icon-warning-outline">{{item.emergency_level.label}}</el-button>
                </div>
              </div>
            </li>
          </ul>  
           <p v-if="loading">加载中...</p>
           <p v-if="noMore">-- END --</p>
        </div>

        <div class="main_right" v-if="issuesList.length != 0">
          <div class="main_right_title" >
            <h3>
              <i class="el-icon-arrow-right"></i>
              <span style="margin-right:10px">#{{nowIssuesDetail.number}}</span>{{nowIssuesDetail.subject}}
            </h3>
            <p>
              <span>{{nowIssuesDetail.creater_username}}</span>
              <span>创建于{{nowIssuesDetail.add_time}}
                <span v-if="nowIssuesDetail.update_user_username">,{{nowIssuesDetail.update_user_username}}更新于{{nowIssuesDetail.edit_time}}</span>
              </span>
            </p>
            <div class="main_right_status flex_horizontal">
              <div class="main_right_status_item"  v-if="modulStatus">
                <span>状态&nbsp;:&nbsp;</span>
                <el-dropdown placement="bottom" trigger="click" @command="updateStatus">
                  <span class="el-dropdown-link">
                       <svg class="icon" aria-hidden="true" v-if="modulStatus.value == 1">
                            <use xlink:href="#icon-xinjian" />
                        </svg>
                         <svg class="icon" aria-hidden="true" v-if="modulStatus.value == 2">
                            <use xlink:href="#icon-chulizhong" />
                        </svg>
                         <svg class="icon" aria-hidden="true" v-if="modulStatus.value == 3">
                            <use xlink:href="#icon-yijiejue" />
                        </svg>
                         <svg class="icon" aria-hidden="true" v-if="modulStatus.value == 4">
                            <use xlink:href="#icon-daifankuide" />
                        </svg>
                         <svg class="icon" aria-hidden="true" v-if="modulStatus.value == 5">
                            <use xlink:href="#icon-yiguanbi" />
                        </svg>
                         <svg class="icon" aria-hidden="true" v-if="modulStatus.value == 6">
                            <use xlink:href="#icon-zhongxin" />
                        </svg>
                    {{modulStatus.label}}
                    <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-for="(item,index) in configInfo.status"
                      :key="index"
                      :command="item"
                      class="flex_horizontal"
                    >
                       <svg class="icon" aria-hidden="true" v-if="item.value == 1">
                            <use xlink:href="#icon-xinjian" />
                        </svg>
                         <svg class="icon" aria-hidden="true" v-if="item.value == 2">
                            <use xlink:href="#icon-chulizhong" />
                        </svg>
                         <svg class="icon" aria-hidden="true" v-if="item.value == 3">
                            <use xlink:href="#icon-yijiejue" />
                        </svg>
                         <svg class="icon" aria-hidden="true" v-if="item.value == 4">
                            <use xlink:href="#icon-daifankuide" />
                        </svg>
                         <svg class="icon" aria-hidden="true" v-if="item.value == 5">
                            <use xlink:href="#icon-yiguanbi" />
                        </svg>
                         <svg class="icon" aria-hidden="true" v-if="item.value == 6">
                            <use xlink:href="#icon-zhongxin" />
                        </svg>
                      {{item.label}}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div class="main_right_status_item"  v-if="prioritys">
                <span>优先级&nbsp;:&nbsp;</span>
                <el-dropdown placement="bottom" trigger="click" @command="updatePrioritys">
                  <span class="el-dropdown-link">
                        <svg class="icon" aria-hidden="true" v-if="prioritys.value == 1">
                            <use xlink:href="#icon-wugui" />
                        </svg>
                        <svg class="icon" aria-hidden="true" v-if="prioritys.value == 2">
                          <use xlink:href="#icon-yiban" />
                        </svg>
                        <svg class="icon" aria-hidden="true" v-if="prioritys.value == 3">
                          <use xlink:href="#icon-jinji" />
                        </svg>
                        {{prioritys.label}}
                        <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-for="(item,index) in configInfo.emergencyLevel"
                      :key="index"
                      :command="item"
                      class="flex_horizontal"
                      >
                      <svg class="icon" aria-hidden="true" v-if="item.value == 1">
                        <use xlink:href="#icon-wugui"/>
                      </svg>
                      <svg class="icon" aria-hidden="true" v-if="item.value == 2">
                        <use xlink:href="#icon-yiban"/>
                      </svg>
                      <svg class="icon" aria-hidden="true" v-if="item.value == 3">
                        <use xlink:href="#icon-jinji"/>
                      </svg> 
                      {{item.label}}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </div>
          <div>
            <div class="main_direction">
              <div class="main_right_status_item"  v-if="appoints">
                <span class="flex_horizontal">
                  <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-zhipai"/>
                  </svg> 指派&nbsp;:&nbsp;
                </span>
                <el-dropdown placement="bottom" trigger="click" @command="updateAppoints">
                  <span class="el-dropdown-link">
                      <svg class="icon" aria-hidden="true" v-if="appoints.sex == 1">
                        <use xlink:href="#icon-shuaige"/>
                      </svg>
                      <svg class="icon" aria-hidden="true" v-if="appoints.sex == 2">
                        <use xlink:href="#icon-meinv"/>
                      </svg>
                    {{appoints.username}}
                    <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      class="flex_horizontal"
                      v-for="(item,index) in configInfo.users"
                      :key="index"
                      :command="item"
                    >
                      <svg class="icon" aria-hidden="true" v-if="item.sex == 1">
                        <use xlink:href="#icon-shuaige" />
                      </svg>
                      <svg class="icon" aria-hidden="true" v-if="item.sex == 2">
                        <use xlink:href="#icon-meinv" />
                      </svg>
                      {{item.username}}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div class="main_right_status_item" v-if="updateType">
                <span>
                  <i class="el-icon-document" style="margin-right:5px"></i>类型&nbsp;:&nbsp;
                </span>
                <el-dropdown
                  placement="bottom"
                  trigger="click"
                  @command="updateDetailType"
                >
                  <span class="el-dropdown-link" >
                      <svg class="icon" aria-hidden="true" v-if="updateType.value == 1">
                        <use xlink:href="#icon-gongneng" />
                      </svg>
                      <svg class="icon" aria-hidden="true" v-if="updateType.value == 2">
                        <use xlink:href="#icon-bug" />
                      </svg>
                      <svg class="icon" aria-hidden="true" v-if="updateType.value == 3">
                        <use xlink:href="#icon-renwu" />
                      </svg>
                    {{updateType.label}}
                    <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      class="flex_horizontal"
                      v-for="(item,index) in configInfo.problemType"
                      :key="index"
                      :command="item"
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
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>

            <div class="editorText">
                <quill-editor
                  v-model="nowIssuesDetail.content" 
                  ref="myQuillEditor" 
                  :options="editorOption">
                </quill-editor>
            </div>
            <div class="submitBtn flex_horizontal">
                <el-button type="success" icon="el-icon-check" @click="updateDetailContent"></el-button>
                <el-button type="info" icon="el-icon-close"></el-button>
            </div>
            <div class="recordBox">
              <div style="margin-bottom: 15px;">
              </div>
              <div class="recordsList">
                <el-steps space="50px" direction="vertical" :active="0"  process-status="finish">
                  <el-step :title="item.username+'---'+item.content" :description="item.add_time" v-for="(item,index) in nowIssuesRecords" :key="index" icon="el-icon-success" ></el-step>
                </el-steps>
              </div>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
    <transition name="slide-fade" mode="in-out">
      <mask-load v-if="newIssue"></mask-load>
      <new-project v-if="newProject"></new-project>
    </transition>


     <el-dialog title="更改密码" :visible.sync="dialogFormVisible" center>
          <el-form :model="updatePassword" label-width="80px" :rules="passForm" ref="pwdValidate">
            <el-form-item label="原密码" prop="old_password">
              <el-input v-model="updatePassword.old_password" autocomplete="off" placeholder="请输入原密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码"  prop="new_password">
              <el-input v-model="updatePassword.new_password" autocomplete="off"  placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码"  prop="confirm_password">
              <el-input type="password" v-model="updatePassword.confirm_password" autocomplete="off" placeholder="请再次输入新密码"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmPwd">确 定</el-button>
          </div>
     </el-dialog>
     <create-tags :show="isTagsShow"></create-tags>
     <add-members :show="isMemberShow"></add-members>
  </section>
</template>
<script>
import MaskLoad from "@/components/maskLoad";
import NewProject from "@/components/createProject";
import createTags from "@/components/createTags";
import addMembers from "../components/addMembers";
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import quillConfig from "@/common/editor.js"; //富文本编译器上传文件
export default {
  name:"workPage",
  data(){
        var validateOld = (rule,value,callback) => {
            if(!value || value === ''){
               callback(new Error('请输入原密码'))
            }else if(value.toString().length < 6 || value.toString().length > 18){
               callback(new Error('原密码长度有误-请重新输入'));
            }else{
              callback();
            }
        }
        var validatePass = (rule, value, callback) => {
            if (!value) {
              callback(new Error('请输入新密码'));
            } else if (value.toString().length < 6 || value.toString().length > 18) {
              callback(new Error('密码长度为6 - 18个字符'))
            } else {
              callback();
            }
          };
				 var validatePass2 = (rule, value, callback) => {
	              if (value === '') {
	                callback(new Error('请再次输入密码'));
	                } else if (value !== this.updatePassword.new_password) {
                    console.log(value,this.updatePassword.new_password);
	                callback(new Error('两次输入密码不一致!'));
	                } else {
	                callback();
	                }
	            };
    return {
      loading:false,
      noMore:false,
      isTagsShow:false,
      isMemberShow:false,
      rotate:false,
      editorOption:quillConfig,
      searchVal: "",
      activeIssues:0, //激活的问题
      textarea1: "", //发布绑定
      newIssue: false, //創建新問題
      newProject: false, //創建新項目
      nowProject: {}, //当前项目
      projectStatus:{}, //当前项目状态
      userInfo: {},
      configInfo: {},
      projectList: [],//项目列表
      issuesList: [],//问题列表
      nowIssuesDetail:{},//当前问题详细信息
      nowIssuesRecords:[],//当前问题修改记录
      issuesConfig:{
        project_id:"",
        page: 1,
        row: 10,
        status: ""
      },
      dialogFormVisible:false,
      updatePassword:{ //修改密码
        old_password:'',
        new_password:'',
        confirm_password:''
      },
      passForm:{
          old_password:[
            { required: true, validator: validateOld, trigger: 'blur' }
          ],
          new_password:[
              { required: true, validator: validatePass, trigger: 'blur' }
          ],
          confirm_password:[
              { required: true, validator: validatePass2, trigger: 'blur' }
          ]
      }
    };
  },
  created() {
    this.fetchUserInfo();
    this.fetchConfig();
    this.fetchProjectList();
  },
  computed:{
     disabled(){
        return this.loading || this.noMore
      },
    modulStatus(){ //当前模块处理状态
      if(this.nowIssuesDetail != {}){
         return this.nowIssuesDetail.status;
      }
      return;
    },
    prioritys(){ //当前模块紧急状态
      if(this.nowIssuesDetail != {}){
        return this.nowIssuesDetail.emergency_level;
      }
       return;
    },
    appoints(){ //当前模块指派人
      if(this.nowIssuesDetail != {}){
        return this.nowIssuesDetail.appoint_user_info;
      }
      return;
    },
    updateType(){ //当前模块类型  
      if(this.nowIssuesDetail != {}){
        return this.nowIssuesDetail.problem_type;
      }
      return;
    },
    statuLists(){ //项目状态列表
      if(this.configInfo && this.configInfo.status){
        let all = {label:'全部',value:0};
        let statusList = this.configInfo.status.slice(0);
        statusList.unshift(all);
        this.projectStatus = statusList[0];
        return statusList;
      }     
    }
  },
  methods: {
    fetchUserInfo() {
      //用户信息
      let url = "users/getUserInfo";
      this.$request.get(url).then(res => {
        if (res.data.code === 200 && res.data.data != {}) {
          this.userInfo = res.data.data;
          // console.log(this.userInfo);
        }
      });
    },
    fetchConfig() { //获取配置信息
      let url = "project/config";
      this.$request.get(url).then(res => {
        if (res.data.code === 200 && res.data.data != {}) {
          this.configInfo = res.data.data;
        }
      });
    },
   fetchProjectList() { //获取项目列表
      let url = "project/getProjectList";
      this.$request.get(url).then(res => {
        if (res.data.code === 200 && res.data.data) {
          // console.log(res);
          this.projectList = res.data.data
          if(this.projectList.length > 0){
             this.nowProject = this.projectList[0];
            }
          }
       });
    },
    fetchIssueList(){ //获取问题列表
      this.activeIssues = 0; //激活索引初始化
      this.issuesList = []; //问题列表清空
      let url = "project/getProblemList";
      this.issuesConfig.title = this.searchVal;
      this.$request.get(url,this.issuesConfig).then(res => {

        if(res.data.code === 200 && res.data.data.length > 0){

           this.issuesList = res.data.data;
           this.nowIssuesDetail = res.data.data[0]; 
           this.issuesConfig.page++;
           this.loading = false;
        } else {
          this.loading = false;
          this.noMore = true;
        }
      });
    },
    refreshBtn(e) { //页面刷新
      this.rotate = true;
      let refToken = JSON.parse(localStorage.getItem("user")).refresh_token;
      let url = "oauth/token/" + refToken;
      setTimeout(()=>{
       this.$request.get(url).then(res => {
          if (res.data.code === 200){
            this.rotate = false;
            localStorage.setItem("user", JSON.stringify(res.data.data));
            this.fetchUserInfo();
            this.fetchConfig();
            this.fetchProjectList();
          }
        });
      },1000)
    },
    fetchIssueRecords(){ //问题记录列表
      let url = "project/getProblemLogList";
      let data = {
        problem_id:this.nowIssuesDetail.id
      }
      this.$request.get(url,data).then( res => {
          if(res.data.code === 200 && res.data.data.length != 0){
              this.nowIssuesRecords = res.data.data;
          }
      })
    },
    switchIssuesList(obj,index){ //切换问题列表
      this.nowIssuesDetail = obj;
      this.activeIssues = index;
      this.fetchIssueRecords();
    },
    updateStatus(obj){ //更改问题详情状态
      if(this.userInfo.user_type == 4){
           this.$message({
            message:'您没有更改权限',
            type:'warning'
          });
          return;
        }
      this.nowIssuesDetail.status = obj;
      this.updateIssueRecords('status');
    },
    updatePrioritys(obj){ //更改问题详情优先级
        if(this.userInfo.user_type == 4){
              this.$message({
                message:'您没有更改权限',
                type:'warning'
              });
              return;
            }
      this.nowIssuesDetail.emergency_level = obj;
      this.updateIssueRecords('emergency_level');
    },
    updateAppoints(obj){ //更改问题详情指派人
      if(this.userInfo.user_type == 4){
            this.$message({
              message:'您没有更改权限',
              type:'warning'
            });
            return;
       }
      this.nowIssuesDetail.appoint_user_info = obj;
      let url = "project/updateProblem";
      let data = {
        id:this.nowIssuesDetail.id,
        field:'appoint_user_id',
        data:this.nowIssuesDetail.appoint_user_info.id
      }
      this.$request.post(url,data).then( res => {
         if(res.data.code === 200){
           this.fetchIssueRecords();
         }
      })
    },
    updateDetailType(obj){ //更改问题详情类型
      if(this.userInfo.user_type == 4){
            this.$message({
              message:'您没有更改权限',
              type:'warning'
            });
            return;
          }
      this.nowIssuesDetail.problem_type = obj;
      this.updateIssueRecords('problem_type');
    },
    updateDetailContent(){ //更改问题详情内容
      if(this.userInfo.user_type == 4){
            this.$message({
              message:'您没有更改权限',
              type:'warning'
            });
            return;
          }
      let url = "project/updateProblem";
        let data = {
          id:this.nowIssuesDetail.id,
          field:'content',
          data:this.nowIssuesDetail.content
        }
        this.$request.post(url,data).then( res => {
          // console.log(res);
          if(res.data.code === 200){
            this.fetchIssueRecords();
          }
        })
    },
    updateIssueRecords(attr){ //更新问题详情记录
      let url = "project/updateProblem";
      let data = {
        id:this.nowIssuesDetail.id,
        field:attr,
        data:this.nowIssuesDetail[attr].value
      }
      this.$request.post(url,data).then( res => {
         if(res.data.code === 200){
           this.fetchIssueRecords();
         }else{
            this.$message({
              message:res.data.msg,
              type: 'warning'
            });
          }
      })
    },
    confirmPwd(){ //修改密码
       let url = "users/modifyPassword";
       this.$refs['pwdValidate'].validate((valid) => {
            if(valid){
              this.$request.post(url,this.updatePassword).then( (res) => {
                 if(res.data.code === 200){
                     this.$message({
                      message: '修改密码成功',
                      type: 'success'
                    });
                    this.dialogFormVisible = false;
                 }
              })
            }else{
              this.$message.error({
                      message:res.data.msg
                    });
              return false;
            }
        })
     },
     exit(){ //退出登录
     this.$confirm('确认关闭？')
          .then(()=> {
            this.$router.push("/login");
            localStorage.removeItem("user");
          }).catch(()=>{
            return;
          })
     },
     searchProject(){ //项目名称收搜
       this.fetchIssueList();
     },
     createdNewProject(){ //创建新项目
       if(this.userInfo.user_type == 3){
           this.newProject = true;
        }else{
          this.$message({
            message: '您没有创建权限',
            type:'warning'
          });
          return;
        }
     }, 
     createdNewTags(){  //创建新标签
       if(this.userInfo.user_type == 3){
           this.isTagsShow = true;
        }else{
          this.$message({
            message: '您没有创建权限',
            type:'warning'
          });
          return;
        }
     },
     insertMember(){ //增加会员
        if(this.userInfo.user_type == 3){
           this.isMemberShow = true
        }else{
          this.$message({
            message: '您没有添加权限',
            type:'warning'
          });
          return;
        }
     }
  },
  components: { MaskLoad, NewProject, quillEditor, createTags, addMembers },
  watch:{
    'nowProject':function(){ //监听项目切换
      this.issuesConfig.project_id = this.nowProject.id;
      this.issuesConfig.page = 1;
      this.fetchIssueList();
    },
     'projectStatus':function(){ //监听状态切换
      this.issuesConfig.status = this.projectStatus.value;
      this.issuesConfig.page = 1;
      this.fetchIssueList();
    },
    'nowIssuesDetail':function(){ //监听问题列表切换
      this.fetchIssueRecords();
    }
  }
};
</script>
<style  lang="scss" scoped>

.refreshBtn{
  margin-left:50px;
  width:20px;
  height:20px;
  cursor:pointer;
  transition:all 1s linear;
}

.refreshRotate{
   transform: rotate(360deg);
}

/deep/.quill-editor{
  .ql-container{
   min-height:300px;
  }
}

.iconSize {
  font-size: 20px;
}

.workPage {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.el-main {
  position: absolute;
  top: 120px;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 20px;
  overflow: hidden;
}

.el-dropdown {
  font-size: 16px;
  font-weight: 400;
}

.flex1 {
  flex: 1;
}

.pageTop {
  height: 40px;
  padding: 10px 30px;
  background: #337ab7;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top_left {
  width: 150px;
  height: 100%;
}

.top_right {
  width: 250px;
  height: 100%;
  justify-content: flex-end;
}

.el-icon-bell,
.el-icon-question {
  font-size: 30px;
  color: #ffffff;
  margin-right: 15px;
  cursor: pointer;
}

.main_header_right{
  .el-dropdown-link{
    justify-content:center;
  }
}

/deep/ .top_right .el-input,
.el-date-editor.el-input {
  width: 110px;
}

.el-date-editor.el-input {
  margin-left: 15px;
}

/deep/ .top_right .el-input__inner {
  background: transparent;
  border: none;
  outline: none;
  padding-left: 20px;
  font-size: 16px;
  color: #ffffff;
}

.el-input__inner {
  background: transparent;
  border: none;
  outline: none;
  padding: 0 10px;
  font-size: 16px;
}

/deep/ .el-input--suffix .el-input__inner {
  padding-right: 0px;
}

.el-header {
  height: 50px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #f5f5f6;
  .el-dropdown,.el-input{
    width: 250px;
    height:30px;
    line-height: 30px;
    margin-right: 5px;
    border: 1px solid #ececed;
    cursor: pointer;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-left:50px;
  }
}


.main_header_left {
  font-size: 20px;
}


.main_header_left .el-input__inner {
  color: gray;
  padding-left: 40px;
  cursor: pointer;
}

.main_header_left .el-icon-refresh {
  font-size: 20px;
  font-weight: 600;
  padding-left: 10px;
  color: #337ab7;
  cursor: pointer;
}

.username {
  color: #ffffff;
  font-size: 18px;
  margin-left: 15px;
  cursor:pointer;
}

.main_aside {
  width: 450px;
  padding: 15px 0;
  overflow-y: scroll;
}

.aside_item {
  height: 60px;
  padding: 5px;
  display: flex;
  cursor: pointer;
  border-bottom: 1px solid #ececed;
  margin: 0 5px 8px;
  border-radius:5px;
  transition:box-shadow 0.5s linear;
}

.aside_item:hover {
  box-shadow: 0 0 2px gray;
}

/deep/.aside_item .el-badge__content {
  margin-right: 10px;
}

.aside_item_right_top {
  justify-content: space-between;
}

.main_right_title h3,
.el-icon-arrow-right {
  font-weight: 700;
}

.aside_item_right_top {
    h3{
    width:65%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align:left;
    font-size:14px;
    line-height:1.5;
    font-weight:400;
    .title{
        font-size:15px;
        margin-right:10px;
        font-weight:700;   
    }
   }  
   p{
      flex:1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align:left;
      font-size: 14px;
      color: #9c9c9c;
   }
 }

.aside_item_right_footer{
  .el-tag{ 
      color:#ffffff;
      width:70px;
      margin-right:10px;
      overflow:hidden;
      white-space:nowrap;
      text-overflow:ellipsis;
  }
  .el-button{
    width:70px;
    text-align:left;
  }
}


.main_right {
  flex: 1;
  padding-left: 15px;
  padding-top: 15px;
  text-align: left;
  // height:700px;
  overflow-y: scroll;
}

.main_right_title {
  overflow: hidden;
}

.main_right_title p {
  width: 100%;
  padding-top: 15px;
  color: #9c9c9c;
  font-size: 14px;
}

.main_right_status {
  margin-top: 10px;
  justify-content: space-between;
}

.el-dropdown {
  color: #449eeb; 
}
.el-dropdown-menu__item{
    display:flex;
    align-items:center;
  }

.main_right_status_item {
  width: 50%;
  height: 40px;
  font-size: 16px;
  color: #9c9c9c;
  cursor: pointer;
  /* margin-bottom:10px; */
  display: flex;
  align-items: center;
  overflow: hidden;
}

.main_direction {
  // border-bottom: 1px solid #ececed;
  display: flex;
  flex-wrap: wrap;
}

.publicBox {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  padding: 0 10px;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #ffffff;
  border-top: 1px solid #e4e5e7;
}

.submitBtn {
  justify-content: flex-end;
  padding: 10px 0;
}

.el-textarea__inner {
  border: none;
  font-size: 22px;
}

.editorText {
  box-sizing: border-box;
  // padding-right: 5px;
  margin-top:10px;
  overflow: hidden;
}

.recordBox {
  padding: 15px 15px 30px;
  background: #f8f9fb;
}

/deep/.el-step.is-vertical .el-step__main {
  display: flex;
  justify-content: space-between;
  align-content: center;
  .el-step__description {
    padding-right: 0;
    font-size: 16px;
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.activeIssues{
  background:rgb(162, 203, 243);
  .el-button--text{
    color:#ffffff;
  }
  p{
    color:#ffffff;
  }
}
</style>
