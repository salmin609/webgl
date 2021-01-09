var myUtils = {
    RandomInt:function(range)
    {
        return Math.floor(Math.random() * range);    
    },
    
    SetRectangle:function(gl, x, y, width, height)
    {
        var x1 = x;
        var x2 = x + width;
        var y1 = y;
        var y2 = y + height;

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            x1, y1,
            x2, y1,
            x1, y2,
            x1, y2,
            x2, y1,
            x2, y2
        ]),
        gl.STATIC_DRAW);
    },

    SetTriangle:function(gl, x, y, width, height)
    {
        var x1 = x;
        var x2 = x + width;
        var y1 = y;
        var y2 = y + height;

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            x1, y1,
            x2, y1,
            x1, y2,
        ]),
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
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }
};