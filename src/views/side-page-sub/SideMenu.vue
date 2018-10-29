<template>
    <el-menu
            default-active="MainServerWatcher"
            id="side-menu-div"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @select="handleSelect"
            @close="handleClose">
        <el-menu-item index="MainServerWatcher" class="menu_item">
            <span id="mainserver-text" font-size="30px">MainServer</span>
        </el-menu-item>
        <el-menu-item class="menu_item" display="inline" v-for="(list,index) in name_list" :index="'Server'+list.name">
            <span id="server_name">{{list.name}}</span>
            <el-button class="el-icon-close" circle size="mini" @click.stop="deleteServer(index)"></el-button>
            <p></p>
        </el-menu-item>
        <el-menu-item index="addServerWatcher" class="menu_item">
            <i class="el-icon-plus"></i>
        </el-menu-item>
    </el-menu>
</template>

<script lang="ts">
    import {Component,Vue} from 'vue-property-decorator';
    import {EventBus} from "../../model/event-bus";

    @Component({})

    export default class SideMenu extends Vue {
        public activePage: string = "MainServerWatcher";

        handleOpen(key: string, keyPath: string) {
            console.log("open ", key, keyPath);
        }

        handleClose(key: string, keyPath: string) {
            console.log("close", key, keyPath);
        }

        handleSelect(key: string, keyPath: string) {
            console.log("select", key, keyPath);
            this.$router.replace(key);
        }

        private name_list: string[] = [];
        private new_server: string = "";

        public updateServerList(servername:string){
            console.log("A");
            let that = this;
            var isSameName=false;
            for(var i=0; i < this.name_list.length; i++){
                if(servername===this.name_list[i].name){
                    isSameName = true;
                    that.$message.error('이미 사용중이 서버 이름입니다.');
                }
            }
            if(!isSameName){
                let obj = {
                    "ip":"119",
                    "name":servername
                }
                that.name_list.push(obj);
            }
        }

        public deleteServer(index:number){
            var temp_list = this.name_list;
            temp_list.splice(index,1);
            this.name_list=temp_list;
        }

        async mounted() {
            this.name_list  = await window.$model.getDataServerList();
            let that = this;
            await EventBus.$on('updateSeverList',function(input1:any,input2:any){
                that.new_server=input1;
                that.updateServerList(that.new_server);
            });
        }


    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    li {
        display: block;
        margin: 0 10px;
    }

    p {
        margin: 0;
        padding: 0;
    }

    a {
        color: #42b983;
    }
    el-menu-item.menu_item{
        margin: 10px;
    }
    #mainserver-text{
        font-size: larger;
    }
    #server_name{
        font-size: medium;
    }

    .el-icon-close {
        float:right;
        margin-top:17px;
    }

    i.el-icon-plus {
        margin-left: 70px;
    }
</style>
