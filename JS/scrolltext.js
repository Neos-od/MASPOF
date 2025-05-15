function scrollText(pTags, textArrays){
	let counts=pTags.map(item => 0);

	const fullTexts=textArrays.map(item => item.concat(item).join("\u00A0\u00A0"));

	function initText(element, fullText){
		element.innerText=fullText;
	}

	function marqueeText(count, element, direction){
		if(count > element.scrollWidth/2){
			count=0;
		}

		element.style.transform=`translate3d(${direction*count}px, 0, 0)`;

		return count;
	}

	function animate(){
		counts=counts.map((item, i) => {
			item++;

			return marqueeText(item, pTags[i], i%2 === 0 ? -1 : 1);
		});

		window.requestAnimationFrame(animate);
	}

	function scrollHandler(){
		counts=counts.map(count => count + 0.5);
	}

	window.addEventListener("scroll", scrollHandler);

	fullTexts.forEach((item, i) => initText(pTags[i], item));

	animate();
}