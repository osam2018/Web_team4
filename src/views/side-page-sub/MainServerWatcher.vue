<template>
    <el-main >
        <p class="server-name">MainServerWatcher</p>
        <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple"><canvas id="CPU1"  height="200"></canvas></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"><canvas id="CPU2"  height="200"></canvas></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"><canvas id="CPU3"  height="200"></canvas></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"><canvas id="CPU4"  height="200"></canvas></div></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple"><canvas id="MEM1"  height="200"></canvas></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"><canvas id="MEM2"  height="200"></canvas></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"><canvas id="MEM3"  height="200"></canvas></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"><canvas id="MEM4"  height="200"></canvas></div></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8"><div class="grid-content bg-purple"><h1>Network IO</h1><canvas id="NET"  height="200"></canvas></div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple"><h1>Disk IO</h1><canvas id="DISK"  height="200"></canvas></div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple">
                <h1>Process</h1>
                <el-tabs type="border-card">
                    <el-tab-pane label="Server1">
                        <div class="proc-div" >
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
                    <el-tab-pane label="Server2">
                        <div class="proc-div" >
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
                    <el-tab-pane label="Server3">
                        <div class="proc-div" >
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
                    <el-tab-pane label="Server4">
                        <div class="proc-div" >
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
            </div></el-col>
        </el-row>
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


    import { Component, Prop, Vue } from 'vue-property-decorator';
    import Chart from 'chart.js';
    import {EventBus} from "../../model/event-bus";

    @Component({
    })

    export default class SidePage1 extends Vue {

        // @Prop()
        public processData:any[]=[];



        public  interval1:any;
        public  interval2:any;
        public  interval3:any;
        public  interval4:any;
        public  interval5:any;
        public  interval6:any;
        public  interval7:any;
        public  interval8:any;
        public  interval9:any;
        public  interval10:any;

        public destroyed(){
            clearInterval(this.interval1);
            clearInterval(this.interval2);
            clearInterval(this.interval3);
            clearInterval(this.interval4);
            clearInterval(this.interval5);
            clearInterval(this.interval6);
            clearInterval(this.interval7);
            clearInterval(this.interval8);
            clearInterval(this.interval9);
            clearInterval(this.interval10);
        }

        async mounted(){

            let that = this;


            $(function() {
                var intervalID;

                var ctx_CPU1 = (document.getElementById("CPU1") as HTMLCanvasElement).getContext('2d');
                var ctx_CPU2 = (document.getElementById("CPU2") as HTMLCanvasElement).getContext('2d');
                var ctx_CPU3 = (document.getElementById("CPU3") as HTMLCanvasElement).getContext('2d');
                var ctx_CPU4 = (document.getElementById("CPU4") as HTMLCanvasElement).getContext('2d');

                var ctx_MEM1 = (document.getElementById("MEM1") as HTMLCanvasElement).getContext('2d');
                var ctx_MEM2 = (document.getElementById("MEM2") as HTMLCanvasElement).getContext('2d');
                var ctx_MEM3 = (document.getElementById("MEM3") as HTMLCanvasElement).getContext('2d');
                var ctx_MEM4 = (document.getElementById("MEM4") as HTMLCanvasElement).getContext('2d');

                var ctx_NET = (document.getElementById("NET") as HTMLCanvasElement).getContext('2d');
                var ctx_DISK = (document.getElementById("DISK") as HTMLCanvasElement).getContext('2d');


                var CPU1 = new Chart(ctx_CPU1, opt_cpu1);
                var CPU2 = new Chart(ctx_CPU2, opt_cpu2);
                var CPU3 = new Chart(ctx_CPU3, opt_cpu3);
                var CPU4 = new Chart(ctx_CPU4, opt_cpu4);

                var MEM1 = new Chart(ctx_MEM1, opt_mem1);
                var MEM2 = new Chart(ctx_MEM2, opt_mem2);
                var MEM3 = new Chart(ctx_MEM3, opt_mem3);
                var MEM4 = new Chart(ctx_MEM4, opt_mem4);

                var NET = new Chart(ctx_NET, opt_net);
                var DISK = new Chart(ctx_DISK, opt_disk);


                //함수구현
                that.interval1 = setInterval(cpudatapush,1000, CPU1);
                that.interval2 = setInterval(cpudatapush_rand,1000, CPU2);
                that.interval3 = setInterval(cpudatapush_rand,1000, CPU3);
                that.interval4 = setInterval(cpudatapush_rand,1000, CPU4);

                that.interval5 = setInterval(memdatapush,1000, MEM1);
                that.interval6 = setInterval(cpudatapush_rand,1000, MEM2);//어차피 CPU랑 비슷하니까 랜덤값 같은함수로
                that.interval7 = setInterval(cpudatapush_rand,1000, MEM3);
                that.interval8 = setInterval(cpudatapush_rand,1000, MEM4);

                that.interval9 = setInterval(netdatapush,1000, NET);
                that.interval10 = setInterval(diskdatapush,1000, DISK);


                //서버통신
                //cpu
                function cpudatapush(chart){
                    getCpuData(function(data){
                            if(chart.data.datasets[0].data.length == 8) {
                                chart.data.datasets[0].data.splice(0, 1);
                                chart.data.labels.splice(0, 1);
                            }
                            chart.data.datasets[0].data.push(data);
                            chart.data.labels.push(getTime());
                            chart.update();
                        }
                    );
                }
                function cpudatapush_rand(chart){//임시 CPU값
                    if(chart.data.datasets[0].data.length == 8){
                        chart.data.datasets[0].data.splice(0,1);
                        chart.data.labels.splice(0,1);
                    }
                    var input_num = Math.floor(Math.random()*100+1);
                    if(input_num >=95){
                        var name = chart.data.datasets[0].label;
                        var time = getTime();
                        var value = input_num;
                        getAlert(name, time, value);
                        var div_id;
                        if(chart.data.datasets[0].label == "Server2-CPU"){
                            div_id = "#CPU2";
                        }
                        else if(chart.data.datasets[0].label == "Server3-CPU"){
                            div_id = "#CPU3";
                        }
                        else if(chart.data.datasets[0].label == "Server4-CPU"){
                            div_id = "#CPU4";
                        }
                        else if(chart.data.datasets[0].label == "Server2-MEM"){
                            div_id = "#MEM2";
                        }
                        else if(chart.data.datasets[0].label == "Server3-MEM"){
                            div_id = "#MEM3";
                        }
                        else if(chart.data.datasets[0].label == "Server4-MEM"){
                            div_id = "#MEM4";
                        }
                        //alert(div_id);
                        var base = $(div_id);
                        base.addClass("blinkcss");
                        setTimeout(function() {
                            $(div_id).removeClass('blinkcss');
                        }, 3000);
                    }
                    chart.data.datasets[0].data.push(input_num);
                    chart.data.labels.push(getTime());
                    chart.update();
                }

                //mem
                function memdatapush(chart){
                    getMemData(function(data){
                        if(chart.data.datasets[0].data.length == 8) {
                            chart.data.datasets[0].data.splice(0, 1);
                            chart.data.labels.splice(0, 1);
                        }
                        chart.data.datasets[0].data.push(data);
                        chart.data.labels.push(getTime());
                        chart.update();});
                }

                //disk
                function diskdatapush(chart){
                    getDiskData(function(data){
                        chart.data.labels.push(getTime());
                        for(var i = 0; i < 4; i++){
                            if(chart.data.datasets[i].data.length == 8){
                                chart.data.datasets[i].data.splice(0,1);
                                if(i == 0){chart.data.labels.splice(0,1);}//라벨 1번만 삭제하기위해
                            }
                            //chart.data.datasets[i].data.push(Math.floor(Math.random()*80+1));
                            if(i == 1){chart.data.datasets[i].data.push(parseInt(data.serv1_diskT));}
                            else if(i == 2){chart.data.datasets[i].data.push(parseInt(data.serv2_diskT));}
                            else if(i == 3){chart.data.datasets[i].data.push(parseInt(data.serv3_diskT));}
                            else{chart.data.datasets[i].data.push(parseInt(data.serv4_diskT));}
                            chart.update();
                        }
                    });
                }
                //net
                function netdatapush(chart){
                    getNetData(function(data){
                        chart.data.labels.push(getTime());
                        for(var i = 0; i < 4; i++){
                            if(chart.data.datasets[i].data.length == 8){
                                chart.data.datasets[i].data.splice(0,1);
                                if(i == 0){chart.data.labels.splice(0,1);}//라벨 1번만 삭제하기위해
                            }
                            //chart.data.datasets[i].data.push(Math.floor(Math.random()*80+1));
                            if(i == 1){chart.data.datasets[i].data.push(parseInt(data.serv1_netR));}
                            else if(i == 2){chart.data.datasets[i].data.push(parseInt(data.serv2_netR));}
                            else if(i == 3){chart.data.datasets[i].data.push(parseInt(data.serv3_netR));}
                            else{chart.data.datasets[i].data.push(parseInt(data.serv4_netR));}
                            chart.update();
                        }
                    });
                }



                function getCpuData(callback) {
                    $.ajax({
                        url:"http://127.0.0.1:3000/cpu",
                        type:"get",
                        success: function(json){
                            callback(json.cpu);},
                        error: function(xhr, status, error) { console.log(xhr); }
                    });
                }
                function getMemData(callback) {
                    $.ajax({
                        url:"http://127.0.0.1:3000/mem",
                        type:"get",
                        success: function(json){
                            callback(json.mem);},
                        error: function(xhr, status, error) { console.log(xhr); }
                    });
                }
                function getDiskData(callback) {
                    $.ajax({
                        url:"http://127.0.0.1:3000/disk",
                        type:"get",
                        success: function(json){
                            callback(json);
                        },
                        error: function(xhr, status, error) { console.log(xhr); }
                    });
                }
                function getNetData(callback) {
                    $.ajax({
                        url:"http://127.0.0.1:3000/net",
                        type:"get",
                        success: function(json){
                            callback(json);
                        },
                        error: function(xhr, status, error) { console.log(xhr); }
                    });
                }
                function getProcData(callback) {
                    $.ajax({
                        url:"http://127.0.0.1:3000/proc",
                        type:"get",
                        success: function(json){
                            callback(json);
                        },
                        error: function(xhr, status, error) { console.log(xhr); }
                    });
                }
            });
        }
        //process
        public putData(data){
            this.processData.push(data);
        }
    }

    //함수 구현부분
    function getTime(){
        var date = new Date();
        return getDataFormat(date);
    }
    function getDataFormat(date){
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute >= 10 ? minute : '0' + minute;
        second = second >= 10 ? second : '0' + second;
        return minute + ":" + second;
    }
    function getAlert(name, time, value){
        EventBus.$emit('alertServerError',name,time,value);
    }



    //canvas옵션
    var opt_cpu1 = {
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
            scales :{
                yAxes:[{
                    ticks:{
                        min:0,
                        max:100,
                        stepSize:20,
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
    var opt_cpu2 = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Server2-CPU',
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
            scales :{
                yAxes:[{
                    ticks:{
                        min:0,
                        max:100,
                        stepSize:20,
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
    var opt_cpu3 = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Server3-CPU',
                data: [],
                backgroundColor: [
                    server3_color_back
                ],
                borderColor: [
                    server3_color_border
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales :{
                yAxes:[{
                    ticks:{
                        min:0,
                        max:100,
                        stepSize:20,
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
    var opt_cpu4 = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Server4-CPU',
                data: [],
                backgroundColor: [
                    server4_color_back
                ],
                borderColor: [
                    server4_color_border
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales :{
                yAxes:[{
                    ticks:{
                        min:0,
                        max:100,
                        stepSize:20,
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

    var opt_mem1 = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Server1-MEM',
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
            scales :{
                yAxes:[{
                    ticks:{
                        min:0,
                        max:100,
                        stepSize:20,
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
    var opt_mem2 = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Server2-MEM',
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
            scales :{
                yAxes:[{
                    ticks:{
                        min:0,
                        max:100,
                        stepSize:20,
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
    var opt_mem3 = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Server3-Mem',
                data: [],
                backgroundColor: [
                    server3_color_back
                ],
                borderColor: [
                    server3_color_border
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales :{
                yAxes:[{
                    ticks:{
                        min:0,
                        max:100,
                        stepSize:20,
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
    var opt_mem4 = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Server4-Mem',
                data: [],
                backgroundColor: [
                    server4_color_back
                ],
                borderColor: [
                    server4_color_border
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales :{
                yAxes:[{
                    ticks:{
                        min:0,
                        max:100,
                        stepSize:20,
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
                label: 'Sever1',
                data: [],
                backgroundColor: ['rgba(0, 0, 0, 0)'],
                borderColor: [server1_color_back],
                borderWidth: 2
            },
                {
                    label: 'Sever2',
                    data: [],
                    backgroundColor: ['rgba(0, 0, 0, 0)'],
                    borderColor: [server2_color_back],
                    borderWidth: 2
                },
                {
                    label: 'Sever3',
                    data: [],
                    backgroundColor: ['rgba(0, 0, 0, 0)'],
                    borderColor: [server3_color_back],
                    borderWidth: 2
                },
                {
                    label: 'Sever4',
                    data: [],
                    backgroundColor: ['rgba(0, 0, 0, 0)'],
                    borderColor: [server4_color_back],
                    borderWidth: 2
                }
            ],

        },
        options: {
            responsive:true,
            legend: {
                labels: {
                    defaultFontFamily: 'Arial'
                }
            },
            scales :{
                yAxes:[{
                    ticks:{
                        min:2078000,
                        max:2083000,
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
                label: 'Sever1',
                data: [],
                backgroundColor: ['rgba(0, 0, 0, 0)'],
                borderColor: [server1_color_back],
                borderWidth: 2
            },
                {
                    label: 'Sever2',
                    data: [],
                    backgroundColor: ['rgba(0, 0, 0, 0)'],
                    borderColor: [server2_color_back],
                    borderWidth: 2
                },
                {
                    label: 'Sever3',
                    data: [],
                    backgroundColor: ['rgba(0, 0, 0, 0)'],
                    borderColor: [server3_color_back],
                    borderWidth: 2
                },
                {
                    label: 'Sever4',
                    data: [],
                    backgroundColor: ['rgba(0, 0, 0, 0)'],
                    borderColor: [server4_color_back],
                    borderWidth: 2
                }
            ],


        },
        options: {
            responsive:true,
            legend: {
                labels: {
                    defaultFontFamily: 'Arial'
                }
            },
            scales :{
                yAxes:[{
                    ticks:{
                        max:1000,
                        beginAtZero:true
                    }
                }]
            }

        }
    };



</script>


<style scoped>

    /* for MS계열 브라우저 */
    @keyframes blink {
        0% {background-color: rgba(255, 0, 0, 0.55);}
        50% {background-color: white;}
    }

    /* for Chrome, Safari */
    @-webkit-keyframes blink {
        0% {background-color: rgba(255, 0, 0, 0.55);}
        50% {background-color: white;}
    }

    /* blink CSS 브라우저 별로 각각 애니메이션을 지정해 주어야 동작한다. */
    .blinkcss {
        font-weight:bold;
        animation: blink 1s step-end infinite;
        -webkit-animation: blink 1s step-end infinite;
    }
    .blinkcss {
        animation: blink 1s step-end infinite;
    }

    .el-row {
        margin-bottom: 10px;
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: white;
        margin-left:10px;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content .bg-purple{
        margin-left:10px;
        padding:10px;
        border-radius: 4px;
    }
    .grid-content-footer {
        padding:20px;
        border-radius: 4px;
        height: 450px;
    }
    .grid-content-proc {
        padding:20px;
        border-radius: 4px;
        height: 940px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .el-main{
        min-width: 1500px;
        margin:0;
        background-color: #ECF0F5;
    }
    .about{

        line-height: 30px;
    }
    .testtest{
        background: red;
    }

    .proc-div{
        overflow-y: auto;
        margin-bottom: 50px;
        width: 100%;
        height: 100%;
        max-height: 200px;
    }

</style>