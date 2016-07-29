window.addEventListener("load", function () {
    var svgsymbols = document.querySelectorAll("symbol");
    var spritesheet = document.getElementById("spritesheet");
    console.log(svgsymbols);
    for (var i = 0; i < svgsymbols.length; i++) {
        
        var symbolid = svgsymbols[i].id;
        console.log(symbolid);
        var usehtml = "<svg><use xlink:href=\"#" + symbolid + "\"></use></svg>";
        spritesheet.innerHTML += "<div><div>" + symbolid + "</div>" + "<pre>" + escapeHtml(usehtml) + "</pre>" + usehtml + "</div>";
    }
});

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }