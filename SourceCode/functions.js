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

    GetWorldMatrix:function(gl, fieldOfViewRadians, translation, rotation, scale)
    {
        var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        var zNear = 1;
        var zFar = 2000;
        var matrix = m4.perspective(fieldOfViewRadians, aspect, zNear, zFar);
        matrix = m4.translate(matrix, translation[0], translation[1], translation[2]);
        matrix = m4.xRotate(matrix, rotation[0]);
        matrix = m4.yRotate(matrix, rotation[1]);
        matrix = m4.zRotate(matrix, rotation[2]);
        matrix = m4.scale(matrix, scale[0], scale[1], scale[2]);
        return matrix;
    },

    SendWorldMatrix:function(gl, fieldOfViewRadians, translation, rotation, scale, matrixUniformLocation)
    {
        var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        var zNear = 1;
        var zFar = 2000;
        var matrix = m4.perspective(fieldOfViewRadians, aspect, zNear, zFar);
        matrix = m4.translate(matrix, translation[0], translation[1], translation[2]);
        matrix = m4.xRotate(matrix, rotation[0]);
        matrix = m4.yRotate(matrix, rotation[1]);
        matrix = m4.zRotate(matrix, rotation[2]);
        matrix = m4.scale(matrix, scale[0], scale[1], scale[2]);
        
        gl.uniformMatrix4fv(matrixUniformLocation, false, matrix);
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