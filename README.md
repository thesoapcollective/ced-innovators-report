# CED Innovators Report

## Funding

Data Notes:

- Equity data year columns should contain the quarter even if there isn't data available for it yet.
  - e.g. `2015 Q1`, `2015 Q2`, `2015 Q3`, `2015 Q4`, etc.
- It's assumed that Grants & Awards data isn't broken down into quarters, so only year columns are needed.
  - e.g. `2015`, `2014`, etc. 
- It's assumed Equity and Grants & Awards data having matching years.
  - i.e. If there is 2015 equity data, then there is 2015 grants data.

Default Filter:
```
var fundingFilter = {
  sector: 'All',
  type: 'Equity',
  year: 2015,
};
```
