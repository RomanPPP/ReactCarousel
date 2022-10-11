
import {GLcontextWrapper, GLTF,createBoxGeometry, ProgramInfo, Drawer} from 'graphics'

import {vert, frag} from './program.js'

import {m4} from 'math'


const context = new GLcontextWrapper('canvas')
  
context.resizeCanvasToDisplaySize()

const boxData = createBoxGeometry()
const gltf = new GLTF(boxData.gltf, boxData.binaryBuffers)
const mesh = gltf.meshes[0]

const programInfo = new ProgramInfo(vert, frag)

programInfo.setContext(context).compileShaders().createUniformSetters()
const drawer = new Drawer()
drawer.setContext(context)

mesh.setContext(context).setDrawer(drawer).setProgramInfo(programInfo).createPrimitiveBuffers().setPrimitiveAttributes()

const cameraMatrix = m4.translation(0,0,5)
const uniforms = {
    u_lightWorldPosition : [1,2,10]
}
const scale = m4.translation(0,0,3)

const {gl} = context
const canvasRect = gl.canvas.getBoundingClientRect()

let i = 0
const renderItems = (itemsElementsArray)=> {
    const loop = () =>{
        gl.enable(gl.SCISSOR_TEST)
        i+=0.001
        for(const element of itemsElementsArray){
            const rect = element.getBoundingClientRect();
            
            if (rect.x + rect.width  < canvasRect.x || rect.x > canvasRect.x + canvasRect.width) {
                    continue
            }
            const width  = rect.width 
            const height = rect.height
            const left   = rect.left - canvasRect.x;
            const bottom = gl.canvas.clientHeight - rect.bottom + canvasRect.y
                
            gl.viewport(left, bottom, width, height );
            gl.scissor(left, bottom, width, height);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.enable(gl.CULL_FACE)
            gl.enable(gl.DEPTH_TEST)
            
            gl.clearColor(0.1,0.1,0.1, 1);
            mesh.draw({
                ...uniforms,
                u_matrix : m4.xRotate(m4.yRotate(scale, Math.PI * i), Math.PI * i), 
                u_color : [1,0,0,1],
                u_worldViewPosition : cameraMatrix}, cameraMatrix)
            
        }
        requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)
}
export default renderItems