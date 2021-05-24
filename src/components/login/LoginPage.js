import React from "react";
import styles from "./login.module.css";
import { connect } from "react-redux";
import { loginWithGugulAction } from "../../redux/userDuck";

function LoginPage({ fetching, loginWithGugulAction }) {
  function login() {
    loginWithGugulAction();
  }

  if (fetching) return <h2>Cargando...</h2>;

  return (
    <div className={styles.container}>
      <h1>Inicia Sesión con Google</h1>
      <h1>Cierra tu sesión</h1>
      <button onClick={login}>Iniciar</button>
      <button>Cerrar Sesión</button>
    </div>
  );
}

function mapStateToProps({ user: { fetching } }) {
  return {
    fetching,
  };
}

export default connect(mapStateToProps, { loginWithGugulAction })(LoginPage);
