import { DemoOpcuaModule } from './kosmyna-opcua.module';

describe('DemoOpcuaModule', () => {
  let kosmynaOpcuaModule: DemoOpcuaModule;

  beforeEach(() => {
    kosmynaOpcuaModule = new DemoOpcuaModule();
  });

  it('should create an instance', () => {
    expect(kosmynaOpcuaModule).toBeTruthy();
  });
});
