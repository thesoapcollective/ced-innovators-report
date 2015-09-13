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
  refreshFilterBars();

  setTimeout(setupFundingSection, 500);
  setupFundersSection();
  setupDealsSection();
  setupExitsSection();
});

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

  // Header
  $('.social-list-item .icons-facebook').attr('href', 'http://www.facebook.com/share.php?u=' + url);

  // Share box
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
    var triggerWidth = $trigger.outerWidth(true) + 5;
    var dropdownWidth = $dropdown.outerWidth(true) + triggerArrowWidth + 5;

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

var refreshFilterBars = function() {
  refreshFundingFilterBar();
  refreshFundersFilterBar();
};

var refreshFundingFilterBar = function() {
  var $yearDropdown = $('.js-funding-year-dropdown');
  var yearTitle = $('.js-funding-filter-year[data-year="' + fundingFilter.year + '"]').text();
  $('.dropdown-current', $yearDropdown).text(yearTitle);
  $('.dis-n', $yearDropdown).removeClass('dis-n');

  var $typeDropdown = $('.js-funding-type-dropdown');
  var typeTitle = $('.js-funding-filter-type[data-type="' + fundingFilter.type + '"]').text();
  $('.dropdown-current', $typeDropdown).text(typeTitle);
  $('.dis-n', $typeDropdown).removeClass('dis-n');

  hideCurrentFilterSelection();
};

var refreshFundersFilterBar = function() {
  var $sectorDropdown = $('.js-funders-sector-dropdown');
  var sectorTitle = $('.js-funders-filter-sector[data-sector="' + fundersFilter.sector + '"]').text();
  $('.dropdown-current', $sectorDropdown).text(sectorTitle);
  $('.dis-n', $sectorDropdown).removeClass('dis-n');

  hideCurrentFilterSelection();
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

  $('.js-dropdown.is-active').removeClass('is-active');
};

// ========================================
// HELPERS
// ========================================
var cedDataColors = [
  {name: 'blue', value: '#00dbf9'},
  {name: 'green', value: '#4aaf77'},
  {name: 'red', value: '#ff7662'},
  {name: 'white', value: '#fff'}
];
var cedPatternStrokeSize = 3;

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

var convertToDollars = function(int) {
  return '$' + numeral(int).format('0,0');
};

var getSectorColorClass = function(sector) {
  switch (sector) {
    case 'Tech':
      return 'color-blue';
    case 'Life Science':
      return 'color-green';
    case 'Advanced Manufacturing & Materials':
      return 'color-red';
    case 'Cleantech':
    default:
      return 'color-light-gray';
  };
};

var getSectorBorderColorClass = function(sector) {
  switch (sector) {
    case 'Tech':
      return 'border-color-blue';
    case 'Life Science':
      return 'border-color-green';
    case 'Advanced Manufacturing & Materials':
      return 'border-color-red';
    case 'Cleantech':
    default:
      return 'border-color-light-gray';
  };
};

var getSectorColor = function(sector) {
  switch(sector) {
    case 'Tech':
      return cedDataColors.find(function(d) { return d.name === 'blue'; });
    case 'Life Science':
      return cedDataColors.find(function(d) { return d.name === 'green'; });
    case 'Advanced Manufacturing & Materials':
      return cedDataColors.find(function(d) { return d.name === 'red'; });
    case 'Cleantech':
      return cedDataColors.find(function(d) { return d.name === 'white'; });
    default:
      return {name: 'default', value: '#000'};
  }
};

var createLinePattern = function(defs) {
  var pattern = defs.append('pattern')
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('width', '4')
    .attr('height', '3')
  pattern.append('path')
    .attr('d', 'M0,0 L4,0')
    .attr('stroke', '#000')
    .attr('stroke-width', cedPatternStrokeSize);
  return pattern;
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

var fundingFilter = {
  sector: 'All',
  type: 'All',
  year: 2015,
  quarter: 'All',
};

var setupFundingSection = function() {
  // var data = getFundingPieSliceData();
  var data = getFundingPieData();
  // console.log(data)

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
    .text(convertToDollars(equityTotal))
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
    .attr('class', 'funding-bar-bg')
    .attr('width', 0)
    .attr('height', size.barHeight)
    .attr('y', size.titleHeight)
    .attr('fill', function(d) { return 'url(#' + colors(d.sector).name + '-gradient)'; })
    .transition()
      .duration(1000)
      .delay(function(d, i) { return i * 150; })
      .attr('width', function(d) { return x(d.value); })

  bar.append('text')
    .text(function(d) { return convertToDollars(d.value); })
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

    refreshFundingFilterBar();
    updateFundingSection(newData);
  });

  $('.js-funding-filter-type').click(function(event) {
    var type = $(this).attr('data-type');
    fundingFilter.type = type;
    var newData = getFundingPieData();

    refreshFundingFilterBar();
    updateFundingSection(newData);
  });

  var updateFundingSection = function(newData) {
    var total = newData.reduce(function(num, d) { return num + d.value; }, 0);
    var isEmpty = total === 0;

    if (isEmpty) {
      pieData = newData.map(function(d) {
        return {
          sector: d.sector,
          value: 1
        };
      });
    } else {
      pieData = newData;
    }

    d3.selectAll('.arc path').data(pie(pieData))
      .transition()
        .duration(1000)
        .attrTween('d', function(d) {
          var i = d3.interpolate(this._current, d);
          this._current = i(0);
          return function(t) {
            return arc(i(t));
          };
        });

    d3.selectAll('.outer-arc path').data(pie(pieData))
      .transition()
        .duration(1000)
        .attrTween('d', function(d) {
          var i = d3.interpolate(this._current, d);
          this._current = i(0);
          return function(t) {
            return outerArc(i(t));
          };
        });

    d3.selectAll('.pattern-arc path').data(pie(pieData))
      .transition()
        .duration(1000)
        .attrTween('d', function(d) {
          var i = d3.interpolate(this._current, d);
          this._current = i(0);
          return function(t) {
            return arc(i(t));
          };
        });

    d3.select('.funding-pie-title')
      .transition()
        .duration(500)
        .attr('fill-opacity', 0)
      .transition()
        .duration(500)
        .delay(1000)
        .text(getFundingPieTitle())
        .attr('fill-opacity', 1);
    d3.select('.funding-pie-subtitle')
      .transition()
        .duration(500)
        .attr('fill-opacity', 0)
      .transition()
        .duration(500)
        .delay(1000)
        .text(convertToDollars(total))
        .attr('fill-opacity', 1);

    d3.selectAll('.funding-bar-bg').data(newData)
      .transition()
        .duration(1000)
        .delay(function(d, i) { return i * 150; })
        .attr('width', function(d) { return x(d.value); });

    d3.selectAll('.funding-bar-text').data(newData)
      .transition()
        .duration(500)
        .attr('fill-opacity', 0)
      .transition()
        .duration(500)
        .delay(1000)
        .text(function(d) { return convertToDollars(d.value); })
        .attr('fill-opacity', 1);
  };
};

var getFundingPieTitle = function() {
  var str = fundingFilter.year;
  if (fundingFilter.type === 'All') {
    str += ' Equity + Grants & Awards:'
  } else {
    str += ' ' + fundingFilter.type + ':'
  }
  return str;
};

var getFundingPieData = function() {
  if (fundingFilter.type === 'All') {
    return filterFundingByYear();
  }
  return filterFundingByTypeAndYear();
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
};

var filterFundingByTypeAndYear = function() {
  return cedData.map(function(data) {
    var filteredData = {sector: data.sector};
    var type = data.funding.find(function(d) { return d.type === fundingFilter.type });
    filteredData.value = type.data.reduce(function(num2, year) {
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
    return filteredData;
  });
};





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







// ========================================
// FUNDERS SECTION
// ========================================
var cedMapData = null;
var cedMapInvestorData = null;
var mapData = null;
var activeMapRegion = null;
var activeMapState = null;
var mapSectionSelector = '.funders-container';
var $mapSection = null;
var mapSize = null;
var mapPath = null;
var mapGroup = null;
var mapProjection = null;

var fundersFilter = {
  sector: 'All'
};

var setupFundersSection = function() {
  activeMapRegion = d3.select(null);
  activeMapState = d3.select(null);
  $mapSection = $(mapSectionSelector);

  mapSize = {
    width: $mapSection.width(),
    height: $mapSection.height(),
    strokeWidth: 2,
  };

  mapProjection = d3.geo.albersUsa();
  mapSize.scale = mapProjection.scale();
  mapPath = d3.geo.path().projection(mapProjection);

  var svg = d3.select(mapSectionSelector).append('svg')
    .attr('width', mapSize.width)
    .attr('height', mapSize.height);
  svg.append('rect')
    .attr('class', 'map-background')
    .attr('width', mapSize.width)
    .attr('height', mapSize.height)
    .attr('fill-opacity', 0)
    .on('click', mapZoomOut);

  var defs = svg.append('defs');
  var pattern = createLinePattern(defs).attr('id', 'map-pattern');

  mapGroup = svg.append('g')
    .attr('fill', 'none')
    .style('stroke', '#fff')
    .style('stroke-opacity', 0.5)
    .style('stroke-linecap', 'round')
    .style('stroke-linejoin', 'round')
    .style('stroke-width', mapSize.strokeWidth);

  d3.csv('./data/deals.csv', function(d) {
    return {
      state: d['State'],
      region: d['Region'],
      sectors: [
        {name: 'Tech', value: +d['Tech']},
        {name: 'Life Science', value: +d['Life Science']},
        {name: 'Advanced Manufacturing & Materials', value: +d['Advanced M&M']},
        {name: 'Cleantech', value: +d['Cleantech']},
      ],
      types: [
        {name: 'VC', value: +d['VC']},
        {name: 'Corporate', value: +d['Corporate']},
        {name: 'Angel Group', value: +d['Angel Group']},
        {name: 'Growth', value: +d['Growth']},
        {name: 'Strategic', value: +d['Strategic']},
        {name: 'Grant', value: +d['Grant']},
        {name: 'Award', value: +d['Award']},
      ],
    };
  }, function(error, data) {
    cedMapData = data;
    d3.csv('./data/deals_investors.csv', function(d) {
      return {
        name: d['Funder'],
        state: d['Billing State/Province'],
        type: d['Type'],
        sectors: [
          {name: 'Tech', value: +d['Tech']},
          {name: 'Life Science', value: +d['Life Science']},
          {name: 'Advanced Manufacturing & Materials', value: +d['AM&M']},
          {name: 'Cleantech', value: +d['Cleantech']},
        ],
      };
    }, function(error, investorsData) {
      cedMapInvestorData = investorsData;
      d3.tsv('./data/us-state-names.tsv', function(error, stateNames) {
        d3.json('./data/us.json', function(error, us) {
          mapData = topojson.feature(us, us.objects.states).features;
          mapData.forEach(function(d) {
            var stateData = stateNames.find(function(state) { return +state.id === d.id; });
            if (stateData) {
              d.properties.code = stateData.code;
              d.properties.name = stateData.name;
            }
          });

          var stateGroups = mapGroup.selectAll('g')
            .data(mapData).enter()
            .append('g')
              .attr('class', 'state-group');
          stateGroups.append('path')
            .attr('d', mapPath)
            .attr('class', 'state-pattern')
            .style('fill', 'url(#map-pattern)');
          stateGroups.append('path')
            .attr('d', mapPath)
            .attr('class', 'state-section')
            .attr('data-region', function(d) { return getStateRegion(d.properties); })
            .attr('data-state', function(d) { return d.properties.code; })
            .attr('fill', function(d) {
              var region = getStateRegion(d.properties);
              if (region) {
                var sector = getRegionSectorWithMostDeals(region);
                return getSectorColor(sector.name).value;
              } else if (stateHasDeals(d.properties)) {
                var sector = getStateSectorWithMostDeals(d.properties);
                return getSectorColor(sector.name).value;
              }
              return '#000'
            })
            .attr('fill-opacity', function(d) { return stateHasDeals(d.properties) ? 0.25 : 0; })
            .on('mouseover', function(d, i) {
              if (stateHasDeals(d.properties)) {
                var region = getStateRegion(d.properties);
                if (region) {
                  d3.selectAll('.state-section[data-region="' + region + '"]')
                    .transition()
                      .duration(250)
                      .attr('fill-opacity', function(d) { return stateHasDeals(d.properties) ? 0.5 : 0; });
                } else {
                  d3.select(this)
                    .transition()
                      .duration(250)
                      .attr('fill-opacity', function(d) { return stateHasDeals(d.properties) ? 0.5 : 0; });
                }
              }
            })
            .on('mouseout', function(d, i) {
              if (stateHasDeals(d.properties)) {
                var region = getStateRegion(d.properties);
                if (region) {
                  d3.selectAll('.state-section[data-region="' + region + '"]')
                    .transition()
                      .duration(250)
                      .attr('fill-opacity', function(d) { return stateHasDeals(d.properties) ? 0.25 : 0; });
                } else {
                  d3.select(this)
                    .transition()
                      .duration(250)
                      .attr('fill-opacity', function(d) { return stateHasDeals(d.properties) ? 0.25 : 0; });
                }
              }
            })
            .on('click', mapClicked);

          stateGroups.append('text')
            .text(function(d) {
              if (stateHasDeals(d.properties)) {
                return getStateTotal(d.properties);
              }
            })
            .attr('x', function(d) {
              var centroid = mapPath.centroid(d);
              return isNaN(centroid[0]) ? -10 : centroid[0];
            })
            .attr('y', function(d) {
              var centroid = mapPath.centroid(d);
              return isNaN(centroid[1]) ? -10 : centroid[1];
            })
            .attr('data-region', function(d) { return getStateRegion(d.properties); })
            .attr('data-state', function(d) { return d.properties.code; })
            .attr('fill', '#fff')
            .attr('fill-opacity', 1)
            .attr('stroke-width', 0)
            .attr('class', 'state-text f-adelle f-bold fs-base text-shadow no-pointer-event')
            .attr('text-anchor', 'middle');

          // var regions = getUsRegions();
          // regions.forEach(function(region) {
          //   var states = getStatesByRegion(region);
          //   var centroids = [];
          //   mapGroup.append('text')
          //     .text(function() { return getRegionTotal(region); })
          //     .attr('x', function(d) {
          //       var bounds = states.map(function(s) {
          //         var state = mapData.find(function(md) { return md.properties.code === s.state; });
          //         return mapPath.bounds(state);
          //       });
          //       var tops = bounds.map(function(b) { return b[0][1]; });
          //       var bottoms = bounds.map(function(b) { return b[1][1]; });
          //       var lefts = bounds.map(function(b) { return b[0][0]; });
          //       var rights = bounds.map(function(b) { return b[1][0]; });
          //       var topBound = Math.min.apply(null, tops);
          //       var bottomBound = Math.max.apply(null, bottoms);
          //       var leftBound = Math.min.apply(null, lefts);
          //       var rightBound = Math.max.apply(null, rights);

          //       console.log('lefts', lefts)
          //       console.log('rights', rights)

          //       return lefts.reduce(function(num, left) { return num + left; }, 0) / lefts.length;
          //       return (leftBound + rightBound) / 2;


          //       states.forEach(function(state) {
          //         var mapState = mapData.find(function(d) { return d.properties.code === state.state; });
          //         centroids.push(mapPath.centroid(mapState));
          //       });
          //       var x = centroids.reduce(function(num, centroid) {
          //         var total = num;
          //         if (!isNaN(centroid[0])) {
          //           total += centroid[0];
          //           centroidsCount++;
          //         }
          //         return total;
          //       }, 0);
          //       return x / centroids.length;
          //     })
          //     .attr('y', function(d) {
          //       var bounds = states.map(function(s) {
          //         var state = mapData.find(function(md) { return md.properties.code === s.state; });
          //         return mapPath.bounds(state);
          //       });
          //       var tops = bounds.map(function(b) { return b[0][1]; });
          //       var bottoms = bounds.map(function(b) { return b[1][1]; });
          //       var lefts = bounds.map(function(b) { return b[0][0]; });
          //       var rights = bounds.map(function(b) { return b[1][0]; });
          //       var topBound = Math.min.apply(null, tops);
          //       var bottomBound = Math.max.apply(null, bottoms);
          //       var leftBound = Math.min.apply(null, lefts);
          //       var rightBound = Math.max.apply(null, rights);


          //       // return (topBound + bottomBound) / 2;


          //       var y = centroids.reduce(function(num, centroid) {
          //         var total = num;
          //         if (!isNaN(centroid[1])) {
          //           total += centroid[1];
          //         }
          //         return total;
          //       }, 0);
          //       return 50;//y / centroids.length;
          //     })
          //     // .attr('data-region', function(d) { return getStateRegion(d.properties); })
          //     // .attr('data-state', function(d) { return d.properties.code; })
          //     .attr('fill', '#fff')
          //     .attr('fill-opacity', 1)
          //     .attr('stroke-width', 0)
          //     .attr('class', 'region-text f-adelle f-bold fs-base text-shadow no-pointer-event')
          //     .attr('text-anchor', 'middle');
          // });

          // var mapDatum = topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; });
          // var mapMesh = mapGroup.append('path')
          //   .datum(mapDatum)
          //   .attr('class', 'map-mesh')
          //   .attr('d', mapPath);

          redrawMap();

          // Filtering
          $('.js-funders-filter-sector').click(function(event) {
            var sector = $(this).attr('data-sector');
            fundersFilter.sector = sector;

            refreshFundersFilterBar();
            updateFundersSection();
          });
        });
      });
    });
  });
};

var updateFundersSection = function() {
  mapReset();

  var stateGroups = mapGroup.selectAll('.state-group');

  stateGroups.selectAll('.state-section').transition()
    .duration(500)
    .attr('fill', function(d) {
      var region = getStateRegion(d.properties);
      if (region) {
        if (fundersFilter.sector === 'All') {
          var sector = getRegionSectorWithMostDeals(region);
          return getSectorColor(sector.name).value;
        }
        return getSectorColor(fundersFilter.sector).value;
      } else if (stateHasDeals(d.properties)) {
        if (fundersFilter.sector === 'All') {
          var sector = getStateSectorWithMostDeals(d.properties);
          return getSectorColor(sector.name).value;
        }
        return getSectorColor(fundersFilter.sector).value;
      }
      return '#000'
    })
    .attr('fill-opacity', function(d) { return stateHasDeals(d.properties) ? 0.25 : 0; })

  stateGroups.selectAll('.state-text')
    .transition()
      .duration(250)
      .attr('fill-opacity', 0)
    .transition()
      .duration(250)
      .text(function(d) {
        if (stateHasDeals(d.properties)) {
          if (fundersFilter.sector === 'All') {
            return getStateTotal(d.properties);
          }
          return getStateSectorTotal(d.properties, fundersFilter.sector);
        }
      })
      .attr('fill-opacity', 1);
};

var redrawMap = function() {
  var projectionSize = mapGroup.node().getBBox();
  var hscale = mapSize.width * mapSize.scale / projectionSize.width;
  var vscale = mapSize.height * mapSize.scale / projectionSize.height;
  var newScale = hscale < vscale ? hscale : vscale;

  mapProjection.scale(newScale).translate([mapSize.width / 2, mapSize.height / 2]);

  mapPath = d3.geo.path().projection(mapProjection);
  d3.selectAll('.state-pattern').attr('d', mapPath)
  d3.selectAll('.state-section').attr('d', mapPath)
  d3.selectAll('.state-text').attr('x', function(d) {
    var centroid = mapPath.centroid(d);
    return isNaN(centroid[0]) ? -10 : centroid[0];
  })
  .attr('y', function(d) {
    var centroid = mapPath.centroid(d);
    return isNaN(centroid[1]) ? -10 : centroid[1];
  });
};

var getUsRegions = function() {
  var regions = [];
  cedMapData.forEach(function(d) {
    if (regions.indexOf(d.region) === -1 &&
      d.region != 'International' &&
      d.region != '') {
      regions.push(d.region);
    }
  });
  return regions;
};

var getRegionTotal = function(region) {
  var states = getStatesByRegion(region);
  states = states.map(function(state) { return state.state; });
  var mappedStates = mapData.filter(function(d) { return states.indexOf(d.properties.code) >= 0; });
  return mappedStates.reduce(function(num, state) { return num + getStateTotal(state.properties); }, 0);
};

var getStateDataByCode = function(code) {
  return cedMapData.find(function(d) { return d.state === code; });
};

var getStateSectorWithMostDeals = function(state) {
  var sector;
  var stateData = getStateDataByCode(state.code);
  if (stateData) {
    stateData.sectors.forEach(function(s) {
      if (typeof sector === 'undefined' || s.value > sector.value) {
        sector = s;
      }
    });
  }
  return sector;
};

var getStateTotal = function(state) {
  var stateData = getStateDataByCode(state.code);
  if (stateData) {
    return stateData.sectors.reduce(function(num, sector) { return num + sector.value; }, 0);
  }
  return 0;
};

var getStateSectorTotal = function(state, sector) {
  var stateData = getStateDataByCode(state.code);
  if (stateData) {
    var filteredSector = stateData.sectors.find(function(s) { return s.name === sector; });
    if (filteredSector) {
      return filteredSector.value;
    }
  }
  return 0;
};

var getStatesByRegion = function(region) {
  var states = cedMapData.filter(function(state) { return state.region === region; });
  states = states.filter(function(s) {
    var mapState = mapData.find(function(md) { return md.properties.code === s.state; });
    return mapState && stateHasDeals(mapState.properties);
  });
  return states;
};

var getStateRegion = function(state) {
  var stateData = getStateDataByCode(state.code);
  if (stateData) {
    return stateData.region;
  }
};

var getRegionSectorWithMostDeals = function(region) {
  var aggregatedSectors = [];
  var states = getStatesByRegion(region);
  states.forEach(function(state) {
    state.sectors.forEach(function(s) {
      var sector = aggregatedSectors.find(function(d) { return d.name === s.name; });
      if (typeof sector === 'undefined') {
        sector = {name: s.name, value: 0};
        aggregatedSectors.push(sector);
      }
      sector.value += s.value;
    });
  });
  var sector;
  aggregatedSectors.forEach(function(s) {
    if (typeof sector === 'undefined' || s.value > sector.value) {
      sector = s;
    }
  });
  return sector;
};

var stateHasDeals = function(state) {
  var total = 0;
  if (fundersFilter.sector === 'All') {
    total = getStateTotal(state);
  } else {
    total = getStateSectorTotal(state, fundersFilter.sector);
  }
  return total > 0;
};

var getInvestorTotal = function(state) {
  var investors = cedMapInvestorData.filter(function(d) { return d.state === state.code; });
  return investors.length;
};

var mapClicked = function(d) {
  if (activeMapState.node() === this || !stateHasDeals(d.properties)) {
    return mapZoomOut(this, d);
  }

  var clickedElement = d3.select(this);
  var region = clickedElement.attr('data-region');

  if (region !== '' && (activeMapRegion.node() === null || !isCurrentRegion(region))) {
    d3.selectAll('.state-text').transition()
      .duration(750)
      .attr('fill-opacity', 0);
    mapZoomToRegion(this, d, region);
  } else {
    if (!isCurrentRegion(region)) {
      d3.selectAll('.state-text').transition()
        .duration(750)
        .attr('fill-opacity', 0);
      activeMapRegion = d3.select(null);
    }
    mapZoomToState(this, d);
  }
};

var isCurrentRegion = function(region) {
  if (activeMapRegion.node() !== null) {
    return activeMapRegion.attr('data-region') === region;
  }
  return false;
}

var mapZoomToRegion = function(node, d, region) {
  $('.js-funders-state-info').addClass('no-pointer-event').removeClass('is-active');
  activeMapState = d3.select(null);
  activeMapRegion = d3.select(node);
  var states = getStatesByRegion(region);
  if (states.length === 1) {
    activeMapRegion = d3.select(null);
    mapZoomToState(node, d);
    return;
  }
  var bounds = states.map(function(s) {
    var state = mapData.find(function(md) { return md.properties.code === s.state; });
    return mapPath.bounds(state);
  });
  var tops = bounds.map(function(b) { return b[0][1]; });
  var bottoms = bounds.map(function(b) { return b[1][1]; });
  var lefts = bounds.map(function(b) { return b[0][0]; });
  var rights = bounds.map(function(b) { return b[1][0]; });
  var topBound = Math.min.apply(null, tops);
  var bottomBound = Math.max.apply(null, bottoms);
  var leftBound = Math.min.apply(null, lefts);
  var rightBound = Math.max.apply(null, rights);
  var dx = rightBound - leftBound;
  var dy = bottomBound - topBound;
  var x = (leftBound + rightBound) / 2;
  var y = (topBound + bottomBound) / 2;
  var scale = .75 / Math.max(dx / mapSize.width, dy / mapSize.height);
  var translate = [mapSize.width / 2 - scale * x, mapSize.height / 2 - scale * y];

  mapGroup.transition()
    .duration(750)
    .style('stroke-width', mapSize.strokeWidth / scale)
    .attr('transform', 'translate(' + translate + ')scale(' + scale + ')');

  d3.select('#map-pattern path').transition()
    .duration(750)
    .attr('stroke-width', 2.5);

  d3.selectAll('.state-text').transition()
    .duration(750)
    .attr('fill-opacity', function() {
      return $(this).attr('data-region') === region ? 1 : 0;
    })
    .style('font-size', '14px');
};

var mapZoomToState = function(node, d) {
  activeMapState = d3.select(node);
  var bounds = mapPath.bounds(d);
  var dx = bounds[1][0] - bounds[0][0];
  var dy = bounds[1][1] - bounds[0][1];
  var x = (bounds[0][0] + bounds[1][0]) / 2;
  var y = (bounds[0][1] + bounds[1][1]) / 2;
  var scale = .75 / Math.max(dx / mapSize.width, dy / mapSize.height);
  var translate = [mapSize.width / 2 - scale * x - mapSize.width / 4, mapSize.height / 2 - scale * y];

  mapGroup.transition()
    .duration(750)
    .style('stroke-width', mapSize.strokeWidth / scale)
    .attr('transform', 'translate(' + translate + ')scale(' + scale + ')');

  d3.select('#map-pattern path').transition()
    .duration(750)
    .attr('stroke-width', 2);

  d3.select('.state-text[data-state="' + d.properties.code + '"]').transition()
    .duration(750)
    .attr('fill-opacity', 1)
    .style('font-size', function() { return scale > 5 ? '10px' : '14px'});

  $('.js-funders-state-info').addClass('is-active').removeClass('no-pointer-event');
  $('.js-funders-state-info-title').text(d.properties.name);
  $('.js-funders-state-info-investors').text(getInvestorTotal(d.properties));
  $('.js-funders-state-info-tech').text(getStateSectorTotal(d.properties, 'Tech'));
  $('.js-funders-state-info-lifescience').text(getStateSectorTotal(d.properties, 'Life Science'));
  $('.js-funders-state-info-amm').text(getStateSectorTotal(d.properties, 'Advanced Manufacturing & Materials'));
  $('.js-funders-state-info-cleantech').text(getStateSectorTotal(d.properties, 'Cleantech'));
};

var mapZoomOut = function(node, d) {
  if (activeMapRegion.node() !== null && activeMapState.node() !== null) {
    activeMapState = d3.select(null);
    var region = activeMapRegion.attr('data-region');
    mapZoomToRegion(node, d, region);
  } else {
    mapReset();
  }
};

var mapReset = function() {
  activeMapRegion = d3.select(null);
  activeMapState = d3.select(null);

  mapGroup.transition()
    .duration(750)
    .style('stroke-width', mapSize.strokeWidth)
    .attr('transform', '');

  d3.select('#map-pattern path').transition()
    .duration(750)
    .attr('stroke-width', cedPatternStrokeSize);

  d3.selectAll('.state-text').transition()
    .duration(750)
    .style('font-size', '18px')
    .attr('fill-opacity', 1);

  $('.js-funders-state-info').addClass('no-pointer-event').removeClass('is-active');
};

// ========================================
// DEALS SECTION
// ========================================
var cedDealsData = [
  {sector: 'Tech', deals: 48, companies: 46},
  {sector: 'Life Science', deals: 26, companies: 26},
  {sector: 'Advanced Manufacturing & Materials', deals: 10, companies: 9},
  {sector: 'Cleantech', deals: 6, companies: 4},
];

var setupDealsSection = function() {
  var dealsSectionSelector = '.deals-container';
  var $dealsSection = $(dealsSectionSelector);

  var size = {
    width: $dealsSection.width(),
    height: $dealsSection.height()
  };

  var svg = d3.select(dealsSectionSelector).append('svg')
    .attr('width', size.width)
    .attr('height', size.height);

  var defs = svg.append('defs');

  var pattern = defs.append('pattern')
    .attr('id', 'deals-pattern')
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('width', '4')
    .attr('height', '3')
  pattern.append('path')
    .attr('d', 'M0,0 L4,0 M0,1 L4,1')
    .attr('stroke', '#000')
    .attr('stroke-width', 1);

  var dealsGroup = svg.append('g');

  var mainCircleGroup = dealsGroup.append('g')

  var mainCircle = mainCircleGroup.append('circle')
    .attr('cx', size.width / 2)
    .attr('cy', size.height / 2)
    .attr('r', 150)
    .attr('stroke', '#fff')
    .attr('stroke-width', 2)
    .attr('stroke-opacity', 0.25)
    .style('fill', 'url(#map-pattern)');
  mainCircleGroup.append('text')
    .text('Total # of Deals:')
    .attr('x', parseFloat(mainCircle.attr('cx')))
    .attr('y', parseFloat(mainCircle.attr('cy')) - 50)
    .attr('dy', '.35em')
    .attr('class', 'f-inputsans f-thin f-italic fs-h3 text-shadow-large')
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle');
  mainCircleGroup.append('text')
    .text(cedDealsData.reduce(function(num, deal) { return num + deal.deals}, 0))
    .attr('x', parseFloat(mainCircle.attr('cx')))
    .attr('y', parseFloat(mainCircle.attr('cy')))
    .attr('dy', '.35em')
    .attr('class', 'f-adelle f-bold fs-h1 text-shadow-large')
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle');
  mainCircleGroup.append('text')
    .text('Companies:')
    .attr('x', parseFloat(mainCircle.attr('cx')) - 90)
    .attr('y', parseFloat(mainCircle.attr('cy')) + 65)
    .attr('dy', '.35em')
    .attr('class', 'f-inputsans f-thin f-italic fs-h3 text-shadow-large')
    .attr('fill', '#fff');
  mainCircleGroup.append('text')
    .text(cedDealsData.reduce(function(num, deal) { return num + deal.companies}, 0))
    .attr('x', parseFloat(mainCircle.attr('cx')) + 55)
    .attr('y', parseFloat(mainCircle.attr('cy')) + 65)
    .attr('dy', '.35em')
    .attr('class', 'f-adelle f-bold fs-h3 text-shadow-large')
    .attr('fill', '#fff');

  var circle1Group = dealsGroup.append('g')
  circle1Group.append('circle')
    .attr('cx', 100)
    .attr('cy', 110)
    .attr('r', 100)
    .attr('stroke', '#fff')
    .attr('stroke-width', 2)
    .attr('stroke-opacity', 0.25)
    .style('fill', 'url(#deals-pattern)');
  var circle1 = circle1Group.append('circle')
    .attr('cx', 100)
    .attr('cy', 110)
    .attr('r', 100)
    .attr('stroke', getSectorColor('Tech').value)
    .attr('stroke-width', 2)
    .attr('stroke-opacity', 0.25)
    .attr('fill', getSectorColor('Tech').value)
    .attr('fill-opacity', 0.25);
  circle1Group.append('text')
    .text('Tech Deals:')
    .attr('x', parseFloat(circle1.attr('cx')))
    .attr('y', parseFloat(circle1.attr('cy')) - 40)
    .attr('dy', '.35em')
    .attr('class', 'f-inputsans f-thin f-italic text-shadow-large')
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle');
  circle1Group.append('text')
    .text(cedDealsData.find(function(sector) { return sector.sector === 'Tech'; }).deals)
    .attr('x', parseFloat(circle1.attr('cx')))
    .attr('y', parseFloat(circle1.attr('cy')))
    .attr('dy', '.35em')
    .attr('class', 'f-adelle f-bold fs-h2 text-shadow-large')
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle');
  circle1Group.append('text')
    .text('Companies:')
    .attr('x', parseFloat(circle1.attr('cx')) - 70)
    .attr('y', parseFloat(circle1.attr('cy')) + 40)
    .attr('dy', '.35em')
    .attr('class', 'f-inputsans f-thin f-italic text-shadow-large')
    .attr('fill', '#fff');
  circle1Group.append('text')
    .text(cedDealsData.find(function(sector) { return sector.sector === 'Tech'; }).companies)
    .attr('x', parseFloat(circle1.attr('cx')) + 40)
    .attr('y', parseFloat(circle1.attr('cy')) + 40)
    .attr('dy', '.35em')
    .attr('class', 'f-adelle f-bold text-shadow-large')
    .attr('fill', '#fff');

  var circle2Group = dealsGroup.append('g')
  circle2Group.append('circle')
    .attr('cx', 275)
    .attr('cy', size.height - 75)
    .attr('r', 75)
    .attr('stroke', '#fff')
    .attr('stroke-width', 2)
    .attr('stroke-opacity', 0.25)
    .style('fill', 'url(#deals-pattern)');
  var circle1 = circle2Group.append('circle')
    .attr('cx', 275)
    .attr('cy', size.height - 75)
    .attr('r', 75)
    .attr('stroke', getSectorColor('Life Science').value)
    .attr('stroke-width', 2)
    .attr('stroke-opacity', 0.25)
    .attr('fill', getSectorColor('Life Science').value)
    .attr('fill-opacity', 0.25);
  circle2Group.append('text')
    .text('Life Science Deals:')
    .attr('x', parseFloat(circle1.attr('cx')))
    .attr('y', parseFloat(circle1.attr('cy')) - 40)
    .attr('dy', '.35em')
    .attr('class', 'f-inputsans f-thin f-italic text-shadow-large')
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle');
  circle2Group.append('text')
    .text(cedDealsData.find(function(sector) { return sector.sector === 'Life Science'; }).deals)
    .attr('x', parseFloat(circle1.attr('cx')))
    .attr('y', parseFloat(circle1.attr('cy')))
    .attr('dy', '.35em')
    .attr('class', 'f-adelle f-bold fs-h2 text-shadow-large')
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle');
  circle2Group.append('text')
    .text('Companies:')
    .attr('x', parseFloat(circle1.attr('cx')) - 70)
    .attr('y', parseFloat(circle1.attr('cy')) + 40)
    .attr('dy', '.35em')
    .attr('class', 'f-inputsans f-thin f-italic text-shadow-large')
    .attr('fill', '#fff');
  circle2Group.append('text')
    .text(cedDealsData.find(function(sector) { return sector.sector === 'Life Science'; }).companies)
    .attr('x', parseFloat(circle1.attr('cx')) + 40)
    .attr('y', parseFloat(circle1.attr('cy')) + 40)
    .attr('dy', '.35em')
    .attr('class', 'f-adelle f-bold text-shadow-large')
    .attr('fill', '#fff');

  var circle3Group = dealsGroup.append('g')
  circle3Group.append('circle')
    .attr('cx', size.width / 2 + 300)
    .attr('cy', 95)
    .attr('r', 90)
    .attr('stroke', '#fff')
    .attr('stroke-width', 2)
    .attr('stroke-opacity', 0.25)
    .style('fill', 'url(#deals-pattern)');
  var circle1 = circle3Group.append('circle')
    .attr('cx', size.width / 2 + 300)
    .attr('cy', 95)
    .attr('r', 90)
    .attr('stroke', getSectorColor('Advanced Manufacturing & Materials').value)
    .attr('stroke-width', 2)
    .attr('stroke-opacity', 0.25)
    .attr('fill', getSectorColor('Advanced Manufacturing & Materials').value)
    .attr('fill-opacity', 0.25);
  circle3Group.append('text')
    .text('Advanced Manufacturing & Materials Deals:')
    .attr('x', parseFloat(circle1.attr('cx')))
    .attr('y', parseFloat(circle1.attr('cy')) - 40)
    .attr('dy', '.35em')
    .attr('class', 'f-inputsans f-thin f-italic text-shadow-large')
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle');
  circle3Group.append('text')
    .text(cedDealsData.find(function(sector) { return sector.sector === 'Advanced Manufacturing & Materials'; }).deals)
    .attr('x', parseFloat(circle1.attr('cx')))
    .attr('y', parseFloat(circle1.attr('cy')))
    .attr('dy', '.35em')
    .attr('class', 'f-adelle f-bold fs-h2 text-shadow-large')
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle');
  circle3Group.append('text')
    .text('Companies:')
    .attr('x', parseFloat(circle1.attr('cx')) - 70)
    .attr('y', parseFloat(circle1.attr('cy')) + 40)
    .attr('dy', '.35em')
    .attr('class', 'f-inputsans f-thin f-italic text-shadow-large')
    .attr('fill', '#fff');
  circle3Group.append('text')
    .text(cedDealsData.find(function(sector) { return sector.sector === 'Advanced Manufacturing & Materials'; }).companies)
    .attr('x', parseFloat(circle1.attr('cx')) + 40)
    .attr('y', parseFloat(circle1.attr('cy')) + 40)
    .attr('dy', '.35em')
    .attr('class', 'f-adelle f-bold text-shadow-large')
    .attr('fill', '#fff');

  var circle4Group = dealsGroup.append('g')
  circle4Group.append('circle')
    .attr('cx', size.width - 300)
    .attr('cy', size.height - 150)
    .attr('r', 75)
    .attr('stroke', '#fff')
    .attr('stroke-width', 2)
    .attr('stroke-opacity', 0.25)
    .style('fill', 'url(#deals-pattern)');
  var circle1 = circle4Group.append('circle')
    .attr('cx', size.width - 300)
    .attr('cy', size.height - 150)
    .attr('r', 75)
    .attr('stroke', getSectorColor('Cleantech').value)
    .attr('stroke-width', 2)
    .attr('stroke-opacity', 0.25)
    .attr('fill', getSectorColor('Cleantech').value)
    .attr('fill-opacity', 0.25);
  circle4Group.append('text')
    .text('Cleantech Deals:')
    .attr('x', parseFloat(circle1.attr('cx')))
    .attr('y', parseFloat(circle1.attr('cy')) - 40)
    .attr('dy', '.35em')
    .attr('class', 'f-inputsans f-thin f-italic text-shadow-large')
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle');
  circle4Group.append('text')
    .text(cedDealsData.find(function(sector) { return sector.sector === 'Cleantech'; }).deals)
    .attr('x', parseFloat(circle1.attr('cx')))
    .attr('y', parseFloat(circle1.attr('cy')))
    .attr('dy', '.35em')
    .attr('class', 'f-adelle f-bold fs-h2 text-shadow-large')
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle');
  circle4Group.append('text')
    .text('Companies:')
    .attr('x', parseFloat(circle1.attr('cx')) - 70)
    .attr('y', parseFloat(circle1.attr('cy')) + 40)
    .attr('dy', '.35em')
    .attr('class', 'f-inputsans f-thin f-italic text-shadow-large')
    .attr('fill', '#fff');
  circle4Group.append('text')
    .text(cedDealsData.find(function(sector) { return sector.sector === 'Cleantech'; }).companies)
    .attr('x', parseFloat(circle1.attr('cx')) + 40)
    .attr('y', parseFloat(circle1.attr('cy')) + 40)
    .attr('dy', '.35em')
    .attr('class', 'f-adelle f-bold text-shadow-large')
    .attr('fill', '#fff');
}

// ========================================
// EXITS SECTION
// ========================================
var exitsHoverTimer = null;

var setupExitsSection = function() {
  var source = $('#exits-item-template').html();
  var template = Handlebars.compile(source);

  d3.csv('./data/exits.csv', function(d) {
    return {
      logo: './images/logos/' + d['Logo'],
      company_name: d['Company'],
      short_type: getExitShortType(d['Exit Type']),
      type: d['Exit Type'],
      ticker_label: getExitTickerLabel(d['Exit Type']),
      ticker: d['Acquirer/Merger/Ticker'],
      size: getExitSize(d['Exit Size']),
      sector: d['Sector'],
    };
  }, function(error, data) {
    var $exitsList = $('.exits-list');

    data.forEach(function(d) {
      var $html = $(template(d));
      var colorClass = getSectorColorClass(d.sector);
      var borderColorClass = getSectorBorderColorClass(d.sector);
      $('.exits-type', $html)
        .addClass(colorClass)
        .addClass(borderColorClass);
      $exitsList.append($html);
    });

    $('.exits-ipo-count').text(getExitsIpoCount(data));
    $('.exits-ipo-title').text(getExitsIpoTitle(data));
    $('.exits-ma-count').text(getExitsMaCount(data));
    $('.exits-ma-title').text(getExitsMaTitle(data));

    $('.exits-list-item').mouseenter(function() {
      clearTimeout(exitsHoverTimer);
      $('.exits-list-item.is-active').removeClass('is-active animate-info');

      var $this = $(this);
      $this.addClass('is-active');
      $this.parent().addClass('item-is-active');

      var $info = $('.exits-info', $this);
      var infoWidth = $info.outerWidth();
      var rightPosition = $this.offset().left + $this.outerWidth() + infoWidth;

      $this.removeClass('show-left show-right');
      if (rightPosition >= $win.outerWidth()) {
        $this.addClass('show-left animate-info');
      } else {
        $this.addClass('show-right animate-info');
      }
    });

    $('.exits-list-item').mouseleave(function() {
      var $this = $(this);
      exitsHoverTimer = setTimeout(function() {
        $this.removeClass('is-active animate-info');
        $this.parent().removeClass('item-is-active');
      }, 200);
    });
  });
};

var getExitShortType = function(type) {
  if (type === 'Acquisition' || type === 'Merger') {
    return 'M&A';
  }
  return type;
};

var getExitTickerLabel = function(type) {
  if (type === 'Acquisition') {
    return 'Aquirer';
  } else if (type === 'Merger') {
    return 'Merger';
  }
  return 'Ticker';
};

var getExitSize = function(size) {
  return size === '' ? 'N/A' : convertToDollars(+size);
};

var getExitsIpoCount = function(data) {
  var count = 0;
  data.forEach(function(d) {
    if (d['type'] === 'IPO') {
      count++;
    }
  });
  return count;
};

var getExitsIpoTitle = function(data) {
  return getExitsIpoCount(data) === 0 ? 'IPO' : "IPO's";
};

var getExitsMaCount = function(data) {
  var count = 0;
  data.forEach(function(d) {
    if (d['type'] === 'Acquisition' ||
        d['type'] === 'Merger') {
      count++;
    }
  });
  return count;
};

var getExitsMaTitle = function(data) {
  return getExitsMaCount(data) === 0 ? 'Merger/Aquisition' : 'Mergers/Aquisitions';
};
