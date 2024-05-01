function iniciar(){
 // Barra lateral
 let selectores = document.querySelectorAll(".selector");
 selectores.forEach((selector) => {
  selector.addEventListener("click",CambiarMenu); 
  if(selector.id === 'toMain'){
   selector.dataset.selected='true';
  } else {
   selector.dataset.selected='false';
  }
 });
 // Operaciones al renderizar
 Flotar();
 if(!esDispositivoMovil()) CrearTrazos(); // Los trazos estan hechos en Canvas con medidas de pixel, no pienso arreglarlos
}










function CambiarMenu(e){
        /* Cosas que hace esta funcion:
         * -Usar una promesa para eliminar todos los eventListeners de los selectores al evento click hasta pasados 0.8s, utilidad para prevenir un bug
         * -SI el elemento seleccionado es un hijo de un selector
         * ENTONCES seleccionado=parentNode,
         * -Esconder todos los menus innecesarios y muestra el asociado al selector
         * -Todos los selectores tienen la propiedad dataset.selected, TRUE para el elemento clickeado, FALSE para el resto
         * -Al hacer click en un selector con dataset.selected=FALSE:
         *  Se crea un clon del nodo selector,
         *  Se realiza una animacion por el eje de las Y del nodo con dataset.selected=true hasta e.target,
         *  e.target cambia de background-color y ahora su dataset.selected es TRUE,
         *  el resto de los selectores cambian su background-color al estandar y su dataset.selected a FALSE,
         *  el nodo clon es eliminado a los 0.5s de completada la animacion
        */
// Propagar evento
 let objetivo;
 if(e.target.parentNode.className === 'selector'){
  objetivo=e.target.parentNode;
 } else {
  objetivo=e.target;
 }


// Mostrar el menu correcto
 let menus = document.querySelectorAll(".menus");
 menus.forEach((menu) => { menu.style.display = "none"; });

 switch(objetivo.id){
  case 'toMain':
   document.getElementById("main").style.display="flex";
   Array.from(document.getElementsByClassName("progress-bar")).forEach((barra)=>{ barra.style.width="1%"});
   break;

  case 'toMe':
   document.getElementById("me").style.display="flex";
   Array.from(document.getElementsByClassName("progress-bar")).forEach((barra)=>{ barra.style.width="1%"});
  break;

  case 'toSkills':
  document.getElementById("skills").style.display="flex";
  setTimeout(()=>{barraProgresiva();},400);
  break;
                
  case 'toProjects':
  document.getElementById("projects").style.display="flex";
  Array.from(document.getElementsByClassName("progress-bar")).forEach((barra)=>{ barra.style.width="1%"});
  break;
 } // switch

// Crear clon
if(objetivo.dataset.selected === 'false' && !esDispositivoMovil()){
 // Desabilitar botones temporalmente
  const activar = new Promise((resolve,reject)=>{
  document.querySelectorAll('.selector').forEach((selector)=>{
  selector.removeEventListener('click',CambiarMenu);             
  }); // forEach
  resolve();
  }); // Promise        

 let actual; // Boton anteriormente seleccionado
 for(elemento of document.querySelectorAll('.selector')){
 if(elemento.dataset.selected === 'true')
  actual = elemento;
 }
 const clon = actual.cloneNode(false);
 posicionElemento = actual.getBoundingClientRect();            // coordenadas del padre
 posicionPadre = actual.parentNode.getBoundingClientRect();    // coordenadas del hijo

 clon.className = 'selector';
 clon.style.position = 'absolute';
 clon.style.top = (posicionElemento.top - posicionPadre.top)   + 'px';
 clon.style.left = (posicionElemento.left - posicionPadre.left)   + 'px';
 clon.style.backgroundColor='#222222';
 clon.style.zIndex = '1';
 document.getElementById('barraSelector').appendChild(clon);
          
 // Mover clon
 const posicionDestino = objetivo.getBoundingClientRect();
 const distancia = posicionDestino.top - posicionElemento.top;
 clon.style.transform=`translateY(${distancia}px)`;
 clon.style.transition='transform 0.3s';

 // Eliminar clon  
 setTimeout(()=> { 
  document.getElementById('barraSelector').removeChild(clon);
  objetivo.style.backgroundColor='#222222';
 },500);
           
 // Terminar con los cambios
 document.querySelectorAll('.selector').forEach((selector) => {
  if(selector.style.position !== 'absolute'){
   selector.dataset.selected='false';
   selector.style.backgroundColor='transparent';
  }
 }); 
 
 objetivo.dataset.selected='true';
 activar.then(()=>{
  setTimeout(()=>{
   document.querySelectorAll('.selector').forEach((selector)=>{
   selector.addEventListener("click",CambiarMenu); 
   }); // forEach            
  },800);      // setTimeout
 });           //promise then
} // IF objetivo.dataset.selected === 'false')
 else {
  document.querySelectorAll('.selector').forEach((selector) => {
   if(selector.style.position !== 'absolute'){
    selector.dataset.selected='false';
    selector.style.backgroundColor='transparent';
  }
  }); 
  objetivo.style.backgroundColor='#222222';
 } // else
}  // CambiarMenu










function CrearTrazos(){
/* Realiza 4 dibujos usando Canvas:
  * Un logo para la seccion principal
  * Un logo para la seccion de informacion personal
  * Un logo para la seccion de habilidades
  * Un logo para la seccion de proyectos
 */

  //*** 1- Dibujar logo para la seccion de principal ***//

           let mainCanvas = document.getElementById('mainIcon'); 
           let mainCanvasAnchura= mainCanvas.clientWidth; 
           let mainCanvasAltura= mainCanvas.clientHeight; 
         
        function DibujarRectangulo(rectX, rectY, ancho, alto, lienzo, filled){
           const ctx = lienzo.getContext('2d');
           ctx.imageSmoothingEnabled = true;
           ctx.beginPath();
           ctx.fillStyle = 'white';
           if(filled) {
            ctx.fillRect(rectX, rectY, ancho, alto);
           } else {
            ctx.strokeStyle ='white';
            ctx.lineWidth = 6;
            ctx.rect(rectX, rectY, ancho, alto);
            ctx.stroke();
           }
         }

         function DibujarLinea(x1, y1, x2, y2, lienzo){
          const ctx = lienzo.getContext('2d');
          ctx.imageSmoothingEnabled='true';
          ctx.beginPath();
          ctx.strokeStyle = 'white';
          ctx.lineWidth = 6;
          ctx.moveTo(x1,y1);
          ctx.lineTo(x2,y2);
          ctx.stroke();
         }
  DibujarRectangulo(mainCanvasAnchura-mainCanvas.offsetLeft,
                    mainCanvasAltura-mainCanvas.offsetTop,
                    mainCanvasAnchura*1.3,mainCanvasAltura*2.5,
                    mainCanvas,false);
  DibujarRectangulo(mainCanvasAnchura*0.9-mainCanvas.offsetLeft,
                    mainCanvasAltura*0.7-mainCanvas.offsetTop,
                    mainCanvasAnchura*1.5,mainCanvasAltura*0.5,
                    mainCanvas,true);

 //*** 2- Dibujar logo para la seccion de informacion personal***//
 let meCanvas = document.getElementById('meIcon'); 
 let meCanvasAnchura= meCanvas.clientWidth; 
 let meCanvasAltura= meCanvas.clientHeight;  

  function DibujarCirculo(circuloX, circuloY, radio, lienzo){
   const ctx = lienzo.getContext('2d');
   ctx.imageSmoothingEnabled = true;
   ctx.beginPath();
   ctx.arc(circuloX,circuloY,radio,0,Math.PI*2);
   ctx.fillStyle = 'white';
   ctx.fill();
  }
 DibujarCirculo(meCanvasAnchura*1.6,meCanvasAltura*0.9,40,meCanvas);
 
 function DibujarTrapecio(x1, x2, y, cpy, lienzo){
  const ctx = lienzo.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.moveTo(x1, y);
  ctx.quadraticCurveTo((x1 + x2) / 2, cpy, x2, y);
  ctx.lineTo(x2, y);
  ctx.closePath();
  ctx.fill();
 }
 DibujarTrapecio(meCanvasAnchura*0.8, meCanvasAnchura*2.4, meCanvasAltura*3.3, meCanvasAltura*1.65, meCanvas);
   

 //*** 3- Dibujar logo para la seccion de habilidades ***//
   let skillCanvas = document.getElementById('skillsIcon'); 
   let skillCanvasAnchura= skillCanvas.clientWidth; 
   let skillCanvasAltura= skillCanvas.clientHeight; 
   
   DibujarCirculo(skillCanvasAnchura*0.8,skillCanvasAltura*0.55,22,skillCanvas);
   DibujarCirculo(skillCanvasAnchura*0.8,skillCanvasAltura*1.65,22,skillCanvas);
   DibujarCirculo(skillCanvasAnchura*0.8,skillCanvasAltura*2.75,22,skillCanvas);

   DibujarRectangulo(skillCanvasAnchura*1.2,skillCanvasAltura*0.25,150,22,skillCanvas,true);
   DibujarRectangulo(skillCanvasAnchura*1.2,skillCanvasAltura*1.35,150,22,skillCanvas,true);
   DibujarRectangulo(skillCanvasAnchura*1.2,skillCanvasAltura*2.45,150,22,skillCanvas,true);

 //*** 4- Dibujar logo para la seccion de proyectos ***//
   let projCanvas = document.getElementById('projectsIcon'); 
   let projCanvasAnchura= projCanvas.clientWidth; 
   let projCanvasAltura= projCanvas.clientHeight; 
   DibujarRectangulo(projCanvasAnchura*0.4,projCanvasAltura*0.5,230,100,projCanvas,false);
  
   const addText = projCanvas.getContext('2d');
   addText.font = '30px Lucida Handwriting';  
   addText.fillStyle='#fff';
   addText.fillText('GIT & GITHUB',projCanvasAnchura*0.6,projCanvasAltura*1.5);
        
} // CrearTrazos()










function EscribirFrase(){
 /* Añade una frase al pie de la pagina
  * Almacena el archivo frases.txt en un arreglo
  * Lo divide en n elementos, cada elemento representa una linea del documento
  * Usa un numero aleatorio para elegir un elemento del arreglo
  * Anexa el elemento al nodo span del pie de la pagina
  */
  fetch('frases.txt')
   .then((respuesta)=>{
    console.log(`Status code: ${respuesta.status} [expected 200-299]`);
     if(!respuesta.ok){
       throw new Error('No se ha recibido una respuesta exitosa del servidor');
     }
     return respuesta.text();})
   .then((texto)=>{
     const frases = texto.split('\n');
     const numero = parseInt(Math.random() * 100) % frases.length;
     document.getElementById('frase').innerHTML = frases[numero];        })
   .catch(() => {
    console.log('[Error] Text could not be fetched');
    document.getElementById('frase').innerHTML = 'Inner Problem';
   });
}










function Flotar(){
// Mueve los elementos 1 px por iteracion hacia arriba y luego hacia abajo
// Dando la impresion de que 'flotan'
// requestAnimationGFrame es una joya que lo hace casi todo
 let zonaPrincipal = document.querySelector('.zona-principal');
 let barraLateral = document.querySelector('#barraSelector');
 let pie = document.querySelector('#bordes');
 //let direccion = parseInt(Math.random() * 100) % 10;
 let direccion = 1;
 let posicion = 0;

 function Mover(){
         if(posicion >= 2){
          direccion = -1;       
         } else if(posicion <= 0){
          direccion = 1;       
         }
 posicion += direccion * 0.05;
 zonaPrincipal.style.transform = `translateY(${posicion}px)`;
// barraLateral.style.transform = `translateY(${posicion}px)`; 
 pie.style.boxShadow = `0px 0px ${12+posicion}px green`;
 barraLateral.style.boxShadow = `0px 0px ${12+posicion}px green`;
 requestAnimationFrame(Mover);
 }
 requestAnimationFrame(Mover);
}










function AddPersonalInfo(){
 // Imprimira la informacion personal en el documento personalInfo.txt       
 document.getElementById('personalInfo').innerHTML='Hello! I am Kevin Calana, a cuban cybersecurity student at the UCI, passionate about the world of web develpoment as well.I want to gain experience, so i would be glad to participate in any project.<br><br> I am a dedicated and disciplined person, and yes, I am still a junior but if you decide to work with me, I will prove that i can meet the expectations.<br><br> If you are interesed, here is my contact: ';
// Y la informacion en la seccion principal 
 document.getElementById('mainText').innerHTML='Have you ever felt that wonderful feeling of satisfaction when you put what you learn into practice?, if so you will surely agree that you have had to dedicate a lot of time and effort to achieve something that you are proud of, it is a little complicated to meet the demands of ourselves...<br><br> This website is a small achievement of mine, and yes, for sure it is quite imperfect but I like the result, so I will make this my temporary portfolio.<br><br>You are very welcome!';
}










function barraProgresiva() {
// Se encarga de aumentar la barra de progreso en tiempo real
// Se guia por el atributo 'number' que poseen los elementos de la clase progress-bar
    var elements = document.getElementsByClassName("progress-bar");

    var incremento = 1; // Valor incremental para la barra de progreso

    Array.from(elements).forEach((elem) => {
        let color = elem.getAttribute('colorIs');
        elem.style.background = color || '#00AAFF';
        var width = parseInt(elem.style.width) || 0; // Ancho actual de la barra
        var objetivo = parseInt(elem.getAttribute('number')) || 0;
        var interval = setInterval(() => {
            if (width < objetivo) {
                width += incremento;
                elem.style.width = width + "%";
            } else if (width > objetivo) {
                width -= incremento;
                elem.style.width = width + "%";
            } else {
                clearInterval(interval);
            }
        }, 10); // Intervalo de tiempo para la animación
    });
}










// Para Detectar Dispositivos Moviles
function esDispositivoMovil() {
 return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(navigator.userAgent);
}










// LOAD AND DOM_CONTENT_LOADED EVENTS
 // AND stuff for mobile devices
window.addEventListener("load",iniciar);
 document.addEventListener('DOMContentLoaded', function() {
  EscribirFrase();
  AddPersonalInfo();

// Realmente tengo que hacer bastantes cambios para hacer esto decente para un movil
if(esDispositivoMovil()){
 // alert('On development, this is broken for mobiles!');
  document.body.style.fontSize='10px'; 
  document.getElementById('frase').style.fontSize='12px';
  Array.from(document.getElementsByClassName('sectionText')).forEach((elemento)=>{elemento.style.fontSize='15px';
             elemento.style.padding='10px';});
} // if DispositivoMovil
}); // DOMContentLoaded
