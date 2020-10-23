import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DestModalComponent } from './dest-modal.component';

describe('DestModalComponent', () => {
  let component: DestModalComponent;
  let fixture: ComponentFixture<DestModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
