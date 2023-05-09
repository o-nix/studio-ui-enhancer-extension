import {useState} from 'react'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'
import {JsonViewer} from '@textea/json-viewer'

function App() {
  const [schemaDialogOpen, setSchemaDialogOpen] = useState(false)
  const [currentSchema, setCurrentSchema] = useState<any>({})
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)


  const handleSchemaDialogClose = () => {
    setSchemaDialogOpen(false)
  }

  const showSchemaDialog = async () => {
    setAnchorEl(null)

    const projectSlug = /\/projects\/[^\/]+-(?<projectSlug>[^\/?]+)/
      .exec(window.location.pathname)?.groups?.projectSlug

    if (!projectSlug) {
      return alert('Not inside a project')
    }

    const csrfToken = document.cookie.split(';')
      .map(c => c.trim())
      .filter(c => c.startsWith('csrf_token'))
      .map(c => c.split('=')[1])
      .reduce(v => v)

    const companyId = JSON.parse(localStorage.current_company_id ?? "null")
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
    }

    if (companyId !== null) {
      headers['X-Hy-Company-Id'] = companyId
    }

    const response = await fetch('/graphql', {
      method: 'POST',
      headers,
      credentials: 'same-origin',
      body: JSON.stringify({
        'operationName': 'ProjectSchema',
        'variables': {
          'projectShortId': projectSlug
        },
        'query': 'query ProjectSchema($projectShortId: ID!) {\n  projectByShortId(projectShortId: $projectShortId) {\n    id\n    schema {\n      version\n      features {\n        derivation\n        \n      }\n      normalization\n      dataPoints\n      \n    }\n    \n  }\n}'
      })
    })
      .then(res => res.json())

    setCurrentSchema(response.data.projectByShortId.schema)
    setSchemaDialogOpen(true)
  }

  return (
    <>
      <IconButton aria-label="Studio UI Enhancer"
                  sx={{
                    position: 'absolute',
                    top: 15,
                    right: 200,
                    zIndex: 1100
                  }}
                  onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <SettingsSuggestIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={anchorEl !== null}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={async() => showSchemaDialog()}>View current project schema</MenuItem>
      </Menu>

      <Dialog fullWidth={true}
              maxWidth="xl"
              open={schemaDialogOpen}
              scroll="paper"
              onClose={handleSchemaDialogClose}
      >
        <DialogTitle>Project schema</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText>
            <Box noValidate
                 component="form"
                 sx={{
                   display: 'flex',
                   flexDirection: 'column',
                   m: 'auto',
                   width: 'fit-content'
                 }}
            >
              <JsonViewer value={currentSchema}
                          rootName={false}
                          onCopy={async (path, value) => {
                            await navigator.clipboard.writeText(JSON.stringify(value, null, '\t'))
                          }}
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSchemaDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default App
