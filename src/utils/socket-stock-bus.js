import Vue from "vue";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";


export const eventSocketStockBus = new Vue({
    data() {
        return {
            stompClient: null,
            connected: false
        }
    },
    methods: {
        connect() {

            this.socket = new SockJS(process.env.VUE_APP_SOCKET_STOCK_URL);
            this.stompClient = Stomp.over(this.socket, {debug: false});
            this.stompClient.connect(
                {},
                frame => {
                    this.connected = true;
                    console.log(frame);
                    this.stompClient.subscribe(process.env.VUE_APP_SOCKET_STOCK_TOPIC, tick => {
                        eventSocketStockBus.$emit('STOCK_QUOTE', JSON.parse(tick.body));
                    });
                },
                error => {
                    console.log(error);
                    this.connected = false;
                }
            );
        },
        disconnect() {
            if (this.stompClient) {
                this.stompClient.disconnect();
            }
            this.connected = false;
        },
    },
});
