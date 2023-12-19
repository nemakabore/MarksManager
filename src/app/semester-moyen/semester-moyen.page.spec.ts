import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SemesterMoyenPage } from './semester-moyen.page';

describe('SemesterMoyenPage', () => {
  let component: SemesterMoyenPage;
  let fixture: ComponentFixture<SemesterMoyenPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SemesterMoyenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
