# pull-recursive-flatten

recursively fatten a stream of streams or stream of arrays.

``` js
pull(
  pull.values([a, [b, c]),
  Flatten(),
  pull.collect(function (err, ary) {
    //becomes [a, b, c]
  })
)
```
if it's a stream of streams, the same happens:
``` js
pull(
  pull.values([a, pull.values([b, c])),
  Flatten(),
  pull.collect(function (err, ary) {
    //becomes [a, b, c]
  })
)
```

## License

MIT
