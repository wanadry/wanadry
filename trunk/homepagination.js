// -----------------------------------------------------------------------------------------
// Table of Content for Blogger with Pagination
// Original: http://vagabundia.blogspot.com/2011/04/resumen-de-entradas-con-paginacion.html
// Modified by WZ
// On 3 March 2012
// Visit: http://wanadry.blogspot.com
// -----------------------------------------------------------------------------------------
var minpage = 6;
var maxpage = 9;
var firstPage = 0;
var pagernum = 0;
var postsnum = 0;
var actualpage = 1;
function showpageposts(_0xef2cx8) {
  var _0xef2cx9, _0xef2cxa, _0xef2cxb, _0xef2cxc;
  var _0xef2cxd = '';
  if (pagernum == 0) {
    postsnum = parseInt(_0xef2cx8['feed']['openSearch$totalResults'].$t);
    pagernum = parseInt(postsnum / postsperpage) + 1;
  };
  for (var _0xef2cxe = 0; _0xef2cxe < postsperpage; _0xef2cxe++) {
    if (_0xef2cxe == _0xef2cx8['feed']['entry']['length']) {
      break;
    };
    _0xef2cx9 = _0xef2cx8['feed']['entry'][_0xef2cxe];
    _0xef2cxa = _0xef2cx9['title']['$t'];
    for (var _0xef2cxf = 0; _0xef2cxf < _0xef2cx9['link']['length']; _0xef2cxf++) {
      if (_0xef2cx9['link'][_0xef2cxf]['rel'] == 'alternate') {
        _0xef2cxb = _0xef2cx9['link'][_0xef2cxf]['href'];
        break;
      };
    };
    for (var _0xef2cx10 = 0; _0xef2cx10 < _0xef2cx9['link']['length']; _0xef2cx10++) {
      if (_0xef2cx9['link'][_0xef2cx10]['rel'] == 'replies' && _0xef2cx9['link'][_0xef2cx10]['type'] == 'text/html') {
        var _0xef2cx11 = _0xef2cx9['link'][_0xef2cx10]['title']['split'](' ')[0];
        break;
      };
    };
    if ('content' in _0xef2cx9) {
      var _0xef2cx12 = _0xef2cx9['content']['$t'];
    } else {
      if ('summary' in _0xef2cx9) {
        var _0xef2cx12 = _0xef2cx9['summary']['$t'];
      } else {
        var _0xef2cx12 = '';
      };
    };
    var _0xef2cx13 = /<\S[^>]*>/g;
    _0xef2cx12 = _0xef2cx12['replace'](_0xef2cx13, '');
    if (_0xef2cx12['length'] > numchars) {
      _0xef2cx12 = _0xef2cx12['substring'](0, numchars) + '...';
    };
    var _0xef2cx14 = _0xef2cx9['published']['$t'],
      _0xef2cx15 = _0xef2cx14['substring'](0, 4),
      _0xef2cx16 = _0xef2cx14['substring'](5, 7),
      _0xef2cx17 = _0xef2cx14['substring'](8, 10);
    var _0xef2cx18 = new Array();
    if (idMode) {
      _0xef2cx18[1] = 'Jan';
      _0xef2cx18[2] = 'Feb';
      _0xef2cx18[3] = 'Mar';
      _0xef2cx18[4] = 'Apr';
      _0xef2cx18[5] = 'Mei';
      _0xef2cx18[6] = 'Jun';
      _0xef2cx18[7] = 'Jul';
      _0xef2cx18[8] = 'Agt';
      _0xef2cx18[9] = 'Sep';
      _0xef2cx18[10] = 'Okt';
      _0xef2cx18[11] = 'Nov';
      _0xef2cx18[12] = 'Des';
    } else {
      _0xef2cx18[1] = 'Jan';
      _0xef2cx18[2] = 'Feb';
      _0xef2cx18[3] = 'Mar';
      _0xef2cx18[4] = 'Apr';
      _0xef2cx18[5] = 'May';
      _0xef2cx18[6] = 'Jun';
      _0xef2cx18[7] = 'Jul';
      _0xef2cx18[8] = 'Aug';
      _0xef2cx18[9] = 'Sep';
      _0xef2cx18[10] = 'Oct';
      _0xef2cx18[11] = 'Nov';
      _0xef2cx18[12] = 'Dec';
    };
    var _0xef2cx19 = (showPostDate) ? _0xef2cx17 + ' ' + _0xef2cx18[parseInt(_0xef2cx16, 10)] + ' ' + _0xef2cx15 + ' - ' : '';
    var _0xef2cx1a = (showComments) ? _0xef2cx11 + ' ' + commentsLabel : '';
    if ('media$thumbnail' in _0xef2cx9) {
      _0xef2cxc = _0xef2cx9['media$thumbnail']['url'];
    } else {
      _0xef2cxc = imgBlank;
    };
    _0xef2cxd += '<div class="itemposts">';
    _0xef2cxd += '<h6><a title="' + _0xef2cxa + '" href="' + _0xef2cxb + '" target="_blank">' + _0xef2cxa + '</a></h6>';
    _0xef2cxd += '<div class="iteminside"><a title="' + _0xef2cxa + '" href="' + _0xef2cxb + '" target="_blank"><img alt="' + _0xef2cxa + '" src="' + _0xef2cxc + '" /></a>';
    _0xef2cxd += _0xef2cx12 + '</div>';
    _0xef2cxd += '<div style="clear:both;"></div><div class="itemfoot">' + _0xef2cx19 + _0xef2cx1a + '<a class="itemrmore" href="' + _0xef2cxb + '" target="_blank">' + rmoreText + '</a></div>';
    _0xef2cxd += '</div>';
  };
  document['getElementById']('results')['innerHTML'] = _0xef2cxd;
  pagination();
};
function pagination() {
  countP = 0;
  output = '';
  if (actualpage > 1) {
    output += '<a class="prevjson" href="javascript:incluirscript(' + parseInt(actualpage - 1) + ')">' + prevText + '</a>';
  } else {
    output += '<span class="prevjson hidden">' + prevText + '</span>';
  };
  if (pagernum < (maxpage + 1)) {
    for (countP = 1; countP <= pagernum; countP++) {
      if (countP == actualpage) {
        output += '<span class="actual">' + countP + '</span>';
      } else {
        output += '<a href="javascript:incluirscript(' + countP + ')">' + countP + '</a>';
      };
    };
  } else {
    if (pagernum > (maxpage - 1)) {
      if (actualpage < minpage) {
        for (countP = 1; countP < (maxpage - 2); countP++) {
          if (countP == actualpage) {
            output += '<span class="actual">' + countP + '</span>';
          } else {
            output += '<a href="javascript:incluirscript(' + countP + ')">' + countP + '</a>';
          };
        };
        output += ' ... ';
        output += '<a href="javascript:incluirscript(' + parseInt(pagernum - 1) + ')">' + parseInt(pagernum - 1) + '</a>';
        output += '<a href="javascript:incluirscript(' + pagernum + ')">' + pagernum + '</a>';
      } else {
        if (pagernum - (minpage - 1) > actualpage && actualpage > (minpage - 1)) {
          output += '<a href="javascript:incluirscript(1)">1</a>';
          output += '<a href="javascript:incluirscript(2)">2</a>';
          output += ' ... ';
          for (countP = actualpage - 2; countP <= actualpage + 2; countP++) {
            if (countP == actualpage) {
              output += '<span class="actual">' + countP + '</span>';
            } else {
              output += '<a href="javascript:incluirscript(' + countP + ')">' + countP + '</a>';
            };
          };
          output += ' ... ';
          output += '<a href="javascript:incluirscript(' + parseInt(pagernum - 1) + ')">' + parseInt(pagernum - 1) + '</a>';
          output += '<a href="javascript:incluirscript(' + pagernum + ')">' + pagernum + '</a>';
        } else {
          output += '<a href="javascript:incluirscript(1)">1</a>';
          output += '<a href="javascript:incluirscript(2)">2</a>';
          output += ' ... ';
          for (countP = pagernum - (minpage + 1); countP <= pagernum; countP++) {
            if (countP == actualpage) {
              output += '<span class="actual">' + countP + '</span>';
            } else {
              output += '<a href="javascript:incluirscript(' + countP + ')">' + countP + '</a>';
            };
          };
        };
      };
    };
  };
  if (actualpage < countP - 1) {
    output += '<a class="nextjson" href="javascript:incluirscript(' + parseInt(actualpage + 1) + ')">' + nextText + '</a>';
  } else {
    output += '<span class="nextjson hidden">' + nextText + '</span>';
  };
  document['getElementById']('pagination')['innerHTML'] = output;
  var _0xef2cx1c = (actualpage * postsperpage) - (postsperpage - 1);
  var _0xef2cx1d = actualpage * postsperpage;
  var _0xef2cx1e = totalPostLabel + ' ' + postsnum + ' - ' + jumpPageLabel + ' ' + _0xef2cx1c + ' - ' + _0xef2cx1d;
  document['getElementById']('totalposts')['innerHTML'] = _0xef2cx1e;
};
function incluirscript(_0xef2cx20) {
  if (firstPage == 1) {
    removerscript();
  };
  document['getElementById']('results')['innerHTML'] = '<div id="loadingscript">' + loadingText + '</div>';
  document['getElementById']('pagination')['innerHTML'] = '';
  document['getElementById']('totalposts')['innerHTML'] = '';
  var _0xef2cx1c = (_0xef2cx20 * postsperpage) - (postsperpage - 1);
  if (sortByLabel) {
    var _0xef2cx21 = siteUrl + '/feeds/posts/default/-/' + labelSorter + '?start-index=' + _0xef2cx1c;
  } else {
    var _0xef2cx21 = siteUrl + '/feeds/posts/default/?start-index=' + _0xef2cx1c;
  };
  _0xef2cx21 += '&max-results=' + postsperpage;
  _0xef2cx21 += '&orderby=published&alt=json-in-script&callback=showpageposts';
  var _0xef2cx22 = document['createElement']('script');
  _0xef2cx22['setAttribute']('type', 'text/javascript');
  _0xef2cx22['setAttribute']('src', _0xef2cx21);
  _0xef2cx22['setAttribute']('id', 'TEMPORAL');
  document['getElementsByTagName']('head')[0]['appendChild'](_0xef2cx22);
  firstPage = 1;
  actualpage = _0xef2cx20;
};
function removerscript() {
  var _0xef2cx24 = document['getElementById']('TEMPORAL');
  var _0xef2cx25 = _0xef2cx24['parentNode'];
  _0xef2cx25['removeChild'](_0xef2cx24);
};
onload = function () {
  incluirscript(1);
};
document['write']('<div id="toc-outer">');
document['write']('<div id="results"></div>');
document['write']('<div id="itempager" style="position:relative;"><div id="pagination"></div>');
document['write']('<div id="totalposts"></div></div></div>');
