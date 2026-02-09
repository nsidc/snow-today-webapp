# v0.18.4 (2025-01-20)

* Remove author from citation. 

# v0.18.3 (2025-10-24)

* Add author to citation.

# v0.18.2 (2024-03-17)

* Add units to SWE tooltips.

# v0.18.1 (2024-03-06)

* Fix bug calculating SWE legend URL.


# v0.18.0 (2024-03-06)

* Prevent sub-region collection selector options from line breaking.
* Display uniform titles for maps and plots.
* Update citation text for maps and plots.


# v0.17.0 (2024-03-06)

* Display sensor/platform/algorithm in variable selectors.
* Default basemap is now _USGS Topographic + Imagery_
* Update expected JSON structures to match
  [new snow-today-webapp-server specifications](https://snow-today-webapp-server.readthedocs.io/interfaces/).
    * Support arbitrary nesting of sub-regions specified in server-side data.


## Under the hood

* Migrate from Recoil to Jotai


# v0.16.0 (2024-02-08)

* Support multiple super-regions
* Support arbitrary hierarchy of sub-region/collections
* Display legends statically (remove drag-and-resize function)
* Display minimum and maximum years in plot legend
* Migrate internal state management from Recoil -> Jotai


# v0.15.1 (2022-12-13)

* Bugfix: SWE points would not clear when selecting "None" from dropdown


# v0.15.0 (2022-12-07)

* Add SWE point layer and selector dropdown
  * Display tooltip for selected SWE point (bug: issue #29)
* Fix issue with layout config dropdown displaying improperly in Chrome
* Improve style of Year to Date plot line
* Add date as subtitle to line plots


# v0.14.0 (2022-09-21)

* Show xAxis Day of Water Year labels as calendar dates
* Show citation on each tile


# v0.13.0 (2022-09-20)

* Correctly display data with dynamic colormaps


# v0.12.0 (2022-09-15)

* Enable Highcharts accessibility module
* Set plot value precision dynamically from JSON
* Change thousands separator in plots to `,`
* Display custom variable longname on plots


# v0.11.1 (2022-09-14)

* Remove excessive console log


# v0.11.0 (2022-09-14)

* Add reset button which refreshes the page
* Increase font sizes on plots


# v0.10.0 (2022-09-14)

* Display configured y-axis label from JSON
* Display legend over map


# v0.9.0 (2022-09-12)

* Enable independent toggle for not-processed raster data


# v0.8.0 (2022-09-12)

* Add ArcGIS Dark Grey basemap


# v0.7.0 (2022-09-12)

* Add layout configuration panel for configurable number of tiles


# v0.6.0 (2022-09-06)

* Show only "enabled" satellite variables
* Default to displaying the satellite variable with `default: true` set


# v0.5.1 (2022-09-02)

* Use a publicly-exposed production data URL


# v0.5.0 (2022-08-29)

* Build interactions between SuperRegions, SubRegionCollections, and SubRegions based on
  data provided by new `regions.json` schema from `snow-today-webapp-server`


# v0.4.4 (2022-08-29)

* Completely disable webpack code splitting


# v0.4.3 (2022-08-29)

* Try another `publicPath` setting...


# v0.4.2 (2022-08-29)

* Try fixing UNPKG with code splitting


# v0.4.1 (2022-08-29)

* Fix publication of bundle to NPM


# v0.4.0 (2022-08-23)

* Use Bootstrap "Dropdowns" for controls 


# v0.3.3 (2022-08-23)

* App will be rendered into element with ID `snow-today-webapp-appcontainer`.


# v0.3.2 (2022-08-22)

* Fix deploy script use of docker-compose files


# v0.3.1 (2022-08-22)

* Fix deployment script version solver


# v0.3.0 (2022-08-22)

* Add automated deployment script


# v0.2.0 (2022-08-22)

* Use QA data server URL


# v0.1.1 (2022-08-22)

* Fix bug with data "leaking" between variables in the plot


# v0.1.0 (2022-08-18)

* Initial release
