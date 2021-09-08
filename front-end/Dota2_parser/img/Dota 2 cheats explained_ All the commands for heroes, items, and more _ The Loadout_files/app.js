function readPermutiveMeta(ifs) { 
    console.log('IFS' + ifs);
    console.log('READING PERMUTIVE META');
    var schemas = document.getElementsByClassName('hidden_meta');
    if (schemas.length > 0) {
        schema = schemas[schemas.length - 1];
        window.AdSlots.meta = JSON.parse(schema.innerHTML);
        console.log(window.AdSlots.meta);
        if (typeof nnads.fn.dmp != 'undefined' && typeof nnads.fn.dmp.pageview === 'function' && ifs) {
            console.log('Sending Permutive Pageview');
            nnads.fn.dmp.pageview();
        }        
    }
} 

function launchPermutive() {
    if(typeof nnads !== 'undefined') {
        readPermutiveMeta(true);
    } else {
        setTimeout(function() {
            launchPermutive();
        },3000);
    }
}

window.addEventListener("NextPageInView", function(e) {  readPermutiveMeta(true); });
window.addEventListener("DOMContentLoaded", function(e) {  launchPermutive() });

