import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const CURRENT_TIME = 'videoplayer-current-time';

function onUpdateTime(data) {
  localStorage.setItem(CURRENT_TIME, data.seconds);
}
const seconds = localStorage.getItem(CURRENT_TIME);
player.on('timeupdate', throttle(onUpdateTime, 1000));
if (seconds) {
  player.setCurrentTime(seconds);
}
