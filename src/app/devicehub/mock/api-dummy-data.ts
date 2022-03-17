export const Browse_Tags = [
  {
    'children': [
      {
        'description': '',
        'name': 'ServerArray',
        'tag': 'ns=0;s=Server.ServerArray',
        'type': 'STRING'
      },
      {
        'description': '',
        'name': 'NamespaceArray',
        'tag': 'ns=0;s=Server.NamespaceArray',
        'type': 'STRING'
      },
      {
        'children': [
          {
            'description': '',
            'name': 'StartTime',
            'tag': 'ns=0;s=Server.ServerStatus.StartTime',
            'type': 'DWORD'
          },
          {
            'description': '',
            'name': 'CurrentTime',
            'tag': 'ns=0;s=Server.ServerStatus.CurrentTime',
            'type': 'DWORD'
          },
          {
            'description': '',
            'name': 'State',
            'tag': 'ns=0;s=Server.ServerStatus.State',
            'type': 'INT'
          },
          {
            'children': [
              {
                'description': '',
                'name': 'ProductUri',
                'tag': 'ns=0;s=Server.ServerStatus.BuildInfo.ProductUri',
                'type': 'STRING'
              },
              {
                'description': '',
                'name': 'ManufacturerName',
                'tag': 'ns=0;s=Server.ServerStatus.BuildInfo.ManufacturerName',
                'type': 'STRING'
              },
              {
                'description': '',
                'name': 'ProductName',
                'tag': 'ns=0;s=Server.ServerStatus.BuildInfo.ProductName',
                'type': 'STRING'
              },
              {
                'description': '',
                'name': 'SoftwareVersion',
                'tag': 'ns=0;s=Server.ServerStatus.BuildInfo.SoftwareVersion',
                'type': 'STRING'
              },
              {
                'description': '',
                'name': 'BuildNumber',
                'tag': 'ns=0;s=Server.ServerStatus.BuildInfo.BuildNumber',
                'type': 'STRING'
              },
              {
                'description': '',
                'name': 'BuildDate',
                'tag': 'ns=0;s=Server.ServerStatus.BuildInfo.BuildDate',
                'type': 'DWORD'
              }
            ],
            'description': '',
            'name': 'BuildInfo'
          },
          {
            'description': '',
            'name': 'SecondsTillShutdown',
            'tag': 'ns=0;s=Server.ServerStatus.SecondsTillShutdown',
            'type': 'DWORD'
          },
          {
            'description': '',
            'name': 'ShutdownReason',
            'tag': 'ns=0;s=Server.ServerStatus.ShutdownReason',
            'type': 'DWORD'
          }
        ],
        'description': '',
        'name': 'ServerStatus'
      },
      {
        'description': '',
        'name': 'ServiceLevel',
        'tag': 'ns=0;s=Server.ServiceLevel',
        'type': 'BYTE'
      },
      {
        'description': '',
        'name': 'Auditing',
        'tag': 'ns=0;s=Server.Auditing',
        'type': 'BOOL'
      },
      {
        'children': [
          {
            'description': '',
            'name': 'ServerProfileArray',
            'tag': 'ns=0;s=Server.ServerCapabilities.ServerProfileArray',
            'type': 'STRING'
          },
          {
            'description': '',
            'name': 'LocaleIdArray',
            'tag': 'ns=0;s=Server.ServerCapabilities.LocaleIdArray',
            'type': 'STRING'
          },
          {
            'description': '',
            'name': 'MinSupportedSampleRate',
            'tag': 'ns=0;s=Server.ServerCapabilities.MinSupportedSampleRate',
            'type': 'REAL'
          },
          {
            'description': '',
            'name': 'MaxBrowseContinuationPoints',
            'tag': 'ns=0;s=Server.ServerCapabilities.MaxBrowseContinuationPoints',
            'type': 'WORD'
          },
          {
            'description': '',
            'name': 'MaxQueryContinuationPoints',
            'tag': 'ns=0;s=Server.ServerCapabilities.MaxQueryContinuationPoints',
            'type': 'WORD'
          },
          {
            'description': '',
            'name': 'MaxHistoryContinuationPoints',
            'tag': 'ns=0;s=Server.ServerCapabilities.MaxHistoryContinuationPoints',
            'type': 'WORD'
          },
          {
            'description': '',
            'name': 'SoftwareCertificates',
            'tag': 'ns=0;s=Server.ServerCapabilities.SoftwareCertificates',
            'type': 'DWORD'
          },
          {
            'children': [
              {
                'children': [
                  {
                    'description': '',
                    'name': 'NamingRule',
                    'tag': 'ns=0;s=Server.ServerCapabilities.ModellingRules.ExposesItsArray.NamingRule',
                    'type': 'INT'
                  }
                ],
                'description': '',
                'name': 'ExposesItsArray'
              },
              {
                'children': [
                  {
                    'description': '',
                    'name': 'NamingRule',
                    'tag': 'ns=0;s=Server.ServerCapabilities.ModellingRules.Mandatory.NamingRule',
                    'type': 'INT'
                  }
                ],
                'description': '',
                'name': 'Mandatory'
              },
              {
                'children': [
                  {
                    'description': '',
                    'name': 'NamingRule',
                    'tag': 'ns=0;s=Server.ServerCapabilities.ModellingRules.MandatoryShared.NamingRule',
                    'type': 'INT'
                  }
                ],
                'description': '',
                'name': 'MandatoryShared'
              },
              {
                'children': [
                  {
                    'description': '',
                    'name': 'NamingRule',
                    'tag': 'ns=0;s=Server.ServerCapabilities.ModellingRules.Optional.NamingRule',
                    'type': 'INT'
                  }
                ],
                'description': '',
                'name': 'Optional'
              }
            ],
            'description': '',
            'name': 'ModellingRules'
          },
          {
            'description': '',
            'name': 'AggregateFunctions',
            'tag': 'ns=0;s=Server.ServerCapabilities.AggregateFunctions',
            'type': 'DWORD'
          }
        ],
        'description': '',
        'name': 'ServerCapabilities'
      },
      {
        'children': [
          {
            'children': [
              {
                'description': '',
                'name': 'ServerViewCount',
                'tag': 'ns=0;s=Server.ServerDiagnostics.ServerDiagnosticsSummary.ServerViewCount',
                'type': 'DWORD'
              },
              {
                'description': '',
                'name': 'CurrentSessionCount',
                'tag': 'ns=0;s=Server.ServerDiagnostics.ServerDiagnosticsSummary.CurrentSessionCount',
                'type': 'DWORD'
              },
              {
                'description': '',
                'name': 'CumulatedSessionCount',
                'tag': 'ns=0;s=Server.ServerDiagnostics.ServerDiagnosticsSummary.CumulatedSessionCount',
                'type': 'DWORD'
              },
              {
                'description': '',
                'name': 'SecurityRejectedSessionCount',
                'tag': 'ns=0;s=Server.ServerDiagnostics.ServerDiagnosticsSummary.SecurityRejectedSessionCount',
                'type': 'DWORD'
              },
              {
                'description': '',
                'name': 'RejectedSessionCount',
                'tag': 'ns=0;s=Server.ServerDiagnostics.ServerDiagnosticsSummary.RejectedSessionCount',
                'type': 'DWORD'
              },
              {
                'description': '',
                'name': 'SessionTimeoutCount',
                'tag': 'ns=0;s=Server.ServerDiagnostics.ServerDiagnosticsSummary.SessionTimeoutCount',
                'type': 'DWORD'
              },
              {
                'description': '',
                'name': 'SessionAbortCount',
                'tag': 'ns=0;s=Server.ServerDiagnostics.ServerDiagnosticsSummary.SessionAbortCount',
                'type': 'DWORD'
              },
              {
                'description': '',
                'name': 'PublishingIntervalCount',
                'tag': 'ns=0;s=Server.ServerDiagnostics.ServerDiagnosticsSummary.PublishingIntervalCount',
                'type': 'DWORD'
              },
              {
                'description': '',
                'name': 'CurrentSubscriptionCount',
                'tag': 'ns=0;s=Server.ServerDiagnostics.ServerDiagnosticsSummary.CurrentSubscriptionCount',
                'type': 'DWORD'
              },
              {
                'description': '',
                'name': 'CumulatedSubscriptionCount',
                'tag': 'ns=0;s=Server.ServerDiagnostics.ServerDiagnosticsSummary.CumulatedSubscriptionCount',
                'type': 'DWORD'
              },
              {
                'description': '',
                'name': 'SecurityRejectedRequestsCount',
                'tag': 'ns=0;s=Server.ServerDiagnostics.ServerDiagnosticsSummary.SecurityRejectedRequestsCount',
                'type': 'DWORD'
              },
              {
                'description': '',
                'name': 'RejectedRequestsCount',
                'tag': 'ns=0;s=Server.ServerDiagnostics.ServerDiagnosticsSummary.RejectedRequestsCount',
                'type': 'DWORD'
              }
            ],
            'description': '',
            'name': 'ServerDiagnosticsSummary'
          },
          {
            'description': '',
            'name': 'SamplingIntervalDiagnosticsArray',
            'tag': 'ns=0;s=Server.ServerDiagnostics.SamplingIntervalDiagnosticsArray',
            'type': 'DWORD'
          },
          {
            'description': '',
            'name': 'SubscriptionDiagnosticsArray',
            'tag': 'ns=0;s=Server.ServerDiagnostics.SubscriptionDiagnosticsArray',
            'type': 'DWORD'
          },
          {
            'description': '',
            'name': 'SessionsDiagnosticsSummary',
            'tag': 'ns=0;s=Server.ServerDiagnostics.SessionsDiagnosticsSummary',
            'type': 'DWORD'
          },
          {
            'description': '',
            'name': 'EnabledFlag',
            'tag': 'ns=0;s=Server.ServerDiagnostics.EnabledFlag',
            'type': 'BOOL'
          }
        ],
        'description': '',
        'name': 'ServerDiagnostics'
      },
      {
        'description': '',
        'name': 'VendorServerInfo',
        'tag': 'ns=0;s=Server.VendorServerInfo',
        'type': 'DWORD'
      },
      {
        'children': [
          {
            'description': '',
            'name': 'RedundancySupport',
            'tag': 'ns=0;s=Server.ServerRedundancy.RedundancySupport',
            'type': 'INT'
          }
        ],
        'description': '',
        'name': 'ServerRedundancy'
      }
    ],
    'description': '',
    'name': 'Server'
  },
  {
    'description': '',
    'name': '_AdvancedTags'
  },
  {
    'description': '',
    'name': '_ConnectionSharing'
  },
  {
    'description': '',
    'name': '_CustomAlarms'
  },
  {
    'children': [
      {
        'description': '',
        'name': '_DisabledGroupCount',
        'tag': 'ns=2;s=_DataLogger._DisabledGroupCount',
        'type': 'DWORD'
      },
      {
        'description': '',
        'name': '_EnabledGroupCount',
        'tag': 'ns=2;s=_DataLogger._EnabledGroupCount',
        'type': 'DWORD'
      },
      {
        'description': '',
        'name': '_NonTriggeredGroupCount',
        'tag': 'ns=2;s=_DataLogger._NonTriggeredGroupCount',
        'type': 'DWORD'
      },
      {
        'description': '',
        'name': '_TriggeredGroupCount',
        'tag': 'ns=2;s=_DataLogger._TriggeredGroupCount',
        'type': 'DWORD'
      }
    ],
    'description': '',
    'name': '_DataLogger'
  },
  {
    'description': '',
    'name': '_EFMExporter'
  },
  {
    'description': '',
    'name': '_IDF_for_Splunk'
  },
  {
    'description': '',
    'name': '_IoT_Gateway'
  },
  {
    'description': '',
    'name': '_LocalHistorian'
  },
  {
    'description': '',
    'name': '_Redundancy'
  },
  {
    'description': '',
    'name': '_Scheduler'
  },
  {
    'description': '',
    'name': '_SecurityPolicies'
  },
  {
    'description': '',
    'name': '_SNMP Agent'
  },
  {
    'children': [
      {
        'description': '',
        'name': '_ActiveTagCount',
        'tag': 'ns=2;s=_System._ActiveTagCount',
        'type': 'DWORD'
      },
      {
        'description': '',
        'name': '_ClientCount',
        'tag': 'ns=2;s=_System._ClientCount',
        'type': 'DWORD'
      },
      {
        'description': '',
        'name': '_Date',
        'tag': 'ns=2;s=_System._Date',
        'type': 'STRING'
      },
      {
        'description': '',
        'name': '_Date_Day',
        'tag': 'ns=2;s=_System._Date_Day',
        'type': 'DWORD'
      },
      {
        'description': '',
        'name': '_Date_DayOfWeek',
        'tag': 'ns=2;s=_System._Date_DayOfWeek',
        'type': 'DWORD'
      },
      {
        'description': '',
        'name': '_Date_Month',
        'tag': 'ns=2;s=_System._Date_Month',
        'type': 'DWORD'
      },
      {
        'description': '',
        'name': '_Date_Year2',
        'tag': 'ns=2;s=_System._Date_Year2',
        'type': 'DWORD'
      },
      {
        'description': '',
        'name': '_Date_Year4',
        'tag': 'ns=2;s=_System._Date_Year4',
        'type': 'DWORD'
      },
      {
        'description': '',
        'name': '_DateTime',
        'tag': 'ns=2;s=_System._DateTime',
        'type': 'DWORD'
      },
      {
        'description': '',
        'name': '_DateTimeLocal',
        'tag': 'ns=2;s=_System._DateTimeLocal',
        'type': 'DWORD'
      },
      {
        'description': '',
        'name': '_ExpiredFeatures',
        'tag': 'ns=2;s=_System._ExpiredFeatures',
        'type': 'STRING'
      },
      {
        'description': '',
        'name': '_FullProjectName',
        'tag': 'ns=2;s=_System._FullProjectName',
        'type': 'STRING'
      },
      {
        'description': '',
        'name': '_LicensedFeatures',
        'tag': 'ns=2;s=_System._LicensedFeatures',
        'type': 'STRING'
      },
      {
        'description': '',
        'name': '_OpcClientNames',
        'tag': 'ns=2;s=_System._OpcClientNames',
        'type': 'STRING'
      },
      {
        'description': '',
        'name': '_ProductName',
        'tag': 'ns=2;s=_System._ProductName',
        'type': 'STRING'
      },
      {
        'description': '',
        'name': '_ProductVersion',
        'tag': 'ns=2;s=_System._ProductVersion',
        'type': 'STRING'
      },
      {
        'description': '',
        'name': '_ProjectName',
        'tag': 'ns=2;s=_System._ProjectName',
        'type': 'STRING'
      },
      {
        'description': '',
        'name': '_ProjectTitle',
        'tag': 'ns=2;s=_System._ProjectTitle',
        'type': 'STRING'
      },
      {
        'description': '',
        'name': '_Time',
        'tag': 'ns=2;s=_System._Time',
        'type': 'STRING'
      },
      {
        'description': '',
        'name': '_Time_Hour',
        'tag': 'ns=2;s=_System._Time_Hour',
        'type': 'DWORD'
      },
      {
        'description': '',
        'name': '_Time_Hour24',
        'tag': 'ns=2;s=_System._Time_Hour24',
        'type': 'DWORD'
      },
      {
        'description': '',
        'name': '_Time_Minute',
        'tag': 'ns=2;s=_System._Time_Minute',
        'type': 'DWORD'
      },
      {
        'description': '',
        'name': '_Time_PM',
        'tag': 'ns=2;s=_System._Time_PM',
        'type': 'BOOL'
      },
      {
        'description': '',
        'name': '_Time_Second',
        'tag': 'ns=2;s=_System._Time_Second',
        'type': 'DWORD'
      },
      {
        'description': '',
        'name': '_TimeLimitedFeatures',
        'tag': 'ns=2;s=_System._TimeLimitedFeatures',
        'type': 'STRING'
      },
      {
        'description': '',
        'name': '_TotalTagCount',
        'tag': 'ns=2;s=_System._TotalTagCount',
        'type': 'DWORD'
      }
    ],
    'description': '',
    'name': '_System'
  },
  {
    'children': [
      {
        'children': [
          {
            'description': '',
            'name': '_FailedReads',
            'tag': 'ns=2;s=Channel2._Statistics._FailedReads',
            'type': 'DWORD'
          },
          {
            'description': '',
            'name': '_FailedWrites',
            'tag': 'ns=2;s=Channel2._Statistics._FailedWrites',
            'type': 'DWORD'
          },
          {
            'description': '',
            'name': '_MaxPendingReads',
            'tag': 'ns=2;s=Channel2._Statistics._MaxPendingReads',
            'type': 'DWORD'
          },
          {
            'description': '',
            'name': '_MaxPendingWrites',
            'tag': 'ns=2;s=Channel2._Statistics._MaxPendingWrites',
            'type': 'DWORD'
          },
          {
            'description': '',
            'name': '_NextReadPriority',
            'tag': 'ns=2;s=Channel2._Statistics._NextReadPriority',
            'type': 'INT'
          },
          {
            'description': '',
            'name': '_PendingReads',
            'tag': 'ns=2;s=Channel2._Statistics._PendingReads',
            'type': 'DWORD'
          },
          {
            'description': '',
            'name': '_PendingWrites',
            'tag': 'ns=2;s=Channel2._Statistics._PendingWrites',
            'type': 'DWORD'
          },
          {
            'description': '',
            'name': '_Reset',
            'tag': 'ns=2;s=Channel2._Statistics._Reset',
            'type': 'BOOL'
          },
          {
            'description': '',
            'name': '_RxBytes',
            'tag': 'ns=2;s=Channel2._Statistics._RxBytes',
            'type': 'DWORD'
          },
          {
            'description': '',
            'name': '_SuccessfulReads',
            'tag': 'ns=2;s=Channel2._Statistics._SuccessfulReads',
            'type': 'DWORD'
          },
          {
            'description': '',
            'name': '_SuccessfulWrites',
            'tag': 'ns=2;s=Channel2._Statistics._SuccessfulWrites',
            'type': 'DWORD'
          },
          {
            'description': '',
            'name': '_TxBytes',
            'tag': 'ns=2;s=Channel2._Statistics._TxBytes',
            'type': 'DWORD'
          }
        ],
        'description': '',
        'name': '_Statistics'
      },
      {
        'children': [
          {
            'description': '',
            'name': '_Description',
            'tag': 'ns=2;s=Channel2._System._Description',
            'type': 'STRING'
          },
          {
            'description': '',
            'name': '_EnableDiagnostics',
            'tag': 'ns=2;s=Channel2._System._EnableDiagnostics',
            'type': 'BOOL'
          },
          {
            'description': '',
            'name': '_FloatHandlingType',
            'tag': 'ns=2;s=Channel2._System._FloatHandlingType',
            'type': 'STRING'
          },
          {
            'description': '',
            'name': '_WriteOptimizationDutyCycle',
            'tag': 'ns=2;s=Channel2._System._WriteOptimizationDutyCycle',
            'type': 'INT'
          }
        ],
        'description': '',
        'name': '_System'
      },
      {
        'children': [
          {
            'children': [
              {
                'description': '',
                'name': '_DemandPoll',
                'tag': 'ns=2;s=Channel2.Device1._System._DemandPoll',
                'type': 'BOOL'
              },
              {
                'description': '',
                'name': '_Description',
                'tag': 'ns=2;s=Channel2.Device1._System._Description',
                'type': 'STRING'
              },
              {
                'description': '',
                'name': '_DeviceId',
                'tag': 'ns=2;s=Channel2.Device1._System._DeviceId',
                'type': 'STRING'
              },
              {
                'description': '',
                'name': '_Enabled',
                'tag': 'ns=2;s=Channel2.Device1._System._Enabled',
                'type': 'BOOL'
              },
              {
                'description': '',
                'name': '_Error',
                'tag': 'ns=2;s=Channel2.Device1._System._Error',
                'type': 'BOOL'
              },
              {
                'description': '',
                'name': '_NoError',
                'tag': 'ns=2;s=Channel2.Device1._System._NoError',
                'type': 'BOOL'
              },
              {
                'description': '',
                'name': '_ScanMode',
                'tag': 'ns=2;s=Channel2.Device1._System._ScanMode',
                'type': 'STRING'
              },
              {
                'description': '',
                'name': '_ScanRateMs',
                'tag': 'ns=2;s=Channel2.Device1._System._ScanRateMs',
                'type': 'DWORD'
              },
              {
                'description': '',
                'name': '_SecondsInError',
                'tag': 'ns=2;s=Channel2.Device1._System._SecondsInError',
                'type': 'DWORD'
              },
              {
                'description': '',
                'name': '_Simulated',
                'tag': 'ns=2;s=Channel2.Device1._System._Simulated',
                'type': 'BOOL'
              }
            ],
            'description': '',
            'name': '_System'
          },
          {
            'description': '',
            'name': 'bool',
            'tag': 'ns=2;s=Channel2.Device1.bool',
            'type': 'BOOL'
          },
          {
            'description': '',
            'name': 'bool_arry',
            'tag': 'ns=2;s=Channel2.Device1.bool_arry',
            'type': 'WORD'
          },
          {
            'description': '',
            'name': 'demo',
            'tag': 'ns=2;s=Channel2.Device1.demo',
            'type': 'WORD'
          },
          {
            'description': '',
            'name': 'double_arry',
            'tag': 'ns=2;s=Channel2.Device1.double_arry',
            'type': 'WORD'
          },
          {
            'description': '',
            'name': 'float_arry',
            'tag': 'ns=2;s=Channel2.Device1.float_arry',
            'type': 'WORD'
          },
          {
            'description': '',
            'name': 'string',
            'tag': 'ns=2;s=Channel2.Device1.string',
            'type': 'STRING'
          }
        ],
        'description': '',
        'name': 'Device1'
      }
    ],
    'description': '',
    'name': 'Channel2'
  }
];
