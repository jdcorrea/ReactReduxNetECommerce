import agent from '@app/api/agent'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import { useState } from 'react'


function AboutPage() {
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  function getValidationError() {
    agent.TestErrors.getValidationError()
      .then(() => console.log('should not see this'))
      .catch(error => setValidationErrors(error))
  }

  return (
    <Container>
      <Typography gutterBottom variant='h2'>
        Errors for testing purposes
      </Typography>
      <ButtonGroup>
        <Button variant='contained' onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))}>Test 400 Error</Button>
        <Button variant='contained' onClick={() => agent.TestErrors.get401Error().catch(error => console.log(error))}>Test 401 Error</Button>
        <Button variant='contained' onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))}>Test 404 Error</Button>
        <Button variant='contained' onClick={() => agent.TestErrors.get500Error().catch(error => console.log(error))}>Test 500 Error</Button>
        <Button variant='contained' onClick={getValidationError}>Test Validation Error</Button>
      </ButtonGroup>
      {
        validationErrors.length > 0 &&
          <Alert severity='error'>
            <AlertTitle>Validation Errors</AlertTitle>
            <List>
              {
                validationErrors.map((error, id) => (
                  <ListItemText key={id}>{error}</ListItemText>
                ))
              }
            </List>
          </Alert>
      }
    </Container>
  )
}

export default AboutPage