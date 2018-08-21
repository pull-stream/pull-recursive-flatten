
var tape = require('tape')
var pull = require('pull-stream')

var Flatten = require('../')

var struct = [
  1,
  ['a', 'b', 'c'],
  [2,3],
  [4,[[5]],6],
  7, 8
]

var values = [1, 'a','b','c', 2,3,4,5,6,7,8]

tape('pull', function (t) {
  var i = 0
  pull(
    pull.values(struct),
    Flatten(),
    pull.through(function (v) {
      t.equal(v, values[i++])
    }),
    pull.collect(function (err, _values) {
      t.deepEqual(_values, values)
      t.end()
    })
  )
})

var struct2 = [
  1,
  pull.values(['a', 'b', 'c']),
  [2,3],
  [4,[[5]],6],
  7, 8
]

tape('pull', function (t) {
  var i = 0
  pull(
    pull.values(struct2),
    Flatten(),
    pull.through(function (v) {
      t.equal(v, values[i++])
    }),
    pull.collect(function (err, _values) {
      t.deepEqual(_values, values)
      t.end()
    })
  )
})

