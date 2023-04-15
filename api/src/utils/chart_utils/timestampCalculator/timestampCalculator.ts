import * as Moment from "moment";
import { extendMoment } from "moment-range";
import 'moment-range'



export default function timestampCalculator(start_date: Date, end_date: Date) {
    const moment = extendMoment(Moment);
    const range = moment.range(moment(start_date), moment(end_date))
    console.log(range)
    const datas = Array.from(range.by('day'));
    console.log(datas)
    const timestamps = []

    for (let i = 0; i < datas.length; i++) {
        const date = datas[i];

        const timestamp = moment(date).valueOf();

        timestamps.push(timestamp)
    }

    return timestamps

}