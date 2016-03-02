import {Component, NgZone, LifecycleEvent} from 'angular2/core'
import {BookComponent} from './book'
import {Observable} from 'rxjs/Observable';
import { observableFirebaseObject, observableFirebaseArray } from '../../vendor/angular2-firebase/observableFirebase';
import {NgWhen} from '../../vendor/angular2-firebase/ngWhen';

declare var Firebase: any;

@Component({
    selector: 'view',
    //directives:  [BookComponent],
    //template: '<div />'
    templateUrl: './components/read/view.html',

})
export class ViewComponent {
    public bookText: string;
    public selectedWord : string;
    public words: Array;
    private bookRef: Observable<any>;
    //private bookRef = new Firebase("https://yayday.firebaseio.com/");
    private zone = this;

    constructor() {
        this.bookText = "(No book selected)";

        //this.bookRef = new Firebase("https://yayday.firebaseio.com/book/a1");
        //console.log(this.bookRef);
        //this.bookText = observableFirebaseObject(new Firebase("https://yayday.firebaseio.com/"));


        //}
        //this.bookRef.child("book/a1/bookText").on("value", function (snapshot) {
        //   //this.zone.run(() => {
        //        this.bookText = snapshot.val();
        //        this.words = this.bookText.split(' ');
        //        console.log('Book Selected: ' + this.bookText);
        //    //});
        //});
        //
        //
        //this.bookRef.child("book/a1/selectedWord").on("value", function (snapshot) {
        //    //this.zone.run(() => {
        //        this.selectedWord = snapshot.val();
        //        console.log(snapshot.val());
        //    //});
        //})
    }

    ngOnInit() {

        this.bookText = observableFirebaseObject(new Firebase("https://yayday.firebaseio.com/book/a1/")
            .child("bookText"));
        console.log(this.bookText)
    }

    //public selectedWord : String = '_';
}
