import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Subject, takeUntil, timer} from "rxjs";
import {Router} from "@angular/router";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})


export class MainComponent implements OnInit, AfterViewInit {

  private modalRef!: NgbModalRef;
  private destroy$ = new Subject<void>()

  constructor(private router: Router,private modalService: NgbModal) { }

  @ViewChild('popup')
  popup!: TemplateRef<ElementRef>;

  ngOnInit(): void {}

  ngAfterViewInit() {
    const timer$ = timer(10000);
    timer$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.router.url === '/') {
        this.openModal();
      }
    });
  }

  openModal():void {
    this.modalRef = this.modalService.open(this.popup, {});
  }

  navigateToCatalog():void {
    if (this.modalRef) {
      this.modalRef.close();
      this.router.navigate(['/catalog']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
