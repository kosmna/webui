export interface Marketplace {
  branch: string;
  id?: string;
  name: string;
  private: boolean;
  url: string;
}
export interface MarketPlaceID {
  id: string;
}

export interface ConfigInput {
    label: string;
    required: boolean;
    variable: string;
    type?: string;
    default?: string;
    description?: string;
    options?: string[];
}


export interface MarketplaceApp {
  id: string;
  name: string;
  status?: string;
  statusChangedAt?: string;
  description?: string;
  image?: string;
  version?: string;
  installationScriptVersions?: string[];
}

export interface MarketplaceDialogData {
  app: MarketplaceApp;
  marketplaceID: string;
}
