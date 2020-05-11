var socket = io();
function makeEmbedURL(url) {
    // regular expressions for url filtering
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|(?<=clip\/))([^#&?]*).*/;
    const match = url.match(regExp);
    const regExp2 = /(youtube|youtu\.be|twitch)/;
    const match2 = url.match(regExp2);

    // not match for a youtube link or twitch clip
    if (!match) throw 'Not an acceptable video link';

    // do youtube embed url for youtube urls
    if ((match2 && match2[0] == 'youtube') || match2[0] == 'youtu.be') {
        return 'https://www.youtube.com/embed/' + match[2];
    }
    // do twitch embed for twitch urls
    if (match2 && match2[0] == 'twitch') {
        return 'https://clips.twitch.tv/embed?clip=' + match[2];
    }

    throw 'Not an acceptable video link';
}

window.onload = function () {
    var form = document.getElementById('chatForm');

    form.onsubmit = function (e) {
        e.preventDefault();
        var messageInput = document.getElementById('m');
        try {
            socket.emit('post clip', makeEmbedURL(messageInput.value));
            messageInput.value = '';
            window.location.href = '/';
            return false;
        } catch (err) {
            alert(err);
        }
    };
};
