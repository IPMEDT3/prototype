window.onload = () =>{
    
    //text info
    const camera = document.getElementById("camera")
    const textBorder = document.getElementById("textBorder")
    var editTextBorder = textBorder.cloneNode(true);
    const infoText = document.getElementById("infoText")
    const infoTitle = document.getElementById("infoTitle")
    textBorder.parentNode.removeChild(textBorder)
    
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

    //tutorial
    const tutorialScreen = document.getElementById("tutorialScreen")
    const tutorialButtons = document.getElementsByClassName("tutorialButtons") 
    const cursor = document.getElementById("cursor")
    const tutorial = ["Je kan zo na de tutorial de onderdelen die rechts van je liggen oppaken door er naar te kijken, hierna moet je deze elementen op de juiste plek in de computer kast zetten door naar de doorzichtige elementen te kijken.", "Tijdens het spel krijg je hints te ze zien over welke onderdelen je het beste eerst kan plaatsen. Ook kunnen er nieuwe elementen geplaatst worden als er een bepaald element in de kast zit, je kan dus niet alle elementen vanaf het begin plaatsen.", "Dit was de tutorial over hoe de ervaring in zijn werk gaat, veel succes met de computer!"]
    const uitlegText = document.getElementById("uitlegText")
    const skipButton = document.getElementById("skipTutorial")
    const nextButton = document.getElementById("nextTutorial")
    let j=0



    for(let i=0; i<tutorialButtons.length; i++){
        const button = tutorialButtons[i]
        button.onmouseenter = () =>{
            button.setAttribute("color", "#0dd0b4")
        }
        button.onmouseleave = () =>{
            button.setAttribute("color", "white")
        }
        button.onclick = () =>{
            if(button.id == "skipTutorial"){
                endTutorial()
            } else{
                uitlegText.setAttribute("value", tutorial[j])
                j++
                if(j == tutorial.length){
                    skipButton.parentNode.removeChild(skipButton)
                    nextButton.object3D.position.set(0, -0.4, 0.1)
                    nextButton.children[0].setAttribute("value", "Finish")
                } else if(j == tutorial.length+1){
                    endTutorial()
                }
            }
        }
    }    

    for(let i=0; i<pickModels.length;i++){
        const picked = pickModels[i];
        picked.onclick = () =>{
            if(!holdsItem){
                holdsItem = true
                const model = picked.getAttribute("gltf-model")
                item.setAttribute("gltf-model", model)
                picked.setAttribute("modelopacity", "0.3")

                
                infoTitle.setAttribute("value", picked.getAttribute("title"))
                
                infoText.setAttribute("value", picked.getAttribute("infoText"))
    
                
                console.log(infoText.getAttribute("text"))
                
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

    function endTutorial(){
        tutorialScreen.parentNode.removeChild(tutorialScreen)
        cursor.setAttribute("raycaster", {objects: ".picks, .places, .reset, .placesModel, .picksModel, .tutorialButtons"})

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
