function lenisAnimation(){
	const lenis=new Lenis({
		duration: 1.3,
		easing: t => Math.min(1, 1.001-Math.pow(2, -10*t))
	});

	function raf(time){
		lenis.raf(time);
		requestAnimationFrame(raf);
	}

	requestAnimationFrame(raf);
}