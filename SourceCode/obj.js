class Obj {
    constructor(shader, translation, scale, rotation)
    {
        this.translation = translation;
        this.scale = scale;
        this.rotation = rotation;
        this.shader = shader;
    }
    
    Translation()
    {
        return this.translation;
    }
    Scale()
    {
        return this.scale;
    }
    Rotation()
    {
        return this.rotation;
    }
    Rotate(amount)
    {
        this.rotation[1] += amount;
    }
    GetProgram()
    {
        return this.shader.GetProgram();
    }
};