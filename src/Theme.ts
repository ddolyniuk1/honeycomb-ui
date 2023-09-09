import * as PIXI from 'pixi.js'
export function createGradTexture(colorStops: {offset: number, color: string}[])
{
    // adjust it if somehow you need better quality for very very big images
    const quality = 256;
    const canvas = document.createElement('canvas');

    canvas.width = quality;
    canvas.height = 1;

    const ctx = canvas.getContext('2d');

    // use canvas2d API to create gradient
    const grd = ctx.createLinearGradient(0, 0, quality, 0);
    
    // add color stops from the provided array
    for (let stop of colorStops) {
        grd.addColorStop(stop.offset, stop.color);
    }

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, quality, 1);

    return PIXI.Texture.from(canvas);
}
 
export function createBasicLinearGradient(startColor : string) : PIXI.Texture {
    return createGradTexture([ 
        {offset:0, color: startColor, }, 
        {offset:0.7, color: ColorUtil.darken(startColor, 10), }, 
        {offset:1, color: ColorUtil.darken(startColor, 30), }
    ]);
}

export default class Theme {

    public static HoneyCombBaseColorValue : string = '#624a03';
    public static DefaultEdgeBaseColorValue : string = '#f6ff00';
    public static BooleanEdgeBaseColorValue : string = '#00aeff';
    public static NumberEdgeBaseColorValue : string = '#00ff5e';
    public static TextEdgeBaseColorValue : string = '#ff003c';
    public static CollectionEdgeBaseColorValue : string = '#7300ff';
    public static MapEdgeBaseColorValue : string = '#ff7300';
    public static ExecutionEdgeBaseColorValue : string = '#e7e2e2';
    public static AnyEdgeBaseColorValue : string = '#b700ff';

    public static HoneyCombBaseTexture : PIXI.Texture = createBasicLinearGradient(this.HoneyCombBaseColorValue);
    public static DefaultEdgeBaseTexture : PIXI.Texture = createBasicLinearGradient(this.DefaultEdgeBaseColorValue);
    
    public static EdgeColorLookup : Map<EDataType, string> = new Map<EDataType, string>([ 
        [EDataType.Boolean, this.BooleanEdgeBaseColorValue],
        [EDataType.Number, this.NumberEdgeBaseColorValue],
        [EDataType.Collection, this.CollectionEdgeBaseColorValue],
        [EDataType.Text, this.TextEdgeBaseColorValue],
        [EDataType.Map, this.MapEdgeBaseColorValue],
        [EDataType.Execution, this.ExecutionEdgeBaseColorValue],
        [EDataType.Any, this.AnyEdgeBaseColorValue]
    ]);

    private static EdgeTextureLookup : Map<EDataType, PIXI.Texture> = new Map<EDataType, PIXI.Texture>();

    public static GetEdgeTexture(dataType : EDataType) : PIXI.Texture {
        if (!Theme.EdgeTextureLookup.has(dataType)) {
            const color = Theme.EdgeColorLookup.get(dataType);
            const texture = createBasicLinearGradient(color);
            Theme.EdgeTextureLookup.set(dataType, texture);
        }
        return Theme.EdgeTextureLookup.get(dataType); 
    }

}