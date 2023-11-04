import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import useFetchWeekOrder from "../../hooks/orders/useFetchWeekOrder";
import useFetchByCategory from "../../hooks/orders/useFetchByCategory";
import { IDataOrdersByCategoryResponse, IDataWeeklyOrdersResponse, LineChartData } from "../../types/types";

function DashboardCharts() {
    const { data: dataWeeklyOrder } = useFetchWeekOrder();
    const { data: dataOrderByCategory } = useFetchByCategory();
    //Line Chart
    const [dataLineChart, setDataLineChart] = useState<LineChartData>({
        series: [{
            name: "Price",
            data: []
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: 'Order Trends by Week',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: [],
            }
        }
    });
    //Pie Chart
    const [dataPieChart, setDataPieChart] = useState({
        series: [],
        options: {
            labels: ['Apple', 'Mango', 'Orange'],
            chart: {
                type: 'donut',
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
        },
    })


    const handleUpdateLineChart = (data: IDataWeeklyOrdersResponse) => {
        const categories = Object.keys(data.weeklyIncome);
        const seriesData = Object.values(data.weeklyIncome);

        setDataLineChart({
            series: [{
                data: seriesData,
            }],
            options: {
                xaxis: {
                    categories,
                },
            },
        });
    };

    const handleUpdatePieChart = (data: IDataOrdersByCategoryResponse) => {
        const labels = Object.keys(data?.orderByCategory);
        const seriesData = Object.values(data?.orderByCategory);

        setDataPieChart({
            series: seriesData,
            options: {
                labels: labels
            }
        });
    };

    useEffect(() => {
        if (dataWeeklyOrder && dataOrderByCategory) {
            handleUpdateLineChart(dataWeeklyOrder);
            handleUpdatePieChart(dataOrderByCategory)
        }
    }, [dataWeeklyOrder, dataOrderByCategory]);

    return (
        <div className="line-chart flex gap-10 my-8 ml-2">
            <ReactApexChart
                options={dataLineChart.options}
                series={dataLineChart.series}
                type="line"
                width="550"
            />

            <div>
                <h1 className="font-bold mb-4">Total Orders By Category</h1>
                <ReactApexChart
                    options={dataPieChart.options}
                    series={dataPieChart.series}
                    type="donut"
                    width="400" />
            </div>

        </div>
    )
}

export default DashboardCharts