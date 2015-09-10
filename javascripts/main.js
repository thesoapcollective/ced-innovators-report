var $win = null;
var $socialTextbox = null;
var $dropdowns = null;
var currentSectionIndex = 0;

$(document).ready(function() {
  cacheElements();
  setupJsClickHandler();

  setupSocialLinks();
  setupNavigation();

  setupFilters();
  hideCurrentFilterSelection();

  // Funding Section
  setTimeout(setupFundingSection, 500);
});

// ========================================
// HELPERS
// ========================================
var cacheElements = function() {
  $win = $(window);
  $socialTextbox = $('.social-list-item:last');
  $dropdowns = $('.js-dropdown');
};

var setupJsClickHandler = function() {
  $('.js-prevent-default').click(function(event) {
    event.preventDefault();
  });
};

// ========================================
// SOCIAL
// ========================================
var setupSocialLinks = function() {
  $('.social-list-item').hover(function() {
    $socialTextbox.text($(this).text());
    $socialTextbox.addClass('is-active');
  }, function() {
    $socialTextbox.removeClass('is-active');
    $socialTextbox.text('');
  });

  setupFacebookShare();
  setupTwitterShare();
};

var setupFacebookShare = function() {
  var url = window.location;
  $('.social-list-item .icons-facebook').attr('href', 'http://www.facebook.com/share.php?u=' + url);
  $('.share-box-list-item .icons-facebook').attr('href', 'http://www.facebook.com/share.php?u=' + url);
};

var setupTwitterShare = function() {
  var url = window.location;

  // Header
  var tweet = encodeURIComponent("Check out @CEDNC's Innovators Report!");
  $('.social-list-item .icons-twitter').attr('href', 'https://twitter.com/share?text=' + tweet + '&url=' + url);

  // Share box
  var tweetLength = 140 - 23 - 12; // Tweet base - url - via/extra space
  $('.share-box-list-item .icons-twitter').each(function(i) {
    var $this = $(this);
    var tweet = $this.closest('.share-box').find('p').text();
    if (tweet.length > tweetLength) {
      tweet = tweet.substring(0, tweetLength - 3) + '...';
    }
    $this.attr('href', 'https://twitter.com/share?text=' + tweet + '&url=' + url + '&via=CEDNC');
  });
};

// ========================================
// NAVIGATION
// ========================================
var setupNavigation = function() {
  $('body').panelSnap({
    $menu: $('.nav-list'),
    panelSelector: '.content-section',
    menuSelector: '.nav-list-item a',
    directionThreshold: $win.outerHeight() / 3,
    slideSpeed: 500,
    easing: 'swing',
    onActivate: snappedToSection
  });
};

var snappedToSection = function($section) {
  var index = $section.index();
  currentSectionIndex = index;
  selectNavListItem();
};

var selectNavListItem = function() {
  $('.nav-list-item.is-active').removeClass('is-active');
  $('.nav-list-item:eq('+currentSectionIndex+')').addClass('is-active');
};

// ========================================
// FILTERS
// ========================================
var setupFilters = function() {
  $dropdowns.each(function(i) {
    var $this = $(this);
    var $trigger = $('.dropdown-trigger', $this);
    var $triggerArrow = $('.dropdown-arrow', $this);
    var $dropdown = $('.dropdown-list', $this);

    $trigger.attr('style', '');
    $dropdown.attr('style', '');

    var triggerArrowWidth = $triggerArrow.outerWidth(true);
    var triggerWidth = $trigger.outerWidth();
    var dropdownWidth = $dropdown.outerWidth() + triggerArrowWidth;

    if (triggerWidth >= dropdownWidth) {
      $trigger.width(triggerWidth);
      $dropdown.width(triggerWidth);
    } else {
      $trigger.width(dropdownWidth);
      $dropdown.width(dropdownWidth);
    }
  });

  $('.dropdown-trigger').mouseenter(function() {
    $(this).parent().addClass('is-active');
  });

  $('.js-dropdown').mouseleave(function() {
    $(this).removeClass('is-active');
  });
};

var hideCurrentFilterSelection = function() {
  $dropdowns.each(function(i) {
    var $this = $(this);
    var current = $('.dropdown-current', $this).text();

    $('.dropdown-list-item a', $this).each(function() {
      var $that = $(this);
      if ($that.text() === current) {
        $that.addClass('dis-n');
      }
    });
  });
};

// ========================================
// FUNDING SECTION
// ========================================
var cedData = [
  {sector: 'Tech', funding: [
    {type: 'Equity', data: [
      {year: 2015, data: [
        {quarter: 'Q1', value: 52673746},
        {quarter: 'Q2', value: 61778573},
      ]},
      {year: 2014, data: [
        {quarter: 'Q1', value: 146012319},
        {quarter: 'Q2', value: 36084050},
        {quarter: 'Q3', value: 41149158},
        {quarter: 'Q4', value: 38584010},
      ]},
      {year: 2013, data: [
        {quarter: 'Q1', value: 22870224},
        {quarter: 'Q2', value: 24491950},
        {quarter: 'Q3', value: 23744183},
        {quarter: 'Q4', value: 20591746},
      ]},
    ]},
    {type: 'Grants & Awards', data: [
      {year: 2014, value: 15940211},
      {year: 2013, value: 508230},
    ]}
  ]},

  {sector: 'Life Science', funding: [
    {type: 'Equity', data: [
      {year: 2015, data: [
        {quarter: 'Q1', value: 132076554},
        {quarter: 'Q2', value: 136260374},
      ]},
      {year: 2014, data: [
        {quarter: 'Q1', value: 16176684},
        {quarter: 'Q2', value: 19381452},
        {quarter: 'Q3', value: 38205554},
        {quarter: 'Q4', value: 112992665},
      ]},
      {year: 2013, data: [
        {quarter: 'Q1', value: 48898486},
        {quarter: 'Q2', value: 70867276},
        {quarter: 'Q3', value: 52087558},
        {quarter: 'Q4', value: 51858061},
      ]},
    ]},
    {type: 'Grants & Awards', data: [
      {year: 2014, value: 65910340},
      {year: 2013, value: 30757245},
    ]}
  ]},

  {sector: 'Advanced Manufacturing & Materials', funding: [
    {type: 'Equity', data: [
      {year: 2015, data: [
        {quarter: 'Q1', value: 23900000},
        {quarter: 'Q2', value: 10500000},
      ]},
      {year: 2014, data: [
        {quarter: 'Q1', value: 20060810},
        {quarter: 'Q2', value: 3980814},
        {quarter: 'Q3', value: 5300000},
        {quarter: 'Q4', value: 44899700},
      ]},
      {year: 2013, data: [
        {quarter: 'Q1', value: 8963428},
        {quarter: 'Q2', value: 26905988},
        {quarter: 'Q3', value: 1366000},
        {quarter: 'Q4', value: 670000},
      ]},
    ]},
    {type: 'Grants & Awards', data: [
      {year: 2014, value: 6840927},
      {year: 2013, value: 30757245},
    ]}
  ]},

  {sector: 'Cleantech', funding: [
    {type: 'Equity', data: [
      {year: 2015, data: [
        {quarter: 'Q1', value: 8547500},
        {quarter: 'Q2', value: 1200000},
      ]},
      {year: 2014, data: [
        {quarter: 'Q1', value: 388000},
        {quarter: 'Q2', value: 7749175},
        {quarter: 'Q3', value: 177600},
        {quarter: 'Q4', value: 1500000},
      ]},
      {year: 2013, data: [
        {quarter: 'Q1', value: 2046400},
        {quarter: 'Q2', value: 0},
        {quarter: 'Q3', value: 499996},
        {quarter: 'Q4', value: 10250000},
      ]},
    ]},
    {type: 'Grants & Awards', data: [
      {year: 2014, value: 1050000},
    ]}
  ]},
];

var cedDataColors = [
  {name: 'blue', value: '#00dbf9'},
  {name: 'green', value: '#4aaf77'},
  {name: 'red', value: '#ff7662'},
  {name: 'white', value: '#fff'}
];

var fundingFilter = {
  sector: 'All',
  type: 'All',
  year: 2015,
  quarter: 'All',
};

var setupFundingSection = function() {
  // var data = getFundingPieSliceData();
  var data = getFundingPieData();
  console.log(data)

  // console.log('++++++')
  // fundingFilter.type = 'Equity'
  // getFundingPieSliceData()

  // console.log('++++++')
  // fundingFilter = {
  //   sector: 'Tech',
  //   type: 'Equity',
  //   year: 2015,
  //   quarter: 'Q2',
  // }
  // getFundingPieSliceData()

  // console.log('------')
  // fundingFilter = {
  //   sector: 'Tech',
  //   type: 'All',
  //   year: 2014,
  //   quarter: 'All',
  // }
  // getFundingPieSliceData()

  // console.log('------')
  // fundingFilter = {
  //   sector: 'Tech',
  //   type: 'Grants & Awards',
  //   year: 2015,
  //   quarter: 'All',
  // }
  // getFundingPieSliceData()

  var colors = d3.scale.ordinal().range(cedDataColors);

  // Initial svg and pie chart values
  var pieSectionSelector = '.funding-left';
  var $pieSection = $(pieSectionSelector);

  var size = {
    width: $pieSection.width(),
    height: $pieSection.height()
  };
  size.radius = Math.min(size.width, size.height) / 2;

  var pie = d3.layout.pie()
    .value(function(d) { return d.value; })
    .sort(null);

  var arc = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(size.radius - 2);

  var outerArc = d3.svg.arc()
    .innerRadius(size.radius - 2)
    .outerRadius(size.radius);

  var svg = d3.select(pieSectionSelector)
    .append('svg')
      .attr('width', size.width)
      .attr('height', size.height);

  var defs = svg.append('defs');

  // Mask Gradient
  var maskGadient = defs.append('radialGradient')
    .attr('id', 'radial-mask-gradient')
  maskGadient.append('stop')
    .attr('offset', '0%')
    .attr('stop-color', '#fff')
    .attr('stop-opacity', 0);
  maskGadient.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', '#fff')
    .attr('stop-opacity', 1);

  // Pattern
  var pattern = defs.append('pattern')
    .attr('id', 'pie-pattern')
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('width', '4')
    .attr('height', '3')
  pattern.append('path')
    .attr('d', 'M0,0 L4,0 M0,1 L4,1')
    .attr('stroke', '#000')
    .attr('stroke-width', 1);

  // Main group
  var mask = svg.append('mask')
    .attr('id', 'pie-mask')
    .attr('width', size.width)
    .attr('height', size.height);
  mask.append('rect')
    .attr('transform', 'translate(' + -size.radius + ',' + -size.radius + ')')
    .attr('width', size.width)
    .attr('height', size.height)
    .attr('fill', 'url(#radial-mask-gradient)');

  var g = svg.append('g')
    .attr('transform', 'translate(' + (size.width / 2) + ',' + size.radius + ')')
    .attr('class', 'pie-chart');

  // Pattern slices
  var patternArcs = g.selectAll('.pattern-arc')
      .data(pie(data)).enter()
      .append('g')
        .attr('class', 'pattern-arc');
  patternArcs.append('path')
    .style('fill', 'url(#pie-pattern)')
    .each(function(d) { this._current = d; })
    .transition()
      .duration(1000)
      .attrTween('d', function(d) {
        var i = d3.interpolate(d.startAngle, d.endAngle);
        return function(t) {
          d.endAngle = i(t);
          return arc(d);
        }
      });

  // Gradient stroke slices
  var outerArcs = g.selectAll('.outer-arc')
    .data(pie(data)).enter()
    .append('g')
      .attr('class', 'outer-arc');
  outerArcs.append('path')
    .style('fill', function(d) { return colors(d.data.sector).value; })
    .each(function(d) { this._current = d; })
    .transition()
      .duration(1000)
      .attrTween('d', function(d) {
        var i = d3.interpolate(d.startAngle, d.endAngle);
        return function(t) {
          d.endAngle = i(t);
          return outerArc(d);
        }
      });

  // Pie slices
  var arcs = g.selectAll('.arc')
    .data(pie(data))
  arcs.enter().append('g')
    .attr('class', 'arc')
    .attr('mask', 'url(#pie-mask)');
  arcs.append('path')
    .style('fill', function(d) { return colors(d.data.sector).value; })
    .style('fill-opacity', 0.25)
    .each(function(d) { this._current = d; })
    .on('mouseover', function(d, i) {
      d3.select(this).transition()
        .duration(250)
        .style('fill-opacity', 0.5);
      d3.select(this.parentNode)
        .attr('mask', '');

      d3.selectAll('.funding-bar').transition()
        .duration(250)
        .attr('opacity', function(d, j) { return i === j ? 1 : 0.25; });
    })
    .on('mouseout', function(d, i) {
      d3.select(this).transition()
        .duration(250)
        .style('fill-opacity', 0.25);
      d3.select(this.parentNode)
        .attr('mask', 'url(#pie-mask)');

      d3.selectAll('.funding-bar').transition()
        .duration(250)
        .attr('opacity', 1);
    })
    .transition()
      .duration(1000)
      .attrTween('d', function(d) {
        console.log(d);
        var i = d3.interpolate(d.startAngle, d.endAngle);
        return function(t) {
          d.endAngle = i(t);
          return arc(d);
        }
      });

  // Pie text
  g.append('text')
    .text(getFundingPieTitle())
    .attr('x', 0)
    .attr('y', -80)
    .attr('class', 'funding-pie-title pie-title f-inputsans f-thin f-italic fs-h2 text-shadow-large no-pointer-event')
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle')
    .attr('fill-opacity', 0)
    .transition()
      .duration(1000)
      .attr('y', -40)
      .attr('fill-opacity', 1);

  var equityTotal = data.reduce(function(num, d) { return num + d.value; }, 0);
  g.append('text')
    .text('$' + numeral(equityTotal).format('0,0'))
    .attr('x', 0)
    .attr('y', 0)
    .attr('class', 'funding-pie-subtitle pie-title f-adelle f-bold fs-h1 text-shadow-large no-pointer-event')
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle')
    .attr('fill-opacity', 0)
    .transition()
      .duration(1000)
      .attr('y', 40)
      .attr('fill-opacity', 1);

  // Initial svg and bar chart values
  var barSectionSelector = '.funding-right';
  var $barSection = $(barSectionSelector);

  var size = {
    width: $barSection.width(),
    barHeight: 36
  };
  var barComponentHeight = $('.funding-right').height() - $('.funding-share-box').outerHeight();
  barComponentHeight = (barComponentHeight / 4 - size.barHeight) / 2;
  barComponentHeight = Math.min(barComponentHeight, size.barHeight);
  size.titleHeight = barComponentHeight;
  size.barBottomPadding = barComponentHeight;

  var barTotals = data.map(function(d) { return d.value; });
  var x = d3.scale.linear()
    .domain([0, d3.max(barTotals)])
    .range([0, size.width]);

  var chart = d3.select(barSectionSelector)
    .append('svg')
      .attr('width', size.width)
      .attr('height', (size.barHeight + size.titleHeight + size.barBottomPadding) * data.length);

  var chartDefs = chart.append('defs')

  // Gradients
  cedDataColors.forEach(function(color) {
    var gradient = chartDefs.append('linearGradient')
      .attr('id', color.name + '-gradient');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', color.value)
      .attr('stop-opacity', 0.6);

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', color.value)
      .attr('stop-opacity', 0.1);
  });

  // Bars
  var bars = chart.append('g')
    .attr('class', 'funding-bars');

  var bar = bars.selectAll('g')
    .data(data).enter()
    .append('g')
      .attr('transform', function(d, i) {
        return 'translate(0,' + ((size.barHeight + size.titleHeight + size.barBottomPadding) * i) + ')';
      })
      .attr('class', 'funding-bar')
      .on('mouseover', function(d, i) {
        d3.selectAll('.funding-bar').transition()
          .duration(250)
          .attr('opacity', function(d, j) { return i === j ? 1 : 0.25; });

        var pieSlice = d3.selectAll('.arc path')[0][i];
        d3.select(pieSlice).transition()
          .duration(250)
          .style('fill-opacity', 0.5);
        d3.select(pieSlice.parentNode)
          .attr('mask', '');
      })
      .on('mouseout', function(d, i) {
        d3.selectAll('.funding-bar').transition()
          .duration(250)
          .attr('opacity', 1);

        var pieSlice = d3.selectAll('.arc path')[0][i];
        d3.select(pieSlice).transition()
          .duration(250)
          .style('fill-opacity', 0.25);
        d3.select(pieSlice.parentNode)
          .attr('mask', 'url(#pie-mask)');
      });

  bar.append('rect')
    .attr('width', size.width)
    .attr('height', size.titleHeight + size.barHeight)
    .attr('opacity', 0);

  bar.append('text')
    .text(function(d, i) { return d.sector; })
    .attr('x', -30)
    .attr('y', size.titleHeight / 2)
    .attr('class', 'funding-bar-title f-inputsans f-light f-italic fs-h3 no-pointer-event')
    .attr('fill', '#fff')
    .attr('fill-opacity', 0)
    .transition()
      .duration(1000)
      .delay(function(d, i) { return i * 150; })
      .attr('x', 0)
      .attr('fill-opacity', 1);

  bar.append('rect')
    .attr('width', 0)
    .attr('height', size.barHeight)
    .attr('y', size.titleHeight)
    .attr('fill', function(d) { return 'url(#' + colors(d.sector).name + '-gradient)'; })
    .transition()
      .duration(1000)
      .delay(function(d, i) { return i * 150; })
      .attr('width', function(d) { return x(d.value); })

  bar.append('text')
    .text(function(d) {
      return '$' + numeral(d.value).format('0,0');
    })
    .attr('x', 10)
    .attr('y', size.titleHeight + size.barHeight / 2)
    .attr('dy', '.35em')
    .attr('class', 'funding-bar-text f-adelle f-light no-pointer-event')
    .attr('fill', '#fff')
    .attr('fill-opacity', 0)
    .transition()
      .duration(1000)
      .delay(function(d, i) { return i * 150; })
      .attr('fill-opacity', 1);


  // Filtering
  $('.js-funding-filter-year').click(function(event) {
    var year = $(this).attr('data-year');
    fundingFilter.year = parseInt(year);
    var newData = getFundingPieData();

    d3.selectAll('.arc path').data(pie(newData))
      .transition()
        .duration(500)
        .attrTween('d', function(d) {
          var i = d3.interpolate(this._current, d);
          this._current = i(0);
          return function(t) {
            return arc(i(t));
          };
        });

    d3.selectAll('.outer-arc path').data(pie(newData))
      .transition()
        .duration(500)
        .attrTween('d', function(d) {
          var i = d3.interpolate(this._current, d);
          this._current = i(0);
          return function(t) {
            return outerArc(i(t));
          };
        });

    d3.selectAll('.pattern-arc path').data(pie(newData))
      .transition()
        .duration(500)
        .attrTween('d', function(d) {
          var i = d3.interpolate(this._current, d);
          this._current = i(0);
          return function(t) {
            return arc(i(t));
          };
        });

    d3.select('.funding-pie-title').text(getFundingPieTitle())
    var equityTotal = newData.reduce(function(num, d) { return num + d.value; }, 0);
    d3.select('.funding-pie-subtitle').text('$' + numeral(equityTotal).format('0,0'))
  });
};

var getFundingPieTitle = function() {
  var str = fundingFilter.year;
  str += " Equity + Grants & Awards:"
  return str;
};

var getFundingPieData = function() {
  return filterFundingByYear();
};

var filterFundingByYear = function() {
  return cedData.map(function(data) {
    var filteredData = {sector: data.sector};
    filteredData.value = data.funding.reduce(function(num1, type) {
      return num1 + type.data.reduce(function(num2, year) {
        if (year.year === fundingFilter.year) {
          if (year.data) {
            return year.data.reduce(function(num3, quarter) {
              return num3 + quarter.value;
            }, 0);
          }
          return num2 + year.value;
        }
        return num2 + 0;
      }, 0);
    }, 0);
    return filteredData;
  });
}





var getFundingPieSliceData = function() {
  var data = cedData;
  data = filterFundingBySector(data);


  // data = filterFundingBySectorType(data);
  // data = filterFundingBySectorTypeYear(data);
  // if (data) {
  //   data = filterFundingBySectorTypeYearQuarter(data);
  // }

  // console.log(data)

  return data;
  // var data;

  // // Sector
  // if (fundingFilter.sector === 'All') {
  //   data = cedData.map(function(obj) { return obj.funding; });
  // } else {
  //   var sector = cedData.find(function(obj) { return obj.sector === fundingFilter.sector; });
  //   data = [sector.funding];
  // }

  // // Type
  // data = data.map(function(obj) {
  //   if (fundingFilter.type === 'All') {
  //     return obj.map(function(o) { return o.data; });
  //   } else {
  //     var type = obj.find(function(o) { return o.type === fundingFilter.type; });
  //     return type.data;
  //   }
  // });

  // // Year
  // data = data.map(function(obj) {
  //   var years = obj.map(function(o) {
  //     console.log(o)
  //     return o.filter(function(d) { return d.year === fundingFilter.year });
  //   });
  //   return years.filter(function(o) { return o.length; });
  // });
  // data = data.map(function(obj) { return obj[0]; });

  // // Quarter
  // data = data.map(function(obj) {
  //   if (fundingFilter.quarter === 'All') {
  //     return obj.map(function(o) { return o.data; });
  //   } else {
  //     var quarter = obj.find(function(o) { return o.quarter === fundingFilter.quarter; });
  //     return quarter;
  //   }
  // });

  // console.log(data);

  // return data;
};

var filterFundingBySector = function(data) {
  if (fundingFilter.sector === 'All') {
    return filterFundingSectorsByType(data);
  }
  var sector = data.find(function(d) { return d.sector === fundingFilter.sector; });
  return filterFundingSectorByType(sector);
};

var filterFundingSectorsByType = function(sectors) {
  return sectors.map(function(sector) { return filterFundingSectorByType(sector)});
};

var filterFundingSectorByType = function(sector) {
  if (fundingFilter.type === 'All') {
    return filterFundingTypesByYear(sector.funding);
  }
  var type = sector.funding.find(function(s) { return s.type === fundingFilter.type; });
  return filterFundingTypeByYear(type);
};

var filterFundingTypesByYear = function(types) {
  return types.map(function(type) { return filterFundingTypeByYear(type)});
}

var filterFundingTypeByYear = function(type) {
  var year = type.data.find(function(t) { return t.year === fundingFilter.year; });
  if (year) {
    return filterFundingYearByQuarter(year);
  }
  return 0;
}

var filterFundingYearByQuarter = function(year) {
  if (year.data) {
    if (fundingFilter.quarter === 'All') {
      return filterFundingQuarters(year.data);
    }
    var quarter = year.data.find(function(y) { return y.quarter === fundingFilter.quarter; });
    return quarter.value;
  }
  return year.value;
}

var filterFundingQuarters = function(quarters) {
  return quarters.reduce(function(num, quarter) { return num + quarter.value}, 0);
}











// var filterFundingBySector = function(data) {
//   var filteredData = data;

//   if (fundingFilter.sector === 'All') {
//     filteredData = filteredData.map(function(d) { return d.funding; });
//   } else {
//     var sector = filteredData.find(function(d) { return d.sector === fundingFilter.sector; });
//     filteredData = sector.funding;
//   }

//   return filteredData;
// };


// var filterFundingBySectorType = function(data) {
//   var filteredData = data;

//   if (fundingFilter.sector === 'All') {
//     filteredData = filteredData.map(function(d) { return filterFundingByType(d); });
//   } else {
//     filteredData = filterFundingByType(filteredData);
//   }

//   return filteredData;
// };

// var filterFundingByType = function(data) {
//   var filteredData = data;

//   if (fundingFilter.type === 'All') {
//     filteredData = filteredData.map(function(d) { return d.data });
//   } else {
//     var type = filteredData.find(function(d) { return d.type === fundingFilter.type; });
//     filteredData = type.data;
//   }

//   return filteredData;
// };

// var filterFundingBySectorTypeYear = function(data) {
//   var filteredData = data;

//   if (fundingFilter.sector === 'All') {
//     filteredData = filteredData.map(function(d) { return filterFundingByTypeYear(d); });
//   } else {
//     filteredData = filterFundingByTypeYear(filteredData);
//   }

//   return filteredData;
// };

// var filterFundingByTypeYear = function(data) {
//   if (fundingFilter.type === 'All') {
//     var filteredData = data.map(function(d) { return filterFundingByYear(d); });
//     return filteredData.filter(function(d) { return typeof d !== 'undefined'; });
//   }
//   return filterFundingByYear(data);
// };

// var filterFundingByYear = function(data) {
//   var filteredData = data.find(function(d) { return d.year === fundingFilter.year; });

//   if (filteredData) {
//     if (typeof filteredData.data !== 'undefined') {
//       return filteredData.data;
//     }
//     return filteredData.value;
//   }
// };

// var filterFundingBySectorTypeYearQuarter = function(data) {
//   var filteredData = data;

//   if (fundingFilter.sector === 'All') {
//     filteredData = filteredData.map(function(d) { return filterFundingByTypeYearQuarter(d); });
//   } else {
//     filteredData = filterFundingByTypeYearQuarter(filteredData);
//   }

//   return filteredData;
// };


// var filterFundingByTypeYearQuarter = function(data) {
//   var filteredData = data;

//   if (fundingFilter.type === 'All') {
//     filteredData = filteredData.map(function(d) { return filterFundingByYearQuarter(d); });
//   } else {
//     filteredData = filterFundingByYearQuarter(filteredData);
//   }

//   return filteredData;
// };

// var filterFundingByYearQuarter = function(data) {
//   if (fundingFilter.quarter === 'All') {
//     console.log(data)
//     return data.reduce(function(num, d) { return num + d.value; }, 0);
//   }
//   return data.value;
// };

// // var filterFundingByQuarter = function(data) {
// //   var filteredData = data.find(function(d) { return d.quater === fundingFilter.quarter; });
// //   if (filteredData) {
// //     return filteredData.value;
// //   }
// // };
