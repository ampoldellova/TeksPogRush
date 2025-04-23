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
                    <el-input v-model="valueContainerInput" class="valueContainer" placeholder="Enter Amount">
                    </el-input>
                </el-col>
                <el-row>
                    <el-col>
                        <el-input v-model="accountNumberInput" placeholder="Enter Account Number"></el-input>
                        <el-text>Account Number</el-text>
                    </el-col>
                    <el-col>
                        <el-input v-model="accountNameInput" placeholder="Enter Account Name"></el-input>
                        <el-text>Account Name</el-text>
                    </el-col>
                </el-row>
            </el-row>
            <!-- <button>Confirm</button> -->
            <motion.button
            :whileHover="{
              scale: 1.2,
              transition: { duration: 0.3 },
            }"
            :whilePress="{ scale: 0.9 }"
            :style="{
              fontFamily: 'bold',
              width: '200px',
              backgroundColor: '#ffd200',
              color: 'black',
              borderWidth: 0,
              height: '50px',
              borderRadius: '15px',
              cursor: 'pointer',
              boxShadow: '5px 8px 0px 1px rgba(0, 0, 0, 1)',
            }"
          >
            CONFIRM
          </motion.button>
   </template>
   
<script setup lang="ts">
   
import { ref } from 'vue'
import { motion } from 'motion-v'

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
    gap: 20px;
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

:deep(.el-input__inner){
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