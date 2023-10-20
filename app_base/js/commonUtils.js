/**
 * 获取当前时间
 */
function formatTime(date, dateSplitStr, isOnlyDate) {
  let dateStr = formatDate(date, dateSplitStr)

  if (!dateSplitStr) {
    dateSplitStr = '-';
  }
  if (!date) {
    date = new Date();
  }
  if (isOnlyDate) {
    return dateStr
  } else {
    if (dateSplitStr === '中文') {
      return dateStr + " " + lenNum(date.getHours()) + "时" + lenNum(date.getMinutes()) + "分" + lenNum(date.getSeconds()) + '秒';
    } else {
      return dateStr + " " + lenNum(date.getHours()) + ":" + lenNum(date.getMinutes()) + ":" + lenNum(date.getSeconds());
    }
  }
}

function formatDate(date, dateSplitStr) {
  if (!dateSplitStr) {
    dateSplitStr = '-'
  }
  if (!date) {
    date = new Date();
  }
  if (dateSplitStr === '中文') {
    return date.getFullYear() + '年' + lenNum(date.getMonth() + 1) + '月' + lenNum(date.getDate()) + '日';
  } else {
    return date.getFullYear() + dateSplitStr + lenNum(date.getMonth() + 1) + dateSplitStr + lenNum(date.getDate());
  }
}

function lenNum(number, len = 2) {
  if (!number) {
    return ''
  }
  number = '' + number
  let result = ''
  if (number.length < len) {
    for (let i = 0; i < len - number.length; i++) {
      result += '0'
    }
    result += number
  } else {
    result = number
  }

  return result
}

let myLogView = false

/**
 * 添加日志视图，模拟控制台
 */
function initLogView() {
  myLogView = true
  addFloatBtn(showLogView, '../../app_base/assets/img/menu.png')

  let lv = $('#log_view')
  if (lv.length < 1) {
    lv = $("<div id='log_view'>" +
      "<div class='log-actions'>" +
      "<div id='log_close' class='btn'>隐藏</div>" +
      "<div class='log-title'>模拟控制台</div>" +
      "<div id='log_clear' class='btn bg-red'>清空</div>" +
      "</div>" +
      "<div class='line'></div>" +
      "<div id='log_content'></div>" +
      "</div>")
    $('body').append(lv)
    $('#log_close').on('click', () => {
      lv.hide()
    })
    $('#log_clear').on('click', () => {
      clearLog()
    })
    lv.hide()
  }
}

/**
 * 清空模拟控制台
 */
function clearLog() {
  if (myLogView) {
    $('#log_content').empty();
  }
}

/**
 * 添加日志到模拟控制台
 * @param log 内容
 * @param level 日志等级（e: error， i：info， w：warning，crash：exception）
 */
function addLog(log, level) { 
  if (myLogView) {
    let logItem = $('<div class="log-item ' + level + '"></div>')
    logItem.text(log)
    let c = $('#log_content')
    c.append(logItem)


    let lv = $('#log_view')
    if (lv.is(':visible')) {
      c.scrollTop(c.prop('scrollHeight'))
    }
  }
}

function showLogView() {
  if (myLogView) {
    let lv = $('#log_view')
    if (lv.length > 0) {
      lv.show()
      let c = $('#log_content')
      c.scrollTop(c.prop('scrollHeight'))
    }
  }
}

/**
 * 打印崩溃信息
 */
function logCrash(error) {
  if (log) {
    let tag = "Crash"
    let pre = formatTime() + " : " + tag + "  ===>  "
    addLog(pre, 'crash')
    addLog(error, 'crash')
    console.error(pre)
    console.error(error)
  }
}

/**
 * 打印错误信息
 * @param msg
 * @param tag 标记
 */
function logE(msg, tag) {
  if (log) {
    if (!tag) {
      tag = "";
    }
    let m = formatTime() + " : " + tag + "  ===>  " + JSON.stringify(msg)
    addLog(m, 'e')
    console.error(m)
  }
}

/**
 * 打印正常信息
 * @param msg
 * @param tag 标记
 */
function logI(msg, tag) {
  if (log) {
    if (!tag) {
      tag = "";
    }
    let m = formatTime() + " : " + tag + "  ===>  " + JSON.stringify(msg)
    addLog(m, 'i')
    console.info(m);
  }
}

/**
 * 打印警告信息
 * @param msg
 * @param tag 标记
 */
function logW(msg, tag) {
  if (log) {
    if (!tag) {
      tag = "";
    }
    let m = formatTime() + " : " + tag + "  ===>  " + JSON.stringify(msg)
    addLog(m, 'w')
    console.warn(m);
  }
}

/**
 * 获取url参数
 * @param name 参数名
 * @returns {string|null}
 */
function parseGetParam(name) {
  // 构造一个含有目标参数的正则表达式对象
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  // 匹配目标参数
  let r = window.location.search.substr(1).match(reg);
  if (r != null) {
    let val = decodeURI(r[2]);
    logI("参数" + name + "：" + val);
    return val;
  }
  // 返回参数值
  return null;
}

/**
 * 判断地址是否存在(同步)
 * @return {boolean}
 */
function isExistFile(url) {
  let http;
  if (window.XMLHttpRequest) {
    http = new XMLHttpRequest();
  } else {
    http = new ActiveXObject("Microsoft.XMLHTTP");
  }
  http.open("HEAD", url, false);
  http.send();
  return http.status !== 404;
}

/**
 * 返回上一页 todo 可能存在兼容性问题
 */
function goBack() {
  try {
    window.history.back();
  } catch (e) {
    logCrash(e)
  }
}

/**
 * 刷新页面 todo 可能存在兼容性或者不生效问题
 */
function reloadPage() {
  location.reload()
  // history.go(0)
  // location.reload()
  // location=location
  // location.assign(location)
  // document.execCommand('Refresh')
  // window.navigate(location)
  // location.replace(location)
  // document.URL=location.href
}

/**
 * 添加Float按钮
 * @param callback  按钮点击事件
 * @param imgSrc  按钮图片
 */
function addFloatBtn(callback, imgSrc) {
  if (callback instanceof Function) {
    if (!imgSrc) {
      imgSrc = "../../app_base/assets/img/reload.png"
    }

    let fb = $('#fb');
    if (fb.length < 1) {
      fb = $("<div id='fb'><img src='" + imgSrc + "'></div>")
      $('body').append(fb)
    }
    fb.click(callback)
  }
}

/**
 * 获取屏幕尺寸
 * @returns {{screenWidth: number, screenHeight: number, bodyHeight: number, screenAvailWidth: number, screenAvailHeight: number, bodyWidth: number}}
 */
function getDeviceSize() {
  let size = {
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    screenAvailWidth: window.screen.availWidth,
    screenAvailHeight: window.screen.availHeight,
    bodyWidth: document.body.offsetWidth || document.documentElement.offsetWidth,
    bodyHeight: document.body.offsetHeight || document.documentElement.offsetHeight
  };
  logI("设备尺寸：" + JSON.stringify(size));
  return size;
}

/**
 * 判断是否竖屏
 */
function isPortraitWindow() {
  let size = getDeviceSize();
  let is = size.screenHeight > size.screenWidth;
  logI("当前设备是竖屏：" + is);
  return is;
}

/**
 * 复制到剪切板 todo 存在兼容性问题
 * @param txt 内容
 */
function copyToClipboard(txt) {
  if (txt) {
    let i = document.createElement("input");
    i.setAttribute("readonly", 'readonly');
    i.setAttribute("value", txt);
    i.className = 'invisible';
    document.body.appendChild(i);
    i.setSelectionRange(0, txt.length);
    if (document.execCommand('copy')) {
      document.execCommand('copy');
      logI("复制成功: " + txt);
      toast("复制成功");
    } else {
      toastError("当前设备不支持复制到剪切板");
    }
    document.body.removeChild(i);
  }
}

/**
 * 显示红色Toast
 * @param txt 内容
 */
function toastError(txt) {
  toast(txt, "#de6161", "#FFF", 2000);
}

function toastSuc(txt) {
  toast(txt, "#4ec87c", "#FFF", 1500);
}

/**
 * 显示toast
 * @param txt 内容
 * @param bgColor 背景色
 * @param fontColor 字体颜色
 * @param delayTime 停留时间
 */
function toast(txt, bgColor, fontColor, delayTime) {
  if (txt) {
    // 控制参数，是否从顶部出现
    let isTop = true
    // 控制参数，是否充满宽度，文字居中
    let isWidthFull = true

    let toast = $("#g-toast");
    if (toast.length < 1) {
      toast = $("<span id='g-toast' class='toast-default-span'></span>");
      $("body").append(toast);
    }
    toast.css({
      backgroundColor: bgColor ? bgColor : "#de6161", // 默认红底白字
      color: fontColor ? fontColor : "#FFF"
    });
    toast.css(isWidthFull ? {width: 'calc(100% - 32px)'} : {maxWidth: isPortraitWindow() ? 'calc(100% - 32px)' : "40%"});
    toast.css(isTop ? {top: -100} : {bottom: -100});
    toast.html(txt);

    if (!delayTime) {
      delayTime = 1500;
    }
    let inAnim = isTop ? {top: 16, opacity: 1} : {bottom: "5%", opacity: 1}
    let outAnim = isTop ? {top: -100, opacity: 0} : {bottom: -100, opacity: 0}

    toast.stop().animate(inAnim).delay(delayTime).animate(outAnim);
  }
}

/**
 * 获取元素jq对象实际尺寸
 * @param jqEl
 * @returns {ClientRect | DOMRect}
 */
function getRealRectInJq(jqEl) {
  return jqEl[0].getBoundingClientRect()
}

/**
 * 获取jQuery元素大小和在屏幕上的位置
 * @param jqEl  元素
 * @return {{x: number, width: number, y: number, height: number}}
 */
function getPositionInScreen(jqEl) {
  var rect = getRealRectInJq(jqEl)
  return {
    x: rect.left,
    y: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  }
}

/**
 * 数组求和
 * @param arr
 */
function sum(arr) {
  return eval(arr.join("+"));
}

/**
 * 滚动到指定元素
 * @param jqEl  jQuery元素
 */
function scrollToJqEl(jqEl) {
  $("html, body").animate({
    scrollTop: jqEl.offset().top
  }, 300);
}

/**
 * 停止事件冒泡
 * @param event
 */
function stopActionBubble(event) {
  if (event && event.stopPropagation) {
    event.stopPropagation();
  } else {
    window.event.cancelBubble = true;
  }
}

/**
 * 延迟执行
 * @param time  时间
 * @param callback 回调
 */
function doDelay(time, callback) {
  setTimeout(callback, time)
}

/**
 * 判空
 */
function isEmptyOrNull(str) {
  return str === undefined || str === null || str === 'null' || str.length < 1
}

/**
 * 禁止(非输入项)选中、复制
 */
function disableSelect() {
  let b = $('body')
  b.oncontextmenu = () => false
  b.onselectstart = () => false
  b.oncopy = () => false
}

// 当有多次调用showLoading，也需要多次关闭
// let loadingCount = 0

/**
 * 显示全屏loading
 * @param msg loading文字，最多两行
 * @param time 停留时间，如果不传就一直显示
 * @param callback 显示回调，当showLoading和hideLoading后紧跟confirm或alert，动画会被中断，导致loading透明度异常，如须使用弹框，可在callback中调用或者改用showDialog
 */
function showLoading(msg, time, callback) {
  // loadingCount++

  // $("body").css({
  //   "overflow": "hidden"
  // })
  stopBodyScroll()
  if (isEmptyOrNull(msg)) {
    msg = '数据加载中'
  }

  let pb = $('#g-pb')
  if (pb.length < 1) {
    pb = $("<div id='g-pb'><div class='pb-content'><div id='pb-loading' class='pb-loading'></div><span class='pb-text'>" + msg + "</span></div></div>")
    // pb.on('touchstart', function (e) {
    //   // 禁止底部滑动，将导致所有点击失效
    //   return false
    // })
    $('body').append(pb)
  } else {
    $('.pb-content>.pb-text').text(msg)
  }
  $('#pb-loading').addClass('pb-loading')
  if (pb.css('opacity') !== 1) {
    pb.css('opacity', 1)
  }
  pb.stop().fadeIn(callback);

  if (time && time > 0) {
    doDelay(time, hideLoading)
  }
}

/**
 * 关闭全屏loading
 * @param callback 显示回调，当showLoading和hideLoading后紧跟confirm或alert，动画会被中断，导致loading透明度异常，如须使用弹框，可在callback中调用或者改用showDialog
 */
function hideLoading(callback) {
  // if (loadingCount > 1) {
  //   loadingCount--
  //   return
  // }

  enableBodyScroll()
  // $("body").css({
  //   "overflow": "auto"
  // });
  let pb = $('#g-pb')
  if (pb.length > 0) {
    $('#pb-loading').removeClass('pb-loading')
    pb.stop().fadeOut(callback)
  }
  // loadingCount = 0
}

let curOffsetY, curOffsetX
let isScrollHorizontal


/**
 * 显示弹框
 * @param jqContent JQ元素
 * @param dialogId 如果给dialog指定了id，则不会被后调用的showDialog重写，如果指定id的dialog已经创建过，将会将其显示并重新绘如新的content
 * @param rootId dialog实际依附的视图。比如想在vue对象包裹的视图中弹框(弹框内容还想使用同一个vue对象控制)，可将vue绑定的id或vue绑定视图内的某个id传入;使用方法参见_test/index.html
 * @param clickGroundToClose 是否支持点击透明背景关闭弹框；如果传递的是function，可在关闭时回调
 * @param isScrollHorizontalInPage 如果页面可以横向滚动，请设置为true
 */
function showDialog(jqContent, dialogId, rootId, clickGroundToClose, isScrollHorizontalInPage) {
  let dialog = $("#" + dialogId)
  if (!isEmptyOrNull(dialogId) && dialog.length > 0 && !dialog.hasClass("m-dialog-cover")) {
    toastError('ID已存在(' + id + ')且不是dialog，ID冲突，无法创建dialog，请换一个')
    return undefined
  }

  let idStr = ''
  if (!isEmptyOrNull(dialogId)) {
    idStr = 'id="' + dialogId + '"'
  }

  let rootView = $("#" + rootId)
  let inRoot = rootView && rootView.length > 0

  isScrollHorizontal = isScrollHorizontalInPage
  if (isScrollHorizontal) {
    curOffsetY = $(document).scrollTop()
    curOffsetX = $(document).scrollLeft()

    $("body").css({
      "position": "fixed",
      "overflow": "hidden"
    })
  } else {
    $("body").css({"overflow": "hidden"})
  }

  let dialogs = $(".m-dialog-cover")
  if (dialogs.length < 1) {
    // 没有已存在的dialog弹框，新建一个
    dialog = $("<div " + idStr + " class='m-dialog-cover'><div class='d-content'></div></div>")
    if (inRoot) {
      rootView.append(dialog)
    } else {
      $('body').append(dialog)
    }
  } else {
    // 有已经存在的dialog
    if (dialog.length > 0) {
      // 找到同id的dialog
      // 将dialog移动到最上层
      dialog.remove();
      if (inRoot) {
        rootView.append(dialog)
      } else {
        $('body').append(dialog)
      }
    } else if (dialogs.last().is(':visible') || !isEmptyOrNull(dialogs.last().prop('id'))) {
      // 最后一个正在显示或有指定id，则新建一个
      dialog = $("<div " + idStr + " class='m-dialog-cover'><div class='d-content'></div></div>")
      if (inRoot) {
        rootView.append(dialog)
      } else {
        $('body').append(dialog)
      }
    } else {
      // 最后一个未在显示且没有指定id，直接覆盖最后一个dialog
      dialog = dialogs.last()
    }
  }
  let content = dialog.find('.d-content').first()
  content.empty()
  content.append(jqContent)

  content.on("click", function (event) {
    stopActionBubble(event)
  })
  dialog.on('click', function (event) {
    // 阻止点击事件穿透
    stopActionBubble(event)

    if (clickGroundToClose) {
      hideDialog(clickGroundToClose, dialog)
    }
  })

  setDialogCover();
  dialog.fadeIn()

  return dialog
}

/**
 * 关闭弹框
 * @param callback 关闭弹框的回调事件
 * @param dialogOrId 弹框jq对象，或者弹框时设置的dialogId
 *
 */
function hideDialog(callback, dialogOrId) {

  let dialog
  if (typeof dialogOrId === "string") {
    dialog = $("#" + dialogOrId)
  } else {
    dialog = dialogOrId
  }
  if (!dialog || dialog.length < 1) {
    // 没有指定dialog的情况下，默认隐藏正在显示的最上面一个dialog
    dialog = $(".m-dialog-cover:visible:last");
  }
  if (dialog.length > 0) {
    dialog.eq(0).fadeOut(function () {
      setDialogCover()

      if (isScrollHorizontal) {
        $("body").css({
          "position": "static",
          "overflow": "auto"
        })
        $(document).scrollTop(curOffsetY)
        $(document).scrollLeft(curOffsetX)
      } else {
        $("body").css({
          "overflow": "auto"
        })
      }

      if (isEmptyOrNull(dialog.eq(0).prop('id'))) {
        dialog.eq(0).remove();
      }

      if (callback && typeof callback == 'function') {
        callback()
      }
    })
  }
}

function setDialogCover() {
  // 只显示一个遮罩的阴影，上层遮罩存在，但是透明
  $('.m-dialog-cover:visible').css('background', 'none')
  $('.m-dialog-cover:visible:last').css('background', 'rgba(0, 0, 0, 0.63)')
}

/**
 * 显示消息弹框
 * @param title 标题
 * @param msg 消息
 * @param rightBtn  主按钮
 * @param rightCb   主按钮点击事件
 * @param leftBtn   次按钮
 * @param leftCb    次按钮点击事件
 * @param rightCounting    主按钮可用倒计时（单位s）
 */
function showMsgDialog(title, msg, rightBtn, rightCb, leftBtn, leftCb, rightCounting) {
  let content = $("<div></div>")

  if (title) {
    let eTitle = $("<div class='d-title'>" + title + "</div>");
    content.append(eTitle)
  }

  if (msg) {
    // 消息内容自己滚动
    let eMsg = $("<div class='msg scroll " + (title ? '' : 'dark') + "'>" + msg + "</div>");
    content.append(eMsg)
    eMsg.css('max-height', getDeviceSize().bodyHeight * 0.7 + 'px')
  }

  let cBtn = $("<div class='d-actions'></div>")

  // 左侧按钮
  if (leftBtn) {
    let lBtn = $("<div class='btn text no-padding btn-smallest btn-dialog-left'>" + leftBtn + "</div>");
    cBtn.append(lBtn)
    lBtn.on('click', function () {
      if (leftCb && typeof leftCb == "function") {
        leftCb()
      } else {
        hideDialog()
      }
    })
  }

  // 右侧按钮
  if (rightBtn || !leftBtn) {
    let rBtn = $("<div class='btn text no-padding btn-smallest btn-dialog-right'>" + (rightBtn ? rightBtn : '确定') + "</div>");
    cBtn.append(rBtn)

    // 新增按钮倒计时
    if (rightCounting && typeof rightCounting === 'number' && rightCounting > 0) {
      rBtn.addClass('color-unable')
      rBtn.attr('disabled', true)
      rBtn.text(rightBtn + '(' + rightCounting + 's)')

      let timer = setInterval(function () {
        rightCounting--
        rBtn.text(rightBtn + '(' + rightCounting + 's)')
        if (rightCounting <= 0) {
          rBtn.removeClass('color-unable')
          rBtn.text(rightBtn)
          rBtn.attr('disabled', false)

          rBtn.on('click', function () {
            if (rightCb && typeof rightCb == "function") {
              rightCb()
            } else {
              hideDialog()
            }
          })
          clearInterval(timer)
        }
      }, 1000)
    } else {
      rBtn.on('click', function () {
        if (rightCb && typeof rightCb == "function") {
          rightCb()
        } else {
          hideDialog()
        }
      })
    }
  }

  content.append(cBtn)

  showDialog(content)
}

/**
 * 按钮添加倒计时
 * @param btnJqEl   jquery按钮
 * @param btnText   按钮文字
 * @param counting  倒计时长（秒）
 * @param countListener  倒计时监听
 */
function addCountDownOnBtn(btnJqEl, btnText, counting, countListener) {
  btnJqEl.addClass('unable')
  btnJqEl.text(btnText + '(' + counting + 's)')

  let timer = setInterval(function () {
    counting--
    btnJqEl.text(btnText + '(' + counting + 's)')
    if (counting <= 0) {
      btnJqEl.removeClass('unable')
      btnJqEl.text(btnText)

      clearInterval(timer)
    }
    countListener(counting)
  }, 1000)
  countListener(counting)
}

/**
 * 统一重试和退出弹框
 */
function showRetryAndExitDialog(msg, retry, isBackHistoryEnable) {
  showMsgDialog('警告', msg, '重试', () => {
    hideDialog()
    retry()
  }, isBackHistoryEnable ? '返回' : '退出', () => {
    // 无法继续的情况下，不关闭弹框
    // hideDialog()

    if (isBackHistoryEnable) {
      // 返回上一页
      goBack();
    } else {
      // 关闭
      tjsw_app.common_utils.closeByJs()
    }
  })
}

/**
 * 只允许两位小数
 * @param obj 输入框
 * @param isNegativeEnable 是否允许为负数
 *
 * 注意：
 * 此方法只做输入时限制，并不会做四舍五入等计算，不符合规则的数据可能会丢失
 * 如果使用代码自动触发，可能会破坏数据准确性
 */
function onlyFloat2(obj, isNegativeEnable) {
  return onlyNumber(obj, 2, isNegativeEnable, false, false)
}

/**
 * 邮编
 */
function onlyPostCode(obj) {
  return onlyNumber(obj, 0, false, true, true)
}

/**
 * 只允许输入数字,
 * @param obj 输入框
 *
 * 注意：
 * 此方法只做输入时限制，并不会做四舍五入等计算，不符合规则的数据可能会丢失
 * 如果使用代码自动触发，可能会破坏数据准确性
 */
function onlyPhone(obj) {
  return onlyNumber(obj, 0, false, true, true)
}

/**
 * 只允许数字
 * @param obj 输入框
 * @param decimalCount  小数位数
 * @param isNegativeEnable  是否允许为负数
 * @param isEmptyEnable  是否可以为空
 * @param isEnableStartWith0  是否可以以0开头（如发票号码、电话号码等）
 *
 * 注意：
 * 此方法只做输入时限制，并不会做四舍五入等计算，不符合规则的数据可能会丢失
 * 如果使用代码自动触发，可能会破坏数据准确性
 *
 * 自动触发事件方法：
 * jq:
 * $("xxx").trigger("input")
 * js:
 * element.dispatchEvent(new Event("input"))
 */
function onlyNumber(obj, decimalCount = 0, isNegativeEnable = false, isEmptyEnable = false, isEnableStartWith0 = false) {
  let oldValue = obj.value
  let defValue = obj.value
  let loc = obj.selectionStart
  // let locE = obj.selectionEnd

  if (decimalCount > 0 && defValue.startsWith(".")) {
    // 如果以“.”开头，比如复制来的".12"
    defValue = "0" + defValue
  }

  //得到第一个字符是否为负号
  let t = defValue.charAt(0);

  //先把非数字的都替换掉，除了数字和.(包括“-”负号，后面会补回)
  // obj.value = obj.value.replace(/[^\d\.]/g, '');
  defValue = defValue.replace(decimalCount > 0 ? /[^\d\.]/g : /[^\d]/g, '');
  // //必须保证第一个为数字而不是.
  // defValue = defValue.replace(/^\./g, '');
  //保证只有出现一个.而没有多个.
  defValue = defValue.replace(/\.{2,}/g, '.');
  //保证.只出现一次，而不能出现两次以上
  defValue = defValue.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');

  if (!isEmptyEnable) {
    // 判空
    defValue = defValue === "" ? "0" : defValue;
  }

  if (decimalCount > 0) {
    // 允许小数
    if (defValue.indexOf('.') >= 0) {
      // 有小数点
      let strArr = defValue.split('.')

      // 处理整数位
      let pre = strArr[0]
      // 如果小数点前没有字符(复制来的比如“.12”)，小数点前补个0
      pre = pre === "" ? "0" : pre
      // 如果不允许前面有0，去掉整数位前面的0
      if (!isEnableStartWith0) {
        while (pre.startsWith("0") && pre.length > 1) {
          loc -= 1
          pre = pre.substring(1)
        }
      }

      // 处理小数位
      let suf = strArr[1]
      if (suf.length > decimalCount) {
        // 小数后面超长，限制小数位数
        suf = suf.substring(0, decimalCount);
      } else {
        // 小数位不够，补0
        let count = decimalCount - suf.length
        for (let i = 0; i < count; i++) {
          suf += "0"
        }
      }

      defValue = pre + "." + suf
    } else {
      // 没有小数点
      // 如果不允许前面有0，去掉整数位前面的0
      if (!isEnableStartWith0) {
        while (defValue.startsWith("0") && defValue.length > 1) {
          defValue = defValue.substring(1)
        }
      }
      defValue += "."
      // 没有小数点，后面补0
      for (let i = 0; i < decimalCount; i++) {
        defValue += "0"
      }
    }
  } else {
    if (!isEnableStartWith0) {
      while (defValue.startsWith("0") && defValue.length > 1) {
        defValue = defValue.substring(1)
      }
    }
  }

  // 最后补回负号
  // 如果允许为负并且第一个是负号，将前面正则去掉的第一个负号补回，可能导致-0.00
  if (isNegativeEnable && t === "-") {
    // if (parseFloat(defValue) !== 0) {
    // 如果值为0，就不补充负号了；但是这样会无法第一个输入负号
    defValue = '-' + defValue;
    // }
  }

  obj.value = defValue

  if (isDebug) {
    logI("onlyNumber(计算前: '" + oldValue + "', 小数位数: " + decimalCount + ", 可为负: " + isNegativeEnable + ", 可为空: " + isEmptyEnable + ", 可0开头: " + isEnableStartWith0 + ") = " + obj.value);
  }

  // 重置光标位置
  obj.selectionStart = loc;
  obj.selectionEnd = loc;

  return defValue
}

/**
 * 添加header
 * @param title 标题文字
 * @param isWithBack  是否有返回按钮
 * @param backCallback  自定义返回事件
 * @param isWhiteBg  是否白色背景(默认蓝底白字)
 */
function addHeader(title, isWithBack, backCallback, isWhiteBg) {
  let header = $("<div class='header " + (isWhiteBg === true ? "h-bg-white" : "h-bg-blue") + "'><div class='h-left " + (isWithBack === true ? "l-back" : "") + "'>" + (isWithBack ? "返回" : "") + "</div><div class='h-title'>" + title + "</div><div class='h-right'></div></div>")
  $('body .container').prepend(header)

  if (isWhiteBg) {
    header.find(".l-back").eq(0).css('background-image', "url('../../app_base/assets/img/ic_back_blue.png')")
  }

  if (isWithBack) {
    header.find(".h-left").eq(0).on('click', function () {
      if (backCallback && typeof backCallback === 'function') {
        backCallback()
      } else {
        goBack()
      }
    });
  }
}

/**
 * 获取随机字符串
 * @param length  长度
 * @return {string} 随机字符串
 */
function randomStr(length) {
  // 36进制
  return Math.random().toString(36).substring(2, length)
}

/**
 * 禁止缩放、双击缩放、多指手势
 */
function preventScale() {
  let lastTouch = 0
  window.addEventListener('touchstart', function (e) {
    if (e.touches.length > 1) {
      // 禁止多指操作
      e.preventDefault()
    }
  })
  let body = $('body')
  body.on('touchend', function (e) {
    let now = new Date().getTime()
    if (now - lastTouch <= 300) {
      // 禁止双击放大
      e.preventDefault()
    }
    lastTouch = now
  })
  // 禁止iOS手势操作
  body.on('gesturestart', function (e) {
    e.preventDefault()
  })
}

/**
 * 初始化手机基础模式
 */
function initMobile() {
  // disableSelect()
  preventScale()
}

/**
 * img懒加载启动
 * 使用步骤：
 * 1、引入EasyLazyload、commonUtils和jquery文件
 * 2、img标签的src属性改成data-lazy-src，如"<img src='xxx.png'/>"改成"<img data-lazy-src='xxx.png'/>"
 * 3、在jquery初始化成功后调用commonUtils中的lazyLoadImg()方法，且必须在UI之后（一般在body内部的最后），如：
 * $(function () {
    lazyLoadImg()
    ...
  })
 */
function lazyLoadImg() {
  // 检查是否需要启动懒加载
  if ($("img[data-lazy-src]").length < 1) {
    logI("EasyLazyload - 未找到包含data-lazy-src属性的img元素，无需启动懒加载!")
    return
  }

  // 检查是否引入EasyLazyload.js
  let isLazyJsIncluded = false
  // let scripts = $("body script[src]")
  let scripts = $("script[src]")
  for (let i = 0; i < scripts.length; i++) {
    let src = scripts[i].src
    if (src.indexOf("EasyLazyload.js") > 0) {
      isLazyJsIncluded = true
      break
    }
  }
  if (!isLazyJsIncluded) {
    logE("EasyLazyload - 使用EasyLazyload前须引入EasyLazyload.js!!!")
    return
  }

  logI("启动懒加载 lazyLoadInit")

  lazyLoadInit({
    // 颜色蒙层
    coverColor: "white",
    // 元素蒙层
    // coverDiv: "",
    // 不可见img距离底部offsetBottom距离时开始加载图片
    offsetBottom: 100,
    // 不可见img距离顶部offsetBottom距离时开始加载图片
    offsetTopm: 100,
    // 图片显示动画时间
    showTime: 300,
    // onLoadBackEnd: function (i, jqEle) {
    //   // 图片完全显示回调
    // },
    // onLoadBackStart: function (i, jqEle) {
    //   // 图片下载完成回调
    // }
  })
}

// 阻止滚动监听
let moveListener = e => {
  // e.preventDefault()
  // 阻止事件冒泡
  e.stopPropagation()
}

/**
 * 禁止body滚动
 */
function stopBodyScroll(jqTarget) {
  document.body.style.overflow = 'hidden'
  if (jqTarget) {
    jqTarget[0].addEventListener('touchmove', moveListener, {passive: false});
  } else {
    document.addEventListener('touchmove', moveListener, {passive: false});
  }
}

/**
 * 开启body滚动
 */
function enableBodyScroll(jqTarget) {
  document.body.style.overflow = 'auto'
  if (jqTarget) {
    jqTarget[0].removeEventListener('touchmove', moveListener, false);
  } else {
    document.removeEventListener('touchmove', moveListener, false);
  }
}

/**
 * 返回的事格式化后的字符串
 * @param value
 * @returns {string|string|*}
 */
function parseFloat2(value) {
  return parseValue(value, 2)
}

/**
 * 按照数据类型格式化数据的字符串
 * @param value
 * @param dc 小数位数
 */
function parseValue(value, dc) {
  // logI(value + "  -  " + dc)
  if (typeof dc == "number") {
    const f = parseInt(dc);
    if (value === undefined || value === "" || isNaN(value) || !isFinite(value)) {
      value = 0;
    }
    var dividend = Math.pow(10, f);
    value = Math.round(value * dividend) / dividend;
    var result = value.toString();
    if (f === 0) {
      return result
    }
    if (result.indexOf(".") < 0) {
      result += ".";
    }
    for (let i = result.length - result.indexOf("."); i <= f; i++) {
      result += "0";
    }
    return result;
  } else {
    if (value === undefined || value === "" || value === null) {
      return "0.00";
    } else {
      return value;
    }
  }
}

/**
 * 数据对象深层克隆
 * 算法来源：http://www.cnblogs.com/birdshome/archive/2005/03/20/122246.html
 */
var deepClone = function (source) {
  var objClone = null;
  if (source.constructor == Object) {
    objClone = new source.constructor();
  } else {
    objClone = new source.constructor(source.valueOf());
  }
  for (var key in source) {
    if (objClone[key] != source[key]) {
      if (typeof (source[key]) == 'object') {
        objClone[key] = deepClone(source[key]);
      } else {
        objClone[key] = source[key];
      }
    }
  }
  objClone.toString = source.toString;
  objClone.valueOf = source.valueOf;
  return objClone;
};

/**
 * 清空数组
 */
function clearArray(arr) {
  if (arr && arr instanceof Array) {
    try {
      arr.splice(0, arr.length)
    } catch (e) {
      logCrash(e)
    }
  }
}

/**
 * 添加水印
 * @param str 水印文字
 * @param jqEl  添加区域
 */
function addWaterMask(str, jqEl) {
  if (!jqEl) {
    jqEl = $('body')
  }
  doDelay(100, () => {
    let wm = $("<div></div>")
    wm.css({
      position: 'absolute',
      top: 0,
      height: jqEl.height(),
      left: 0,
      right: 0,
      zIndex: -1
    })
    jqEl.prepend(wm)
    // 水印需要让取消上层元素背景，否则会被遮挡
    jqEl.children().css({background: 'none'})
    wm.watermark({
      texts: [str],
      textColor: '#e2e2e2',
      textFont: '14px 微软雅黑',
      width: 200,
      height: 300,
      textRotate: -30
    })
  })
}