import * as Moment from "moment";
import { extendMoment } from "moment-range";
import 'moment-range'



export default function timestampCalculator(start_date: Date, end_date: Date){
    const moment = extendMoment(Moment);
    const range = moment.range(start_date, end_date)
    
}