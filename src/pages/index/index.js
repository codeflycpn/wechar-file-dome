// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {

  },
  //点击下载文件
   upload(){
      wx.downloadFile({
        url:'http://192.168.3.6:8030/map.jpg',
        success(res) {
          if (res.statusCode === 200) {
            var path = res.tempFilePath
            console.log('请求下载成功')
            console.log(res);
            wx.saveFile({
              tempFilePath: path,
              success(res){
                console.log('成功');
                const savedFilePath = res.savedFilePath },
              fail(res){ console.log('失败')}
            })

            // wx.saveImageToPhotosAlbum({
            //   filePath:path,
            //   success(res) {
            //     wx.showToast({
            //       title:'保存成功'
            //     })
            //   }
            // })
          }
        }
      })
   },
  // 清空缓存
  clearFile(){
    wx.getSavedFileList({
      success(res) {
        console.log('成功')
        if (res.fileList.length>0){
          wx.removeSavedFile({
            filePath:res.fileList[0].filePath,
            complete(res) {
              console.log(res);
            }
          })
        }
      },
      fail(res) {
        console.log('失败')
      }
    })
  },
  //上传文件
  download(){
    wx.chooseImage({
      success(res) {
        const path = res.tempFilePaths
        console.log(path);
        wx.uploadFile({
          filePath:path[0],
          formData:{
            'user':'test'
          },
          name:'img',
          url:'http://192.168.3.6:8030',
          success(res) {
            console.log('进入成功的回调');
            console.log(res)
          },
          fail(res) {
            console.log('失败了');
          }
        })
      }
    })
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 获取文件缓存列表
  getFileList(){
     wx.getSavedFileList({
       success(res) {
         console.log(res.fileList);
       }
     })
  },
  //获取本地文件的信息
  getSaveListInfo(){
    wx.getSavedFileList({
      success(res) {
        console.log(res)
      }
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
})
