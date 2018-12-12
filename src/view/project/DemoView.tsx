const m = require('mithril')
import A from 'actions'
import AppState from 'model/AppState'
import store from 'store'
import { map } from 'ramda'
import { tween, styler, easing } from 'popmotion';

import { objOf } from 'ramda'

const drawElement = (ae: any) => (element: any) => {
    const pos = element.area;
    const s = store.getState();
    const time = s.ui.player.time      

    const styling = {
      left: pos[0],
      top: pos[1],
      position: 'absolute',
      zIndex: 1,
      fontSize: element.size,
      color: element.color.hex,
      backgroundColor: element.background.hex,
      lineHeight: element.lineHeight + 'px',
      letterSpacing: element.letterSpacing + 'px',
      paddingTop: element.verticalPadding + 'px',
      paddingBottom: element.verticalPadding + 'px',
      paddingLeft: element.horizontalPadding + 'px',
      paddingRight: element.horizontalPadding + 'px',
      fontStyle: element.italic ? 'italic' : 'normal',
      fontWeight: element.bold ? 'bold' : 'normal',
      fontFamily: element.font.value,
      textAlign: element.textAlign,
      textTransform: element.uppercase ? 'uppercase' : '',
			display: time >= element.time ? (element.listshow ? 'list-item' : 'block') : 'none',
			listStylePosition: element.listshow ? 'inside' : '',
			opacity: element.transparency/100
    }

    let interval = Math.round(time) - Math.round(element.time);
    if(s.ui.player.playing && (interval === 0 || interval === -1 || interval === 1) && element.animationId){
			const animationElement = document.getElementById(element.id);
			const divStyler = styler(animationElement, null);
			
			if(element.animationId === 1){
					animationElement.classList.add("magictime");
					animationElement.classList.add("puffIn");
			}
			if(element.animationId === 2){
					animationElement.classList.add("magictime");
					animationElement.classList.add("twisterInDown");
			}
			if(element.animationId === 3){
					animationElement.classList.add("magictime");
					animationElement.classList.add("boingInUp");
			}
			if(element.animationId === 4){
					tween({ to: 200, duration: 500 })
							.start(v => divStyler.set('x', v));
			}
			if(element.animationId === 5){
					tween({
							from: 0,
							to: { x: 200, rotate: 180 },
							duration: 2000,
							ease: easing.backOut
					}).start(divStyler.set);
			}
    }

    if(ae.id === element.id){
			setTimeout(()=>{
				var target: any = document.getElementsByClassName('active-element')[0];
				var transformControl = document.getElementById('transform-control');
				transformControl.style.webkitTransform =
				transformControl.style.transform =
					target.style.transform;

				let scaleValue = target.getAttribute('data-scale') ? target.getAttribute('data-scale') : 1
				transformControl.style.width = (Number(window.getComputedStyle(target, null).width.replace('px', ''))/scaleValue+10).toString();
				transformControl.style.height = (Number(window.getComputedStyle(target, null).height.replace('px', ''))/scaleValue+10).toString();
				transformControl.style.left = (Number(window.getComputedStyle(target, null).left.replace('px', ''))-5).toString();
				transformControl.style.top = (Number(window.getComputedStyle(target, null).top.replace('px', ''))-5).toString();
				transformControl.style.display = 'block';

				var $rotateControl = document.getElementById('rotate-control')
				$rotateControl.addEventListener('mousedown', onMouseDown)
				dragElement(target, transformControl, element);
				makeResizableDiv(element);
			}, 100)
    }
    return (
        <div id={element.id} onclick={e => store.dispatch(A.Element.select(element.id))} class={ae.id === element.id ? "active-element" : ""} style={styling}>
            {element.value}
        </div>
    )
}

//element rotation
const onMouseMove = e => {
    var $box:any = document.getElementsByClassName('active-element')[0];
    let boxBoundingClientRect = $box.getBoundingClientRect()
    let x = boxBoundingClientRect.left + boxBoundingClientRect.width / 2
    let y = boxBoundingClientRect.top + boxBoundingClientRect.height / 2
    let rad = Math.atan2(e.pageX - x, e.pageY - y)
    let rot = (rad * (180 / Math.PI) * -1) + 180
    let clearedTransformStyle = $box.style.transform.replace(/rotate\(.*deg\)/, '');
    $box.style.transform = clearedTransformStyle+' '+'rotate(' + rot + 'deg)'

    var $transform:any = document.getElementById('transform-control');
    let transformBoundingClientRect = $transform.getBoundingClientRect()
    let xT = transformBoundingClientRect.left + transformBoundingClientRect.width / 2
    let yT = transformBoundingClientRect.top + transformBoundingClientRect.height / 2
    let radT = Math.atan2(e.pageX - xT, e.pageY - yT)
    let rotT = (radT * (180 / Math.PI) * -1) + 180
    let clearedTransformStyleT = $transform.style.transform.replace(/rotate\(.*deg\)/, '');
    $transform.style.transform =clearedTransformStyleT+' '+'rotate(' + rotT + 'deg)'
}
  
const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
}

const onMouseDown = () => {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
}
//end of element rotation

//drag element
const dragElement = (elmnt, transformControl, elementProp) => {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	elmnt.onmousedown = dragMouseDown;

	var flag = 0;
	
	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		flag = 0;
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		flag = 1;
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

		transformControl.style.top = (elmnt.offsetTop - pos2-5) + "px";
		transformControl.style.left = (elmnt.offsetLeft - pos1-5) + "px";
	}

	function closeDragElement(e) {
		var top = elmnt.offsetTop - pos2;
		var left = elmnt.offsetLeft - pos1;
		var area = elementProp.area;
		if(flag === 1){
			area[0] = left;
			area[1] = top;
			store.dispatch(A.Element.update(objOf('area', area)));
		}
		/* stop moving when mouse button is released:*/
		document.onmouseup = null;
		document.onmousemove = null;
	}
}
//end of drag element

//resize element
const makeResizableDiv = (elementProp) => {
	var area = elementProp.area;
	const element:any = document.getElementsByClassName('active-element')[0];
	var transformControl = document.getElementById('transform-control');
	const resizers = document.getElementsByClassName('resizer');
	let original_width = 0;
	let original_height = 0;
	let original_x = 0;
	let original_y = 0;
	let original_mouse_x = 0;
	let original_mouse_y = 0;
	for (let i = 0;i < resizers.length; i++) {
		const currentResizer = resizers[i];
		currentResizer.addEventListener('mousedown', function(e:any) {
			e.preventDefault()
			original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
			original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
			original_x = parseFloat(getComputedStyle(element, null).getPropertyValue('left').replace('px', ''));
			original_y = parseFloat(getComputedStyle(element, null).getPropertyValue('top').replace('px', ''));
			original_mouse_x = e.pageX;
			original_mouse_y = e.pageY;
			window.addEventListener('mousemove', resize)
			window.addEventListener('mouseup', stopResize)
		})
		
		function resize(e:any) {
			if (currentResizer.classList.contains('bottom-right')) {
				element.style.width = original_width + (e.pageX - original_mouse_x)  + 'px'
				element.style.height = original_height + (e.pageY - original_mouse_y)  + 'px'

				transformControl.style.width = original_width + (e.pageX - original_mouse_x)+10  + 'px'
				transformControl.style.height = original_height + (e.pageY - original_mouse_y)+10  + 'px'
			}
			else if (currentResizer.classList.contains('bottom-left')) {
				element.style.width = original_width - (e.pageX - original_mouse_x)  + 'px'
				element.style.height = original_height + (e.pageY - original_mouse_y)  + 'px'
				element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'

				transformControl.style.width = original_width - (e.pageX - original_mouse_x) + 10 + 'px'
				transformControl.style.height = original_height + (e.pageY - original_mouse_y) + 10 + 'px'
				transformControl.style.left = original_x + (e.pageX - original_mouse_x) -5 + 'px'

				area[0] = original_x + (e.pageX - original_mouse_x);
			}
			else if (currentResizer.classList.contains('top-right')) {
				element.style.width = original_width + (e.pageX - original_mouse_x)  + 'px'
				element.style.height = original_height - (e.pageY - original_mouse_y)  + 'px'
				element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'

				transformControl.style.width = original_width + (e.pageX - original_mouse_x) + 10  + 'px'
				transformControl.style.height = original_height - (e.pageY - original_mouse_y) + 10  + 'px'
				transformControl.style.top = original_y + (e.pageY - original_mouse_y) - 5 + 'px'

				area[1] = original_y + (e.pageY - original_mouse_y)
			}
			else {
				element.style.width = original_width - (e.pageX - original_mouse_x)  + 'px'
				element.style.height = original_height - (e.pageY - original_mouse_y)  + 'px'
				element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
				element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'

				transformControl.style.width = original_width - (e.pageX - original_mouse_x) + 10  + 'px'
				transformControl.style.height = original_height - (e.pageY - original_mouse_y) + 10 + 'px'
				transformControl.style.top = original_y + (e.pageY - original_mouse_y) - 5 + 'px'
				transformControl.style.left = original_x + (e.pageX - original_mouse_x) - 5 + 'px'

				area[0] = original_x + (e.pageX - original_mouse_x);
				area[1] = original_y + (e.pageY - original_mouse_y)
			}
		}
		
		function stopResize() {
			store.dispatch(A.Element.update(objOf('area', area)));
			window.removeEventListener('mousemove', resize)
		}
	}
}
//end of resize element

const DemoView = {
  view: function () {
    const s = store.getState();
    const scene = AppState.getActiveScene(s);
    const ae = AppState.getActiveElement(s);
    return (
        <div id="demo">
            <div class='demo-inner' id='demo-inner' style={{backgroundColor: 'white', width: '100%', height: '100%', position: 'relative'}}>
                { scene ? map(drawElement(ae), scene.elements) : null }
                {ae ? <div id='transform-control' style={{left: ae.area[0]-1, top: ae.area[1]-1, position: 'relative', display: 'none'}}>
                    <div id='rotate-control'></div>
                    <div class='resizers'>
                        <div class='resizer top-left'></div>
                        <div class='resizer top-right'></div>
                        <div class='resizer bottom-left'></div>
                        <div class='resizer bottom-right'></div>
                    </div>
                </div> : null }
            </div>
            <div id="menu">
                <ul class="menu-options">
                    <li class="menu-option" onclick={() => store.dispatch(A.Element.update({ animationId: 1 }))}>Animation 1</li>
                    <li class="menu-option" onclick={() => store.dispatch(A.Element.update({ animationId: 2 }))}>Animation 2</li>
                    <li class="menu-option" onclick={() => store.dispatch(A.Element.update({ animationId: 3 }))}>Animation 3</li>
                    <li class="menu-option" onclick={() => store.dispatch(A.Element.update({ animationId: 4 }))}>Animation 4</li>
                    <li class="menu-option" onclick={() => store.dispatch(A.Element.update({ animationId: 5 }))}>Animation 5</li>
                </ul>
            </div>
        </div>)
  },

  oncreate: function (vnode: any) {
    const toggleMenu = command => {
			let menu = document.getElementById("menu");
			menu.style.display = command === "show" ? "block" : "none";
    };

    const setPosition = ({ top, left }) => {
			let menu = document.getElementById("menu");

			menu.style.left = `${left}px`;
			menu.style.top = `${top}px`;
			toggleMenu("show");
    };

    window.addEventListener("click", e => {
			let menu = document.getElementById("menu");
			if(menu.style.display === 'block')toggleMenu("hide");
    });

    window.addEventListener("contextmenu", e => {
			let activeStage = document.getElementsByClassName('active-element')[0];
			if(activeStage){
				var activeRect = activeStage.getBoundingClientRect();

				let mouseX = e.clientX;
				let mouseY = e.clientY;
				if(mouseX < activeRect.left + activeRect.width && mouseX > activeRect.left && 
						mouseY < activeRect.top + activeRect.height && mouseY > activeRect.top ){
					e.preventDefault();
					let stage = document.getElementById('demo-inner');

					let rect = stage.getBoundingClientRect();
					const origin = {
							left: mouseX - rect.left,
							top: mouseY - rect.top
					};
					setPosition(origin);
					return false;
				}
			}        
    });    
  }
}

export default DemoView
