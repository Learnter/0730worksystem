
import request from "../axios/https.js"; //引入axios进行请求

// import * as Quill from 'quill'  // 引入编辑器
// import ImageResize from 'quill-image-resize-module'
// Quill.register('modules/imageResize', ImageResize);


/*富文本编辑图片上传配置*/
const uploadConfig = {
	action: 'upload/uploadImage', // 必填参数 图片上传地址
	methods: 'POST', // 必填参数 图片上传方式
	token: '', // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
	name: 'img', // 必填参数 文件的参数名
	size: 1024, // 可选参数   图片大小，单位为Kb, 1M = 1024Kb
	accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon' // 可选 可上传的图片格式
};

// toolbar工具栏的工具选项（默认展示全部）
const toolOptions = [
	['bold', 'italic', 'underline', 'strike'],
	['blockquote', 'code-block'],
	[{
		'header': 1
	}, {
		'header': 2
	}],
	[{
		'list': 'ordered'
	}, {
		'list': 'bullet'
	}],
	[{
		'script': 'sub'
	}, {
		'script': 'super'
	}],
	[{
		'indent': '-1'
	}, {
		'indent': '+1'
	}],
	[{
		'direction': 'rtl'
	}],
	[{
		'size': ['small', false, 'large', 'huge']
	}],
	[{
		'header': [1, 2, 3, 4, 5, 6, false]
	}],
	[{
		'color': []
	}, {
		'background': []
	}],
	[{
		'font': []
	}],
	[{
		'align': []
	}],
	['clean'],
	['link', 'image', 'video']
];
const handlers = {
	image: function image(value) {
		
		// console.log(value);
		var self = this;
		var fileInput = this.container.querySelector('input.ql-image[type=file]');
		if(fileInput === null) {
			fileInput = document.createElement('input');
			fileInput.setAttribute('type', 'file');
			// 设置图片参数名
			if(uploadConfig.name) {
				fileInput.setAttribute('name', uploadConfig.name);
			}
			// 可设置上传图片的格式
			fileInput.setAttribute('accept', uploadConfig.accept);
			fileInput.classList.add('ql-image');
		

			// console.log(fileInput);
			// 监听选择文件
			fileInput.addEventListener("change", function(){

				// 创建formData
				let fileFormData = new FormData();
				fileFormData.append('image',fileInput.files[0]);

				request.post(uploadConfig.action,fileFormData,'multipart/form-data').then( res => {
					 if(res.data.code === 200 && res.data.data.src){
						// console.log(self);
						let imgSrc = res.data.data.src;
						let length = self.quill.getSelection(true).index;
						//这里很重要，你图片上传成功后，img的src需要在这里添加，res.path就是你服务器返回的图片链接。            
						self.quill.insertEmbed(length, 'image', imgSrc);
						self.quill.setSelection(length + 1);
						fileInput.value = ''
					 }
				})
				
				// fileInput.value = '';
				//这里 请求
				// btwApiUtil.post('common.uploadfile.single', {}, function(resp) {
				// 	var path = resp.data.ftpPath;
				// 	var picPath = process.env.FTP_URL + path;
				// 	let length = self.quill.getSelection(true).index;
				// 	//这里很重要，你图片上传成功后，img的src需要在这里添加，res.path就是你服务器返回的图片链接。            
				// 	self.quill.insertEmbed(length, 'image', picPath);
				// 	self.quill.setSelection(length + 1)imgSrc
				// 	fileInput.value = ''
				// }, formData);
				// var xhr = new XMLHttpRequest();
                // xhr.open(uploadConfig.methods, uploadConfig.action, true);
                // // 上传数据成功，会触发
                // xhr.onload = function (e) {
                //     if (xhr.status === 200) {
				// 		var res = JSON.parse(xhr.responseText);
				// 		console.log(res);
                //         let length = self.quill.getSelection(true).index;
                //         //这里很重要，你图片上传成功后，img的src需要在这里添加，res.path就是你服务器返回的图片链接。            
                //         self.quill.insertEmbed(length, 'image', res.path);
                //         self.quill.setSelection(length + 1)
                //     }
                //     fileInput.value = ''
				// };
				// xhr.send(formData)
			},false);
			this.container.appendChild(fileInput);
		}
		fileInput.click();
	}
};

export default {
	placeholder:'请输入问题内容',
	theme: 'snow', // 主题
	modules: {
		toolbar: {
			container: toolOptions, // 工具栏选项
			handlers: handlers // 事件重写
		},
		// imageResize:{
		// 	displayStyles: {
        //         backgroundColor: 'black',
        //         border: '2px solid red',
        //     }
		// }
	}
};