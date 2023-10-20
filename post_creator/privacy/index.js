$(function () {
  showLoading()
  if (isDebug) {
    // addFloatBtn(reloadPage, baseUrl + '/app_base/assets/img/reload.png')
  }


  new Vue({
    el: '#vue_id',
    components: {},
    data: {
      isEn: false,
      lang: {
        zh: {
          title: '图创App隐私政策',
          content: '<p>\n' +
            '        本软件尊重并保护所有使用服务用户的个人隐私权。为了给您提供安全可靠的服务，本软件会按照本隐私权政策的规定使用和披露您的个人信息。但本软件将以高度的勤勉、审慎义务对待这些信息。除本隐私权政策另有规定外，在未征得您事先许可的情况下，本软件不会将这些信息对外披露或向第三方提供。本软件会不时更新本隐私权政策。您在同意本软件服务使用协议之时，即视为您已经同意本隐私权政策全部内容。</p>\n' +
            '\n' +
            '      <h3>1.适用范围</h3>\n' +
            '      <p>在您使用本软件服务时，本软件将在得到您许可的情况下使用或记录的您手机上的硬件与信息，包括但不限于：设备型号、系统版本、相机、相册、本地存储等；</p>\n' +
            '\n' +
            '      <h3>2.信息的使用</h3>\n' +
            '      <p>在获得您的数据之后，本软件会将必要信息上传至服务器，以留作业务办理凭证，如设备型号、系统版本号等。非必要信息不会上传，本地使用完成后即删除。具体使用如下：</p>\n' +
            '      <ol>\n' +
            '        <li>设备型号、系统版本：在关于中进行展示，以便用户反馈问题时进行问题定位与查询；</li>\n' +
            '        <li>相机、相册：导入本地图片时需要需要使用相机、相册；</li>\n' +
            '        <li>本地存储：软件生成的图片及部分使用信息(加密)会以文件的形式保存在本地；</li>\n' +
            '      </ol>\n' +
            '\n' +
            '      <h3>3.信息披露</h3>\n' +
            '      <p>(a)本软件不会将您的信息披露给不受信任的第三方。</p>\n' +
            '      <p>(b)根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露。</p>\n' +
            '      <p>(c)如您出现违反中国有关法律、法规或者相关规则的情况，需要向第三方披露。</p>\n' +
            '      <p>(d)本软件保存的必要敏感数据均存储在税务系统安全内网环境中。</p>\n' +
            '\n' +
            '      <h3>4.信息存储和交换</h3>\n' +
            '      <p>目前本软件收集的有关您的信息和资料将仅保存在本地。<br/>后期如若需要上传必要信息至关联的服务器上，这些信息和资料将在服务端妥善保管，非必要不会向任何第三方透露。届时将更新本隐私政策进行说明。</p>\n' +
            '\n' +
            '      <h3>5.信息安全</h3>\n' +
            '      <p>\n' +
            '        在使用本软件网络服务进行网上交易时，您不可避免的要向交易对方或潜在的交易对方披露自己的个人信息，如联络方式或者邮政地址。请您妥善保护自己的个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息泄密，请您立即联络本软件方客服，以便本软件方采取相应措施。</p>\n' +
            '\n' +
            '      <h3>6.第三方服务和SDK集成情况</h3>\n' +
            '      <p>目前该软件未使用任何第三方服务和sdk。</p>\n' +
            '\n' +
            '      <h3>7.账号注册与注销</h3>\n' +
            '      <p>目前该软件没有用户登录体系，无需注册与注销。</p>\n' +
            '\n' +
            '      <!--<h3>8.版权保护及责任</h3>-->\n' +
            '      <!--<p>本软件展示和生成的内容在未经允许的情况下不可用于任何商业行为。任何违规和违法行为造成的后果和责任由使用者承担。</p>-->\n' +
            '\n' +
            '      <h3>主体信息</h3>\n' +
            '      <ul>\n' +
            '        <li>所有者：' + getAuthor(false) + '</li>\n' +
            '        <li>官网地址：<a href="https://pc.homedot.space" target="_blank">https://pc.homedot.space</a></li>\n' +
            '      </ul>'
        },
        en: {
          title: 'Post Creator Privacy Policy',
          content: '<p>\n' +
            '        The software respects and protects the personal privacy of all users of the service. In order to provide you with safe and reliable services, the software will use and disclose your personal information in accordance with the provisions of this Privacy policy. However, the software will treat such information with a high degree of diligence and prudence. Except as otherwise provided in this Privacy Policy, the Software will not disclose such information or provide it to third parties without your prior permission. The software will update this Privacy policy from time to time. When you agree to this Software Service Usage Agreement, it is deemed that you have agreed to all contents of this Privacy policy.</p>\n' +
            '\n' +
            '      <h3>1.Scope</h3>\n' +
            '      <p>When you use the Software Service, the software will use or record the hardware and information on your mobile phone with your permission, including but not limited to: device model, system version, camera, photo album, local storage, etc.</p>\n' +
            '\n' +
            '      <h3>2.Usage</h3>\n' +
            '      <p>After obtaining your data, the software will upload the necessary information to the server to be retained as business vouchers, such as equipment model, system version number, etc. Non-essential information will not be uploaded and will be deleted after local use. Specific uses are as follows:</p>\n' +
            '      <ol>\n' +
            '        <li>Equipment model, system version: display in about, so that users can locate and query problems when they feedback;</li>\n' +
            '        <li>Camera and album: When importing local pictures, you need to use the camera and album;</li>\n' +
            '        <li>Local storage: Software generated images and part of the use of information (encrypted) will be saved in the form of files in the local;</li>\n' +
            '      </ol>\n' +
            '\n' +
            '      <h3>3.Disclosure</h3>\n' +
            '      <p>(a)The software will not disclose your information to untrusted third parties.</p>\n' +
            '      <p>(b)In accordance with the relevant provisions of the law, or the requirements of administrative or judicial bodies, to third parties or administrative or judicial bodies.</p>\n' +
            '      <p>(c)If you have violated the relevant laws, regulations or rules of China, you need to disclose to a third party.</p>\n' +
            '      <p>(d)The necessary sensitive data saved by the software is stored in the secure Intranet environment of the tax system.</p>\n' +
            '\n' +
            '      <h3>4.Storage and exchange</h3>\n' +
            '      <p>Currently, the information and data collected about you by the Software will only be stored locally.<br/>If necessary information needs to be uploaded to the associated server in the later stage, such information and data will be properly kept on the server side and will not be disclosed to any third party unless necessary. This Privacy policy will be updated to explain at that time.</p>\n' +
            '\n' +
            '      <h3>5.Security</h3>\n' +
            '      <p>\n' +
            '        When using the software network services for online transactions, you will inevitably disclose your personal information, such as contact information or postal address, to the counterparty or potential counterparty. Please protect your personal information properly and only provide it to others when necessary. If you find that your personal information is leaked, please contact the customer service of the Software immediately so that the Software can take corresponding measures.</p>\n' +
            '\n' +
            '      <h3>6.Third-party services and SDK integration</h3>\n' +
            '      <p>The software does not currently use any third party services and SDKS.</p>\n' +
            '\n' +
            '      <h3>7.Account registration and cancellation</h3>\n' +
            '      <p>At present, the software has no user login system, and there is no need to register and cancel.</p>\n' +
            '\n' +
            '      <!--<h3>8.Copyright and Liability</h3>-->\n' +
            '      <!--<p>The content displayed and generated by the software may not be used for any commercial activity without permission. The user shall bear the consequences and responsibilities caused by any violation or illegal act.</p>-->\n' +
            '\n' +
            '      <h3>Subject</h3>\n' +
            '      <ul>\n' +
            '        <li>Owner：' + getAuthor(true) + '</li>\n' +
            '        <li>Website：<a href="https://pc.homedot.space" target="_blank">https://pc.homedot.space</a></li>\n' +
            '      </ul>'
        }
      }
    },
    computed: {
      contentHtml() {
        return this.isEn ? this.lang.en.content : this.lang.zh.content
      }
    },
    methods: {
      clickLang() {
        this.isEn = !this.isEn
      }
    },
    mounted() {
      hideLoading()
      this.isEn = parseGetParam('lang') === 'en'
    }
  })
})