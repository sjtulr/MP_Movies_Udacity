const CONF = {
  port: '5757',
  rootPathname: '',

  // 微信小程序 App ID
  appId: 'wxc0ea230e9b62a6a9',

  // 微信小程序 App Secret
  appSecret: '34a7aa78c7ad4a0de678ebe3d3213026',

  // 是否使用腾讯云代理登录小程序
  useQcloudLogin: false,
  qcloudAppId: '1256679302',
  qcloudSecretId: 'AKIDfjmx7ESByc6UnvzrnZJ1mbTLFD6vA4Si',
  qcloudSecretKey: 'KTUTHuSwIWbXM6iCXnttkZNA0sgO1Z2S',

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        db: 'cAuth',
        pass: 'wxc0ea230e9b62a6a9',
        char: 'utf8mb4'
    },

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-shanghai',
        // Bucket 名称
        fileBucket: 'audio',
        // 文件夹
        uploadFolder: '',
        // 上传文件类型
        mimetypes: ['audio/x-aac', 'audio/mpeg', 'video/webm', 'audio/mpeg', 'audio/mp3', 'audio/m4a', 'image/png', 'image/gif', 'image/jpeg', 'image/bmp', 'image/jpg']
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    wxMessageToken: 'abcdefgh'
}

module.exports = CONF
