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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  Tabs,
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
  "SUPER", "Pinturería", "Plomería", "Albañilería", "Electricidad",
  "Jardinería", "Carpintería", "Gasista", "Tecnico"
];

const providers = [
  {
    id: 1,
    name: "Jose Perez",
    rating: 3.5,
    specialty: "Especialista en desagüe",
    location: "Argentina, AMBA",
    avatar: "/placeholder-avatar-1.jpg",
    experience: "Trabajo hace 11 años en el rubro, y me especializo en todo tipo de desagües",
    workImages: ["/placeholder.svg", "/placeholder.svg"],
    reviews: [
      { rating: 5, comment: "Excelente! Trabajo impecable" },
      { rating: 4, comment: "Buen trabajo" }
    ]
  },
  {
    id: 2,
    name: "Amelie Franzonni",
    rating: 4.5,
    specialty: "Especialista en grifería",
    location: "Castelar",
    avatar: "/placeholder-avatar-2.jpg",
    experience: "Experta en instalación y reparación de grifos con 8 años de experiencia",
    workImages: ["/placeholder.svg", "/placeholder.svg"],
    reviews: [
      { rating: 5, comment: "Muy profesional y eficiente" },
      { rating: 4, comment: "Buen servicio, recomendado" }
    ]
  },
  {
    id: 3,
    name: "Alejandro Mosa",
    rating: 3.5,
    specialty: "Especialista en sanitarios",
    location: "Ituzaingó",
    avatar: "/placeholder-avatar-3.jpg",
    experience: "15 años de experiencia en instalación y reparación de sanitarios",
    workImages: ["/placeholder.svg", "/placeholder.svg"],
    reviews: [
      { rating: 3, comment: "Trabajo aceptable, pero tardó más de lo esperado" },
      { rating: 4, comment: "Buen conocimiento técnico" }
    ]
  },
];

export default function Component() {
  const [screen, setScreen] = useState('home');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState(services);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const filtered = services.filter(service =>
      service.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(filtered);
  }, [searchTerm]);

  const handleLogin = () => {
    // Aquí iría la lógica de autenticación real
    console.log('Login with:', loginEmail, loginPassword);
    setIsLoggedIn(true);
    setIsLoginOpen(false);
  };

  const handleRegister = () => {
    // Aquí iría la lógica de registro real
    console.log('Register with:', registerData);
    setIsLoggedIn(true);
    setIsRegisterOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

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
            {isLoggedIn ? (
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            ) : (
              <Button color="inherit" onClick={() => setIsLoginOpen(true)}>Login</Button>
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
              {providers.map((provider) => (
                <Card
                  key={provider.id}
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
                        src={provider.avatar}
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
                  src={selectedProvider.avatar}
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
                {selectedProvider.experience}
              </Typography>
              <Typography variant="h6" gutterBottom>Mis Trabajos</Typography>
              <Grid container spacing={2} mb={2}>
                {selectedProvider.workImages.map((img, index) => (
                  <Grid item xs={6} key={index}>
                    <img src={img} alt={`Trabajo ${index + 1}`} style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
                  </Grid>
                ))}
              </Grid>
              <Typography variant="h6" gutterBottom>Reseñas</Typography>
              {selectedProvider.reviews.map((review, index) => (
                <Card key={index} sx={{ mb: 2 }}>
                  <CardContent>
                    <Rating value={review.rating} readOnly size="small" />
                    <Typography variant="body2">{review.comment}</Typography>
                  </CardContent>
                </Card>
              ))}
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

        {/* Login Dialog */}
        <Dialog open={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsLoginOpen(false)}>Cancel</Button>
            <Button onClick={handleLogin}>Login</Button>
          </DialogActions>
          <Box textAlign="center" pb={2}>
            <Button onClick={() => {
              setIsLoginOpen(false);
              setIsRegisterOpen(true);
            }}>
              Don't have an account? Register
            </Button>
          </Box>
        </Dialog>

        {/* Register Dialog */}
        <Dialog open={isRegisterOpen} onClose={() => setIsRegisterOpen(false)}>
          <DialogTitle>Register</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={registerData.email}
              onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={registerData.password}
              onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
            />
            <TextField
              margin="dense"
              label="First Name"
              fullWidth
              variant="outlined"
              value={registerData.firstName}
              onChange={(e) => setRegisterData({...registerData, firstName: e.target.value})}
            />
            <TextField
              margin="dense"
              label="Last Name"
              fullWidth
              variant="outlined"
              value={registerData.lastName}
              onChange={(e) => setRegisterData({...registerData, lastName: e.target.value})}
            />
            <TextField
              margin="dense"
              label="Address"
              fullWidth
              variant="outlined"
              value={registerData.address}
              onChange={(e) => setRegisterData({...registerData, address: e.target.value})}
            />
            <TextField
              margin="dense"
              label="Phone"
              fullWidth
              variant="outlined"
              value={registerData.phone}
              onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsRegisterOpen(false)}>Cancel</Button>
            <Button onClick={handleRegister}>Register</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}