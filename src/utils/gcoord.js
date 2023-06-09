/* @preserve
 * gcoord 0.2.3, geographic coordinate library
 * Copyright (c) 2020 Jiulong Hu <me@hujiulong.com>
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.gcoord = {}));
}(this, (function (exports) { 'use strict';

  // WGS84
  var WGS84 = 'WGS84';
  var WGS1984 = WGS84;
  var EPSG4326 = WGS84;
  // GCJ02
  var GCJ02 = 'GCJ02';
  var AMap = GCJ02;
  // BD09
  var BD09 = 'BD09';
  var BD09LL = BD09;
  var Baidu = BD09;
  var BMap = BD09;
  // BD09MC
  var BD09MC = 'BD09MC';
  var BD09Meter = BD09MC;
  // EPSG3857
  var EPSG3857 = 'EPSG3857';
  var EPSG900913 = EPSG3857;
  var EPSG102100 = EPSG3857;
  var WebMercator = EPSG3857;
  var WM = EPSG3857;

  function assert(condition, msg) {
      if (!condition)
          throw new Error(msg);
  }
  /**
   * isArray
   *
   * @param {*} input variable to validate
   * @returns {boolean} true/false
   */
  function isArray(input) {
      return (!!input) && Object.prototype.toString.call(input) === '[object Array]';
  }
  /**
   * isNumber
   *
   * @param {*} num Number to validate
   * @returns {boolean} true/false
   * @example
   * isNumber(123)
   * //=true
   * isNumber('foo')
   * //=false
   */
  function isNumber(input) {
      return !Number.isNaN(Number(input)) && input !== null && !isArray(input);
  }
  /**
   * compose
   *
   * @param {function[]} functions
   * @returns {function}
   */
  function compose() {
      var funcs = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          funcs[_i] = arguments[_i];
      }
      var start = funcs.length - 1;
      /* eslint-disable func-names */
      return function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          var i = start;
          var result = funcs[start].apply(null, args);
          while (i--)
              result = funcs[i].call(null, result);
          return result;
      };
  }
  /**
   * Iterate over coordinates in any GeoJSON object, similar to Array.forEach()
   * https://github.com/Turfjs/turf/blob/master/packages/turf-meta/index.mjs
   *
   * @name coordEach
   * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
   * @param {Function} callback a method that takes (currentCoord, coordIndex, featureIndex, multiFeatureIndex)
   * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
   * @returns {void}
   * @example
   * let features = featureCollection([
   *   point([26, 37], {"foo": "bar"}),
   *   point([36, 53], {"hello": "world"})
   * ]);
   *
   * coordEach(features, function (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
   *   //=currentCoord
   *   //=coordIndex
   *   //=featureIndex
   *   //=multiFeatureIndex
   *   //=geometryIndex
   * });
   */
  /* eslint-disable no-param-reassign */
  function coordEach(geojson, callback, excludeWrapCoord) {
      if (excludeWrapCoord === void 0) { excludeWrapCoord = false; }
      // Handles null Geometry -- Skips this GeoJSON
      if (geojson === null)
          return;
      /* eslint-disable-next-line */
      var j, k, l, geometry, stopG, coords, geometryMaybeCollection, wrapShrink = 0, coordIndex = 0, isGeometryCollection;
      var type = geojson.type;
      var isFeatureCollection = type === 'FeatureCollection';
      var isFeature = type === 'Feature';
      var stop = isFeatureCollection ? geojson.features.length : 1;
      // This logic may look a little weird. The reason why it is that way
      // is because it's trying to be fast. GeoJSON supports multiple kinds
      // of objects at its root: FeatureCollection, Features, Geometries.
      // This function has the responsibility of handling all of them, and that
      // means that some of the `for` loops you see below actually just don't apply
      // to certain inputs. For instance, if you give this just a
      // Point geometry, then both loops are short-circuited and all we do
      // is gradually rename the input until it's called 'geometry'.
      //
      // This also aims to allocate as few resources as possible: just a
      // few numbers and booleans, rather than any temporary arrays as would
      // be required with the normalization approach.
      for (var featureIndex = 0; featureIndex < stop; featureIndex++) {
          geometryMaybeCollection = (isFeatureCollection ? geojson.features[featureIndex].geometry
              : (isFeature ? geojson.geometry : geojson));
          isGeometryCollection = (geometryMaybeCollection) ? geometryMaybeCollection.type === 'GeometryCollection' : false;
          stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;
          for (var geomIndex = 0; geomIndex < stopG; geomIndex++) {
              var multiFeatureIndex = 0;
              var geometryIndex = 0;
              geometry = isGeometryCollection
                  ? geometryMaybeCollection.geometries[geomIndex] : geometryMaybeCollection;
              // Handles null Geometry -- Skips this geometry
              if (geometry === null)
                  continue;
              var geomType = geometry.type;
              wrapShrink = (excludeWrapCoord && (geomType === 'Polygon' || geomType === 'MultiPolygon')) ? 1 : 0;
              switch (geomType) {
                  case null:
                      break;
                  case 'Point':
                      coords = geometry.coordinates;
                      if (callback(coords, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false)
                          return false;
                      coordIndex++;
                      multiFeatureIndex++;
                      break;
                  case 'LineString':
                  case 'MultiPoint':
                      coords = geometry.coordinates;
                      for (j = 0; j < coords.length; j++) {
                          if (callback(coords[j], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false)
                              return false;
                          coordIndex++;
                          if (geomType === 'MultiPoint')
                              multiFeatureIndex++;
                      }
                      if (geomType === 'LineString')
                          multiFeatureIndex++;
                      break;
                  case 'Polygon':
                  case 'MultiLineString':
                      coords = geometry.coordinates;
                      for (j = 0; j < coords.length; j++) {
                          for (k = 0; k < coords[j].length - wrapShrink; k++) {
                              if (callback(coords[j][k], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false)
                                  return false;
                              coordIndex++;
                          }
                          if (geomType === 'MultiLineString')
                              multiFeatureIndex++;
                          if (geomType === 'Polygon')
                              geometryIndex++;
                      }
                      if (geomType === 'Polygon')
                          multiFeatureIndex++;
                      break;
                  case 'MultiPolygon':
                      coords = geometry.coordinates;
                      for (j = 0; j < coords.length; j++) {
                          geometryIndex = 0;
                          for (k = 0; k < coords[j].length; k++) {
                              for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
                                  if (callback(coords[j][k][l], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false)
                                      return false;
                                  coordIndex++;
                              }
                              geometryIndex++;
                          }
                          multiFeatureIndex++;
                      }
                      break;
                  case 'GeometryCollection':
                      for (j = 0; j < geometry.geometries.length; j++) {
                          if (coordEach(geometry.geometries[j], callback, excludeWrapCoord) === false)
                              return false;
                      }
                      break;
                  default:
                      throw new Error('Unknown Geometry Type');
              }
          }
      }
  }

  var sin = Math.sin, cos = Math.cos, sqrt = Math.sqrt, abs = Math.abs, PI = Math.PI;
  var a = 6378245;
  var ee = 0.006693421622965823;
  // roughly check whether coordinates are in China.
  function isInChinaBbox(lon, lat) {
      return lon >= 72.004 && lon <= 137.8347 && lat >= 0.8293 && lat <= 55.8271;
  }
  function transformLat(x, y) {
      var ret = -100 + 2 * x + 3 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * sqrt(abs(x));
      ret += (20 * sin(6 * x * PI) + 20 * sin(2 * x * PI)) * 2 / 3;
      ret += (20 * sin(y * PI) + 40 * sin(y / 3 * PI)) * 2 / 3;
      ret += (160 * sin(y / 12 * PI) + 320 * sin(y * PI / 30)) * 2 / 3;
      return ret;
  }
  function transformLon(x, y) {
      var ret = 300 + x + 2 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * sqrt(abs(x));
      ret += (20 * sin(6 * x * PI) + 20 * sin(2 * x * PI)) * 2 / 3;
      ret += (20 * sin(x * PI) + 40 * sin(x / 3 * PI)) * 2 / 3;
      ret += (150 * sin(x / 12 * PI) + 300 * sin(x / 30 * PI)) * 2 / 3;
      return ret;
  }
  function delta(lon, lat) {
      var dLon = transformLon(lon - 105, lat - 35);
      var dLat = transformLat(lon - 105, lat - 35);
      var radLat = lat / 180 * PI;
      var magic = sin(radLat);
      magic = 1 - ee * magic * magic;
      var sqrtMagic = sqrt(magic);
      dLon = (dLon * 180) / (a / sqrtMagic * cos(radLat) * PI);
      dLat = (dLat * 180) / ((a * (1 - ee)) / (magic * sqrtMagic) * PI);
      return [dLon, dLat];
  }
  function WGS84ToGCJ02(coord) {
      var lon = coord[0], lat = coord[1];
      if (!isInChinaBbox(lon, lat))
          return [lon, lat];
      var d = delta(lon, lat);
      return [lon + d[0], lat + d[1]];
  }
  function GCJ02ToWGS84(coord) {
      var lon = coord[0], lat = coord[1];
      if (!isInChinaBbox(lon, lat))
          return [lon, lat];
      var _a = [lon, lat], wgsLon = _a[0], wgsLat = _a[1];
      var tempPoint = WGS84ToGCJ02([wgsLon, wgsLat]);
      var dx = tempPoint[0] - lon;
      var dy = tempPoint[1] - lat;
      while (abs(dx) > 1e-6 || abs(dy) > 1e-6) {
          wgsLon -= dx;
          wgsLat -= dy;
          tempPoint = WGS84ToGCJ02([wgsLon, wgsLat]);
          dx = tempPoint[0] - lon;
          dy = tempPoint[1] - lat;
      }
      return [wgsLon, wgsLat];
  }

  var sin$1 = Math.sin, cos$1 = Math.cos, atan2 = Math.atan2, sqrt$1 = Math.sqrt, PI$1 = Math.PI;
  var baiduFactor = PI$1 * 3000.0 / 180.0;
  function BD09ToGCJ02(coord) {
      var lon = coord[0], lat = coord[1];
      var x = lon - 0.0065;
      var y = lat - 0.006;
      var z = sqrt$1(x * x + y * y) - 0.00002 * sin$1(y * baiduFactor);
      var theta = atan2(y, x) - 0.000003 * cos$1(x * baiduFactor);
      var newLon = z * cos$1(theta);
      var newLat = z * sin$1(theta);
      return [newLon, newLat];
  }
  function GCJ02ToBD09(coord) {
      var lon = coord[0], lat = coord[1];
      var x = lon;
      var y = lat;
      var z = sqrt$1(x * x + y * y) + 0.00002 * sin$1(y * baiduFactor);
      var theta = atan2(y, x) + 0.000003 * cos$1(x * baiduFactor);
      var newLon = z * cos$1(theta) + 0.0065;
      var newLat = z * sin$1(theta) + 0.006;
      return [newLon, newLat];
  }

  // https://github.com/Turfjs/turf/blob/master/packages/turf-projection/index.ts
  var R2D = 180 / Math.PI;
  var D2R = Math.PI / 180;
  var A = 6378137.0;
  var MAXEXTENT = 20037508.342789244;
  function ESPG3857ToWGS84(xy) {
      return [
          (xy[0] * R2D / A),
          ((Math.PI * 0.5) - 2.0 * Math.atan(Math.exp(-xy[1] / A))) * R2D,
      ];
  }
  function WGS84ToEPSG3857(lonLat) {
      // compensate longitudes passing the 180th meridian
      // from https://github.com/proj4js/proj4js/blob/master/lib/common/adjust_lon.js
      var adjusted = (Math.abs(lonLat[0]) <= 180) ? lonLat[0] : (lonLat[0] - ((lonLat[0] < 0 ? -1 : 1) * 360));
      var xy = [
          A * adjusted * D2R,
          A * Math.log(Math.tan((Math.PI * 0.25) + (0.5 * lonLat[1] * D2R))),
      ];
      // if xy value is beyond maxextent (e.g. poles), return maxextent
      if (xy[0] > MAXEXTENT)
          xy[0] = MAXEXTENT;
      if (xy[0] < -MAXEXTENT)
          xy[0] = -MAXEXTENT;
      if (xy[1] > MAXEXTENT)
          xy[1] = MAXEXTENT;
      if (xy[1] < -MAXEXTENT)
          xy[1] = -MAXEXTENT;
      return xy;
  }

  var abs$1 = Math.abs;
  var MCBAND = [
      12890594.86,
      8362377.87,
      5591021,
      3481989.83,
      1678043.12,
      0,
  ];
  var LLBAND = [75, 60, 45, 30, 15, 0];
  var MC2LL = [
      [
          1.410526172116255e-8,
          0.00000898305509648872,
          -1.9939833816331,
          200.9824383106796,
          -187.2403703815547,
          91.6087516669843,
          -23.38765649603339,
          2.57121317296198,
          -0.03801003308653,
          17337981.2,
      ],
      [
          -7.435856389565537e-9,
          0.000008983055097726239,
          -0.78625201886289,
          96.32687599759846,
          -1.85204757529826,
          -59.36935905485877,
          47.40033549296737,
          -16.50741931063887,
          2.28786674699375,
          10260144.86,
      ],
      [
          -3.030883460898826e-8,
          0.00000898305509983578,
          0.30071316287616,
          59.74293618442277,
          7.357984074871,
          -25.38371002664745,
          13.45380521110908,
          -3.29883767235584,
          0.32710905363475,
          6856817.37,
      ],
      [
          -1.981981304930552e-8,
          0.000008983055099779535,
          0.03278182852591,
          40.31678527705744,
          0.65659298677277,
          -4.44255534477492,
          0.85341911805263,
          0.12923347998204,
          -0.04625736007561,
          4482777.06,
      ],
      [
          3.09191371068437e-9,
          0.000008983055096812155,
          0.00006995724062,
          23.10934304144901,
          -0.00023663490511,
          -0.6321817810242,
          -0.00663494467273,
          0.03430082397953,
          -0.00466043876332,
          2555164.4,
      ],
      [
          2.890871144776878e-9,
          0.000008983055095805407,
          -3.068298e-8,
          7.47137025468032,
          -0.00000353937994,
          -0.02145144861037,
          -0.00001234426596,
          0.00010322952773,
          -0.00000323890364,
          826088.5,
      ],
  ];
  var LL2MC = [
      [
          -0.0015702102444,
          111320.7020616939,
          1704480524535203,
          -10338987376042340,
          26112667856603880,
          -35149669176653700,
          26595700718403920,
          -10725012454188240,
          1800819912950474,
          82.5,
      ],
      [
          0.0008277824516172526,
          111320.7020463578,
          647795574.6671607,
          -4082003173.641316,
          10774905663.51142,
          -15171875531.51559,
          12053065338.62167,
          -5124939663.577472,
          913311935.9512032,
          67.5,
      ],
      [
          0.00337398766765,
          111320.7020202162,
          4481351.045890365,
          -23393751.19931662,
          79682215.47186455,
          -115964993.2797253,
          97236711.15602145,
          -43661946.33752821,
          8477230.501135234,
          52.5,
      ],
      [
          0.00220636496208,
          111320.7020209128,
          51751.86112841131,
          3796837.749470245,
          992013.7397791013,
          -1221952.21711287,
          1340652.697009075,
          -620943.6990984312,
          144416.9293806241,
          37.5,
      ],
      [
          -0.0003441963504368392,
          111320.7020576856,
          278.2353980772752,
          2485758.690035394,
          6070.750963243378,
          54821.18345352118,
          9540.606633304236,
          -2710.55326746645,
          1405.483844121726,
          22.5,
      ],
      [
          -0.0003218135878613132,
          111320.7020701615,
          0.00369383431289,
          823725.6402795718,
          0.46104986909093,
          2351.343141331292,
          1.58060784298199,
          8.77738589078284,
          0.37238884252424,
          7.45,
      ],
  ];
  function transform(x, y, factors) {
      var cc = abs$1(y) / factors[9];
      var xt = factors[0] + factors[1] * abs$1(x);
      var yt = factors[2]
          + factors[3] * cc
          + factors[4] * (Math.pow(cc, 2))
          + factors[5] * (Math.pow(cc, 3))
          + factors[6] * (Math.pow(cc, 4))
          + factors[7] * (Math.pow(cc, 5))
          + factors[8] * (Math.pow(cc, 6));
      xt *= x < 0 ? -1 : 1;
      yt *= y < 0 ? -1 : 1;
      return [xt, yt];
  }
  function BD09toBD09MC(coord) {
      var lng = coord[0], lat = coord[1];
      var factors = [];
      for (var i = 0; i < LLBAND.length; i++) {
          if (abs$1(lat) > LLBAND[i]) {
              factors = LL2MC[i];
              break;
          }
      }
      return transform(lng, lat, factors);
  }
  function BD09MCtoBD09(coord) {
      var x = coord[0], y = coord[1];
      var factors = [];
      for (var i = 0; i < MCBAND.length; i++) {
          if (y >= MCBAND[i]) {
              factors = MC2LL[i];
              break;
          }
      }
      return transform(x, y, factors);
  }

  var WGS84$1 = {
      to: {
          GCJ02: WGS84ToGCJ02,
          BD09: compose(GCJ02ToBD09, WGS84ToGCJ02),
          BD09MC: compose(BD09toBD09MC, GCJ02ToBD09, WGS84ToGCJ02),
          EPSG3857: WGS84ToEPSG3857,
      },
  };
  var GCJ02$1 = {
      to: {
          WGS84: GCJ02ToWGS84,
          BD09: GCJ02ToBD09,
          BD09MC: compose(BD09toBD09MC, GCJ02ToBD09),
          EPSG3857: compose(WGS84ToEPSG3857, GCJ02ToWGS84),
      },
  };
  var BD09$1 = {
      to: {
          WGS84: compose(GCJ02ToWGS84, BD09ToGCJ02),
          GCJ02: BD09ToGCJ02,
          EPSG3857: compose(WGS84ToEPSG3857, GCJ02ToWGS84, BD09ToGCJ02),
          BD09MC: BD09toBD09MC,
      },
  };
  var EPSG3857$1 = {
      to: {
          WGS84: ESPG3857ToWGS84,
          GCJ02: compose(WGS84ToGCJ02, ESPG3857ToWGS84),
          BD09: compose(GCJ02ToBD09, WGS84ToGCJ02, ESPG3857ToWGS84),
          BD09MC: compose(BD09toBD09MC, GCJ02ToBD09, WGS84ToGCJ02, ESPG3857ToWGS84),
      },
  };
  var BD09MC$1 = {
      to: {
          WGS84: compose(GCJ02ToWGS84, BD09ToGCJ02, BD09MCtoBD09),
          GCJ02: compose(BD09ToGCJ02, BD09MCtoBD09),
          EPSG3857: compose(WGS84ToEPSG3857, GCJ02ToWGS84, BD09ToGCJ02, BD09MCtoBD09),
          BD09: BD09MCtoBD09,
      },
  };

  var CRS = /*#__PURE__*/Object.freeze({
    __proto__: null,
    WGS84: WGS84$1,
    GCJ02: GCJ02$1,
    BD09: BD09$1,
    EPSG3857: EPSG3857$1,
    BD09MC: BD09MC$1
  });

  /**
   * transform
   *
   * @param {geojson|position|string} input
   * @returns {geojson|position} output
   */
  /* eslint-disable no-param-reassign */
  function transform$1(input, crsFrom, crsTo) {
      assert(!!input, 'Coordinate is required');
      assert(!!crsFrom, 'Original coordinate system is required');
      assert(!!crsTo, 'Target coordinate system is required');
      var from = CRS[crsFrom];
      assert(!!from, 'Original coordinate system is invalid');
      if (crsFrom === crsTo)
          return input;
      var to = from.to[crsTo];
      assert(!!to, 'Target coordinate system is invalid');
      var type = typeof (input);
      assert(type === 'string' || type === 'object', 'Coordinate must be an geojson or an array of position');
      if (type === 'string') {
          try {
              input = JSON.parse(input);
          }
          catch (e) {
              throw new Error('Input is a invalid JSON string');
          }
      }
      var isPosition = false;
      if (isArray(input)) {
          assert(input.length >= 2, 'The length of position must be greater than or equal to 2');
          assert(isNumber(input[0]) && isNumber(input[1]), 'Position array members should be all numbers');
          input = input.map(Number);
          isPosition = true;
      }
      var output = null;
      var convert = to;
      if (isPosition) {
          output = convert(input);
      }
      else {
          coordEach(input, function (coord) {
              var _a;
              _a = convert(coord), coord[0] = _a[0], coord[1] = _a[1];
          });
          output = input;
      }
      return output;
  }

  var index = {
      WGS84: WGS84,
      WGS1984: WGS1984,
      EPSG4326: EPSG4326,
      GCJ02: GCJ02,
      AMap: AMap,
      BD09: BD09,
      BD09LL: BD09LL,
      Baidu: Baidu,
      BMap: BMap,
      BD09MC: BD09MC,
      BD09Meter: BD09Meter,
      EPSG3857: EPSG3857,
      EPSG900913: EPSG900913,
      EPSG102100: EPSG102100,
      WebMercator: WebMercator,
      WM: WM,
      transform: transform$1,
  };

  exports.AMap = AMap;
  exports.BD09 = BD09;
  exports.BD09LL = BD09LL;
  exports.BD09MC = BD09MC;
  exports.BD09Meter = BD09Meter;
  exports.BMap = BMap;
  exports.Baidu = Baidu;
  exports.EPSG102100 = EPSG102100;
  exports.EPSG3857 = EPSG3857;
  exports.EPSG4326 = EPSG4326;
  exports.EPSG900913 = EPSG900913;
  exports.GCJ02 = GCJ02;
  exports.WGS1984 = WGS1984;
  exports.WGS84 = WGS84;
  exports.WM = WM;
  exports.WebMercator = WebMercator;
  exports.default = index;
  exports.transform = transform$1;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=gcoord.js.map
