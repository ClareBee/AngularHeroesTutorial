import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs'
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { HeroesComponent } from './heroes.component';
import { Hero } from '../hero';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let httpClientSpy: { get: jasmine.Spy };
  let heroService: HeroService;
  let messageService: MessageService;

  beforeEach(async(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    messageService = new MessageService();
    heroService = new HeroService(<any>httpClientSpy, messageService);

    TestBed.configureTestingModule({
      imports: [RouterModule, HttpClientTestingModule,

      ],
      declarations: [ HeroesComponent ],
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display heroes', () => {
    const expectedHeroes: Hero[] = [{ name: 'Bob', id: 1123 }]
    httpClientSpy.get.and.returnValue(of(expectedHeroes));
    heroService.getHeroes().subscribe(
      heroes => expect(heroes).toEqual(expectedHeroes, 'expected heroes'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    // const compiled = fixture.debugElement.nativeElement;
    // console.log(compiled)
    // expect(compiled.querySelector('.hero-name').textContent).toContain('Bob');
  })
});
