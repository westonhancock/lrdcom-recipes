function ping() {
    this.img = new Image();
    this.img.src = "/c/portal/extend_session?cachebreaker=" + new Date().getTime();
}

window.setInterval(function () { ping(); }, 600000);
