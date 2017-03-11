var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var mode,originalEvent,dataTransfer,files,select=false,erase=false,paint=false,er,s,p;
var uploadItem = function(item){
  var fileReader = new FileReader();

  fileReader.onload = function(e){
    var img = new Image();
    img.src = e.target.result;
    img.onload = function(){
      canvas.width  = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
    };
  };

  fileReader.readAsDataURL(item);
};
var convolution = function(matrix,imgData,offset){
    var px=imgData;
    var data=ctx.getImageData(0,0,canvas.width,canvas.height);
    var tmpPx=new Uint8ClampedArray(px.length);
    var m = [].concat(matrix[0], matrix[1], matrix[2]);
    for(var i=0;i<imgData.length;i++){
      tmpPx[i]=px[i];
    }
    for(var i=0;i<imgData.length;i++){
      if(i%4===3){continue;}
      var res=0;
      var these=[tmpPx[i],
        (tmpPx[i-4] || tmpPx[i]),
        (tmpPx[i+4] || tmpPx[i]),
        (tmpPx[i-4*data.width] || tmpPx[i]),
        (tmpPx[i-4*data.width] || tmpPx[i]),
        (tmpPx[i-4*data.width-4] || tmpPx[i]),
        (tmpPx[i-4*data.width+4] || tmpPx[i]),
        (tmpPx[i-4*data.width+4] || tmpPx[i]),
        (tmpPx[i-4*data.width-4] || tmpPx[i])
      ];
      for (var j = 0; j < 9; j++) {
        res += these[j] * m[j];
      }
      px[i]=res+offset;
    }
    return px;
}
var filters = {
  blur:function(imgData){
    var px=imgData;
    var data=ctx.getImageData(0,0,canvas.width,canvas.height);
    var tmpPx=new Uint8ClampedArray(px.length);
    for(var i=0;i<imgData.length;i++){
      tmpPx[i]=px[i];
    }
    for(var i=0;i<imgData.length;i++){
      if(i%4===3){continue;}
      px[i]=(tmpPx[i]
        +(tmpPx[i-4] || tmpPx[i])
        +(tmpPx[i+4] || tmpPx[i])
        +(tmpPx[i-4*data.width] || tmpPx[i])
        +(tmpPx[i-4*data.width] || tmpPx[i])
        +(tmpPx[i-4*data.width-4] || tmpPx[i])
        +(tmpPx[i-4*data.width+4] || tmpPx[i])
        +(tmpPx[i-4*data.width+4] || tmpPx[i])
        +(tmpPx[i-4*data.width-4] || tmpPx[i])
      )/9;
    }
    return px;
  },
  sharpen:function(imgData){
    var matrix=[[-1, -1, -1],
                [-1,  9, -1],
                [-1, -1, -1]];
    var offset=0;
    return convolution(matrix,imgData,offset);
  },
  emboss:function(imgData){
    var matrix=[[ 2,  0,  0],
                [ 0, -1,  0],
                [ 0,  0, -1]];
    var offset=127;
    return convolution(matrix,imgData,offset);
  },
  sepia: function(imgData){
    var sp = imgData;
    for(var i = 0; i < imgData.length; i+=4){
      var r = sp[i];
      var g = sp[i + 1];
      var b = sp[i + 2];
      sp[i]= (r * 0.393)+(g * 0.769)+(b * 0.189); 
      sp[i + 1] = (r * 0.349)+(g * 0.686)+(b * 0.168); 
      sp[i + 2] = (r * 0.272)+(g * 0.534)+(b * 0.131); 
    }
    return sp;
  },
  brightness: function(imgData){
    var sp = imgData;
    var adjustment=20;
    for(var i = 0; i < imgData.length; i+=4){
      sp[i] += adjustment;
      sp[i+1] += adjustment;
      sp[i+2] += adjustment;
    }
    return sp;
  },
  grayscale: function(imgData){
    var sp = imgData;
    var adj=5;
    for(var i = 0; i < imgData.length; i+=4){
      var r = sp[i];
      var g = sp[i+1];
      var b = sp[i+2];
      var v = 0.2126*r + 0.7152*g + 0.0722*b;
      sp[i] = sp[i+1] = sp[i+2] = v
    }
    return sp;
  },
  inverse: function(imgData){
    var sp = imgData;
    var ll = function(vl){
      return 255 - vl;
    };
    for(var i = 0; i < imgData.length; i+=4){
      sp[i] = ll(sp[i]);
      sp[i+1] = ll(sp[i+1]);
      sp[i+2] = ll(sp[i+2]);
    }
    return sp;
  },

  noise: function(imgData){
    var sp = imgData;
    var coefficient = 0.02;
    var ll = function(vl){
      var g_VALUE = Math.random()*100;
      if(g_VALUE <= coefficient*100){
        if(Math.floor(Math.random()*25) == 2)
          return 255;
        else
          return vl;
      }
      return vl;
    };

    for(var i = 0; i < imgData.length; i+=4){
      sp[i] = ll(sp[i]);
      sp[i+1] = ll(sp[i+1]);
      sp[i+2] = ll(sp[i+2]);
    }
    return sp;
  },

  treshold: function(imgData){
    var sp = imgData;
    var ll = function(vl){
    	return vl>128?0:255;
    };
    for(var i = 0; i < imgData.length; i+=4){
      var mean = (sp[i] + sp[i+1] + sp[i+2])/3;
      sp[i] = ll(mean);
      sp[i+1] = ll(mean);
      sp[i+2] = ll(mean);
    }
    return sp;
  }
};

var draw = function(imgData){
  var currImgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for(var i = 0; i < currImgData.data.length; i += 4){
    currImgData.data[i]   = imgData[i];
    currImgData.data[i+1] = imgData[i+1];
    currImgData.data[i+2] = imgData[i+2];
  }
  ctx.putImageData(currImgData, 0, 0);
};

var process = function(filterCallback){
  var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var tmp = filterCallback(imgData.data);
  draw(tmp);
};

var run = function(){
  $('.dropzone').on('dragleave', function(e){
    $(this).removeClass('dragging');
    return false;
  })
  .on('drop', function(e){
    $(this).addClass('dropped');

    originalEvent = e.originalEvent;
    dataTransfer  = originalEvent.dataTransfer;
    files = dataTransfer.files || [];
    uploadItem(files[0]);

    return false;
  })
  .on('dragover', function(e){
    $(this).addClass('dragging');
    return false;
  });
};
var previousMouseX = null;
var previousMouse = null;
function getMousePosition(evt) {
  var rect = canvas.getBoundingClientRect();
  return {x: Math.round((evt.clientX-rect.left)/(rect.right-rect.left)*canvas.width),
          y: Math.round((evt.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height) };
}
function move(mouseX, mouseY) {
        previousMouseX = mouseX;
        previousMouseY = mouseY;
}
function stroke(mouseX, mouseY) {
        if(mode=="pencil"){
          ctx.globalCompositeOperation = "source-over";
          ctx.lineJoin = ctx.lineCap = "round";
          ctx.lineWidth = 5;
          ctx.globalAlpha = "0.2";  
          ctx.beginPath();
          ctx.moveTo(previousMouseX, previousMouseY);
          ctx.lineTo(mouseX, mouseY);
          ctx.closePath();
          ctx.stroke();

          ctx.globalAlpha = "1";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(previousMouseX, previousMouseY);
          ctx.lineTo(mouseX, mouseY);
          ctx.closePath();
          ctx.stroke();
          move(mouseX, mouseY);
        }
        else if(mode=="eraser"){
          ctx.beginPath();
          ctx.globalCompositeOperation="destination-out";
          ctx.arc(previousMouseX,previousMouseY,8,0,Math.PI*2,false);
          ctx.fill();
          move(mouseX, mouseY);
        }
        
}
var c = document.getElementById("color");
c.addEventListener("input", function() {
    ctx.strokeStyle=c.value;
}, false);
var p;
var u=new Array(canvas.height);
function converttodata(x,y){
  var posd=((y*canvas.width)+x)*4;
  return posd;
}
function checkedges(x,y){
  return x<canvas.width && x>=0 && y>=0 && y<canvas.height;
}
var r,g,b,r1,b1,g1;
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
function checkpoint(x,y){
  var d=converttodata(x,y);
  if(r==p.data[d] &&
       g==p.data[d+1] &&
       b==p.data[d+2] &&
      checkedges(x,y) && !u[y][x]){
    return true;
  }
  return false;
}
function dfs(x,y){
  u[y][x]=true;
  var d=converttodata(x,y);
  p.data[d]=r1;
  p.data[d+1]=g1;
  p.data[d+2]=b1;
  if(checkpoint(x-1,y)){
    dfs(x-1,y);
  }
  if(checkpoint(x,y-1)){
    dfs(x,y-1);
  }
  if(checkpoint(x+1,y)){
    dfs(x+1,y);
  }
  if(checkpoint(x,y+1)){
    dfs(x,y+1);
  }
}

$(document).ready(function(){
  run();
  // Когда пользователь нажимает на кнопку
  $('.js-button-action').click(function(){
    var filter = $(this).data('filter');
    process(filters[filter]);
  });
  $('.pencil').click(function(){
    paint =false;
    mode="pencil";
      $('#canvas').mousedown(function(e){
      paint = true;
      var pos=getMousePosition(e);
      move(pos.x,pos.y);
      });
      $('#canvas').mousemove(function(e){
        if(paint) {
          var pos = getMousePosition(e);
          stroke(pos.x,pos.y);   
        }
      });
      $('#canvas').mouseup(function(e){
        paint = false;
      });
    
  });
  $('.eraser').click(function(){
    erase=false;
    mode="eraser";
        $('#canvas').mousedown(function(e){
          erase= true;
          var pos = getMousePosition(e);
          move(pos.x, pos.y);
        });
        $('#canvas').mousemove(function(e){
           if(erase) {
            var pos = getMousePosition(e);
            stroke(pos.x, pos.y);   
          }
        });
        $('#canvas').mouseup(function(e){
          erase = false;
        });
    
  });
  $('.filling').click(function(){
        var fill=true;
        pencil=false;
        $('#canvas').mousedown(function(e){
          if(fill==true){
            u = new Array(canvas.height);
            for(var i=0;i<canvas.height;i++){
              u[i]=new Array(canvas.width);
            }
            cnt=0;
            p=ctx.getImageData(0,0,canvas.width,canvas.height);
            var pos=getMousePosition(e);
            r=p.data[converttodata(pos.x,pos.y)];
            g=p.data[converttodata(pos.x,pos.y)+1];
            b=p.data[converttodata(pos.x,pos.y)+2];
            r1=hexToRgb(c.value).r;
            g1=hexToRgb(c.value).g;
            b1=hexToRgb(c.value).b;
            dfs(pos.x,pos.y);
            ctx.putImageData(p, 0, 0);
          }
        });
        $('#canvas').mouseup(function(e){
          fill= false;
        });
  });
});
