import Model from '@/model/Model';
import Vue from 'vue';
import axios from "axios";

declare module '*.vue' {
    import Vue from 'vue'
    export default Vue;
}
declare module 'vue/types/vue' {
    interface VueConstructor {
        $http:any;
    }
    interface Vue {

    }
}
declare global {
    interface Window {
        $globalBus:Vue;
        $model:Model;
        $Alert:any;
    }
}