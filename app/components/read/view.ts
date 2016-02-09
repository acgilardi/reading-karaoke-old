import {Component} from 'angular2/core'
import {BookComponent} from './book'

@Component({
    selector: 'view',
    //directives:  [BookComponent],
    //template: '<div />'
    templateUrl: './components/read/view.html'
})
export class ViewComponent {
    public selectedWord : String = '_';
    constructor() {
        let bookRef = new Firebase("https://yayday.firebaseio.com/");



        bookRef.child("book/a1/selectedWord").on("value", function (snapshot) {
            //alert(snapshot.val());  // Alerts "San Francisco"
            this.selectedWord = snapshot.val();
        })
    }

    //public selectedWord : String = '_';
}
