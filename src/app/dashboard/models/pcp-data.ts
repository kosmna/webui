/**
 * Data returned after a PCP 'fetch' call for incoming metrics
 */
export class PcpData {
  timestamp: PcpTimestamp;
  values: PcpMetric[];
}

/**
 * Timestamp for incoming PCP data
 */
export class PcpTimestamp {
  s: number;
  us: number;
}

/**
 * A collection of PCP values associated with a metric
 * @property pmid - The PMID of the current metric
 * @property name - The name of the current metric
 * @property instances - A list of values sorted by instance
 */
export class PcpMetric {
  pmid: number;
  name: string;
  instances: PcpValue[];
}

/**
 * A PCP Value associated with an Instance (by ID)
 * @property instance - The PCP Value Instance ID
 * @property value - The raw value associated with this Instance
 */
export class PcpValue {
  instance: number;
  value: number;
}

/**
 * A PCP Instance Domain, AKA a list of instances for the given metric
 * @property indom - The Instance Domain ID
 * @property instances - The list of PCP instances in this Domain
 */
export class PcpInstanceDomain {
  indom: number;
  instances: PcpInstance[];
}

/**
 * A PCP Instance which represents one value per metric
 * @property instance - The Instance ID
 * @property name - The name of the current Instance
 */
export class PcpInstance {
  instance: number;
  name: string;
}

export interface Context {
  context: number;
}
