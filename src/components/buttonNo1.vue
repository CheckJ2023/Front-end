<template>
        <button class="btn"> {{ message }}</button>

</template>

<!-- 當按鈕變成變數時 -->
<script>
export default {
        props:[
                "message"
        ],
}
</script>


<!-- scoped限定使用 -->

<style scoped>
        .btn{
                color:blueviolet;
                border:solid;
                background-color:yellow;
                width:150px;
                height: 70px;
        
        }
</style>
