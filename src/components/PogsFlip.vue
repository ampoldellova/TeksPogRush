<template>
    <el-row>
        <el-col :span="8">
            <div ref="flipPogs1" class="flipPogs" @click="startFlipping">
                <div class="flipPogsInner" :class="{flipping: isFlipping}" :style="flipStyle1">
                    <div class="flipPogsFront"></div>
                    <div class="flipPogsBack"></div>
                </div>
            </div>
            <div v-if="!isFlipping && animationComplete" class="result">
                Result Pog 1: {{ isHeadsPog1 ? 'Heads' : 'Tails' }}
            </div>
        </el-col>
        <el-col :span="8"></el-col>
        <el-col :span="8"></el-col>
    </el-row>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import { computed, ref } from 'vue';

const isHeadsPog1 = ref(true);
const isFlipping = ref(false);
const rotationY1 = ref(0);
const animationComplete = ref(false);

const flipStyle1 = computed(() => ({
    transform: `rotateY(${rotationY1.value}deg)`,
}))

const startFlipping = () => {
    if (isFlipping.value) return;

    isFlipping.value = true;
    animationComplete.value = false;

    isHeadsPog1.value = Math.random() >=0.5;

    const finalRotationPog1 = isHeadsPog1.value
    ? Math.floor(Math.random () * 5 + 10) * 360
    : Math.floor(Math.random () * 5 + 10) * 360 + 180;

    spinAnimationPog1(finalRotationPog1, rotationY1, () => startSlowDown(finalRotationPog1, rotationY1));
}

const spinAnimationPog1 = (finalRotation: number, rotationY: Ref<number>, callback: () => void) => {
    const fastSpinDuration = 2000;
    const fastSpinFrames = 60;
    const fastSpinInterval = fastSpinDuration / fastSpinFrames;
    const fastSpinRotationPerFrame = (finalRotation * 0.7) / fastSpinFrames;

    let frame = 0
    const fastSpinAnimation = setInterval(() => {
        rotationY.value += fastSpinRotationPerFrame;
        frame ++

        if(frame >= fastSpinFrames) {
            clearInterval(fastSpinAnimation);
            callback();
        }   
    }, fastSpinInterval);
}

const startSlowDown = (finalRotation: number, rotationY: Ref<number>) => {
    const remainingRotation = finalRotation - rotationY.value;
    const slowDownDuration = 2500;
    const slowDownFrames = 100;
    const slowDownInterval = slowDownDuration / slowDownFrames;

    let frame = 0;
    const slowDownAnimation = setInterval(() => {
        const progress = frame / slowDownFrames;
        const easeOut = 1 - Math.pow(1 - progress, 3);

        rotationY.value +=
        remainingRotation * (easeOut - (frame > 0 ? (frame -1) / slowDownFrames : 0));
        frame++;

        if (frame >= slowDownFrames) {
            clearInterval(slowDownAnimation);
            finishAnimation(finalRotation, rotationY);
        }
    }, slowDownInterval)
}

const finishAnimation = (finalRotation: number, rotationY: Ref<number>) => {
    rotationY.value = finalRotation % 360;
    isFlipping.value = false;
    animationComplete.value = true;
}
</script>

<style scoped>
.flipPogs{
    background-color: transparent;
    width: 120px;
    height: 120px;
    perspective: 1000px;
    cursor: pointer;
    margin-top: 100px;
    z-index: 1000;
}

.flipPogsInner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transform-style: preserve-3d;
    transition: transform 0.1s linear;
}

.flipPogsInner.flipping {
  transition: none;
}

.flipPogsFront,
.flipPogsBack {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 50%;
}

.flipPogsFront {
  background-image: url('../src/assets/heads.png');
  background-size: cover;
  background-position: center;
}

.flipPogsBack {
  background-image: url('../src/assets/tails.png');
  background-size: cover;
  background-position: center;
  transform: rotateY(180deg);
}

.result{
    color: black;
}

</style>