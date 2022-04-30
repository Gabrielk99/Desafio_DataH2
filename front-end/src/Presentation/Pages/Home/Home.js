import React from "react"
import InputData from "../../Components/InputData/InputData"
import "./Home.css"
import textos from './texts.json'
import {useEffect,useState} from 'react'
import Graph from "../../Components/Graph/Graph"
let randomColor = require('randomcolor')


function Home (props){

    const [height,setHeight] = useState(0)
    const [datas,setDatas] = useState(null)
    const [varExpData,setVarExpData] = useState(null)
    const [heatmap,setHeatmap] = useState(null)
    const [scatterPlot,setScatterPlot] = useState(null)
    const [distPlot,setDistPlot] = useState(null)


    useEffect(()=>{
        const container = document.getElementById("ctn-home");
        if(container){
            setHeight(container.getBoundingClientRect().height)
        }
        window.addEventListener('resize',()=>{
            const container = document.getElementById("ctn-home");
            setHeight(container.getBoundingClientRect().height)
        })
    },[document.getElementById('ctn-home')])

    useEffect(()=>{
        document.getElementById("img-left").style.width=`${height}px`;
        document.getElementById("img-right").style.width=`${height}px`;
        document.getElementById("img-left").style.left=`-${height>1500?height*0.35:height*0.25}px`;
        document.getElementById("img-right").style.right=`-${height>1500?height*0.35:height*0.25}px`;

    },[height])

    useEffect(()=>{
        window.dispatchEvent(new Event('resize'))
    },[distPlot,scatterPlot,heatmap,varExpData])

    useEffect(()=>{
        if(datas!=null){
            const setup = {
                labels : [...Array(datas.cum_var_exp.length).keys()],
                datasets:[
                    {
                        type:'bar',
                        label:'Simple Explained Variance',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderWidth:2,
                        data:datas.var_exp
                    },
                    {
                        type:'line',
                        borderColor: 'rgb(75, 192, 192)',
                        label:'Cumulative Explained Variance',
                        fill:false,
                        borderWidth:2,
                        data:datas.cum_var_exp
                    }
                ]
            }
            setVarExpData(setup)
            const setupScatter = {
                labels : datas.new_input.x,
                datasets:[
                    {
                        type:'scatter',
                        label:'two components data',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderWidth:2,
                        data:datas.new_input.y
                    },
                ]
            }
            
            setScatterPlot(setupScatter)

            let columns_distribution = []
            for(let column in datas.distribution){

                let data = []
                let labels = []

                datas.distribution[column].forEach((value_count)=>{
                        data = [...data,value_count.count]
                        labels= [...labels,value_count.value]
                })

                const distSetup = {
                    labels,
                    datasets:[{
                        type:'line',
                        label:`distribution`,
                        data:data,
                        fill:false,
                        pointRadius:0,
                        borderColor:randomColor({luminosity:"bright",alpha:1,format:"rgba"})   
                    }]
                }

                columns_distribution = [...columns_distribution,{column:column,data:distSetup}]
            }
            
            setDistPlot(columns_distribution)

            const heatmapValues = []
            for(let i =0 ; i<datas.props.length;i++){
                heatmapValues.push({
                    name:datas.props[i],
                    data:datas.corr[i]
                })
            }
            

            const heatmapOptions ={
               series: heatmapValues.reverse(),
               options:{
                   chart:{
                       type:'heatmap',
                   },
                   stroke:{
                       width:0
                   },
                   colors:["#128FD9"],
                   plotOptions: {
                    heatmap: {
                      radius: 3,
                      colorScale: {
                        min:-1,
                        max:1
                      },
                  
                    }
                  },
                  dataLabels: {
                    enabled: true,
                    style: {
                      colors: ['#fff']
                    }
                  },
                  xaxis: {
                    type: 'category',
                    categories:datas.props,
                    min:0,
                    max:heatmapValues.length-1,
                    tickAmount:heatmapValues.length-1
                  },
                  dataLabels:{
                      enabled:false,
                      style:{
                          fontSize:"8px"
                      }
                  },
                  title: {
                    text: 'Correlation Matrix',
                    align:'center',
                    style:{
                        fontSize:"30px"
                    }
                  },
                },
            }
            
            setHeatmap(heatmapOptions)
        }
        
    },[datas])

    const updateDatas = (datasToUpdate)=>{
        setDatas(datasToUpdate)
    }

    return (
        <div className={"ctn-home"} id="ctn-home">
            <img className="img-home" src={"wave.svg"} id="img-left" />
            <img className="img-home right" src={"wave.svg"} id="img-right"/>

            <div className="title-home">
                WellCome  <span>Stranger</span>
            </div>
          
            <div className="desc-box-home">
                {textos.desc}
                <br></br>
                <span>
                    {textos.alert}
                </span>
            </div>

            <InputData updateDatas={updateDatas}/>

            <div className="col-graphs">
                {
                    distPlot!=null?
                    <div className="dist-graphs">
                        {
                            distPlot.map((columnDist)=>{
                                return <Graph datas={columnDist.data} title={`${columnDist.column} distribution graph`} xlabel={"values"} ylabel={"occurrence"}/>
                            })
                        }
                    </div>
                    :<></>
                }
                {
                    varExpData?
                        <Graph datas={varExpData} title={"Explained Variance Analysis"} xlabel={"components number"} ylabel={"explained variance percent"}/>
                    :<></>
                }
                {
                    heatmap?<Graph apexchart={true} options={heatmap.options} series={heatmap.series} width={500} type={"heatmap"}/>
                    :<></>
                }
                {
                    scatterPlot?
                        <Graph datas={scatterPlot} title={"Two Components Choice PCA Data"} xlabel={""} ylabel={""}/>
                    :<></>
                }
            </div>

        </div>
    )
}

export default Home