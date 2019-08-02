<template>
   <section class="workPage">
       <header class="pageTop">
           <div class="top_left">
               <img src="@/assets/gdlb_1.png" alt="">
           </div>
           <div class="top_right flex_horizontal">
              <i class="el-icon-bell"></i>
              <i class="el-icon-question"></i>
              <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="35" ></el-avatar>
              <el-select v-model="value" placeholder="WHO IS" >
                    <el-option v-for="item in options" :key="item.value" :label="item.label"  :value="item.value"> </el-option>
              </el-select>
           </div>
       </header>
        <el-container>
            <el-header height="50">
                <div class="main_header_left flex_horizontal">
                    <i class="el-icon-s-flag"></i>
                    <el-date-picker v-model="selectedYear" type="year" placeholder="选择年份">
                    </el-date-picker>
                    <el-button type="text" icon="el-icon-circle-plus" @click="maskActive = true">新建问题</el-button>
                    <div class="refreshBtn">
                         <i class="el-icon-refresh"></i>
                    </div>
                </div>
                <div class="main_header_right flex_horizontal">
                    <el-dropdown placement="bottom" trigger="click"  @command="changeSerial">
                        <span class="el-dropdown-link">
                            {{projectSerial||'编号'}}<i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command='黄金糕'>黄金糕</el-dropdown-item>
                            <el-dropdown-item command='狮子头'>狮子头</el-dropdown-item>
                            <el-dropdown-item command='螺蛳粉'>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item command='双皮奶'>双皮奶</el-dropdown-item>
                            <el-dropdown-item command='蚵仔煎'>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown  placement="bottom" trigger="click" @command="changeStatus">
                        <span class="el-dropdown-link">
                            <!-- <i :class="projectStatus.icon"></i> -->
                            {{projectStatus.name||'状态'}}
                            <i :class="projectStatus.icon || 'el-icon-arrow-down el-icon-caret-bottom'"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item  command='{"name":"新建","icon":"el-icon-plus"}' ><i class="el-icon-plus" style="color:#45BE95"></i>新建</el-dropdown-item>
                            <el-dropdown-item  command='{"name":"处理中","icon":"el-icon-circle-plus"}' ><i class="el-icon-circle-plus" style="color:#F9B934"></i>处理中</el-dropdown-item>
                            <el-dropdown-item  command='{"name":"已解决","icon":"el-icon-success"}'><i class="el-icon-success" style="color:#5BC0DE"></i>已解决</el-dropdown-item>
                            <el-dropdown-item  command='{"name":"已忽略","icon":"el-icon-setting"}'><i class="el-icon-setting" style="color:#80CB48"></i>已忽略</el-dropdown-item>
                            <el-dropdown-item  command='{"name":"待反馈","icon":"el-icon-chat-dot-round"}'><i class="el-icon-chat-dot-round" style="color:#8B7CC5"></i>待反馈</el-dropdown-item>
                            <el-dropdown-item  command='{"name":"已关闭","icon":"el-icon-circle-close"}'><i class="el-icon-circle-close" style="color:#F1494E"></i>已关闭</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                     <el-input size="mini" placeholder="请输入内容" suffix-icon="el-icon-search" v-model="searchVal">
                    </el-input>
                </div>
            </el-header>
            <el-main style="display:flex;">
                <div class="main_aside">
                    <div class="aside_item" v-for="(item,index) in 12" :key="index">
                        <el-badge is-dot></el-badge>
                        <div class="aside_itme_right flex1">
                            <div class="aside_item_right_top flex_horizontal">
                                <h3><span style="margin-right:15px">#020</span>标题名称</h3>
                                <p>更新于&nbsp;:&nbsp;<span>12分钟前</span></p>
                            </div>
                            <div class="aside_item_right_footer flex_horizontal">
                                <el-tag size="mini" color="#FF9B49">201907030</el-tag>
                                <!-- <el-button type="text" icon="el-icon-plus">新建</el-button> -->
                                <el-tag size="mini" color="#85CE61">已处理</el-tag>
                                <el-button type="text" icon="el-icon-user" disabled>12345678912</el-button>
                                <el-button type="text" icon="el-icon-view" disabled>柳大人</el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main_right">
                    <div class="main_right_title">
                         <h3><i class="el-icon-arrow-right"></i><span style="margin: 0 15px">#020</span>标题名称</h3>
                         <p><span>17818556509</span><span>创建于2019-07-04 14:44，黄椿任更新于20小时前</span></p>
                         <div class="main_right_status flex_horizontal">
                             <div class="main_right_status_item">
                                 <span>状态&nbsp;:&nbsp;</span>
                                 <el-dropdown>
                                    <span class="el-dropdown-link">
                                        新建<i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item ><i class="el-icon-plus" style="color:#45BE95"></i>新建</el-dropdown-item>
                                        <el-dropdown-item ><i class="el-icon-circle-plus" style="color:#F9B934"></i>处理中</el-dropdown-item>
                                        <el-dropdown-item ><i class="el-icon-success" style="color:#5BC0DE"></i>已解决</el-dropdown-item>
                                        <el-dropdown-item ><i class="el-icon-setting" style="color:#80CB48"></i>已忽略</el-dropdown-item>
                                        <el-dropdown-item ><i class="el-icon-chat-dot-round" style="color:#8B7CC5"></i>待反馈</el-dropdown-item>
                                        <el-dropdown-item ><i class="el-icon-circle-close" style="color:#F1494E"></i>已关闭</el-dropdown-item>
                                    </el-dropdown-menu>
                                    </el-dropdown>
                              </div>
                             <div class="main_right_status_item">
                                 <span>优先级&nbsp;:&nbsp;</span>
                                 <el-dropdown>
                                    <span class="el-dropdown-link">
                                        低<i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item ><i class="el-icon-baseball" style="color:#5BC0DE"></i>低</el-dropdown-item>
                                        <el-dropdown-item ><i class="el-icon-soccer" style="color:#F9B934"></i>中</el-dropdown-item>
                                        <el-dropdown-item ><i class="el-icon-basketball" style="color:#F1494E"></i>高</el-dropdown-item>
                                    </el-dropdown-menu>
                                    </el-dropdown>
                             </div>
                         </div>
                    </div>
                    <div>
                        <div class="main_direction">
                            <div class="main_right_status_item">
                                <span><i class="el-icon-view" style="margin-right:5px"></i>指派&nbsp;:&nbsp;</span>
                                <el-dropdown>
                                <span class="el-dropdown-link">
                                    刘大大<i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item ><i class="el-icon-plus" style="color:#45BE95"></i>新建</el-dropdown-item>
                                    <el-dropdown-item ><i class="el-icon-circle-plus" style="color:#F9B934"></i>处理中</el-dropdown-item>
                                    <el-dropdown-item ><i class="el-icon-success" style="color:#5BC0DE"></i>已解决</el-dropdown-item>
                                    <el-dropdown-item ><i class="el-icon-setting" style="color:#80CB48"></i>已忽略</el-dropdown-item>
                                    <el-dropdown-item ><i class="el-icon-chat-dot-round" style="color:#8B7CC5"></i>待反馈</el-dropdown-item>
                                    <el-dropdown-item ><i class="el-icon-circle-close" style="color:#F1494E"></i>已关闭</el-dropdown-item>
                                </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                            <div class="main_right_status_item">
                                <span><i class="el-icon-time" style="margin-right:5px"></i>时间&nbsp;:&nbsp;</span>
                                 <el-date-picker
                                    v-model="dateTime"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                </el-date-picker>
                            </div>
                            <div class="main_right_status_item">
                                <span><i class="el-icon-document" style="margin-right:5px"></i>模板&nbsp;:&nbsp;</span>
                                <el-dropdown>
                                <span class="el-dropdown-link">
                                    未指定<i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item ><i class="el-icon-plus" style="color:#45BE95"></i>新建</el-dropdown-item>
                                    <el-dropdown-item ><i class="el-icon-circle-plus" style="color:#F9B934"></i>处理中</el-dropdown-item>
                                    <el-dropdown-item ><i class="el-icon-success" style="color:#5BC0DE"></i>已解决</el-dropdown-item>
                                    <el-dropdown-item ><i class="el-icon-setting" style="color:#80CB48"></i>已忽略</el-dropdown-item>
                                    <el-dropdown-item ><i class="el-icon-chat-dot-round" style="color:#8B7CC5"></i>待反馈</el-dropdown-item>
                                    <el-dropdown-item ><i class="el-icon-circle-close" style="color:#F1494E"></i>已关闭</el-dropdown-item>
                                </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </div> 
                        <!-- <div  class="main_direction">
                            <div class="main_right_status_item">
                                <span><i class="el-icon-link" style="margin-right:5px"></i>附件&nbsp;:&nbsp;</span>
                                <span style="color:#449EEB;font-size:14px">上传</span>
                            </div>
                            <div class="main_right_status_item">
                                <span><i class="el-icon-link" style="margin-right:5px"></i>子问题&nbsp;:&nbsp;</span>
                                <span style="color:#449EEB;font-size:14px">添加</span>
                            </div>
                        </div> -->
                        <div class="editorText">
                             <UE :defaultMsg=defaultMsg :config=config :id="ue1" ref="ue"></UE>
                             <div class="submitBtn flex_horizontal">
                                <el-button type="success" icon="el-icon-check"></el-button>
                                <el-button type="info" icon="el-icon-close" ></el-button>
                             </div>  
                        </div>
                        <div class="recordBox">
                            <div style="margin-bottom: 15px;">
                                <el-dropdown placement="bottom" class="flex_horizontal" style="justify-content:space-between;">
                                    <div></div>
                                    <el-button type="primary" size="small" style="margin-right:0">
                                        更多消息<i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                                    </el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>黄金糕</el-dropdown-item>
                                        <el-dropdown-item>狮子头</el-dropdown-item>
                                        <el-dropdown-item>螺蛳粉</el-dropdown-item>
                                        <el-dropdown-item>双皮奶</el-dropdown-item>
                                        <el-dropdown-item>蚵仔煎</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                            <div class="recordsList">
                                <el-steps space="50px" direction="vertical">
                                    <el-step title="15899929162 创建问题"  description="2019-08-02 18:00:00" v-for="(item,index) in 10" :key="index">
                                    </el-step>
                                </el-steps> 
                            </div>
                        </div>  
                    </div>
                </div>
            </el-main>
        </el-container>
        <!-- <div class="publicBox flex_horizontal">
            <el-input type="textarea" autosize placeholder="@他人、快速发布" v-model="textarea1" class="flex1"></el-input>
            <div class="submitBtn flex_horizontal">
                <svg class="icon publicIcon"  aria-hidden="true">
                    <use xlink:href="#icon-lianjie1"></use>
                </svg>
                <svg class="icon publicIcon"  aria-hidden="true">
                    <use xlink:href="#icon-charuteshuzifu"></use>
                </svg>
                <svg class="icon publicIcon" aria-hidden="true">
                    <use xlink:href="#icon-smile"></use>
                </svg>
                <el-button size="small" style="font-size:20px">
                    <i class="el-icon-s-promotion"></i>发布
                </el-button>
            </div>
        </div> -->
         <transition name="slide-fade"  mode="in-out">
            <mask-load v-if="maskActive"></mask-load>
         </transition>
   </section>    
</template>
<script>
import UE from "@/components/Ue";
import MaskLoad from "@/components/maskLoad";
export default {
    name:"workPage",
    data(){
        return{
            options: [{
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
                }],
            value: '',
            selectedYear:'',
            searchVal:'',
            dateTime:'',
            defaultMsg: '请编辑您的文本...',
            config: {
            initialFrameWidth:'100%',
            initialFrameHeight: 300
            },
            ue1: "ue1", // 不同编辑器必须不同的id
            textarea1:'',//发布绑定
            maskActive:false, //遮罩层
            projectSerial:"",//项目序号
            projectStatus:{},//项目状态
        }
    },
    methods:{
        changeSerial(ev){ //选择项目
            this.projectSerial = ev;
        },
        changeStatus(ev){ //选择项目状态
            this.projectStatus = JSON.parse(ev);
        }
    },
    components:{UE,MaskLoad}
}
</script>
<style  lang="scss" scoped>

.workPage{
 position:absolute;
 left:0;
 top:0;
 right:0;
 bottom:0;
 overflow: hidden;
}

.el-main{
    position: absolute;
    top:110px;
    left:0;
    right:0;
    bottom:0;
    padding:0 20px;
    
}

.flex_horizontal{ 
   display:flex;
   align-items:center;
}

.el-dropdown{
    font-size:16px;
    font-weight:400;
}

.flex1{
  flex:1;
}

.pageTop{
    height:40px;
    padding:10px 30px;
    background:#337AB7;
    display:flex;
    justify-content:space-between;
    align-items:center;
}

.top_left{
  width:150px;
  height:100%;
}


  .top_right{
    width:250px;
    height:100%;
    }

 /* .top_right{
    display:flex;
    align-items:center;
  } */


 .el-icon-bell,.el-icon-question{
         font-size:30px;
         color:#ffffff;
         margin-right:15px;
         cursor: pointer;
     }

 /deep/ .top_right .el-input,.el-date-editor.el-input{
      width:110px;
  }

  .el-date-editor.el-input{
      margin-left:15px;
  }

 /deep/ .top_right .el-input__inner{
    background:transparent;
    border:none;
    outline:none;
    padding-left:20px;
    font-size:16px;
    color:#ffffff;
  }

  .el-input__inner{
    background:transparent;
    border:none;
    outline:none;
    padding: 0 10px;
    font-size:16px;
  }

 /deep/ .el-input--suffix .el-input__inner{
      padding-right:0px;
  }

 .el-header{
     height:50px;
     padding:10px 20px;
     display:flex;
     justify-content:space-between;
     align-items:center;
     overflow: hidden;
     background:#F5F5F6;
 } 
 
 .main_header_left{
     font-size:20px;
 }
 .main_header_left>.el-button--text{
     font-size:18px;
     margin:auto 15px;
 }
 .main_header_left .el-input__inner{
     color:gray;
     padding-left:40px;
     cursor:pointer;
 }

 .main_header_left .el-icon-refresh{
     font-size:20px;
     font-weight:600;
     padding-left:10px;
     color:#337AB7;
     cursor:pointer;
 }

 .main_header_right{
     height:100%;
 }

 .main_header_right .el-dropdown,.main_header_right .el-input{
     width:300px;
     height:100%;
     line-height:30px;
     margin-right:5px;
     border:1px solid #ECECED;
     cursor: pointer;
 }

 .main_aside{
    width:450px;
    // height:700px;
    overflow-y: scroll;
 }

 .aside_item{
     height:60px;
     padding:5px;
     /* background:#D1EAFF; */
     display:flex;
     cursor:pointer;
     border-bottom:1px solid #ECECED;
     /* transition:transform 1s linear; */
 }

 .aside_item:nth-child(even){
     background:#F7F7F7;
 }

 .aside_item:hover{
     transform: scaleY(1.1);
     background:rgb(236, 242, 248);
     border-radius:2px;
        
 }

 /deep/.aside_item .el-badge__content{
      margin-right:10px;
 }

 .aside_item_right_top{
     justify-content:space-between;
 }

 .aside_item_right_top h3,.main_right_title h3,.el-icon-arrow-right{
     font-weight:700;
 }

 .aside_item_right_top p{
     font-size:14px;
     color:#9C9C9C;
 }

 .aside_item_right_footer .el-tag{
     color:#ffffff;
 }

 .aside_item_right_footer>.el-tag,.el-button{
     margin-right:15px;
 }

 .main_right{
    flex:1;
    padding-left:15px;
    text-align:left;
    // height:700px;
    overflow-y:scroll;
 }

 .main_right_title{
     overflow: hidden;
 }

 .main_right_title p{
    width:100%;
    padding-top:10px;
    color:#9C9C9C;
    font-size:14px;
 }

 .main_right_status{
     margin-top:10px;
     justify-content:space-between;
 }

 .el-dropdown{
     color:#449EEB;
 }

 .main_right_status_item{
     width:50%;
     height:40px;
     font-size:16px;
     color:#9C9C9C;
     cursor: pointer;
     /* margin-bottom:10px; */
     display:flex;
     align-items:center;
     overflow: hidden;
 }

 .main_direction{
     border-bottom:1px solid #ECECED;
     display:flex;
     flex-wrap:wrap; 
 }


 .publicBox{
    position: fixed;
    left:0;
    bottom:0;
    width:100%;
    height:50px;
    padding: 0 10px;
    box-sizing:border-box;
    overflow: hidden;
    background-color: #ffffff;
    border-top: 1px solid #e4e5e7;
 }

 .submitBtn{
    justify-content:flex-end;
    padding:10px 0;
 }

.el-textarea__inner{
    border:none;
    font-size:22px;
}


.editorText{
   box-sizing:border-box;
   padding-right:5px;
}
.publicIcon{
  margin-right:15px;
  cursor:pointer;
}

.recordBox{
  padding:15px 15px 30px;
  background:#F8F9FB;
}

/deep/.el-step.is-vertical .el-step__main{
    display:flex;
    justify-content:space-between;
    align-content:center;
    .el-step__description{
    padding-right:0;
    font-size: 16px;
   }
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}


</style>
