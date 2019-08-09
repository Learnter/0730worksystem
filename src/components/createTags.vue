<template>
   <el-dialog title="创建新标签" :visible.sync="show" center :close-on-click-modal="false" :show-close="false" width="30%">
    <el-form :model="tags" label-width="80px" ref="pwdValidate"> 
        <el-form-item prop="name" label="标签名称" :rules="{required: true, message:'标签名不能为空',trigger:'blur'}" >
            <el-input v-model="tags.name" autocomplete="off" placeholder="请输入标签名"></el-input>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
        <el-button @click="$parent.isTagsShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmPwd">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    name:"tags",
    data(){
        return{
          tags:{
              name:''
          }
        }
    },
    props:{
        show:Boolean
    },
    methods:{
        confirmPwd(){
          this.insertTags();
        },
        insertTags(){ //增加新标签
          let url = "project/createTag";
          this.$request.post(url,this.tags).then( res => {
              if(res.data.code === 200){
                  console.log(res);
                   this.$message({
                            message: '标签创建成功!',
                            center: true,
                            type:'success'
                    });
                }
           })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
