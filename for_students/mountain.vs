// world with islands - displacement map based on the green channel

//varying vec2 v_uv;
//uniform sampler2D colormap;

uniform sampler2D bumpTexture;
uniform float bumpScale;

varying float vAmount;
varying vec2 vUV;

void main() {
    vUV = uv;
	vec4 bumpData = texture2D( bumpTexture, uv );
	
	vAmount = bumpData.r; // assuming map is grayscale it doesn't matter if you use r, g, or b.
	
	// move the position along the normal
    vec3 newPosition = position + normal * bumpScale * vAmount;
	
	gl_Position = projectionMatrix * modelViewMatrix * vec4( -newPosition, 1.0 );


    /*float height = texture2D(colormap,uv).g;    // get the green value
    vec3 pos = position + height*normal * 3.;

    // the main output of the shader (the vertex position)
    gl_Position = projectionMatrix * modelViewMatrix * vec4( -pos, 1.0 );

    v_uv = uv;*/
}