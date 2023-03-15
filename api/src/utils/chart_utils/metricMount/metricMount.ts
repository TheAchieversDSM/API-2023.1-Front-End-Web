import Metric from "../metric/metric";

export default function metricMount(data: Array<any>){
    var metrics = []
    data.forEach( metric => {
        var newMetric = new Metric();
        newMetric.setName(metric.name)
        newMetric.setData(metric.data)
        metrics.push(newMetric)
      });
      
}