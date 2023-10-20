/**
 * IframeDialog依赖于commonUtils.showDialog
 */

const TAG_IFRAME_DIALOG = 'IframeDialog'

/**
 * 弹框显示iframe
 * @param title 标题
 * @param url iframe加载src
 * @param dialogId  弹框ID
 * @param rootId  dialog实际依附的视图。参考commonUtils.showDialog
 * @param closeBtnVisible 是否显示右上角关闭按钮
 * @param closeBtnVisibleDelay  按钮显示延迟，单位毫秒
 * @param clickGroundToClose  点击空白处是否可以关闭弹框
 * @param iframeWidth iframe宽度，默认100%
 * @param iframeHeight  iframe高度，最大和默认
 */
function showIframeDialog({
                            title,
                            url,
                            dialogId,
                            rootId,
                            closeBtnVisible = true,
                            closeBtnVisibleDelay = 0,
                            clickGroundToClose = false,
                            iframeWidth = 0,
                            iframeHeight = 0
                          }) {
  if (isEmptyOrNull(url)) {
    toastError('弹框加载url为空，取消弹框')
    logE('url is empty!!!', TAG_IFRAME_DIALOG)
    return
  }
  let {bodyHeight} = getDeviceSize()
  if (!iframeWidth || iframeWidth <= 0) {
    iframeWidth = '100%'
  }
  let maxIframeHeight = bodyHeight * 0.7
  if (!iframeHeight || iframeHeight <= 0 || iframeHeight > maxIframeHeight) {
    // dialog整体最大高度是80%，再去掉内部的title等其他组件高度
    iframeHeight = maxIframeHeight
  }

  let dialogContent = $('<div class="d-title">' + title + '</div>' +
    '<div class="d-close"></div>' +
    '<iframe src="' + url + '" width="' + iframeWidth + '" height="' + iframeHeight + '"></iframe>')

  let dialog = showDialog(dialogContent, dialogId, rootId, clickGroundToClose)

  let closeJel = dialog.find('.d-close').eq(0)
  closeJel.on('click', e => {
    hideIframeDialog({dialogId: dialogId})
  })
  if (!closeBtnVisible) {
    // 不显示关闭按钮
    closeJel.hide()
  } else {
    if (closeBtnVisibleDelay > 0) {
      // 延迟显示关闭按钮
      closeJel.hide()
      doDelay(closeBtnVisibleDelay, () => {
        closeJel.show()
      })
    }
  }
}

/**
 * 关闭iframe弹框
 * @param callback  关闭弹框之后回调
 * @param dialogOrId  弹框jq对象，或者弹框时设置的dialogId。参考commonUtils.hideDialog
 */
function hideIframeDialog({callback, dialogOrId}) {
  hideDialog(callback, dialogOrId)
}