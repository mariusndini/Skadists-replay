function init() {
	console.log("Banner Initiated")
	TweenMax.set([ viewport, border, logo, background1], { autoAlpha: 1 })
	frameOne();
}


function frameOne() {
	TweenMax.set([
		text1
	], {autoAlpha:1});
	var delay = 2.75;

	TweenMax.to([text1], {duration:0.3, autoAloha:0, delay:delay});

	TweenMax.delayedCall(delay, frameTwo);
}

function frameTwo() {
	
	TweenMax.set([
		background2
	], {autoAlpha:1});
	TweenMax.from([background2],  0.3, {autoAlpha:0, delay:0.3});
	var delay = 2.75;
	TweenMax.delayedCall(delay, frameThree);
}

function frameThree() {
	TweenMax.set([
		background3
	], {autoAlpha:1});
	TweenMax.from([background3],  0.3, {autoAlpha:0, delay:0.3});
	var delay = 2.75;
	TweenMax.delayedCall(delay, frameFour);
}

function frameFour() {
	TweenMax.set([
		background4
	], {autoAlpha:1});
	TweenMax.from([background4],  0.3, {autoAlpha:0, delay:0.3});

}

