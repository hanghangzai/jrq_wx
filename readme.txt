发布生产环境步骤
a.修改 config\prod.env.js 'WebDomain' 为 '"/hqapp"' ,  'assetsPublicPath' 为 "'./hqapp'"
c.修改 static/config/index-prod.js window.SITE_CONFIG['domain']  = '/hqapp'; // 域名
d.修改 static/config/index-prod.js window.SITE_CONFIG['version'] = '/180506';
 // 版本号(年月日时分)来源于系统发布后dist目录生成的版本文件夹
e.修改X:...\Server\infrastructures\src\main\resources\static\editor-app\app-cfg.js contextRoot' : '/hq/service'
