import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Apropos = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  return (
    <div className="wrapper">
      {/* Barre de navigation 1 (fond sombre) */}
      <Navbar bg="light" variant="light" expand="lg" className="fixed-top">
        <Container>
          <Navbar.Brand href="#home"><strong>Plateforme de Permutation Universitaires</strong></Navbar.Brand>
          <Nav className="me-auto">
            {token ? (
              <button onClick={() => {
                localStorage.removeItem('token');
                navigate('/');
              }}>Accueil</button>
            ) : (
              <Nav.Link href="/">Accueil</Nav.Link>
            )}
            {token ? (
              <button onClick={() => {
                localStorage.removeItem('token');
                navigate('registrationPage');
              }}>Inscription</button>
            ) : (
              <Nav.Link href="/registrationPage">Inscription</Nav.Link>
            )}
            {token ? <button onClick={() => {
              localStorage.removeItem('token');
              navigate('Apropos');
            }}>Apropos</button> : <Nav.Link href="/Apropos">A propos</Nav.Link>}

{token ? <button onClick={() => {
              localStorage.removeItem('token');
              navigate('login');
            }}>Log out</button> : <Nav.Link href="/login">Logout</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>

      {/* Texte de description de la plateforme */}
      <div className="description-text">
        <p>
          <strong>Plateforme de Permutation Universitaires</strong><br /><br />
          Cette plateforme est simplement un espace permettant aux professeurs, aux étudiants et aux directeurs d'établissements universitaires de rechercher un partenaire pour une permutation. Elle se limite à cette fonctionnalité, mais s'adresse à ces trois catégories essentielles au sein de la communauté académique.<br /><br />
          Les enseignants peuvent rechercher des partenaires intéressés par un échange dans d'autres établissements d'enseignement supérieur, tout comme les étudiants et les directeurs peuvent explorer des opportunités de mobilité qui correspondent à leurs objectifs académiques et institutionnels respectifs. Le système facilite la recherche et la correspondance entre les enseignants, les étudiants et les directeurs ayant une volonté mutuelle d'échanger.<br /><br />
          La plateforme offre une interface conviviale et sécurisée aux enseignants, aux étudiants et aux directeurs pour communiquer et échanger les informations nécessaires. Les membres de chaque groupe peuvent créer des profils personnels et renseigner des informations concernant leurs spécialités, leurs compétences, leurs établissements et les informations de contact. Cette fonctionnalité garantit une correspondance efficace et sécurisée entre les trois parties, facilitant ainsi la concrétisation des projets de permutation.<br /><br />
          En utilisant cette plateforme, les enseignants, les étudiants et les directeurs peuvent faciliter leur recherche de partenaires d'échange, économiser du temps et des efforts en évitant les communications individuelles fastidieuses et les recherches continues d'opportunités d'échange. Ce système est efficace et utile pour toutes les parties impliquées, que ce soit pour les enseignants souhaitant changer d'institution, les étudiants désirant explorer de nouvelles opportunités d'apprentissage, ou les directeurs cherchant à favoriser la mobilité académique au sein de leur établissement.
        </p>
      </div>
    </div>
  );
};

export default Apropos;
