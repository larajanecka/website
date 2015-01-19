
    var SCREEN_WIDTH = window.innerWidth;
    var SCREEN_HEIGHT = window.innerHeight;

    var container;

    var camera, scene, renderer;

    var mouseX = 0, mouseY = 0;

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    init();
    animate();


    function init() {

        container = document.createElement( 'div' );
        document.body.appendChild( container );

        camera = new THREE.PerspectiveCamera( 35, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 5000 );
        camera.position.z = 3000;

        scene = new THREE.Scene();
        scene.fog = new THREE.Fog( 0x000000, 3500, 4000 );

        // GROUND

        var imageCanvas = document.createElement( "canvas" ),
            context = imageCanvas.getContext( "2d" );

        imageCanvas.width = imageCanvas.height = 128;

        context.fillStyle = "#444";
        context.fillRect( 0, 0, 128, 128 );

        context.fillStyle = "#fff";
        context.fillRect( 0, 0, 64, 64);
        context.fillRect( 64, 64, 64, 64 );

        var textureCanvas = new THREE.Texture( imageCanvas, THREE.UVMapping, THREE.RepeatWrapping, THREE.RepeatWrapping );
            materialCanvas = new THREE.MeshBasicMaterial( { map: textureCanvas } );

        textureCanvas.needsUpdate = true;
        textureCanvas.repeat.set( 1000, 1000 );


        var geometry = new THREE.PlaneBufferGeometry( 100, 100 );

        var meshCanvas = new THREE.Mesh( geometry, materialCanvas );
        meshCanvas.rotation.x = - Math.PI / 2;
        meshCanvas.scale.set( 1000, 1000, 1000 );




        // PAINTING

        var callbackPainting = function() {

            var image = texturePainting.image;


            scene.add( meshCanvas );

            var geometry = new THREE.PlaneBufferGeometry( 100, 100 );
            var mesh = new THREE.Mesh( geometry, materialPainting );

            addPainting( scene, mesh );

            function addPainting( zscene, zmesh ) {

                zmesh.scale.x = image.width / 100;
                zmesh.scale.y = image.height / 100;

                zscene.add( zmesh );

                var meshFrame = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0x000000, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 5 } )  );
                meshFrame.scale.x = 1.1 * image.width / 100;
                meshFrame.scale.y = 1.1 * image.height / 100;

                zscene.add( meshFrame );

                var meshShadow = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.75, transparent: true } )  );
                meshShadow.position.y = - 1.1 * image.height/2;
                meshShadow.position.z = - 1.1 * image.height/2;
                meshShadow.rotation.x = - Math.PI / 2;
                meshShadow.scale.x = 1.1 * image.width / 100;
                meshShadow.scale.y = 1.1 * image.height / 100;
                zscene.add( meshShadow );

                var floorHeight = - 1.117 * image.height/2;
                meshCanvas.position.y = floorHeight;

            }


        };

        var texturePainting = THREE.ImageUtils.loadTexture( "/assets/images/about.jpeg", THREE.UVMapping, callbackPainting ),
            materialPainting = new THREE.MeshBasicMaterial( { color: 0xffffff, map: texturePainting } );

        texturePainting.minFilter = texturePainting.magFilter = THREE.LinearFilter;


        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setClearColor( scene.fog.color );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
        renderer.autoClear = false;

        renderer.domElement.style.position = "relative";
        container.appendChild( renderer.domElement );

        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        window.addEventListener('resize', onWindowResize)


    }


    function onDocumentMouseMove(event) {

        mouseX = ( event.clientX - windowHalfX );
        mouseY = ( event.clientY - windowHalfY );

    }


    function animate() {

        requestAnimationFrame( animate );

        render();

    }

    function render() {

        camera.position.x += ( mouseX - camera.position.x ) * .05;
        camera.position.y += ( - ( mouseY - 200) - camera.position.y ) * .05;

        camera.lookAt( scene.position );
        renderer.render( scene, camera );


    }

    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }
