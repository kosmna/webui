#!/bin/sh
#
# Copyright (c) 2017 Litmus Automation Inc.
#
set -e -x

pkg_dir=build
pkg_name=kosmyna-webui
pkg_ver=${Demo_WEBUI_PKG_VERSION:-2.0.0}-0

share_dir=usr/share/${pkg_name}

rm -rf "${pkg_dir}"
mkdir -p "${pkg_dir}/${share_dir}"
mkdir -p "${pkg_dir}/DEBIAN"

cp -r dist/. "${pkg_dir}/${share_dir}"

cat >"${pkg_dir}/DEBIAN/control" <<EOF
Package: ${pkg_name}
Version: ${pkg_ver}
Section: base
Architecture: all
Maintainer: Litmus Automation <support@cosmyna.com>
Priority: optional
Description: Demo WebUI 2.0.
EOF

# create the package
dpkg-deb --build "${pkg_dir}" "${pkg_name}_${pkg_ver}_all.deb"
