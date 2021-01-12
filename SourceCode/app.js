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
  var program;
  var positionAttributeLocation;
  var textureAttributeLocation;
  var textureUniformLocation;
  var matUniformLocation;
  var positionBuffer;
  var textureBuffer;
  var fieldOfViewRadians;
  var cameraAngleRadians;
  var numFs;
  var radius;
  var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  var projectionMatrix;
  var then = 0;

  SetVariables();
  SetUi();
  SetBuffer();
  SettingAttribArray();
  RenderingSetting();
  requestAnimationFrame(Render);

  function SetUi() {
    webglLessonsUI.setupSlider("#cameraAngle", { value: myUtils.radToDeg(cameraAngleRadians), slide: updateCameraAngle, min: -360, max: 360 });
  }
  function RenderingSetting() {
    myUtils.CullingAndDepthEnable(gl);
    myUtils.RenderingSetting(gl, program);
  }
  function updateCameraAngle(event, ui) {
    cameraAngleRadians = myUtils.degToRad(ui.value);
    Render();
  }

  function SetBuffer() {
    positionBuffer = myUtils.CreateBuffer(gl);
    myUtils.BindBuffer(gl, gl.ARRAY_BUFFER, positionBuffer);
    myUtils.SetGeometry(gl);

    textureBuffer = myUtils.CreateBuffer(gl);
    // myUtils.BindBuffer(gl, gl.ARRAY_BUFFER, textureBuffer);
    // myUtils.SetColors(gl);
  }

  function SetVariables() 
  {
    translation = [0, 0, -360];
    rotation = [myUtils.degToRad(190), myUtils.degToRad(40), myUtils.degToRad(320)];
    scale = [1, 1, 1];
    program = webglUtils.createProgramFromScripts(gl, ["vertexShader", "fragmentShader"]);
    positionAttributeLocation = myUtils.GetAttribLocation(gl, program, "vertexPos");
    textureAttributeLocation = myUtils.GetAttribLocation(gl, program, "texcoord");
    textureUniformLocation = myUtils.GetUniformLocation(gl, program, "u_texture");
    matUniformLocation = myUtils.GetUniformLocation(gl, program, "u_mat");
    fieldOfViewRadians = myUtils.degToRad(60);
    cameraAngleRadians = myUtils.degToRad(0);
    radius = 200;
    numFs = 5;
    projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, 1, 2000);
  }

  function SettingAttribArray() {
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

    myUtils.BindBuffer(gl, gl.ARRAY_BUFFER, textureBuffer);
    myUtils.setTexcoords(gl);

    gl.enableVertexAttribArray(textureAttributeLocation);
    gl.vertexAttribPointer(textureAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
    var image = new Image();
    image.src = "kachu.png";
    image.addEventListener('load', function()
    {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.generateMipmap(gl.TEXTURE_2D);
    });

    // gl.enableVertexAttribArray(colorAttributeLocation);

    // myUtils.BindBuffer(gl, gl.ARRAY_BUFFER, colorBuffer);

    // size = 3;
    // type = gl.UNSIGNED_BYTE;
    // normalize = true;
    // stride = 0;
    // offset = 0;

    // gl.vertexAttribPointer(
    //   colorAttributeLocation, size, type, normalize, stride, offset
    // );
  }

  function Render(now) 
  {
    now *= 0.001;
    var deltaTime = now - then;
    then = now;

    rotation[1] += 1.2 * deltaTime;
    var viewMatrix = m4.getViewMatrix(cameraAngleRadians, radius);
    var matrix = m4.getWorldMatrix(translation, rotation, scale);

    var viewWorldMatrix = m4.multiply(viewMatrix, matrix);
    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewWorldMatrix);

    gl.uniformMatrix4fv(matUniformLocation, false, viewProjectionMatrix);

    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 16 * 6;

    gl.uniform1i(textureUniformLocation, 0);

    gl.drawArrays(primitiveType, offset, count);
    requestAnimationFrame(Render);
  }
}


main();
