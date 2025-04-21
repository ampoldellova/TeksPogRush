
<template>
    <div class="backgroundGameImage">
        <el-row>
            <div class="shadowOverlay"></div>
            <el-col :span="8">
                <img src="../assets/TeksPogRush-Logo-small.png" alt="" style="height: 10vh; margin-left: 15px;">
                <div class="totalBet"></div>
                <div class="balance"></div>
             </el-col>
            <el-col :span="8">
                <div class="arenaTitleImage">
                    <img src="../assets/Arena1.png" alt="Arena 1">
                </div>
                <div class="backgroundGameTable">
                    <img src="../assets/backgroundGameTable.jpg" alt="Game Table" style="max-height: 400px; width: 100vw; border-radius: 80px;">
                </div>
                <div class="betContainer">
                </div>
                <el-row>
                    <el-col class="betMoney">

                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="8"></el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>


*{
    overflow: hidden;
}

.titleImageContainer {
    margin-left: 30px;
}

.backgroundGameImage {
    background-image: url('../assets/BackgroundImage.png');
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100vh;
}

.totalBet{
    margin-left: 2vh;
    margin-top: 62.2vh;
    width: 20vw;
    border-radius: 10px;
    background-color: #D9D9D9;
    opacity: 0.5;
}

.balance{
    margin-left: 2vh;
    margin-top: 3vh;
    width: 20vw;
    border-radius: 10px;
    background-color: black;
    opacity: 0.5;
}

.shadowOverlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10%;
  /* background: linear-gradient(to bottom, black, transparent); */
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
}


.el-col{
     height: 100vh;
}

.arenaTitleImage{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 70px;
    margin-top: 20px;
}

.backgroundGameTable{
    display: flex;
    justify-content: center;
    align-items: center;
}

.betContainer{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20vh;
    margin-top: 40px;
    border-radius: 20px;
    background-color: #D9D9D9;
    filter: drop-shadow();
}

.totalBet{
    height: 59px;

}
</style>