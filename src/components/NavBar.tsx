

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Button} from '@mui/material';
function ResponsiveAppBar() { 
  let  username="mcaceres2017"
  return (
    <Box sx={{ display: 'flex' }}>
    <AppBar component="nav">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            <Link to='/'>
                Astroversioner
            </Link>
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            
          <Button
                key='create-dataset'
                href={'/create-dataset/'}
                sx={{ my: 2, color: 'white', display: 'block' }}
            >
            create dataset
            </Button>
          
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            
            <Button
                key='my-dataset'
                href={'/my-datasets/'+ String(username)}
                sx={{ my: 2, color: 'white', display: 'block' }}
            >
            my datasets
            </Button>
          
        </Box>
      </Toolbar>
    </AppBar>

    <Box component="main" sx={{ p: 3 }}>
      <Toolbar />
    </Box>

  </Box>
  );
}
export default ResponsiveAppBar;