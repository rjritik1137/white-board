import { KeyboardEventHandler, useRef, useState } from 'react'
import { getEqualityPredicate, getNumber, isNumber } from '../../util/number'
import './array.css'
import Draggable from '../draggable/Draggable'
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
  const handleItemClick = (index: number) => {
    // updateSelectedIndices(index, index)
  }

  const handleAddItem = () => {
    if (isNumber(inputValue)) {
      const newArray = [...array, getNumber(inputValue)]
      setInputValue('')
      setArray(newArray)
    }
  }

  const handleInsertItem = () => {
    if (
      isNumber(inputValue) &&
      selectedIndices.length >= 0 &&
      selectedIndices <= array.length
    ) {
      const newArray = [...array, getNumber(inputValue)]
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
      if (isNumber(inputValue)) {
        if (selectedIndices.length > 0) {
          handleInsertItem()
        } else {
          handleAddItem()
        }
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
            <div
              key={index}
              className={`array-item ${
                selectedIndices.some((i) => i === index) ? 'selected' : ''
              }`}
              onClick={() => handleItemClick(index)}
              onMouseDown={(e) => {
                e.stopPropagation()
                handleItemMouseDown(index)
              }}
              onMouseEnter={(e) => {
                e.stopPropagation()
                handleItemMouseEnter(index)
              }}
            >
              <span className="item">{index}</span>
              <span className="item">{item}</span>
            </div>
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
          <button className="element-button" onClick={handleInsertItem}>
            Insert Element
          </button>
          <button className="element-button" onClick={handleRemoveItem}>
            Remove Element
          </button>
        </div>
      </Draggable>
    </div>
  )
}

export default ArrayRenderer
