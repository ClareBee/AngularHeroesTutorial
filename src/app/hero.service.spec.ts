import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of} from 'rxjs';
import { Hero } from './hero';

import { HeroService } from './hero.service';
import { MessageService } from './message.service';
let messageService: MessageService;
let heroService: HeroService;
let httpClientSpy: { get: jasmine.Spy };

describe('HeroService', () => {
  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    messageService = new MessageService();
    heroService = new HeroService(<any>httpClientSpy, messageService);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        { provide: HeroService, useValue: httpClientSpy }
        // { provide: MessageService, useValue: spy }
      ]
    });
  });

  it('should be created', () => {
    expect(heroService).toBeTruthy();
  });

  it('should return expected heroes (HttpClient called once)', () => {
    const expectedHeroes: Hero[] =
      [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];

    httpClientSpy.get.and.returnValue(of(expectedHeroes));

    heroService.getHeroes().subscribe(
      heroes => expect(heroes).toEqual(expectedHeroes, 'expected heroes'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return hero if passed an id', (done) => {
    let hero: Hero;
    hero = { name: 'Bob', id: 123 }
    let mockHero: Observable<Hero>;
    mockHero = of(hero)

    httpClientSpy.get.and.returnValue(mockHero);
    heroService.getHero(123).subscribe((returnedHero) => {
      expect(returnedHero).toEqual(hero, 'expected hero')
      done()
    });

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');

  });
});
