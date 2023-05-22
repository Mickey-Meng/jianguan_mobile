document.write(`<script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>`);

const appId = 'wxcf2799690c55904c'
const APPSECRET = '72c413c354d318a0368d139c33d142e3'
const baseChar = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];

const random = (lower, upper) => {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

const createNonceStr = () => {
  let result = '';
  let baseCharLength = baseChar.length;
  for (let index = 0; index < 15; index++) {
    result += baseChar[random(0, baseCharLength - 1)];
  }
  return result;
}

const getAccessToken = () => {
  return new Promise(resolve => {
    $.ajax({
      url: `/proxy/weixin/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${APPSECRET}`
    }).then(data => {
      if (!data.errcode) {
        resolve(data.access_token)
      } else {
        alert('getAccessToken' + data.errmsg)
        resolve()
      }
    })
  })
}

const getTicket = (token) => {
  return new Promise(resolve => {
    $.ajax({
      url: `/proxy/weixin/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`
    }).then(data => {
      if (!data.errcode) {
        resolve(data.ticket)
      } else {
        alert('getTicket' + data.errmsg)
        resolve()
      }
    })
  })
}

const encodeUTF8 = (s) => {
  var i, r = [],
    c, x;
  for (i = 0; i < s.length; i++)
    if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
    else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F));
  else {
    if ((x = c ^ 0xD800) >> 10 == 0) //对四字节UTF-16转换为Unicode
      c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000,
      r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F));
    else r.push(0xE0 + (c >> 12 & 0xF));
    r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
  };
  return r;
}

const sha1 = (s) => {
  var data = new Uint8Array(encodeUTF8(s))
  var i, j, t;
  var l = ((data.length + 8) >>> 6 << 4) + 16,
    s = new Uint8Array(l << 2);
  s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer);
  for (t = new DataView(s.buffer), i = 0; i < l; i++) s[i] = t.getUint32(i << 2);
  s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
  s[l - 1] = data.length << 3;
  var w = [],
    f = [
      function () {
        return m[1] & m[2] | ~m[1] & m[3];
      },
      function () {
        return m[1] ^ m[2] ^ m[3];
      },
      function () {
        return m[1] & m[2] | m[1] & m[3] | m[2] & m[3];
      },
      function () {
        return m[1] ^ m[2] ^ m[3];
      }
    ],
    rol = function (n, c) {
      return n << c | n >>> (32 - c);
    },
    k = [1518500249, 1859775393, -1894007588, -899497514],
    m = [1732584193, -271733879, null, null, -1009589776];
  m[2] = ~m[0], m[3] = ~m[1];
  for (i = 0; i < s.length; i += 16) {
    var o = m.slice(0);
    for (j = 0; j < 80; j++)
      w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),
      t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
      m[1] = rol(m[1], 30), m.pop(), m.unshift(t);
    for (j = 0; j < 5; j++) m[j] = m[j] + o[j] | 0;
  };
  t = new DataView(new Uint32Array(m).buffer);
  for (var i = 0; i < 5; i++) m[i] = t.getUint32(i << 2);

  var hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function (e) {
    return (e < 16 ? "0" : "") + e.toString(16);
  }).join("");
  return hex;
}

L.Control.ToolBar.goLocate = function (e) {
  L.DomUtil.removeClasses(this.btnLocation, this._iconLocation);
  L.DomUtil.addClasses(this.btnLocation, this._iconLocationLoading);

  var that = this;

  let timestamp = Math.floor(new Date().getTime() / 1000)
  let nonceStr = createNonceStr()

  getAccessToken().then(token => {
    L.DomUtil.removeClasses(that.btnLocation, that._iconLocationLoading);
    L.DomUtil.addClasses(that.btnLocation, that._iconLocation);

    token && getTicket(token).then(ticket => {
      let signature = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${window.location.href.split('#')[0]}`
      console.log(signature)
      signature = sha1(signature)
      console.log(signature)
      wx.config({
        debug: false,
        appId: appId,
        timestamp: timestamp,
        nonceStr: nonceStr,
        signature: signature,
        jsApiList: ['getLocation']
      });

      wx.ready(function () {
        wx.getLocation({
          type: 'wgs84',
          success: function (res) {
            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            var speed = res.speed; // 速度，以米/每秒计
            var accuracy = res.accuracy; // 位置精度
            that.onLocationFound({
              accuracy: accuracy,
              latlng: [latitude, longitude]
            })
          }
        });
      });

      wx.error(function (res) {
        alert('wx.error ' + JSON.stringify(res))
      });
    })
  })
}
