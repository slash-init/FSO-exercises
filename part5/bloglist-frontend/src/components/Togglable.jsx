import { useState, useImperativeHandle } from 'react'
import { Button, Stack } from '@mui/material'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="contained" onClick={toggleVisibility} size="small">
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        <Stack spacing={1}>
          {props.children}
          <Button variant="outlined" onClick={toggleVisibility} size="small">
            cancel
          </Button>
        </Stack>
      </div>
    </div>
  )
}

export default Togglable
