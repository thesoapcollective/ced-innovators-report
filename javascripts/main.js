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
var setupFundingSection = function() {
  var data = [
    {sector: 'Tech', funding: [
      {type: 'Equity', data: [
        {year: 2015, data: [
          {quarter: 1, value: 52673746},
          {quarter: 2, value: 61778573},
        ]},
        {year: 2014, data: [
          {quarter: 1, value: 146012319},
          {quarter: 2, value: 36084050},
          {quarter: 3, value: 41149158},
          {quarter: 4, value: 38584010},
        ]},
        {year: 2013, data: [
          {quarter: 1, value: 22870224},
          {quarter: 2, value: 24491950},
          {quarter: 3, value: 23744183},
          {quarter: 4, value: 20591746},
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
          {quarter: 1, value: 132076554},
          {quarter: 2, value: 136260374},
        ]},
        {year: 2014, data: [
          {quarter: 1, value: 16176684},
          {quarter: 2, value: 19381452},
          {quarter: 3, value: 38205554},
          {quarter: 4, value: 112992665},
        ]},
        {year: 2013, data: [
          {quarter: 1, value: 48898486},
          {quarter: 2, value: 70867276},
          {quarter: 3, value: 52087558},
          {quarter: 4, value: 51858061},
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
          {quarter: 1, value: 23900000},
          {quarter: 2, value: 10500000},
        ]},
        {year: 2014, data: [
          {quarter: 1, value: 20060810},
          {quarter: 2, value: 3980814},
          {quarter: 3, value: 5300000},
          {quarter: 4, value: 44899700},
        ]},
        {year: 2013, data: [
          {quarter: 1, value: 8963428},
          {quarter: 2, value: 26905988},
          {quarter: 3, value: 1366000},
          {quarter: 4, value: 670000},
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
          {quarter: 1, value: 8547500},
          {quarter: 2, value: 1200000},
        ]},
        {year: 2014, data: [
          {quarter: 1, value: 388000},
          {quarter: 2, value: 7749175},
          {quarter: 3, value: 177600},
          {quarter: 4, value: 1500000},
        ]},
        {year: 2013, data: [
          {quarter: 1, value: 2046400},
          {quarter: 2, value: 0},
          {quarter: 3, value: 499996},
          {quarter: 4, value: 10250000},
        ]},
      ]},
      {type: 'Grants & Awards', data: [
        {year: 2014, value: 1050000},
      ]}
    ]},
  ];

  // Colors
  var dataColors = [
    {name: 'blue', value: '#00dbf9'},
    {name: 'green', value: '#4aaf77'},
    {name: 'red', value: '#ff7662'},
    {name: 'white', value: '#fff'}
  ]
  var colors = d3.scale.ordinal().range(dataColors);

  // Initial svg and pie chart values
  var pieSectionSelector = '#funding .funding-left';
  var $pieSection = $(pieSectionSelector);

  var size = {
    width: $pieSection.width(),
    height: $pieSection.height()
  };
  size.radius = Math.min(size.width, size.height) / 2;

  var pie = d3.layout.pie()
    .value(function(d) {
      var data = d.funding[0].data[0].data;
      var total = data.reduce(function(num, obj) { return num + obj.value }, 0);
      return total;
    })
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
    .data(pie(data)).enter()
    .append('g')
      .attr('class', 'arc')
      .attr('mask', 'url(#pie-mask)');
  arcs.append('path')
    .style('fill', function(d) { return colors(d.data.sector).value; })
    .style('fill-opacity', 0.25)
    .on('mouseover', function(d, i) {
      d3.select(this).transition()
        .duration(250)
        .style('fill-opacity', 0.5);
      d3.select(this.parentNode)
        .attr('mask', '');

      d3.selectAll('.funding-bar').transition()
        .duration(250)
        .style('opacity', function(d, j) { return i === j ? 1 : 0.25; });
    })
    .on('mouseout', function(d, i) {
      d3.select(this).transition()
        .duration(250)
        .style('fill-opacity', 0.25);
      d3.select(this.parentNode)
        .attr('mask', 'url(#pie-mask)');

      d3.selectAll('.funding-bar').transition()
        .duration(250)
        .style('opacity', 1);
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
    .text(data[0].funding[0].data[0].year + ' ' + data[0].funding[0].type + ':')
    .attr('x', 0)
    .attr('y', -80)
    .attr('class', 'pie-title f-inputsans f-thin f-italic fs-h2 text-shadow-large no-pointer-event')
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle')
    .attr('fill-opacity', 0)
    .transition()
      .duration(1000)
      .attr('y', -40)
      .attr('fill-opacity', 1);

  var equityData = data.map(function(obj) { return obj.funding[0].data[0].data; });
  var equityTotal = equityData.reduce(function(num, obj) { return num + obj.reduce(function(num2, obj2) { return num2 + obj2.value}, 0); }, 0);
  g.append('text')
    .text('$' + numeral(equityTotal).format('0,0'))
    .attr('x', 0)
    .attr('y', 0)
    .attr('class', 'pie-title f-adelle f-bold fs-h1 text-shadow-large no-pointer-event')
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle')
    .attr('fill-opacity', 0)
    .transition()
      .duration(1000)
      .attr('y', 40)
      .attr('fill-opacity', 1);

  // Initial svg and bar chart values
  var barSectionSelector = '#funding .funding-right';
  var $barSection = $(barSectionSelector);

  var size = {
    width: $barSection.width(),
    titleHeight: 36,
    barHeight: 36,
    barBottomPadding: 36
  };

  var barTotals = data.map(function(obj) {
    var data = obj.funding[0].data[0].data;
    var total = data.reduce(function(num, obj) { return num + obj.value; }, 0);
    return total;
  });

  var x = d3.scale.linear()
    .domain([0, d3.max(barTotals)])
    .range([0, size.width]);

  var chart = d3.select(barSectionSelector)
    .append('svg')
      .attr('width', size.width)
      .attr('height', (size.barHeight + size.titleHeight + size.barBottomPadding) * data.length);

  var chartDefs = chart.append('defs')

  // Gradients
  dataColors.forEach(function(color) {
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
      .attr('transform', function(d, i) { return 'translate(0,' + ((size.barHeight + size.titleHeight + size.barBottomPadding) * i) + ')'; })
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
    .text(function(d) { return d.sector; })
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
      .attr('width', function(d) {
        var data = d.funding[0].data[0].data;
        var total = data.reduce(function(num, obj) { return num + obj.value; }, 0);
        return x(total);
      })

  bar.append('text')
    .text(function(d) {
      var data = d.funding[0].data[0].data;
      var total = data.reduce(function(num, obj) { return num + obj.value; }, 0);
      return '$' + numeral(total).format('0,0');
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
};
