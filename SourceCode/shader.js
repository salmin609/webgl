class Shader{

    constructor(gl, vertexShaderName, fragmetShaderName)
    {
        this.program = webglUtils.createProgramFromScripts(gl, [vertexShaderName, fragmetShaderName]);
        this.info = {
            vertexCount : 0,
            primitiveType : 0,
            offset : 0,
        };
        this.InitLocation(gl);
        this.InitBuffer(gl, this.info);
        this.SettingAttrib(gl);
    }

    InitLocation(gl)
    {
        this.positionAttribLocation = myUtils.GetAttribLocation(gl, this.program, "a_vertexPos");
        this.textureAttribLocation = myUtils.GetAttribLocation(gl, this.program, "a_texcoord");
        this.textureUniformLocation = myUtils.GetUniformLocation(gl, this.program, "u_texture");
        this.matrixUniformLocation = myUtils.GetUniformLocation(gl, this.program, "u_mat");
    }
    GetInfo()
    {
        return this.info;
    }

    InitBuffer(gl, info)
    {
        this.positionBuffer = myUtils.CreateBuffer(gl);
        myUtils.BindBuffer(gl, gl.ARRAY_BUFFER, this.positionBuffer);
        myUtils.SetGeometry(gl, info);

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
        myUtils.SetTexcoords(gl);

        gl.enableVertexAttribArray(this.textureAttribLocation);
        gl.vertexAttribPointer(this.textureAttribLocation, 2, gl.FLOAT, false, 0, 0);

        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        var textureInfo = {
            width : 1,
            height : 1,
            texture : texture,
        };

        var image = new Image();
        this.RequestCORSIfNotSameOrigin(image, 'https://live.staticflickr.com/65535/50852583482_d261aa0873_k.jpg');
        image.src = 'https://live.staticflickr.com/65535/50852583482_d261aa0873_k.jpg';
        image.addEventListener('load', function()
        {
            textureInfo.width = image.width;
            textureInfo.height = image.height;

            gl.bindTexture(gl.TEXTURE_2D, textureInfo.texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            //gl.generateMipmap(gl.TEXTURE_2D);
        });
    }
    RequestCORSIfNotSameOrigin(img, url) 
    {
        if ((new URL(url, window.location.href)).origin !== window.location.origin) {
          img.crossOrigin = "";
        }
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