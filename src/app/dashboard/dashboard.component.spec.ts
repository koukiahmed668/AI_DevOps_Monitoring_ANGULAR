import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

// Mock Services
class MockCompanyService {
  getCompanyById() {
    return of({ id: '1', name: 'Company A' });
  }
}

class MockJobService {
  getJobsByCompanyId() {
    return of([{ id: '1', title: 'Job A' }, { id: '2', title: 'Job B' }]);
  }
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [HttpClientTestingModule],
      providers: [
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 

  
  
  // Add any other necessary tests, such as mocking chart creation if needed
});
