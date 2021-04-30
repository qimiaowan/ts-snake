// 工具函数 集
/**
 * @author ld
 * @param dom 
 * @param style 
 * @returns 
 */
export const getStyle = (dom: HTMLElement,style?: string) => {
  if(!style) {
    return dom.getBoundingClientRect()
  }
  return parseFloat(window.getComputedStyle(dom, null)[style])
}

/**
 * @author ld
 * @param dom 
 * @param style 
 */
export const setStyle = (dom: HTMLElement, style: any) => {
  Object.entries(style).forEach(([s, v])=>{
    dom.style[s] = v
  })
}

