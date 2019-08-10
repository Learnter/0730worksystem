<template>
   <el-dialog title="添加会员" :visible.sync="show" center :close-on-click-modal="false" :show-close="false" width="30%">
    <el-form :model="member" label-width="80px" ref="pwdValidate"> 
        <el-form-item prop="account" label="会员账号" :rules="{required: true, message:'账号不能为空',trigger:'blur'}" >
            <el-input v-model="member.account" autocomplete="off" placeholder="请输入会员账号"></el-input>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
        <el-button @click="$parent.isMemberShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmPwd">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    name:"member",
    data(){
        return{
          member:{
              project_id:'',
              account: ''
          }
        }
    },
    props:{
        show:Boolean
    },
    methods:{
        confirmPwd(){
          this.insertMember();
        },
        insertMember(){ //增加会员
         
          if(!this.$parent.nowProject.id){
              this.$message({
                    message:"请选择具体项目",
                    center: true,
                    type:'warning'
                });
                    return;
           }else{
             this.member.project_id = this.$parent.nowProject.id; //获取父级当前的项目id;
           }
           
          let url = "project/addUserJoinProject";
          this.$request.post(url,this.member).then( res => {
              if(res.data.code === 200){
                   this.$message({
                            message: '会员添加成功!',
                            center: true,
                            type:'success'
                    });
                }else{
                     this.$message({
                            message:res.data.msg,
                            center: true,
                    });
                }
           })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>