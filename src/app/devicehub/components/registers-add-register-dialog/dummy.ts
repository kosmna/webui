export const dummyData = {
    'id': 'F4805625-AAC2-4F2D-A673-52E5A287B98E',
    'name': 'Modbus TCP',
    'description': 'Modbus TCP Ethernet Driver',
    'className': 'modbus_tcp.ModbusTcp',
    'interfaceType': 1,
    'version': '1.0',
    'deviceTypes': ['13C8F72A-4AD6-4150-BDA9-B7991C1CF22E'],
    'meta':
    {
        'name': {'required': true, 'default': 'modbus device', 'description': 'This is a Device Name.'},
        'description': {'required': false, 'default': 'modbus device', 'description': 'This is a description of device.'},
        'stationId': {'required': false, 'default': '', 'description': ''},
        'slotNumber': {'required': false, 'default': '', 'description': ''},
        'deviceFile': {'required': false, 'default': '', 'description': ''},
        'baudRate': {'required': false, 'default': '', 'description': ''},
        'dataBits': {'required': false, 'default': '', 'description': ''},
        'stopBits': {'required': false, 'default': '', 'description': ''},
        'parity': {'required': false, 'default': '', 'description': ''},
        'networkAddress': {'required': true, 'default': '192.168.0.1', 'description': 'This is a IP Address of device.'},
        'networkPort': {'required': true, 'default': '502', 'description': 'This is a network port of device.'},
        'pollRegister': {'id': 'f590320f-20a7-46e3-8550-020fb7384514', 'name': 'H', 'dbNumber': null, 'address': 1, 'valueType': 'integer'},
        'registerMeta': {
            'dbNumber': {'required': false, 'description': '', 'default': '0'},
            'address': {'required': true, 'description': ''},
            'registers':
            [
                {'name': 'D', 'valueTypes': ['bit'], 'addressFormat': 'DDDD',
                    'maxAddress': 9999, 'minAddress': 0, 'description': 'Discrete Input Contacts'},
                {'name': 'C', 'valueTypes': ['bit'], 'addressFormat': 'DDDD',
                    'maxAddress': 9999, 'minAddress': 0, 'description': 'Discrete Output Coils'},
                {'name': 'H', 'valueTypes': ['integer'], 'addressFormat': 'DDDD',
                    'maxAddress': 9999, 'minAddress': 0, 'description': 'Analog Output Holding Registers'},
                {'name': 'I', 'valueTypes': ['integer'], 'addressFormat': 'DDDD',
                    'maxAddress': 9999, 'minAddress': 0, 'description': 'Analog Input Registers'}
            ]
        }
    }

};
