import { KeyboardEventHandler, useRef, useState } from 'react'
import { getEqualityPredicate } from '../../util/number'
import Draggable from '../draggable/Draggable'
import './array.css'
import InputElement from '../input/InputElement'
const ArrayRenderer = ({ array: _array }: { array: any }) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([])
  const [array, setArray] = useState(_array)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const containerRef = useRef(null)
  const [inputValue, setInputValue] = useState('')
  const updateSelectedIndices = (start: number, end: number) => {
    setSelectedIndices((prevIndices) => {
      const newIndices = [...prevIndices]
      for (let i = start; i <= end; i++) {
        const index = newIndices.findIndex(getEqualityPredicate(i))

        if (index === -1) {
          newIndices.push(i)
        } else {
          newIndices.splice(index, 1)
        }
      }
      return newIndices
    })
  }
  const setValueAtIndex = (value: string, index: number) => {
    setArray((prev: any) => {
      const newArray = [...prev]
      newArray[index] = value
      return newArray
    })
  }
  const handleItemClick = (index: number) => {
    // updateSelectedIndices(index, index)
  }

  const handleAddItem = () => {
    const newArray = [...array, inputValue]
    setInputValue('')
    setArray(newArray)
  }

  const handleInsertItem = () => {
    if (selectedIndices.length >= 0 && selectedIndices <= array.length) {
      const newArray = [...array, inputValue]
      setInputValue('')
      setArray(newArray)
    }
  }

  const handleRemoveItem = () => {
    if (selectedIndices.length >= 0 && selectedIndices.length < array.length) {
      const newArray = [...array]
      setArray(
        newArray.filter(
          (i, index) =>
            selectedIndices.findIndex((item) => item === index) === -1
        )
      )
      setSelectedIndices([])
    }
  }

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      if (selectedIndices.length > 0) {
        handleInsertItem()
      } else {
        handleAddItem()
      }
    }
  }

  const handleItemMouseDown = (index: number) => {
    setIsMouseDown(true)
    updateSelectedIndices(index, index)
  }

  const handleItemMouseEnter = (index: number) => {
    if (isMouseDown) {
      updateSelectedIndices(index, index)
    }
  }

  const handleItemMouseUp = () => {
    setIsMouseDown(false)
  }

  return (
    <div>
      <Draggable>
        <div className="array" onMouseUp={handleItemMouseUp} ref={containerRef}>
          {array.map((item: any, index: number) => (
            // <div
            //   key={index}
            //   className={`array-item ${
            //     selectedIndices.some((i) => i === index) ? 'selected' : ''
            //   }`}
            //   onClick={() => handleItemClick(index)}
            //   onMouseDown={(e) => {
            //     e.stopPropagation()
            //     handleItemMouseDown(index)
            //   }}
            //   onMouseEnter={(e) => {
            //     e.stopPropagation()
            //     handleItemMouseEnter(index)
            //   }}
            // >
            //   <span className="item">i = {index}</span>
            //   <span className="item">{item}</span>
            // </div>
            <InputElement
              onClick={handleItemClick}
              handleItemMouseDown={handleItemMouseDown}
              handleItemMouseEnter={handleItemMouseEnter}
              value={item}
              index={index}
              isSelected={selectedIndices.some((i) => i === index)}
            />
          ))}
        </div>
      </Draggable>
      <Draggable>
        <div className="button-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type new element here"
          />
          <button className="element-button" onClick={handleAddItem}>
            Add Element
          </button>
          {/* <button className="element-button" onClick={handleInsertItem}>
            Insert Element
          </button> */}
          <button className="element-button" onClick={handleRemoveItem}>
            Remove Element
          </button>
        </div>
      </Draggable>
    </div>
  )
}

export default ArrayRenderer
