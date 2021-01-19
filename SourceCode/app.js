"use strict";

function main() {
  // Get A WebGL context
  var canvas = document.querySelector("#c");
  var gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }
  let shader = new Shader(gl, "vertexShader", "fragmentShader");
  let obj = new Obj(shader, [0, 0, -360], [1, 1, 1], [myUtils.degToRad(190), myUtils.degToRad(40), myUtils.degToRad(320)]);
  let obj2 = new Obj(shader, [0, 0, -180], [2, 2, 2], [myUtils.degToRad(120), myUtils.degToRad(140), myUtils.degToRad(120)]);
  let objs = new Array();
  objs.push(obj);
  objs.push(obj2);
  var fieldOfViewRadians;
  var cameraAngleRadians;
  var radius;
  var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  var projectionMatrix;
  var then = 0;

  SetVariables();
  SetUi();
  RenderingSetting();
  requestAnimationFrame(Render);

  function SetUi() {
    webglLessonsUI.setupSlider("#cameraAngle", { value: myUtils.radToDeg(cameraAngleRadians), slide: updateCameraAngle, min: -360, max: 360 });
  }
  function RenderingSetting() {
    myUtils.CullingAndDepthEnable(gl);
    myUtils.RenderingSetting(gl, obj.GetProgram());
  }
  function updateCameraAngle(event, ui) {
    cameraAngleRadians = myUtils.degToRad(ui.value);
    Render();
  }

  function SetVariables() 
  {
    fieldOfViewRadians = myUtils.degToRad(60);
    cameraAngleRadians = myUtils.degToRad(0);
    radius = 200;
    projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, 1, 2000);
  }

  function Render(now) 
  {
    now *= 0.001;
    var deltaTime = now - then;
    then = now;

    obj.Rotate(1.2 * deltaTime);
    obj2.Rotate(1.4 * deltaTime);

    var viewMatrix = m4.getViewMatrix(cameraAngleRadians, radius);

    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 16 * 6;

    for(var i = 0; i < objs.length; ++i)
    {
      var object = objs[i];
      var matrix = object.GetWorldMatrix();
      var viewWorldMatrix = m4.multiply(viewMatrix, matrix);
      var viewProjectionMatrix = m4.multiply(projectionMatrix, viewWorldMatrix);

      gl.uniformMatrix4fv(object.shader.GetMatrixUniformLocation(), false, viewProjectionMatrix);
      gl.uniform1i(object.shader.GetTextureUniformLocation(), 0);
      gl.drawArrays(primitiveType, offset, count);
    }

    requestAnimationFrame(Render);
  }
}


main();
