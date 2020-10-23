import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MojProfilPage } from './moj-profil.page';

describe('MojProfilPage', () => {
  let component: MojProfilPage;
  let fixture: ComponentFixture<MojProfilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MojProfilPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MojProfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
