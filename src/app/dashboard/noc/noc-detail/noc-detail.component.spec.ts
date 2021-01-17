import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NocDetailComponent } from './noc-detail.component';

describe('NocDetailComponent', () => {
  let component: NocDetailComponent;
  let fixture: ComponentFixture<NocDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NocDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NocDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
