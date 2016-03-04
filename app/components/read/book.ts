import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
//import { observableFirebaseObject, observableFirebaseArray } from '../../vendor/angular2-firebase/observableFirebase
// .ts';
//import {NgWhen} from '../../vendor/angular2-firebase/ngWhen.ts';

//import * as Firebase from 'firebase';

//import { FIREBASE_ROOT } from '../../../config';
//const FIREBASE_ORDER_GROUPS = `${FIREBASE_ROOT}/order-groups`;
//const FIREBASE_ORDERS = `${FIREBASE_ROOT}/orders`;
//const FIREBASE_ROOT = 'https://yayday.firebaseio.com/book/a1';

declare var Firebase: any;

@Component({
    selector: 'book',
    //template: ''
    templateUrl: './components/read/book.html'
})
export class BookComponent {
    public bookText: string;
    public selectedWordId: string;
    private bookRef: Observable<any>;

    //private bookRef:FireBase;// = new Firebase("https://yayday.firebaseio.com/book/a1");
    //private bookRef = new Firebase(FIREBASE_ROOT);
    //this.orderGroupsRef = new Firebase(FIREBASE_ORDER_GROUPS);
    //this.ordersRef = new Firebase(FIREBASE_ORDERS);
    private words: Array<String>;

    constructor() {
        this.bookText = 'This is the book text';
        this.words = this.bookText.split(' ');
        this.bookRef = new Firebase('https://yayday.firebaseio.com/book/a1');
        //this.bookRef.set({
        //    bookText: this.bookText
        //});
    };

    clickWord(e):void {
        this.selectedWordId = e.target.id;
        //this.bookRef.update({
        //    selectedWordId: this.selectedWordId,
        //    selectedWord: e.target.innerText.trim()
        //});

        console.log('word clicked');
        console.log(e.target);
    }

}


