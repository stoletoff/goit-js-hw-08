import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const CURRENT_TIME = 'videoplayer-current-time';
// player.on(
//   'timeupdate',
//   throttle(function (data) {
//     localStorage.setItem(CURRENT_TIME, data.seconds);
//   }, 1000)
// );
// if (localStorage.getItem(CURRENT_TIME) !== null) {
//   player.setCurrentTime(localStorage.getItem(CURRENT_TIME));
// }

function onUpdateTime(data) {
  localStorage.setItem(CURRENT_TIME, data.seconds);
}

player.on('timeupdate', throttle(onUpdateTime, 1000));
if (localStorage.getItem(CURRENT_TIME) !== null) {
  player.setCurrentTime(localStorage.getItem(CURRENT_TIME));
}
