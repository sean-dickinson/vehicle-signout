import { compareUID, combineDateTime} from './functions';

describe('helper functions', () => {
    describe('compareUID function', () => {
        it('should compare simple entities', () => {
            const o1 = {uid: 'a', name: 'a'};
            const o2 = {uid: 'b', name: 'b'};
            const o3 = {uid: 'b', name: 'c'};
            expect(compareUID(o1, o2)).toBeFalse();
            expect(compareUID(o2, o3)).toBeTrue();
        });
    });

    describe('combineDateTime function', () => {
        it('should correctly combine a date and a time', () => {
            const date = new Date(2020, 1, 2);
            const time = '13:30';
            const combined = combineDateTime(date, time);

            const sameDate = new Date(2020, 1, 2, 13, 30, 0, 0);

            expect(combined.toISOString()).toEqual(sameDate.toISOString());

        })
    });
})
