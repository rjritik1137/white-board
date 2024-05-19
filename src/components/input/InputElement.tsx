import { useState } from 'react'
import './input.css'
type Props = {
  handleItemMouseDown: (index: number) => void
  handleItemMouseEnter: (index: number) => void
  isSelected: boolean
  onClick: (index: number) => void
  index: number
  value: string
}
const InputElement = (props: Props) => {
  const {
    index,
    handleItemMouseDown,
    handleItemMouseEnter,
    onClick,
    isSelected,
    value,
  } = props
  const [inputValue, setInputValue] = useState(value)
  return (
    <input
      type="text"
      key={index}
      value={inputValue}
      className={`array-item ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(index)}
      onChange={(e) => setInputValue(e.target.value)}
      onMouseDown={(e) => {
        e.stopPropagation()
        handleItemMouseDown(index)
      }}
      maxLength={10}
      onMouseEnter={(e) => {
        e.stopPropagation()
        handleItemMouseEnter(index)
      }}
    />
  )
}

export default InputElement
