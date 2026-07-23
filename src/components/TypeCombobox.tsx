import React, { useState, useRef, useId } from 'react';
import { ALL_TYPES, TYPE_COLORS } from '../pokemonTypes';
import Label from './form/Label';
import TypeBadge from './TypeBadge';

function TypeCombobox({ selectedTypes, onChange, className = '' }) {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const comboboxId = useId();
  const listboxId = `${comboboxId}-listbox`;

  const filteredTypes = ALL_TYPES.filter((type) =>
    type.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const toggleType = (type) => {
    if (selectedTypes.includes(type)) {
      onChange(selectedTypes.filter((t) => t !== type));
    } else {
      onChange([...selectedTypes, type]);
    }
    inputRef.current?.focus();
  };

  const removeType = (type, event) => {
    event.stopPropagation();
    onChange(selectedTypes.filter((t) => t !== type));
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setIsOpen(true);
        setActiveIndex((prev) => Math.min(prev + 1, filteredTypes.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        event.preventDefault();
        if (activeIndex >= 0 && filteredTypes[activeIndex]) {
          toggleType(filteredTypes[activeIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setActiveIndex(-1);
        inputRef.current?.blur();
        break;
      case 'Backspace':
        if (
          inputValue === '' &&
          selectedTypes.length > 0 &&
          selectedTypes.length <= 3
        ) {
          onChange(selectedTypes.slice(0, -1));
        }
        break;
    }
  };

  return (
    <div className={`relative max-lg:w-full lg:min-w-md ${className}`}>
      {/* Label */}
      <Label htmlFor={comboboxId}>Filter by type</Label>

      {/* Input container */}
      <div
        className="flex flex-wrap gap-1.5 items-center min-h-10 w-full px-4 py-2 bg-white border border-gray-400 rounded-md cursor-text focus-within:outline-2 focus-within:outline-sky-600 focus-within:-outline-offset-1 focus-visible:border-transparent lg:max-w-md"
        onClick={() => {
          inputRef.current?.focus();
        }}
      >
        {/* Selected type pills */}
        {selectedTypes.map((type, index) => {
          const colors = TYPE_COLORS[type];
          return (
            <button
              key={type}
              type="button"
              onClick={(e) => removeType(type, e)}
              aria-label={`Remove ${type} filter`}
              className={`hover:cursor-pointer outline-2 outline-transparent transition-colors duration-200 hover:outline-gray-500 rounded-md group`}
            >
              <TypeBadge type={type}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transition-transform duration-200 group-hover:scale-125"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </TypeBadge>
            </button>
          );
        })}

        {/* Text input */}
        <input
          ref={inputRef}
          id={comboboxId}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-activedescendant={
            activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined
          }
          aria-autocomplete="list"
          aria-label="Filter Pokémon by type"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
          onKeyDown={handleKeyDown}
          placeholder={selectedTypes.length === 0 ? 'Search types...' : ''}
          className="outline-none text-gray-700 bg-transparent placeholder-gray-400 min-w-12 shrink"
        />
      </div>

      {/* Dropdown */}
      {isOpen && filteredTypes.length > 0 && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-label="Pokémon types"
          aria-multiselectable="true"
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredTypes.map((type, index) => {
            const colors = TYPE_COLORS[type];
            const isSelected = selectedTypes.includes(type);
            const isActive = index === activeIndex;
            return (
              <li
                key={type}
                id={`${listboxId}-option-${index}`}
                role="option"
                aria-selected={isSelected}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => toggleType(type)}
                className={`flex items-center gap-3 px-4 py-2 cursor-pointer capitalize text-sm transition-colors
                  ${isActive ? 'bg-gray-100' : 'hover:bg-gray-50'}
                  ${isSelected ? 'font-semibold' : ''}`}
              >
                <span
                  className={`w-3 h-3 rounded-sm border-2 flex items-center justify-center ${isSelected ? 'bg-sky-600 border-sky-600' : 'border-gray-300'}`}
                >
                  {isSelected && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="8"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="4"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </span>
                <TypeBadge
                  key={index}
                  type={type}
                  className={`${isSelected ? 'bg-sky-600 border-sky-600' : 'border-gray-300'}`}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default TypeCombobox;
