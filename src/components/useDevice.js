import { useState, useEffect } from 'react'

const useDevice = () => {  
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200)
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1200)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1200)
            setIsDesktop(window.innerWidth > 1200)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    
    return {isMobile, isDesktop}
}

export default useDevice;
