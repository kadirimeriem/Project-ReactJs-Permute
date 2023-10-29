
import React, { useState } from 'react';
import { Form, Button, Container, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profession, setProfession] = useState(''); // Initialize profession as an empty string
    const [grade, setGrade] = useState(''); // Initialize grade as an empty string
    const [specialite, setSpecialite] = useState(''); // Initialize specialite as an empty string
    const [niveauEtude, setNiveauEtude] = useState(''); // Initialize niveauEtude as an empty string
    const [etablissement, setEtablissement] = useState('');
    const [villeActuelle, setVilleActuelle] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const handleRegistration = async (e) => {
        e.preventDefault();
        // Implement your registration logic here
    };

    return (
        <div className="wrapper">
            <Navbar bg="light" variant="light" expand="lg" className="fixed-top">
                <Container>
                    <Navbar.Brand href="#home">PermuteXchange</Navbar.Brand>
                    <Nav className="me-auto">
                        {token ? <button onClick={() => {
                            localStorage.removeItem('token');
                            navigate('/');
                        }}>Accueil</button> : <Nav.Link href="/">Accueil</Nav.Link>}
                        {token ? <button onClick={() => {
                            localStorage.removeItem('token');
                            navigate('registartionPage');
                        }}>Inscription</button> : <Nav.Link href="/registrationPage">Inscription</Nav.Link>}
                        {token ? <button onClick={() => {
                            localStorage.removeItem('token');
                            navigate('Apropos');
                        }}>Apropos</button> : <Nav.Link href="/Apropos">A propos</Nav.Link>}
                        {token ? <button onClick={() => {
                            localStorage.removeItem('token');
                            navigate('login');
                        }}>Log out</button> : <Nav.Link href="/login">Login</Nav.Link>}
                    </Nav>
                </Container>
            </Navbar>

            <Container className="mt-5">
                <h1>Registration</h1>
                <Form>
                    <Form.Group controlId="formBasicNom">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your nom"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPrenom">
                        <Form.Label>Prenom</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your prenom"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicTelephone">
                        <Form.Label>Telephone</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your telephone"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicProfession">
                        <Form.Label>Profession</Form.Label>
                        <Form.Control
                            as="select"
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                        >
                            <option value="">Select your profession</option>
                            <option value="professeur">Professeur</option>
                            <option value="etudiant">Etudiant</option>
                            <option value="directeur">Directeur</option>
                        </Form.Control>
                    </Form.Group>

                    {/* Render grade and specialite fields if profession is "professeur" */}
                    {profession === "professeur" && (
                        <>
                            <Form.Group controlId="formBasicGrade">
                                <Form.Label>Grade</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your grade"
                                    value={grade}
                                    onChange={(e) => setGrade(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicSpecialite">
                                <Form.Label>Specialite</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your specialite"
                                    value={specialite}
                                    onChange={(e) => setSpecialite(e.target.value)}
                                />
                            </Form.Group>
                        </>
                    )}

                    {/* Render niveauEtude field if profession is "etudiant" */}
                    {profession === "etudiant" && (
                        <>
                            <Form.Group controlId="formBasicNiveauEtude">
                                <Form.Label>Niveau d'Étude</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your niveau d'étude"
                                    value={niveauEtude}
                                    onChange={(e) => setNiveauEtude(e.target.value)}
                                />
                            </Form.Group>
                        </>
                    )}

                    <Form.Group controlId="formBasicEtablissement">
                        <Form.Label>Etablissement</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your etablissement"
                            value={etablissement}
                            onChange={(e) => setEtablissement(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicVilleActuelle">
                        <Form.Label>Ville Actuelle</Form.Label>
                        <Form.Control
                            as="select"
                            value={villeActuelle}
                            onChange={(e) => setVilleActuelle(e.target.value)}
                        >
                            <option value="">Select your ville actuelle</option>
                            <option value="Casablanca">Casablanca</option>
                            <option value="El Jadida">El Jadida</option>
                            {/* Add more cities as needed */}
                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="button" onClick={handleRegistration}>
                        Register
                    </Button>

                    {error && <div className="mt-3 text-danger">{error}</div>}
                </Form>
            </Container>
        </div>
    );
};

export default RegistrationPage;
