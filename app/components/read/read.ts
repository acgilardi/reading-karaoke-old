import {Component} from 'angular2/core';
import {BookComponent} from './book';

@Component({
    selector: 'read',
    directives:  [BookComponent],
    //template: '<div />'
    templateUrl: './components/read/read.html'
})
export class ReadComponent {
}
