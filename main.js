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
    let pickModels = document.getElementsByClassName("picksModel")
    let placeModels = document.getElementsByClassName("placesModel")
    const checkSound = document.getElementById("check")
    let holdsItem = false

    //place id`s
    let cpuP = document.getElementById("cpuP")
    let gpuP = document.getElementById("gpuP")
    let ramP = document.getElementsByClassName("ramP")
    let motherboardP = document.getElementById("motherboardP")
    let cpuCoolerP = document.getElementById("cpuCoolerP")
    let storageP = document.getElementById("storageP")
    let motherboardVisible = false;
    let cpuVisible = false;
    let storageVisible = false;
    let cpuCoolerVisible = false;

    //tutorial
    const tutorialScreen = document.getElementById("tutorialScreen")
    const tutorialButtons = document.getElementsByClassName("tutorialButtons") 
    const cursor = document.getElementById("cursor")
    const tutorial = ["Je kan zo na de tutorial de onderdelen die rechts van je liggen oppaken door er naar te kijken, hierna moet je deze elementen op de juiste plek in de computer kast zetten door naar de doorzichtige elementen te kijken.", "Tijdens het spel krijg je hints te ze zien over welke onderdelen je het beste eerst kan plaatsen. Ook kunnen er nieuwe elementen geplaatst worden als er een bepaald element in de kast zit, je kan dus niet alle elementen vanaf het begin plaatsen.", "Dit was de tutorial over hoe de ervaring in zijn werk gaat, veel succes met de computer!"]
    const tutorialText = document.getElementById("tutorialText")
    const skipButton = document.getElementById("skipTutorial")
    const nextButton = document.getElementById("nextTutorial")
    let j=0

    //uitleg
    const uitlegBar = document.getElementById("uitleg")
    const uitleg = ["Je kan het beste beginnen met het plaatsen van de opslag zodat er geen onderdelen in de weg zitten en je er goed bij kan komen.", "Daarna kan je het beste het moederbord plaatsen omdat de rest van de onnderdelen allemaal op het moederbord worden geplakt", "Hierna kan je de videokaart, RAM en cpu plaatsen.", "Nadat de CPU is geplaatst kan je de CPU-cooler op de CPU zetten"]
    uitlegBar.parentNode.removeChild(uitlegBar)

    //endScreen
    const finish = document.getElementById("finishScreen") 
    const finishButton = document.getElementById("done")
    finish.parentNode.removeChild(finish)
    
    finishButton.onmouseenter = () => {
        finishButton.setAttribute("color", "#0dd0b4")
    }
    finishButton.onmouseleave = () =>{
        finishButton.setAttribute("color", "white")
    }
    finishButton.onclick = () =>{
        window.location.reload()
    }

    function showUitleg(x){
        uitlegBar.children[0].setAttribute("value", uitleg[x])
    }

    //showing tutorial screen
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
                tutorialText.setAttribute("value", tutorial[j])
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

    //picking op the models
    for(let i=0; i<pickModels.length;i++){
        const picked = pickModels[i];
        picked.onclick = () =>{
            console.log(picked.getAttribute("modelopacity"))
            if(picked.getAttribute("modelopacity")== 1){
                pickItem(picked)
            } else if(picked.getAttribute("modelopacity") != 1){
                placeItem(picked)
            }
        }
    }

    //placing the models
    for (let i=0; i < placeModels.length; i++){
        const placed = placeModels[i]
        placed.onclick = () =>{
            if(placed.getAttribute("modelopacity") != 1){
                placeItem(placed)
            } else {
                pickItem(placed)
            }
        }
    }

    function placeItem(placed){
        if(holdsItem){
            if(placed.getAttribute("gltf-model") == item.getAttribute("gltf-model")){
                holdsItem = false

                if(placed.className == "placesModel"|| placed.className== "placesModel ramP"){
                    checkSound.volume = 0.2
                    checkSound.play()
                }

                item.removeAttribute("gltf-model")
                placed.setAttribute("modelopacity", "1")

                editTextBorder.parentNode.removeChild(editTextBorder)
                
                if(cpuCoolerP.getAttribute("modelopacity") == 1 && !cpuCoolerVisible){
                    cpuCoolerVisible = true
                    showUitleg(2)
                }
                
                if(cpuP.getAttribute("modelopacity") == 1 && !cpuVisible){
                    cpuVisible = true
                    cpuCoolerP.setAttribute("modelopacity", "0.3")
                    cpuCoolerP.object3D.position.set(-1.6, 3.7, -6.17)
                    showUitleg(3)
                }
                
                if(motherboardP.getAttribute("modelopacity") == 1 && !motherboardVisible){
                    motherboardVisible = true
                    gpuP.setAttribute("modelopacity", "0.3")
                    cpuP.setAttribute("modelopacity", "0.3")
                    for(let i =0; i < ramP.length; i++){
                        ramP[i].setAttribute("modelopacity", "0.3")
                    }
                    showUitleg(2)
                }

                if(storageP.getAttribute("modelopacity") == 1 && !storageVisible){
                    storageVisible = true
                    showUitleg(1)
                }

                let finishedList = []
                for(let i= 0; i<placeModels.length; i++){
                    if (placeModels[i].getAttribute("modelopacity") == 1){
                        finishedList.push(placeModels[i])
                        if(finishedList.length == 1){
                            cursor.setAttribute("raycaster", {objects: ".finishbutton, #done"})
                            uitlegBar.parentNode.removeChild(uitlegBar)
                            storageP.parentNode.appendChild(finish)
                            finishButton.onmouseenter = () => {
                                finishButton.setAttribute("color", "#0dd0b4")
                            }
                            finishButton.onmouseleave = () =>{
                                finishButton.setAttribute("color", "white")
                            }
                            finishButton.onclick = () =>{
                                window.location.reload()
                            }
                        }
                    }
                }
            }
        }
    }

    function pickItem(picked){
        if(!holdsItem){
            holdsItem = true
            const model = picked.getAttribute("gltf-model")
            item.setAttribute("gltf-model", model)
            picked.setAttribute("modelopacity", "0.3")

            infoTitle.setAttribute("value", picked.getAttribute("title"))
            
            infoText.setAttribute("value", picked.getAttribute("infoText"))
            
            editTextBorder = textBorder.cloneNode(true);
            camera.appendChild(editTextBorder)

            if(cpuCoolerP.getAttribute("modelopacity") != 1 && cpuCoolerVisible){
                cpuCoolerVisible = false
                showUitleg(3)
            }
            
            if(cpuP.getAttribute("modelopacity") != 1 && cpuVisible){
                showUitleg(2)
            }

            if(motherboardP.getAttribute("modelopacity") != 1 && motherboardVisible){
                motherboardVisible = false
                gpuP.setAttribute("modelopacity", "0")
                cpuP.setAttribute("modelopacity", "0")
                for(let i =0; i < ramP.length; i++){
                    ramP[i].setAttribute("modelopacity", "0")
                }
                showUitleg(1)
            }

            if(storageP.getAttribute("modelopacity") != 1 && storageVisible){
                storageVisible = false
                showUitleg(0)
            }
        }
    }

    //starts the game
    function endTutorial(){
        camera.appendChild(uitlegBar)
        showUitleg(0)
        tutorialScreen.parentNode.removeChild(tutorialScreen)
        cursor.setAttribute("raycaster", {objects: ".picks, .places, .reset, .placesModel, .picksModel, .tutorialButtons, .finishbutton"})

    }     
}
