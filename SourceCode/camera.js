class Camera{
    constructor(gl)
    {
        this.cameraAngleRadians = myUtils.DegToRad(0);
        this.radius = 200;
        this.aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    }

    GetViewMatrix()
    {
        return m4.GetViewMatrix(this.cameraAngleRadians, this.radius);
    }
};