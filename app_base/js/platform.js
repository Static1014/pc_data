let platform_util = (function () {
  const ua = navigator.userAgent.toLowerCase();

  /**
   * 1、正则表达式斜杆后跟i，表示不区分大小写
   * 2、test和match的区别：test返回boolean，match返回数组
   */

  /**
   * 是否在微信中打开
   */
  function isWeChat() {
    return /micromessenger/.test(ua)
  }

  function isiPad() {
    return /ipad/i.test(ua)
  }

  function isiPhone() {
    return /iphone/i.test(ua)
  }

  function isiPod() {
    return /ipod/i.test(ua)
  }

  function isMac() {
    return /mac/i.test(ua) && !/mobile/i.test(ua)
  }

  function isApple() {
    return isMac() || isiPad() || isiPhone() || isiPod()
  }

  function isWindows() {
    return /windows/i.test(ua)
  }

  function isAndroid() {
    return /android/i.test(ua)
  }

  function isLinux() {
    return /linux/i.test(ua)
  }

  logI('navigator.userAgent: ' + ua)
  return {
    isWeChat,
    isApple,
    isMac,
    isAndroid,
    isLinux,
    isWindows
  }
})()
