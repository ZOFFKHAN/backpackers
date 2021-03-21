import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwPaginationComponent } from './Jw-pagination';



@NgModule({
    imports: [CommonModule],
    declarations: [JwPaginationComponent],
    exports: [JwPaginationComponent  ]
})
export class JwPaginationModule { }