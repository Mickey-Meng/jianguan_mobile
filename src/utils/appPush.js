const judgePlus = function() {
  return new Promise(resolve => {
    if (window.plus) {
      resolve()
    } else {
      document.addEventListener('plusready', function() {
        resolve()
      })
    }
  })
}

const getPushCid = () => {
  return new Promise(resolve => {
    if (process.env.NODE_ENV !== 'production') {
      resolve('')
    }
    judgePlus().then(() => {
      let pinf = plus.push.getClientInfo();
      let cid = pinf.clientid;//客户端标识
      resolve(cid)
    })
  })
}


export const appPush = {
  getPushCid
}
