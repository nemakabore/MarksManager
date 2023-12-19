import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditMarkPage } from './edit-mark.page';

describe('EditMarkPage', () => {
  let component: EditMarkPage;
  let fixture: ComponentFixture<EditMarkPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditMarkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
