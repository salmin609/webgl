class Camera{
    constructor(gl)
    {
        this.cameraAngleRadians = myUtils.degToRad(0);
        this.radius = 200;
        this.aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    }

    GetViewMatrix()
    {
        return m4.getViewMatrix(this.cameraAngleRadians, this.radius);
    }
};