import { Color } from 'three';
import { IfcViewerAPI } from 'web-ifc-viewer';
import { IfcAPI } from 'web-ifc';

const api = new IfcAPI();
api.Init();
const container = document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({ container, backgroundColor: new Color(0xffffff) });
viewer.grid.setGrid();
viewer.axes.setAxes();

async function loadIfc(url) {
    const model = await viewer.IFC.loadIfcUrl(url);
    await viewer.shadowDropper.renderShadow(model.modelID);
    console.log(model)
    return model;
}

const urlarray =
    [
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

loadIfcs(urlarray);

