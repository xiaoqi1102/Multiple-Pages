window.onload = function() {
	//商品列表下拉		
	var menuWrapper = document.getElementById("menu-wrapper");
	var menu = document.getElementById("menu");
	var menuWrapperClassList = menuWrapper.classList;
	var backdrop = document.getElementById("menu-backdrop");
	var menubackdroptwo = document.getElementById("menu-backdroptwo");
	var iconmenuleft = document.getElementById("icon-menu-left");
	var menutwo = document.getElementById("menutwo");
	var menuWrappertwo = document.getElementById("menu-wrappertwo");
	var menuWrappertwoClassList = menuWrappertwo.classList;
	var iconmenuright = document.getElementById("icon-menu-right");
	var info = document.getElementById("info");
	var infotwo = document.getElementById("infotwo");
	
	backdrop.addEventListener('tap', toggleMenu);
	iconmenuleft.addEventListener('tap',toggleMenu);
	
	
	//下沉菜单中的点击事件
	mui('#menu').on('tap', 'a', function() {
		toggleMenu();
		info.innerHTML = this.innerHTML;
	});
	var busying = false;

	function toggleMenu() {
		if (busying) {
			return;
		}
		busying = true;
		if (menuWrapperClassList.contains('mui-active')) {
			document.body.classList.remove('menu-open');
			menuWrapper.className = 'menu-wrapper fade-out-up animated menu-wrapper-left';
			menu.className = 'menu bounce-out-up animated';
			setTimeout(function() {
				backdrop.style.opacity = 0;
				menuWrapper.classList.add('hidden');
				menuWrapper.style.zIndex = 60;
			}, 500);
		} else {
			document.body.classList.add('menu-open');
			menuWrapper.className = 'menu-wrapper fade-in-down animated mui-active menu-wrapper-left';
			menu.className = 'menu bounce-in-down animated';
			info.className ='action';
			backdrop.style.opacity = 1;
			backdrop.style.zIndex = 998;
		}
		setTimeout(function() {
			busying = false;
		}, 500);
	}
	//下沉菜单中的点击事件------右边的下拉菜单
	menubackdroptwo.addEventListener('tap', toggleMenuright);
	iconmenuright.addEventListener('tap',toggleMenuright);
	
	mui('#menutwo').on('tap', 'a', function() {
		toggleMenuright();
		infotwo.innerHTML = this.innerHTML;
	});
	var busying = false;
	function toggleMenuright() {
		if (busying) {
			return;
		}
		busying = true;
		if (menuWrappertwoClassList.contains('mui-active')) {
			document.body.classList.remove('menu-open');
			menuWrappertwo.className = 'menu-wrapper fade-out-up animated menu-wrapper menu-wrapper-right';
			menutwo.className = 'menu bounce-out-up animated';
			setTimeout(function() {
				menubackdroptwo.style.opacity = 0;
				menuWrappertwo.classList.add('hidden');
				menubackdroptwo.style.zIndex = 60;
			}, 500);
		} else {
			document.body.classList.add('menu-open');
			menuWrappertwo.className = 'menu-wrapper fade-in-down animated mui-active menu-wrapper menu-wrapper-right';
			menutwo.className = 'menu bounce-in-down animated';
			infotwo.className ='action';
			menubackdroptwo.style.opacity = 1;
			menubackdroptwo.style.zIndex = 998;
		}
		setTimeout(function() {
			busying = false;
		}, 500);
	}
	//totop		
	function backTop(btnId){
		var btn = document.getElementById(btnId);
		var d = document.documentElement;
		var b = document.body;
		window.onscroll = btnDisplay;
		btn.onclick = function (){
			btn.style.display = "block";
			window.onscroll = null;
			this.timer = setInterval(function(){
				d.scrollTop -= Math.ceil((d.scrollTop+b.scrollTop)*0.1);
				b.scrollTop -= Math.ceil((d.scrollTop+b.scrollTop)*0.1);
				if((d.scrollTop + b.scrollTop) == 0)
					clearInterval(btn.timer,window.onscroll = btnDisplay);
			},10);
		};
		function btnDisplay(){
			btn.style.display=(d.scrollTop+b.scrollTop>200)?'block':"block";
		}
	}
	backTop('totop');//返回顶部调用
};