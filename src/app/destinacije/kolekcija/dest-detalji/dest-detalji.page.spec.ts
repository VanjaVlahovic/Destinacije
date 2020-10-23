import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DestDetaljiPage } from './dest-detalji.page';

describe('DestDetaljiPage', () => {
  let component: DestDetaljiPage;
  let fixture: ComponentFixture<DestDetaljiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestDetaljiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DestDetaljiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
