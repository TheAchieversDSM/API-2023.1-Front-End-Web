import Metric from "../metric/metric";

export default function metricMount(data: Array<any>){
    var metrics: Metric[] = []
    data.forEach( metric => {
        var newMetric = new Metric("",[], metric.medida);
        newMetric.setName(metric.name)
        newMetric.setData(metric.data)
        metrics.push(newMetric)
      });
    return metrics;
}