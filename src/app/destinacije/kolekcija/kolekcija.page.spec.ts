import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KolekcijaPage } from './kolekcija.page';

describe('KolekcijaPage', () => {
  let component: KolekcijaPage;
  let fixture: ComponentFixture<KolekcijaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KolekcijaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KolekcijaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
