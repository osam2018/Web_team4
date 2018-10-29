<template>
    <el-main>
        <el-container class="server-info">
            <p class="add-server">Server Name</p>
            <el-input placeholder="Input Server Name" v-model="input1" class="input-server-name"></el-input>
        </el-container>
        <el-container>
            <el-container class="server-info" id="add-server-ip" margin-right="10px">
                <p class="add-server">Server Ip</p>
                <el-input placeholder="Input Server IP" v-model="input2" class="input-server-ip"></el-input>
            </el-container>
            <el-container class="server-info">
                <p class="add-server" id="add-server-port">Server Port</p>
                <el-input placeholder="Input Server port" v-model="input3" class="input-server-port"></el-input>
            </el-container>
        </el-container>
        <el-button-group class="add-server">
            <el-button type="primary" @click="updateServerList()">Accept</el-button>
            <el-button type="danger" @click="selectItem('/')">Cancle</el-button>

        </el-button-group>
    </el-main>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {EventBus} from "../../model/event-bus";

    @Component
    export default class AddServerWatcher extends Vue {

        private input1: string = "";
        private input2: string = "";
        private input3: string = "";

        private updateServerList() {
            if(this.input1==""||this.input2==""||this.input3==""){
                this.$message.error('공백이 있으면 안됩니다.');
            }else {
                EventBus.$emit('updateSeverList', this.input1, this.input2);
            }
        }

        private updateAlert(ServerName: string, ProcessName: string, Time: string) {
            EventBus.$emit('alertServerError', ServerName, ProcessName, Time);
        }
        public selectItem(key: any) {
            this.$router.replace(key);
        }
    }
</script>

<style scoped>
    .add-server {
        margin: 10px 0 10px;
    }
    .server-info{
        display: block;
    }
    #add-server-ip{
        margin-right: 10px;
    }
</style>