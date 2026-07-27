Feature: Inicio de Sesión
  Como usuario registrado
  Quiero iniciar sesión en la aplicación
  Para acceder a mi panel de control

  Background:
    Given que estoy en la página de login


  Scenario Outline: Intentar iniciar sesión con diferentes credenciales
    When ingreso el usuario "<username>" y la contraseña "<password>"
    And hago clic en el botón "Login"
    Then debería ver un mensaje que contenga "<message>"

    Examples:
      | username | password             | message                           |
      | tomsmith | SuperSecretPassword! | You logged into a secure area!   |
      | tomsmith | WrongPass            | Your password is invalid!        |
      | invalid  | anything             | Your username is invalid!        |