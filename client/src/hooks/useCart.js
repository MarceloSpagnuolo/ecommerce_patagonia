import { useCallback, useState } from "react"

export default function useCart() {
    const [ show, setShow ] = useState(false)
    const alterShow = useCallback(() => {setShow(pre => !pre)})
    
    return {show, alterShow}
}

const { show, alterShow } = useCart()