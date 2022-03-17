import { Device, DriverTemplate, DeviceRegister } from '@app/cosmyna/models';

export const devicePayload: Device = {
  'deviceTypeId': 'BEA85799-FEC4-45F3-8C4A-A9348B0A8D43',
  'driverId': '7F7CF80D-2922-4679-BCB1-F715F97A23BC',
  'name': 'mitsubish device',
  'description': 'S7 PLC',
  'properties': {
    'parity': '0',
    'baudRate': '19200',
    'slotNumber': '222',
    'dataBits': '7',
    'stopBits': '1',
    'deviceFile': '/dev/ttyS0'
    }
  };
export const deviceResponse: Device = {
    'description': '',
    'deviceType': {
      'id': '13C8F72A-4AD6-4150-BDA9-B7991C1CF22E',
      'name': 'Modbus'
    },
    'deviceTypeId': '13C8F72A-4AD6-4150-BDA9-B7991C1CF22E',
    'driver': {
      'className': 'modbus_ascii.ModbusAscii',
      'description': 'Modbus ASCII Serial Driver',
      'id': '6FDA2622-D5BF-4F8B-ADC3-5E791438525B',
      'interfaceType': 0,
      'name': 'Modbus ASCII',
      'version': '1.0'
    },
    'driverId': '6FDA2622-D5BF-4F8B-ADC3-5E791438525B',
    'id': 'BDD914B9-D4B5-4558-85AC-8C7A352BCD2A',
    'name': 'modbus device',
    'properties': {
      'baudRate': '9600',
      'dataBits': '8',
      'description': 'modbus device',
      'deviceFile': '/dev/ttyS0',
      'name': 'modbus device',
      'parity': '0',
      'stationId': '333',
      'stopBits': '1'
    }
  };

  export const templateResponse: DriverTemplate = {
  'driverId': 'F4805625-AAC2-4F2D-A673-52E5A287B98E',
  'id': '6085ad9a-1166-444b-b867-87ad1620fbeb',
  'template': {
    'description': {
      'default': 'modbus device',
      'description': 'This is a description of device.',
      'required': false
    },
    'name': {
      'default': 'modbus device',
      'description': 'This is a Device Name.',
      'required': true
    },
    'networkAddress': {
      'default': '192.168.0.1',
      'description': 'This is a IP Address of device.',
      'required': true
    },
    'networkPort': {
      'default': '502',
      'description': 'This is a network port of device.',
      'required': true,
      'type': 'int'
    },
    'pollRegister': {
      'address': 1,
      'dbNumber': null,
      'id': 'f590320f-20a7-46e3-8550-020fb7384514',
      'name': 'H',
      'valueType': 'integer'
    },
    'registerMeta': {
      'address': {
        'description': '',
        'required': true
      },
      'registers': [
        {
          'addressFormat': 'DDDD',
          'description': 'Discrete Input Contacts',
          'maxAddress': 9999,
          'minAddress': 0,
          'name': 'D',
          'valueTypes': [
            'bit'
          ]
        },
        {
          'addressFormat': 'DDDD',
          'description': 'Discrete Output Coils',
          'maxAddress': 9999,
          'minAddress': 0,
          'name': 'C',
          'valueTypes': [
            'bit'
          ]
        },
        {
          'addressFormat': 'DDDD',
          'description': 'Analog Output Holding Registers',
          'maxAddress': 9999,
          'minAddress': 0,
          'name': 'H',
          'valueTypes': [
            'integer'
          ]
        },
        {
          'addressFormat': 'DDDD',
          'description': 'Analog Input Registers',
          'maxAddress': 9999,
          'minAddress': 0,
          'name': 'I',
          'valueTypes': [
            'integer'
          ]
        }
      ]
    },
    'stationId': {
      'default': '0',
      'description': 'This is a station no of device.',
      'required': true,
      'type': 'int'
    }
  }
  };

export const RegisterResponse: DeviceRegister = {
  address : 2,
  dbNumber : 1,
  description : 'e',
  deviceId : '6E213E73-51E0-4A7C-BD7B-D15581060875',
  divisor : 0,
  id : '727ffc0c-32fa-4b7c-b2ac-14e35b9401d9',
  multiplier : 1000,
  name : 'O',
  pollingInterval : 2000,
  tagName : 'eee',
  unit : '1',
  valueType : 'bit',
};
