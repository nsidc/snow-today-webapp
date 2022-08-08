#!/bin/bash
# Convert EPSG:4326 non-CO GeoTIFFs to Cloud-Optimized GeoTIFFs in Web
# Mercator.
#
# This script is a WIP. To use it, copy it into the directory
# containing another directory titled "originals", which contains the
# input files.
set -euo pipefail

THIS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
input_dir="$THIS_DIR/snow_today_2.0_testing/v001_westernUS/EPSG3857/2021/LZW"
output_dir="$THIS_DIR/cogs"

mkdir -p $output_dir

for inputfile in $input_dir/*.tif; do
    outputfile="${output_dir}/$(basename $inputfile)";
    
    # Make it Cloud-Optimized
    # TODO: -a_nodata 65535?
    gdal_translate "$inputfile" "$outputfile" -of COG \
        -co "OVERVIEW_RESAMPLING=NEAREST" \
        -co COMPRESS=LZW;
done
