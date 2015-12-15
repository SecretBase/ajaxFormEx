$(document).ready(function(e) {

    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });

});
