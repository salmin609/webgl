class Shader{
    constructor(gl, vertexShaderName, fragmetShaderName)
    {
        this.program = webglUtils.createProgramFromScripts(gl, [vertexShaderName, fragmetShaderName]);
        this.InitLocation(gl);
        this.InitBuffer(gl);
        this.SettingAttrib(gl);
    }

    InitLocation(gl)
    {
        this.positionAttribLocation = myUtils.GetAttribLocation(gl, this.program, "vertexPos");
        this.textureAttribLocation = myUtils.GetAttribLocation(gl, this.program, "texcoord");
        this.textureUniformLocation = myUtils.GetUniformLocation(gl, this.program, "u_texture");
        this.matrixUniformLocation = myUtils.GetUniformLocation(gl, this.program, "u_mat");
    }

    InitBuffer(gl)
    {
        this.positionBuffer = myUtils.CreateBuffer(gl);
        myUtils.BindBuffer(gl, gl.ARRAY_BUFFER, this.positionBuffer);
        myUtils.SetGeometry(gl);

        this.textureBuffer = myUtils.CreateBuffer(gl);
    }

    SettingAttrib(gl)
    {
        gl.enableVertexAttribArray(this.positionAttribLocation);

        myUtils.BindBuffer(gl, gl.ARRAY_BUFFER, this.positionBuffer);
        // Bind the position buffer.

        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        var size = 3;          // 2 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(
        this.positionAttribLocation, size, type, normalize, stride, offset);

        myUtils.BindBuffer(gl, gl.ARRAY_BUFFER, this.textureBuffer);
        myUtils.setTexcoords(gl);

        gl.enableVertexAttribArray(this.textureAttribLocation);
        gl.vertexAttribPointer(this.textureAttribLocation, 2, gl.FLOAT, false, 0, 0);

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
    }

    GetProgram()
    {
        return this.program;
    }
    GetPositionAttribLocation()
    {
        return this.positionAttribLocation;
    }
    GetTextureAttribLocation()
    {
        return this.textureAttribLocation;
    }
    GetTextureUniformLocation()
    {
        return this.textureUniformLocation;
    }
    GetMatrixUniformLocation()
    {
        return this.matrixUniformLocation;
    }
}


// (function( shader, $, undefined ) {
//     //Private Property
//     //var ~~
//     var program;

//     //Public Property
//     //shader.~~
    

//     //Public Method
//     //shader.~~ = function()
//     shader.Init = function(gl) 
//     {
//         console.log(vertexShader);
        
//         program = webglUtils.createProgramFromScripts(gl, ["vertexShader", "fragmentShader"]);
//     };

//     //Private Method
//     //function ~~()
//     function addItem( item ) {
//         if ( item !== undefined ) {
//             console.log( "Adding " + $.trim(item) );
//         }
//     }
// }( window.shader = window.shader || {}, shader));