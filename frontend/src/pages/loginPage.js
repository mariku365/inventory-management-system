import LoginForm from '../components/loginForm'
import '../styles/loginPage.css';

function LoginPage() {
  return (
    <div className="App">
      <main className = "App-header">
        <h3>INVENTORY MANAGEMENT SYSTEM</h3>
        <LoginForm />
      </main>
    </div>
  );
}

export default LoginPage;
