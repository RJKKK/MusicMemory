<template>
<keep-alive><div id="live2d" ></div></keep-alive>
</template>

<script>
    export default {
        name: 'live2d',
        data () {
            return {

            }
        },
        mounted () {
            setTimeout(() => {
                if (document.getElementById('live2d')!==null&&document.getElementById('live2d'))
                window.L2Dwidget.init({
                    pluginRootPath: 'live2dw/',
                    pluginJsPath: 'lib/',
                    pluginModelPath: 'live2dw/assets/live2d-widget-model-shizuku/assets/',
                    tagMode: true,
                    debug: false,
                    model: { jsonPath: '/live2dw/assets/live2d-widget-model-shizuku/assets/shizuku.model.json' },
                    display: { position: 'right', width: 150, height: 300 },
                    mobile: { show: true },
                    log: false,
                    dialog:{enable:true,hitokoto:true}
                });
            }, 500)
        },
    }

</script>

<style scoped>

</style>
