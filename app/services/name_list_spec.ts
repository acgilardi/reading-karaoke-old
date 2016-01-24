import {NameList} from './name_list';

export function main() {
    describe('NameList Service', () => {
        let nameList;

        beforeEach(function () {
            nameList = new NameList;
        });

        it('should return the list of names', function () {
            let names = nameList.get();
            expect(names).toEqual(jasmine.any(Array));
        });
    });
}
