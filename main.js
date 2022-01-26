window.onload = () =>{
    const picks = document.getElementsByClassName("picks");
    const places = document.getElementsByClassName("places");
    const hold = document.getElementById("hold");
    const resets = document.getElementsByClassName("reset");
    let holdsItem = false

    //text info
    const camera = document.getElementById("camera")
    const textBorder = document.getElementById("textBorder")
    var editTextBorder = textBorder.cloneNode(true);
    const infoText = document.getElementById("infoText")
    const infoTitle = document.getElementById("infoTitle")
    const textBorderPosition = textBorder.object3D.position

    //move models
    const item = document.getElementById("holdModel")
    const pickModels = document.getElementsByClassName("picksModel")
    const placeModels = document.getElementsByClassName("placesModel")

    //place id`s
    const cpuP= document.getElementById("cpuP")
    const gpuP= document.getElementById("gpuP")
    const motherboardP= document.getElementById("motherboardP")
    const ramP = document.getElementsByClassName("ramP")
    const cpuCoolerP = document.getElementById("cpuCoolerP")

    textBorder.parentNode.removeChild(textBorder)

    // for(let i = 0; i< picks.length; i++){
    //     const pick = picks[i];
    //     pick.onclick = (event) =>{
    //         if(!holdsItem){
    //             let opa = pick.getAttribute("opacity");
    //             pick.setAttribute("opacity", opa);
    //             holdsItem = true;
    //             if((opa == 1) || ( opa == null)){
    //                 let color = pick.getAttribute("color");
    //                 pick.setAttribute("opacity", 0.5);
    //                 hold.setAttribute("color", color);
    //                 hold.setAttribute("opacity", 1);
    //                 hold.object3D.position.set(-2, -0.5, -1)

    //                 infoText.setAttribute("value", pick.getAttribute("text"))
    //                 infoTitle.setAttribute("value", pick.getAttribute("title"))
    //                 editTextBorder = textBorder.cloneNode(true);

    //                 camera.appendChild(editTextBorder)
    //                 textBorder.object3D.position.set(textBorderPosition)

    //             }
    //         }
    //     }
    // }

    // for(let i = 0; i< places.length; i++){
    //     console.log("he");
    //     const place = places[i];
    //     place.onclick = (event) =>{
    //         holdsItem = false
    //         let pcolor = place.getAttribute("color");
    //         let hcolor = hold.getAttribute("color");

    //         if(pcolor == hcolor){
    //             console.log("klik");
    //             place.setAttribute("opacity", 1);
    //             //place.setAttribute("ClassName",placed);
    //             hold.setAttribute("opacity", 0)
    //             hold.object3D.position.set(-2, -0.5, 1);

    //             editTextBorder.parentNode.removeChild(editTextBorder)
    //         }    
    //     }
    // }

    for(let i=0; i<pickModels.length;i++){
        const picked = pickModels[i];
        picked.onclick = () =>{
            if(!holdsItem){
                holdsItem = true
                const model = picked.getAttribute("gltf-model")
                item.setAttribute("gltf-model", model)
                
                infoTitle.setAttribute("value", picked.getAttribute("title"))
                infoText.setAttribute("value", picked.getAttribute("text"))

                picked.setAttribute("modelopacity", "0.3")

                editTextBorder = textBorder.cloneNode(true);
                
                camera.appendChild(editTextBorder)
                textBorder.object3D.position.set(textBorderPosition)
                
                
            }
        }
    }

    for (let i=0; i < placeModels.length; i++){
        const placed = placeModels[i]
        placed.onclick = () =>{
            if(holdsItem){
                if(placed.getAttribute("gltf-model") == item.getAttribute("gltf-model")){
                    holdsItem = false
                    item.removeAttribute("gltf-model")
                    placed.setAttribute("modelopacity", "1")
                    console.log(placed.getAttribute("modelopacity"))
                    editTextBorder.parentNode.removeChild(editTextBorder)
                    
                    if(motherboardP.getAttribute("modelopacity") == 1){
                        for(let i =0; i < ramP.length; i++){
                        }
                    }

                    if(cpuP.getAttribute("modelopacity") == 1){
                        cpuCoolerP.object3D.position.set("-1.6 3.7 -6.17")
                    }
                }
            }
        }
    }

    for(let i = 0; i< resets.length; i++){
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

            editTextBorder.parentNode.removeChild(editTextBorder)
        }
    }        
}
