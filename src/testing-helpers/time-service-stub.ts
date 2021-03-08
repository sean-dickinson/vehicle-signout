import { Observable, of } from "rxjs"

export default {
    getCurrentTime(): Observable<string>{
        return of('2020-01-01T07:00.000Z')
    }
}