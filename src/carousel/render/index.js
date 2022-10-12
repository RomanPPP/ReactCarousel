
import {GLcontextWrapper, GLTF,createBox,createCone, PrimitiveRenderer, ProgramInfo, Drawer} from 'graphics'

import {vert, frag} from './program.js'

import {m4} from 'math'


const context = new GLcontextWrapper('canvas')
  


const box = createBox(3,3,3)
const cone4 = createCone(3,5,4)
const cone6 = createCone(3,5,6)

const primitiveMap = {
    'box' : new PrimitiveRenderer(box),
    'cone4' : new PrimitiveRenderer(cone4),
    'cone6' : new PrimitiveRenderer(cone6)
}



const programInfo = new ProgramInfo(vert, frag)

programInfo.setContext(context).compileShaders().createUniformSetters()
const drawer = new Drawer()
drawer.setContext(context)

for(const name in primitiveMap){
    primitiveMap[name].setContext(context)
    .setDrawer(drawer)
    .setProgramInfo(programInfo)
    .createGeometryBuffers()
    .setAttributes()
}
const cameraMatrix = m4.translation(0,0,10)
const uniforms = {
    u_lightWorldPosition : [1,2,10],
    u_ambientLight : [1,0,1,0.1]
}
const scale = m4.translation(0,0,3)

const {gl} = context


let i = 0
const renderItems = (itemsElementsArray)=> {
    const loop = () =>{
        gl.enable(gl.SCISSOR_TEST)
        
        i+=0.001
        const canvasRect = gl.canvas.getBoundingClientRect()
        for(const item of itemsElementsArray.array){
            const {element, primitive, color, background} = item
            const rect = element.getBoundingClientRect()
            
            if (rect.x + rect.width  < canvasRect.x || rect.x > canvasRect.x + canvasRect.width) {
                    continue
            }
            
            const width  = rect.right - rect.left
            const height = rect.bottom - rect.top
            const left   = rect.left - canvasRect.left
            const bottom = gl.canvas.clientHeight - rect.bottom + canvasRect.y
            
            gl.viewport(left, bottom, width, height )
            gl.scissor(left, bottom, width, height)
            gl.clearColor(...background);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
            gl.enable(gl.CULL_FACE)
            gl.enable(gl.DEPTH_TEST)
            
            
            primitiveMap[primitive].draw({
                ...uniforms,
                u_matrix : m4.xRotate(m4.yRotate(scale, Math.PI * i), Math.PI * i), 
                u_color : color,
                u_worldViewPosition : cameraMatrix}, cameraMatrix)
            
        }
        requestAnimationFrame(loop)
    }
   return loop
}
export {renderItems, context}