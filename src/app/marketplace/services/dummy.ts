
// tslint:disable:max-line-length
export const APP_LOGS =
`[2018-05-08T07:50:10,633][WARN ][o.e.b.JNANatives         ] Unable to lock JVM Memory: error=12, reason=Cannot allocate memory
[2018-05-08T07:50:10,644][WARN ][o.e.b.JNANatives         ] This can result in part of the JVM being swapped out.
[2018-05-08T07:50:10,645][WARN ][o.e.b.JNANatives         ] Increase RLIMIT_MEMLOCK, soft limit: 83968000, hard limit: 83968000
[2018-05-08T07:50:10,646][WARN ][o.e.b.JNANatives         ] These can be adjusted by modifying /etc/security/limits.conf, for example:
    # allow user 'elasticsearch' mlockall
    elasticsearch soft memlock unlimited
    elasticsearch hard memlock unlimited
[2018-05-08T07:50:10,648][WARN ][o.e.b.JNANatives         ] If you are logged in interactively, you will have to re-login for the new limits to take effect.
[2018-05-08T07:50:11,058][INFO ][o.e.n.Node               ] [] initializing ...
[2018-05-08T07:50:11,210][INFO ][o.e.e.NodeEnvironment    ] [rhCINlq] using [1] data paths, mounts [[/usr/share/elasticsearch/data (/dev/sda1)]], net usable_space [49.5gb], net total_space [62.7gb], types [ext4]
[2018-05-08T07:50:11,211][INFO ][o.e.e.NodeEnvironment    ] [rhCINlq] heap size [495.3mb], compressed ordinary object pointers [true]
[2018-05-08T07:50:11,213][INFO ][o.e.n.Node               ] node name [rhCINlq] derived from node ID [rhCINlqlRuCMEU2lx_Ogqg]; set [node.name] to override
[2018-05-08T07:50:11,214][INFO ][o.e.n.Node               ] version[6.2.4], pid[1], build[ccec39f/2018-04-12T20:37:28.497551Z], OS[Linux/4.9.87-linuxkit-aufs/amd64], JVM[Oracle Corporation/OpenJDK 64-Bit Server VM/1.8.0_161/25.161-b14]
[2018-05-08T07:50:11,214][INFO ][o.e.n.Node               ] JVM arguments [-Xms1g, -Xmx1g, -XX:+UseConcMarkSweepGC, -XX:CMSInitiatingOccupancyFraction=75, -XX:+UseCMSInitiatingOccupancyOnly, -XX:+AlwaysPreTouch, -Xss1m, -Djava.awt.headless=true, -Dfile.encoding=UTF-8, -Djna.nosys=true, -XX:-OmitStackTraceInFastThrow, -Dio.netty.noUnsafe=true, -Dio.netty.noKeySetOptimization=true, -Dio.netty.recycler.maxCapacityPerThread=0, -Dlog4j.shutdownHookEnabled=false, -Dlog4j2.disable.jmx=true, -Djava.io.tmpdir=/tmp/elasticsearch.TjXZzo5B, -XX:+HeapDumpOnOutOfMemoryError, -XX:+PrintGCDetails, -XX:+PrintGCDateStamps, -XX:+PrintTenuringDistribution, -XX:+PrintGCApplicationStoppedTime, -Xloggc:logs/gc.log, -XX:+UseGCLogFileRotation, -XX:NumberOfGCLogFiles=32, -XX:GCLogFileSize=64m, -Des.cgroups.hierarchy.override=/, -Xms512m, -Xmx512m, -Des.path.home=/usr/share/elasticsearch, -Des.path.conf=/usr/share/elasticsearch/config]
[2018-05-08T07:50:12,369][INFO ][o.e.p.PluginsService     ] [rhCINlq] loaded module [aggs-matrix-stats]
[2018-05-08T07:50:12,370][INFO ][o.e.p.PluginsService     ] [rhCINlq] loaded module [analysis-common]
[2018-05-08T07:50:12,370][INFO ][o.e.p.PluginsService     ] [rhCINlq] loaded module [ingest-common]
[2018-05-08T07:50:12,371][INFO ][o.e.p.PluginsService     ] [rhCINlq] loaded module [lang-expression]
[2018-05-08T07:50:12,371][INFO ][o.e.p.PluginsService     ] [rhCINlq] loaded module [lang-mustache]
[2018-05-08T07:50:12,371][INFO ][o.e.p.PluginsService     ] [rhCINlq] loaded module [lang-painless]
[2018-05-08T07:50:12,372][INFO ][o.e.p.PluginsService     ] [rhCINlq] loaded module [mapper-extras]
[2018-05-08T07:50:12,372][INFO ][o.e.p.PluginsService     ] [rhCINlq] loaded module [parent-join]
[2018-05-08T07:50:12,372][INFO ][o.e.p.PluginsService     ] [rhCINlq] loaded module [percolator]
[2018-05-08T07:50:12,372][INFO ][o.e.p.PluginsService     ] [rhCINlq] loaded module [rank-eval]
[2018-05-08T07:50:12,375][INFO ][o.e.p.PluginsService     ] [rhCINlq] loaded module [reindex]
[2018-05-08T07:50:12,375][INFO ][o.e.p.PluginsService     ] [rhCINlq] loaded module [repository-url]
[2018-05-08T07:50:12,375][INFO ][o.e.p.PluginsService     ] [rhCINlq] loaded module [transport-netty4]
[2018-05-08T07:50:12,376][INFO ][o.e.p.PluginsService     ] [rhCINlq] loaded module [tribe]
[2018-05-08T07:50:12,377][INFO ][o.e.p.PluginsService     ] [rhCINlq] loaded plugin [ingest-geoip]
[2018-05-08T07:50:12,377][INFO ][o.e.p.PluginsService     ] [rhCINlq] loaded plugin [ingest-user-agent]
[2018-05-08T07:50:17,344][INFO ][o.e.d.DiscoveryModule    ] [rhCINlq] using discovery type [single-node]
[2018-05-08T07:50:18,557][INFO ][o.e.n.Node               ] initialized
[2018-05-08T07:50:18,558][INFO ][o.e.n.Node               ] [rhCINlq] starting ...
[2018-05-08T07:50:19,116][INFO ][o.e.t.TransportService   ] [rhCINlq] publish_address {172.22.0.2:9300}, bound_addresses {0.0.0.0:9300}
[2018-05-08T07:50:19,147][WARN ][o.e.b.BootstrapChecks    ] [rhCINlq] memory locking requested for elasticsearch process but memory is not locked
[2018-05-08T07:50:19,211][INFO ][o.e.h.n.Netty4HttpServerTransport] [rhCINlq] publish_address {172.22.0.2:9200}, bound_addresses {0.0.0.0:9200}
[2018-05-08T07:50:19,212][INFO ][o.e.n.Node               ] [rhCINlq] started
[2018-05-08T07:50:19,382][INFO ][o.e.g.GatewayService     ] [rhCINlq] recovered [0] indices into cluster_state`;
// tslint:enable:max-line-length
