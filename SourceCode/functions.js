var myUtils = {
    RandomInt:function(range)
    {
        return Math.floor(Math.random() * range);    
    },
    CullingAndDepthEnable:function(gl)
    {
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
    },
    RenderingSetting:function(gl, program)
    {
        webglUtils.resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        myUtils.RefreshBuffer(gl);
        gl.useProgram(program);
    },
    SetGeometry:function(gl, info)
    {
        gl.bufferData(
            gl.ARRAY_BUFFER,
            shape.ThreeDimensionF(gl, info),
            gl.STATIC_DRAW);
    },
    SetColors:function(gl) {
        gl.bufferData(
            gl.ARRAY_BUFFER,
            shape.ThreeDimensionFColor(),
            gl.STATIC_DRAW);
    },
    SetTexcoords:function(gl) 
    {
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([
              // left column front
              0, 0,
              0, 1,
              1, 0,
              0, 1,
              1, 1,
              1, 0,
      
              // top rung front
              0, 0,
              0, 1,
              1, 0,
              0, 1,
              1, 1,
              1, 0,
      
              // middle rung front
              0, 0,
              0, 1,
              1, 0,
              0, 1,
              1, 1,
              1, 0,
      
              // left column back
              0, 0,
              1, 0,
              0, 1,
              0, 1,
              1, 0,
              1, 1,
      
              // top rung back
              0, 0,
              1, 0,
              0, 1,
              0, 1,
              1, 0,
              1, 1,
      
              // middle rung back
              0, 0,
              1, 0,
              0, 1,
              0, 1,
              1, 0,
              1, 1,
      
              // top
              0, 0,
              1, 0,
              1, 1,
              0, 0,
              1, 1,
              0, 1,
      
              // top rung right
              0, 0,
              1, 0,
              1, 1,
              0, 0,
              1, 1,
              0, 1,
      
              // under top rung
              0, 0,
              0, 1,
              1, 1,
              0, 0,
              1, 1,
              1, 0,
      
              // between top rung and middle
              0, 0,
              1, 1,
              0, 1,
              0, 0,
              1, 0,
              1, 1,
      
              // top of middle rung
              0, 0,
              1, 1,
              0, 1,
              0, 0,
              1, 0,
              1, 1,
      
              // right of middle rung
              0, 0,
              1, 1,
              0, 1,
              0, 0,
              1, 0,
              1, 1,
      
              // bottom of middle rung.
              0, 0,
              0, 1,
              1, 1,
              0, 0,
              1, 1,
              1, 0,
      
              // right of bottom
              0, 0,
              1, 1,
              0, 1,
              0, 0,
              1, 0,
              1, 1,
      
              // bottom
              0, 0,
              0, 1,
              1, 1,
              0, 0,
              1, 1,
              1, 0,
      
              // left side
              0, 0,
              0, 1,
              1, 1,
              0, 0,
              1, 1,
              1, 0]),
            gl.STATIC_DRAW);
      },
    GetAttribLocation:function(gl, program, name)
    {
        return gl.getAttribLocation(program, name);
    },

    GetUniformLocation:function(gl, program, name)
    {
        return gl.getUniformLocation(program, name);    
    },

    BindBuffer:function(gl, type, buffer)
    {
        gl.bindBuffer(type, buffer);
    },
    CreateBuffer:function(gl)
    {
        return gl.createBuffer();
    },
    RefreshBuffer:function(gl)
    {
        gl.clearColor(0.2, 0.3, 0.4, 0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    },
    RadToDeg:function(r) 
    {
        return r * 180 / Math.PI;
    },
    DegToRad:function(d)
    {
        return d * Math.PI / 180;
    },
};