var $win = null;
var $body = null;
var $socialTextbox = null;
var $dropdowns = null;
var currentSectionIndex = 0;

var $fundingPieText = null;
var $fundingPieTitle = null;
var $fundingPieSubtitle = null;

var $dealsList = null;

$(document).ready(function() {
  cacheElements();
  setupJsClickHandler();

  setupSocialLinks();
  setupNavigation();

  setupFilters();
  refreshFilterBars();

  setTimeout(setupFundingSection, 500);
  setTimeout(setupFundersSection, 750);
  setTimeout(setupDealsSection, 1000);
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
  var tweet = encodeURIComponent("Check out the #InnovatorsReport created by @CEDNC!");
  $('.social-list-item .icons-twitter').attr('href', 'https://twitter.com/share?text=' + tweet + '&url=' + url);

  // Share box
  var tweetLength = 140 - 18 - 23 - 12; // Tweet base - hastag - url - via/extra space
  $('.share-box-list-item .icons-twitter').each(function(i) {
    var $this = $(this);
    var tweet = $this.closest('.share-box').find('p').text();
    if (tweet.length > tweetLength) {
      tweet = tweet.substring(0, tweetLength - 3) + '...';
    }
    $this.attr('href', 'https://twitter.com/share?text=' + encodeURIComponent(tweet) + '&url=' + url + '&hashtags=InnovatorsReport&via=CEDNC');
  });
};

// ========================================
// NAVIGATION
// ========================================
var setupNavigation = function() {
  $body.panelSnap({
    $menu: $('.nav-list'),
    panelSelector: '.content-section',
    menuSelector: '.nav-list-item a',
    directionThreshold: $win.outerHeight() / 3,
    slideSpeed: 500,
    easing: 'swing',
    onActivate: snappedToSection
  });

  $('.cover-view-report').click(function(event) {
    $('html, body').animate({
      scrollTop: $('.content-section:eq(1)').offset().top
    }, 500);
  });
};

var snappedToSection = function($section) {
  var index = $section.index();
  currentSectionIndex = index;
  selectNavListItem();
  $body.toggleClass('cover-panel-active', index === 0);
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
    var triggerWidth = $trigger.outerWidth(true) + 20;
    var dropdownWidth = $dropdown.outerWidth(true) + triggerArrowWidth + 20;

    if (triggerWidth >= dropdownWidth) {
      $trigger.width(triggerWidth);
      $dropdown.width(triggerWidth);
    } else {
      $trigger.width(dropdownWidth);
      $dropdown.width(dropdownWidth);
    }
  });

  $('.dropdown-trigger').mouseenter(function() {
    var $this = $(this);
    $this.closest('.content-section').addClass('filter-is-active');
    $this.parent().addClass('is-active');
  });

  $('.js-dropdown').mouseleave(function() {
    var $this = $(this);
    $this.closest('.content-section').removeClass('filter-is-active');
    $this.removeClass('is-active');
  });
};

var refreshFilterBars = function() {
  refreshFundingFilterBar();
  refreshFundersFilterBar();
  refreshDealsFilterBar();
};

var refreshFundingFilterBar = function() {
  var $yearDropdown = $('.js-funding-year-dropdown');
  var yearTitle = $('.js-funding-filter-year[data-year="' + fundingFilter.year + '"]').text();
  $('.dropdown-current', $yearDropdown).text(yearTitle);
  $('.dis-n', $yearDropdown).removeClass('dis-n');

  var $sectorDropdown = $('.js-funding-sector-dropdown');
  var sectorTitle = $('.js-funding-filter-sector[data-sector="' + fundingFilter.sector + '"]').text();
  $('.dropdown-current', $sectorDropdown).text(sectorTitle);
  $('.dis-n', $sectorDropdown).removeClass('dis-n');

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

  var $typeDropdown = $('.js-funders-type-dropdown');
  var typeTitle = $('.js-funders-filter-type[data-type="' + fundersFilter.type + '"]').text();
  $('.dropdown-current', $typeDropdown).text(typeTitle);
  $('.dis-n', $typeDropdown).removeClass('dis-n');

  hideCurrentFilterSelection();
};

var refreshDealsFilterBar = function() {
  var $segmentDropdown = $('.js-deals-segment-dropdown');
  var segmentTitle = $('.js-deals-filter-segment[data-segment="' + dealsFilter.segment + '"]').text();
  $('.dropdown-current', $segmentDropdown).text(segmentTitle);
  $('.dis-n', $segmentDropdown).removeClass('dis-n');

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

  $('.content-section.filter-is-active').removeClass('filter-is-active');
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
  $body = $('body');
  $socialTextbox = $('.social-list-item:last');
  $dropdowns = $('.js-dropdown');

  $fundingPieText = $('.funding-pie-text');
  $fundingPieTitle = $('.funding-pie-title');
  $fundingPieSubtitle = $('.funding-pie-subtitle');

  $dealsList = $('.deals-text-list');
};

var setupJsClickHandler = function() {
  $('.js-prevent-default').click(function(event) {
    event.preventDefault();
  });
};

var getRandomInRange = function(min, max) {
  return Math.random() * (max - min) + min;
}

var getRandomIntInRange = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
      return {name: 'default', value: '#fff'};
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

var fitTextToWidth = function(node, width) {
  var nodeWidth = node.getBBox().width;
  if (nodeWidth > width) {
    var $node = $(node);
    var fontSize = $node.css('font-size');
    fontSize = parseInt(fontSize.substring(0, fontSize.length - 2));
    fontSize--;
    if (fontSize > 0) {
      $node.css('font-size', fontSize + 'px');
      fitTextToWidth(node, width);
    }
  }
};

// ========================================
// FUNDING SECTION
// ========================================
var cedFundingData = null;

var fundingFilter = {
  sector: 'All',
  type: 'Equity',
  year: 2015,
};

var fundingBarSize = null;
var fundingPie = null;
var fundingArc = null;
var fundingOuterArc = null;
var fundingX = null;

var setupFundingSection = function() {
  d3.csv('./data/funding_equity.csv', function(d) {
    adjustedData = {
      name: d['Sector'],
      types: [
        {name: 'Equity', years: [
          {year: 2015, quarters: [
            {quarter: 'Q1', value: isNaN(+d['2015 Q1']) ? 0 : +d['2015 Q1']},
            {quarter: 'Q2', value: isNaN(+d['2015 Q1']) ? 0 : +d['2015 Q2']},
            {quarter: 'Q3', value: isNaN(+d['2015 Q1']) ? 0 : +d['2015 Q3']},
            {quarter: 'Q4', value: isNaN(+d['2015 Q1']) ? 0 : +d['2015 Q4']},
          ]},
          {year: 2014, quarters: [
            {quarter: 'Q1', value: isNaN(+d['2014 Q1']) ? 0 : +d['2014 Q1']},
            {quarter: 'Q2', value: isNaN(+d['2014 Q1']) ? 0 : +d['2014 Q2']},
            {quarter: 'Q3', value: isNaN(+d['2014 Q1']) ? 0 : +d['2014 Q3']},
            {quarter: 'Q4', value: isNaN(+d['2014 Q1']) ? 0 : +d['2014 Q4']},
          ]},
          {year: 2013, quarters: [
            {quarter: 'Q1', value: isNaN(+d['2013 Q1']) ? 0 : +d['2013 Q1']},
            {quarter: 'Q2', value: isNaN(+d['2013 Q1']) ? 0 : +d['2013 Q2']},
            {quarter: 'Q3', value: isNaN(+d['2013 Q1']) ? 0 : +d['2013 Q3']},
            {quarter: 'Q4', value: isNaN(+d['2013 Q1']) ? 0 : +d['2013 Q4']},
          ]},
        ]},
      ],
    };
    adjustedData.types.forEach(function(type) {
      if (type.name === 'Equity') {
        type.years.forEach(function(year) {
          year.value = year.quarters.reduce(function(num, quarter) { return num + quarter.value; }, 0);
        });
      }
    });
    return adjustedData;
  }, function(error, equityData) {
    cedFundingData = equityData;
    d3.csv('./data/funding_ga.csv', function(d) {
      return {
        name: d['Sector'],
        years: [
          {year: 2015, value: isNaN(+d['2015']) ? 0 : +d['2015']},
          {year: 2014, value: isNaN(+d['2014']) ? 0 : +d['2014']},
          {year: 2013, value: isNaN(+d['2013']) ? 0 : +d['2013']},
        ],
      };
    }, function(error, grantData) {
      grantData.forEach(function(gd) {
        var fundingData = cedFundingData.find(function(d) { return d.name === gd.name; });
        fundingData.types.push({name: 'Grants & Awards', years: gd.years});
      });

      var currentPieData = getCurrentPieData();
      var currentBarData = getCurrentBarData();

      var pieSectionSelector = '.funding-left';
      var $pieSection = $(pieSectionSelector);

      var size = {
        width: $pieSection.width(),
        height: $pieSection.height()
      };
      size.radius = Math.min(size.width, size.height) / 2;

      fundingPie = d3.layout.pie()
        .value(function(d) { return d.value; })
        .sort(null);

      fundingArc = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(size.radius - 2);

      fundingOuterArc = d3.svg.arc()
        .innerRadius(size.radius - 2)
        .outerRadius(size.radius);

      var svg = d3.select(pieSectionSelector)
        .append('svg')
          .attr('width', size.width)
          .attr('height', size.height);

      var defs = svg.append('defs');
      var pattern = createLinePattern(defs).attr('id', 'pie-pattern');
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
        .data(fundingPie(currentPieData)).enter()
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
              return fundingArc(d);
            }
          });

      // Stroke slices
      var outerArcs = g.selectAll('.outer-arc')
        .data(fundingPie(currentPieData)).enter()
        .append('g')
          .attr('class', 'outer-arc');
      outerArcs.append('path')
        .style('fill', function(d) { return getSectorColor(d.data.sector).value; })
        .each(function(d) { this._current = d; })
        .transition()
          .duration(1000)
          .attrTween('d', function(d) {
            var i = d3.interpolate(d.startAngle, d.endAngle);
            return function(t) {
              d.endAngle = i(t);
              return fundingOuterArc(d);
            }
          });

      // Pie slices
      var arcs = g.selectAll('.arc')
        .data(fundingPie(currentPieData))
      arcs.enter().append('g')
        .attr('class', 'arc')
        .attr('mask', 'url(#pie-mask)');
      arcs.append('path')
        .attr('class', 'is-animating')
        .style('fill', function(d) { return getSectorColor(d.data.sector).value; })
        .style('fill-opacity', 0.25)
        .each(function(d) { this._current = d; })
        .on('mouseover', function(d, i) {
          if (!d3.select(this).classed('is-animating') && !d3.select(this).classed('no-hover')) {
            d3.select(this).transition()
              .duration(250)
              .style('fill-opacity', 0.5);
            d3.select(this.parentNode)
              .attr('mask', '');

            d3.selectAll('.funding-bar').transition()
              .duration(250)
              .attr('opacity', function(d, j) { return i === j ? 1 : 0.25; });
          }
        })
        .on('mouseout', function(d, i) {
          if (!d3.select(this).classed('is-animating') && !d3.select(this).classed('no-hover')) {
            d3.select(this).transition()
              .duration(250)
              .style('fill-opacity', 0.25);
            d3.select(this.parentNode)
              .attr('mask', 'url(#pie-mask)');

            d3.selectAll('.funding-bar').transition()
              .duration(250)
              .attr('opacity', 1);
          }
        })
        .transition()
          .duration(1000)
          .attrTween('d', function(d) {
            var i = d3.interpolate(d.startAngle, d.endAngle);
            return function(t) {
              d.endAngle = i(t);
              return fundingArc(d);
            }
          }).each('end', function() {
            d3.select(this).classed('is-animating', false);
          });

      // Pie text
      $fundingPieText.width(size.radius * 2);
      $fundingPieTitle.text(getFundingPieTitle());
      $fundingPieSubtitle.text(convertToDollars(getFundingPieTotal(currentPieData)));

      // Initial svg and bar chart values
      var barSectionSelector = '.funding-right';
      var $barSection = $(barSectionSelector);

      fundingBarSize = {
        width: $barSection.width(),
        barHeight: 36
      };
      var barComponentHeight = $('.funding-right').height() - $('.funding-share-box').outerHeight();
      barComponentHeight = (barComponentHeight / 4 - fundingBarSize.barHeight) / 2;
      barComponentHeight = Math.min(barComponentHeight, fundingBarSize.barHeight);
      fundingBarSize.titleHeight = barComponentHeight;
      fundingBarSize.barBottomPadding = barComponentHeight;

      var barTotals = getFundingBarTotals(currentBarData);
      fundingX = d3.scale.linear()
        .domain([0, d3.max(barTotals)])
        .range([0, fundingBarSize.width]);

      var chart = d3.select(barSectionSelector)
        .append('svg')
          .attr('width', fundingBarSize.width)
          .attr('height', (fundingBarSize.barHeight + fundingBarSize.titleHeight + fundingBarSize.barBottomPadding) * currentBarData.length);

      var chartDefs = chart.append('defs');

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
        .data(currentBarData).enter()
        .append('g')
          .attr('transform', function(d, i) {
            return 'translate(0,' + ((fundingBarSize.barHeight + fundingBarSize.titleHeight + fundingBarSize.barBottomPadding) * i + 10) + ')';
          })
          .attr('class', 'funding-bar is-animating')
          .on('mouseover', function(d, i) {
            if (!d3.select(this).classed('is-animating') && !d3.select(this).classed('no-hover')) {
              d3.selectAll('.funding-bar').transition()
                .duration(250)
                .attr('opacity', function(d, j) { return i === j ? 1 : 0.25; });

              var pieSlice = d3.selectAll('.arc path')[0][i];
              d3.select(pieSlice).transition()
                .duration(250)
                .style('fill-opacity', 0.5);
              d3.select(pieSlice.parentNode)
                .attr('mask', '');
            }
          })
          .on('mouseout', function(d, i) {
            if (!d3.select(this).classed('is-animating') && !d3.select(this).classed('no-hover')) {
              d3.selectAll('.funding-bar').transition()
                .duration(250)
                .attr('opacity', 1);

              var pieSlice = d3.selectAll('.arc path')[0][i];
              d3.select(pieSlice).transition()
                .duration(250)
                .style('fill-opacity', 0.25);
              d3.select(pieSlice.parentNode)
                .attr('mask', 'url(#pie-mask)');
            }
          });

      bar.append('rect')
        .attr('width', fundingBarSize.width)
        .attr('height', fundingBarSize.titleHeight + fundingBarSize.barHeight)
        .attr('opacity', 0);

      bar.append('text')
        .text(function(d, i) { return d.title; })
        .attr('x', -30)
        .attr('y', fundingBarSize.titleHeight / 2)
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
        .attr('height', fundingBarSize.barHeight)
        .attr('y', fundingBarSize.titleHeight)
        .attr('fill', function(d) { return 'url(#' + getSectorColor(d.sector).name + '-gradient)'; })
        .transition()
          .duration(1000)
          .delay(function(d, i) { return i * 150; })
          .attr('width', function(d) { return fundingX(d.value); })
          .each('end', function() {
            d3.select(this.parentNode).classed('is-animating', false);
          });

      bar.append('text')
        .text(function(d) { return convertToDollars(d.value); })
        .attr('x', 10)
        .attr('y', fundingBarSize.titleHeight + fundingBarSize.barHeight / 2)
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
        refreshFundingFilterBar();
        updateFundingPieData();
      });

      $('.js-funding-filter-sector').click(function(event) {
        var sector = $(this).attr('data-sector');
        fundingFilter.sector = sector;
        refreshFundingFilterBar();
        updateFundingPieData();
      });

      $('.js-funding-filter-type').click(function(event) {
        var type = $(this).attr('data-type');
        fundingFilter.type = type;
        refreshFundingFilterBar();
        updateFundingPieData();
      });
    });
  });
};

var updateFundingPieData = function() {
  var currentPieData = getCurrentPieData();
  var currentBarData = getCurrentBarData();

  var isEmpty = getFundingPieTotal(currentPieData) === 0;
  if (isEmpty) {
    alert('There is no data for that filter, please select a different one.')
    return;
  }

  if (fundingFilter.sector !== 'All') {
    d3.selectAll('.arc path')
      .classed('no-hover', true)
      .transition()
        .duration(1000)
        .style('fill', function(d) { return getSectorColor(fundingFilter.sector).value; });

    d3.selectAll('.outer-arc path')
      .transition()
        .duration(1000)
        .style('fill', function(d) { return getSectorColor(fundingFilter.sector).value; });
  } else {
    d3.selectAll('.arc path').data(fundingPie(currentPieData))
      .classed('is-animating', true)
      .classed('no-hover', false)
      .transition()
        .duration(1000)
        .style('fill', function(d) { return getSectorColor(d.data.sector).value; })
        .attrTween('d', function(d) {
          var i = d3.interpolate(this._current, d);
          this._current = i(0);
          return function(t) {
            return fundingArc(i(t));
          };
        }).each('end', function() {
          d3.select(this).classed('is-animating', false);
        });

    d3.selectAll('.outer-arc path').data(fundingPie(currentPieData))
      .transition()
        .duration(1000)
        .style('fill', function(d) { return getSectorColor(d.data.sector).value; })
        .attrTween('d', function(d) {
          var i = d3.interpolate(this._current, d);
          this._current = i(0);
          return function(t) {
            return fundingOuterArc(i(t));
          };
        });

    d3.selectAll('.pattern-arc path').data(fundingPie(currentPieData))
      .transition()
        .duration(1000)
        .attrTween('d', function(d) {
          var i = d3.interpolate(this._current, d);
          this._current = i(0);
          return function(t) {
            return fundingArc(i(t));
          };
        });
  }

  $fundingPieText.css('opacity', 0);
  setTimeout(function() {
    $fundingPieTitle.text(getFundingPieTitle());
    $fundingPieSubtitle.text(convertToDollars(getFundingPieTotal(currentPieData)));
    setTimeout(function() {
      $fundingPieText.css('opacity', 1);
    }, 500);
  }, 500);

  if (fundingFilter.sector !== 'All' && fundingFilter.type === 'Grants & Awards') {
    return;
  }

  var barTotals = getFundingBarTotals(currentBarData);
  fundingX = d3.scale.linear()
    .domain([0, d3.max(barTotals)])
    .range([0, fundingBarSize.width]);

  d3.selectAll('.funding-bar')
    .classed('is-animating', true)
    .classed('no-hover', function() { return fundingFilter.sector !== 'All'; });

  d3.selectAll('.funding-bar-bg').data(currentBarData)
    .transition()
      .duration(1000)
      .delay(function(d, i) { return i * 150; })
      .attr('fill', function(d) { return 'url(#' + getSectorColor(d.sector).name + '-gradient)'; })
      .attr('width', function(d) { return fundingX(d.value); })
      .each('end', function() {
        d3.select(this.parentNode).classed('is-animating', false);
      });

  d3.selectAll('.funding-bar-title').data(currentBarData)
    .transition()
      .duration(500)
      .attr('fill-opacity', 0)
      .each('end', function(d) {
        d3.select(this).text(d.title);
        $(this).css('font-size', '24px');
        fitTextToWidth(this, $('.funding-right').width());
      })
    .transition()
      .duration(500)
      .delay(1000)
      .attr('fill-opacity', 1);

  d3.selectAll('.funding-bar-text').data(currentBarData)
    .transition()
      .duration(500)
      .attr('fill-opacity', 0)
    .transition()
      .duration(500)
      .delay(1000)
      .text(function(d) { return convertToDollars(d.value); })
      .attr('fill-opacity', 1);
};

var getFilteredPieData = function() {
  var filteredData = $.extend(true, [], cedFundingData);
  filteredData = filterFundingDataBySector(filteredData, fundingFilter.sector);
  filteredData = filterFundingDataByType(filteredData, fundingFilter.type);
  filteredData = filterFundingDataByYear(filteredData, fundingFilter.year);
  return filteredData;
};

var getCurrentPieData = function() {
  var filteredData = getFilteredPieData();
  if (fundingFilter.sector === 'All') {
    return filteredData.map(function(sector) {
      return {
        sector: sector.name,
        value: getFundingSectorTotal(sector),
      };
    });
  } else {
    var sector = filteredData[0];
    switch (fundingFilter.type) {
      case 'All':
        var items = [];
        sector.types.forEach(function(type) {
          type.years.forEach(function(year) {
            items.push({
              sector: sector.name,
              value: year.value,
            });
          });
        });
        return items;
      case 'Equity':
        var type = sector.types.find(function(type) { return type.name === 'Equity'; });
        if (type) {
          var year = type.years[0];
          return year.quarters.map(function(quarter) {
            return {
              sector: sector.name,
              value: quarter.value,
            };
          });
        }
        return [{
          sector: '',
          value: 0,
        }];
      case 'Grants & Awards':
        var type = sector.types.find(function(type) { return type.name === 'Grants & Awards'; });
        if (type) {
          return type.years.map(function(year) {
            return {
              sector: sector.name,
              value: year.value,
            };
          });
        }
        return [{
          sector: '',
          value: 0,
        }];
    }
  }
};

var getFilteredBarData = function() {
  var filteredData = $.extend(true, [], cedFundingData);
  filteredData = filterFundingDataBySector(filteredData, fundingFilter.sector);
  filteredData = filterFundingDataByType(filteredData, fundingFilter.type);
  filteredData = filterFundingDataByYear(filteredData, fundingFilter.year);
  return filteredData;
};

var getCurrentBarData = function() {
  var filteredData = getFilteredBarData();
  if (fundingFilter.sector === 'All') {
    return filteredData.map(function(sector) {
      return {
        title: sector.name,
        sector: sector.name,
        value: getFundingSectorTotal(sector),
      };
    });
  } else {
    var sector = filteredData[0];
    var type = sector.types.find(function(type) { return type.name === 'Equity'; });
    if (type) {
      var year = type.years[0];
      return year.quarters.map(function(quarter, i) {
        var title;
        if (i === 0) {
          title = sector.name + ' ' + year.year + ' ' + quarter.quarter + ' (Equity only)';
        } else {
          title = quarter.quarter;
        }
        return {
          title: title,
          sector: sector.name,
          value: quarter.value,
        };
      });
    }
    return [{
      title: '',
      sector: '',
      value: 0,
    }];
  }
};

var filterFundingDataBySector = function(data, sector) {
  if (sector === 'All') { return data; }
  return data.filter(function(s) { return s.name === sector; });
};

var filterFundingDataByType = function(data, type) {
  if (type === 'All') { return data; }
  data.forEach(function(sector) {
    sector.types = sector.types.filter(function(t) { return t.name === type; });
  });
  return data;
}

var filterFundingDataByYear = function(data, year) {
  data.forEach(function(sector) {
    sector.types = filterFundingDataTypesByYear(sector.types, year);
  });
  return data;
};

var filterFundingDataTypesByYear = function(types, year) {
  types.forEach(function(type) {
    type.years = type.years.filter(function(y) { return y.year === year; });
  });
  return types;
};

var getFundingSectorTotal = function(sector) {
  return sector.types.reduce(function(num1, type) {
    return num1 + type.years.reduce(function(num2, year) {
      return num2 + year.value;
    }, 0);
  }, 0);
};

var getFundingPieTotal = function(data) {
  return data.reduce(function(num, d) {
    return num + d.value;
  }, 0);
};

var getFundingBarTotals = function(data) {
  return data.map(function(d) {
    return d.value;
  });
};

var getFundingPieTitle = function() {
  var str = fundingFilter.year;

  if (fundingFilter.sector !== 'All') {
    str += ' ' + fundingFilter.sector;
  }

  if (fundingFilter.type === 'All') {
    str += ' Equity + Grants & Awards:'
  } else {
    str += ' ' + fundingFilter.type + ':'
  }

  return str;
};

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
  sector: 'All',
  type: 'All',
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

  d3.csv('./data/funders.csv', function(d) {
    return {
      state: d['State'],
      region: d['Region'],
      sectors: [
        {name: 'Tech', value: isNaN(+d['Tech']) ? 0 : +d['Tech']},
        {name: 'Life Science', value: isNaN(+d['Life Science']) ? 0 : +d['Life Science']},
        {name: 'Advanced Manufacturing & Materials', value: isNaN(+d['Advanced M&M']) ? 0 : +d['Advanced M&M']},
        {name: 'Cleantech', value: isNaN(+d['Cleantech']) ? 0 : +d['Cleantech']},
      ],
      types: [
        {name: 'Venture Fund', value: isNaN(+d['Venture Fund']) ? 0 : +d['Venture Fund']},
        {name: 'Corporate Fund', value: isNaN(+d['Corporate Fund']) ? 0 : +d['Corporate Fund']},
        {name: 'Angel Group', value: isNaN(+d['Angel Group']) ? 0 : +d['Angel Group']},
        {name: 'Growth', value: isNaN(+d['Growth']) ? 0 : +d['Growth']},
        {name: 'Strategic', value: isNaN(+d['Strategic']) ? 0 : +d['Strategic']},
        {name: 'Grant', value: isNaN(+d['Grant']) ? 0 : +d['Grant']},
        {name: 'Award', value: isNaN(+d['Award']) ? 0 : +d['Award']},
      ],
    };
  }, function(error, data) {
    cedMapData = data;
    d3.csv('./data/funders_investors.csv', function(d) {
      return {
        name: d['Funder'],
        state: d['Billing State/Province'],
        type: d['Investor Type'],
        sectors: [
          {name: 'Tech', value: isNaN(+d['Tech']) ? 0 : +d['Tech']},
          {name: 'Life Science', value: isNaN(+d['Life Science']) ? 0 : +d['Life Science']},
          {name: 'Advanced Manufacturing & Materials', value: isNaN(+d['AM&M']) ? 0 : +d['AM&M']},
          {name: 'Cleantech', value: isNaN(d['Cleantech']) ? 0 : +d['Cleantech']},
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
                return getInvestorTotal(d.properties);
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

          $('.js-funders-filter-type').click(function(event) {
            var type = $(this).attr('data-type');
            fundersFilter.type = type;

            refreshFundersFilterBar();
            updateFundersSection();
          });

          $('.js-funders-state-info-learnmore').click(function(event) {
            $('.js-funders-investors-container').addClass('is-active').removeClass('no-pointer-event');
            $list = $('.funders-investors-list');
            $list.empty();
            var state = mapData.find(function(d) { return d.properties.code === activeMapState.attr('data-state'); });
            var investors = getInvestorsByState(state.properties);
            var source = $('#funders-investors-item-template').html();
            var template = Handlebars.compile(source);
            investors.forEach(function(investor) {
              var html = template({
                investor_name: investor.name,
                type: investor.type,
                tech: investor.sectors.find(function(s) { return s.name === 'Tech' }).value,
                lifescience: investor.sectors.find(function(s) { return s.name === 'Life Science' }).value,
                amm: investor.sectors.find(function(s) { return s.name === 'Advanced Manufacturing & Materials' }).value,
                cleantech: investor.sectors.find(function(s) { return s.name === 'Cleantech' }).value,
              });
              $list.append(html);
            });
          });

          $('.js-funders-investors-close').click(function(event) {
            $('.js-funders-investors-container').addClass('no-pointer-event').removeClass('is-active');
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
            return getInvestorTotal(d.properties);
          }
          return getStateInvestorTypeTotal(d.properties, fundersFilter.type);
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
  var investors = getInvestorsByState(state);
  return investors.length;
};

var getStateInvestorTypeTotal = function(state, type) {
  if (fundersFilter.type === 'All') {
    return getInvestorTotal(state);
  }
  var investors = getInvestorsByState(state);
  return investors.filter(function(investor) { return investor.type === fundersFilter.type; }).length;
};

var getInvestorsByState = function(state) {
  if (fundersFilter.type === 'All') {
    return cedMapInvestorData.filter(function(d) { return d.state === state.code; });
  }
  return cedMapInvestorData.filter(function(d) {
    return d.state === state.code && d.type === fundersFilter.type;
  });
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
  $('.js-funders-investors-container').addClass('no-pointer-event').removeClass('is-active');
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
  $('.js-funders-investors-container').addClass('no-pointer-event').removeClass('is-active');
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
  $('.js-funders-investors-container').addClass('no-pointer-event').removeClass('is-active');
};

// ========================================
// DEALS SECTION
// ========================================
var cedDealsData = null;

var dealsFilter = {
  segment: '2015'
};

var dealsSize = null;

var setupDealsSection = function() {
  d3.csv('./data/deals_deals.csv', function(d) {
    return {
      type: 'Deals',
      sector: d['Sector'],
      years: [
        {year: 2015, value: isNaN(+d['2015']) ? 0 : +d['2015']},
        {year: 2014, value: isNaN(+d['2014']) ? 0 : +d['2014']},
        {year: 2013, value: isNaN(+d['2013']) ? 0 : +d['2013']},
      ],
      locations: [
        {name: 'Triangle Region', value: isNaN(+d['Triangle Region']) ? 0 : +d['Triangle Region']},
        {name: 'Asheville', value: isNaN(+d['Asheville']) ? 0 : +d['Asheville']},
        {name: 'Candler', value: isNaN(+d['Candler']) ? 0 : +d['Candler']},
        {name: 'Cary', value: isNaN(+d['Cary']) ? 0 : +d['Cary']},
        {name: 'Chapel Hill', value: isNaN(+d['Chapel Hill']) ? 0 : +d['Chapel Hill']},
        {name: 'Charlotte', value: isNaN(+d['Charlotte']) ? 0 : +d['Charlotte']},
        {name: 'Clayton', value: isNaN(+d['Clayton']) ? 0 : +d['Clayton']},
        {name: 'Durham', value: isNaN(+d['Durham']) ? 0 : +d['Durham']},
        {name: 'Greensboro', value: isNaN(+d['Greensboro']) ? 0 : +d['Greensboro']},
        {name: 'Horsham', value: isNaN(+d['Horsham']) ? 0 : +d['Horsham']},
        {name: 'Morrisville', value: isNaN(+d['Morrisville']) ? 0 : +d['Morrisville']},
        {name: 'Raleigh', value: isNaN(+d['Raleigh']) ? 0 : +d['Raleigh']},
        {name: 'Research Triangle Park', value: isNaN(+d['Research Triangle Park']) ? 0 : +d['Research Triangle Park']},
        {name: 'Wake Forest', value: isNaN(+d['Wake Forest']) ? 0 : +d['Wake Forest']},
        {name: 'Waxhaw', value: isNaN(+d['Waxhaw']) ? 0 : +d['Waxhaw']},
        {name: 'Wilmington', value: isNaN(+d['Wilmington']) ? 0 : +d['Wilmington']},
        {name: 'Winston-Salem', value: isNaN(+d['Winston-Salem']) ? 0 : +d['Winston-Salem']},
        {name: 'Zebulon', value: isNaN(+d['Zebulon']) ? 0 : +d['Zebulon']},
      ],
      sizes: [
        {name: '0-999k', value: isNaN(+d['0-999k']) ? 0 : +d['0-999k']},
        {name: '1m-4.9m', value: isNaN(+d['1m-4.9m']) ? 0 : +d['1m-4.9m']},
        {name: '5m-14.9m', value: isNaN(+d['5m-14.9m']) ? 0 : +d['5m-14.9m']},
        {name: '15m-29.9m', value: isNaN(+d['15m-29.9m']) ? 0 : +d['15m-29.9m']},
        {name: '30m-49.9m', value: isNaN(+d['30m-49.9m']) ? 0 : +d['30m-49.9m']},
        {name: '50m+', value: isNaN(+d['50m+']) ? 0 : +d['50m+']},
      ],
    };
  }, function(error, dealsData) {
    d3.csv('./data/deals_companies.csv', function(d) {
      return {
        type: 'Companies',
        sector: d['Sector'],
        years: [
          {year: 2015, value: isNaN(+d['2015']) ? 0 : +d['2015']},
          {year: 2014, value: isNaN(+d['2014']) ? 0 : +d['2014']},
          {year: 2013, value: isNaN(+d['2013']) ? 0 : +d['2013']},
        ],
        locations: [
          {name: 'Triangle Region', value: isNaN(+d['Triangle Region']) ? 0 : +d['Triangle Region']},
          {name: 'Asheville', value: isNaN(+d['Asheville']) ? 0 : +d['Asheville']},
          {name: 'Candler', value: isNaN(+d['Candler']) ? 0 : +d['Candler']},
          {name: 'Cary', value: isNaN(+d['Cary']) ? 0 : +d['Cary']},
          {name: 'Chapel Hill', value: isNaN(+d['Chapel Hill']) ? 0 : +d['Chapel Hill']},
          {name: 'Charlotte', value: isNaN(+d['Charlotte']) ? 0 : +d['Charlotte']},
          {name: 'Clayton', value: isNaN(+d['Clayton']) ? 0 : +d['Clayton']},
          {name: 'Durham', value: isNaN(+d['Durham']) ? 0 : +d['Durham']},
          {name: 'Greensboro', value: isNaN(+d['Greensboro']) ? 0 : +d['Greensboro']},
          {name: 'Horsham', value: isNaN(+d['Horsham']) ? 0 : +d['Horsham']},
          {name: 'Morrisville', value: isNaN(+d['Morrisville']) ? 0 : +d['Morrisville']},
          {name: 'Raleigh', value: isNaN(+d['Raleigh']) ? 0 : +d['Raleigh']},
          {name: 'Research Triangle Park', value: isNaN(+d['Research Triangle Park']) ? 0 : +d['Research Triangle Park']},
          {name: 'Wake Forest', value: isNaN(+d['Wake Forest']) ? 0 : +d['Wake Forest']},
          {name: 'Waxhaw', value: isNaN(+d['Waxhaw']) ? 0 : +d['Waxhaw']},
          {name: 'Wilmington', value: isNaN(+d['Wilmington']) ? 0 : +d['Wilmington']},
          {name: 'Winston-Salem', value: isNaN(+d['Winston-Salem']) ? 0 : +d['Winston-Salem']},
          {name: 'Zebulon', value: isNaN(+d['Zebulon']) ? 0 : +d['Zebulon']},
        ],
        sizes: [
          {name: '0-999k', value: isNaN(+d['0-999k']) ? 0 : +d['0-999k']},
          {name: '1m-4.9m', value: isNaN(+d['1m-4.9m']) ? 0 : +d['1m-4.9m']},
          {name: '5m-14.9m', value: isNaN(+d['5m-14.9m']) ? 0 : +d['5m-14.9m']},
          {name: '15m-29.9m', value: isNaN(+d['15m-29.9m']) ? 0 : +d['15m-29.9m']},
          {name: '30m-49.9m', value: isNaN(+d['30m-49.9m']) ? 0 : +d['30m-49.9m']},
          {name: '50m+', value: isNaN(+d['50m+']) ? 0 : +d['50m+']},
        ],
      };
    }, function(error, companiesData) {
      cedDealsData = dealsData.map(function(dd, i) {
        return {
          name: dd.sector,
          types: [
            {name: 'Deals', years: dd.years, locations: dd.locations, sizes: dd.sizes},
            {name: 'Companies', years: companiesData[i].years, locations: companiesData[i].locations, sizes: companiesData[i].sizes},
          ],
        }
      });

      var currentDealsData = getCurrentDealsData();

      var dealsSectionSelector = '.deals-container';
      var $dealsSection = $(dealsSectionSelector);

      dealsSize = {
        width: $dealsSection.width(),
        height: $dealsSection.height(),
        radiusCenter: 120,
        radiusMin: 70,
        radiusMax: 110
      };

      var svg = d3.select(dealsSectionSelector).append('svg')
        .attr('width', dealsSize.width)
        .attr('height', dealsSize.height);

      var defs = svg.append('defs');
      var pattern = createLinePattern(defs).attr('id', 'deals-pattern');

      var dealTotals = currentDealsData.filter(function(d, i) { return i > 0; }).map(function(d) { return d.primary.value; });
      var dealsR = d3.scale.linear()
        .domain([0, d3.max(dealTotals)])
        .range([dealsSize.radiusMin, dealsSize.radiusMax]);

      var dealsGroup = svg.append('g').attr('class', 'deals-group');
      var linesGroup = dealsGroup.append('g').attr('class', 'lines-group');

      var g = dealsGroup.selectAll('.circle-group')
        .data(currentDealsData).enter()
        .append('g')
          .attr('class', 'circle-group');;
      g.append('circle')
        .attr('class', 'circle-pattern')
        .attr('cx', function(d, i) {
          var baseCx = 0;
          var min = 0;
          var max = 0;
          switch (i) {
            case 0:
              baseCx = dealsSize.width / 2;
              break;
            case 2:
              min = dealsSize.radiusMax;
              max = dealsSize.width / 4 - dealsSize.radiusMax;
              break;
            case 1:
              min = dealsSize.width / 4 + dealsSize.radiusMax;
              max = dealsSize.width / 2 - dealsSize.radiusCenter - dealsSize.radiusMax;
              break;
            case 3:
              min = dealsSize.width / 2 + dealsSize.radiusCenter + dealsSize.radiusMax;
              max = dealsSize.width * 3 / 4 - dealsSize.radiusMax;
              break;
            case 4:
              min = dealsSize.width * 3 / 4 + dealsSize.radiusMax
              max = dealsSize.width - dealsSize.radiusMax;
              break;
          }
          if (i > 0) { baseCx = getRandomInRange(min, max); }
          d.baseCx = baseCx;
          return baseCx;
        })
        .attr('cy', function(d, i) {
          var baseCy = 0;
          var min = 0;
          var max = 0;
          switch (i) {
            case 0:
              baseCy = dealsSize.height / 2;
              break;
            case 1:
            case 3:
              min = dealsSize.radiusMax;
              max = dealsSize.height / 2;
              break;
            case 2:
            case 4:
              min = dealsSize.height / 2;
              max = dealsSize.height - dealsSize.radiusMax;
              break;
          }
          if (i > 0) { baseCy = getRandomInRange(min, max); }
          d.baseCy = baseCy;
          return baseCy;
        })
        .attr('r', function(d, i) {
          if (i === 0) {
            return dealsSize.radiusCenter;
          }
          return dealsR(d.primary.value);
        })
        .attr('stroke', function(d) { return getSectorColor(d.sector).value; })
        .attr('stroke-width', 2)
        .attr('stroke-opacity', 0.25)
        .style('fill', 'url(#deals-pattern)');
      g.append('circle')
        .attr('class', 'circle-fill')
        .attr('cx', function(d, i) { return parseFloat(d3.select(d3.selectAll('.circle-pattern')[0][i]).attr('cx')); })
        .attr('cy', function(d, i) { return parseFloat(d3.select(d3.selectAll('.circle-pattern')[0][i]).attr('cy')); })
        .attr('r', function(d, i) { return parseFloat(d3.select(d3.selectAll('.circle-pattern')[0][i]).attr('r')); })
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .attr('stroke-opacity', 0.25)
        .style('fill', function(d) { return getSectorColor(d.sector).value; })
        .style('fill-opacity', function(d) { return getSectorColor(d.sector).name === 'default' ? 0 : 0.25; });

      var source = $('#deals-text-item-template').html();
      var template = Handlebars.compile(source);
      var $list = $('.deals-text-list').empty();
      g.selectAll('.circle-pattern').each(function(d, _, i) {
        var $circle = $('.circle-pattern:eq(' + i + ')');
        var $item = $(template({
          primary_title: d.primary.title,
          primary_value: d.primary.value,
          secondary_title: d.secondary.title,
          secondary_value: d.secondary.value,
        }));
        $list.append($item);
        $item.width($circle[0].getBBox().width);
        $item.css({
          left: parseFloat($circle.attr('cx')) - parseFloat($circle.attr('r')),
          top: parseFloat($circle.attr('cy')) - $item.height() / 2,
        });
      });

      linesGroup.selectAll('.circle-line')
        .data(currentDealsData).enter()
        .append('line')
          .attr('class', 'circle-line')
          .attr('stroke', '#fff')
          .attr('stroke-opacity', 0.25)
          .attr('x1', function(d, i) {
            if (i === 0) { return 0; }
            var source = d3.select('.circle-pattern');
            var target = d3.select(d3.selectAll('.circle-pattern')[0][i]);
            var info = getDistanceInfo(source, target);
            return info.sourceX - info.dx * info.sourceR / info.distance;
          })
          .attr('y1', function(d, i) {
            if (i === 0) { return 0; }
            var source = d3.select('.circle-pattern');
            var target = d3.select(d3.selectAll('.circle-pattern')[0][i]);
            var info = getDistanceInfo(source, target);
            return info.sourceY - info.dy * info.sourceR / info.distance;
          })
          .attr('x2', function(d, i) {
            if (i === 0) { return 0; }
            var source = d3.select('.circle-pattern');
            var target = d3.select(d3.selectAll('.circle-pattern')[0][i]);
            var info = getDistanceInfo(source, target);
            return info.targetX + info.dx * info.targetR / info.distance;
          })
          .attr('y2', function(d, i) {
            if (i === 0) { return 0; }
            var source = d3.select('.circle-pattern');
            var target = d3.select(d3.selectAll('.circle-pattern')[0][i]);
            var info = getDistanceInfo(source, target);
            return info.targetY + info.dy * info.targetR / info.distance;
          });

      // animateBubbles();

      // Filtering
      $('.js-deals-filter-segment').click(function(event) {
        var segment = $(this).attr('data-segment');
        dealsFilter.segment = segment;

        refreshDealsFilterBar();
        updateDealsSection();
      });
    });
  });
}

var updateDealsSection = function() {
  var currentDealsData = getCurrentDealsData();

  var dealTotals = currentDealsData.filter(function(d, i) { return i > 0; }).map(function(d) { return d.primary.value; });
  var dealsR = d3.scale.linear()
    .domain([0, d3.max(dealTotals)])
    .range([dealsSize.radiusMin, dealsSize.radiusMax]);

  d3.selectAll('.circle-pattern').data(currentDealsData)
    .transition()
      .duration(500)
      .ease('elastic')
      .attr('r', function(d, i) {
        if (i === 0) {
          return dealsSize.radiusCenter;
        }
        return dealsR(d.primary.value);
      });

  d3.selectAll('.circle-fill').data(currentDealsData)
    .transition()
      .duration(500)
      .ease('elastic')
      .attr('r', function(d, i) {
        if (i === 0) {
          return dealsSize.radiusCenter;
        }
        return dealsR(d.primary.value);
      });

  d3.selectAll('.circle-line').data(currentDealsData)
    .transition()
      .ease('elastic')
      .duration(500)
      .attr('x1', function(d, i) {
        if (i === 0) { return 0; }
        var source = d3.select('.circle-pattern');
        var target = d3.select(d3.selectAll('.circle-pattern')[0][i]);
        var info = getDistanceInfoWithRadius(source, target, dealsR(d.primary.value));
        return info.sourceX - info.dx * info.sourceR / info.distance;
      })
      .attr('y1', function(d, i) {
        if (i === 0) { return 0; }
        var source = d3.select('.circle-pattern');
        var target = d3.select(d3.selectAll('.circle-pattern')[0][i]);
        var info = getDistanceInfoWithRadius(source, target, dealsR(d.primary.value));
        return info.sourceY - info.dy * info.sourceR / info.distance;
      })
      .attr('x2', function(d, i) {
        if (i === 0) { return 0; }
        var source = d3.select('.circle-pattern');
        var target = d3.select(d3.selectAll('.circle-pattern')[0][i]);
        var info = getDistanceInfoWithRadius(source, target, dealsR(d.primary.value));
        return info.targetX + info.dx * info.targetR / info.distance;
      })
      .attr('y2', function(d, i) {
        if (i === 0) { return 0; }
        var source = d3.select('.circle-pattern');
        var target = d3.select(d3.selectAll('.circle-pattern')[0][i]);
        var info = getDistanceInfoWithRadius(source, target, dealsR(d.primary.value));
        return info.targetY + info.dy * info.targetR / info.distance;
      });

  $dealsList.css('opacity', 0);
  setTimeout(function() {
    var isEmpty = false;
    d3.selectAll('.circle-pattern').each(function(d, i) {
      if (i === 0) { isEmpty = d.primary.value === 0; }
      var $circle = $('.circle-pattern:eq(' + i + ')');
      var $item = $('.deals-text-list-item:eq(' + i + ')');
      $item.width($circle[0].getBBox().width);
      $('.deals-text-list-item-p-title', $item).text(d.primary.title);
      $('.deals-text-list-item-p-value', $item).text(d.primary.value);
      var shouldHide = isEmpty || d.secondary.value === 0;
      $('.deals-text-list-item-s-title', $item).text(d.secondary.title).toggleClass('dis-n', shouldHide);
      $('.deals-text-list-item-s-value', $item).text(d.secondary.value).toggleClass('dis-n', shouldHide);
      $item.css({
        left: parseFloat($circle.attr('cx')) - parseFloat($circle.attr('r')),
        top: parseFloat($circle.attr('cy')) - $item.height() / 2,
      });
    });
    $dealsList.css('opacity', 1);
  }, 500);
};

var animateBubbles = function() {
  d3.selectAll('.circle-group').transition()
    .duration(function(d) { return getRandomIntInRange(4000, 6000)})
    .delay(function(d) { return getRandomIntInRange(1000, 3000)})
    .ease('quad-in-out')
    .attr('transform', function(d, i) {
      if (i === 0) { return ''; }
      return 'translate(' + getRandomInRange(-20, 20) + ',' + getRandomInRange(-20, 20) + ')';
    })
    .each('end', animateBubbles);
};

var getDistanceInfo = function(source, target) {
  var data = {
    sourceX: parseFloat(source.attr('cx')),
    sourceY: parseFloat(source.attr('cy')),
    sourceR: parseFloat(source.attr('r')),
    targetX: parseFloat(target.attr('cx')),
    targetY: parseFloat(target.attr('cy')),
    targetR: parseFloat(target.attr('r')),
  };
  data.dx = data.sourceX - data.targetX;
  data.dy = data.sourceY - data.targetY;
  data.distance = Math.sqrt(Math.pow(data.dx, 2) + Math.pow(data.dy, 2));
  return data;
};

var getDistanceInfoWithRadius = function(source, target, targetR) {
  var data = {
    sourceX: parseFloat(source.attr('cx')),
    sourceY: parseFloat(source.attr('cy')),
    sourceR: parseFloat(source.attr('r')),
    targetX: parseFloat(target.attr('cx')),
    targetY: parseFloat(target.attr('cy')),
    targetR: targetR,
  };
  data.dx = data.sourceX - data.targetX;
  data.dy = data.sourceY - data.targetY;
  data.distance = Math.sqrt(Math.pow(data.dx, 2) + Math.pow(data.dy, 2));
  return data;
};

var getCurrentDealsData = function() {
  var filteredData = getFilteredDealsData();
  var bubbles = [];

  bubbles.push({
    sector: null,
    primary: {
      title: 'Total # of ' + dealsFilter.segment + ' Deals:',
      value: getTotalDeals(filteredData),
    },
    secondary: {
      title: 'Companies:',
      value: getTotalCompanies(filteredData),
    }
  });

  filteredData.forEach(function(sector) {
    bubbles.push(getSectorBubble(sector));
  });

  return bubbles;
};

var getFilteredDealsData = function() {
  var filteredData = $.extend(true, [], cedDealsData);
  // filteredData = filterFundingDataBySector(filteredData, fundingFilter.sector);
  // filteredData = filterFundingDataByType(filteredData, fundingFilter.type);
  // filteredData = filterFundingDataByYear(filteredData, fundingFilter.year);
  return filteredData;
};

var getSectorBubble = function(sector) {
  var deals = getDeals(sector);
  var companies = getCompanies(sector);
  return {
    sector: sector.name,
    primary: {
      title: sector.name + ' Deals:',
      value: getSectorTotalDeals(sector),
    },
    secondary: {
      title: 'Companies:',
      value: getSectorTotalCompanies(sector),
    }
  }
};

var getTotalDeals = function(data) {
  return data.reduce(function(num, sector) {
    return num + getSectorTotalDeals(sector);
  }, 0);
};

var getSectorTotalDeals = function(sector) {
  var deals = getDeals(sector);
  if (deals) {
    if (['2015', '2014', '2013'].indexOf(dealsFilter.segment) >= 0) {
      var year = deals.years.find(function(y) { return y.year === parseInt(dealsFilter.segment); });
      if (year) {
        return year.value;
      }
    } else if (['0-999k', '1m-4.9m', '5m-14.9m', '15m-29.9m', '30m-49.9m', '50m+'].indexOf(dealsFilter.segment) >= 0) {
      var size = deals.sizes.find(function(s) { return s.name === dealsFilter.segment; });
      if (size) {
        return size.value;
      }
    } else if (['Triangle Region', 'Asheville', 'Candler', 'Cary', 'Chapel Hill', 'Charlotte', 'Clayton', 'Durham', 'Greensboro', 'Horsham', 'Morrisville', 'Raleigh', 'Research Triangle Park', 'Wake Forest', 'Waxhaw', 'Wilmington', 'Winston-Salem', 'Zebulon'].indexOf(dealsFilter.segment) >= 0) {
      var location = deals.locations.find(function(l) { return l.name === dealsFilter.segment; });
      if (location) {
        return location.value;
      }
    }
  }
  return 0;
};

var getTotalCompanies = function(data) {
  return data.reduce(function(num, sector) {
    return num + getSectorTotalCompanies(sector);
  }, 0);
};

var getSectorTotalCompanies = function(sector) {
  var companies = getCompanies(sector);
  if (companies) {
    if (['2015', '2014', '2013'].indexOf(dealsFilter.segment) >= 0) {
      var year = companies.years.find(function(y) { return y.year === 2015; });
      if (year) {
        return year.value;
      }
    } else if (['0-999k', '1m-4.9m', '5m-14.9m', '15m-29.9m', '30m-49.9m', '50m+'].indexOf(dealsFilter.segment) >= 0) {
      var size = companies.sizes.find(function(s) { return s.name === dealsFilter.segment; });
      if (size) {
        return size.value;
      }
    } else if (['Triangle Region', 'Asheville', 'Candler', 'Cary', 'Chapel Hill', 'Charlotte', 'Clayton', 'Durham', 'Greensboro', 'Horsham', 'Morrisville', 'Raleigh', 'Research Triangle Park', 'Wake Forest', 'Waxhaw', 'Wilmington', 'Winston-Salem', 'Zebulon'].indexOf(dealsFilter.segment) >= 0) {
      var location = companies.locations.find(function(l) { return l.name === dealsFilter.segment; });
      if (location) {
        return location.value;
      }
    }
  }
  return 0;
};

var getDeals = function(sector) {
  return sector.types.find(function(t) { return t.name === 'Deals'; });;
};

var getCompanies = function(sector) {
  return sector.types.find(function(t) { return t.name === 'Companies'; });
};

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
  return getExitsIpoCount(data) === 1 ? 'IPO' : 'IPOs';
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
  return getExitsMaCount(data) === 1 ? 'Merger/Acquisition' : 'Mergers/Acquisitions';
};
