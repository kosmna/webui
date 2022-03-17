#!/bin/sh
#
# Copyright (c) 2017 Litmus Automation Inc.
#
set -e -x

pkg_dir=build
pkg_name=${Demo_WEBUI_PKG_NAME:-kosmyna-webui}
pkg_ver=${Demo_WEBUI_PKG_VERSION:-2.0.0}-0

share_dir=usr/share/${pkg_name}

rm -rf "${pkg_dir}"
mkdir -p "${pkg_dir}/${share_dir}"

cp -r dist/. "${pkg_dir}/${share_dir}/"

# create the package
tar cfvz "${pkg_name}_${pkg_ver}_all.tar.gz" -C "${pkg_dir}" .
