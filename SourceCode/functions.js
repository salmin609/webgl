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
    SetGeometry:function(gl) 
    {
        gl.bufferData(
            gl.ARRAY_BUFFER,
            shape.threeDimensionF(),
            gl.STATIC_DRAW);
    },
    SetColors:function(gl) {
        gl.bufferData(
            gl.ARRAY_BUFFER,
            shape.threeDimensionFColor(),
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