import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SavedElementComponent } from './saved-element.component';

describe('SavedElementComponent', () => {
  let component: SavedElementComponent;
  let fixture: ComponentFixture<SavedElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedElementComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SavedElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
