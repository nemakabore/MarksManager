import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SplashSreenPage } from './splash-sreen.page';

describe('SplashSreenPage', () => {
  let component: SplashSreenPage;
  let fixture: ComponentFixture<SplashSreenPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SplashSreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
