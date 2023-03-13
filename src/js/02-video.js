import Player from '@vimeo/player'
import throttle from 'lodash.throttle'

const player = new Player('vimeo-player');
const savedTime = localStorage.getItem('videoplayer-current-time');

if (savedTime !== null) {
    player.setCurrentTime(savedTime).catch(e => console.error(e))
}

player.on('timeupdate', throttle(function name(e) {
    localStorage.setItem('videoplayer-current-time', e.seconds)
}, 1000))

