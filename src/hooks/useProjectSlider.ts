import { useState, useEffect } from 'react'

export function useProjectSlider(total: number) {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [autoRotate, setAutoRotate] = useState(true)

    useEffect(() => {
        if (!autoRotate) return

        const interval = setInterval(() => {
            setSelectedIndex(prev => (prev + 1) % total)
        }, 3000)

        return () => clearInterval(interval)
    }, [autoRotate, total])

    const handleSelect = (index: number) => {
        setSelectedIndex(index)
    }

    const handleMouseEnter = () => {
        setAutoRotate(false)
    }

    const handleMouseLeave = () => {
        setAutoRotate(true)
    }

    return {
        selectedIndex,
        autoRotate,
        handleSelect,
        handleMouseEnter,
        handleMouseLeave,
    }
}