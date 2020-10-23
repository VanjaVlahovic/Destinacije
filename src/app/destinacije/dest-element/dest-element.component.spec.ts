import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DestElementComponent } from './dest-element.component';

describe('DestElementComponent', () => {
  let component: DestElementComponent;
  let fixture: ComponentFixture<DestElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestElementComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DestElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
