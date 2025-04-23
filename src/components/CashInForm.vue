<template>
        <el-header style="font-weight: bold; font-size: 16px; color: black;">Select Transaction Method</el-header>
            <el-row>
                <el-row :span="12">
                    <img src="../assets/Gcash.png" alt="gcash">
                </el-row>
                <el-row :span="12">
                    <img src="../assets/MasterCard.png" alt="mastercard" style="size: 200px;">
                </el-row>
                <el-segmented v-model="value" :options="options" block size="large" style="width: 100vw;"/>
                <el-col>
                    <el-input v-model="valueContainerInput" class="valueContainer">
                    </el-input>
                </el-col>
                <el-row>
                    <el-col>
                        <el-input v-model="accountNumberInput"></el-input>
                        <el-text>Account Number</el-text>
                    </el-col>
                    <el-col>
                        <el-input v-model="accountNameInput"></el-input>
                        <el-text>Account Name</el-text>
                    </el-col>
                </el-row>
            </el-row>
            <button>Confirm</button>
   </template>
   
<script setup lang="ts">
   
import { ref } from 'vue'

const value = ref('Mon')

const options = [
'Gcash',
'Bank Account'
]

const accountNumberInput = ref();
const accountNameInput = ref()
const valueContainerInput = ref()
</script>

<style scoped>
.valueContainer{
    width: 70%;
    height: 4vh;
    background-color: rgba(133, 130, 130, 0.048);
    border-radius: 12px;
    margin: auto;
    margin-top: 8%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.moneyContainer{
    font-size: xx-large;
    margin-left: 20px;
    color: black;
}

:deep(.el-row){
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    margin-top: 8%;
    gap: 50px;
}

:deep(.el-input__wrapper){
    width: 70%;
    height: 4vh;
    background-color: rgba(31, 30, 30, 0.199);
    border-radius: 10px;
    margin: auto;
}

:deep(.el-text){
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: black;
}

img{
    margin-bottom: 8%;
}

button{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10vw;
    height: 3vh;
    border-radius: 10px;
    margin: auto;
    margin-top: 8%;
    margin-bottom: 8%;
    background-color: #F2921D;
    border-color: gray;
}

</style>