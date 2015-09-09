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
    {sector: 'Tech', value: 114452319},
    {sector: 'Life Science', value: 268336928},
    {sector: 'Advanced Manufacturing & Materials', value: 34400000},
    {sector: 'Cleantech', value: 9747500}
  ];

  var dataColors = [
    {name: 'blue', value: '#00dbf9'},
    {name: 'green', value: '#4aaf77'},
    {name: 'red', value: '#ff7662'},
    {name: 'white', value: '#fff'}
  ]

  var colors = d3.scale.ordinal().range(dataColors);

  var pieSelector = '#funding .funding-left'
  var $pieSection = $(pieSelector)
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

  var svg = d3.select(pieSelector)
    .append('svg')
      .attr('width', size.width)
      .attr('height', size.height);

  // Gradients
  var defs = svg.append('defs');
  dataColors.forEach(function(color) {
    var gradient = defs.append('linearGradient')
      .attr('id', color.name + '-gradient')
      .attr('gradientTransform', 'rotate(45)');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', color.value)
      .attr('stop-opacity', 0.1);

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', color.value)
      .attr('stop-opacity', 1);
  });

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
    .attr('transform', 'translate(' + size.radius + ',' + size.radius + ')')
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

  // Gradient strokes
  var outerArcs = g.selectAll('.outer-arc')
    .data(pie(data)).enter()
    .append('g')
      .attr('class', 'outer-arc');
  outerArcs.append('path')
    .style('fill', function(d) { return colors(d.data.sector).value; })//function(d) { return 'url(#' + colors(d.data.sector).name + '-gradient)'; })
    .transition()
      .duration(1000)
      .attrTween('d', function(d) {
        var i = d3.interpolate(d.startAngle, d.endAngle);
        // var gradients = defs.selectAll('linearGradient');

        // for (var j = 0; j < data.length; j++) {
        //   if (data[j].sector === d.data.sector) {
        //     var gradient = gradients[0][j];
        //     var radians = d.endAngle - d.startAngle;
        //     var degrees = radians * 180 / Math.PI;

        //     console.log(d);
        //     console.log(radians);
        //     console.log(degrees);
        //     d3.select(gradient).attr('gradientTransform', 'rotate(' + degrees + ')');
        //   }
        // }

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
    .style('fill-opacity', '0.25')
    .on('mouseover', function(d) {
      d3.select(this).transition()
        .duration(250)
        .style('fill-opacity', '0.5');
      d3.select(this.parentNode)
        .attr('mask', '');
    })
    .on('mouseout', function(d) {
      d3.select(this).transition()
        .duration(250)
        .style('fill-opacity', '0.25');
      d3.select(this.parentNode)
        .attr('mask', 'url(#pie-mask)');
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

  // arcs.append('text')
  //   .attr('transform', function(d) { return 'translate(' + arc.centroid(d) + ')'; })
  //   .attr('dy', '.35em')
  //   .style('text-anchor', 'middle')
  //   .text(function(d) { return d.data.sector; });
};
