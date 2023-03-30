import React from "react";
import Highcharts from 'highcharts/highstock';
import HighchartsReact from "highcharts-react-official";
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';


NoDataToDisplay(Highcharts)

export default function Chart(props: any){
    return <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={props.options} />;
}