var app = new Vue({
    el: '#app',

    data:{
        connected: false,
        ros: null,
        ws_address: 'ws://3.91.38.82:9090',
        logs: [],
    },

    methods: {
        connect: function(){
            //console.log('connect to rosbridge server!!')
            this.logs.unshift('connect to rosbridge server!!')
            //var ros = new ROSLIB
            this.ros = new ROSLIB.Ros({
                url: this.ws_address
            })
            this.ros.on('connection', () => {
                this.connected = true
                this.logs.unshift('Connected!')
                //console.log('Connected!')
            })
            this.ros.on('error', (error) => {
                this.logs.unshift('Error connecting to websocket server')
                //console.log('Error connecting to websocket server: ', error)
            })
            this.ros.on('close', () => {
                this.connected = false
                this.logs.unshift('Connection to websocket server closed.')
                //console.log('Connection to sebsocket server closed.')
            })
        },
        disconnect: function(){
            this.ros.close()
        },
    }
})