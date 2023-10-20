// 手机或固定电话
const REG_PHONE_TELE = /^((0\d{2,3}-?\d{7,8})|(1\d{10}))$/
// 邮编
const REG_POSTCODE = /^[0-9]{6}$/

/**
 * 校验手机或固定电话
 */
function checkPhone(phone) {
    return checkReg(phone, REG_PHONE_TELE)
}

/**
 *  校验邮编
 */
function checkPostcode(code) {
    return checkReg(code, REG_POSTCODE);
}

/**
 * 通过正则校验
 */
function checkReg(val, reg) {
    if (isEmptyOrNull(val)) {
        return false
    } else {
        return reg.test(val)
    }
}

/**
 * 获取字符串
 * @param src 数据源
 * @param prefixCount  前保留位数
 * @param suffixCount  后保留位数
 * @param length  转换后长度 = 前保留位数+ "*"的个数 + 后保留位数
 * @returns {string}  返回值
 */
function coverStr(src, prefixCount = 1, suffixCount = 1, length) {
    if (isEmptyOrNull(src)) {
        // logW('数据源为空，无法隐藏位数: ' + src);
        return '';
    } else {
        if (!length || !(length instanceof Number)) {
            length = src.length
        }

        if (src.length <= (prefixCount + suffixCount)) {
            logW('数据源位数不够，无法隐藏位数: ' + src + '(' + prefixCount + ',' + suffixCount + ')')
            return coverMidStr(src);
        }
        let prefix = src.substring(0, prefixCount);
        let suffix = src.substring(src.length - suffixCount);
        let result = prefix;
        for (let i = 0; i < length - prefixCount - suffixCount; i++) {
            result += '*'
        }
        return result + suffix;
    }
}

/**
 * 遮挡手机号
 * 姓名：留最后一个汉字 身份证：留前三后四位 手机号：留前三后二；
 */
function coverPhone(phone, prefixCount = 3, suffixCount = 2, length = 11) {
    return coverStr(phone, prefixCount, suffixCount, length)
}

/**
 * 遮挡身份证号码
 * 姓名：留最后一个汉字 身份证：留前三后四位 手机号：留前三后二；
 */
function coverIDCard(zjhm, prefixCount = 3, suffixCount = 4, length = 18) {
    return coverStr(zjhm, prefixCount, suffixCount, length)
}

/**
 * 遮挡姓名
 * 姓名：留最后一个汉字 身份证：留前三后四位 手机号：留前三后二；
 */
function coverName(name, prefixCount = 0, suffixCount = 1) {
    return coverStr(name, prefixCount, suffixCount, name.length)
}

/**
 * 遮挡中间部分
 */
function coverMidStr(src) {
    if (isEmptyOrNull(src)) {
        // logW('数据源为空，无法隐藏位数: ' + src);
        return '';
    } else if (src.length > 2) {
        return coverStr(src, Math.floor(src.length / 3), Math.floor(src.length / 3), src.length);
    } else {
        return src;
    }
}