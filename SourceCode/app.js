"use strict";

function main() {
    // Get A WebGL context
    var canvas = document.querySelector("#c");
    var gl = canvas.getContext("webgl");
    if (!gl) {
        return;
    }
    var translation = [0, 0];
    var angleInRadians = 0;
    var scale = [1, 1];

    // Use our boilerplate utils to compile the shaders and link into a program
    var program = webglUtils.createProgramFromScripts(gl, ["vertexShader", "fragmentShader"]);
    // look up where the vertex data needs to go.
    var positionAttributeLocation = myUtils.GetAttribLocation(gl, program, "vertexPos");

    // look up uniform locations
    var resolutionUniformLocation = myUtils.GetUniformLocation(gl, program, "resolution");

    // Color uniform locations
    var colorUniformLocation = myUtils.GetUniformLocation(gl, program, "color");

    // mat uniform location
    var matUniformLocation = myUtils.GetUniformLocation(gl, program, "u_mat");

    // Create a buffer to put three 2d clip space points in
    var positionBuffer = myUtils.CreateBuffer(gl);

    myUtils.BindBuffer(gl, gl.ARRAY_BUFFER, positionBuffer);

    myUtils.SetTriangle(gl, myUtils.RandomInt(300), myUtils.RandomInt(300), myUtils.RandomInt(300), myUtils.RandomInt(300));

    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    myUtils.RefreshBuffer(gl);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // Turn on the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);

    myUtils.BindBuffer(gl, gl.ARRAY_BUFFER, positionBuffer);
    // Bind the position buffer.

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
        positionAttributeLocation, size, type, normalize, stride, offset);
    
    
    // set the resolution
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);

    var translationMatrix = m3.translation(translation[0], translation[1]);
    var rotationMatrix = m3.rotation(angleInRadians);
    var scaleMatrix = m3.scaling(scale[0], scale[1]);
    var matrix = m3.multiply(scaleMatrix, rotationMatrix);
    matrix = m3.multiply(matrix, translationMatrix);

    console.log(resolutionUniformLocation, positionAttributeLocation, colorUniformLocation, matUniformLocation);
    gl.uniformMatrix3fv(matUniformLocation, false, matrix);

    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 3;

    gl.drawArrays(primitiveType, offset, count);
}

main();
