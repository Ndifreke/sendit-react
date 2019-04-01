import React from 'react';

const Loader = function({ size, visible }) {
  if (visible) {
    switch (size) {
      case 2:
        return (
          <svg className="wait-spin" width="46" height="46">
            <circle
              className="c1"
              cx="23px"
              cy="23px"
              r="9"
              fill="gray"
              strokeWidth="3"
            />
            <g fill="orange">
              <circle cx="4" cy="23" r="4" />
              <circle cx="23" cy="4" r="4" />
              <circle cx="42" cy="23" r="4" />
              <circle cx="23" cy="42" r="4" />
            </g>
          </svg>
        );
      case 1:
        return (
          <svg className="wait-spin" width="46" height="46">
            <circle
              className="c1"
              cx="23px"
              cy="23px"
              r="3"
              fill="gray"
              strokeWidth="3"
            />
            <g fill="orange">
              <circle cx="14" cy="23" r="3" />
              <circle cx="23" cy="14" r="3" />
              <circle cx="32" cy="23" r="3" />
              <circle cx="23" cy="32" r="3" />
            </g>
          </svg>
        );
    }
  }
  return null;
};

export default Loader;
