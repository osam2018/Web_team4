<template>
    <el-main>
        <p class="server-name">{{$route.params.id}}</p>
        <div class="chart">
            <div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="grid-content bg-purple"><br>
                            <h1>Cpu(%)</h1>
                            <canvas id="CPU" height="200"></canvas>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple"><br>
                            <h1>Memory(%)</h1>
                            <canvas id="MEM" height="200"></canvas>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="grid-content bg-purple"><br>
                            <h1>Network IO(B/s)</h1>
                            <canvas id="NET" height="200"></canvas>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple"><br>
                            <h1>Disk IO(Total)</h1>
                            <canvas id="DISK" height="200"></canvas>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="process"><br>
            <h1>Process</h1><br>
            <el-tabs type="border-card">
                <el-tab-pane label="Server1">
                    <div class="proc-div">
                        <el-table
                                :data="processData"
                                style="width: 100%">
                            <el-table-column
                                    prop="Pid"
                                    label="Pid">
                            </el-table-column>
                            <el-table-column
                                    prop="Name"
                                    label="Name">
                            </el-table-column>
                            <el-table-column
                                    prop="Cpu"
                                    label="Cpu">
                            </el-table-column>
                            <el-table-column
                                    prop="Mem"
                                    label="Mem">
                            </el-table-column>
                            <el-table-column
                                    prop="Date"
                                    label="Date">
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </el-main>

</template>

<script lang="ts">

    //색상
    var server1_color_back = 'rgba(89, 165, 222, 0.5)';
    var server1_color_border = 'rgba(89, 165, 222, 1)';
    var server2_color_back = 'rgba(255, 205, 65, 0.5)';
    var server2_color_border = 'rgba(255, 205, 80, 1)';
    var server3_color_back = 'rgba(96, 92, 168, 0.5)';
    var server3_color_border = 'rgba(96, 92, 168, 1)';
    var server4_color_back = 'rgba(0, 166, 90, 0.5)';
    var server4_color_border = 'rgba(0, 166, 90, 1)';
    var warning = 'rgba(255, 224, 230, 0.5)';
    var warning = 'rgba(255, 106, 137, 1)';

    import {Component, Prop, Vue} from 'vue-property-decorator';
    import Chart from 'chart.js';

    @Component({})
    export default class SidePage2 extends Vue {

        public processData:any[] = [];

        public interval1: any;
        public interval2: any;
        public interval3: any;
        public interval4: any;

        public destroyed() {
            clearInterval(this.interval1);
            clearInterval(this.interval2);
            clearInterval(this.interval3);
            clearInterval(this.interval4);
        }
        // private list:string[]=[];
        private list:any[]=[];

        public updated(){
            clearInterval(this.interval1);
            clearInterval(this.interval2);
            clearInterval(this.interval3);
            clearInterval(this.interval4);

            opt_cpu.data.datasets[0].data=[];
            opt_cpu.data.labels=[];
            opt_mem.data.datasets[0].data=[];
            opt_mem.data.labels=[];
            opt_disk.data.datasets[0].data=[];
            opt_disk.data.labels=[];
            opt_net.data.datasets[0].data=[];
            opt_net.data.datasets[1].data=[];
            opt_net.data.labels=[];

            let that = this;
            $(function () {
                var ctx_CPU = (document.getElementById("CPU") as HTMLCanvasElement).getContext('2d');
                var ctx_MEM = (document.getElementById("MEM") as HTMLCanvasElement).getContext('2d');
                var ctx_NET = (document.getElementById("NET") as HTMLCanvasElement).getContext('2d');
                var ctx_DISK = (document.getElementById("DISK") as HTMLCanvasElement).getContext('2d');

                var CPU = new Chart(ctx_CPU, opt_cpu);
                var MEM = new Chart(ctx_MEM, opt_mem);
                var NET = new Chart(ctx_NET, opt_net);
                var DISK = new Chart(ctx_DISK, opt_disk);

                that.interval1 = setInterval(cpudatapush, 1000, CPU);
                that.interval2 = setInterval(memdatapush, 1000, MEM);
                that.interval3 = setInterval(netdatapush, 1000, NET);
                that.interval4 = setInterval(diskdatapush, 1000, DISK);

                //서버통신
                //cpu
                function cpudatapush(chart) {
                    getCpuData(function (data) {
                            if (chart.data.datasets[0].data.length == 8) {
                                chart.data.datasets[0].data.splice(0, 1);
                                chart.data.labels.splice(0, 1);
                            }
                            chart.data.datasets[0].data.push(data);
                            chart.data.labels.push(getTime());
                            chart.update();
                        }
                    );
                }

                //mem
                function memdatapush(chart) {
                    getMemData(function (data) {
                        if (chart.data.datasets[0].data.length == 8) {
                            chart.data.datasets[0].data.splice(0, 1);
                            chart.data.labels.splice(0, 1);
                        }
                        chart.data.datasets[0].data.push(data);
                        chart.data.labels.push(getTime());
                        chart.update();
                    });
                }

                //disk
                function diskdatapush(chart) {
                    getDiskData(function (data) {
                        chart.data.labels.push(getTime());
                        for (var i = 0; i < 4; i++) {
                            if (chart.data.datasets[i].data.length == 8) {
                                chart.data.datasets[i].data.splice(0, 1);
                                if (i == 0) {
                                    chart.data.labels.splice(0, 1);
                                }//라벨 1번만 삭제하기위해
                            }
                            //chart.data.datasets[i].data.push(Math.floor(Math.random()*80+1));
                            if (i == 0) {
                                chart.data.datasets[i].data.push(parseInt(data.serv1_diskT));
                            }
                            else if (i == 1) {
                                chart.data.datasets[i].data.push(parseInt(data.serv2_diskT));
                            }
                            else if (i == 2) {
                                chart.data.datasets[i].data.push(parseInt(data.serv3_diskT));
                            }
                            else {
                                chart.data.datasets[i].data.push(parseInt(data.serv4_diskT));
                            }
                            chart.update();
                        }
                    });
                }

                //net
                function netdatapush(chart) {
                    getNetData(function (data) {
                        chart.data.labels.push(getTime());
                        for (var i = 0; i < 2; i++) {
                            if (chart.data.datasets[i].data.length == 8) {
                                chart.data.datasets[i].data.splice(0, 1);
                                if (i == 0) {
                                    chart.data.labels.splice(0, 1);
                                }//라벨 1번만 삭제하기위해
                            }
                            //chart.data.datasets[i].data.push(Math.floor(Math.random()*80+1));
                            if (i == 0) {
                                chart.data.datasets[i].data.push(parseInt(data.serv1_netR));
                            }
                            else if (i == 1) {
                                chart.data.datasets[i].data.push(parseInt(data.serv1_netT));
                            }
                            chart.update();
                        }
                    });
                }

                //AJAX

                function getCpuData(callback) {
                    $.ajax({
                        url: "http://127.0.0.1:3000/cpu",
                        type: "get",
                        success: function (json) {
                            callback(json.cpu);
                        },
                        error: function (xhr, status, error) {
                            console.log(xhr);
                        }
                    });
                }

                function getMemData(callback) {
                    $.ajax({
                        url: "http://127.0.0.1:3000/mem",
                        type: "get",
                        success: function (json) {
                            callback(json.mem);
                        },
                        error: function (xhr, status, error) {
                            console.log(xhr);
                        }
                    });
                }

                function getDiskData(callback) {
                    $.ajax({
                        url: "http://127.0.0.1:3000/disk",
                        type: "get",
                        success: function (json) {
                            callback(json);
                        },
                        error: function (xhr, status, error) {
                            console.log(xhr);
                        }
                    });
                }

                function getNetData(callback) {
                    $.ajax({
                        url: "http://127.0.0.1:3000/net",
                        type: "get",
                        success: function (json) {
                            callback(json);
                        },
                        error: function (xhr, status, error) {
                            console.log(xhr);
                        }
                    });
                }
            })
        }

        async mounted() {

            let that = this;
            $(function () {
                var ctx_CPU = (document.getElementById("CPU") as HTMLCanvasElement).getContext('2d');
                var ctx_MEM = (document.getElementById("MEM") as HTMLCanvasElement).getContext('2d');
                var ctx_NET = (document.getElementById("NET") as HTMLCanvasElement).getContext('2d');
                var ctx_DISK = (document.getElementById("DISK") as HTMLCanvasElement).getContext('2d');

                var CPU = new Chart(ctx_CPU, opt_cpu);
                var MEM = new Chart(ctx_MEM, opt_mem);
                var NET = new Chart(ctx_NET, opt_net);
                var DISK = new Chart(ctx_DISK, opt_disk);

                that.interval1 = setInterval(cpudatapush, 1000, CPU);
                that.interval2 = setInterval(memdatapush, 1000, MEM);
                that.interval3 = setInterval(netdatapush, 1000, NET);
                that.interval4 = setInterval(diskdatapush, 1000, DISK);

                //서버통신
                //cpu
                function cpudatapush(chart) {
                    getCpuData(function (data) {
                            if (chart.data.datasets[0].data.length == 8) {
                                chart.data.datasets[0].data.splice(0, 1);
                                chart.data.labels.splice(0, 1);
                            }
                            chart.data.datasets[0].data.push(data);
                            chart.data.labels.push(getTime());
                            chart.update();
                        }
                    );
                }

                //mem
                function memdatapush(chart) {
                    getMemData(function (data) {
                        if (chart.data.datasets[0].data.length == 8) {
                            chart.data.datasets[0].data.splice(0, 1);
                            chart.data.labels.splice(0, 1);
                        }
                        chart.data.datasets[0].data.push(data);
                        chart.data.labels.push(getTime());
                        chart.update();
                    });
                }

                //disk
                function diskdatapush(chart) {
                    getDiskData(function (data) {
                        chart.data.labels.push(getTime());
                        for (var i = 0; i < 4; i++) {
                            if (chart.data.datasets[i].data.length == 8) {
                                chart.data.datasets[i].data.splice(0, 1);
                                if (i == 0) {
                                    chart.data.labels.splice(0, 1);
                                }//라벨 1번만 삭제하기위해
                            }
                            //chart.data.datasets[i].data.push(Math.floor(Math.random()*80+1));
                            if (i == 0) {
                                chart.data.datasets[i].data.push(parseInt(data.serv1_diskT));
                            }
                            else if (i == 1) {
                                chart.data.datasets[i].data.push(parseInt(data.serv2_diskT));
                            }
                            else if (i == 2) {
                                chart.data.datasets[i].data.push(parseInt(data.serv3_diskT));
                            }
                            else {
                                chart.data.datasets[i].data.push(parseInt(data.serv4_diskT));
                            }
                            chart.update();
                        }
                    });
                }

                //net
                function netdatapush(chart) {
                    getNetData(function (data) {
                        chart.data.labels.push(getTime());
                        for (var i = 0; i < 2; i++) {
                            if (chart.data.datasets[i].data.length == 8) {
                                chart.data.datasets[i].data.splice(0, 1);
                                if (i == 0) {
                                    chart.data.labels.splice(0, 1);
                                }//라벨 1번만 삭제하기위해
                            }
                            //chart.data.datasets[i].data.push(Math.floor(Math.random()*80+1));
                            if (i == 0) {
                                chart.data.datasets[i].data.push(parseInt(data.serv1_netR));
                            }
                            else if (i == 1) {
                                chart.data.datasets[i].data.push(parseInt(data.serv1_netT));
                            }
                            chart.update();
                        }
                    });
                }

                //AJAX

                function getCpuData(callback) {
                    $.ajax({
                        url: "http://127.0.0.1:3000/cpu",
                        type: "get",
                        success: function (json) {
                            callback(json.cpu);
                        },
                        error: function (xhr, status, error) {
                            console.log(xhr);
                        }
                    });
                }

                function getMemData(callback) {
                    $.ajax({
                        url: "http://127.0.0.1:3000/mem",
                        type: "get",
                        success: function (json) {
                            callback(json.mem);
                        },
                        error: function (xhr, status, error) {
                            console.log(xhr);
                        }
                    });
                }

                function getDiskData(callback) {
                    $.ajax({
                        url: "http://127.0.0.1:3000/disk",
                        type: "get",
                        success: function (json) {
                            callback(json);
                        },
                        error: function (xhr, status, error) {
                            console.log(xhr);
                        }
                    });
                }

                function getNetData(callback) {
                    $.ajax({
                        url: "http://127.0.0.1:3000/net",
                        type: "get",
                        success: function (json) {
                            callback(json);
                        },
                        error: function (xhr, status, error) {
                            console.log(xhr);
                        }
                    });
                }
            })
        }
    }

    function getTime() {
        var date = new Date();
        return getDataFormat(date);
    }

    function getDataFormat(date) {
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute >= 10 ? minute : '0' + minute;
        second = second >= 10 ? second : '0' + second;
        return minute + ":" + second;
    }


    //OPTION
    //canvas옵션
    var opt_cpu = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Server1-CPU',
                data: [],
                backgroundColor: [
                    server1_color_back
                ],
                borderColor: [
                    server1_color_border
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 100,
                        stepSize: 20,
                        beginAtZero: true
                    }
                }]
            },
            legend: {
                labels: {
                    defaultFontFamily: 'Arial'
                }
            },
        }
    };
    var opt_mem = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Server1-MEM',
                data: [],
                backgroundColor: [
                    server2_color_back
                ],
                borderColor: [
                    server2_color_border
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 100,
                        stepSize: 20,
                        beginAtZero: true
                    }
                }]
            },
            legend: {
                labels: {
                    defaultFontFamily: 'Arial'
                }
            },
        }
    };

    var opt_disk = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Sever1-Total Disk Usage',
                data: [],
                backgroundColor: ['rgba(0, 0, 0, 0)'],
                borderColor: [server3_color_back],
                borderWidth: 2
            }
            ],

        },
        options: {
            responsive: true,
            legend: {
                labels: {
                    defaultFontFamily: 'Arial'
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        min: 2078000,
                        max: 2083000,
                    }
                }]
            }
        }
    };
    var opt_net = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Sever1-Network Read',
                data: [],
                backgroundColor: ['rgba(0, 0, 0, 0)'],
                borderColor: [server1_color_back],
                borderWidth: 2
            },
                {
                    label: 'Sever1-Network Write',
                    data: [],
                    backgroundColor: ['rgba(0, 0, 0, 0)'],
                    borderColor: [server2_color_back],
                    borderWidth: 2
                }
            ],
        },
        options: {
            responsive: true,
            legend: {
                labels: {
                    defaultFontFamily: 'Arial'
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        max: 1200,
                        beginAtZero: true
                    }
                }]
            }

        }
    };


</script>

<style scoped>
    .el-main {
        min-width: 1500px;
        margin: 0;
        background-color: #ECF0F5;
    }

    .chart {
        float: left;
        width: 70%;
    }

    .process {
        padding: 3px;
        border-radius: 4px;
        background: white;
        margin-left: 1%;
        float: left;
        width: 28%;
        height: 95%;
        max-height: 800px;
    }

    .el-row {
        margin-bottom: 20px;
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
    }

    .bg-purple {
        background: white;
    }

    .bg-purple-light {
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        margin-bottom: 20px;
    }

    .cpu-purple {
        background: white;
    }
    .cpu-grid {
        border-radius: 4px;
        min-height: 36px;
        margin-bottom: 20px;
    }

    .row-bg {
        padding: 10px 0;
    }

    .about {

        line-height: 30px;
    }

    .proc-div{
        overflow-y: auto;
        margin-bottom: 50px;
        width: 100%;
        height: 100%;
        max-height: 600px;
    }
</style>