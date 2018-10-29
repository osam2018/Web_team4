<template>
    <el-main>
        <el-container id="setting-main">
            <el-container class="server-setting">
                <p class="add-server">Email</p>
                <el-input placeholder="Input Server Name" v-model="input1" class="input-server-name"></el-input>
            </el-container>
            <el-container class="server-setting">
                <p class="add-server" id="add-server-port">Server Port</p>
                <el-input placeholder="Input Server port" v-model="input3" class="input-server-port"></el-input>
            </el-container>
            <el-container class="server-setting">
                <p class="add-server">Description</p>
                <el-input placeholder="description" v-model="input1" class="description"></el-input>
            </el-container>
        </el-container>
    </el-main>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import SideMenu from './side-page-sub/SideMenu.vue';
    import MainServerWatcher from './side-page-sub/MainServerWatcher.vue';
    import ServerWatcher from './side-page-sub/ServerWatcher.vue';

    @Component({
        components: {
            SideMenu,
            MainServerWatcher,
            ServerWatcher
        }
    })
    export default class Home extends Vue {
        public activePage: string = "Setting.vue";


    }
</script>

<style scoped>

    .about {
        line-height: 30px;
    }

    .add-server {
        margin: 10px 0 10px;
    }

    .server-setting {
        display: block;
    }

    #add-server-ip {
        margin-right: 10px;
    }


</style>