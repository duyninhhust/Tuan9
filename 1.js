document.addEventListener("DOMContentLoaded",function(){
    // khai bao
    var pc = document.getElementsByClassName('pc');
    var khoi =document.getElementsByClassName('button');   
    var bar = document.getElementsByClassName('checkbtn');
    var menu = document.getElementsByClassName('duynhat');

    //xu ly
        khoi[0].onclick= function(){             
            pc[0].classList.remove('pc1');
            pc[1].classList.remove('pc1');
            pc[2].classList.remove('pc1');
            pc[3].classList.remove('pc1');           
         }
        khoi[1].onclick= function(){             
            pc[0].classList.add('pc1');
            pc[1].classList.add('pc1');
            pc[2].classList.remove('pc1');
            pc[3].classList.remove('pc1');           
         }
        khoi[2].onclick= function(){             
            pc[0].classList.remove('pc1');
            pc[1].classList.add('pc1');
            pc[2].classList.remove('pc1');
            pc[3].classList.add('pc1');           
         }
        khoi[3].onclick= function(){             
            pc[0].classList.add('pc1');
            pc[1].classList.remove('pc1');
            pc[2].classList.add('pc1');
            pc[3].classList.add('pc1');           
         }
         console.log(bar);

        bar[0].onclick = function () { 
            menu[0].classList.add('haha');
            
            
        };
         
    
         
        
    
    
    
        
    

},false)