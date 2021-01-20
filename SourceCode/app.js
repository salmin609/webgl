"use strict";

function main() {
  // Get A WebGL context
  var canvas = document.querySelector("#c");
  var gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }
  let shader = new Shader(gl, "vertexShader", "fragmentShader");
  let obj = new Obj(shader, [0, 0, -360], [1, 1, 1], [myUtils.DegToRad(190), myUtils.DegToRad(40), myUtils.DegToRad(320)]);
  let obj2 = new Obj(shader, [0, 0, -180], [2, 2, 2], [myUtils.DegToRad(120), myUtils.DegToRad(140), myUtils.DegToRad(120)]);
  let objs = new Array();
  objs.push(obj);
  objs.push(obj2);

  let camera = new Camera(gl);
  var then = 0;

  SetVariables();
  SetUi();
  RenderingSetting();
  requestAnimationFrame(Render);

  function SetUi() {
    
  }
  function updateCameraAngle(event, ui) {
  }
  function RenderingSetting() {
    myUtils.CullingAndDepthEnable(gl);
    myUtils.RenderingSetting(gl, obj.GetProgram());
  }
  

  function SetVariables() 
  {
  }

  function Render(now) 
  {
    now *= 0.001;
    var deltaTime = now - then;
    then = now;

    obj.Rotate(1.2 * deltaTime);
    obj2.Rotate(1.4 * deltaTime);

    var projectionMatrix = projection.GetProjectionMatrix(gl);
    var viewMatrix = camera.GetViewMatrix();

    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 16 * 6;

    for(var i = 0; i < objs.length; ++i)
    {
      var object = objs[i];
      var matrix = object.GetWorldMatrix();
      var viewProjectionMatrix = m4.GetProjViewWorldMatrix(matrix, viewMatrix, projectionMatrix);

      gl.uniformMatrix4fv(object.shader.GetMatrixUniformLocation(), false, viewProjectionMatrix);
      gl.uniform1i(object.shader.GetTextureUniformLocation(), 0);
      gl.drawArrays(primitiveType, offset, count);
    }

    requestAnimationFrame(Render);
  }
}


main();
