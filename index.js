import { Color } from 'three';
import { IfcViewerAPI } from 'web-ifc-viewer';
import { IfcAPI } from 'web-ifc';
// import { IfcViewerAPI } from 'web-ifc-viewer';

const api = new IfcAPI();
api.Init();
const container = document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({ container, backgroundColor: new Color(0xffffff) });
viewer.grid.setGrid();
viewer.axes.setAxes();

async function loadIfc(url) {
    //await viewer.IFC.setWasmPath("../../../");
    const model = await viewer.IFC.loadIfcUrl(url);
    await viewer.shadowDropper.renderShadow(model.modelID);
    console.log(model)
    return model;
    
}

/*

let model1;
loadIfc('assets/Heat Pump-Horizontal-Elec Heated-Carrier-Packaged-0.5-6 tons.ifc')
    .then(res => model1 = res)
    .then(() => console.log("model 1 id:" + model1))



let model2;
loadIfc('assets/Fan Coil-ACME-1.5-2.5 ton-FC1525Z.ifc')
    .then(res => model2 = res)
    .then(res => console.log("model 2 id:" + model2))
    //.then(() => api.SetWasmPath("../../../../", false))
   // .then(() => api.SetGeometryTransformation(model2, [1,0,0,0,0,1,0,0,0,0,1,0,1000000000000000000,10000000000000000,0,1] ))
   // .then(() => viewer.getElementById(model2));

//console.log("model 1 id: " + model1);

// window.ondblclick = async () => await viewer.IFC.selector.pickIfcItem();
// window.onmousemove = async () => await viewer.IFC.selector.prePickIfcItem();
*/
const urlarray =
    [
    'assets/Heat Pump-Horizontal-Elec Heated-Carrier-Packaged-0.5-6 tons.ifc',
    'assets/Fan Coil-ACME-1.5-2.5 ton-FC1525Z.ifc',
    'assets/Heat Pump-Vertical-Carrier-Packaged-Dual Blower-17.5-30 tons.ifc',

    ];

const models = [];

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

    console.log(models);

}

loadIfcs(urlarray);

