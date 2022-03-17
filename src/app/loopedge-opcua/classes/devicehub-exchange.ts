import { cosmynaService } from '@app/cosmyna/services';
import { Device } from '@app/cosmyna/models';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { cosmynaImportService } from '../services';

export class cosmynaExchange {
  constructor(protected _cosmynaImportService: cosmynaImportService) {}

  get devices() {
    return this._cosmynaImportService.getDevices();
  }

  get tags() {
    return this._cosmynaImportService.getRegisters();
  }

  get cosmynaNodes() {
    return forkJoin([this.devices, this.tags]).pipe(
      map(data => {
        const devices = data[0];
        const tags = data[1];
        return [
          {
            name: 'Demo',
            type: 'FOLDER',
            children: devices.map(device => ({
              name: device.name,
              type: 'DEVICE',
              children: tags
                .filter(tag => tag.deviceId === device.id)
                .map(tag => ({
                  type: 'TAG',
                  name: tag.tagName,
                  data: {
                    dataType: this.mapValueType(tag.valueType),
                    topic: `cosmyna.raw.${tag.deviceId}.${tag.id}`,
                  },
                })),
            })),
          },
        ];
      })
    );
  }

  mapValueType(type: string): string {
    const types = {
      bit: 'bool',
      bool: 'bool',
      'int(bit)': 'bool',
      int: 'int16',
      float: 'float',
      dint: 'int32',
      lint: 'int32',
      real: 'float',
      sint: 'int16',
      word: 'int32',
      dword: 'int32',
      byte: 'int16',
      lword: 'int32',
      udint: 'unint32',
      char: 'string',
      short: 'int16',
      long: 'double',
      double: 'double',
      string: 'string',
      counter: 'uint16',
      timer: 'uint16',
      lreal: 'double',
    };

    return types[type.toLowerCase()] || type.toLowerCase();
  }
}
