import { MouseEvent, PropsWithChildren, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons'
import './drag.css'

interface Position {
  left: number
  top: number
}

const Draggable = (props: PropsWithChildren) => {
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [offset, setOffset] = useState<Position>({ left: 0, top: 0 })
  const [position, setPosition] = useState<Position>({ left: 0, top: 0 })

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>): void => {
    setIsDragging(true)
    setOffset({
      left: e.clientX - position.left,
      top: e.clientY - position.top,
    })
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>): void => {
    if (isDragging) {
      setPosition({
        left: e.clientX - offset.left,
        top: e.clientY - offset.top,
      })
    }
  }

  const handleMouseUp = (): void => {
    setIsDragging(false)
  }

  return (
    <div
      className="draggable"
      style={{ left: `${position.left}px`, top: `${position.top}px` }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="dragIcon"
        onMouseDown={(e) => {
          setIsDragging(true)
          e.preventDefault()
        }}
      >
        <FontAwesomeIcon icon={faArrowsAlt} />
      </div>
      {props.children}
    </div>
  )
}

export default Draggable
