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
    wip_file_template="${output_dir}/wip\${WIP_ID}_$(basename $file)";

    of="${output_dir}/$(basename $file)";

    # Map all >65500 values to 65535 and set noData value
    export WIP_ID=1
    wip_file="$( echo $wip_file_template | envsubst)"
    gdal_calc.py -A $file --outfile="$wip_file" \
        --calc "(A*(A<65500))+(65535*(A>=65500))" \
        --NoDataValue="65535"
    

    # Reproject to Web Mercator.
    # NOTE: This is not optimal, as the input files are in an intermediate
    # projection (EPSG:4326), not their original projection. By reprojecting
    # twice, we introduce error.
    prev_wip="$wip_file"
    export WIP_ID=2
    wip_file="$( echo $wip_file_template | envsubst)"
    gdalwarp -t_srs "EPSG:3857" "$prev_wip" "$wip_file";

    # Make it Cloud-Optimized
    # TODO: -a_nodata 65535?
    gdal_translate "$wip_file" "$of" -of COG -co COMPRESS=LZW;

    # Cleanup intermediate files
    rm "${output_dir}"/wip?_*;
done
