app.controller('3dViewCtrl', function($scope, ColorTableFactory, colorTable) {


    _colorTable = colorTable;

    $scope.getCurrentColor = function() {
      return $scope.currentColor;
    };

    $scope.setColor = function (newColor) {
      console.log('newColor: ', newColor);
      $scope.currentColor = {
        hue: _colorTable[newColor.colIdx][0],
        values: newColor
      };
      $scope.currentPalette = _colorTable[newColor.colIdx].slice().reverse();

    };

    $scope.setColor( _colorTable[0][5][3] );

  $scope.moreHue = function(targetHue) {
    var newColor = ColorTableFactory.moreHue($scope.currentColor.values, targetHue);
    $scope.setColor(newColor);
    console.log('currentPalette', $scope.currentPalette);
  };

  $scope.findColor = function(targetHue) {
    var newColor = ColorTableFactory.findColor(targetHue);
    $scope.setColor(newColor);
  };

  $scope.moreContrast = function() {
    var newColor = ColorTableFactory.moreContrast($scope.currentColor.values);
    $scope.setColor(newColor);
  };

  $scope.lessContrast = function() {
    var newColor = ColorTableFactory.lessContrast($scope.currentColor.values);
    $scope.setColor(newColor);
  };

  $scope.lighter = function() {
    console.log('lighter triggered');
    var newColor = ColorTableFactory.lighter($scope.currentColor.values);
    $scope.setColor(newColor);
  };

  $scope.darker = function() {
    var newColor = ColorTableFactory.darker($scope.currentColor.values);
    $scope.setColor(newColor);
  };

  $scope.save = function() {
    $scope.savedColors.push($scope.currentColor);
  };

  $scope.savedColors = [];

  // var commands = {
  //   'more :targetHue' : $scope.moreHue,
  //   'less contrast' : $scope.lessContrast,
  //   'more contrast' : $scope.moreContrast,
  //   'lighter' : $scope.lighter,
  //   'darker' : $scope.darker,
  //   'perfect' : function() {
  //     $scope.save();
  //   }
  // };

  var colorNames = ['red', 'blue', 'green', 'violet', 'orange', 'yellow'];

 // //annyang.addCommands(commands);
 //
 //  annyang.addCallback('result', function(userSaid) {
 //    //console.log(userSaid);
 //    var words = [];
 //    userSaid.forEach(function(phrase) {
 //      console.log(phrase);
 //      if (phrase.indexOf('lighter') !== -1) {
 //        $scope.lighter();
 //      }
 //      else if (phrase.indexOf('darker') !== -1) $scope.darker();
 //      else if (phrase.indexOf('perfect') !== -1) $scope.save();
 //      else if (phrase.indexOf('more contrast') !== -1) $scope.moreContrast();
 //      else if (phrase.indexOf('less contrast') !== -1) $scope.lessContrast();
 //      else if (phrase.indexOf('find') !== -1) {
 //        words = phrase.split(' ');
 //          words.forEach(function(word) {
 //            if (colorNames.indexOf(word.toLowerCase()) !== -1) {
 //              $scope.findColor(word.toLowerCase());
 //            }
 //          });
 //      }
 //      else {
 //        words = phrase.split(' ');
 //          words.forEach(function(word) {
 //            if (colorNames.indexOf(word.toLowerCase()) !== -1) {
 //              $scope.moreHue(word.toLowerCase());
 //            }
 //          });
 //        }
 //
 //
 //      $scope.$digest();
 //    });
 //  });
 //
 //      // var words = phrase.split(' ');
 //      // if (words.indexOf('more') !== -1) {
 //      //   words.forEach(function(word) {
 //      //     if (colorNames
 //      //   })
 //      //}
 //  // });
 //
 //  annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
 //    console.log(userSaid); // sample output: 'hello'
 //    console.log(commandText); // sample output: 'hello (there)'
 //    console.log(phrases); // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']
 //  });
 //
 //  annyang.start({autoRestart: true});

 var scene = new THREE.Scene();
 scene.add( new THREE.AmbientLight( 0x555555 ) );
 var light = new THREE.SpotLight( 0xffffff, 1.5 );
 light.position.set( 0, 500, 2000 );
 scene.add( light );
 camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
 camera.position.z = 1000;
 controls = new THREE.TrackballControls( camera );
 controls.rotateSpeed = 1.0;
 controls.zoomSpeed = 1.2;
 controls.panSpeed = 0.8;
 controls.noZoom = false;
 controls.noPan = false;
 controls.staticMoving = true;
 controls.dynamicDampingFactor = 0.3;

 var renderer = new THREE.WebGLRenderer();
 renderer.setSize( window.innerWidth, window.innerHeight );
 document.body.appendChild( renderer.domElement );


 for ( var i = 0; i < _colorTable.length; i ++ ) {
   var angle = i/_colorTable.length * 2 * Math.PI;
   for ( var j = 0; j < _colorTable[i].length; j++) {
     for (var k = 0; k < _colorTable[i][j].length; k++) {
       var geometry = new THREE.BoxGeometry( 1, .2, 1 );
       geometry.rotateZ(angle);
       var xVal = Math.cos(angle) * (k+1) * 1.3;
       var zVal = Math.sin(angle) * (k+1) * 1.3;
       geometry.translate(xVal,zVal,j*1.2);
       //geometry.translate(i,j,k);
       //geometry.rotateY(angle);
       var newColor = new THREE.Color();
       newColor.setRGB(_colorTable[i][j][k].r/255, _colorTable[i][j][k].g/255, _colorTable[i][j][k].b/255);
       var material = new THREE.MeshBasicMaterial( { color: newColor } );
       var cube = new THREE.Mesh( geometry, material );
       //cube.rotateY(angle);

       scene.add( cube );
     }
   }
 }

 camera.position.z = 5;

 function render() {
   controls.update();
   requestAnimationFrame( render );
    renderer.render( scene, camera );

 }
 render();


 // var container, stats;
 //   var camera, controls, scene, renderer;
 //   var pickingData = [], pickingTexture, pickingScene;
 //   var objects = [];
 //   var highlightBox;
 //   var mouse = new THREE.Vector2();
 //   var offset = new THREE.Vector3( 10, 10, 10 );
 //   init();
 //   animate();
 //
 //   function init() {
 //     container = document.getElementById( "3dview" );
 //     camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
 //     camera.position.z = 1000;
 //     controls = new THREE.TrackballControls( camera );
 //     controls.rotateSpeed = 1.0;
 //     controls.zoomSpeed = 1.2;
 //     controls.panSpeed = 0.8;
 //     controls.noZoom = false;
 //     controls.noPan = false;
 //     controls.staticMoving = true;
 //     controls.dynamicDampingFactor = 0.3;
 //     scene = new THREE.Scene();
 //     pickingScene = new THREE.Scene();
 //     pickingTexture = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight );
 //     pickingTexture.texture.minFilter = THREE.LinearFilter;
 //     scene.add( new THREE.AmbientLight( 0x555555 ) );
 //     var light = new THREE.SpotLight( 0xffffff, 1.5 );
 //     light.position.set( 0, 500, 2000 );
 //     scene.add( light );
 //     var geometry = new THREE.Geometry(),
 //     pickingGeometry = new THREE.Geometry(),
 //     pickingMaterial = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } ),
 //     defaultMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors, shininess: 0	} );
 //
 //     function applyVertexColors( g, c ) {
 //       g.faces.forEach( function( f ) {
 //         var n = ( f instanceof THREE.Face3 ) ? 3 : 4;
 //         for( var j = 0; j < n; j ++ ) {
 //           f.vertexColors[ j ] = c;
 //         }
 //       } );
 //     }
 //
 //     var geom = new THREE.BoxGeometry( 1, 1, 1 );
 //     var color = new THREE.Color();
 //     var matrix = new THREE.Matrix4();
 //     var quaternion = new THREE.Quaternion();
 //
 //     for ( var i = 0; i < _colorTable.length; i ++ ) {
 //       for ( var j = 0; j < _colorTable[i].length; j++) {
 //         for (var k = 0; k < _colorTable[i][j].length; k++) {
 //           var position = new THREE.Vector3();
 //           position.x = i;
 //           position.y = j;
 //           position.z = k;
 //           var rotation = new THREE.Euler();
 //           rotation.x = i/_colorTable.length * 2 * Math.PI;
 //          //  rotation.y = Math.random() * 2 * Math.PI;
 //          //  rotation.z = Math.random() * 2 * Math.PI;
 //          //  var scale = new THREE.Vector3();
 //          //  scale.x = i/_colorTable.length * 200 + 100;
 //          //  scale.y = j/_colorTable[j].length * 200 + 100;
 //          //  scale.z = k/_colorTable[i][j] * 200 + 100;
 //          //  quaternion.setFromEuler( rotation, false );
 //          //  matrix.compose( position, quaternion, scale );
 //          //  // give the geom's vertices a random color, to be displayed
 //          //  color.setRGB(_colorTable[i][j][k].r/255, _colorTable[i][j][k].g/255, _colorTable[i][j][k].b/255);
 //          //  applyVertexColors( geom, color );
 //          //  geometry.merge( geom, matrix );
 //          //  // give the geom's vertices a color corresponding to the "id"
 //          //  applyVertexColors( geom, color );
 //          //  pickingGeometry.merge( geom, matrix );
 //          //  pickingData[i][j][k] = {
 //          //    position: position,
 //          //    rotation: rotation,
 //          //    scale: scale
 //          //  };
 //         }
 //       }
 //     }
 //
 //
 //     var drawnObject = new THREE.Mesh( geometry, defaultMaterial );
 //     scene.add( drawnObject );
 //     pickingScene.add( new THREE.Mesh( pickingGeometry, pickingMaterial ) );
 //     highlightBox = new THREE.Mesh(
 //       new THREE.BoxGeometry( 1, 1, 1 ),
 //       new THREE.MeshLambertMaterial( { color: 0xffff00 }
 //     ) );
 //     scene.add( highlightBox );
 //     renderer = new THREE.WebGLRenderer( { antialias: true } );
 //     renderer.setClearColor( 0xffffff );
 //     renderer.setPixelRatio( window.devicePixelRatio );
 //     renderer.setSize( window.innerWidth, window.innerHeight );
 //     renderer.sortObjects = false;
 //     container.appendChild( renderer.domElement );
 //     stats = new Stats();
 //     container.appendChild( stats.dom );
 //     renderer.domElement.addEventListener( 'mousemove', onMouseMove );
 //   }
 //   //
 //   function onMouseMove( e ) {
 //     mouse.x = e.clientX;
 //     mouse.y = e.clientY;
 //   }
 //   function animate() {
 //     requestAnimationFrame( animate );
 //     render();
 //     stats.update();
 //   }
 //  //  function pick() {
 //  //    //render the picking scene off-screen
 //  //    renderer.render( pickingScene, camera, pickingTexture );
 //  //    //create buffer for reading single pixel
 //  //    var pixelBuffer = new Uint8Array( 4 );
 //  //    //read the pixel under the mouse from the texture
 //  //    renderer.readRenderTargetPixels(pickingTexture, mouse.x, pickingTexture.height - mouse.y, 1, 1, pixelBuffer);
 //  //    //interpret the pixel as an ID
 //  //    var id = ( pixelBuffer[0] << 16 ) | ( pixelBuffer[1] << 8 ) | ( pixelBuffer[2] );
 //  //    var data = pickingData[ id ];
 //  //    if ( data) {
 //  //      //move our highlightBox so that it surrounds the picked object
 //  //      if ( data.position && data.rotation && data.scale ){
 //  //        highlightBox.position.copy( data.position );
 //  //        highlightBox.rotation.copy( data.rotation );
 //  //        highlightBox.scale.copy( data.scale ).add( offset );
 //  //        highlightBox.visible = true;
 //  //      }
 //  //    } else {
 //  //      highlightBox.visible = false;
 //  //    }
 //  //  }
 //   function render() {
 //     controls.update();
 //    //  pick();
 //     renderer.render( scene, camera );
 //   }

});
