window.onload = () =>{
    
    //text info
    const camera = document.getElementById("camera")
    const textBorder = document.getElementById("textBorder")
    var editTextBorder = textBorder.cloneNode(true);
    const infoText = document.getElementById("infoText")
    const infoTitle = document.getElementById("infoTitle")
    
    //move models
    const item = document.getElementById("holdModel")
    const pickModels = document.getElementsByClassName("picksModel")
    const placeModels = document.getElementsByClassName("placesModel")
    let holdsItem = false

    //place id`s
    let cpuP = document.getElementById("cpuP")
    let gpuP = document.getElementById("gpuP")
    let ramP = document.getElementsByClassName("ramP")
    let motherboardP = document.getElementById("motherboardP")
    let cpuCoolerP = document.getElementById("cpuCoolerP")
    let motherboardVisible = false;
    let cpuVisible = false;

    textBorder.parentNode.removeChild(textBorder)

    for(let i=0; i<pickModels.length;i++){
        const picked = pickModels[i];
        picked.onclick = () =>{
            if(!holdsItem){
                holdsItem = true
                const model = picked.getAttribute("gltf-model")
                item.setAttribute("gltf-model", model)
                picked.setAttribute("modelopacity", "0.3")

                infoTitle.setAttribute("value", picked.getAttribute("title"))
                infoText.setAttribute("text", "value", picked.getAttribute("infoText"))

                console.log(picked.getAttribute("infoText"))
                editTextBorder = textBorder.cloneNode(true);
                camera.appendChild(editTextBorder)
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
                    editTextBorder.parentNode.removeChild(editTextBorder)
                    if(motherboardP.getAttribute("modelopacity") == 1 && !motherboardVisible){
                        motherboardVisible = true
                        gpuP.setAttribute("modelopacity", "0.3")
                        cpuP.setAttribute("modelopacity", "0.3")
                        for(let i =0; i < ramP.length; i++){
                            ramP[i].setAttribute("modelopacity", "0.3")
                        }
                    }

                    if(cpuP.getAttribute("modelopacity") == 1 && !cpuVisible){
                        cpuVisible = true
                        cpuCoolerP.setAttribute("modelopacity", "0.3")
                        cpuCoolerP.object3D.position.set(-1.6, 3.7, -6.17)
                    }
                }
            }
        }
    }

    // for(let i = 0; i< resets.length; i++){
    //     const reset = resets[i];
    //     reset.onclick = (event) =>{
    //         console.log("reset");
    //         for(let i = 0; i< places.length; i++){
    //             places[i].setAttribute("opacity",0.5);
    //         }
    //         for(let i = 0; i< picks.length; i++){
    //             picks[i].setAttribute("opacity",1);
    //         }
    //         hold.setAttribute("opacity", 0)
    //         hold.setAttribute("color", "black")
    //         hold.object3D.position.set(-2, -0.5, 1)

    //         editTextBorder.parentNode.removeChild(editTextBorder)
    //     }
    // }        
}
