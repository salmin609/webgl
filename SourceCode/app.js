"use strict";

function main() {
    // Get A WebGL context
    var canvas = document.querySelector("#c");
    var gl = canvas.getContext("webgl");
    if (!gl) {
        return;
    }
    var translation;
    var rotation;
    var scale;
    var color;
    var program;
    var positionAttributeLocation;
    var colorAttributeLocation;
    var colorUniformLocation;
    var matUniformLocation;
    var positionBuffer;
    var colorBuffer;
    var fieldOfViewRadians;
    
    SetVariables();
    SetUi();
    SetBuffer();
    SettingAttribArray();
    Render();

    function SetUi()
    {
        webglLessonsUI.setupSlider("#fieldOfView", {value: myUtils.radToDeg(fieldOfViewRadians), slide: updateFieldOfView, min: 1, max: 179});
        webglLessonsUI.setupSlider("#x", {value: translation[0], slide: updatePosition(0), min: -200, max: 200 });
        webglLessonsUI.setupSlider("#y", {value: translation[1], slide: updatePosition(1), min: -200, max: 200});
        webglLessonsUI.setupSlider("#z", {value: translation[2], slide: updatePosition(2), min: -1000, max: 0});
        webglLessonsUI.setupSlider("#angleX", {value: myUtils.radToDeg(rotation[0]), slide: updateRotation(0), max: 360});
        webglLessonsUI.setupSlider("#angleY", {value: myUtils.radToDeg(rotation[1]), slide: updateRotation(1), max: 360});
        webglLessonsUI.setupSlider("#angleZ", {value: myUtils.radToDeg(rotation[2]), slide: updateRotation(2), max: 360});
        webglLessonsUI.setupSlider("#scaleX", {value: scale[0], slide: updateScale(0), min: -5, max: 5, step: 0.01, precision: 2});
        webglLessonsUI.setupSlider("#scaleY", {value: scale[1], slide: updateScale(1), min: -5, max: 5, step: 0.01, precision: 2});
        webglLessonsUI.setupSlider("#scaleZ", {value: scale[2], slide: updateScale(2), min: -5, max: 5, step: 0.01, precision: 2});
    }
    function updateFieldOfView(event, ui) {
        fieldOfViewRadians = myUtils.degToRad(ui.value);
        Render();
      }
    
      function updatePosition(index) {
        return function(event, ui) {
          translation[index] = ui.value;
          Render();
        };
      }
    
      function updateRotation(index) {
        return function(event, ui) {
          var angleInDegrees = ui.value;
          var angleInRadians = angleInDegrees * Math.PI / 180;
          rotation[index] = angleInRadians;
          Render();
        };
      }
    
      function updateScale(index) {
        return function(event, ui) {
          scale[index] = ui.value;
          Render();
        };
      }

    function SetBuffer()
    {
        positionBuffer = myUtils.CreateBuffer(gl);
        myUtils.BindBuffer(gl, gl.ARRAY_BUFFER, positionBuffer);
        myUtils.SetGeometry(gl);

        colorBuffer = myUtils.CreateBuffer(gl);
        myUtils.BindBuffer(gl, gl.ARRAY_BUFFER, colorBuffer);
        myUtils.SetColors(gl);
    }
    function SetVariables()
    {
        translation = [-150, 0, -360];
        rotation = [myUtils.degToRad(190), myUtils.degToRad(40), myUtils.degToRad(320)];
        scale = [1, 1, 1];
        color = [Math.random(), Math.random(), Math.random(), 1];
        program = webglUtils.createProgramFromScripts(gl, ["vertexShader", "fragmentShader"]);
        colorAttributeLocation = myUtils.GetAttribLocation(gl, program, "color");
        positionAttributeLocation = myUtils.GetAttribLocation(gl, program, "vertexPos");
        colorUniformLocation = myUtils.GetUniformLocation(gl, program, "color");
        matUniformLocation = myUtils.GetUniformLocation(gl, program, "u_mat");
        fieldOfViewRadians = myUtils.degToRad(80);
    }

    function SettingAttribArray()
    {
        // Turn on the attribute
        gl.enableVertexAttribArray(positionAttributeLocation);

        myUtils.BindBuffer(gl, gl.ARRAY_BUFFER, positionBuffer);
        // Bind the position buffer.

        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        var size = 3;          // 2 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(
            positionAttributeLocation, size, type, normalize, stride, offset);

        gl.enableVertexAttribArray(colorAttributeLocation);

        myUtils.BindBuffer(gl, gl.ARRAY_BUFFER, colorBuffer);

        size = 3;
        type = gl.UNSIGNED_BYTE;
        normalize = true;
        stride = 0;
        offset = 0;

        gl.vertexAttribPointer(
            colorAttributeLocation, size, type, normalize, stride, offset
        );
    }

    function Render()
    {
        myUtils.CullingAndDepthEnable(gl);
        myUtils.RenderingSetting(gl, program);
        myUtils.SendWorldMatrix(gl, fieldOfViewRadians, translation, rotation, scale, matUniformLocation);

        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 16 * 6;

        gl.drawArrays(primitiveType, offset, count);
    }
}


main();
