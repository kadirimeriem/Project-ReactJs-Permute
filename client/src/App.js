import { useState } from "react";
import * as XLSX from 'xlsx';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function App() {

  // onchange states
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  // submit state
  const [excelData, setExcelData] = useState(null);

  // onchange event
  const handleFile = (e) => {
    let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        }
      }
      else {
        setTypeError('Please select only excel file types');
        setExcelFile(null);
      }
    }
    else {
      console.log('Please select your file');
    }
  }

  // submit event
  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data.slice(0, 10));
    }
  }

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  return (
    <div className="wrapper">
      {/* Barre de navigation 1 (fond sombre) */}
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

      <h3>Upload & View Excel Sheets</h3>

      {/* form */}
      <form className="form-group custom-form" onSubmit={handleFileSubmit}>
        <input type="file" className="form-control" required onChange={handleFile} />
        <button type="submit" className="btn btn-success btn-md">UPLOAD</button>
        {typeError && (
          <div className="alert alert-danger" role="alert">{typeError}</div>
        )}
      </form>

      {/* view data */}
      <div className="viewer">
        {excelData ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  {Object.keys(excelData[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {excelData.map((individualExcelData, index) => (
                  <tr key={index}>
                    {Object.keys(individualExcelData).map((key) => (
                      <td key={key}>{individualExcelData[key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No File is uploaded yet!</div>
        )}
      </div>
    </div>
  );
}

export default App;
