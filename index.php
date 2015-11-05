<?php
$quotes = [];
$file = fopen('./data/quotes.txt', 'r');
if ($file) {
  while (!feof($file)) {
    $line = trim(fgets($file));
    if ($line === '') { continue; }
    array_push($quotes, $line);
  }
  fclose($file);
}
?><!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <meta content='IE=edge,chrome=1' http-equiv='X-UA-Compatible'>
  <meta content='' name='description'>
  <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
  <meta content='http://www.cednc.org' property='og:url'>
  <meta content='website' property='og:type'>
  <meta content='Innovators Report - CED' property='og:title'>
  <meta content='' property='og:description'>
  <!-- <meta content='http://www.cednc.org/open_graph.jpg' property='og:image'>
  <link href='http://www.cednc.org/apple-touch-icon.png' rel='apple-touch-icon'>
  <link href='http://www.cednc.org/favicon.png' rel='shortcut icon' type='image/x-icon'>
  <link href='http://www.cednc.org/favicon.png' rel='icon' type='image/x-icon'> -->
  <title>Innovators Report - CED</title>
  <link href="./stylesheets/normalize.css" rel="stylesheet" type="text/css" />
  <link href="./stylesheets/main.css" rel="stylesheet" media="screen" type="text/css" />
  <link href="./stylesheets/print.css" rel="stylesheet" media="print" type="text/css" />
</head>
<body class="cover-panel-active <?php if(isset($_GET['print']) && $_GET['print'] !== '') { echo 'is-printing printing-' . $_GET['print']; } ?>" data-print-section="<?php if(isset($_GET['print']) && $_GET['print'] !== '') { echo $_GET['print']; } ?>">
  <div class="page-background-image pos-f fullsize"></div>
  <div class="page-background-overlay pos-f fullsize"></div>
  <div class="page-background-linear-gradient-overlay pos-f fullsize"></div>
  <div class="page-background-radial-gradient-overlay pos-f"></div>
  <div class="page-container pos-r fullsize">
    <header class="page-header pos-f">
      <div class="logo-container dis-ib vat pos-r">
        <div class="logo-background pos-a"></div>
        <div class="logo pos-a"><a class="logo-image text-overflow dis-b" href="/">CED</a></div>
      </div>
      <div class="page-title-container dis-ib vat pos-r">
        <div class="page-title-background pos-a"></div>
        <h1 class="page-title pos-a f-inputsans f-light f-italic fs-base">Innovators Report</h1>
      </div>
      <ul class="list-reset social-list dis-ib vat fs-small">
        <li class="social-list-item dis-ib vam"><a class="icons icons-twitter text-overflow dis-b a-hover-opacity" href="#" target="_blank">Share on Twitter</a></li>
        <li class="social-list-item dis-ib vam"><a class="icons icons-facebook text-overflow dis-b a-hover-opacity" href="#" target="_blank">Share on Facebook</a></li>
        <li class="social-list-item dis-ib vam"><a class="icons icons-printer text-overflow dis-b a-hover-opacity js-prevent-default" href="#">Print Section</a></li>
        <li class="social-list-item dis-ib vam f-adelle f-light"></li>
      </ul>
    </header>

    <article class="page-content fullsize pos-a">
      <section id="cover" class="content-section pos-r fullsize text-ac" data-panel="cover">
        <div class="cover-container centered-column">
          <div class="cover-logo"><a class="logo-image text-overflow dis-b" href="/">CED</a></div>
          <img class="print-logo print-only" src="./images/ced_logo_black.png" alt="CED Logo"/>
          <h1 class="f-inputsans f-italic f-thin fs-h2">Innovators Report</h1>
          <a class="cover-view-report dis-ib f-adelle fs-h3 f-bold js-prevent-default" href="#">View Report</a>
          <div class="cover-copy-container">
            <p class="f-inputsans f-italic f-thin fs-small">The Council for Entrepreneurial Development (CED) is the largest and longest-running network for entrepreneurs in the country. Its proprietary <span class="f-normal f-s-normal">Innovators Report</span> compiles data on startup and scaleup company activity in North Carolina with an unrivaled depth and scope.</p>
            <p class="f-inputsans f-italic f-thin fs-small">This digital, interactive version of the <span class="f-normal f-s-normal">Innovators Report</span> contains data going back to 2013, covering funding, funders, deals, and exits.  The Report allows for filtering across a number of useful categories, including year-over-year comparisons, sectors, locations, funding and investor types and much more.</p>
            <p class="f-inputsans f-italic f-thin fs-small">Please enjoy exploring the <span class="f-normal f-s-normal">Innovators Report</span>. If you have feedback or insights to share, contact Dhruv Patel, CED’s Director of Investor Relations: <a class="f-normal f-s-normal" href="mailto:dpatel@cednc.org">dpatel@cednc.org</a></p>
            <br />
            <p class="f-inputsans fs-xsmall">Data Sources: Innovators Report data were compiled from SEC Filings, media coverage, our partners, and the entrepreneurs themselves. A special thanks to our data partners:</p>
            <p class="f-inputsans fs-xsmall">
              National Venture Capital Association (NVCA)<br />
              North Carolina Biotechnology Center<br />
              Ernst &amp; Young<br />
              PricewaterhouseCoopers<br />
              <a href="https://www.sbir.gov" target="_blank">SBIR.gov</a><br />
              The Innovators Report is made possible by generous gifts to the CED Annual Fund. Thank you to our many supporters! For more information on how to contribute, please visit <a href="http://www.cednc.org/donate" target="_blank">www.cednc.org/donate</a>.
            </p>
            <h3 class="f-inputsans fs-h3">Connect + Grow</h3>
            <ul class="color-legend print-only">
              <li><strong>Sector Legend</strong></li>
              <li class="color-blue">Tech</li>
              <li class="color-green">Life Science</li>
              <li class="color-red">Advanced Manufacturing & Materials</li>
              <li class="color-white-alt">Cleantech</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="funding" class="content-section pos-r fullsize" data-panel="funding">
        <header class="content-header pos-r clearfix">
          <h2 class="content-title float-r f-inputsans f-thin f-italic fs-h2">Funding</h2>
          <ul class="list-reset filter-list pos-a">
            <li class="filter-list-item dis-ib vat pos-r js-dropdown js-funding-year-dropdown">
              <span class="dropdown-title dis-ib vam f-inputsans f-thin">Year</span>
              <span class="dropdown-slash dropdown-slash-first dis-ib vam"></span>
              <span class="dropdown-slash dis-ib vam"></span>
              <a class="dropdown-trigger dis-ib vam js-prevent-default" href="#">
                <span class="dropdown-current dis-ib vam f-adelle">2015</span>
                <span class="dropdown-arrow float-r dis-ib vam icons icons-down-arrow"></span>
              </a>
              <ul class="list-reset dropdown-list pos-a f-adelle"></ul>
            </li>
            <li class="filter-list-item dis-ib vat pos-r js-dropdown js-funding-sector-dropdown">
              <span class="dropdown-title dis-ib vam f-inputsans f-thin">Sector</span>
              <span class="dropdown-slash dropdown-slash-first dis-ib vam"></span>
              <span class="dropdown-slash dis-ib vam"></span>
              <a class="dropdown-trigger dis-ib vam js-prevent-default" href="#">
                <span class="dropdown-current dis-ib vam f-adelle">All</span>
                <span class="dropdown-arrow float-r dis-ib vam icons icons-down-arrow"></span>
              </a>
              <ul class="list-reset dropdown-list pos-a f-adelle">
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-funding-filter-sector" href="#" data-sector="All">All</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-funding-filter-sector" href="#" data-sector="Tech">Tech</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-funding-filter-sector" href="#" data-sector="Life Science">Life Sci</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-funding-filter-sector" href="#" data-sector="Advanced Manufacturing & Materials">Adv M&amp;M</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-funding-filter-sector" href="#" data-sector="Cleantech">Cleantech</a></li>
              </ul>
            </li>
            <li class="filter-list-item dis-ib vat pos-r js-dropdown js-funding-type-dropdown">
              <span class="dropdown-title dis-ib vam f-inputsans f-thin">Type</span>
              <span class="dropdown-slash dropdown-slash-first dis-ib vam"></span>
              <span class="dropdown-slash dis-ib vam"></span>
              <a class="dropdown-trigger dis-ib vam js-prevent-default" href="#">
                <span class="dropdown-current dis-ib vam f-adelle">All</span>
                <span class="dropdown-arrow float-r dis-ib vam icons icons-down-arrow"></span>
              </a>
              <ul class="list-reset dropdown-list pos-a f-adelle">
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-funding-filter-type" href="#" data-type="All">All</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-funding-filter-type" href="#" data-type="Equity">Equity</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-funding-filter-type" href="#" data-type="Grants & Awards">Grants/Awards</a></li>
              </ul>
            </li>
          </ul>
        </header>

        <div class="funding-left pos-a filter-content">
          <div class="funding-pie-text pos-a no-pointer-event">
            <div class="funding-pie-title pie-title f-inputsans f-thin f-italic fs-h2 text-ac text-shadow-large"></div>
            <div class="funding-pie-subtitle pie-title f-adelle f-bold fs-h1 text-ac text-shadow-large"></div>
          </div>
        </div>
        <div class="funding-right pos-a filter-content"></div>

        <div class="share-box-container funding-share-box pos-a">
          <div class="share-box clearfix">
            <p class="f-inputsans f-xlight f-italic"><?php echo $quotes[0]; ?></p>
            <ul class="list-reset share-box-list float-r">
              <li class="share-box-list-item dis-ib vam f-adelle">Share:</li>
              <li class="share-box-list-item dis-ib vam"><a class="icons icons-twitter text-overflow dis-b a-hover-opacity" href="#" target="_blank">Twitter</a></li>
              <li class="share-box-list-item dis-ib vam"><a class="icons icons-facebook text-overflow dis-b a-hover-opacity" href="#" target="_blank">Facebook</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section id="funders" class="content-section pos-r fullsize" data-panel="funders">
        <header class="content-header pos-r clearfix">
          <h2 class="content-title float-r f-inputsans f-thin f-italic fs-h2">Funders</h2>
          <ul class="list-reset filter-list pos-a">
            <li class="filter-list-item dis-ib vat pos-r js-dropdown js-funders-sector-dropdown">
              <span class="dropdown-title dis-ib vam f-inputsans f-thin">Sector</span>
              <span class="dropdown-slash dropdown-slash-first dis-ib vam"></span>
              <span class="dropdown-slash dis-ib vam"></span>
              <a class="dropdown-trigger dis-ib vam js-prevent-default" href="#">
                <span class="dropdown-current dis-ib vam f-adelle">All</span>
                <span class="dropdown-arrow float-r dis-ib vam icons icons-down-arrow"></span>
              </a>
              <ul class="list-reset dropdown-list pos-a f-adelle">
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-funders-filter-sector" href="#" data-sector="All">All</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-funders-filter-sector" href="#" data-sector="Tech">Tech</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-funders-filter-sector" href="#" data-sector="Life Science">Life Sci</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-funders-filter-sector" href="#" data-sector="Advanced Manufacturing & Materials">Adv M&amp;M</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-funders-filter-sector" href="#" data-sector="Cleantech">Cleantech</a></li>
              </ul>
            </li>
            <li class="filter-list-item dis-ib vat pos-r js-dropdown js-funders-type-dropdown">
              <span class="dropdown-title dis-ib vam f-inputsans f-thin">Investor Type</span>
              <span class="dropdown-slash dropdown-slash-first dis-ib vam"></span>
              <span class="dropdown-slash dis-ib vam"></span>
              <a class="dropdown-trigger dis-ib vam js-prevent-default" href="#">
                <span class="dropdown-current dis-ib vam f-adelle">All</span>
                <span class="dropdown-arrow float-r dis-ib vam icons icons-down-arrow"></span>
              </a>
              <ul class="list-reset dropdown-list pos-a f-adelle">
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-funders-filter-type" href="#" data-type="All">All</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-funders-filter-type" href="#" data-type="Venture Fund">Venture Fund</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-funders-filter-type" href="#" data-type="Corporate Fund">Corporate Fund</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-funders-filter-type" href="#" data-type="Angel Group">Angel Group</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-funders-filter-type" href="#" data-type="Growth">Growth</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-funders-filter-type" href="#" data-type="Strategic">Strategic</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-funders-filter-type" href="#" data-type="Grant">Grant</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-funders-filter-type" href="#" data-type="Award">Award</a></li>
              </ul>
            </li>
          </ul>
        </header>

        <div class="funders-container pos-a filter-content">
          <div class="funders-state-info modal-container pos-a no-pointer-event js-funders-state-info">
            <p class="info-title fs-h3 f-adelle js-funders-state-info-title"></p>
            <div class="info-item">
              <span class="f-inputsans f-thin f-italic">Investors:</span>
              <span class="f-adelle js-funders-state-info-investors"></span>
              <a class="color-red f-adelle f-italic fs-small js-prevent-default js-funders-state-info-learnmore" href="#">(learn more)</a>
            </div>
            <div class="info-item">
              <span class="f-inputsans f-thin f-italic">Tech:</span>
              <span class="f-adelle js-funders-state-info-tech"></span>
            </div>
            <div class="info-item">
              <span class="f-inputsans f-thin f-italic">Life Science:</span>
              <span class="f-adelle js-funders-state-info-lifescience">9</span>
            </div>
            <div class="info-item">
              <span class="f-inputsans f-thin f-italic">Advanced M&M:</span>
              <span class="f-adelle js-funders-state-info-amm"></span>
            </div>
            <div class="info-item">
              <span class="f-inputsans f-thin f-italic">Cleantech:</span>
              <span class="f-adelle js-funders-state-info-cleantech"></span>
            </div>
          </div>

          <div class="funders-investors-container js-funders-investors-container modal-container pos-a no-pointer-event">
            <a class="funders-investors-close pos-a js-prevent-default js-funders-investors-close fs-h3" href="#">&times;</a>
            <ul class="list-reset funders-investors-list pos-a"></ul>
          </div>
        </div>

        <div class="share-box-container centered-share-box centered-column pos-a">
          <div class="share-box clearfix">
            <p class="f-inputsans f-xlight f-italic"><?php echo $quotes[1]; ?></p>
            <ul class="list-reset share-box-list float-r">
              <li class="share-box-list-item dis-ib vam f-adelle">Share:</li>
              <li class="share-box-list-item dis-ib vam"><a class="icons icons-twitter text-overflow dis-b a-hover-opacity" href="#" target="_blank">Twitter</a></li>
              <li class="share-box-list-item dis-ib vam"><a class="icons icons-facebook text-overflow dis-b a-hover-opacity" href="#" target="_blank">Facebook</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section id="deals" class="content-section pos-r fullsize" data-panel="deals">
        <header class="content-header pos-r clearfix">
          <h2 class="content-title float-r f-inputsans f-thin f-italic fs-h2">Deals</h2>
          <ul class="list-reset filter-list pos-a">
            <li class="filter-list-item dis-ib vat pos-r js-dropdown js-deals-segment-dropdown js-deals-year-dropdown">
              <span class="dropdown-title dis-ib vam f-inputsans f-thin">Year</span>
              <span class="dropdown-slash dropdown-slash-first dis-ib vam"></span>
              <span class="dropdown-slash dis-ib vam"></span>
              <a class="dropdown-trigger dis-ib vam js-prevent-default" href="#">
                <span class="dropdown-current dis-ib vam f-adelle">2015</span>
                <span class="dropdown-arrow float-r dis-ib vam icons icons-down-arrow"></span>
              </a>
              <ul class="list-reset dropdown-list pos-a f-adelle"></ul>
            </li>
            <li class="filter-list-item dis-ib vat pos-r js-dropdown js-deals-segment-dropdown">
              <span class="dropdown-title dis-ib vam f-inputsans f-thin">Size</span>
              <span class="dropdown-slash dropdown-slash-first dis-ib vam"></span>
              <span class="dropdown-slash dis-ib vam"></span>
              <a class="dropdown-trigger dis-ib vam js-prevent-default" href="#">
                <span class="dropdown-current dis-ib vam f-adelle">None</span>
                <span class="dropdown-arrow float-r dis-ib vam icons icons-down-arrow"></span>
              </a>
              <ul class="list-reset dropdown-list pos-a f-adelle">
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-deals-filter-segment" href="#" data-segment="0-999k">0-999k</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-deals-filter-segment" href="#" data-segment="1m-4.9m">1m-4.9m</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-deals-filter-segment" href="#" data-segment="5m-14.9m">5m-14.9m</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-deals-filter-segment" href="#" data-segment="15m-29.9m">15m-29.9m</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-deals-filter-segment" href="#" data-segment="30m-49.9m">30m-49.9m</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-deals-filter-segment" href="#" data-segment="50m+">50m+</a></li>
              </ul>
            </li>
            <li class="filter-list-item dis-ib vat pos-r js-dropdown js-deals-segment-dropdown">
              <span class="dropdown-title dis-ib vam f-inputsans f-thin">Location</span>
              <span class="dropdown-slash dropdown-slash-first dis-ib vam"></span>
              <span class="dropdown-slash dis-ib vam"></span>
              <a class="dropdown-trigger dis-ib vam js-prevent-default" href="#">
                <span class="dropdown-current dis-ib vam f-adelle">None</span>
                <span class="dropdown-arrow float-r dis-ib vam icons icons-down-arrow"></span>
              </a>
              <ul class="list-reset dropdown-list pos-a f-adelle">
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-deals-filter-segment" href="#" data-segment="Triangle Region">Triangle Region</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-deals-filter-segment" href="#" data-segment="Asheville">Asheville</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-deals-filter-segment" href="#" data-segment="Candler">Candler</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-deals-filter-segment" href="#" data-segment="Cary">Cary</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-deals-filter-segment" href="#" data-segment="Chapel Hill">Chapel Hill</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-deals-filter-segment" href="#" data-segment="Charlotte">Charlotte</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-deals-filter-segment" href="#" data-segment="Clayton">Clayton</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-deals-filter-segment" href="#" data-segment="Durham">Durham</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-deals-filter-segment" href="#" data-segment="Greensboro">Greensboro</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-deals-filter-segment" href="#" data-segment="Horsham">Horsham</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-deals-filter-segment" href="#" data-segment="Morrisville">Morrisville</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-deals-filter-segment" href="#" data-segment="Raleigh">Raleigh</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-deals-filter-segment" href="#" data-segment="Research Triangle Park">Research Tri-Park</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-deals-filter-segment" href="#" data-segment="Wake Forest">Wake Forest</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-deals-filter-segment" href="#" data-segment="Waxhaw">Waxhaw</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-deals-filter-segment" href="#" data-segment="Wilmington">Wilmington</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-deals-filter-segment" href="#" data-segment="Winston-Salem">Winston-Salem</a></li>
                <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-deals-filter-segment" href="#" data-segment="Zebulon">Zebulon</a></li>
              </ul>
            </li>
          </ul>
        </header>

        <div class="deals-container pos-a filter-content">
          <ul class="list-reset deals-text-list"></ul>
        </div>

        <div class="share-box-container centered-share-box centered-column pos-a">
          <div class="share-box clearfix">
            <p class="f-inputsans f-xlight f-italic"><?php echo $quotes[2]; ?></p>
            <ul class="list-reset share-box-list float-r">
              <li class="share-box-list-item dis-ib vam f-adelle">Share:</li>
              <li class="share-box-list-item dis-ib vam"><a class="icons icons-twitter text-overflow dis-b a-hover-opacity" href="#" target="_blank">Twitter</a></li>
              <li class="share-box-list-item dis-ib vam"><a class="icons icons-facebook text-overflow dis-b a-hover-opacity" href="#" target="_blank">Facebook</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section id="exits" class="content-section pos-r fullsize" data-panel="exits">
        <header class="content-header pos-r clearfix">
          <h2 class="content-title float-r f-inputsans f-thin f-italic fs-h2">Exits</h2>
          <div class="content-subtitle pos-a text-ac f-inputsans f-thin f-italic fs-h4">
            <strong class="exits-ipo-count f-adelle">1</strong> <span class="exits-ipo-title">IPO</span> &amp; <strong class="exits-ma-count f-adelle">11</strong> <span class="exits-ma-title">Mergers/Aquisitions</span>
          </div>
        </header>

        <div class="exits-container pos-a">
          <ul class="list-reset exits-list text-ac"></ul>
        </div>

        <div class="share-box-container centered-share-box centered-column pos-a">
          <div class="share-box clearfix">
            <p class="f-inputsans f-xlight f-italic"><?php echo $quotes[3]; ?></p>
            <ul class="list-reset share-box-list float-r">
              <li class="share-box-list-item dis-ib vam f-adelle">Share:</li>
              <li class="share-box-list-item dis-ib vam"><a class="icons icons-twitter text-overflow dis-b a-hover-opacity" href="#" target="_blank">Twitter</a></li>
              <li class="share-box-list-item dis-ib vam"><a class="icons icons-facebook text-overflow dis-b a-hover-opacity" href="#" target="_blank">Facebook</a></li>
            </ul>
          </div>
        </div>
      </section>

      <div class="pos-f modal-container no-data-modal f-adelle text-ac">
        <p>Grants &amp; Awards data are not released<br />until the end of the calendar year.</p>
      </div>
    </article>

    <footer class="page-footer pos-f">
      <ul class="list-reset nav-list dis-b text-ac">
        <li class="nav-list-item dis-ib f-inputsans is-active"><a class="js-prevent-default" href="#cover" data-panel="cover"><div class="f-xlight f-italic fs-small">Cover</div><div>&middot;</div></a></li>
        <li class="nav-list-item dis-ib f-inputsans"><a class="js-prevent-default" href="#funding" data-panel="funding"><div class="f-xlight f-italic fs-small">Funding</div><div>&middot;</div></a></li>
        <li class="nav-list-item dis-ib f-inputsans"><a class="js-prevent-default" href="#funders" data-panel="funders"><div class="f-xlight f-italic fs-small">Funders</div><div>&middot;</div></a></li>
        <li class="nav-list-item dis-ib f-inputsans"><a class="js-prevent-default" href="#deals" data-panel="deals"><div class="f-xlight f-italic fs-small">Deals</div><div>&middot;</div></a></li>
        <li class="nav-list-item dis-ib f-inputsans"><a class="js-prevent-default" href="#exits" data-panel="exits"><div class="f-xlight f-italic fs-small">Exits</div><div>&middot;</div></a></li>
      </ul>
    </footer>
  </div>

  <script id="funding-filter-year-item-template" type="text/x-handlebars-template">
    <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-funding-filter-year" href="#" data-year="{{year}}">{{year}}</a></li>
  </script>

  <script id="deals-filter-year-item-template" type="text/x-handlebars-template">
    <li class="dropdown-list-item"><a class="dis-b js-prevent-default js-deals-filter-segment" href="#" data-segment="{{year}}">{{year}}</a></li>
  </script>

  <script id="exits-item-template" type="text/x-handlebars-template">
    <li class="exits-list-item dis-ib vat pos-r">
      <div class="exits-logo-container pos-a fullsize">
        <div class="exits-logo pos-a" style="background-image:url('{{logo}}')"></div>
        <img class="exits-print-logo print-only" src="{{logo}}" />
        <div class="exits-type pos-a fs-small f-inputsans text-ac">{{short_type}}</div>
      </div>
      <div class="exits-info text-shadow pos-a text-al no-pointer-event">
        <p class="info-title fs-h3 f-adelle">{{company_name}}</p>
        <div class="info-item">
          <span class="f-inputsans f-thin f-italic">Exit:</span>
          <span class="f-adelle">{{type}}</span>
        </div>
        <div class="info-item">
          <span class="f-inputsans f-thin f-italic">{{ticker_label}}:</span>
          <span class="f-adelle">{{ticker}}</span>
        </div>
        <div class="info-item">
          <span class="f-inputsans f-thin f-italic">Size:</span>
          <span class="f-adelle">{{size}}</span>
        </div>
        <div class="info-item">
          <span class="f-inputsans f-thin f-italic">Sector:</span>
          <span class="f-adelle">{{sector}}</span>
        </div>
      </div>
    </li>
  </script>

  <script id="funders-investors-item-template" type="text/x-handlebars-template">
    <li class="funders-investors-list-item">
      <p class="info-title fs-h3 f-adelle">{{investor_name}}</p>
      <div class="info-item">
        <span class="f-inputsans f-thin f-italic">Investor Type:</span>
        <span class="f-adelle">{{type}}</span>
      </div>
      <div class="info-item">
        <span class="f-inputsans f-thin f-italic">Tech:</span>
        <span class="f-adelle js-funders-state-info-tech">{{tech}}</span>
      </div>
      <div class="info-item">
        <span class="f-inputsans f-thin f-italic">Life Science:</span>
        <span class="f-adelle js-funders-state-info-lifescience">{{lifescience}}</span>
      </div>
      <div class="info-item">
        <span class="f-inputsans f-thin f-italic">Advanced M&M:</span>
        <span class="f-adelle js-funders-state-info-amm">{{amm}}</span>
      </div>
      <div class="info-item">
        <span class="f-inputsans f-thin f-italic">Cleantech:</span>
        <span class="f-adelle js-funders-state-info-cleantech">{{cleantech}}</span>
      </div>
    </li>
  </script>

  <script id="deals-text-item-template" type="text/x-handlebars-template">
    <li class="deals-text-list-item pos-a text-ac">
      <div class="deals-text-list-item-p-title f-inputsans f-thin f-italic text-shadow fs-small">{{primary_title}}</div>
      <div class="deals-text-list-item-p-value f-adelle f-bold fs-h4 text-shadow">{{primary_value}}</div>
      <span class="deals-text-list-item-s-title f-inputsans f-thin f-italic text-shadow fs-small">{{secondary_title}}</span> <span class="deals-text-list-item-s-value f-adelle f-bold text-shadow fs-small">{{secondary_value}}</span>
    </li>
  </script>

  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.2/handlebars.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js" charset="utf-8"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/topojson/1.6.19/topojson.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/numeral.js/1.4.5/numeral.min.js"></script>
  <script src="javascripts/jquery.ba-throttle-debounce.min.js" type="text/javascript"></script>
  <script src="javascripts/jquery.panelSnap.js" type="text/javascript"></script>
  <script src="javascripts/purl.js" type="text/javascript"></script>
  <script src="javascripts/main.js" type="text/javascript"></script>
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-58226327-1', 'auto');
    ga('send', 'pageview');
  </script>
</body>
</html>
