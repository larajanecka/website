        var container;

        var camera, scene, renderer, controls, raycaster, mouse;

        var links = ['/about', '/resume', '/skills', '/soft', '/experience', '/contact'];

        init();
        animate();

        function init() {

            renderer = new THREE.WebGLRenderer();
            renderer.setClearColor( 0x222222 );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );

            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
            camera.position.set( 0, 0, 500 );

            controls = new THREE.TrackballControls( camera, renderer.domElement );
            controls.minDistance = 200;
            controls.maxDistance = 500;

            scene.add( new THREE.AmbientLight( 0x222222 ) );

            var light = new THREE.PointLight( 0xffffff );
            light.position.copy( camera.position );
            scene.add( light );


            var geometry = new THREE.BoxGeometry(200, 200, 200);
            raycaster = new THREE.Raycaster();
            mouse = new THREE.Vector2();

            for (var i = 0, j = 0; i < geometry.faces.length; i += 2, j ++) {

                var hex = Math.random() * 0xffffff;
                geometry.faces[ i ].color.setHex(hex);
                geometry.faces[ i + 1 ].color.setHex(hex);
                geometry.faces[i].link = links[j];
                geometry.faces[i + 1].link = links[j];

            }



            var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5 } );

                cube = new THREE.Mesh( geometry, material );
                scene.add( cube );


            document.addEventListener('dblclick', onDocumentClick)
            window.addEventListener('resize', onWindowResize)

        }

        function animate() {

            requestAnimationFrame(animate);

            controls.update();

            renderer.render(scene, camera);

        }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function onDocumentClick(event) {
            mouse.x = (event.clientX / renderer.domElement.width) * 2 - 1;
            mouse.y = - (event.clientY / renderer.domElement.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);

            var intersects = raycaster.intersectObjects([cube]);
            console.log(intersects[0].face.link)
    }

