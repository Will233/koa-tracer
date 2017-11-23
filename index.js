/*
 * 接口监测中间件
 * 
 */

// 获取客户端真实ip
function getRealIp (req) {
  let ip = req.headers['x-forwarded-for'] || 
           req.connection.remoteAddress || 
           req.socket.remoteAddress || 
            (req.connection.socket ? req.connection.socket.remoteAddress : null);
  if (ip && Array.isArray(ip)) {
    ip = ip.split(',').pop()
  }
  return ip;
}

/*
 *  options {Object} 
 *    options.callback = function (trace)
 */
function tracer (options) {
  let callback = null
  if (options) {
    callback = options.callback
  }
  return async function (ctx, next) {
    let startTime = Date.now();
    // 等待返回
    await next();
    let endTime = Date.now();
    let ip = getRealIp(ctx.req);
    let trace = {
      ip: ip,
      url: ctx.url,
      host: ctx.host,
      method: ctx.method,
      startTime: startTime,
      endTime: endTime,
      status: ctx.status
    };
    if (callback && typeof callback === 'function') {
      callback(trace);
    } else {
      console.log(trace);
    }
  }
}

module.exports = tracer;