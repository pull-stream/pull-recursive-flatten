var Values = require('pull-stream/sources/values')

module.exports = function Flatten () {
  var stack = []
  return function (read) {
    stack.push(read)
    return function (abort, cb) {
      if(!stack.length) cb(true)
      else {
        ;(function next () {
          stack[stack.length-1](null, function (end, value) {
            if(end === true) {
              stack.pop()
              if(!stack.length) return cb(true) //end the stream
            }

            if(Array.isArray(value)) stack.push(Values(value))
            else if('function' === typeof value) stack.push(value)
            else if(!end) return cb(null, value)
            next()
          })
        })()
      }
    }
  }
}



