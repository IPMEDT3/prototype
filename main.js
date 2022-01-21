window.onload = () =>{
    const picks = document.getElementsByClassName("picks");
    const places = document.getElementsByClassName("places");
    const hold = document.getElementById("hold");
    const resets = document.getElementsByClassName("reset");
    let holdsItem = false

    for(let i = 0; i< picks.length; i++){
        console.log("he");
        const pick = picks[i];
        pick.onclick = (event) =>{
            if(!holdsItem){
                console.log("klik");
                let opa = pick.getAttribute("opacity");
                pick.setAttribute("opacity", opa);
                console.log(opa);
                holdsItem = true;
                if((opa == 1) || ( opa == null)){
                    let color = pick.getAttribute("color");
                    pick.setAttribute("opacity", 0.5);
                    hold.setAttribute("color", color);
                    hold.setAttribute("opacity", 1);
                    hold.object3D.position.set(-2, -0.5, -1)
                } else {
                    console.log("no");
                }
            }
        }
    }

    for(let i = 0; i< places.length; i++){
        console.log("he");
        const place = places[i];
        place.onclick = (event) =>{
            holdsItem = false
            let pcolor = place.getAttribute("color");
            let hcolor = hold.getAttribute("color");

            if(pcolor == hcolor){
                console.log("klik");
                place.setAttribute("opacity", 1);
                //place.setAttribute("ClassName",placed);
                hold.setAttribute("opacity", 0)
                hold.object3D.position.set(-2, -0.5, 1);
            } else {
                console.log("no");
            }    
        }
    }

    for(let i = 0; i< resets.length; i++){
        console.log("rr");
        const reset = resets[i];
        reset.onclick = (event) =>{
            console.log("reset");
            for(let i = 0; i< places.length; i++){
                places[i].setAttribute("opacity",0.5);
            }
            for(let i = 0; i< picks.length; i++){
                picks[i].setAttribute("opacity",1);
            }
            hold.setAttribute("opacity", 0)
            hold.setAttribute("color", "black")
            hold.object3D.position.set(-2, -0.5, 1)
        }
    }        
}
