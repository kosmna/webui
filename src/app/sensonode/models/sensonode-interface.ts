export interface SensonodeInterface {
  config: {
    baudRate: number;
    serialPort: string;
  };
  id: string;
  name: string;
  status: string;
  serialNumber?: string;
  manufacturer?: string;
  model?: string;
  isConnected?: boolean;
  isLoading?: boolean;
}
