export interface ApplicationStats {
  read: Date;
  precpu_stats: CpuStats;
  cpu_stats: CpuStats;
  memory_stats: MemoryStats;
  blkio_stats: BlockIOStats;
  pids_stats: PidsStats;
}

export interface CpuStats {
  cpu_usage: CpuUsage;
  system_cpu_usage: number;
  throttling_data: ThrottlingData;
}

export interface CpuUsage {
  total_usage: number;
  percpu_usage: Array<number>;
  usage_in_kernelmode: number;
  usage_in_usermode: number;
}

export interface ThrottlingData {
  periods: number;
  throttled_periods: number;
  throttled_time: number;
}

export interface MemoryStats {
  usage: number;
  max_usage: number;
  stats: Stats;
  failcnt: number;
  limit: number;
}

export interface Stats {
  active_anon: number;
  active_file: number;
  cache: number;
  dirty: number;
  hierarchical_memory_limit: number;
  inactive_anon: number;
  inactive_file: number;
  mapped_file: number;
  pgfault: number;
  pgmajfault: number;
  pgpgin: number;
  pgpgout: number;
  rss: number;
  rss_huge: number;
  total_active_anon: number;
  total_active_file: number;
  total_cache: number;
  total_dirty: number;
  total_inactive_anon: number;
  total_inactive_file: number;
  total_mapped_file: number;
  total_pgfault: number;
  total_pgmajfault: number;
  total_pgpgin: number;
  total_pgpgout: number;
  total_rss: number;
  total_rss_huge: number;
  total_unevictable: number;
  total_writeback: number;
  unevictable: number;
  writeback: number;
}

export interface BlockIOStats {
  io_service_bytes_recursive: Array<IoStats>;
  io_serviced_recursive: Array<IoStats>;
  io_queue_recursive: Array<IoStats>;
  io_service_time_recursive: Array<IoStats>;
  io_wait_time_recursive: Array<IoStats>;
  io_merged_recursive: Array<IoStats>;
  io_time_recursive: Array<IoStats>;
  sectors_recursive: Array<IoStats>;
}

export interface IoStats {
  major: number;
  minor: number;
  op: string;
  value: number;
}

export interface PidsStats {
  current: number;
}

export interface NetworkStats {
  rx_bytes: number;
  rx_packets: number;
  rx_errors: number;
  rx_dropped: number;
  tx_bytes: number;
  tx_packets: number;
  tx_errors: number;
  tx_dropped: number;
}

export interface AppStatistics {
  blockRead: number;
  blockWrite: number;
  cpuPercent: number;
  memoryLimit: number;
  memoryPercent: number;
  memoryUsage: number;
  name: string;
  netRx: number;
  netTx: number;
  timestamp: number;
}
