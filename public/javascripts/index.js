        var container;

        var camera, scene, renderer, controls, raycaster, mouse;

        //Need to abstract this into a constants file
        // Add preset colors
        var links = ['/about', '/resume', '/skills', '/thanks', '/experience', '/contact'];
        var text = [{
                title: "About",
                description: "A brief description of me"
            },{
                title: "Resume",
                description: "Download my resume"
            },{
                title: "Skills",
                description: "A description of what I can do"
            },{
                title: "Thanks",
                description: "Credit to projects used on this site"
            },{
                title: "Experience",
                description: "A description of what I have done"
            },{
                title: "Contact",
                description: "Various methods of contacting me"
            }
        ]

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


            raycaster = new THREE.Raycaster();
            mouse = new THREE.Vector2();



            var materials = [];
            for ( var i = 0; i < 6; i ++ ) {
                materials.push( new THREE.MeshBasicMaterial( {map: getTexture(i) } ) );
            }


            var geometry = new THREE.BoxGeometry(200, 200, 200);
            for (var i = 0, j = 0; i < geometry.faces.length; i += 2, j ++) {;
                geometry.faces[i].link = links[j];
                geometry.faces[i + 1].link = links[j];

            }

            cube = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial(materials));
            scene.add( cube );


            $("canvas").dblclick(onDocumentClick)
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
            if(intersects.length == 0) {
                return;
            }
            window.location = intersects[0].face.link;
    }

    function getTexture(index) {
        var hex = "#" + Math.random().toString(16).slice(2, 8);

        var bitmap = document.createElement('canvas');
        var g = bitmap.getContext('2d');

        bitmap.width = 200;
        bitmap.height = 200;

        g.fillStyle = hex;
        g.fillRect(0,0,200,200);

        g.font = 'Bold 20px Arial';
        g.fillStyle = 'white';
        g.textAlign = 'center'
        g.fillText(text[index].title, 100, 100);

        g.font = 'Bold 10px Arial';
        g.fillText(text[index].description, 100, 120);

        var texture = new THREE.Texture(bitmap)
        texture.needsUpdate = true;
        return texture;

    }

