import React from 'react'

function ApplyInput(props) {
  const { type, children, ...restProps } = props

  
  const processChildren = () => {
    if (type === "numeric") {
      const onlyNumbers = React.cloneElement(children, {
        onKeyPress: (e) => {
          if (!/[0-9]/.test(e.key)) {
            e.preventDefault()
          }
        },
      })
      return onlyNumbers
    }

    return children;
  };

  return <div {...restProps}>{processChildren()}</div>
}

export default ApplyInput
