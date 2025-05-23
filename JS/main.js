window.addEventListener("load", function(){
	let start=document.querySelector("#start");
	let header=document.querySelector("header");
	let sectionList=document.querySelectorAll(".container section");
	let gnb=document.querySelector("#nav");
	let gnbList=gnb.querySelectorAll("li");
	let cont=document.querySelector(".controller");
	let contList=cont.querySelectorAll("li");
	let skills=document.querySelector("#skills");
	let footer=document.querySelector("#footer");
	let pageList=[start,...sectionList];
	let body=document.body;

	lenisAnimation();
	
	// 커스텀 마우스
	let mouseX = 0, mouseY = 0; // 마우스 위치 저장
	let cursorX = 0, cursorY = 0; // 커서 위치 저장
	
	document.addEventListener('mousemove', (event) => {
			mouseX = event.clientX;
			mouseY = event.clientY;
	});

	// a호버시 커스텀 마우스 크기조절
	document.querySelectorAll('a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        document.getElementById('customMouse').style.width = '6px';
        document.getElementById('customMouse').style.height = '6px';
    });

    link.addEventListener('mouseleave', () => {
        document.getElementById('customMouse').style.width = '16px'; // 원래 크기로 복귀
        document.getElementById('customMouse').style.height = '16px';
    });
	});
	
	// 애니메이션을 활용한 마우스 부드러운 이동
	function animateCursor() {
			const mouse = document.getElementById('customMouse');
			
			// LERP(선형 보간) 적용하여 부드럽게 이동
			cursorX += (mouseX - cursorX) * 0.9;
			cursorY += (mouseY - cursorY) * 0.9;
			
			mouse.style.top = `${cursorY}px`;
			mouse.style.left = `${cursorX}px`;
	
			requestAnimationFrame(animateCursor);
	}
	
	animateCursor(); // 애니메이션 시작

	// 헤더 픽시드
	window.addEventListener("scroll", function(){
		if(window.scrollY > 0){
				header.classList.add("fixed");
		}
		else{
			 	header.classList.remove("fixed");
		}
	});

	// 헤더 글자 띄우기
	const startTl=gsap.timeline();

	startTl.fromTo(".group_text h2", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.3 });
 	startTl.fromTo(".group_text p", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 });
 	startTl.fromTo(".group_text span", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 });

	// 특정구간에서 픽시드 요소 사라짐
	const fixedElement = document.getElementById("fixedElement");
	const contElement = document.getElementById("contName");

	window.addEventListener('scroll', () => {
		const scrollY = window.scrollY;

    // 화면 너비가 1281px 이상인지 확인
    if (window.innerWidth >= 1281) {
      // 2800px 스크롤했을 때 숨김
      if (scrollY > 2800) {
          fixedElement.classList.remove('hidden');
          contElement.classList.remove('hidden');
      } 
      // 1800px 이하로 스크롤했을 때 보이기
      else if (scrollY < 1800) {
          fixedElement.classList.remove('hidden');
          contElement.classList.remove('hidden');
      } 
      // 1800px과 2800px 사이에서는 숨김
      else {
          fixedElement.classList.add('hidden');
          contElement.classList.add('hidden');
        }
    }
		else {
			// 1281px 이하에서는 항상 보이기
			fixedElement.classList.remove('hidden');
			contElement.classList.remove('hidden');
    }
	});

	// 컨트롤
	function controlMenu(i){
		gnbList.forEach(function(item, j){
			if(j == i){
				item.classList.add("active");
			}
			else{
				item.classList.remove("active");
			}
		});
	}
	
	pageList.forEach(function(item, i){
		gsap.timeline({
			scrollTrigger: {
				trigger: item,
				start: "top center",
				end: "bottom center",
				onEnter: function(){
				controlMenu(i);
				},
				onEnterBack: function(){
				controlMenu(i);
				}
			}	
		});
	});

	// 네비게이션 클릭 이동
	gnbList.forEach(function(item, i){
		gnbList[i].addEventListener("click", function(e){
			 e.preventDefault();

			 topPos=pageList[i].offsetTop; // offseTop : 상단위치

			//  console.log(pageList[i]);
			 gsap.to(window, { scrollTo: topPos, duration: 0.4, onComplete: function(){
				gnb.classList.remove("active");
			}});
		});
	});

	// 컨트롤러 클릭 이동
	contList.forEach(function(item, c){
		contList[c].addEventListener("click", function(e){
			 e.preventDefault();

			 topPos=pageList[c].offsetTop; // offseTop : 상단위치

			//  console.log(pageList[c]);
			 gsap.to(window, { scrollTo: topPos, duration: 0.4 
		 });
		});
	});

	// 모든 비디오 재생
	const video = document.getElementById("myVideo");
	const ftVideo = document.getElementById("ftVideo");

	video.play().catch(function(error) {
			console.error("자동 재생 실패:", error);
	});
	ftVideo.play().catch(function(error) {
			console.error("자동 재생 실패:", error);
	});

	// 스킬 li 호버시 이미지 보이기
	$(function(){
		$("#skills .item-img").each(function(i, element){
			$(element).mousemove(function(e){
				let w=$(this).width();
				let h=$(this).height();
	
				let xVal=e.offsetX-w/2;
				let yVal=e.offsetY-h/2;
	
				gsap.to($(this).find("img"), { x: xVal/2, y: yVal/2 });
			});
		});
	});
	
	// 프로젝트 : 포지션 스티키 방법 ( 핀 방식 대신 사용 )
	const projectTl1=gsap.timeline({
		scrollTrigger: {
			trigger: ".main-project",
			start: "-10% 50%",
			end: "0 50%",
			scrub: 0,
			// markers: true
		}
	});

	projectTl1
	.to(".main-project .first", { width: "100%" }, "a")
	// .from(".main-project", { yPercent: 1 }, "a");

	const projectTl2=gsap.timeline({
		scrollTrigger: {
			trigger: ".main-project",
			scrub: 0,
			start: "0 0",
			end: "100% 100%"
			// markers: true
		}
	});

	projectTl2
	.to(".main-project .second", { transform: "translateY(0)" }, "a+=0.1")
	.to(".main-project .second", { width:"100%" }, "a")
	.to(".main-project .first .img-wrap", { opacity: 0 }, "a+=0.1")

	.to(".main-project .third", { transform: "translateY(0)" }, "b")
	.to(".main-project .third", { width:"100%"}, "b")
	.to(".main-project .first .img-wrap", { opacity:0}, "b-=0.1")

	.to(".main-project .fourth", { transform: "translateY(0)" }, "c")
	.to(".main-project .fourth", { width: "100%" }, "c")
	.to(".main-project .third .img-wrap", { opacity: 0 }, "c-=0.1")


	// 오픈소스 스와이퍼
	new Swiper(".updateSwiper", {
		slidesPerView: 1,
		centeredSlides: true,
		spaceBetween: 10,
		breakpoints: {
			768: {
				spaceBetween: 0,
				pagination: {
					el: ".updateSwiper .swiper-pagination",
					type: "fraction"
				},
				navigation: {
					prevEl: ".updateSwiper .swiper-button-prev",
					nextEl: ".updateSwiper .swiper-button-next"
				}
			}
		}
	});

	const mediaQuery=gsap.matchMedia();

	mediaQuery.add("(min-width: 769px)", function(){
		gsap.from(".comment .aosup", {
			y: 300,
			opacity: 0,
			duration: 0.8,
			scrollTrigger: {
				trigger: ".comment",
				scrub: true,
				start: "top 50%"
			}
		});

		let deviceWidth=window.innerWidth;

		const updateTl=gsap.timeline({
			scrollTrigger: {
				trigger: ".update",
				scrub: true,
				pin: true,
				start: "top top",
				end: "+="+1200
			}
		});

		updateTl.to(".update_top", {
			x: deviceWidth >= 1920 ? 414 : (deviceWidth >= 1024 ? 265 : 90)
		}, "ontime1");

		updateTl.to(".update_bottom", {
			x: deviceWidth >= 1920 ? -414 : (deviceWidth >= 1024 ? -265 : -90)
		}, "ontime1");

		updateTl.to(".update_top", { y: -200 }, "ontime2");

		updateTl.to(".update_bottom", { y: 200 }, "ontime2");

		updateTl.to(".updateSwiper", { display: "block", height: 400 }, "ontime2");

	});

	mediaQuery.add("(max-width: 768px)", function(){
		gsap.from(".comment .aosup", {
			y: 300,
			opacity: 0.6,
			duration: 1.5,
			scrollTrigger: {
				trigger: ".comment",
				scrub: true,
				start: "top 70%"
			}
		});

	});

	// 푸터 글자띄우기
	gsap.registerPlugin(ScrollTrigger);

	const footerTl = gsap.timeline({
		scrollTrigger: {
			trigger: ".ft_text", // 애니메이션을 적용할 요소
			start: "top 80%", // 요소가 뷰포트의 80%에 도달할 때 시작
			toggleActions: "play none none none", // 애니메이션 동작 설정
			once: true, // 애니메이션을 한 번만 실행
		}
	});

	// 애니메이션 정의
	footerTl.fromTo(".ft_text strong", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.3 });
	footerTl.fromTo(".ft_text span", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });
	footerTl.fromTo(".ft_text .box", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });

	// 라인 이펙트 호출
	function leftTextMotion(target){
		let track=document.querySelector(target);
		let trackText=track.firstElementChild;
		let clone=trackText.cloneNode(true);
		track.appendChild(clone);

		gsap.to(track, {
			x: -1*trackText.clientWidth,
			duration: 50,
			repeat: -1,
			ease: "none"
		});
	}

	function rightTextMotion(target){
		let track=document.querySelector(target);
		let trackText=track.firstElementChild;
		let clone=trackText.cloneNode(true);
		track.appendChild(clone);

		gsap.set(track, { x: -1*trackText.clientWidth });

		gsap.to(track, {
			x: 0,
			duration: 50,
			repeat: -1,
			ease: "none"
		});
	}

	leftTextMotion(".track.line1");
	rightTextMotion(".track.line2");
	leftTextMotion(".track.line3");
	rightTextMotion(".track.line4");
	leftTextMotion(".track.line5");
});