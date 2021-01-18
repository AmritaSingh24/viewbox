
// Inject Viewbox HTML at the end of body tag.
const divElement = document.createElement('div');
divElement.classList.add('images-viewer-model') //add class attribute in div;
divElement.innerHTML = `<div class="overlay"></div>
		<div class="viewer-image">
			<img src="https://picsum.photos/id/217/500/300" alt="">
		</div>
		<div class="control play-pause">
			<img src="images/play.png">
		</div>
		<div class="info">1/6</div>
		<div class="control close">
			<img src="images/close.png">
		</div>
		<div class="control forward">
			<img src="images/next.png">
		</div>
		<div class="control backward">
			<img src="images/prev.png">
		</div>
		`;
//console.log(divElement)
const body = document.querySelector('body');
body.appendChild(divElement)


// class defination of viewbox
class viewbox1{
	imageTransitionTiming = 500;
    slideShowTime = 1500;
	model = document.querySelector('.images-viewer-model');
	modelOverlay = document.querySelector('.images-viewer-model .overlay');
	modelImg = document.querySelector('.images-viewer-model .viewer-image img');
	modelCloseBtn = document.querySelector('.images-viewer-model .close');
	modelNextBtn = document.querySelector('.images-viewer-model .forward');
	modelPreBtn = document.querySelector('.images-viewer-model .backward');
	modelPlayPauseBtn = document.querySelector('.images-viewer-model .play-pause');
    modelImgInfo = document.querySelector('.images-viewer-model .info');
    images;
    currImgIndex;
    isSlideShowWorking = false;
    timevar1;
    timevar2;

	constructor(imgpath){

	    this.images = document.querySelectorAll(imgpath);
	    //console.log(this.images);

	     //add click event on each image
	    this.images.forEach((image,index)=>{
	    	image.onclick = ()=>{
	    		this.viewimage(index)
	    	}
	    });

	    //add close event for close icon and overlay
	    this.modelCloseBtn.onclick = this.closeFn;
	    this.modelOverlay.onclick = this.closeFn;

	    //next img btn
	    this.modelNextBtn.onclick = ()=>{
	    	
	    	clearTimeout(this.timevar1)
	    	this.modelPlayPauseBtn.firstElementChild.src = 'images/play.png'
	    	this.isSlideShowWorking = false;
	    	this.currImgIndex++;
	    	this.viewimage(this.currImgIndex);
	    }

	    //prev img btn
	    this.modelPreBtn.onclick = ()=>{

	    	clearTimeout(this.timevar1)
	    	this.modelPlayPauseBtn.firstElementChild.src = 'images/play.png'
	    	this.isSlideShowWorking = false;
	    	this.currImgIndex--;
	    	this.viewimage(this.currImgIndex);
	    }

	    //slide show 
	    this.modelPlayPauseBtn.onclick = ()=>{
	    	
	    	if (this.isSlideShowWorking) {

	    		clearTimeout(this.timevar1);
	    		this.isSlideShowWorking = false;
	    		this.modelPlayPauseBtn.firstElementChild.src = 'images/play.png'

	    	}else{

	    		this.isSlideShowWorking = true;
	    	    this.slideShow();
	    	    this.modelPlayPauseBtn.firstElementChild.src = 'images/pause.png'
	        }
	    }
	}

	 //to show the image by passing image index
	viewimage = (imagei)=>{

		clearTimeout(this.timevar2)
		if (imagei > this.images.length - 1) {
			imagei = 0;
		}
		if (imagei < 0) {
			imagei = this.images.length - 1;
		}

		 //model animation
		this.model.style.display = 'block';
		setTimeout(()=>{
			this.model.style.opacity = '1';
		})

		//updating image info
		this.modelImgInfo.textContent = `${imagei+1} / ${this.images.length}`;


        //image animation
		this.modelImg.style.opacity = 0;
		this.timevar2 = setTimeout(()=>{
            this.modelImg.src = this.images[imagei].src;
            this.modelImg.style.opacity = '1';
        },this.imageTransitionTiming)

        this.currImgIndex = imagei;
	}

	// close model function
	closeFn = ()=>{

		clearTimeout(this.timevar1)
		this.modelPlayPauseBtn.firstElementChild.src = 'images/play.png'
		this.isSlideShowWorking = false;

		this.model.style.opacity = '0';
		setTimeout(()=>{
			this.model.style.display = 'none';
		},500)

	}

	//slide show function
	slideShow = ()=>{

		this.currImgIndex++;
		this.viewimage(this.currImgIndex);
	    
	    this.timevar1 = setTimeout( ()=>{
	    	this.slideShow()
	    },this.slideShowTime)
	}

	//for customization. should be called by user expicitly only
	option = (obj)=>{
		if (typeof(obj) != 'object') {
			throw "Bad parameter passed. Object Expected";			
		}
		if (obj.backgroundOpacity) {
			this.modelOverlay.style.backgroundColor = `rgba(0,0,0,${obj.backgroundOpacity})`
		}

		if (obj.imageTransTimimg) {
			this.modelImg.style.transitionDuration = `${obj.imageTransTimimg/2}s`
			this.imageTransitionTiming = (obj.imageTransTimimg/2)*1000
		}

		this.slideShowTime = (obj.slideShowTiming) ? obj.slideShowTiming * 1000 :  1500;
	    this.modelNextBtn.style.display = (obj.disableNavigation) ? 'none' : 'block';
	    this.modelPreBtn.style.display = (obj.disableNavigation) ? 'none' : 'block';
	    this.modelPlayPauseBtn.style.display = (obj.disableSlideShow) ? 'none' : 'block';
	    this.modelImgInfo.style.display = (obj.disableInfo) ? 'none' : 'block';

	}
	
}

 const obj = new viewbox1('[viewbox]');
 