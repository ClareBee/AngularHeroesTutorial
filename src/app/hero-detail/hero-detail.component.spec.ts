import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs'
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from "@angular/router/testing";
import { ReactiveFormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { Hero } from '../hero';


describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let httpClientSpy: { get: jasmine.Spy };
  let heroService: HeroService;
  let messageService: MessageService;

  beforeEach(async(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    messageService = new MessageService();
    heroService = new HeroService(<any>httpClientSpy, messageService);

    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [ HeroDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display hero name', async () => {
    const expectedHero: Hero = { name: 'Bob', id: 1123 }
    httpClientSpy.get.and.returnValue(of(expectedHero));
    heroService.getHero(1123).subscribe(
      hero => expect(hero).toEqual(expectedHero, 'expected hero'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    // const compiled = fixture.debugElement.nativeElement;
    // console.log(compiled)
    // expect(compiled.querySelector('.hero-name').textContent).toContain('BOB Details');
  })
});
