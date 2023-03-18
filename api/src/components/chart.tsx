import React from "react";
import Highcharts from 'highcharts/highstock';
import HighchartsReact from "highcharts-react-official";

export default function Chart(props: any){
    return <HighchartsReact highcharts={Highcharts} options={props.options} />;
}