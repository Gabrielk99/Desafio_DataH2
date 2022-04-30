import React, { useEffect, useState, useRef } from "react";
import "./Graph.css"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    BarElement,
    Legend,
  } from 'chart.js';
import { Chart,Bubble } from 'react-chartjs-2';
import ApexChart from 'react-apexcharts';

function Graph(props){
    const [data,setData] = useState({labels:[],datasets:[]});
    const chartRef = useRef(null);

    useEffect(()=>{
        if(props.datas!=null){
            setData(props.datas)
        }
    
    },[props.datas])
    
    
    ChartJS.register(
        LinearScale,
        CategoryScale,
        BarElement,
        PointElement,
        LineElement,
        Legend,
        Tooltip,
        Title
    );


    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: props.title,
                font:{
                    size:25
                }
            },
        },
        scales:{
            y:{
                title:{
                    display:true,
                    text:props.ylabel,
                    font:{
                        size:15
                    }
                }
            },
            x:{
                title:{
                    display:true,
                    text:props.xlabel,
                    font:{
                        size:15
                    }
                }
            }
            
        }
    };

    return  (
        <>
            {
            props.apexchart?<ApexChart options={props.options} series={props.series} type={props.type} />
            :<Chart ref={chartRef} options={options} type='bar' data={data} className="graph-ctn" />
            }
        </>
        )
    
}


export default Graph