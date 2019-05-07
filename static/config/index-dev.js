/**
 * 生产环境
 */
;(function () {
  window.SITE_CONFIG = window.SITE_CONFIG || {};

  window.SITE_CONFIG['serverUrl'] = 'http://127.0.0.1:8082';
  // window.SITE_CONFIG['serverUrl'] = 'http://43.241.229.31:7080/cqcf';
  //window.SITE_CONFIG['serverUrl'] = 'http://192.168.1.131:8082'
  window.SITE_CONFIG['baseScriptUrl'] = window.SITE_CONFIG['serverUrl'] + '/jsscript/getAll';
  window.SITE_CONFIG.resList = {
    icon: window.SITE_CONFIG.cdnUrl + 'static/img/logo.ico',
    css: [
    ],
    js: [
      window.SITE_CONFIG.cdnUrl + 'static/plugins/jquery.min.js',
      window.SITE_CONFIG.cdnUrl + 'static/plugins/me.js',
      window.SITE_CONFIG.baseScriptUrl,
      window.SITE_CONFIG.cdnUrl + 'app.js',
    ]
  };
})();
