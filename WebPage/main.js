// criar uma cena... 
var cena = new THREE.Scene();


// preparar um renderer WebGL com um viewport 800x600 a adicioná-lo à pagina 

var canvasHTML = document.getElementById('meuCanvas');//usar o canvas do html em vez de criar um

var renderer = new THREE.WebGLRenderer({ canvas: canvasHTML }); 
renderer.setSize( 550, 550 ); 


// criar uma camara... 
var camara = new THREE.PerspectiveCamera( 70, 800 / 600, 0.01, 1000 ); 
camara.position.x = 4; 
camara.position.y = 7; 
camara.position.z = 13;


//acrescentar controlos impotados no html
var controlos = new THREE.OrbitControls( camara, renderer.domElement )

//declarar variaveis
var luzPonto1;
var luzPonto2;
var portasAbertasBool = false;
var mesaExtendidaBool = false;

//ANIMATION STUFF
var relogio = new THREE.Clock()     //fazer um relogio para refreciar para as animacoes
var misturador = new THREE.AnimationMixer(cena)     //fazer um controlador de animacoes

//controlos para cenas animadas
function animar() { 
    misturador.update( relogio.getDelta() )//atualizar a frame para animar com o relogio que criamos
    requestAnimationFrame( animar ) 
    renderer.render( cena, camara ) 
} 
animar()

//make gltf loader that can read blender files
var carregador = new THREE.GLTFLoader() 
carregador.load( 
    'models/workBenchM.gltf', 
    function ( gltf ) { 



         //desativa qualquer luz importada da cena do blender
        gltf.scene.traverse(function(x) { 
            if (x instanceof THREE.Light) x.visible = false 
        })


        //linha para adicionar o objeto do blender 
        cena.add( gltf.scene ) 

                //////////////GET BUTTONS////////////////////

        //get buttons' ids
        var btn_change_light_red = document.getElementById('buttonChangeLightRed');
        var btn_change_light_green = document.getElementById('buttonChangeLightGreen');
        var btn_change_light_purple = document.getElementById('buttonChangeLightPurple');
        var btn_change_light_white = document.getElementById('buttonChangeLightWhite');

        var btn_change_color_yellow = document.getElementById('buttonChangeColorYellow');
        var btn_change_color_red = document.getElementById('buttonChangeColorRed');
        var btn_change_color_grey = document.getElementById('buttonChangeColorGrey');
        var btn_change_color_original = document.getElementById('buttonChangeColorOriginal');

        var btn_abrir_gaveta = document.getElementById('buttonAbrirGaveta');
        var btn_fechar_gaveta = document.getElementById('buttonFecharGaveta');
        var btn_estender_mesa = document.getElementById('buttonEstenderMesa');
        var btn_fechar_mesa = document.getElementById('buttonFecharMesa');
        
        var btn_granito = document.getElementById('buttonGranito')
        var btn_marmore = document.getElementById('buttonMarmore')
        var btn_original = document.getElementById('buttonOriginalWood')
        var btn_marmore_castanho = document.getElementById('buttonMarmoreCastanho')

        var textureLoader = new THREE.TextureLoader();
        textureYellow = textureLoader.load( "models/textures/Amarelo.png");
        textureGrey = textureLoader.load("models/textures/Preto.jpg");
        textureRed = textureLoader.load("models/textures/Vermelho.jpg");
        textureOriginal = textureLoader.load("models/textures/Wood051_1K_Color.png")
        textureGranito = textureLoader.load("models/textures/Granito.png")
        textureMarmore = textureLoader.load('models/textures/Marble018_1K_Color.jpg')
        textureMarmoreCastanho = textureLoader.load('models/textures/MarbleCastanho.png')

        //////////////ANIMATION STUFF////////////

        clipe1 = THREE.AnimationClip.findByName( gltf.animations, 'OpenDoorRight' ) //procurar o clipe de animação por nome
        acao1 = misturador.clipAction( clipe1 )           //adicionar ao misturador
        acao1.clampWhenFinished = true
        acao1.setLoop(THREE.LoopOnce)

        clipe2 = THREE.AnimationClip.findByName( gltf.animations, 'OpenLeftDoor' ) //procurar o clipe de animação por nome
        acao2 = misturador.clipAction( clipe2 )           //adicionar ao misturador
        acao2.clampWhenFinished = true
        acao2.setLoop(THREE.LoopOnce)

        clipe3 = THREE.AnimationClip.findByName( gltf.animations, 'ExtendBase' ) //procurar o clipe de animação por nome
        acao3 = misturador.clipAction( clipe3 )           //adicionar ao misturador
        acao3.clampWhenFinished = true
        acao3.setLoop(THREE.LoopOnce)

        clipe4 = THREE.AnimationClip.findByName( gltf.animations, 'ExtendBench' ) //procurar o clipe de animação por nome
        acao4 = misturador.clipAction( clipe4 )           //adicionar ao misturador
        acao4.clampWhenFinished = true
        acao4.setLoop(THREE.LoopOnce)


        btn_abrir_gaveta.addEventListener('click',function(){

            if(portasAbertasBool){
                acao1.timeScale = (-1)*acao1.timeScale
                acao2.timeScale = (-1)*acao2.timeScale
            }

            acao1.paused = false
            acao2.paused = false

            // ativar a ação de animação resultante
            acao1.play()
            acao2.play()

            portasAbertasBool = false

        })

        btn_fechar_gaveta.addEventListener('click',function(){

            //sets timescale at 1 if it's -1, and at -1 if it's 1

            if(!portasAbertasBool){
                acao1.timeScale = (-1)*acao1.timeScale
                acao2.timeScale = (-1)*acao2.timeScale
            }

            acao1.paused = false
            acao2.paused = false

            acao1.play()
            acao2.play()

            portasAbertasBool = true

        })

        btn_estender_mesa.addEventListener('click',function(){

            //sets timescale at 1 if it's -1, and at -1 if it's 1

            if(mesaExtendidaBool){
                acao3.timeScale = (-1)*acao3.timeScale
                acao4.timeScale = (-1)*acao4.timeScale
            }

            acao3.paused = false
            acao4.paused = false

            acao3.play()
            acao4.play()

            mesaExtendidaBool = false

        })

        btn_fechar_mesa.addEventListener('click',function(){

            //sets timescale at 1 if it's -1, and at -1 if it's 1

            if(!mesaExtendidaBool){
                acao3.timeScale = (-1)*acao3.timeScale
                acao4.timeScale = (-1)*acao4.timeScale
            }

            acao3.paused = false
            acao4.paused = false

            acao3.play()
            acao4.play()

            mesaExtendidaBool = true

        })





        /////////////////////BUTTON FUNCTIONS///////////////



        //change light to white
        btn_change_light_white.addEventListener('click',function(){
            change_light("white")
        })    

        //change light to red
        btn_change_light_red.addEventListener('click',function(){
            change_light("red")
        })

        //change light to purple
        btn_change_light_purple.addEventListener('click',function(){
            change_light("purple")
        })        

        //change light to green
        btn_change_light_green.addEventListener('click',function(){
            change_light("green")
        })    

        btn_change_color_red.addEventListener('click', function(){
            mudarTextura(textureRed)
            })
    
            btn_change_color_yellow.addEventListener('click', function(){
            mudarTextura(textureYellow)
            })
    
            btn_change_color_grey.addEventListener('click', function(){
                mudarTextura(textureGrey)
            })
    
            btn_change_color_original.addEventListener('click', function(){
                mudarTextura(textureOriginal)
            })
    
            btn_granito.addEventListener('click', function(){
                mudarTexturaStoneBench(textureGranito)
            })
    
            btn_original.addEventListener('click',function(){
                mudarTexturaStoneBench(textureOriginal)
            })
    
            btn_marmore.addEventListener('click', function(){
                mudarTexturaStoneBench(textureMarmore)
            })
    
            btn_marmore_castanho.addEventListener('click', function(){
                mudarTexturaStoneBench(textureMarmoreCastanho)
            })

            
            //iniciar as texturas originais
            mudarTexturaStoneBench(textureMarmore)
            mudarTextura(textureOriginal)

    //fim do construtor do carregador
    } 
)

function change_light(color){
    cena.remove(luzPonto1)
    luzPonto1 = new THREE.PointLight( color,3 ) 
    luzPonto1.position.set( 20, 5,  20) 
    cena.add( luzPonto1 )

    cena.remove(luzPonto2)
    luzPonto2 = new THREE.PointLight( color,3 ) 
    luzPonto2.position.set( -20, -5, -20 ) 
    cena.add( luzPonto2 )
}

function mudarTextura(texture) {

    texture.encoding = THREE.sRGBEncoding;
    
    cena.traverse(function (child) {

        if (child instanceof THREE.Mesh && child.name != "stoneBench") {

                child.material.map = texture;
                child.material.needsUpdate = true;
                child.material.map.needsUpdate = true;

            
        }
    });

}

function mudarTexturaStoneBench(texture) {

    texture.encoding = THREE.sRGBEncoding;
    
    cena.traverse(function (child) {

        if (child instanceof THREE.Mesh && child.name == "stoneBench") {

                child.material.map = texture;
                child.material.needsUpdate = true;
                child.material.map.needsUpdate = true;

            
        }
    });

}


//add white light
change_light("white")

//add ambientLight
const ambientLight = new THREE.AmbientLight(0xDBDBDB,1)
cena.add(ambientLight)

//change background color to white
cena.background = new THREE.Color(0xFFFFFF)






