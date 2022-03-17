import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatCardModule, MatTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { ModemConfigPanelComponent } from './modem-config-panel.component';


describe('ModemConfigPanelComponent', () => {
  let component: ModemConfigPanelComponent;
  let fixture: ComponentFixture<ModemConfigPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatCardModule,
        CdkTableModule,
        MatTableModule,
      ],
      declarations: [ ModemConfigPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModemConfigPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
