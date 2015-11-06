# CED Innovators Report

## Running Locally
1. Clone the repo.
2. Start up a local Apache server (e.g. [MAMP](https://www.mamp.info/en/)).
3. Visit your local server (e.g. [http://localhost/innovatorsreport/](http://localhost/innovatorsreport/)).

## General Data Notes

- It's assumed there are only four sectors and they are:
  - Tech
  - Life Science
  - Advanced Manufacturing & Materials
  - Cleantech
- All filter columns are hardcoded to match the CSV data except data that is based on years (Funding/Deals data). For data that is filterable by year you can add new year columns to the data and the site will update itself accordingly.

## Funding Data Notes

- Equity data year columns should contain the quarter even if there isn't data available for it yet.
  - e.g. `2015 Q1`, `2015 Q2`, `2015 Q3`, `2015 Q4`, etc.
- It's assumed that Grants & Awards data isn't broken down into quarters, so only year columns are needed.
  - e.g. `2015`, `2014`, etc.
- It's assumed Equity and Grants & Awards data have matching years.
  - i.e. If there is 2015 equity data, then there is 2015 grants data.

Example `funding_equity.csv`:

|Sector|2015 Q1|2015 Q2|2015 Q3|2015 Q4|...|
|---|---:|---:|---:|---:|---|
|Tech|1234|1234|1234|1234|...|

Example `funding_ga.csv`:

|Sector|2015|2014|2013|...|
|---|---:|---:|---:|---|
|Tech|1234|1234|1234|...|

Default Filter:
```
var fundingFilter = {
  sector: 'All',
  type: 'Equity',
  year: 2015,
};
```

## Funders Data Notes

- All states should have a region attached to them, even if they are the only state in the region.
- All non-US states should have their region set to "International".
- Within `funders_investors.csv` the "Investor Type" column should match a column from `funders.csv`.
- Adding or removing any of the current investor types requires a code update.

Example `funders.csv`:

|State|Region|Tech|Life Science|Advanced M&M|Cleantech|Venture Fund|Corporate Fund|Angel Group|Growth|Strategic|Grant|Award|
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
|NC|Southeast|1|1|1|1|1|1|1|1|1|1|1|
|GBR|International|1|1|1|1|1|1|1|1|1|1|1|

Example `funders_investors.csv`:

|Funder|Billing State/Province|Investor Type|Life Science|Tech|AM&M|Cleantech|
|---|---|---|---:|---:|---:|---:|---:|
|Charlotte Angel Partners|NC|Angel Group|1|1|1|1|1|

Default Filter:
```
var fundersFilter = {
  sector: 'All',
  type: 'All',
};
```

## Deals Data Notes

- As many years as needed can be added to the data CSV.
- Adding or removing a city name or deal range requires a code update.

Example `deals_deals.csv`:

|Sector|2015|2014|...|Triangle Region|Asheville|...|0-999k|1m-4.9m|5m-14.9m|15m-29.9m|30m-49.9m|50m+|
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
|Tech|1|1|1|1|1|1|1|1|1|1|1|1|

Example `deals_companies.csv`:

|Sector|2015|2014|...|Triangle Region|Asheville|...|0-999k|1m-4.9m|5m-14.9m|15m-29.9m|30m-49.9m|50m+|
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
|Tech|1|1|1|1|1|1|1|1|1|1|1|1|

Default Filter:
```
var dealsFilter = {
  segment: '2015'
};
```

## Exits Data Notes

- For each company, a corresponding image for their logo needs to be uploaded into `images/logos/`. The filename should match what is in the CSV.
- Exit Type should be one of the following:
  - Acquisition
  - IPO
  - Merger

Example `exits.csv`:

|Company|Exit Type|Exit Size|Acquirer/Merger/Ticker|Sector|Logo|
|---|---|---:|---|---|---|
|Automated Insights|Acquisition|1234|LLC for STATS, LLC|Tech|automatedinsights.png|
