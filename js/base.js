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

    var buttons = document.querySelectorAll('.keypad .button');
    var nums = document.querySelectorAll('.num');
    var clear = document.querySelector('.clear.button');
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

    function update_rating(stars, my_rate) {

        var my_stars = stars.slice();

        if (typeof my_rate !== undefined) {
            my_stars[my_rate]++;
        }

        var stars_max = Math.max.apply(null, my_stars);

        var s = d3.select("#chart-stars .bars")
            .selectAll("div");
        
        s
            .data(my_stars)
            .enter().insert("div", ":first-child");

        s
            .style("height", function(d) { return ((d+1) / (stars_max+1)) * 100 + "%"; })
            .text(function(d) { return d; })
    }

    function update_diff(diffs, my_diff) {

        var my_diffs = diffs.slice();

        if (typeof my_diff!== undefined) {
            my_diffs[my_diff]++;
        }

        var diffs_max = Math.max.apply(null, my_diffs);

        var s = d3.select("#chart-diff .bars")
            .selectAll("div");
        
        s
            .data(my_diffs)
            .enter().insert("div", ":first-child");

        s
            .style("height", function(d) { return ((d+1) / (diffs_max+1)) * 100 + "%"; })
            .text(function(d) { return d; })
    }

    update_rating(stars);
    update_diff(diffs);

    var starbuts = document.querySelectorAll('#chart-stars .button');
    var diffbuts = document.querySelectorAll('#chart-diff .button');

    for(var i = 0; i < starbuts.length; i++) {
        starbuts[i].addEventListener('click', function(e) { 

            update_rating(stars, this.dataset.val-1);
        })
    }

    for(var i = 0; i < diffbuts.length; i++) {
        diffbuts[i].addEventListener('click', function(e) { 

            update_diff(diffs, this.dataset.val-1);
        })
    }



})(document, d3);
