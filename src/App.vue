<template>
    <el-container id="app">
        <el-header class="header" id="main-header">
            <img id="logo" src="./assets/logo.png" @click="selectItem('/')"/>
            <el-popover
                    placement="bottom"
                    width="550"
                    trigger="click">
                <el-table :data="alertdata">없습니다.
                    <el-table-column fixed width="150" prop="ServerName" label="ServerName"></el-table-column>
                    <el-table-column width="150" prop="ProcessName" label="ProcessName"></el-table-column>
                    <el-table-column width="100" prop="Time" label="Time"></el-table-column>
                    <el-table-column
                            fixed="right"
                            label="알람 확인"
                            width="120">
                        <template slot-scope="scope">
                            <el-button @click="deleteData(scope.$index,alertdata)" type="text" size="small">확인</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button slot="reference" id="alert" :type="isDanger" margin-right="10px" plain v-text="countdanger"></el-button>
            </el-popover>
            <el-button id="user-email" @click="selectItem('Setting')" type="info" plain>jdd04026@gmail.com</el-button>

        </el-header>
        <router-view/>

    </el-container>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import { EventBus } from "./model/event-bus";

    @Component({})
    export default class Home extends Vue {
        public activePage: string = "Home.vue";

        public ready(){
            console.log(Vue.$options.components)
        }

        private isDanger:boolean = false;

        @Prop()
        public alertdata:string[]=[];
        @Prop()
        public countdanger:number = 0;
        @Prop()
        public colordanger:string = "primary";

        public selectItem(key: any) {
            this.$router.replace(key);
        }
        public deleteData(index,row){
            row.splice(index,1);
            this.countdanger--;
            this.isDanger;
        }
        public putData(Server,Process,Time){
            let obj ={
                "ServerName":Server,
                "ProcessName":Process,
                "Time":Time
            };
            this.alertdata.push(obj);
            this.countdanger++;
            this.isDanger;
        }
        public openNotification(ServerName,ProcessName,Time,Value) {
            const h = this.$createElement;

            this.$notify({
                title: ServerName,
                message: h('i', { style: 'color: teal' }, "Process = " + ProcessName +" / Value = " + Time),
                position: 'bottom-right'
            });
        }
        public isDanger(){
            console.log(this.colordanger);
            if(this.countdanger>=1){
                this.colordanger="danger";
            }else{
                this.colordanger="primary";
            }
        }
        async mounted(){
            let that = this;
            await EventBus.$on('alertServerError',function(Server:string, Process:string, Time:string, Value:string){
                that.putData(Server,Process,Time);
                that.openNotification(Server,Process,Time,Value);
            });
        }
    }
</script>

<style>
    * {
        margin: 0px;
    }
    el-main{
        height: 100%;
    }

    body {
        margin: 0;
        padding: 0;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    #logo {
        width: 60px;
        float: left;
        display: inline-block;
    }

    #main-header {
        float: right;
    }

    #user-email{
        margin-left:10px;
    }

    .el-header, .el-footer {
        background-color: #3c8dbc;
        color: #333;
        line-height: 60px;
        text-align: right;
    }

    aside.el-aside {
        background-color: rgb(34, 45, 50);
        color: #333;
    }
    ul#side-menu-div.el-menu-vertical-demo.el-menu{
        background-color: rgba(23, 25, 77, 0);
    }
    li.el-menu-item.menu_item{
        background-color: rgba(255, 255, 255, 0.90);
        margin-top:10px;
        margin-bottom:10px;
    }

    router-view {
        margin: 0;
        height: 100%;
    }

</style>
