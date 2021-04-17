let can = document.getElementById("mycan");
let ctx = can.getContext("2d");


let loadImg = (src , callback ) =>
{
    let img = document.createElement("img");
    img.onload = () => callback(img);
    img.src =src;
};

let imgPath = (framenum,action) =>
{
    return action+"/"+framenum+".png";
};

let frames = {
    idle : [1, 2, 3, 4, 5, 6, 7, 8],
    kick : [1, 2, 3, 4, 5, 6, 7],
    punch : [1, 2, 3, 4, 5, 6, 7],
    backward :[1, 2, 3, 4, 5, 6],
    forward :[1, 2, 3, 4, 5, 6],
    block :[1, 2, 3, 4, 5, 6, 7, 8, 9],
}; 

let loadImgs = (callback) =>{
    //calls back with n array of imgs

    let images = { idle :[] , kick :[] , punch :[] , block:[] , forward : [] , backward:[]};
    let imgsToLoad = 0;
    
    ["idle", "punch", "kick" , "block", "forward" , "backward"].forEach((animation) => {

        let animationFrame = frames[animation]
        imgsToLoad = imgsToLoad + animationFrame.length

        animationFrame.forEach((frameno)=>{

            let path = imgPath(frameno, animation);
            
            loadImg(path, (image)=>
            {
                images[animation][frameno - 1] = image;
                imgsToLoad = imgsToLoad-1;
                if(imgsToLoad === 0 )
                {
                    callback(images);
                }   
            });
        });
    });
}

let animate = (ctx, images, animation ,callback) =>{
    images[animation].forEach((image, index)=>{
        setTimeout(()=>
        {
            ctx.clearRect(0,0, can.width , can.height);
            ctx.drawImage(image , 0, 0, 500, 500)
        }, index * 100 );
    });

    setTimeout(callback, images[animation].length * 100);
};

loadImgs((images) => {
    let queueAnimation = [];
    
    let aux = () => {
        let selectedAnimation ;
        if(queueAnimation.length === 0)
        {
            selectedAnimation = "idle";
        }
        else{
            selectedAnimation = queueAnimation.shift();
        }
        animate(ctx, images, selectedAnimation ,aux);
    };

    aux();

    document.getElementById("kick").onclick = () =>{
        queueAnimation.push("kick");
    };

    document.getElementById("punch").onclick = () =>{
        queueAnimation.push("punch");
    };

    document.getElementById("block").onclick = () =>{
        queueAnimation.push("block");
    };

    document.getElementById("backward").onclick = () =>{
        queueAnimation.push("backward");
    };

    document.getElementById("forward").onclick = () =>{
        queueAnimation.push("forward");
    };

    

    document.addEventListener("keyup", (event) =>{
        const key = event.key; //ArrowLeft , ArrowRight , ArrowUp , ArrowDown
        if(key === "ArrowLeft")
        {
            queueAnimation.push("kick");
        }

        else if(key === "ArrowRight"){
            queueAnimation.push("punch");
        }

        else if(event.keyCode == 32){
            console.log("Spcaebar pressed !!");
            queueAnimation.push("block");
        }

        else if(key === "ArrowUp"){
            queueAnimation.push("forward");
        }

        else if(key === "ArrowDown"){
            queueAnimation.push("backward");
        }
    });
});

document.body.style.backgroundImage = "/background.jpg";


window.onload = function() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("scream");
    ctx.drawImage(img, 10, 10);
  };