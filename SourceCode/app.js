"use strict";

function main() {
    // Get A WebGL context
    var canvas = document.querySelector("#c");
    var gl = canvas.getContext("webgl");
    if (!gl) {
        return;
    }
    // Use our boilerplate utils to compile the shaders and link into a program
    var program = webglUtils.createProgramFromScripts(gl, ["vertexShader", "fragmentShader"]);

    // look up where the vertex data needs to go.
    var positionAttributeLocation = myUtils.GetAttribLocation(gl, program, "vertexPos");

    // look up uniform locations
    var resolutionUniformLocation = myUtils.GetUniformLocation(gl, program, "resolution");

    // Color uniform locations
    var colorUniformLocation = myUtils.GetUniformLocation(gl, program, "color");

    // Create a buffer to put three 2d clip space points in
    var positionBuffer = myUtils.CreateBuffer(gl);
    
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    myUtils.RefreshBuffer(gl);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // Turn on the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Bind the position buffer.
    myUtils.BindBuffer(gl, gl.ARRAY_BUFFER, positionBuffer);

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

    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 6;

    for (var i = 0; i < 50; ++i) 
    {
        // draw
        myUtils.SetRectangle(gl, myUtils.RandomInt(300), myUtils.RandomInt(300), myUtils.RandomInt(300), myUtils.RandomInt(300));
        gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);
        gl.drawArrays(primitiveType, offset, count);

        myUtils.SetTriangle(gl, myUtils.RandomInt(300), myUtils.RandomInt(300), myUtils.RandomInt(300), myUtils.RandomInt(300));
        gl.drawArrays(primitiveType, offset, 3);
    }

}

main();
