import agent from '@app/api/agent'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'


function AboutPage() {
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
        <Button variant='contained' onClick={() => agent.TestErrors.getValidationError().catch(error => console.log(error))}>Test Validation Error</Button>
      </ButtonGroup>
    </Container>
  )
}

export default AboutPage