<template>
  <div class="maskLoad">
        <el-container>
            <el-header>
                <h2 style="font-size:20px;font-weight:700">新建问题</h2>
                <i class="el-icon-circle-close closeBtn" @click="$parent.maskActive = false" ></i>
            </el-header>
            <el-main>
                
                <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="项目名称">
    <el-select style="width:100%" v-model="form.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>


  <el-form-item label="问题类型">
    <el-select style="width:100%" v-model="form.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>


  <el-form-item label="问题描述">
    <el-input v-model="form.name" placeholder="请输入问题描述"></el-input>
  </el-form-item>



  <el-form-item label="创建时间">
    <el-col :span="3">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="1">-</el-col>
    <el-col :span="3">
      <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item>


   <el-form-item label="描述">
     <UE :defaultMsg=defaultMsg :config=config :id="ue2" ref="ue"></UE>
  </el-form-item>

</el-form>


            </el-main>
            <el-footer>
                <el-button type="primary" style="font-size:20px">创建<i class="el-icon-upload el-icon--right"></i></el-button>
            </el-footer>
        </el-container>
    </div>
    
</template>
<script>
import UE from "@/components/Ue";
export default {
    name:"maskLoad",
    data(){
        return{
            form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
            },
            defaultMsg: '请编辑您的文本...',
            config: {
            initialFrameWidth:'100%',
            initialFrameHeight:200
            },
           ue2:"ue2"
          }
        },
     components:{
         UE
     }
    }

</script>
<style lang="scss" scoped>

.maskLoad{
   position: fixed;
   left:0;
   top:0;
   right:0;
   bottom:0;
   z-index:999;
   background:rgba(0,0,0,0.5);
   padding:100px 100px;
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

.maskLoad .el-container{
    width:100%;
    height:100%;
    background:#ffffff;
}

.el-container .closeBtn{
    font-size:25px;
    transition:all 1.5s linear;
    cursor: pointer;
}

.el-container .closeBtn:hover{
   color:red;
   font-weight: bold;
   transform:rotate(360deg);

}

</style>

