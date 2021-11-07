<template>
  <h3 class="title">
    <span>『</span>
    <svg
      t="1635955416679"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="1211"
      width="28"
      height="28"
    >
      <path
        d="M325.43 185.5c-127.62 0-177.25 49.63-177.25 177.25v298.52c0 85.82 46.64 177.24 177.25 177.24h223.89c127.62 0 177.24-49.63 177.24-177.24V362.74c0-127.62-49.63-177.25-177.24-177.25H325.43z"
        fill="#A4D4FF"
        p-id="1212"
      />
      <path
        d="M493.31 488.87c-38.74 0-70.15-31.41-70.15-70.15s31.41-70.15 70.15-70.15 70.15 31.41 70.15 70.15-31.41 70.15-70.15 70.15z"
        fill="#2B8CF7"
        p-id="1213"
      />
      <path
        d="M781.06 308.27l-55.23 38.81c0.37 5.22 0.75 10.07 0.75 15.67v298.52c0 5.6-0.75 10.45-0.75 15.67l55.23 38.81c23.14 16.42 43.29 21.64 59.33 21.64 13.81 0 24.63-3.73 31.72-7.46 15.3-7.84 41.05-29.11 41.05-82.47V376.92c0-53.36-25.75-74.63-41.05-82.47-15.3-7.83-47.39-16.78-91.05 13.82z"
        fill="#2B8CF7"
        p-id="1214"
      />
    </svg>
    <span>回放 』</span>
  </h3>
  <div class="video">
    <div v-if="state.error" class="error">
      <h3>非常抱歉, 视频加载错误 （ｉДｉ）</h3>
    </div>
    <template v-else>
      <div class="backup-wrap" :class="{ 'over-video': state.overlap }">
        <video class="backup" muted autoplay></video>
        <h4>{{ state.overlap ? '叠加视频轨道' : '过程视频轨道' }}</h4>
      </div>
      <div class="primary-wrap" :class="{ 'over-video': state.overlap }">
        <video class="primary" muted autoplay></video>
        <h4>{{ state.overlap ? '&nbsp;' : '结果视频轨道' }}</h4>
      </div>
    </template>
  </div>
  <div class="tools">
    <button playBtn @click="playEvent" :disabled="state.error || state.playing">
      <svg
        t="1635955339190"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="887"
        width="28"
        height="28"
      >
        <path
          d="M510.91 884.78c-205.88 0-372.78-166.9-372.78-372.78s166.9-372.78 372.78-372.78S883.69 306.12 883.69 512s-166.9 372.78-372.78 372.78z"
          fill="#A4D4FF"
          p-id="888"
        />
        <path
          d="M514.59 383.77c-26.84-15.66-59.27-15.66-86.11 0-26.84 15.66-42.87 43.24-42.87 74.56V583.2c0 30.94 16.03 58.9 42.87 74.56 13.42 7.83 28.33 11.56 42.87 11.56 14.91 0 29.45-3.73 42.87-11.56l108.11-62.25c26.84-15.66 42.87-43.24 42.87-74.56 0.75-31.31-15.28-59.27-42.5-74.93l-108.11-62.25z"
          fill="#2B8CF7"
          p-id="889"
        />
      </svg>
      <span>播放</span>
    </button>
    <button puseBtn @click="puseEvent" :disabled="state.error || !state.playing">
      <svg
        t="1635955363218"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1049"
        width="28"
        height="28"
      >
        <path
          d="M510.91 885.15c-206.08 0-373.15-167.06-373.15-373.15s167.06-373.15 373.15-373.15S884.05 305.92 884.05 512 716.99 885.15 510.91 885.15z"
          fill="#A4D4FF"
          p-id="1050"
        />
        <path
          d="M464.24 398.93c0-17.91-7.46-25-26.49-25h-48.51c-19.03 0-26.49 7.09-26.49 25v226.13c0 17.91 7.46 25 26.49 25h48.14c19.4 0 26.87-7.09 26.87-25V398.93zM661.22 398.93c0-17.91-7.46-25-26.49-25h-48.14c-19.03 0-26.49 7.09-26.49 25v226.13c0 17.91 7.46 25 26.49 25h48.14c19.03 0 26.49-7.09 26.49-25V398.93z"
          fill="#2B8CF7"
          p-id="1051"
        />
      </svg>
      <span>暂停</span>
    </button>
    <button stopBtn @click="stopEvent" :disabled="state.error">
      <svg
        t="1635954959272"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3906"
        width="28"
        height="28"
      >
        <path
          d="M510.91 885.15c-206.08 0-373.15-167.06-373.15-373.15s167.06-373.15 373.15-373.15S884.05 305.92 884.05 512 716.99 885.15 510.91 885.15z"
          fill="#A4D4FF"
          p-id="3907"
        />
        <path
          d="M557.88 669.84c61.94 0 111.94-50 111.94-111.94v-91.8c0-61.94-50-111.94-111.94-111.94h-91.79c-61.94 0-111.94 50-111.94 111.94v91.79c0 61.94 50 111.94 111.94 111.94h91.79z"
          fill="#2B8CF7"
          p-id="3908"
        />
      </svg>
      <span>停止</span>
    </button>
    <button togglePlayTypeBtn @click="togglePlayTypeEvent" :disabled="state.error">
      <svg
        t="1636272157023"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1050"
        width="28"
        height="28"
      >
        <path
          d="M875.47 732.9c-0.37-2.99-0.75-5.97-1.87-8.58-1.49-3.36-3.36-5.97-5.6-8.58 0-0.25-0.12-0.37-0.37-0.37-2.61-2.61-5.6-4.48-8.96-5.97-3.36-1.49-7.09-2.24-10.82-2.24l-174.25 0.74h-0.37c-22.39 0-44.03-10.45-57.47-28.36l-45.52-58.58c-9.33-12.31-26.87-14.55-39.18-4.85-12.31 9.7-14.55 26.87-4.85 39.18l45.52 58.58c24.25 31.34 62.31 50 101.87 50h0.37l106.35-0.37-26.49 26.49c-10.82 10.82-10.82 28.73 0 39.55 5.6 5.6 12.69 8.21 19.78 8.21s14.18-2.61 19.78-8.21l74.63-74.63c2.61-2.61 4.48-5.6 5.97-8.96 1.12-3.73 1.87-7.46 1.87-10.82-0.02-0.74-0.39-1.48-0.39-2.23zM273.94 260.49h-0.75l-97.39 0.37c-15.3 0-27.99 12.69-27.99 27.99s12.69 27.99 27.99 27.99l97.39-0.37h0.37c23.51 0 45.52 11.19 58.96 30.22l40.3 55.97c5.6 7.46 14.18 11.57 22.76 11.57 5.6 0 11.57-1.87 16.42-5.22 12.69-8.96 15.3-26.49 6.34-39.18l-39.93-55.97c-24.24-33.59-63.05-53.37-104.47-53.37z"
          fill="#A4D4FF"
          p-id="1051"
        />
        <path
          d="M875.83 289.22c0-3.73-0.75-7.46-2.24-10.82-1.49-3.36-3.36-6.34-5.97-8.96l-74.63-74.63c-10.82-10.82-28.73-10.82-39.55 0-10.82 10.82-10.82 28.73 0 39.55l26.49 26.49-101.87-0.37h-0.75c-42.91 0-83.21 21.27-107.09 57.46L331.78 675.43c-13.43 20.15-36.2 32.46-60.45 32.46h-0.37l-95.15-0.37c-15.3 0-27.99 12.31-27.99 27.99 0 15.3 12.31 27.99 27.99 27.99l95.15 0.37h0.75c43.29 0 83.21-21.27 107.09-57.46l238.44-357.48c13.43-20.15 36.2-32.46 60.45-32.46h0.37l169.78 0.75c3.73 0 7.09-0.75 10.82-2.24 3.36-1.49 6.34-3.36 8.96-5.97 0-0.25 0.12-0.37 0.37-0.37 2.24-2.61 4.48-5.22 5.6-8.58 1.12-2.99 1.49-5.97 1.87-8.96-0.01-0.76 0.37-1.5 0.37-1.88z"
          fill="#2B8CF7"
          p-id="1052"
        />
      </svg>
      <span>{{ state.overlap ? '拆分' : '叠加' }}</span>
    </button>
    <button openBtn1 :disabled="state.error" @click="openBackupEvent">
      <svg
        t="1635955484555"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1374"
        width="23"
        height="23"
      >
        <path
          d="M698.57 148.18h149.26c15.46 0 27.99 12.53 27.99 27.99v149.26c0 15.46-12.53 27.99-27.99 27.99-15.46 0-27.99-12.53-27.99-27.99V204.15H698.57c-15.46 0-27.99-12.53-27.99-27.99s12.54-27.98 27.99-27.98z"
          fill="#A4D4FF"
          p-id="1375"
        />
        <path
          d="M867.62 195.96L643.73 419.84c-10.93 10.93-28.65 10.93-39.58 0s-10.93-28.65 0-39.58l223.89-223.89c10.93-10.93 28.65-10.93 39.58 0 10.93 10.94 10.93 28.66 0 39.59zM204.15 698.57v121.27h121.27c15.46 0 27.99 12.53 27.99 27.99 0 15.46-12.53 27.99-27.99 27.99H176.17c-15.46 0-27.99-12.53-27.99-27.99V698.57c0-15.46 12.53-27.99 27.99-27.99s27.98 12.54 27.98 27.99z"
          fill="#A4D4FF"
          p-id="1376"
        />
        <path
          d="M419.84 643.73L195.96 867.62c-10.93 10.93-28.65 10.93-39.58 0s-10.93-28.65 0-39.58l223.89-223.89c10.93-10.93 28.65-10.93 39.58 0s10.92 28.65-0.01 39.58z"
          fill="#A4D4FF"
          p-id="1377"
        />
        <path
          d="M512 110.87c27.63 0 54.84 2.8 80.87 8.01 15.16 3.03 24.99 17.77 21.95 32.93s-17.77 24.99-32.93 21.95a357.09 357.09 0 0 0-69.89-6.92c-190.52 0-345.16 154.64-345.16 345.16 0 23.85 2.42 46.99 6.9 69.06 3.08 15.15-6.71 29.92-21.86 33-15.15 3.08-29.92-6.71-33-21.86-5.22-25.69-8.02-52.56-8.02-80.2 0.01-221.43 179.71-401.13 401.14-401.13zM905.15 431.89c5.2 25.98 8.01 52.82 8.01 80.12 0 221.43-179.7 401.13-401.13 401.13-27.63 0-54.84-2.8-80.87-8.01-15.16-3.03-24.99-17.77-21.95-32.93s17.77-24.99 32.93-21.95a357.09 357.09 0 0 0 69.89 6.92c190.52 0 345.16-154.64 345.16-345.16 0-23.45-2.41-46.62-6.92-69.14-3.03-15.16 6.8-29.9 21.95-32.93s29.9 6.79 32.93 21.95z"
          fill="#2B8CF7"
          p-id="1378"
        />
      </svg>
      <span>查看过程视频轨道</span>
    </button>
    <button openBtn2 :disabled="state.error" @click="openPrimaryEvent">
      <svg
        t="1635955484555"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1374"
        width="23"
        height="23"
      >
        <path
          d="M698.57 148.18h149.26c15.46 0 27.99 12.53 27.99 27.99v149.26c0 15.46-12.53 27.99-27.99 27.99-15.46 0-27.99-12.53-27.99-27.99V204.15H698.57c-15.46 0-27.99-12.53-27.99-27.99s12.54-27.98 27.99-27.98z"
          fill="#A4D4FF"
          p-id="1375"
        />
        <path
          d="M867.62 195.96L643.73 419.84c-10.93 10.93-28.65 10.93-39.58 0s-10.93-28.65 0-39.58l223.89-223.89c10.93-10.93 28.65-10.93 39.58 0 10.93 10.94 10.93 28.66 0 39.59zM204.15 698.57v121.27h121.27c15.46 0 27.99 12.53 27.99 27.99 0 15.46-12.53 27.99-27.99 27.99H176.17c-15.46 0-27.99-12.53-27.99-27.99V698.57c0-15.46 12.53-27.99 27.99-27.99s27.98 12.54 27.98 27.99z"
          fill="#A4D4FF"
          p-id="1376"
        />
        <path
          d="M419.84 643.73L195.96 867.62c-10.93 10.93-28.65 10.93-39.58 0s-10.93-28.65 0-39.58l223.89-223.89c10.93-10.93 28.65-10.93 39.58 0s10.92 28.65-0.01 39.58z"
          fill="#A4D4FF"
          p-id="1377"
        />
        <path
          d="M512 110.87c27.63 0 54.84 2.8 80.87 8.01 15.16 3.03 24.99 17.77 21.95 32.93s-17.77 24.99-32.93 21.95a357.09 357.09 0 0 0-69.89-6.92c-190.52 0-345.16 154.64-345.16 345.16 0 23.85 2.42 46.99 6.9 69.06 3.08 15.15-6.71 29.92-21.86 33-15.15 3.08-29.92-6.71-33-21.86-5.22-25.69-8.02-52.56-8.02-80.2 0.01-221.43 179.71-401.13 401.14-401.13zM905.15 431.89c5.2 25.98 8.01 52.82 8.01 80.12 0 221.43-179.7 401.13-401.13 401.13-27.63 0-54.84-2.8-80.87-8.01-15.16-3.03-24.99-17.77-21.95-32.93s17.77-24.99 32.93-21.95a357.09 357.09 0 0 0 69.89 6.92c190.52 0 345.16-154.64 345.16-345.16 0-23.45-2.41-46.62-6.92-69.14-3.03-15.16 6.8-29.9 21.95-32.93s29.9 6.79 32.93 21.95z"
          fill="#2B8CF7"
          p-id="1378"
        />
      </svg>
      <span>查看结果视频轨道</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";

export default defineComponent({
  name: "Player",
  setup() {
    const state = reactive({
      error: false,
      playing: false,
      overlap: false,
      video: null as HTMLVideoElement | null,
      videoBackup: null as HTMLVideoElement | null,
    });

    const playEvent = () => {
      if (state.video && state.videoBackup && !state.playing) {
        state.playing = true;
        state.video.play();
        state.videoBackup.play();
      }
    };

    const puseEvent = () => {
      if (state.video && state.videoBackup && state.playing) {
        state.playing = false;
        state.video.pause();
        state.videoBackup.pause();
      }
    };

    const stopEvent = () => {
      if (state.video && state.videoBackup) {
        puseEvent();
        state.video.currentTime = 0;
        state.videoBackup.currentTime = 0;
      }
    };

    const openPrimaryEvent = () => {
      if (state.video && state.video.src) {
        window.open(state.video.src);
      }
    };

    const openBackupEvent = () => {
      if (state.videoBackup && state.videoBackup.src) {
        window.open(state.videoBackup.src);
      }
    };

    const getQueryString = (name: string) => {
      const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      const r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURIComponent(r[2]);
      return null;
    };

    const init = () => {
      state.video = document.querySelector("video.primary");
      state.videoBackup = document.querySelector("video.backup");

      const [url, urlBackup] = [
        getQueryString("url"),
        getQueryString("urlBackup"),
      ];

      if (url && urlBackup && state.video && state.videoBackup) {
        state.video.src = url;
        state.videoBackup.src = urlBackup;
        state.playing = true;
        const onended = () => (state.playing = false);
        state.video.onended = onended;
        state.videoBackup.onended = onended;
      } else {
        state.error = true;
      }
    };

    const togglePlayTypeEvent = () => {
      state.overlap = !state.overlap
    }

    onMounted(init);

    return {
      state,
      playEvent,
      puseEvent,
      stopEvent,
      togglePlayTypeEvent,
      openPrimaryEvent,
      openBackupEvent,
    };
  },
});
</script>

<style>
@import "global.css";

:root {
  --player-video-height: 50vh;
  --player-video-width: 40vw;
  --player-video-overlap-width: 80vw;
  --player-video-wrap-width: 80vw;
  --player-video-wrap-height: 60vh;
}

html,
body {
  width: 100%;
  height: 100%;
  min-width: 880px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--main-background-color);
}

.video {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: var(--player-video-wrap-width);
  height: var(--player-video-wrap-height);
  min-width: 700px;
  overflow: hidden;
  border-radius: 10px;
  position: relative;
}

.title {
  width: var(--player-video-overlap-width);
  display: flex;
  align-items: center;
}

.error {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 10px;
}

.primary-wrap,
.backup-wrap {
  width: var(--player-video-width);
  min-width: 340px;
  border: 1px solid #eeeeee;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5px;
  overflow: hidden;
  border-radius: 10px;
  transition: all 500ms;
  background: #ffffff;
}

.over-video {
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--player-video-overlap-width);
  transform: translate(-50%, -50%);
  transition: all 500ms;
  background: transparent;
}

.over-video.primary-wrap {
  z-index: 1;
  background: #ffffff;
}

.over-video.backup-wrap {
  z-index: 2;
}

.primary,
.backup {
  width: 100%;
  height: var(--player-video-height);
  display: flex;
  align-items: center;
  justify-content: center;
}

.tools {
  margin: 50px auto;
  width: max-content;
  min-width: 60%;
  height: 40px;
  border-radius: 30px;
  background-color: #535557;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
}

button {
  margin: 0 16px;
  cursor: pointer;
  box-shadow: none;
  font-size: 14px;
  line-height: 20px;
  font-family: Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  border: 0 solid transparent;
  border-radius: 2px;
  padding: 6px 12px;
  font-weight: 600;
  outline: none;
  vertical-align: middle;
  white-space: nowrap;
  color: rgb(80, 86, 94);
}

.title svg,
button svg {
  margin: 3px;
}
</style>
