import { Color, Euler } from 'three';
import { MeshPhongMaterial } from 'three';
import { MeshBasicMaterial } from 'three';
import { Mesh } from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three//examples/jsm/geometries/TextGeometry.js';
import { IfcViewerAPI } from 'web-ifc-viewer';
import { IfcAPI } from 'web-ifc';

const api = new IfcAPI();
api.Init();
const container = document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({ container, backgroundColor: new Color(0xffffff) });
viewer.grid.setGrid();
viewer.axes.setAxes();
console.log(viewer)

async function loadIfc(url) {
    const model = await viewer.IFC.loadIfcUrl(url);
    //await viewer.shadowDropper.renderShadow(model.modelID);
    return model;
}

const urlarray =
    [
    'ifcexportproject.ifc',
    'assets/Heat Pump-Horizontal-Elec Heated-Carrier-Packaged-0.5-6 tons.ifc',
    'assets/Fan Coil-ACME-1.5-2.5 ton-FC1525Z.ifc',
    'assets/Heat Pump-Vertical-Carrier-Packaged-Dual Blower-17.5-30 tons.ifc',
    ];

async function loadIfcs(urls) {

    var previous;
    urls.forEach(element => {
        loadIfc(element)
        .then(res => {
            if (previous){
                //do stuff
                let previousX = previous.geometry.boundingBox.max.x + previous.position.x;
                res.position.x = previousX + 0.5;
            }
            previous = res;
        })
        ;
    });
}


function makeTextq(text)
{
    let loader = new FontLoader();
    loader.load('assets/fonts/helvetiker_regular.typeface.json', font => {
        let geometry = new TextGeometry(text, {
            font: font,
            size: 1,
            height: 0.1,
            curveSegments: 12,
            bevelEnabled: false,
            bevelThickness: 0,
            bevelSize: 0,
            bevelOffset: 0,
            bevelSegments: 0
        });
        let material = new MeshBasicMaterial({color: 0x007fff});
        let mesh = new Mesh(geometry, material);
        mesh.geometry.computeBoundingBox()
        mesh.position.x = 0 - (mesh.geometry.boundingBox.max.x - mesh.geometry.boundingBox.min.x) - 0.5;        
        mesh.rotateX(Math.PI/-2);
        viewer.context.scene.add(mesh);
        console.log(mesh.geometry);
    })
}


makeTextq('Label');
loadIfcs(urlarray);