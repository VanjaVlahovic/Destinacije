import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DestinacijePage } from './destinacije.page';

describe('DestinacijePage', () => {
  let component: DestinacijePage;
  let fixture: ComponentFixture<DestinacijePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestinacijePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DestinacijePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
