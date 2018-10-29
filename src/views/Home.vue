<template>
    <el-container>
        <el-aside width="240px" class="aside">
            <side-menu></side-menu>
        </el-aside>
        <router-view/>
    </el-container>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
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
        public activePage:string ="Home.vue";


        handleOpen(key:string, keyPath:string) {
            console.log("open ", key, keyPath);
        }

        handleClose(key:string, keyPath:string) {
            console.log("close", key, keyPath);
        }

        handleSelect(key:string, keyPath:string){
            console.log("select", key, keyPath);
            this.$router.replace(key);
        }

    }
</script>

<style scoped>



</style>