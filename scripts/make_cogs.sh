#!/bin/bash
# Convert EPSG:4326 non-CO GeoTIFFs to Cloud-Optimized GeoTIFFs in Web
# Mercator.
#
# This script is a WIP. To use it, copy it into the directory
# containing another directory titled "originals", which contains the
# input files.
set -euo pipefail

THIS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
output_dir="$THIS_DIR/cogs"

mkdir -p $output_dir

for file in originals/*; do
    wip_file="${output_dir}/wip_$(basename $file)";
    of="${output_dir}/$(basename $file)";

    # Reproject to Web Mercator.
    # NOTE: This is not optimal, as the input files are in an intermediate
    # projection (EPSG:4326), not their original projection. By reprojecting
    # twice, we introduce error.
    gdalwarp -t_srs "EPSG:3857" "$file" "$wip_file";

    # Make it Cloud-Optimized
    gdal_translate "$wip_file" "$of" -of COG -co COMPRESS=LZW;

    # Cleanup intermediate files
    rm $wip_file;
done
