import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Observable, of } from 'rxjs'
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';


describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let heroService: HeroService;
  const HERO_OBJECT: Hero = { name: 'Bob', id: 123 }

  class MockHeroService {
    public getHero(): Observable<Hero> {
      return of(HERO_OBJECT);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [ HeroDetailComponent ],
      providers: [
        { provide: Location, useValue: window.location},
        { provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 123,
              }
            }
          }
        },
        { provide: HeroService, useClass: MockHeroService }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    heroService = TestBed.get(HeroService);
    spyOn(heroService, 'getHero').and.returnValue(of(HERO_OBJECT));

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display hero name', async () => {
    expect(component.hero.name).toBe('Bob')
    expect(heroService.getHero).toHaveBeenCalled();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.hero-name').textContent).toContain('BOB Details');
  })
});
