var projection = {
    GetProjectionMatrix:function(gl)
    {
        var fieldOfViewRadians = myUtils.DegToRad(60);
        var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;

        return m4.Perspective(fieldOfViewRadians, aspect, 1, 2000);
    }
};