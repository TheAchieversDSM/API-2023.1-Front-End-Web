import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import HCExporting from "highcharts/modules/exporting";
import HC_more from 'highcharts/highcharts-more';

HCExporting(Highcharts); 
NoDataToDisplay(Highcharts)
HC_more(Highcharts);

export default function Chart(props: any){
    return <HighchartsReact highcharts={Highcharts} options={props.options} />;
}