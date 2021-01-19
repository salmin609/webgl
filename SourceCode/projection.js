var projection = {
    GetProjectionMatrix:function(gl)
    {
        var fieldOfViewRadians = myUtils.degToRad(60);
        var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;

        return m4.perspective(fieldOfViewRadians, aspect, 1, 2000);
    }
};