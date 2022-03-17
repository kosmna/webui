/* tslint:disable:max-line-length */
export const OmaBindings = {
    'objects': [
        {
            'name': 'LWM2M Security',
            'description1': 'This LWM2M Object provides the keying material of a LWM2M Client appropriate to access a specified LWM2M Server. One Object Instance SHOULD address a LWM2M Bootstrap Server.\n    These LWM2M Object Resources MUST only be changed by a LWM2M Bootstrap Server or Bootstrap from Smartcardand MUST NOT be accessible by any other LWM2M Server.',
            'objectID': 0,
            'objectURN': 'TBD',
            'multipleInstances': 'Multiple',
            'mandatory': 'Mandatory',
            'resources':
            {
                'item':
                        [
                            {
                            'name': 'LWM2M  Server URI',
                            'operations': '',
                            'multipleInstances': 'Single',
                            'mandatory': 'Mandatory',
                            'type': 'String',
                            'rangeEnumeration': '0-255 bytes',
                            'units': '',
                            'description': 'Uniquely identifies the LWM2M Server or LWM2M Bootstrap Server, and is in the form:\n"coaps://host:port", where host is an IP address or FQDN, and port is the UDP port of the Server.',
                            'id': 0
                            },
                            {
                            'name': 'Bootstrap Server',
                            'operations': '',
                            'multipleInstances': 'Single',
                            'mandatory': 'Mandatory',
                            'type': 'Boolean',
                            'rangeEnumeration': '',
                            'units': '',
                            'description': 'Determines if the current instance concerns a LWM2M Bootstrap Server (true) or a standard LWM2M Server (false)',
                            'id': 1
                            },
                            {
                            'name': 'Security Mode',
                            'operations': '',
                            'multipleInstances': 'Single',
                            'mandatory': 'Mandatory',
                            'type': 'Integer',
                            'rangeEnumeration': '0-3',
                            'units': '',
                            'description': 'Determines which UDP payload security mode is used\n0: Pre-Shared Key mode\n1: Raw Public Key mode\n2: Certificate mode\n3: NoSec mode',
                            'id': 2
                            },
                            {
                            'name': 'Public Key or Identity',
                            'operations': '',
                            'multipleInstances': 'Single',
                            'mandatory': 'Mandatory',
                            'type': 'Opaque',
                            'rangeEnumeration': '',
                            'units': '',
                            'description': 'Stores the LWM2M Client’s Certificate (Certificate mode), public key (RPK mode) or PSK Identity (PSK mode). The format is defined in Section E.1.1.',
                            'id': 3
                            },
                            {
                            'name': 'Server Public Key or Identity',
                            'operations': '',
                            'multipleInstances': 'Single',
                            'mandatory': 'Mandatory',
                            'type': 'Opaque',
                            'rangeEnumeration': '',
                            'units': '',
                            'description': 'Stores the LWM2M Server’s or LWM2M Bootstrap Server’s Certificate (Certificate mode), public key (RPK mode) or PSK Identity (PSK mode). The format is defined in Section E.1.1.',
                            'id': 4
                            },
                            {
                            'name': 'Secret Key',
                            'operations': '',
                            'multipleInstances': 'Single',
                            'mandatory': 'Mandatory',
                            'type': 'Opaque',
                            'rangeEnumeration': '',
                            'units': '',
                            'description': 'Stores the secret key or private key of the security mode. The format of the keying material is defined by the security mode in  Section E.1.1. This Resource MUST only be changed by a bootstrap server and MUST NOT be readable by any server.',
                            'id': 5
                            },
                            {
                            'name': 'SMS Security Mode',
                            'operations': '',
                            'multipleInstances': 'Single',
                            'mandatory': 'Mandatory',
                            'type': 'Integer',
                            'rangeEnumeration': '0-255',
                            'units': '',
                            'description': 'Determines which SMS payload security mode is used (see section 7.2)\n0: Reserved for future use\n1: Secure Packet Structure mode device terminated\n2: Secure Packet Structure mode smartcard terminated\n3: NoSec mode\n255: Proprietary modes',
                            'id': 6
                            },
                            {
                            'name': 'SMS Binding Key Parameters',
                            'operations': '',
                            'multipleInstances': 'Single',
                            'mandatory': 'Mandatory',
                            'type': 'Opaque',
                            'rangeEnumeration': '6 bytes',
                            'units': '',
                            'description': 'Stores the KIc, KID, SPI and TAR. The format is defined in Section D.1.2.',
                            'id': 7
                            },
                            {
                            'name': 'SMS Binding Secret Keys',
                            'operations': '',
                            'multipleInstances': 'Single',
                            'mandatory': 'Mandatory',
                            'type': 'Opaque',
                            'rangeEnumeration': '32-48 bytes',
                            'units': '',
                            'description': 'Stores the values of the keys for the SMS binding. \nThis resource MUST only be changed by a bootstrap server and MUST NOT be readable by any server.',
                            'id': 8
                            },
                            {
                            'name': 'LWM2M Server SMS Number',
                            'operations': '',
                            'multipleInstances': 'Single',
                            'mandatory': 'Mandatory',
                            'type': 'Integer',
                            'rangeEnumeration': '',
                            'units': '',
                            'description': 'MSISDN used by the LWM2M Client  to send messages to the LWM2M Server via the SMS binding. \nThe LWM2M Client SHALL silently ignore any SMS not originated from unknown MSISDN',
                            'id': 9
                            },
                            {
                            'name': 'Short Server ID',
                            'operations': '',
                            'multipleInstances': 'Single',
                            'mandatory': 'Optional',
                            'type': 'Integer',
                            'rangeEnumeration': '1-65535',
                            'units': '',
                            'description': 'This identifier uniquely identifies each LWM2M Server configured for the LWM2M Client.\nThis Resource MUST be set when the Bootstrap Server Resource has false value.\nDefault Short Server ID (i.e. 0) MUST NOT be used for identifying the LWM2M Server.',
                            'id': 10
                            },
                            {
                            'name': 'Client Hold Off Time',
                            'operations': '',
                            'multipleInstances': 'Single',
                            'mandatory': 'Mandatory',
                            'type': 'Integer',
                            'rangeEnumeration': '',
                            'units': 's',
                            'description': 'Relevant information for a Bootstrap Server only.\nThe number of seconds to wait before initiating a Client Initiated Bootstrap once the LWM2M Client has determined it should initiate this bootstrap mode',
                            'id': 11
                            }
                        ]
            },
            'description2': '==E.1.1\tUDP Channel Security: Security Key Resource Format==\nThis section defines the format of the Secret Key and Public Key and Identity Resources of the LWM2M Server and LWM2M Bootstrap Objects when using UDP Channel security. These Resources are used to configure the security mode and keying material that a Client uses with a particular Server. The Objects are configured on the Client using one of the Bootstrap mechanisms described in Section 5.1. The use of this keying material for each security mode is defined in Section 7.1.\n==E.1.1.1\tPre-Shared Key (PSK) Mode==\nThe PSK is a binary shared secret key between the Client and Server of the appropriate length for the Cipher Suite used [RFC4279]. This key is composed of a sequence of binary bytes in the Secret Key Resource. The default PSK Cipher Suites defined in this specification use a 128-bit AES key. Thus this key would be represented in 16 bytes in the Secret Key Resource.\nThe corresponding PSK Identity for this PSK is stored in the Public Key or Identity Resource. The PSK Identity is simply stored as a UTF-8 String as per [RFC4279]. Clients and Servers MUST support a PSK Identity of at least 128 bytes in length as required by [RFC4279].\n==E.1.1.2\tRaw-Public Key (RPK) Mode==\nThe raw-public key mode requires a public key and a private key of the appropriate type and length for the Cipher Suite used. These keys are carried as a sequence of binary bytes with the public key stored in the Public Key or Identity Resource, and the private key stored in the Secret Key Resource. The default RPK Cipher Suites defines in this specification use a 256-bit ECC key. Thus the Certificate Resource would contain a 32 byte public key and the Secret Key Resource a 32 byte private key.\n==E.1.1.3\tCertificate Mode==\nThe Certificate mode requires an X.509v3 Certificate along with a matching private key. The private key is stored in the Secret Key Resource as in RPK mode. The Certificate is simply represented as binary X.509v3 in the value of the Public Key or Identity Resource.\n==E.1.2\tSMS Payload Security: Security Key Resource Format==\nThis section defines the format of the Secret Key and Public Key and Identity resources of the LWM2M Server and LWM2M Bootstrap Objects when using SMS Payload security. These resources are used to configure keying material that a Client uses with a particular Server. The Objects are configured on the Client using one of the Bootstrap mechanisms described in Section 5.1. The use of this keying material is defined in Section 7.2.\nThe SMS key parameters are stored in the order KIc, KID, SPI, TAR (KIc is byte 0).\nOrdering of bits within bytes SHALL follow ETSI TS 102 221, section 3.4 “Coding Conventions” (b8 MSB, b1 LSB).\n==E.1.3\tUnbootstrapping==\nUnbootstrapping is the process of deleting a Security Object Instance. If a Security Object Instance is to be deleted, certain related resources and configurations need to be deleted or modified. Therefore, when the Delete operation is sent via the Bootstrap Interface, the Client MUST execute the following procedure.\n#If there is an Object Instance that can be accessed only by a Server of the Server Object Instance (i.e., the Server is Access Control Owner and the LWM2M Server can access the Object Instance only in an Access Control Object Instance), the Object Instance and the corresponding Access Control Object Instance MUST be deleted\n#If an Object Instance can be accessed by multiple Servers including the Server which Security Object Instance is to be deleted, then:\n- The ACL Resource Instance for the Server in the Access Control Object Instance for the Object Instance MUST be deleted\n- If the Server is the Access Control Owner of the Access Control Object Instance, then the Access Control Owner MUST be changed to another Server according to the rules below:\nThe Client MUST choose the Server who has highest sum of each number assigned to an access right (Write: 1, Delete: 1) for the Access Control Owner. If two or more Servers have the same sum, the Client MUST choose one of them as the new Access Control Owner.\n#Observation operations from the Server MUST be deleted\n#Server Object Instance MUST be deleted\n#Client MAY send “De-register” operation to the Server\nNote: To monitor the change of the Access Control Owner, the Server MAY observe Access Control Owner Resource.',
            'objectType': 'MODefinition'
         },
      {
        'name': 'LWM2M Server',
        'description1': 'This LWM2M Objects provides the data related to a LWM2M Server. A Bootstrap Server has no such an Object Instance associated to it.',
        'objectID': 1,
        'objectURN': 'TBD',
        'multipleInstances': 'Multiple',
        'mandatory': 'Mandatory',
        'resources': {
          'item': [
            {
              'name': 'Short Server ID',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Integer',
              'rangeEnumeration': '1-65535',
              'units': '',
              'description': 'Used as link to associate server Object Instance.',
              'id': 0
            },
            {
              'name': 'Lifetime',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 's',
              'description': 'Specify the lifetime of the registration in seconds.',
              'id': 1
            },
            {
              'name': 'Default Minimum Period',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 's',
              'description': 'The default value the LWM2M Client should use for the Minimum Period of an Observation in the absence of this parameter being included in an Observation.\nIf this Resource doesn’t exist, the default value is 1.',
              'id': 2
            },
            {
              'name': 'Default Maximum Period',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 's',
              'description': 'The default value the LWM2M Client should use for the Maximum Period of an Observation in the absence of this parameter being included in an Observation.',
              'id': 3
            },
            {
              'name': 'Disable',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': '',
              'rangeEnumeration': '',
              'units': '',
              'description': 'If this Resource is executed, this LWM2M Server Object is disabled for a certain period defined in the Disabled Timeout Resource. After receiving “Execute” operation, LWM2M Client MUST send response of the operation and perform de-registration process, and underlying network connection between the Client and Server MUST be disconnected to disable the LWM2M Server account.\nAfter the above process, the LWM2M Client MUST NOT send any message to the Server and ignore all the messages from the LWM2M Server for the period.',
              'id': 4
            },
            {
              'name': 'Disable Timeout',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 's',
              'description': 'A period to disable the Server. After this period, the LWM2M Client MUST perform registration process to the Server. If this Resource is not set, a default timeout value is 86400 (1 day).',
              'id': 5
            },
            {
              'name': 'Notification Storing When Disabled or Offline',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'If true, the LWM2M Client stores “Notify” operations to the LWM2M Server while the LWM2M Server account is disabled or the LWM2M Client is offline. After the LWM2M Server account is enabled or the LWM2M Client is online, the LWM2M Client reports the stored “Notify” operations to the Server.\nIf false, the LWM2M Client discards all the “Notify” operationsor temporally disables the Observe function while the LWM2M Server is disabled or the LWM2M Client is offline.\nThe default value is true.\nThe maximum number of storing Notification per the Server is up to the implementation.',
              'id': 6
            },
            {
              'name': 'Binding',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'String',
              'rangeEnumeration': 'The possible values of Resource are listed in 5.2.1.1',
              'units': '',
              'description': 'This Resource defines the transport binding configured for the LWM2M Client.\nIf the LWM2M Client supports the binding specified in this Resource, the LWM2M Client MUST use that for Current Binding and Mode.',
              'id': 7
            },
            {
              'name': 'Registration Update Trigger',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': '',
              'rangeEnumeration': '',
              'units': '',
              'description': 'If this Resource is executed the LWM2M Client MUST perform an “Update” operation with this LWM2M Server using the Current Transport Binding and Mode.',
              'id': 8
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'LWM2M Access Control',
        'description1': 'Access Control Object is used to check whether the LWM2M Server has access right for performing a operation.',
        'objectID': 2,
        'objectURN': 'TBD',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Object ID',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Integer',
              'rangeEnumeration': '1-65534',
              'units': '',
              'description': 'The Object ID and The Object Instance ID are applied for.',
              'id': 0
            },
            {
              'name': 'Object Instance ID',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Integer',
              'rangeEnumeration': '0-65535',
              'units': '',
              'description': 'See Table 14: LWM2M Identifiers.',
              'id': 1
            },
            {
              'name': 'ACL',
              'operations': 'RW',
              'multipleInstances': 'Multiple',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '16-bit',
              'units': '',
              'description': 'Resource Instance ID MUST be the Short Server ID of a certain LWM2M Server which has an access right.\nResource Instance ID 0 is for default Short Server ID.\nThe Value of the Resource Instance contains the access rights.\nSetting each bit means the LWM2M Server has the access right for that operation. The bit order is specified as below.\n1st lsb: R(Read, Observe, Discover, Write Attributes)\n2nd lsb: W(Write)\n3rd lsb: E(Execute)\n4th lsb: D(Delete)\n5th lsb: C(Create)\nOther bits are reserved for future use',
              'id': 2
            },
            {
              'name': 'Access Control Owner',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Integer',
              'rangeEnumeration': '0-65535',
              'units': '',
              'description': 'Short Server ID of a certain LWM2M Server. Only this LWM2M Server can manage these Resources of the Object Instance.\nValue MAX_ID=65535 is reserved for the Access Control Object Instances created during Bootstrap procedure.',
              'id': 3
            }
          ]
        },
        'description2': '==E.3.1\tObject Instance Configurations==\nIf a new LWM2M Server Account is added when LWM2M Client has only one LWM2M Server Account, Client MUST ensure that Access Control Object Instances for every Object Instance except Security Object Instance exist. The LWM2M Client MUST create the missing Access Control Object Instances as follows:\n−\tAccess Control Owner MUST be the previously existing LWM2M Server\n−\tPreviously existing LWM2M Server MUST have full access right.',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Device',
        'description1': 'This LWM2M Object provides a range of device related information which can be queried by the LWM2M Server, and a device reboot and factory reset function.',
        'objectID': 3,
        'objectURN': 'TBD',
        'multipleInstances': 'Single',
        'mandatory': 'Mandatory',
        'resources': {
          'item': [
            {
              'name': 'Manufacturer',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Human readable manufacturer name',
              'id': 0
            },
            {
              'name': 'Model Number',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'A model identifier (manufacturer specified string)',
              'id': 1
            },
            {
              'name': 'Serial Number',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Serial Number',
              'id': 2
            },
            {
              'name': 'Firmware Version',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Current firmware version',
              'id': 3
            },
            {
              'name': 'Reboot',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': '',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reboot the LWM2M Device to restore the Device from unexpected firmware failure.',
              'id': 4
            },
            {
              'name': 'Factory Reset',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': '',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Perform factory reset of the LWM2M Device to make the LWM2M Device have the same configuration as at the initial deployment.\nWhen this Resource is executed, “De-register” operation  MAY be sent to the LWM2M Server(s) before factory reset of the LWM2M Device.',
              'id': 5
            },
            {
              'name': 'Available Power Sources',
              'operations': 'R',
              'multipleInstances': 'Multiple',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '0-7',
              'units': '',
              'description': '0 – DC power\n1 – Internal Battery\n2 – External Battery\n4 – Power over Ethernet\n5 – USB\n6 – AC (Mains) power\n7 – Solar',
              'id': 6
            },
            {
              'name': 'Power Source Voltage',
              'operations': 'R',
              'multipleInstances': 'Multiple',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 'mV',
              'description': 'Present voltage for each Available Power Sources Resource Instance.\nEach Resource Instance ID MUST map to the value of Available Power Sources Resource.',
              'id': 7
            },
            {
              'name': 'Power Source Current',
              'operations': 'R',
              'multipleInstances': 'Multiple',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 'mA',
              'description': 'Present current for each Available Power Source',
              'id': 8
            },
            {
              'name': 'Battery Level',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '0-100',
              'units': '%',
              'description': 'Contains the current battery level as a percentage (with a range from 0 to 100). This value is only valid when the value of Available Power Sources Resource is 1.',
              'id': 9
            },
            {
              'name': 'Memory Free',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 'KB',
              'description': 'Estimated current available amount of storage space which can store data and software in the LWM2M Device (expressed in kilobytes).',
              'id': 10
            },
            {
              'name': 'Error Code',
              'operations': 'R',
              'multipleInstances': 'Multiple',
              'mandatory': 'Mandatory',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': '',
              'description': '0=No error\n1=Low battery power\n2=External power supply off\n3=GPS module failure\n4=Low received signal strength\n5=Out of memory\n6=SMS failure\n7=IP connectivity failure\n8=Peripheral malfunction\n\nWhen the single Device Object Instance is initiated, there is only one error code Resource Instance whose value is equal to 0 that means no error. When the first error happens, the LWM2M Client changes error code Resource Instance to any non-zero value to indicate the error type. When any other error happens, a new error code Resource Instance is created.\nThis error code Resource MAY be observed by the LWM2M Server. How to deal with LWM2M Client’s error report depends on the policy of the LWM2M Server.',
              'id': 11
            },
            {
              'name': 'Reset Error Code',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': '',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Delete all error code Resource Instances and create only one zero-value error code that implies no error.',
              'id': 12
            },
            {
              'name': 'Current Time',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Time',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Current UNIX time of the LWM2M Client.\nThe LWM2M Client should be responsible to increase this time value as every second elapses.\nThe LWM2M Server is able to write this Resource to make the LWM2M Client synchronized with the LWM2M Server.',
              'id': 13
            },
            {
              'name': 'UTC Offset',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Indicates the UTC offset currently in effect for this LWM2M Device. UTC+X [ISO 8601].',
              'id': 14
            },
            {
              'name': 'Timezone',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Indicates in which time zone the LWM2M Device is located, in IANA Timezone (TZ) database format.',
              'id': 15
            },
            {
              'name': 'Supported Binding and Modes',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Indicates which bindings and modes are supported in the LWM2M Client. The possible values of Resource are combination of "U" or "UQ" and "S" or "SQ".',
              'id': 16
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Connectivity Monitoring',
        'description1': 'This LWM2M Object enables monitoring of parameters related to network connectivity.\nIn this general connectivity Object, the Resources are limited to the most general cases common to most network bearers. It is recommended to read the description, which refers to relevant standard development organizations (e.g. 3GPP, IEEE).\nThe goal of the Connectivity Monitoring Object is to carry information reflecting the more up to date values of the current connection for monitoring purposes. Resources such as Link Quality, Radio Signal Strenght, Cell ID are retrieved during connected mode at least for cellular networks.',
        'objectID': 4,
        'objectURN': 'TBD',
        'multipleInstances': 'Single',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Network Bearer',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Indicates the network bearer used for the current LWM2M communication session from the below network bearer list.\n0~20 are Cellular Bearers\n0: GSM cellular network\n1: TD-SCDMA cellular network\n2: WCDMA cellular network\n3: CDMA2000 cellular network\n4: WiMAX cellular network\n5: LTE-TDD cellular network\n6: LTE-FDD cellular network\n7~20: Reserved for other type cellular network\n21~40 are Wireless Bearers\n21: WLAN network\n22: Bluetooth network\n23: IEEE 802.15.4 network\n24~40: Reserved for other type local wireless network\n41~50 are Wireline Bearers\n41: Ethernet\n42: DSL\n43: PLC\n44~50: reserved for others type wireline networks.',
              'id': 0
            },
            {
              'name': 'Available Network Bearer',
              'operations': 'R',
              'multipleInstances': 'Multiple',
              'mandatory': 'Mandatory',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Indicates list of current available network bearer. Each Resource Instance has a value from the network bearer list.',
              'id': 1
            },
            {
              'name': 'Radio Signal Strength',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 'dBm',
              'description': 'This node contains the average value of the received signal strength indication used in the current network bearer in case Network Bearer Resource indicates a Cellular Network (RXLEV range 0…64) 0 is &lt; 110dBm, 64 is >-48 dBm).\nRefer to [3GPP 44.018] for more details on Network Measurement Report encoding and [3GPP 45.008] or for Wireless Networks refer to the appropriate wireless standard.',
              'id': 2
            },
            {
              'name': 'Link Quality',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': '',
              'description': 'This contains received link quality  e.g., LQI for IEEE 802.15.4, (Range (0..255)), RxQual Downlink (for GSM range is 0…7).\nRefer to [3GPP 44.018] for more details on Network Measurement Report encoding.',
              'id': 3
            },
            {
              'name': 'IP Addresses',
              'operations': 'R',
              'multipleInstances': 'Multiple',
              'mandatory': 'Mandatory',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The IP addresses assigned to the connectivity interface. (e.g. IPv4, IPv6, etc.)',
              'id': 4
            },
            {
              'name': 'Router IP Addresse',
              'operations': 'R',
              'multipleInstances': 'Multiple',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The IP address of the next-hop IP router.\nNote: This IP Address doesn’t indicate the Server IP address.',
              'id': 5
            },
            {
              'name': 'Link Utilization',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '0-100',
              'units': '%',
              'description': 'The average utilization of the link to the next-hop IP router in %.',
              'id': 6
            },
            {
              'name': 'APN',
              'operations': 'R',
              'multipleInstances': 'Multiple',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Access Point Name in case Network Bearer Resource is a Cellular Network.',
              'id': 7
            },
            {
              'name': 'Cell ID',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Serving Cell ID in case Network Bearer Resource is a Cellular Network.\nAs specified in TS [3GPP 23.003] and in [3GPP. 24.008]. Range (0…65535) in GSM/EDGE\nUTRAN Cell ID has a length of 28 bits.\nCell Identity  in WCDMA/TD-SCDMA. Range: (0..268435455).\nLTE Cell ID has a length of 28 bits.\nParameter definitions in [3GPP 25.331].',
              'id': 8
            },
            {
              'name': 'SMNC',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': '%',
              'description': 'Serving Mobile Network Code. In case Network Bearer Resource has 0(cellular network). Range (0…999).\nAs specified in TS [3GPP 23.003].',
              'id': 9
            },
            {
              'name': 'SMCC',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Serving Mobile Country Code. In case Network Bearer Resource has 0 (cellular network). Range (0…999).\nAs specified in TS [3GPP 23.003].',
              'id': 10
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Firmware Update',
        'description1': 'This LWM2M Object enables management of firmware which is to be updated. This Object includes installing firmware package, updating firmware, and performing actions after updating firmware.',
        'objectID': 5,
        'objectURN': 'TBD',
        'multipleInstances': 'Single',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Package',
              'operations': 'W',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Firmware package',
              'id': 0
            },
            {
              'name': 'Package URI',
              'operations': 'W',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'String',
              'rangeEnumeration': '0-255 bytes',
              'units': '',
              'description': 'URI from where the device can download the firmware package by an alternative mechanism. As soon the device has received the Package URI it performs the download at the next practical opportunity.',
              'id': 1
            },
            {
              'name': 'Update',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': '',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Updates firmware by using the firmware package stored in Package, or, by using the firmware downloaded from the Package URI.\nThis Resource is only executable when the value of the State Resource is Downloaded.',
              'id': 2
            },
            {
              'name': 'State',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Integer',
              'rangeEnumeration': '1-3',
              'units': '',
              'description': 'Indicates current state with respect to this firmware update. This value is set by the LWM2M Client.\n1: Idle (before downloading or after updating)\n2: Downloading (The data sequence is on the way)\n3: Downloaded\nIf writing the firmware package to Package Resource is done, or, if the device has downloaded the firmware package from the Package URI the state changes to Downloaded.\nIf writing an empty string to Package Resource is done or writing an empty string to Package URI is done, the state changes to Idle.\nIf performing the Update Resource failed, the state remains at Downloaded.\nIf performing the Update Resource was successful, the state changes from Downloaded to Idle.',
              'id': 3
            },
            {
              'name': 'Update Supported Objects',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'If this value is true, the LWM2M Client MUST inform the registered LWM2M Servers of Objects and Object Instances parameter by sending an Update or Registration message after the firmware update operation at the next practical opportunity if supported Objects in the LWM2M Client have changed, in order for the LWM2M Servers to promptly manage newly installed Objects.\nIf false, Objects and Object Instances parameter MUST be reported at the next periodic Update message.\nThe default value is false.',
              'id': 4
            },
            {
              'name': 'Update Result',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Integer',
              'rangeEnumeration': '0-6',
              'units': '',
              'description': 'Contains the result of downloading or updating the firmware\n0: Default value. Once the updating process is initiated, this Resource SHOULD be reset to default value.\n1: Firmware updated successfully,\n2: Not enough storage for the new firmware package.\n3. Out of memory during downloading process.\n4: Connection lost during downloading process.\n5: CRC check failure for new downloaded package.\n6: Unsupported package type.\n7: Invalid URI\nThis Resource MAY be reported by sending Observe operation.',
              'id': 5
            }
          ]
        },
        'description2': '==E.6.1\tFirmware Update Consideration==\nIf some Objects are not supported after firmware update, the LWM2M Client MUST delete all the Object Instances of the Objects that are not supported.',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Location',
        'description1': 'This LWM2M Objects provide a range of device related information which can be queried by the LWM2M Server, and a device reboot and factory reset function.',
        'objectID': 6,
        'objectURN': 'TBD',
        'multipleInstances': 'Single',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Latitude',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'String',
              'rangeEnumeration': '',
              'units': 'Deg',
              'description': 'The decimal notation of latitude, e.g. -43.5723 [World Geodetic System 1984].',
              'id': 0
            },
            {
              'name': 'Longitude',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'String',
              'rangeEnumeration': '',
              'units': 'Deg',
              'description': 'The decimal notation of longitude, e.g. 153.21760 [World Geodetic System 1984].',
              'id': 1
            },
            {
              'name': 'Altitude',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': 'm',
              'description': 'The decimal notation of altitude in meters above sea level.',
              'id': 2
            },
            {
              'name': 'Uncertainty',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': 'm',
              'description': 'The accuracy of the position in meters.',
              'id': 3
            },
            {
              'name': 'Velocity',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': 'Refers to 3GPP GAD specs',
              'description': 'The velocity of the device as defined in 3GPP 23.032 GAD specification. This set of values may not be available if the device is static.',
              'id': 4
            },
            {
              'name': 'Timestamp',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Time',
              'rangeEnumeration': '0-6',
              'units': '',
              'description': 'The timestamp of when the location measurement was performed.',
              'id': 5
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Connectivity Statistics',
        'description1': 'This LWM2M Objects enables client to collect statistical information and enables the LWM2M Server to retrieve these information, set the collection duration and reset the statistical parameters.',
        'objectID': 7,
        'objectURN': 'TBD',
        'multipleInstances': 'Single',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'SMS Tx Counter',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Indicate the total number of SMS successfully transmitted during the collection period.',
              'id': 0
            },
            {
              'name': 'SMS Rx Counter',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Indicate the total number of SMS successfully received during the collection period.',
              'id': 1
            },
            {
              'name': 'Tx Data',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 'Kilo-Bytes',
              'description': 'Indicate the total amount of data transmitted during the collection period.',
              'id': 2
            },
            {
              'name': 'Rx Data',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 'Kilo-Bytes',
              'description': 'Indicate the total amount of data received during the collection period.',
              'id': 3
            },
            {
              'name': 'Max Message Size',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 'Byte',
              'description': 'The maximum message size that is used during the collection period.',
              'id': 4
            },
            {
              'name': 'Average Message Size',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 'Byte',
              'description': 'The average message size that is used during the collection period.',
              'id': 5
            },
            {
              'name': 'StartOrReset',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': '',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Start to collect information or reset all other Resources to zeros in this Object. For example, the first time this Resource is executed, the client starts to collect information. The second time this Resource is executed, the values of Resource 0~5 are reset to 0.',
              'id': 6
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Portfolio',
        'description1': 'The Portfolio Object allows to extend the data storage capability of other Object Instances in the LWM2M system, as well as the services which may be used to authenticate and to protect privacy of data contained in those extensions. In addition, a service of data encryption is also defined',
        'objectID': 16,
        'objectURN': 'urn:oma:lwm2m:oma:16',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Identity',
              'operations': 'RW',
              'multipleInstances': 'Multiple',
              'mandatory': 'Mandatory',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Data Storage extension for other Object Instances. \n e.g  for [GSMA]  : \n0 : Host Device ID, \n1:  Host Device Manufacturer\n2:  Host Device Model\n3:  Host Device Software Version,\n\nThis Resource contains data that the GetAuthData executable Resource can work with.\n',
              'id': 0
            },
            {
              'name': 'GetAuthData',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': '',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Executable resource to trigger Services described in Section 5.2.2 \nArguments definitions are described in Section 5.2.1 as well as in table 2 of this document\n',
              'id': 1
            },
            {
              'name': 'AuthData',
              'operations': 'R',
              'multipleInstances': 'Multiple',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Buffer which contains the data generated by the  process triggered by a GetAuthData request',
              'id': 2
            },
            {
              'name': 'AuthStatus',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '[0-2]',
              'units': '',
              'description': 'This Resource contains the state related to the process triggered by GetAuthData  request.\n0 :  IDLE_STATE :  AuthData doesn’t contain any valid data\n1 :  DATA_AVAIL_STATE : AuthData  contains a valid data \n2 :  ERROR_STATE :  an error occurred  \nThis state is reset to IDLE_STATE, when the executable resource “GetAuthData” is triggered or when the AuthData resource has been returned to the LWM2M Server (READ / NOTIFY) .\n',
              'id': 3
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Non-Access Stratum (NAS) configuration ',
        'description1': 'This object provides Non-Access Stratum (NAS) configuration and is derived from 3GPP TS 24.368.',
        'objectID': 18,
        'objectURN': '',
        'multipleInstances': 'Single',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'NAS_SignallingPriority',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '0-255',
              'units': '',
              'description': 'Indicates a NAS signalling priority which is used to determine the setting of the low priority indicator to be included in NAS messages as specified in 3GPP TS 24.008 [4] and 3GPP TS 24.301 [5].\n\n0=reserved\n1=NAS signalling low priority\n2-255=reserved',
              'id': 0
            },
            {
              'name': 'AttachWithIMSI',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Indicates whether attach with IMSI is performed when moving to a non-equivalent PLMN as specified in 3GPP TS 24.008 [4] and 3GPP TS 24.301 [5].\n0\tIndicates that normal behaviour is applied.\n1\tIndicates that attach with IMSI is performed when moving to a non-equivalent PLMN.\n\n',
              'id': 1
            },
            {
              'name': 'MinimumPeriodicSearchTimer',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '0-255',
              'units': '',
              'description': 'Gives a minimum value in minutes for the timer T controlling the periodic search for higher prioritized PLMNs as specified in 3GPP TS 23.122 [3].\n',
              'id': 2
            },
            {
              'name': 'NMO_I_Behaviour',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Indicates whether the "NMO I, Network Mode of Operation I" indication as specified in 3GPP TS 24.008 [4] is applied by the UE.\n0\tIndicates that the "NMO I, Network Mode of Operation I" indication is not used.\n1\tIndicates that the "NMO I, Network Mode of Operation I" indication is used, if available.\n',
              'id': 3
            },
            {
              'name': 'Timer_T3245_Behaviour',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Indicates whether the timer T3245 and the related functionality as specified in 3GPP TS 24.008 [4] and 3GPP TS 24.301 [5] is used by the UE.\n0\tIndicates that the timer T3245 is not used.\n1\tIndicates that the timer T3245 is used.\n',
              'id': 4
            },
            {
              'name': 'ExtendedAccessBarring',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Indicates whether the extended access barring is applicable for the UE as specified in 3GPP TS 24.008 [4] and 3GPP TS 24.301 [5].\n0\tIndicates that the extended access barring is not applied for the UE.\n1\tIndicates that the extended access barring is applied for the UE.\n',
              'id': 5
            },
            {
              'name': 'Override_NAS_SignallingLowPriority',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Indicates whether the UE can override the NAS_SignallingPriority leaf node configured to NAS signalling low priority.\nThe setting of the low priority indicator included in NAS messages when this resource exists is specified in 3GPP TS 24.008 [4] and 3GPP TS 24.301 [5].\n0\tIndicates that the UE cannot override the NAS signalling low priority indicator\n1\tIndicates that the UE can override the NAS signalling low priority indicator\nThe default value 0 applies if this leaf is not provisioned.\nIf provisioned, this resource is set to the same value as that provisioned for the Override_ExtendedAccessBarring leaf, e.g., if the UE is configured to override the NAS signalling low access priority indicator, then UE is also configured to override extended access class barring (see 3GPP TS 23.401 [5A]).',
              'id': 6
            },
            {
              'name': 'Override_ExtendedAccessBarring',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Indicates whether the UE can override ExtendedAccessBarring resource configured to extended access barring.\nThe handling of extended access barring for the UE when this resource exists is specified in 3GPP TS 24.008 [4] and 3GPP TS 24.301 [5].\n0\tIndicates that the UE cannot override extended access barring\n1\tIndicates that the UE can override extended access barring\nThe default value 0 applies if this resource is not provisioned.\nIf provisioned, this resource is set to the same value as that provisioned for the Override_NAS_SignallingLowPriority leaf, e.g., if the UE is configured to override the NAS signalling low access priority indicator, then UE is also configured to override extended access class barring (see 3GPP TS 23.401 [5A]).\n',
              'id': 7
            },
            {
              'name': 'FastFirstHigherPriorityPLMNSearch',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Indicates whether the UE performs the first search for a higher priority PLMN after at least 2 minutes and at most T minutes upon entering a VPLMN as specified in 3GPP TS 23.122 [3].\n0\tIndicates that the Fast First Higher Priority PLMN Search is disabled, see 3GPP TS 23.122 [3]\n1\tIndicates that the Fast First Higher Priority PLMN Search is enabled, see 3GPP TS 23.122 [3]\nThe default value 0 applies if this resource is not provisioned.\n',
              'id': 8
            },
            {
              'name': 'EUTRADisablingAllowedForEMMCause15',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Indicates whether the UE is allowed to disable the E-UTRA capability when it receives the Extended EMM cause IE with value "E-UTRAN not allowed" as described in 3GPP TS 24.301 [5].\n0\tIndicates that "E-UTRA Disabling for EMM cause #15" is disabled, see 3GPP TS 24.301 [5]\n1\tIndicates that "E-UTRA Disabling for EMM cause #15" is enabled, see 3GPP TS 24.301 [5]\nThe default value 0 applies if this resource is not provisioned.\n',
              'id': 9
            },
            {
              'name': 'SM_RetryWaitTime',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '0-255',
              'units': '',
              'description': 'Indicates a configured UE retry wait time value applicable when in HPLMN or EHPLMN (see 3GPP TS 23.122 [3]) for controlling the UE session management retry behaviour when prior session management request was rejected by the network with cause value #8, #27, #32, #33 as specified in 3GPP TS 24.008 [4] and 3GPP TS 24.301 [5]. \nThe default value of 12 minutes applies if this resource is not provisioned.\nThis resource shall be coded in the same format as the value part of GPRS Timer 3 IE as specified in Table 10.5.163a/3GPP TS 24.008 [4] converted into a decimal value.\n',
              'id': 10
            },
            {
              'name': 'SM_RetryAtRATChange',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Indicates the UE\'s retry behaviour when in HPLMN or EHPLMN (see 3GPP TS 23.122 [3]) after inter-system change between S1 mode and A/Gb or Iu mode as specified in 3GPP TS 24.008 [4] and 3GPP TS 24.301 [5]. \n0\tIndicates that the UE is allowed to retry the corresponding ESM procedure in S1 mode if an SM procedure was rejected in A/Gb or Iu mode, and to retry the corresponding SM procedure in A/Gb or Iu mode if an ESM procedure was rejected in S1 mode, see 3GPP TS 24.008 [4] and 3GPP TS 24.301 [5]\n1\tIndicates that the UE is not allowed to retry an SM procedure or the corresponding ESM procedure in any of the modes: A/Gb, Iu and S1 mode, see 3GPP TS 24.008 [4] and 3GPP TS 24.301 [5]\nThe default value 0 applies if this resource is not provisioned.\n',
              'id': 11
            },
            {
              'name': 'ExceptionDataReportingAllowed',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'For the UE in NB-S1 mode, this resource indicates whether the UE is allowed to use the RRC establishment cause mo-ExceptionData, as specified in 3GPP TS 24.301 [5].\n0\tIndicates that the UE is not allowed to use the RRC establishment cause mo-ExceptionData.\n1\tIndicates that the UE is allowed to use the RRC establishment cause mo-ExceptionData.\nIf this resource is not provisioned, the value of 0 is used.\n',
              'id': 12
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Digital Input',
        'description1': 'Generic digital input for non-specific sensors',
        'objectID': 3200,
        'objectURN': 'urn:oma:lwm2m:ext:3200',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Digital Input State',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The current state of a digital input.',
              'id': 5500
            },
            {
              'name': 'Digital Input Counter',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The cumulative value of active state detected.',
              'id': 5501
            },
            {
              'name': 'Digital Input Polarity',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The polarity of the digital input as a Boolean (0 = Normal, 1= Reversed)',
              'id': 5502
            },
            {
              'name': 'Digital Input Debounce',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 'ms',
              'description': 'The debounce period in ms. .',
              'id': 5503
            },
            {
              'name': 'Digital Input Edge Selection',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '1-3',
              'units': '',
              'description': 'The edge selection as an integer (1 = Falling edge, 2 = Rising edge, 3 = Both Rising and Falling edge).',
              'id': 5504
            },
            {
              'name': 'Digital Input Counter Reset',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reset the Counter value.',
              'id': 5505
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string, for instance, “Air Pressure”',
              'id': 5750
            },
            {
              'name': 'Sensor Type',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The type of the sensor (for instance PIR type)',
              'id': 5751
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Digital Output',
        'description1': 'Generic digital output for non-specific actuators',
        'objectID': 3201,
        'objectURN': 'urn:oma:lwm2m:ext:3201',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Digital Output State',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The current state of a digital output.',
              'id': 5550
            },
            {
              'name': 'Digital Output Polarity',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The polarity of a digital ouput as a Boolean (0 = Normal, 1= Reversed).',
              'id': 5551
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the output as a string, for instance, “LED”',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Analog Input',
        'description1': 'Generic analog input for non-specific sensors',
        'objectID': 3202,
        'objectURN': 'urn:oma:lwm2m:ext:3202',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Analog Input Current Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '0-1',
              'units': '',
              'description': 'The current value of the analog input.',
              'id': 5600
            },
            {
              'name': 'Min Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The minimum value measured by the sensor since power ON or reset',
              'id': 5601
            },
            {
              'name': 'Max Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The maximum value measured by the sensor since power ON or reset',
              'id': 5602
            },
            {
              'name': 'Min Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The minimum value that can be measured by the sensor',
              'id': 5603
            },
            {
              'name': 'Max Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The maximum value that can be measured by the sensor',
              'id': 5604
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string, for instance, “Air Pressure”',
              'id': 5750
            },
            {
              'name': 'Sensor Type',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The type of the sensor, for instance PIR type',
              'id': 5751
            },
            {
              'name': 'Reset Min and Max Measured Values',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reset the Min and Max Measured Values to Current Value',
              'id': 5605
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Analog Output',
        'description1': 'This IPSO object is a generic object that can be used with any kind of analog output interface.',
        'objectID': 3203,
        'objectURN': 'urn:oma:lwm2m:ext:3203',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Analog Output Current Value',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '0-1',
              'units': '',
              'description': 'The current state of the analogue output.',
              'id': 5650
            },
            {
              'name': 'Application Type',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'If present, the application type of the actuator as a string, for instance, “Thermostat”',
              'id': 5750
            },
            {
              'name': 'Min Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The minimum value that can be measured by the sensor',
              'id': 5603
            },
            {
              'name': 'Max Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The maximum value that can be measured by the sensor',
              'id': 5604
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Generic Sensor',
        'description1': 'This IPSO object allow the description of a generic sensor. It is based on the description of a value and a unit according to the UCUM specification. Thus, any type of value defined within this specification can be reporting using this object.\nSpecific object for a given range of sensors is described later in the document, enabling to identify the type of sensors directly from its Object ID. This object may be used as a generic object if a dedicated one does not exist.',
        'objectID': 3300,
        'objectURN': 'urn:oma:lwm2m:ext:3300',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Sensor Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'Last or Current Measured Value from the Sensor',
              'id': 5700
            },
            {
              'name': 'Sensor Units',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Measurement Units Definition e.g. “Cel” for Temperature in Celsius.',
              'id': 5701
            },
            {
              'name': 'Min Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value measured by the sensor since power ON or reset',
              'id': 5601
            },
            {
              'name': 'Max Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value measured by the sensor since power ON or reset',
              'id': 5602
            },
            {
              'name': 'Min Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value that can be measured by the sensor',
              'id': 5603
            },
            {
              'name': 'Max Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value that can be measured by the sensor',
              'id': 5604
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'If present, the application type of the sensor as a string, for instance, “CO2”',
              'id': 5750
            },
            {
              'name': 'Sensor Type',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The type of the sensor (for instance PIR type)',
              'id': 5751
            },
            {
              'name': 'Reset Min and Max Measured Values',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reset the Min and Max Measured Values to Current Value',
              'id': 5605
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Illuminance',
        'description1': 'Illuminance sensor, example units = lx',
        'objectID': 3301,
        'objectURN': 'urn:oma:lwm2m:ext:3301',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Sensor Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The current value of the luminosity sensor.',
              'id': 5700
            },
            {
              'name': 'Min Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value measured by the sensor since power ON or reset',
              'id': 5601
            },
            {
              'name': 'Max Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value measured by the sensor since power ON or reset',
              'id': 5602
            },
            {
              'name': 'Min Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value that can be measured by the sensor',
              'id': 5603
            },
            {
              'name': 'Max Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value that can be measured by the sensor',
              'id': 5604
            },
            {
              'name': 'Reset Min and Max Measured Values',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reset the Min and Max Measured Values to Current Value',
              'id': 5605
            },
            {
              'name': 'Sensor Units',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'If present, the type of sensor defined as the UCUM Unit Definition e.g. “Cel” for Temperature in Celcius.',
              'id': 5701
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Presence',
        'description1': 'Presence sensor with digital sensing, optional delay parameters',
        'objectID': 3302,
        'objectURN': 'urn:oma:lwm2m:ext:3302',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Digital Input State',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The current state of the presence sensor',
              'id': 5500
            },
            {
              'name': 'Digital Input Counter',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The cumulative value of active state detected.',
              'id': 5501
            },
            {
              'name': 'Digital Input Counter Reset',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reset the Counter value',
              'id': 5505
            },
            {
              'name': 'Sensor Type',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The type of the sensor (for instance PIR type)',
              'id': 5751
            },
            {
              'name': 'Busy to Clear delay',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 'ms',
              'description': 'Delay from the detection state to the clear state in ms',
              'id': 5903
            },
            {
              'name': 'Clear to Busy delay',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 'ms',
              'description': 'Delay from the clear state to the busy state in ms',
              'id': 5904
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Temperature',
        'description1': 'Description: This IPSO object should be used with a temperature sensor to report a temperature measurement.  It also provides resources for minimum/maximum measured values and the minimum/maximum range that can be measured by the temperature sensor. An example measurement unit is degrees Celsius (ucum:Cel).',
        'objectID': 3303,
        'objectURN': 'urn:oma:lwm2m:ext:3303',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Sensor Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'Last or Current Measured Value from the Sensor',
              'id': 5700
            },
            {
              'name': 'Min Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value measured by the sensor since power ON or reset',
              'id': 5601
            },
            {
              'name': 'Max Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value measured by the sensor since power ON or reset',
              'id': 5602
            },
            {
              'name': 'Min Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value that can be measured by the sensor',
              'id': 5603
            },
            {
              'name': 'Max Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value that can be measured by the sensor',
              'id': 5604
            },
            {
              'name': 'Sensor Units',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Measurement Units Definition e.g. “Cel” for Temperature in Celsius.',
              'id': 5701
            },
            {
              'name': 'Reset Min and Max Measured Values',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reset the Min and Max Measured Values to Current Value',
              'id': 5605
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Humidity',
        'description1': 'Description: This IPSO object should be used with a humidity sensor to report a humidity measurement.  It also provides resources for minimum/maximum measured values and the minimum/maximum range that can be measured by the humidity sensor. An example measurement unit is relative humidity as a percentage (ucum:%).',
        'objectID': 3304,
        'objectURN': 'urn:oma:lwm2m:ext:3304',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Sensor Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'Last or Current Measured Value from the Sensor',
              'id': 5700
            },
            {
              'name': 'Min Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value measured by the sensor since power ON or reset',
              'id': 5601
            },
            {
              'name': 'Max Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value measured by the sensor since power ON or reset',
              'id': 5602
            },
            {
              'name': 'Min Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value that can be measured by the sensor',
              'id': 5603
            },
            {
              'name': 'Max Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value that can be measured by the sensor',
              'id': 5604
            },
            {
              'name': 'Sensor Units',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Measurement Units Definition e.g. “Cel” for Temperature in Celsius.',
              'id': 5701
            },
            {
              'name': 'Reset Min and Max Measured Values',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reset the Min and Max Measured Values to Current Value',
              'id': 5605
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Power Measurement',
        'description1': 'This IPSO object should be used over a power measurement sensor to report a remote power measurement.  It also provides resources for minimum/maximum measured values and the minimum/maximum range for both active and reactive power. Il also provides resources for cumulative energy, calibration, and the power factor.',
        'objectID': 3305,
        'objectURN': 'urn:oma:lwm2m:ext:3305',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Instantaneous active power',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'W',
              'description': 'The current active power',
              'id': 5800
            },
            {
              'name': 'Min Measured active power',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'W',
              'description': 'The minimum active power measured by the sensor since it is ON',
              'id': 5801
            },
            {
              'name': 'Max Measured  active power',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'W',
              'description': 'The maximum active power measured by the sensor since it is ON',
              'id': 5802
            },
            {
              'name': 'Min Range active power',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'W',
              'description': 'The minimum active power that can be measured by the sensor',
              'id': 5803
            },
            {
              'name': 'Max Range active power',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'W',
              'description': 'The maximum active power that can be measured by the sensor',
              'id': 5804
            },
            {
              'name': 'Cumulative active power',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Wh',
              'description': 'The cumulative active power since the last cumulative energy reset or device start',
              'id': 5805
            },
            {
              'name': 'Active Power Calibration',
              'operations': 'W',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'W',
              'description': 'Request an active power calibration by writing the value of a calibrated load.',
              'id': 5806
            },
            {
              'name': 'Instantaneous reactive power',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'VAR',
              'description': 'The current reactive power',
              'id': 5810
            },
            {
              'name': 'Min Measured reactive power',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'VAR',
              'description': 'The minimum reactive power measured by the sensor since it is ON',
              'id': 5811
            },
            {
              'name': 'Max Measured reactive power',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'VAR',
              'description': 'The maximum reactive power measured by the sensor since it is ON',
              'id': 5812
            },
            {
              'name': 'Min Range reactive power',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'VAR',
              'description': 'The minimum active power that can be measured by the sensor',
              'id': 5813
            },
            {
              'name': 'Max Range reactive power',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'VAR',
              'description': 'The maximum reactive power that can be measured by the sensor',
              'id': 5814
            },
            {
              'name': 'Cumulative reactive power',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'VARh',
              'description': 'The cumulative reactive power since the last cumulative energy reset or device start',
              'id': 5815
            },
            {
              'name': 'Reactive Power Calibration',
              'operations': 'W',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'VAR',
              'description': 'Request a reactive power calibration by writing the value of a calibrated load.',
              'id': 5816
            },
            {
              'name': 'Power Factor',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '',
              'description': 'If applicable, the power factor of the current consumption.',
              'id': 5820
            },
            {
              'name': 'Current Calibration',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Read or Write the current calibration coefficient',
              'id': 5821
            },
            {
              'name': 'Reset Cumulative energy',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reset both cumulative active/reactive power',
              'id': 5822
            },
            {
              'name': 'Reset Min and Max Measured Values',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reset the Min and Max Measured Values to Current Value',
              'id': 5605
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Actuation',
        'description1': 'This IPSO object is dedicated to remote actuation such as ON/OFF action or dimming. A multi-state output can also be described as a string. This is useful to send pilot wire orders for instance. It also provides a resource to reflect the time that the device has been switched on.',
        'objectID': 3306,
        'objectURN': 'urn:oma:lwm2m:ext:3306',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'On/Off',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'On/Off',
              'id': 5850
            },
            {
              'name': 'Dimmer',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '0-100',
              'units': '%',
              'description': 'This resource represents a light dimmer setting, which has an Integer value between 0 and 100 as a percentage.',
              'id': 5851
            },
            {
              'name': 'On Time',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 'sec',
              'description': 'The time in seconds that the device has been on. Writing a value of 0 resets the counter.',
              'id': 5852
            },
            {
              'name': 'Muti-state Output',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'A string describing a state for multiple level output such as Pilot Wire',
              'id': 5853
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The Application type of the device, for example “Motion Closure”.',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Set Point',
        'description1': 'Description: This IPSO object should be used to set a desired value to a controller, such as a thermostat. This object enables a setpoint to be expressed units defined in the UCUM specification, to match an associated sensor or measurement value. A special resource is added to set the colour of an object.',
        'objectID': 3308,
        'objectURN': 'urn:oma:lwm2m:ext:3308',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Set Point Value',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The setpoint value.',
              'id': 5900
            },
            {
              'name': 'Sensor Units',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'If present, the type of sensor defined as the UCUM Unit Definition e.g. “Cel” for Temperature in Celcius.',
              'id': 5701
            },
            {
              'name': 'Colour',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'A string representing a value in some color space',
              'id': 5706
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The Application type of the device, for example “Motion Closure”.',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Load Control',
        'description1': 'Description: This Object is used for demand-response load control and other load control in automation application (not limited to power).',
        'objectID': 3310,
        'objectURN': 'urn:oma:lwm2m:ext:3310',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Event Identifier',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The event identifier as a string.',
              'id': 5823
            },
            {
              'name': 'Start Time',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Time when the load control event will start started.',
              'id': 5824
            },
            {
              'name': 'Duration In Min',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'String',
              'rangeEnumeration': '',
              'units': 'Min',
              'description': 'The duration of the load control event.',
              'id': 5825
            },
            {
              'name': 'Criticality Level',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The criticality of the event.  The device receiving the event will react in an appropriate fashion for the device.',
              'id': 5826
            },
            {
              'name': 'Avg Load Adj Pct',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '0-100',
              'units': '%',
              'description': 'Defines the maximum energy usage of the receivng device, as a percentage of the device\'s normal maximum energy usage.',
              'id': 5827
            },
            {
              'name': 'Duty Cycle',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '0-100',
              'units': '%',
              'description': 'Defines the duty cycle for the load control event, i.e, what percentage of time the receiving device is allowed to be on.',
              'id': 5828
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Light Control',
        'description1': 'Description: This Object is used to control a light source, such as a LED or other light.  It allows a light to be turned on or off and its dimmer setting to be control as a % between 0 and 100. An optional colour setting enables a string to be used to indicate the desired colour.',
        'objectID': 3311,
        'objectURN': 'urn:oma:lwm2m:ext:3311',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'On/Off',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'This resource represents a light, which can be controlled, the setting of which is a Boolean value (1,0) where 1 is on and 0 is off.',
              'id': 5850
            },
            {
              'name': 'Dimmer',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '0-100',
              'units': '%',
              'description': 'This resource represents a light dimmer setting, which has an Integer value between 0 and 100 as a percentage.',
              'id': 5851
            },
            {
              'name': 'On Time',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 'sec',
              'description': 'The time in seconds that the light has been on. Writing a value of 0 resets the counter.',
              'id': 5852
            },
            {
              'name': 'Cumulative active power',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Wh',
              'description': 'The total power in Wh that the light has used.',
              'id': 5805
            },
            {
              'name': 'Power Factor',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The power factor of the light.',
              'id': 5820
            },
            {
              'name': 'Colour',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'A string representing a value in some color space',
              'id': 5706
            },
            {
              'name': 'Sensor Units',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'If present, the type of sensor defined as the UCUM Unit Definition e.g. “Cel” for Temperature in Celcius.',
              'id': 5701
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Power Control',
        'description1': 'Description: This Object is used to control a power source, such as a Smart Plug.  It allows a power relay to be turned on or off and its dimmer setting to be control as a % between 0 and 100.',
        'objectID': 3312,
        'objectURN': 'urn:oma:lwm2m:ext:3312',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'On/Off',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'This resource represents a power relay, which can be controlled, the setting of which is a Boolean value (1,0) where 1 is on and 0 is off.',
              'id': 5850
            },
            {
              'name': 'Dimmer',
              'operations': 'W',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '0-100',
              'units': '%',
              'description': 'This resource represents a power dimmer setting, which has an Integer value between 0 and 100 as a percentage.',
              'id': 5851
            },
            {
              'name': 'On Time',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 'sec',
              'description': 'The time in seconds that the power relay has been on. Writing a value of 0 resets the counter.',
              'id': 5852
            },
            {
              'name': 'Cumulative active power',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Wh',
              'description': 'The total power in Wh that has been used by the load.',
              'id': 5805
            },
            {
              'name': 'Power Factor',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The power factor of the load.',
              'id': 5820
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Accelerometer',
        'description1': 'Description: This IPSO object can be used to represent a 1-3 axis accelerometer.',
        'objectID': 3313,
        'objectURN': 'urn:oma:lwm2m:ext:3313',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'X Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The measured value along the X axis.',
              'id': 5702
            },
            {
              'name': 'Y Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The measured value along the Y axis.',
              'id': 5703
            },
            {
              'name': 'Z Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The measured value along the Z axis.',
              'id': 5704
            },
            {
              'name': 'Sensor Units',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Measurement Units Definition e.g. “Cel” for Temperature in Celsius.',
              'id': 5701
            },
            {
              'name': 'Min Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value that can be measured by the sensor',
              'id': 5603
            },
            {
              'name': 'Max Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value that can be measured by the sensor',
              'id': 5604
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Magnetometer',
        'description1': 'Description: This IPSO object can be used to represent a 1-3 axis magnetometer with optional compass direction.',
        'objectID': 3314,
        'objectURN': 'urn:oma:lwm2m:ext:3314',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'X Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The measured value along the X axis.',
              'id': 5702
            },
            {
              'name': 'Y Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The measured value along the Y axis.',
              'id': 5703
            },
            {
              'name': 'Z Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The measured value along the Z axis.',
              'id': 5704
            },
            {
              'name': 'Compass Direction',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '0-360',
              'units': 'Deg',
              'description': 'The compass direction',
              'id': 5705
            },
            {
              'name': 'Sensor Units',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Measurement Units Definition e.g. “Cel” for Temperature in Celsius.',
              'id': 5701
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Barometer',
        'description1': 'Description: This IPSO object should be used with an air pressure sensor to report a barometer measurement.  It also provides resources for minimum/maximum measured values and the minimum/maximum range that can be measured by the barometer sensor. An example measurement unit is kPa (ucum:kPa).',
        'objectID': 3315,
        'objectURN': 'urn:oma:lwm2m:ext:3315',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Sensor Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'Last or Current Measured Value from the Sensor',
              'id': 5700
            },
            {
              'name': 'Min Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value measured by the sensor since power ON or reset',
              'id': 5601
            },
            {
              'name': 'Max Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value measured by the sensor since power ON or reset',
              'id': 5602
            },
            {
              'name': 'Min Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value that can be measured by the sensor',
              'id': 5603
            },
            {
              'name': 'Max Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value that can be measured by the sensor',
              'id': 5604
            },
            {
              'name': 'Sensor Units',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'If present, the type of sensor defined as the UCUM Unit Definition e.g. “Cel” for Temperature in Celcius.',
              'id': 5701
            },
            {
              'name': 'Reset Min and Max Measured Values',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reset the Min and Max Measured Values to Current Value',
              'id': 5605
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Voltage',
        'description1': 'This IPSO object should be used with voltmeter sensor to report measured voltage between two points.  It also provides resources for minimum and maximum measured values, as well as the minimum and maximum range that can be measured by the sensor. An example measurement unit is volts (ucum: V).\n        ',
        'objectID': 3316,
        'objectURN': 'urn:oma:lwm2m:ext:3316',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Sensor Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'Last or Current Measured Value from the Sensor',
              'id': 5700
            },
            {
              'name': 'Sensor Units',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Measurement Units Definition e.g. “Cel” for Temperature in Celsius',
              'id': 5701
            },
            {
              'name': 'Min Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value measured by the sensor since power ON or reset',
              'id': 5601
            },
            {
              'name': 'Max Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value measured by the sensor since power ON or reset',
              'id': 5602
            },
            {
              'name': 'Min Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value that can be measured by the sensor',
              'id': 5603
            },
            {
              'name': 'Max Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value that can be measured by the sensor',
              'id': 5604
            },
            {
              'name': 'Reset Min and Max Measured Values',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reset the Min and Max Measured Values to Current Value',
              'id': 5605
            },
            {
              'name': 'Current Calibration',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Read or Write the current calibration coefficient',
              'id': 5821
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Current',
        // tslint:disable-next-line:max-line-length
        'description1': 'This IPSO object should be used with an ammeter to report measured electric current in amperes. It also provides resources for minimum and maximum measured values, as well as the minimum and maximum range that can be measured by the sensor. An example measurement unit is volts (ucum: A).\n        ',
        'objectID': 3317,
        'objectURN': 'urn:oma:lwm2m:ext:3317',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Sensor Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'Last or Current Measured Value from the Sensor',
              'id': 5700
            },
            {
              'name': 'Sensor Units',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Measurement Units Definition e.g. “Cel” for Temperature in Celsius',
              'id': 5701
            },
            {
              'name': 'Min Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value measured by the sensor since power ON or reset',
              'id': 5601
            },
            {
              'name': 'Max Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value measured by the sensor since power ON or reset',
              'id': 5602
            },
            {
              'name': 'Min Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value that can be measured by the sensor',
              'id': 5603
            },
            {
              'name': 'Max Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value that can be measured by the sensor',
              'id': 5604
            },
            {
              'name': 'Reset Min and Max Measured Values',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reset the Min and Max Measured Values to Current Value',
              'id': 5605
            },
            {
              'name': 'Current Calibration',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Read or Write the current calibration coefficient',
              'id': 5821
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Frequency',
        'description1': 'This IPSO object should be used to report frequency measurements. It also provides resources for minimum and maximum measured values, as well as the minimum and maximum range that can be measured by the sensor. An example measurement unit is volts (ucum: Hz).\n        ',
        'objectID': 3318,
        'objectURN': 'urn:oma:lwm2m:ext:3318',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Sensor Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'Last or Current Measured Value from the Sensor',
              'id': 5700
            },
            {
              'name': 'Sensor Units',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Measurement Units Definition e.g. “Cel” for Temperature in Celsius',
              'id': 5701
            },
            {
              'name': 'Min Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value measured by the sensor since power ON or reset',
              'id': 5601
            },
            {
              'name': 'Max Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value measured by the sensor since power ON or reset',
              'id': 5602
            },
            {
              'name': 'Min Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value that can be measured by the sensor',
              'id': 5603
            },
            {
              'name': 'Max Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value that can be measured by the sensor',
              'id': 5604
            },
            {
              'name': 'Reset Min and Max Measured Values',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reset the Min and Max Measured Values to Current Value',
              'id': 5605
            },
            {
              'name': 'Current Calibration',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Read or Write the current calibration coefficient',
              'id': 5821
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Depth',
        'description1': 'This IPSO object should be used to report depth measurements. It can, for example, be used to describe a generic rain gauge that measures the accumulated rainfall in millimetres (mm) or in fathoms (fth).\n        ',
        'objectID': 3319,
        'objectURN': 'urn:oma:lwm2m:ext:3319',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Sensor Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'Last or Current Measured Value from the Sensor',
              'id': 5700
            },
            {
              'name': 'Sensor Units',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Measurement Units Definition e.g. “Cel” for Temperature in Celsius',
              'id': 5701
            },
            {
              'name': 'Min Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value measured by the sensor since power ON or reset',
              'id': 5601
            },
            {
              'name': 'Max Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value measured by the sensor since power ON or reset',
              'id': 5602
            },
            {
              'name': 'Min Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value that can be measured by the sensor',
              'id': 5603
            },
            {
              'name': 'Max Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value that can be measured by the sensor',
              'id': 5604
            },
            {
              'name': 'Reset Min and Max Measured Values',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reset the Min and Max Measured Values to Current Value',
              'id': 5605
            },
            {
              'name': 'Current Calibration',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Read or Write the current calibration coefficient',
              'id': 5821
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Percentage',
        'description1': 'This IPSO object should can be used to report measurements relative to a 0-100% scale. For example it could be used to measure the level of a liquid in a vessel or container in units of %.\n        ',
        'objectID': 3320,
        'objectURN': 'urn:oma:lwm2m:ext:3320',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Sensor Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'Last or Current Measured Value from the Sensor',
              'id': 5700
            },
            {
              'name': 'Sensor Units',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Measurement Units Definition e.g. “Cel” for Temperature in Celsius',
              'id': 5701
            },
            {
              'name': 'Min Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value measured by the sensor since power ON or reset',
              'id': 5601
            },
            {
              'name': 'Max Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value measured by the sensor since power ON or reset',
              'id': 5602
            },
            {
              'name': 'Min Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value that can be measured by the sensor',
              'id': 5603
            },
            {
              'name': 'Max Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value that can be measured by the sensor',
              'id': 5604
            },
            {
              'name': 'Reset Min and Max Measured Values',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reset the Min and Max Measured Values to Current Value',
              'id': 5605
            },
            {
              'name': 'Current Calibration',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Read or Write the current calibration coefficient',
              'id': 5821
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Altitude',
        'description1': 'This IPSO object should be used with an altitude sensor to report altitude above sea level in meters. Note that Altitude can be calculated from the measured pressure given the local sea level pressure.  It also provides resources for minimum and maximum measured values, as well as the minimum and maximum range that can be measured by the sensor. An example measurement unit is meters (ucum: m).\n        ',
        'objectID': 3321,
        'objectURN': 'urn:oma:lwm2m:ext:3321',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Sensor Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'Last or Current Measured Value from the Sensor',
              'id': 5700
            },
            {
              'name': 'Sensor Units',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Measurement Units Definition e.g. “Cel” for Temperature in Celsius',
              'id': 5701
            },
            {
              'name': 'Min Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value measured by the sensor since power ON or reset',
              'id': 5601
            },
            {
              'name': 'Max Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value measured by the sensor since power ON or reset',
              'id': 5602
            },
            {
              'name': 'Min Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value that can be measured by the sensor',
              'id': 5603
            },
            {
              'name': 'Max Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value that can be measured by the sensor',
              'id': 5604
            },
            {
              'name': 'Reset Min and Max Measured Values',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reset the Min and Max Measured Values to Current Value',
              'id': 5605
            },
            {
              'name': 'Current Calibration',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Read or Write the current calibration coefficient',
              'id': 5821
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Load',
        'description1': 'This IPSO object should be used with a load sensor (as in a scale) to report the applied weight or force. It also provides resources for minimum and maximum measured values, as well as the minimum and maximum range that can be measured by the sensor. An example measurement unit is kilograms (ucum: Kg).\n        ',
        'objectID': 3322,
        'objectURN': 'urn:oma:lwm2m:ext:3322',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Sensor Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'Last or Current Measured Value from the Sensor',
              'id': 5700
            },
            {
              'name': 'Sensor Units',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Measurement Units Definition e.g. “Cel” for Temperature in Celsius',
              'id': 5701
            },
            {
              'name': 'Min Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value measured by the sensor since power ON or reset',
              'id': 5601
            },
            {
              'name': 'Max Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value measured by the sensor since power ON or reset',
              'id': 5602
            },
            {
              'name': 'Min Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value that can be measured by the sensor',
              'id': 5603
            },
            {
              'name': 'Max Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value that can be measured by the sensor',
              'id': 5604
            },
            {
              'name': 'Reset Min and Max Measured Values',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reset the Min and Max Measured Values to Current Value',
              'id': 5605
            },
            {
              'name': 'Current Calibration',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Read or Write the current calibration coefficient',
              'id': 5821
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Pressure',
        'description1': 'This IPSO object should be used to report pressure measurements. It also provides resources for minimum and maximum measured values, as well as the minimum and maximum range that can be measured by the sensor. An example measurement unit is pascals (ucum: Pa).\n        ',
        'objectID': 3323,
        'objectURN': 'urn:oma:lwm2m:ext:3323',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Sensor Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'Last or Current Measured Value from the Sensor',
              'id': 5700
            },
            {
              'name': 'Sensor Units',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Measurement Units Definition e.g. “Cel” for Temperature in Celsius',
              'id': 5701
            },
            {
              'name': 'Min Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value measured by the sensor since power ON or reset',
              'id': 5601
            },
            {
              'name': 'Max Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value measured by the sensor since power ON or reset',
              'id': 5602
            },
            {
              'name': 'Min Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value that can be measured by the sensor',
              'id': 5603
            },
            {
              'name': 'Max Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value that can be measured by the sensor',
              'id': 5604
            },
            {
              'name': 'Reset Min and Max Measured Values',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reset the Min and Max Measured Values to Current Value',
              'id': 5605
            },
            {
              'name': 'Current Calibration',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Read or Write the current calibration coefficient',
              'id': 5821
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Loudness',
        'description1': 'This IPSO object should be used to report loudness or noise level measurements. It also provides resources for minimum and maximum measured values, as well as the minimum and maximum range that can be measured by the sensor. An example measurement unit is decibels (ucum: dB).\n        ',
        'objectID': 3324,
        'objectURN': 'urn:oma:lwm2m:ext:3324',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Sensor Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'Last or Current Measured Value from the Sensor',
              'id': 5700
            },
            {
              'name': 'Sensor Units',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Measurement Units Definition e.g. “Cel” for Temperature in Celsius',
              'id': 5701
            },
            {
              'name': 'Min Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value measured by the sensor since power ON or reset',
              'id': 5601
            },
            {
              'name': 'Max Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value measured by the sensor since power ON or reset',
              'id': 5602
            },
            {
              'name': 'Min Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value that can be measured by the sensor',
              'id': 5603
            },
            {
              'name': 'Max Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value that can be measured by the sensor',
              'id': 5604
            },
            {
              'name': 'Reset Min and Max Measured Values',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reset the Min and Max Measured Values to Current Value',
              'id': 5605
            },
            {
              'name': 'Current Calibration',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Read or Write the current calibration coefficient',
              'id': 5821
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Concentration',
        'description1': 'This IPSO object should be used to the particle concentration measurement of a medium. It also provides resources for minimum and maximum measured values, as well as the minimum and maximum range that can be measured by the sensor. An example measurement unit is parts per million  (ucum: ppm).\n        ',
        'objectID': 3325,
        'objectURN': 'urn:oma:lwm2m:ext:3325',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Sensor Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'Last or Current Measured Value from the Sensor',
              'id': 5700
            },
            {
              'name': 'Sensor Units',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Measurement Units Definition e.g. “Cel” for Temperature in Celsius',
              'id': 5701
            },
            {
              'name': 'Min Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value measured by the sensor since power ON or reset',
              'id': 5601
            },
            {
              'name': 'Max Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value measured by the sensor since power ON or reset',
              'id': 5602
            },
            {
              'name': 'Min Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value that can be measured by the sensor',
              'id': 5603
            },
            {
              'name': 'Max Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value that can be measured by the sensor',
              'id': 5604
            },
            {
              'name': 'Reset Min and Max Measured Values',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reset the Min and Max Measured Values to Current Value',
              'id': 5605
            },
            {
              'name': 'Current Calibration',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Read or Write the current calibration coefficient',
              'id': 5821
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Acidity',
        'description1': 'This IPSO object should be used to report an acidity measurement of a liquid. It also provides resources for minimum and maximum measured values, as well as the minimum and maximum range that can be measured by the sensor. An example measurement unit is pH.\n        ',
        'objectID': 3326,
        'objectURN': 'urn:oma:lwm2m:ext:3326',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Sensor Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'Last or Current Measured Value from the Sensor',
              'id': 5700
            },
            {
              'name': 'Sensor Units',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Measurement Units Definition e.g. “Cel” for Temperature in Celsius',
              'id': 5701
            },
            {
              'name': 'Min Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value measured by the sensor since power ON or reset',
              'id': 5601
            },
            {
              'name': 'Max Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value measured by the sensor since power ON or reset',
              'id': 5602
            },
            {
              'name': 'Min Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value that can be measured by the sensor',
              'id': 5603
            },
            {
              'name': 'Max Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value that can be measured by the sensor',
              'id': 5604
            },
            {
              'name': 'Reset Min and Max Measured Values',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reset the Min and Max Measured Values to Current Value',
              'id': 5605
            },
            {
              'name': 'Current Calibration',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Read or Write the current calibration coefficient',
              'id': 5821
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Conductivity',
        'description1': 'This IPSO object should be used to report a measurement of the electric conductivity of a medium or sample. It also provides resources for minimum and maximum measured values, as well as the minimum and maximum range that can be measured by the sensor. An example measurement unit is Siemens (ucum: S).\n        ',
        'objectID': 3327,
        'objectURN': 'urn:oma:lwm2m:ext:3327',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Sensor Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'Last or Current Measured Value from the Sensor',
              'id': 5700
            },
            {
              'name': 'Sensor Units',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Measurement Units Definition e.g. “Cel” for Temperature in Celsius',
              'id': 5701
            },
            {
              'name': 'Min Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value measured by the sensor since power ON or reset',
              'id': 5601
            },
            {
              'name': 'Max Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value measured by the sensor since power ON or reset',
              'id': 5602
            },
            {
              'name': 'Min Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value that can be measured by the sensor',
              'id': 5603
            },
            {
              'name': 'Max Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value that can be measured by the sensor',
              'id': 5604
            },
            {
              'name': 'Reset Min and Max Measured Values',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reset the Min and Max Measured Values to Current Value',
              'id': 5605
            },
            {
              'name': 'Current Calibration',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Read or Write the current calibration coefficient',
              'id': 5821
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Power',
        'description1': 'This IPSO object should be used to report power measurements. It also provides resources for minimum and maximum measured values, as well as the minimum and maximum range that can be measured by the sensor. An example measurement unit is Watts (ucum: W). This resource may be used for either real power or apparent power (units= ucum:VA) measurements. The Application type can be use for reactive power or active power for example.\n        ',
        'objectID': 3328,
        'objectURN': 'urn:oma:lwm2m:ext:3328',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Sensor Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'Last or Current Measured Value from the Sensor',
              'id': 5700
            },
            {
              'name': 'Sensor Units',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Measurement Units Definition e.g. “Cel” for Temperature in Celsius',
              'id': 5701
            },
            {
              'name': 'Min Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value measured by the sensor since power ON or reset',
              'id': 5601
            },
            {
              'name': 'Max Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value measured by the sensor since power ON or reset',
              'id': 5602
            },
            {
              'name': 'Min Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value that can be measured by the sensor',
              'id': 5603
            },
            {
              'name': 'Max Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value that can be measured by the sensor',
              'id': 5604
            },
            {
              'name': 'Reset Min and Max Measured Values',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reset the Min and Max Measured Values to Current Value',
              'id': 5605
            },
            {
              'name': 'Current Calibration',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Read or Write the current calibration coefficient',
              'id': 5821
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Power Factor',
        'description1': 'This IPSO object should be used to report a measurement or calculation of the power factor of a reactive electrical load. Power Factor is normally the ratio of non-reactive power to total power. This object also provides resources for minimum and maximum measured values, as well as the minimum and maximum range that can be measured by the sensor.\n        ',
        'objectID': 3329,
        'objectURN': 'urn:oma:lwm2m:ext:3329',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Sensor Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'Last or Current Measured Value from the Sensor',
              'id': 5700
            },
            {
              'name': 'Sensor Units',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Measurement Units Definition e.g. “Cel” for Temperature in Celsius',
              'id': 5701
            },
            {
              'name': 'Min Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value measured by the sensor since power ON or reset',
              'id': 5601
            },
            {
              'name': 'Max Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value measured by the sensor since power ON or reset',
              'id': 5602
            },
            {
              'name': 'Min Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value that can be measured by the sensor',
              'id': 5603
            },
            {
              'name': 'Max Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value that can be measured by the sensor',
              'id': 5604
            },
            {
              'name': 'Reset Min and Max Measured Values',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reset the Min and Max Measured Values to Current Value',
              'id': 5605
            },
            {
              'name': 'Current Calibration',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Read or Write the current calibration coefficient',
              'id': 5821
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Distance',
        'description1': 'This IPSO object should be used to report a distance measurement. It also provides resources for minimum and maximum measured values, as well as the minimum and maximum range that can be measured by the sensor. An example measurement unit is Meters (ucum: m).\n        ',
        'objectID': 3330,
        'objectURN': 'urn:oma:lwm2m:ext:3330',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Sensor Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'Last or Current Measured Value from the Sensor',
              'id': 5700
            },
            {
              'name': 'Sensor Units',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Measurement Units Definition e.g. “Cel” for Temperature in Celsius',
              'id': 5701
            },
            {
              'name': 'Min Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value measured by the sensor since power ON or reset',
              'id': 5601
            },
            {
              'name': 'Max Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value measured by the sensor since power ON or reset',
              'id': 5602
            },
            {
              'name': 'Min Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value that can be measured by the sensor',
              'id': 5603
            },
            {
              'name': 'Max Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value that can be measured by the sensor',
              'id': 5604
            },
            {
              'name': 'Reset Min and Max Measured Values',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reset the Min and Max Measured Values to Current Value',
              'id': 5605
            },
            {
              'name': 'Current Calibration',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Read or Write the current calibration coefficient',
              'id': 5821
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Energy',
        'description1': 'This IPSO object should be used to report energy consumption (Cumulative Power) of an electrical load. An example measurement unit is Watt Hours (ucum:W*h).\n        ',
        'objectID': 3331,
        'objectURN': 'urn:oma:lwm2m:ext:3331',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Sensor Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'Last or Current Measured Value from the Sensor.',
              'id': 5805
            },
            {
              'name': 'Sensor Units',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Measurement Units Definition e.g. “Cel” for Temperature in Celsius.',
              'id': 5701
            },
            {
              'name': 'Reset Cumulative Energy',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': '',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reset both cumulative active/reactive power.',
              'id': 5822
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case.',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Direction',
        'description1': 'This IPSO object is used to report the direction indicated by a compass, wind vane, or other directional indicator. The units of measure is plane angle degrees (ucum:deg).\n        ',
        'objectID': 3332,
        'objectURN': 'urn:oma:lwm2m:ext:3332',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Compass Direction',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '0-360',
              'units': 'deg',
              'description': 'This indicates the compass direction of some phenomenon (i.e. direction of travel, wind direction…).',
              'id': 5705
            },
            {
              'name': 'Min Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The minimum value measured by the sensor since power ON or reset.',
              'id': 5601
            },
            {
              'name': 'Max Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The maximum value measured by the sensor since power ON or reset.',
              'id': 5602
            },
            {
              'name': 'Reset Min and Max Measured Values',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': '',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reset the Min and Max Measured Values to Current Value.',
              'id': 5605
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case.',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Time',
        'description1': 'This IPSO object is used to report the current time in seconds since January 1, 1970 UTC. There is also a fractional time counter that has a range of less than one second.\n        ',
        'objectID': 3333,
        'objectURN': 'urn:oma:lwm2m:ext:3333',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Current Time',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Time',
              'rangeEnumeration': '',
              'units': 's',
              'description': 'Unix Time. A signed integer representing the number of seconds since Jan 1st, 1970 in the UTC time zone.',
              'id': 5506
            },
            {
              'name': 'Fractional Time',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '0-1',
              'units': 'seconds',
              'description': 'For shorter times of a fraction of a second (i.e. 0.23).',
              'id': 5507
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case.',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Gyrometer',
        'description1': 'This IPSO Object is used to report the current reading of a gyrometer sensor in 3 axes. It provides tracking of the minimum and maximum angular rate in all 3 axes. An example unit of measure is radians per second (ucum:rad/s).\n        ',
        'objectID': 3334,
        'objectURN': 'urn:oma:lwm2m:ext:3334',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'X Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The measured value along the X axis.',
              'id': 5702
            },
            {
              'name': 'Y Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The measured value along the Y axis.',
              'id': 5703
            },
            {
              'name': 'Z Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The measured value along the Z axis.',
              'id': 5704
            },
            {
              'name': 'Sensor Units',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Measurement Units Definition e.g. “Cel” for Temperature in Celsius.',
              'id': 5701
            },
            {
              'name': 'Min X Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum measured value along the X axis',
              'id': 5508
            },
            {
              'name': 'Max X Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum measured value along the X axis',
              'id': 5509
            },
            {
              'name': 'Min Y Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum measured value along the Y axis',
              'id': 5510
            },
            {
              'name': 'Max Y Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum measured value along the Y axis',
              'id': 5511
            },
            {
              'name': 'Min Z Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum measured value along the Z axis',
              'id': 5512
            },
            {
              'name': 'Max Z Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum measured value along the Z axis',
              'id': 5513
            },
            {
              'name': 'Reset Min and Max Measured Values',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': '',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reset the Min and Max Measured Values to Current Value.',
              'id': 5605
            },
            {
              'name': 'Min Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value that can be measured by the sensor',
              'id': 5603
            },
            {
              'name': 'Max Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value that can be measured by the sensor',
              'id': 5604
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case.',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Colour',
        'description1': 'This IPSO object should be used to report the measured value of a colour sensor in some colour space described by the units resource.\n        ',
        'objectID': 3335,
        'objectURN': 'urn:oma:lwm2m:ext:3335',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Colour',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'A string representing a value in some colour space.',
              'id': 5706
            },
            {
              'name': 'Sensor Units',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Measurement Units Definition e.g. “Cel” for Temperature in Celsius.',
              'id': 5701
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case.',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Location',
        'description1': 'This IPSO object represents GPS coordinates. This object is compatible with the LWM2M management object for location, but uses reusable resources.\n        ',
        'objectID': 3336,
        'objectURN': 'urn:oma:lwm2m:ext:3336',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Latitude',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The decimal notation of latitude, e.g. -43.5723 (World Geodetic System 1984).',
              'id': 5514
            },
            {
              'name': 'Longitude',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The decimal notation of longitude, e.g. 153.21760 (World Geodetic System 1984).',
              'id': 5515
            },
            {
              'name': 'Uncertainty',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The accuracy of the position in meters.',
              'id': 5516
            },
            {
              'name': 'Compass Direction',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '0-360',
              'units': 'Degrees',
              'description': 'Measured Direction.',
              'id': 5705
            },
            {
              'name': 'Velocity',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The velocity of the device as defined in 3GPP 23.032 GAD specification. This set of values may not be available if the device is static.',
              'id': 5517
            },
            {
              'name': 'Timestamp',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Time',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The timestamp of when the location measurement was performed.',
              'id': 5518
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case.',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Positioner',
        'description1': 'This IPSO object should be used with a generic position actuator from 0 to 100%. This resource optionally allows setting the transition time for an operation that changes the position of the actuator, and for reading the remaining time of the currently active transition.\n        ',
        'objectID': 3337,
        'objectURN': 'urn:oma:lwm2m:ext:3337',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Current Position',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '0-100',
              'units': '%',
              'description': 'Current position or desired position of a positioner actuator.',
              'id': 5536
            },
            {
              'name': 'Transition Time',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 's',
              'description': 'The time expected to move the actuator to the new position.',
              'id': 5537
            },
            {
              'name': 'Remaining Time',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 's',
              'description': 'The time remaining in an operation.',
              'id': 5538
            },
            {
              'name': 'Min Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': 'Same as Measured Value',
              'units': 'Same as Measured Value',
              'description': 'The minimum value set on the actuator since power ON or reset.',
              'id': 5601
            },
            {
              'name': 'Max Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': 'Same as Measured Value',
              'units': 'Same as Measured Value',
              'description': 'The maximum value set on the actuator since power ON or reset.',
              'id': 5602
            },
            {
              'name': 'Reset Min and Max Measured Value',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': '',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reset the Min and Max Measured Values to Current Value.',
              'id': 5605
            },
            {
              'name': 'Min Limit',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': 'Same as Measured Value',
              'units': 'Same as Measured Value',
              'description': 'The minimum value that can be measured by the sensor.',
              'id': 5519
            },
            {
              'name': 'Max Limit',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': 'Same as Measured Value',
              'units': 'Same as Measured Value',
              'description': 'The maximum value that can be measured by the sensor.',
              'id': 5520
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case.',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Buzzer',
        'description1': 'This IPSO object should be used to actuate an audible alarm such as a buzzer, beeper, or vibration alarm. There is a dimmer control for setting the relative loudness of the alarm, and an optional duration control to limit the length of time the alarm sounds when turned on. Each time a “1” is written to the On/Off resource, the alarm will sound again for the configured duration. If no duration is programmed or the setting is zero, writing a “1” to the On/Off resource will result in the alarm sounding continuously until a “0” is written to the On/Off resource.\n        ',
        'objectID': 3338,
        'objectURN': 'urn:oma:lwm2m:ext:3338',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'On/Off',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'On/Off control, 0=OFF, 1=ON.',
              'id': 5850
            },
            {
              'name': 'Dimmer',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '0-100',
              'units': '%',
              'description': 'Proportional control, integer value between 0 and 100 as a percentage.',
              'id': 5851
            },
            {
              'name': 'Delay Duration',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 's',
              'description': 'The duration of the time delay.',
              'id': 5521
            },
            {
              'name': 'Minimum Off-time',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 's',
              'description': 'The off time when On/Off control remains on.',
              'id': 5525
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case.',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },
      {
        'name': 'Audio Clip',
        'description1': 'This IPSO object should be used for a speaker that plays a pre-recorded audio clip or an audio output that is sent elsewhere. For example, an elevator which announces the floor of the building. A resource is provided to store the clip, a dimmer resource controls the relative sound level of the playback, and a duration resource limits the maximum playback time. After the duration time is reached, any remaining samples in the clip are ignored, and the clip player will be ready to play another clip.',
        'objectID': 3339,
        'objectURN': 'urn:oma:lwm2m:ext:3339',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Clip',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Audio Clip that is playable (i.e. short audio recording indicating the floor in an elevator).',
              'id': 5522
            },
            {
              'name': 'Trigger',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Trigger initiating actuation.',
              'id': 5523
            },
            {
              'name': 'Dimmer',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '0-100',
              'units': '%',
              'description': 'Proportional control, integer value between 0 and 100 as a percentage.',
              'id': 5851
            },
            {
              'name': 'Duration',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'seconds',
              'description': 'The duration of the sound once trigger.',
              'id': 5524
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case.',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },

      {
        'name': 'Timer',
        'description1': 'This IPSO object is used to time events and actions, using patterns common to industrial timers. A POST to the trigger resource or On/Off input state change starts the timing operation, and the timer remaining time shows zero when the operation is complete. The patterns supported are One-Shot (mode 1), On-Time or Interval (mode 2), Time delay on pick-up or TDPU (tmode 3), and Time Delay on Drop-Out or TDDO (mode 4). Mode 0 disables the timer, so the output follows the input with no delay. A counter is provided to count occurrences of the timer output changing from 0 to 1. Writing a value of zero resets the counter. The Digital Input State resource reports the state of the timer output.\n        ',
        'objectID': 3340,
        'objectURN': 'urn:oma:lwm2m:ext:3340',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Duration',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 's',
              'description': 'The duration of the time delay.',
              'id': 5521
            },
            {
              'name': 'Remaining Time',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 's',
              'description': 'The time remaining in an operation.',
              'id': 5538
            },
            {
              'name': 'Minimum Off-time',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 's',
              'description': 'The duration of the rearm delay (i.e. the delay from the end of one cycle until the beginning of the next, the inhibit time).',
              'id': 5525
            },
            {
              'name': 'Trigger',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Trigger initiating actuation.',
              'id': 5523
            },
            {
              'name': 'On/Off',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'On/off control for the timer input, 0=OFF, 1=ON.',
              'id': 5850
            },
            {
              'name': 'Digital Input Counter',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The number of times the input.',
              'id': 5501
            },
            {
              'name': 'Cumulative Time',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 's',
              'description': 'The total time in seconds that the timer input is true. Writing a 0 resets the time.',
              'id': 5544
            },
            {
              'name': 'Digital State',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The current state of the timer output.',
              'id': 5543
            },
            {
              'name': 'Counter',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Counts the number of times the timer output transitions from 0 to 1.',
              'id': 5534
            },
            {
              'name': 'Mode',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '0-4',
              'units': '',
              'description': 'Type of timer pattern used by the patterns.',
              'id': 5526
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case.',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },

      {
        'name': 'Addressable Text Display',
        'description1': 'This IPSO object is used to send text to a text-only or text mode graphics display. POSTing a string of text to the text resource causes it to be displayed at the selected X and Y locations on the display. If X or Y are set to a value greater than the size of the display, the position “wraps around” to the modulus of the setting and the display size. Likewise, if the text string overflows the display size, the text “wraps around” and displays on the next line down or, if the last line has been written, wraps around to the top of the display. Brightness and Contrast controls are provided to allow control of various display types including STN and DSTN type LCD character displays. POSTing an empty payload to the Clear Display resource causes the display to be erased.\n        ',
        'objectID': 3341,
        'objectURN': 'urn:oma:lwm2m:ext:3341',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Text',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'A string of text.',
              'id': 5527
            },
            {
              'name': 'X Coordinate',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': '',
              'description': 'X Coordinate.',
              'id': 5528
            },
            {
              'name': 'Y Coordinate',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Y Coordinate.',
              'id': 5529
            },
            {
              'name': 'Max X Coordinate',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The highest X coordinate the display supports before wrapping to the next line.',
              'id': 5545
            },
            {
              'name': 'Max Y Coordinate',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The highest Y coordinate the display supports before wrapping to the next line.',
              'id': 5546
            },
            {
              'name': 'Clear Display',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': '',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Command to clear the display.',
              'id': 5530
            },
            {
              'name': 'Dimmer',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '0-100',
              'units': '%',
              'description': 'Proportional control, integer value between 0 and 100 as a percentage.',
              'id': 5851
            },
            {
              'name': 'Contrast',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '0-100',
              'units': '%',
              'description': 'Proportional control, integer value between 0 and 100 as a percentage.',
              'id': 5531
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case.',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },

      {
        'name': 'On/Off switch',
        'description1': 'This IPSO object should be used with an On/Off switch to report the state of the switch.',
        'objectID': 3342,
        'objectURN': 'urn:oma:lwm2m:ext:3342',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Digital Input State',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The current state of a digital input.',
              'id': 5500
            },
            {
              'name': 'Digital Input Counter',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The number of times the input transitions from 0 to 1.',
              'id': 5501
            },
            {
              'name': 'On Time',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 's',
              'description': 'The time in seconds since the On command was sent. Writing a value of 0 resets the counter.',
              'id': 5852
            },
            {
              'name': 'Off Time',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 's',
              'description': 'The time in seconds since the Off command was sent. Writing a value of 0 resets the counter.',
              'id': 5854
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case.',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },

      {
        'name': 'Dimmer',
        'description1': 'This IPSO object should be used with a dimmer or level control to report the state of the control.\n        ',
        'objectID': 3343,
        'objectURN': 'urn:oma:lwm2m:ext:3343',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Dimmer',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '0-100',
              'units': '%',
              'description': 'Proportional control, integer value between 0 and 100 as a percentage.',
              'id': 5851
            },
            {
              'name': 'On Time',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 's',
              'description': 'The time in seconds that the dimmer has been on (Dimmer value has to be > 0). Writing a value of 0 resets the counter.',
              'id': 5852
            },
            {
              'name': 'Off Time',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 's',
              'description': 'The time in seconds that the dimmer has been off  (dimmer value less or equal to 0) Writing a value of 0 resets the counter. ',
              'id': 5854
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },

      {
        'name': 'Up/Down Control',
        'description1': 'This IPSO object is used to report the state of an up/down control element like a pair of push buttons or a rotary encoder. Counters for increase and decrease operations are provided for counting pulses from a quadrature encoder.\n        ',
        'objectID': 3344,
        'objectURN': 'urn:oma:lwm2m:ext:3344',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Increase Input State',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Indicates an increase control action.',
              'id': 5532
            },
            {
              'name': 'Decrease Input State',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Indicates a decrease control action.',
              'id': 5533
            },
            {
              'name': 'Up Counter',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Counts the number of times the increase control has been operated. Writing a 0 resets the counter.',
              'id': 5541
            },
            {
              'name': 'Down Counter',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Counts the times the decrease control has been operated. Writing a 0 resets the counter.',
              'id': 5542
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case.',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },

      {
        'name': 'Multiple Axis Joystick',
        'description1': 'This IPSO object can be used to report the position of a shuttle or joystick control. A digital input is provided to report the state of an associated push button.\n        ',
        'objectID': 3345,
        'objectURN': 'urn:oma:lwm2m:ext:3345',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Digital Input State',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The current state of a digital input.',
              'id': 5500
            },
            {
              'name': 'Digital Input Counter',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The number of times the input transitions from 0 to 1.',
              'id': 5501
            },
            {
              'name': 'X Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The measured value along the X axis.',
              'id': 5702
            },
            {
              'name': 'Y Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The measured value along the Y axis.',
              'id': 5703
            },
            {
              'name': 'Z Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The measured value along the Z axis.',
              'id': 5704
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case.',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },

      {
        'name': 'Rate',
        'description1': 'This object type should be used to report a rate measurement, for example the speed of a vehicle, or the rotational speed of a drive shaft. It also provides resources for minimum and maximum measured values, as well as the minimum and maximum range that can be measured by the sensor.An example measurement unit is Feet per Second (ucum:ft_us/s).\n        ',
        'objectID': 3346,
        'objectURN': 'urn:oma:lwm2m:ext:3346',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Sensor Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'Last or Current Measured Value from the Sensor',
              'id': 5700
            },
            {
              'name': 'Sensor Units',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Measurement Units Definition e.g. Rate, example units = Feet per Second',
              'id': 5701
            },
            {
              'name': 'Min Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value measured by the sensor since power ON or reset',
              'id': 5601
            },
            {
              'name': 'Max Measured Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value measured by the sensor since power ON or reset',
              'id': 5602
            },
            {
              'name': 'Min Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The minimum value that can be measured by the sensor',
              'id': 5603
            },
            {
              'name': 'Max Range Value',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Defined by “Units” resource.',
              'description': 'The maximum value that can be measured by the sensor',
              'id': 5604
            },
            {
              'name': 'Reset Min and Max Measured Values',
              'operations': 'E',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Opaque',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Reset the Min and Max Measured Values to Current Value',
              'id': 5605
            },
            {
              'name': 'Current Calibration',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Read or Write the current calibration coefficient',
              'id': 5821
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },

      {
        'name': 'Push button',
        'description1': 'This IPSO object is used to report the state of a momentary action push button control and to count the number of times the control has been operated since the last observation.\n        ',
        'objectID': 3347,
        'objectURN': 'urn:oma:lwm2m:ext:3347',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Digital Input State',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The current state of a digital input.',
              'id': 5500
            },
            {
              'name': 'Digital Input State',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The number of times the input transitions from 0 to 1.',
              'id': 5501
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case.',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },

      {
        'name': 'Multi-state Selector',
        'description1': 'This IPSO object is used to represent the state of a Multi-state selector switch with a number of fixed positions.\n        ',
        'objectID': 3348,
        'objectURN': 'urn:oma:lwm2m:ext:3348',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Multi-state Input',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The current state of a Multi-state input or selector.',
              'id': 5547
            },
            {
              'name': 'Application Type',
              'operations': 'RW',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': 'The application type of the sensor or actuator as a string depending on the use case.',
              'id': 5750
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },

      {
        'name': '3-Phase Power Meter',
        'description1': '\n        This Object provides the information to represent a generic 3-Phase Power Meter.\n    ',
        'objectID': 10242,
        'objectURN': 'urn:oma:lwm2m:x:10242',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Manufacturer',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': '\n                Human readable manufacturer name\n            ',
              'id': 0
            },
            {
              'name': 'Model Number',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': '\n                A model identifier (manufacturer specified string)\n            ',
              'id': 1
            },
            {
              'name': 'Serial Number',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': '\n                Serial number of the meter\n            ',
              'id': 2
            },
            {
              'name': 'Description',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': '\n                Description of the meter\n            ',
              'id': 3
            },
            {
              'name': 'Tension R',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'V',
              'description': '\n                Voltage phase 1 (phase to neutral)\n            ',
              'id': 4
            },
            {
              'name': 'Current R',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'A',
              'description': '\n                Current phase 1\n            ',
              'id': 5
            },
            {
              'name': 'Active Power R',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kW',
              'description': '\n                Active Power phase 1\n            ',
              'id': 6
            },
            {
              'name': 'Reactive Power R',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kvar',
              'description': '\n                Reactive Power phase 1\n            ',
              'id': 7
            },
            {
              'name': 'Inductive Reactive Power R',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kvarL',
              'description': '\n                Inductive Reactive Power phase 1\n            ',
              'id': 8
            },
            {
              'name': 'Capacitive Reactive Power R',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kvarC',
              'description': '\n                Capacitive Reactive Power phase 1\n            ',
              'id': 9
            },
            {
              'name': 'Apparent Power R',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kVA',
              'description': '\n                Apparent Power phase 1\n            ',
              'id': 10
            },
            {
              'name': 'Power Factor R',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '-1..1',
              'units': '',
              'description': '\n                Power Factor phase 1\n            ',
              'id': 11
            },
            {
              'name': 'THD-V R',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '%',
              'description': '\n                Total Harmonic Distortion phase 1 (Tension)\n            ',
              'id': 12
            },
            {
              'name': 'THD-A R',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '%',
              'description': '\n                Total Harmonig Distortion phase 1 (Current)\n            ',
              'id': 13
            },
            {
              'name': 'Tension S',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'V',
              'description': '\n                Voltage phase 2 (phase to neutral)\n            ',
              'id': 14
            },
            {
              'name': 'Current S',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'A',
              'description': '\n                Current phase 2\n            ',
              'id': 15
            },
            {
              'name': 'Active Power S',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kW',
              'description': '\n                Active Power phase 2\n            ',
              'id': 16
            },
            {
              'name': 'Reactive Power S',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kvar',
              'description': '\n                Reactive Power phase 2\n            ',
              'id': 17
            },
            {
              'name': 'Inductive Reactive Power S',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kvarL',
              'description': '\n                Inductive Reactive Power phase 2\n            ',
              'id': 18
            },
            {
              'name': 'Capacitive Reactive Power S',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kvarC',
              'description': '\n                Capacitive Reactive Power phase 2\n            ',
              'id': 19
            },
            {
              'name': 'Apparent Power S',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kVA',
              'description': '\n                Apparent Power phase 2\n            ',
              'id': 20
            },
            {
              'name': 'Power Factor S',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '-1..1',
              'units': '',
              'description': '\n                Power Factor phase 2\n            ',
              'id': 21
            },
            {
              'name': 'THD-V S',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '%',
              'description': '\n                Total Harmonic Distortion phase 2 (Tension)\n            ',
              'id': 22
            },
            {
              'name': 'THD-A S',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '%',
              'description': '\n                Total Harmonic Distortion phase 2 (Current)\n            ',
              'id': 23
            },
            {
              'name': 'Tension T',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'V',
              'description': '\n                Voltage phase 3 (phase to neutral)\n            ',
              'id': 24
            },
            {
              'name': 'Current T',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'A',
              'description': '\n                Current phase 3\n            ',
              'id': 25
            },
            {
              'name': 'Active Power T',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kW',
              'description': '\n                Active Power phase 3\n            ',
              'id': 26
            },
            {
              'name': 'Reactive Power T',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kvar',
              'description': '\n                Reactive Power phase 3\n            ',
              'id': 27
            },
            {
              'name': 'Inductive Reactive Power T',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kvarL',
              'description': '\n                Inductive Reactive Power phase 3\n            ',
              'id': 28
            },
            {
              'name': 'Capacitive Reactive Power T',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kvarC',
              'description': '\n                Capacitive Reactive Power phase 3\n            ',
              'id': 29
            },
            {
              'name': 'Apparent Power T',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kVA',
              'description': '\n                Apparent Power phase 3\n            ',
              'id': 30
            },
            {
              'name': 'Power Factor T',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '-1..1',
              'units': '',
              'description': '\n                Power Factor phase 3\n            ',
              'id': 31
            },
            {
              'name': 'THD-V T',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '%',
              'description': '\n                Total Harmonic Distortion phase 3 (Tension)\n            ',
              'id': 32
            },
            {
              'name': 'THD-A T',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '%',
              'description': '\n                Total Harmonic Distortion phase 3 (Current)\n            ',
              'id': 33
            },
            {
              'name': '3-Phase Active Power',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kW III',
              'description': '\n                3-Phase Active Power\n            ',
              'id': 34
            },
            {
              'name': '3-Phase Reactive Power',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kvar III',
              'description': '\n                3-Phase Reactive Power\n            ',
              'id': 35
            },
            {
              'name': '3-Phase Inductive Reactive Power',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kvarL III',
              'description': '\n                3-Phase Inductive Reactive Power\n            ',
              'id': 36
            },
            {
              'name': '3-Phase Capacitive Reactive Power',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kvarC III',
              'description': '\n                3-Phase Capacitive Reactive Power\n            ',
              'id': 37
            },
            {
              'name': '3-Phase Apparent Power',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kVA III',
              'description': '\n                3-Phase Apparent Power\n            ',
              'id': 38
            },
            {
              'name': '3-Phase Power Factor',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '-1..1',
              'units': '',
              'description': '\n                3-Phase Power Factor\n            ',
              'id': 39
            },
            {
              'name': '3-Phase phi cosine',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '-1..1',
              'units': '',
              'description': '\n                3-Phase phi cosine\n            ',
              'id': 40
            },
            {
              'name': 'Active Energy',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kW/h III',
              'description': '\n                Active Energy\n            ',
              'id': 41
            },
            {
              'name': 'Reactive Energy',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kvar/h III',
              'description': '\n                Reactive Energy\n            ',
              'id': 42
            },
            {
              'name': 'Inductive Reactive Energy',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kvarL/h III',
              'description': '\n                Inductive Reactive Energy\n            ',
              'id': 43
            },
            {
              'name': 'Capacitive Reactive Energy',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kvarC/h III',
              'description': '\n                Capacitive Reactive Energy\n            ',
              'id': 44
            },
            {
              'name': 'Apparent Energy',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kVA/h III',
              'description': '\n                Apparent Energy\n            ',
              'id': 45
            },
            {
              'name': 'Tension R-S',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'V',
              'description': '\n                Voltage phase 1 to phase 2\n            ',
              'id': 46
            },
            {
              'name': 'Tension S-T',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'V',
              'description': '\n                Voltage phase 2 to phase 3\n            ',
              'id': 47
            },
            {
              'name': 'Tension T-R',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'V',
              'description': '\n                Voltage phase 3 to phase 1\n            ',
              'id': 48
            },
            {
              'name': 'Frequency',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Hz',
              'description': '\n                Frequency\n            ',
              'id': 49
            },
            {
              'name': 'Neutral Current',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'A',
              'description': '\n                Neutral Current\n            ',
              'id': 50
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },

      {
        'name': 'Single-Phase Power Meter',
        'description1': '\n        This Object provides the information to represent a generic Single-Phase Power Meter.\n    ',
        'objectID': 10243,
        'objectURN': 'urn:oma:lwm2m:x:10243',
        'multipleInstances': 'Multiple',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Manufacturer',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': '\n                Human readable manufacturer name\n            ',
              'id': 0
            },
            {
              'name': 'Model Number',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': '\n                A model identifier (manufacturer specified string)\n            ',
              'id': 1
            },
            {
              'name': 'Serial Number',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': '\n                Serial number of the meter\n            ',
              'id': 2
            },
            {
              'name': 'Description',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'String',
              'rangeEnumeration': '',
              'units': '',
              'description': '\n                Description of the meter\n            ',
              'id': 3
            },
            {
              'name': 'Tension',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'String',
              'rangeEnumeration': '',
              'units': 'V',
              'description': '\n                Voltage\n            ',
              'id': 4
            },
            {
              'name': 'Current',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'A',
              'description': '\n                Current\n            ',
              'id': 5
            },
            {
              'name': 'Active Power',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kW',
              'description': '\n                Active Power\n            ',
              'id': 6
            },
            {
              'name': 'Reactive Power',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kvar',
              'description': '\n                Reactive Power\n            ',
              'id': 7
            },
            {
              'name': 'Inductive Reactive Power',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kvarL',
              'description': '\n                Inductive Reactive Power\n            ',
              'id': 8
            },
            {
              'name': 'Capacitive Reactive Power',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kvarC',
              'description': '\n                Capacitive Reactive Power\n            ',
              'id': 9
            },
            {
              'name': 'Apparent Power',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kVA',
              'description': '\n                Apparent Power\n            ',
              'id': 10
            },
            {
              'name': 'Power Factor',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '-1..1',
              'units': '',
              'description': '\n                Power Factor\n            ',
              'id': 11
            },
            {
              'name': 'THD-V',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '%',
              'description': '\n                Total Harmonic Distortion (Tension)\n            ',
              'id': 12
            },
            {
              'name': 'THD-A',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': '%',
              'description': '\n                Total Harmonic Distortion (Current)\n            ',
              'id': 13
            },
            {
              'name': 'Active Energy',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kW/h',
              'description': '\n                Active Energy\n            ',
              'id': 14
            },
            {
              'name': 'Reactive Energy',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kvar/h',
              'description': '\n                Reactive Energy\n            ',
              'id': 15
            },
            {
              'name': 'Apparent Energy',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kVA/h',
              'description': '\n                Apparent Energy\n            ',
              'id': 16
            },
            {
              'name': 'Frequency',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Hz',
              'description': '\n                Frequency\n            ',
              'id': 17
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      },

      {
        'name': 'VehicleControlUnit',
        'description1': 'This Object provides the information to represent a generic VCU(vehicle control unit).',
        'objectID': 10244,
        'objectURN': 'urn:oma:lwm2m:x:10244',
        'multipleInstances': 'Single',
        'mandatory': 'Optional',
        'resources': {
          'item': [
            {
              'name': 'Vehicle UI State',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Integer',
              'rangeEnumeration': '0-15',
              'units': '',
              'description': 'The UI state of the vehicle. 0: idle 1: driving 2: charging 3: limp-home 4-15: reserved for future use',
              'id': 0
            },
            {
              'name': 'Vehicle Speed',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 'km/h',
              'description': 'Current speed of the vehicle.',
              'id': 1
            },
            {
              'name': 'Vehicle Shift Status',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Integer',
              'rangeEnumeration': '0-3',
              'units': '',
              'description': 'Current shift status of the vehicle. 0: Neutral 1: Forward 2: Reverse',
              'id': 2
            },
            {
              'name': 'Vehicle AP Position',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Integer',
              'rangeEnumeration': '0-100',
              'units': '%',
              'description': 'Current position of the accelerator pedal.',
              'id': 3
            },
            {
              'name': 'Vehicle Power',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'kW',
              'description': 'Current power of drive output/regenerative braking.',
              'id': 4
            },
            {
              'name': 'Vehicle Drive Energy',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Wh',
              'description': 'Accumulated drive energy of the vehicle.',
              'id': 5
            },
            {
              'name': 'Vehicle Energy Consumption Efficiency',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'Wh/km',
              'description': 'Energy consumption efficiency of the vehicle.',
              'id': 6
            },
            {
              'name': 'Vehicle Estimated Mileage',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 'km',
              'description': 'Estimated mileage of current battery capacity.',
              'id': 7
            },
            {
              'name': 'Vehicle Charge Cable Status',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Whether the charge cable is connected or not. 0: unconnected 1: connected',
              'id': 8
            },
            {
              'name': 'Vehicle Charge Status',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Integer',
              'rangeEnumeration': '0-15',
              'units': '',
              'description': 'Charging status of the vehicle. 1: non-charge mode 2: charging 3: charge completed 4: charging abort abnormally ',
              'id': 9
            },
            {
              'name': 'Vehicle Charge Voltage',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'V',
              'description': 'Charging voltage',
              'id': 10
            },
            {
              'name': 'Vehicle Charge Current',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'A',
              'description': 'Charging current',
              'id': 11
            },
            {
              'name': 'Vehicle Charge Remaining Time',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 'minute',
              'description': 'Remaining charging time',
              'id': 12
            },
            {
              'name': 'Battery Pack Voltage',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'V',
              'description': 'Voltage of the battery pack',
              'id': 13
            },
            {
              'name': 'Battery Pack Current',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Float',
              'rangeEnumeration': '',
              'units': 'A',
              'description': 'Current of the battery pack',
              'id': 14
            },
            {
              'name': 'Battery Pack Remaining Capacity',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 'Ah',
              'description': 'Remaining capacity of the battery pack',
              'id': 15
            },
            {
              'name': 'Battery Pack SOC',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Integer',
              'rangeEnumeration': '0-100',
              'units': '%',
              'description': 'SOC(state of charge) of the battery pack',
              'id': 16
            },
            {
              'name': 'Battery Pack SOH',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Integer',
              'rangeEnumeration': '0-100',
              'units': '%',
              'description': 'SOH(state of health) of the battery pack',
              'id': 17
            },
            {
              'name': 'Battery Cell MinVolt',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 'mV',
              'description': 'Minimum voltage of the battery module (with parallel connection of cells)',
              'id': 18
            },
            {
              'name': 'Battery Cell MaxVolt',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 'mV',
              'description': 'Maximum voltage of the battery module (with parallel connection of cells)',
              'id': 19
            },
            {
              'name': 'Battery Module MinTemp',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 'Celsius',
              'description': 'Minimum temperature of the battery module',
              'id': 20
            },
            {
              'name': 'Battery Module MaxTemp',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 'Celsius',
              'description': 'Maximum temperature of the battery module',
              'id': 21
            },
            {
              'name': 'Battery Connection Status',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Whether the battery is connected or not. 0: unconnected 1: connected',
              'id': 22
            },
            {
              'name': 'MCU Voltage',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 'V',
              'description': 'Voltage of the MCU(motor control unit)',
              'id': 24
            },
            {
              'name': 'MCU Temperature',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 'Celsius',
              'description': 'Temperature of MCU(motor control unit)',
              'id': 25
            },
            {
              'name': 'Motor Speed',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 'rpm',
              'description': 'Rotational speed of the motor',
              'id': 26
            },
            {
              'name': 'Motor Temperature',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Mandatory',
              'type': 'Integer',
              'rangeEnumeration': '',
              'units': 'Celsius',
              'description': 'Temperature of the motor',
              'id': 27
            },
            {
              'name': 'Motor OT Warning',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Whether the motor is OT or not. 0: normal 1: OT warning',
              'id': 28
            },
            {
              'name': 'MCU OT Warning',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Whether the MCU is OT or not. 0: normal 1: OT warning',
              'id': 29
            },
            {
              'name': 'Battery Pack OT Warning',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Whether the battery pack is OT or not. 0: normal 1: OT warning',
              'id': 30
            },
            {
              'name': 'MCU fault',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Status of MCU. 0: normal 1: level 1 minor fault 2: level 2 critical fault',
              'id': 31
            },
            {
              'name': 'Motor Error',
              'operations': 'R',
              'multipleInstances': 'Single',
              'mandatory': 'Optional',
              'type': 'Boolean',
              'rangeEnumeration': '',
              'units': '',
              'description': 'Status of the battery pack. 0: normal 1: level D25 minor fault 2: level 2 critical fault',
              'id': 32
            }
          ]
        },
        'description2': '',
        'objectType': 'MODefinition'
      }
    ],
  };
/* tslint:enable:max-line-length */

