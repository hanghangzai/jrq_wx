/**
 * 生产环境
 */
;(function () {
  window.SITE_CONFIG = window.SITE_CONFIG || {};

  //window.SITE_CONFIG['serverUrl'] = 'http://114.116.26.95:8080/cqcf';
  window.SITE_CONFIG['serverUrl'] = 'http://139.9.50.186:8080/cqcf';
  //window.SITE_CONFIG['serverUrl'] = 'http://112.74.43.248:8080/cqcf';
  //window.SITE_CONFIG['serverUrl'] = 'http://122.114.61.217:8888/cqcf';
  //window.SITE_CONFIG['serverUrl'] = 'http://122.114.61.217:8089/cqcf';
  //window.SITE_CONFIG['serverUrl'] = 'http://127.0.0.1:8080/cqcf'
  window.SITE_CONFIG['baseScriptUrl'] = window.SITE_CONFIG['serverUrl'] + '/jsscript/getAll';
  window.SITE_CONFIG.resList = {
    icon: window.SITE_CONFIG.cdnUrl + 'static/img/logo.ico',
    css: [
       window.SITE_CONFIG.cdnUrl + 'static/css/app.css',
    ],
    js: [
      window.SITE_CONFIG.cdnUrl + 'static/plugins/jquery.min.js',
      window.SITE_CONFIG.cdnUrl + 'static/plugins/me.js',
      window.SITE_CONFIG.baseScriptUrl,
      window.SITE_CONFIG.cdnUrl + 'static/js/manifest.js',
      window.SITE_CONFIG.cdnUrl + 'static/js/vendor.js',
      window.SITE_CONFIG.cdnUrl + 'static/js/app.js',
    ]
  };
})();
