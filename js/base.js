// FASTCLICK STUFF
window.addEventListener('load', function() {
    FastClick.attach(document.body);
}, false);


(function (document) {

    //var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 120; 
    //150 for height of top bar

    var screens = document.querySelectorAll('.screen');

    for(var i = 0; i < screens.length; i++) {
        screens[i].setAttribute('style', 'height: ' + h + 'px;');
    }
})(document);

// TABS STUFF
(function (document) {

/*
    var labels = document.querySelectorAll('.tabs label');



    for(var i = 0; i < labels.length; i++) {
        labels[i].addEventListener('click', function(e) {
            console.log(this.getAttribute('for'));
        });
    }
    */

})(document);

// BUTTON STUFF

(function (document) {

    function check_code(code) {
        console.log('check code: ' + code);
        document.querySelector('.stay').style['background-color'] = 'green';
        document.querySelector('input#tab2').checked = true;

        document.querySelector('li#rate-tab').classList.remove('hidden');
        document.querySelector('li#diff-tab').classList.remove('hidden');
    }

    function clear_code() {
        document.querySelector('.stay').style['background-color'] = '#666';
        document.querySelector('input#tab1').checked = true;

        document.querySelector('li#diff-tab').classList.add('hidden');
        document.querySelector('li#rate-tab').classList.add('hidden');
    }

    var buttons = document.querySelectorAll('.button');
    var nums = document.querySelectorAll('.num');
    var clear = document.querySelectorAll('.clear')[0];
    var entry = [];


    for(var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function(e) { 
            if (entry.length < nums.length) {
                entry.push(this.dataset.val);
                nums[entry.length-1].innerHTML = this.dataset.val
            } 

            if (entry.length > 3) {
                //is this a valid button combination?
                check_code(entry.join(''));
            }

        });
    }

    clear.addEventListener('click', function(e) {
        entry = [];
        for(var i = 0; i < nums.length; i++) {
            nums[i].innerHTML = '&nbsp';
            clear_code();
        }
    });

})(document);


// RATINGS

(function (document, d3) {
    var stars = [3,10,2,4,0];
    var diffs = [4,2,7,7,13];

    var stars_max = Math.max.apply(null, stars);
    var diffs_max = Math.max.apply(null, diffs);


    d3.select(".chart.stars")
    .selectAll("div")
    .data(stars)
    .enter().append("div")
    .style("height", function(d) { return ((d+1) / (stars_max+1)) * 100 + "%"; })
    .text(function(d) { return d; })

    d3.select(".chart.diff")
    .selectAll("div")
    .data(diffs)
    .enter().append("div")
    .style("height", function(d) { return ((d+1) / (diffs_max+1)) * 100 + "%"; })
    .text(function(d) { return d; });

})(document, d3);
