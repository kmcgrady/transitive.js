/* TODO: is is available as a library? */

var d3 = require('d3')

module.exports = function () {
  var size = [960, 500]
  var scale = 256
  var translate = [size[0] / 2, size[1] / 2]
  var zoomDelta = 0

  function tile () {
    var z = Math.max(Math.log(scale) / Math.LN2 - 8, 0)
    var z0 = Math.round(z + zoomDelta)
    var k = Math.pow(2, z - z0 + 8)
    var origin = [(translate[0] - scale / 2) / k, (translate[1] - scale / 2) / k]
    var tiles = []
    var cols = d3.range(Math.max(0, Math.floor(-origin[0])), Math.max(0, Math.ceil(size[0] / k - origin[0])))
    var rows = d3.range(Math.max(0, Math.floor(-origin[1])), Math.max(0, Math.ceil(size[1] / k - origin[1])))

    rows.forEach(function (y) {
      cols.forEach(function (x) {
        tiles.push([x, y, z0])
      })
    })

    tiles.translate = origin
    tiles.scale = k

    return tiles
  }

  tile.size = function (_) {
    if (!arguments.length) return size
    size = _
    return tile
  }

  tile.scale = function (_) {
    if (!arguments.length) return scale
    scale = _
    return tile
  }

  tile.translate = function (_) {
    if (!arguments.length) return translate
    translate = _
    return tile
  }

  tile.zoomDelta = function (_) {
    if (!arguments.length) return zoomDelta
    zoomDelta = +_
    return tile
  }

  return tile
}
