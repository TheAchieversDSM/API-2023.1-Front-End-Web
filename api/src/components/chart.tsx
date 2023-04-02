import React from "react";
import Highcharts from 'highcharts/highstock';
import HighchartsReact from "highcharts-react-official";
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import HCExporting from "highcharts/modules/exporting";


HCExporting(Highcharts); // adicione o módulo de exportação ao Highcharts


NoDataToDisplay(Highcharts)

export default function Chart(props: any){
    return <HighchartsReact highcharts={Highcharts} options={props.options} />;
}