import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SacuvanoPage } from './sacuvano.page';

describe('SacuvanoPage', () => {
  let component: SacuvanoPage;
  let fixture: ComponentFixture<SacuvanoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SacuvanoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SacuvanoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
