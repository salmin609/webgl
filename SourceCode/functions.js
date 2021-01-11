var myUtils = {
    RandomInt:function(range)
    {
        return Math.floor(Math.random() * range);    
    },
    
    SetGeometry:function(gl) 
    {
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([
                // left column front
                0,   0,  0,
                0, 150,  0,
                30,   0,  0,
                0, 150,  0,
                30, 150,  0,
                30,   0,  0,
      
                // top rung front
                30,   0,  0,
                30,  30,  0,
                100,   0,  0,
                30,  30,  0,
                100,  30,  0,
                100,   0,  0,
      
                // middle rung front
                30,  60,  0,
                30,  90,  0,
                67,  60,  0,
                30,  90,  0,
                67,  90,  0,
                67,  60,  0,
      
                // left column back
                  0,   0,  30,
                 30,   0,  30,
                  0, 150,  30,
                  0, 150,  30,
                 30,   0,  30,
                 30, 150,  30,
      
                // top rung back
                 30,   0,  30,
                100,   0,  30,
                 30,  30,  30,
                 30,  30,  30,
                100,   0,  30,
                100,  30,  30,
      
                // middle rung back
                 30,  60,  30,
                 67,  60,  30,
                 30,  90,  30,
                 30,  90,  30,
                 67,  60,  30,
                 67,  90,  30,
      
                // top
                  0,   0,   0,
                100,   0,   0,
                100,   0,  30,
                  0,   0,   0,
                100,   0,  30,
                  0,   0,  30,
      
                // top rung right
                100,   0,   0,
                100,  30,   0,
                100,  30,  30,
                100,   0,   0,
                100,  30,  30,
                100,   0,  30,
      
                // under top rung
                30,   30,   0,
                30,   30,  30,
                100,  30,  30,
                30,   30,   0,
                100,  30,  30,
                100,  30,   0,
      
                // between top rung and middle
                30,   30,   0,
                30,   60,  30,
                30,   30,  30,
                30,   30,   0,
                30,   60,   0,
                30,   60,  30,
      
                // top of middle rung
                30,   60,   0,
                67,   60,  30,
                30,   60,  30,
                30,   60,   0,
                67,   60,   0,
                67,   60,  30,
      
                // right of middle rung
                67,   60,   0,
                67,   90,  30,
                67,   60,  30,
                67,   60,   0,
                67,   90,   0,
                67,   90,  30,
      
                // bottom of middle rung.
                30,   90,   0,
                30,   90,  30,
                67,   90,  30,
                30,   90,   0,
                67,   90,  30,
                67,   90,   0,
      
                // right of bottom
                30,   90,   0,
                30,  150,  30,
                30,   90,  30,
                30,   90,   0,
                30,  150,   0,
                30,  150,  30,
      
                // bottom
                0,   150,   0,
                0,   150,  30,
                30,  150,  30,
                0,   150,   0,
                30,  150,  30,
                30,  150,   0,
      
                // left side
                0,   0,   0,
                0,   0,  30,
                0, 150,  30,
                0,   0,   0,
                0, 150,  30,
                0, 150,   0]),
            gl.STATIC_DRAW);
    },
    SetColors:function(gl) {
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Uint8Array([
                // left column front
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
      
                // top rung front
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
      
                // middle rung front
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
              200,  70, 120,
      
                // left column back
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
      
                // top rung back
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
      
                // middle rung back
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
              80, 70, 200,
      
                // top
              70, 200, 210,
              70, 200, 210,
              70, 200, 210,
              70, 200, 210,
              70, 200, 210,
              70, 200, 210,
      
                // top rung right
              200, 200, 70,
              200, 200, 70,
              200, 200, 70,
              200, 200, 70,
              200, 200, 70,
              200, 200, 70,
      
                // under top rung
              210, 100, 70,
              210, 100, 70,
              210, 100, 70,
              210, 100, 70,
              210, 100, 70,
              210, 100, 70,
      
                // between top rung and middle
              210, 160, 70,
              210, 160, 70,
              210, 160, 70,
              210, 160, 70,
              210, 160, 70,
              210, 160, 70,
      
                // top of middle rung
              70, 180, 210,
              70, 180, 210,
              70, 180, 210,
              70, 180, 210,
              70, 180, 210,
              70, 180, 210,
      
                // right of middle rung
              100, 70, 210,
              100, 70, 210,
              100, 70, 210,
              100, 70, 210,
              100, 70, 210,
              100, 70, 210,
      
                // bottom of middle rung.
              76, 210, 100,
              76, 210, 100,
              76, 210, 100,
              76, 210, 100,
              76, 210, 100,
              76, 210, 100,
      
                // right of bottom
              140, 210, 80,
              140, 210, 80,
              140, 210, 80,
              140, 210, 80,
              140, 210, 80,
              140, 210, 80,
      
                // bottom
              90, 130, 110,
              90, 130, 110,
              90, 130, 110,
              90, 130, 110,
              90, 130, 110,
              90, 130, 110,
      
                // left side
              160, 160, 220,
              160, 160, 220,
              160, 160, 220,
              160, 160, 220,
              160, 160, 220,
              160, 160, 220]),
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
    radToDeg:function(r) 
    {
        return r * 180 / Math.PI;
    },
    degToRad:function(d)
    {
        return d * Math.PI / 180;
    },
};