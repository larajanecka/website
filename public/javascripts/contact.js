            var container;

            var contacts = [{
                pic: 'facebook.png',
                link: 'https://www.facebook.com/lara.janeka'
            },{
                pic: 'email.jpg',
                func: function() {
                    window.location.href = "mailto:lara.janecka@gmail.tld"
                }
            },{
                pic: 'github.jpg',
                link: 'https://github.com/larajanecka'
            },{
                pic: 'linkedIn.png',
                link: 'https://www.linkedin.com/in/larajanecka'
            }];

            var camera, scene, renderer, raycaster, mouse;

            var cube, plane, objects = [];

            var targetRotation = 0;
            var targetRotationOnMouseDown = 0;

            var mouseX = 0;
            var mouseXOnMouseDown = 0;

            var moveForward = false;
            var moveBackwards = false;
            var moveLeft = false;
            var moveRight = false;
            var moveUp = false;
            var moveDown = false;

            var targetMoveLeft = false;
            var targetMoveRight = false;


            init();
            animate();

            function init() {

                container = document.createElement( 'div' );
                document.body.appendChild( container );

                camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
                camera.position.set( 750, 750, 750 );
                camera.target = new THREE.Vector3( 0, 150, 0 );

                scene = new THREE.Scene();

                raycaster = new THREE.Raycaster();
                mouse = new THREE.Vector2();

                // Plane

                var material = new THREE.MeshDepthMaterial( { side: THREE.DoubleSide, overdraw: 0.5 } );

                plane = new THREE.Mesh( new THREE.PlaneBufferGeometry( 1000, 1000, 10, 10 ), material );
                plane.position.y = - 100;
                plane.rotation.x = - Math.PI / 2;
                scene.add( plane );

                // Cubes

                geometry = new THREE.BoxGeometry( 100, 100, 100 );

                for ( var i = 0; i < contacts.length; i ++ ) {
                    var texture = THREE.ImageUtils.loadTexture( "/assets/images/" + contacts[i].pic);
                    material = new THREE.MeshBasicMaterial( { map: texture } );

                    cube = new THREE.Mesh( geometry, material );

                    cube.position.x = ( i % 2 ) * 300 - 250;
                    cube.position.z = Math.floor( i / 2 ) * 300 - 250;

                    cube.rotation.x = Math.random() * 200 - 100;
                    cube.rotation.y = Math.random() * 300 - 100;
                    cube.rotation.z = Math.random() * 200 - 100;

                    cube.link = contacts[i].link;
                    cube.func = contacts[i].func;

                    scene.add( cube );

                    objects.push( cube );

                }

                renderer = new THREE.CanvasRenderer();
                renderer.setPixelRatio( window.devicePixelRatio );
                renderer.setSize( window.innerWidth, window.innerHeight );
                container.appendChild( renderer.domElement );

                $("canvas").click(onDocumentClick)
                document.addEventListener( 'keydown', onDocumentKeyDown, false );
                document.addEventListener( 'keyup', onDocumentKeyUp, false );


                window.addEventListener( 'resize', onWindowResize, false );

            }

            function onWindowResize() {

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize( window.innerWidth, window.innerHeight );

            }

            function onDocumentKeyDown( event ) {

                switch ( event.keyCode ) {

                    case 38: moveForward = true; break; // up
                    case 40: moveBackwards = true; break; // down
                    case 37: moveLeft = true; break; // left
                    case 39: moveRight = true; break; // right
                    case 87: moveUp = true; break; // w
                    case 83: moveDown = true; break; // s
                    case 65: targetMoveLeft = true; break; // a
                    case 68: targetMoveRight = true; break; // d

                }

            }

            function onDocumentKeyUp( evenobjectst ) {

                switch ( event.keyCode ) {

                    case 38: moveForward = false; break; // up
                    case 40: moveBackwards = false; break; // down
                    case 37: moveLeft = false; break; // left
                    case 39: moveRight = false; break; // right
                    case 87: moveUp = false; break; // w
                    case 83: moveDown = false; break; // s
                    case 65: targetMoveLeft = false; break; // a
                    case 68: targetMoveRight = false; break; // d

                }

            }

            //

            function animate() {

                requestAnimationFrame( animate );

                render();

            }

            function render() {

                if ( moveForward ) camera.position.z -= 10;
                if ( moveBackwards ) camera.position.z += 10;

                if ( moveLeft ) camera.position.x -= 10;
                if ( moveRight ) camera.position.x += 10;

                if ( moveUp ) camera.position.y += 10;
                if ( moveDown ) camera.position.y -= 10;

                if ( targetMoveLeft ) camera.target.x -= 10;
                if ( targetMoveRight ) camera.target.x += 10;

                camera.lookAt( camera.target );

                for ( var i = 0; i < objects.length; i++ ) {

                    var object = objects[ i ];

                    object.rotation.x += 0.01;
                    object.rotation.y += 0.005;
                    object.position.y = Math.sin( object.rotation.x ) * 200 + 200;


                }

                renderer.render( scene, camera );

            }

            function onDocumentClick(event) {
                mouse.x = (event.clientX / renderer.domElement.width) * 2 - 1;
                mouse.y = - (event.clientY / renderer.domElement.height) * 2 + 1;

                raycaster.setFromCamera(mouse, camera);

                var intersects = raycaster.intersectObjects(objects);
                if(intersects.length == 0) {
                    return;
                }
                var object = intersects[0].object;

                if(object.func) {
                    object.func();
                } else {
                    window.location = object.link;
                }
                //window.location = intersects[0].link;
                console.log(intersects[0].object.link)
            }
