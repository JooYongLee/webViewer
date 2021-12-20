const link = document.createElement( 'a' );
link.style.display = 'none';
document.body.appendChild( link );

export function saveString( text, filename ) {

    save( new Blob( [ text ], { type: 'text/plain' } ), filename );

}

export function saveArrayBuffer( buffer, filename ) {
    // console.log("saving....", buffer)
    console.log("saving....", filename)
    save( new Blob( [ buffer ], { type: 'application/octet-stream' } ), filename );

}

export function save( blob, filename ) {

    link.href = URL.createObjectURL( blob );
    // console.log("li")
    link.download = filename;
    link.click();
}
