<template>
    <section class="login">
        <img src="@/assets/gdlb_25.png" alt="">
        <div class="login_from">
            <el-form style="display:flex" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
                <el-form-item label="手机号" prop="checkPhone">
                    <el-input type="text" v-model="ruleForm.checkPhone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </section>
</template>
<script>
export default {
    name:"login",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else {
          callback();
        }  
      };
      return {
        ruleForm: {
          checkPhone: '',
          checkPass: '',
        },
        rules: {
          checkPhone: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods:{
        submitForm(formName){
          let url = "oauth/token";
          let data = {
            account:this.ruleForm.checkPhone,
            password:this.ruleForm.checkPass
          }
          this.$request.post(url,data).then( (res)=> {
             if(res.data.code === 200 && res.data.data != {}){
              //  console.log(res.data.data);
                let tokens = JSON.stringify(res.data.data);
                localStorage.setItem("user",tokens);
                this.$router.push("/workPage");
             }else{
               this.$message.error({
                      message:res.data.msg
                    });
                }
          })
       }
    }
}
</script>
<style lang="scss" scoped>

 .login{
    position:fixed;
    left:0;
    width:100%;
    top:0;
    bottom:0;
    img{
        width:100%;
        height:100%;
    }
    .login_from{
       position:absolute;
       left:50%;
       top:10px;
       transform:translateX(-50%);
      
       /deep/ .el-form-item__content{
                width:300px;
                text-align:left;
            .el-input__inner{
                background-color:transparent;
                border: 1px solid #BAD0DE;
            }
            .el-button--primary{
                width:110px;
                // background-color:#B8C2C5;
                background-color:#E7EBEC;
                border:none;
                font-size:18px;
                letter-spacing:3px;
                color:#5A7E97;
            }
        }
        
     }
 }

</style>
