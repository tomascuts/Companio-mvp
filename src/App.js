import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  TextField,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardHeader,
  Rating,
  Button,
  Grid,
  Box,
  Container,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import {
  ArrowBack,
  Favorite,
  Search,
  Message,
  LocationOn,
} from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff0000',
    },
  },
});

const services = [
  "Pinturería", "Plomería", "Albañilería", "Electricidad",
  "Jardinería", "Carpintería", "Gasista", "Tecnico"
];

const providers = [
  { name: "Jose Perez", rating: 3.5, specialty: "Especialista en desagüe", location: "Argentina, AMBA" },
  { name: "Amelie Franzonni", rating: 4.5, specialty: "Especialista en grifería", location: "Castelar" },
  { name: "Alejandro Mosa", rating: 3.5, specialty: "Especialista en sanitarios", location: "Ituzaingó" },
];

export default function Component() {
  const [screen, setScreen] = useState('home');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState(services);

  useEffect(() => {
    const filtered = services.filter(service =>
      service.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(filtered);
  }, [searchTerm]);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ bgcolor: 'background.paper', minHeight: '100vh', p: 0 }}>
        <AppBar position="static">
          <Toolbar>
            {screen !== 'home' && (
              <IconButton edge="start" color="inherit" onClick={() => setScreen('home')}>
                <ArrowBack />
              </IconButton>
            )}
            <Avatar sx={{ mr: 2 }} src="/placeholder-avatar.jpg" />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              HOME HERO
            </Typography>
            {screen === 'search' && (
              <Button color="inherit">Filtros</Button>
            )}
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 2 }}>
          {screen === 'home' && (
            <>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="búsqueda"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mb: 2 }}
              />
              <List>
                {filteredServices.map((service, index) => (
                  <ListItem
                    key={index}
                    button
                    onClick={() => setScreen('search')}
                    divider
                  >
                    <ListItemText primary={service} />
                  </ListItem>
                ))}
              </List>
            </>
          )}

          {screen === 'search' && (
            <>
              <Typography variant="h5" gutterBottom>SUPER</Typography>
              <Typography variant="body2" paragraph>descripción del servicio</Typography>
              {providers.map((provider, index) => (
                <Card
                  key={index}
                  sx={{ mb: 2, cursor: 'pointer' }}
                  onClick={() => {
                    setSelectedProvider(provider);
                    setScreen('profile');
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        sx={{ width: 56, height: 56, mr: 2 }}
                        src={`/placeholder-avatar-${index + 1}.jpg`}
                      />
                      <Box>
                        <Typography variant="h6">{provider.name}</Typography>
                        <Rating value={provider.rating} readOnly size="small" />
                        <Typography variant="body2" color="text.secondary">
                          {provider.specialty}
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <LocationOn fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {provider.location}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </>
          )}

          {screen === 'profile' && selectedProvider && (
            <>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar
                  sx={{ width: 64, height: 64, mr: 2 }}
                  src="/placeholder-avatar-1.jpg"
                />
                <Box flexGrow={1}>
                  <Typography variant="h5">{selectedProvider.name}</Typography>
                  <Rating value={selectedProvider.rating} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary">
                    {selectedProvider.specialty}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedProvider.location}
                  </Typography>
                </Box>
                <IconButton>
                  <Favorite />
                </IconButton>
              </Box>
              <Typography variant="body2" paragraph>
                Trabajo hace 11 años en el rubro, y me especializo en todo tipo de desagües
              </Typography>
              <Typography variant="h6" gutterBottom>Mis Trabajos</Typography>
              <Grid container spacing={2} mb={2}>
                <Grid item xs={6}>
                  <img src="/placeholder.svg" alt="Trabajo 1" style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
                </Grid>
                <Grid item xs={6}>
                  <img src="/placeholder.svg" alt="Trabajo 2" style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
                </Grid>
              </Grid>
              <Typography variant="h6" gutterBottom>Reseñas</Typography>
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Rating value={5} readOnly size="small" />
                  <Typography variant="body2">Excelente! Trabajo impecable</Typography>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Rating value={4} readOnly size="small" />
                  <Typography variant="body2">Buen trabajo</Typography>
                </CardContent>
              </Card>
            </>
          )}
        </Box>

        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
          <Toolbar sx={{ justifyContent: 'space-around' }}>
            <IconButton color="inherit">
              <Favorite />
            </IconButton>
            <IconButton color="inherit">
              <Search />
            </IconButton>
            <IconButton color="inherit">
              <Message />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Container>
    </ThemeProvider>
  );
}