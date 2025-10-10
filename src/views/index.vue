<template>
    <div>
        helloword
        <ButtonLabel hoverEffect="" @click="clickTag"></ButtonLabel>
    </div>
</template>

<script>
import ButtonLabel from "@/components/ButtonLabel.vue"
    export default {
        components:{
            ButtonLabel,
        },
        data(){
            return{

            }
        },
        methods:{
            clickTag(){
                console.log("hello world")
            }
        },
        mounted(){

        },
        created(){
            
        }
        
    }
</script>

<style lang="scss" scoped>

</style>