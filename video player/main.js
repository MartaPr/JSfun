const player = document.querySelector('.player');
const video = player.querySelector('.view');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress_filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player_slider');


function togglePlay() {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    console.log(this.dataset);
    video.currentTime += parseFloat(this.dataset.skip);
}

function rangeUpdate(){
    video[this.name] = this.value;
}

function progressUpdate() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function changeProgress(e) {
    const progressTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = progressTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton); 

video.addEventListener('timeupdate', progressUpdate);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', rangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', rangeUpdate));

let mousedown = false;
progress.addEventListener('click', () => {
    if(mousedown) {
        changeProgress(); 
    }
});

progress.addEventListener('mousemove', changeProgress);
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


