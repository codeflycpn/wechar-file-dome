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
        wx.removeSavedFile({
          filePath:res.fileList[0].filePath
        })
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
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
