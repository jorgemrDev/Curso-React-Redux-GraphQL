import React from "react";
import styles from "./login.module.css";
import { connect } from "react-redux";
import { loginWithGugulAction, logOutAction } from "../../redux/userDuck";

function LoginPage({ fetching, loginWithGugulAction, loggedIn, logOutAction }) {
  function login() {
    loginWithGugulAction();
  }

  function logout() {
    logOutAction();
  }

  if (fetching) return <h2>Cargando...</h2>;

  return (
    <div className={styles.container}>
      {!loggedIn ? (
        <h1>Inicia Sesión con Google</h1>
      ) : (
        <h1>Cierra tu sesión</h1>
      )}
      {!loggedIn ? (
        <button onClick={login}>Iniciar</button>
      ) : (
        <button onClick={logout}>Cerrar Sesión</button>
      )}
    </div>
  );
}

function mapStateToProps({ user: { fetching, loggedIn } }) {
  return {
    fetching,
    loggedIn,
  };
}

export default connect(mapStateToProps, {
  loginWithGugulAction,
  logOutAction,
})(LoginPage);
