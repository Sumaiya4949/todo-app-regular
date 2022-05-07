import { Layout, Typography, Image } from "antd";
import "antd/dist/antd.css";
import { useContext } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { AuthContext } from "./components/Auth";
import { AuthUserBadge } from "./components/AuthUserBadge";
import { LoginForm } from "./pages/LoginForm";
import { MyTodos } from "./pages/MyTodos";
import { RegistrationForm } from "./pages/RegistrationForm";
import styles from "./styles/App.module.scss";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

/**
 * React component to visualize the todo application
 * @returns {JSX} JSX of the app component
 */
const App = () => {
  const { isLoggedIn } = useContext(AuthContext);

  //JSX
  return (
    <Layout>
      <Header className={styles.header}>
        <Image src="logo192.png" className={styles.logo} />
        <Title className={styles.title} level={4}>
          <Link to="/">TODO APP</Link>
        </Title>
        {isLoggedIn && (
          <AuthUserBadge
            className={styles.authUserBadge}
            logout={() => {}}
            userName={"Sumaiya Sultana"}
          />
        )}
      </Header>

      <Content className={styles.content}>
        <Routes>
          <Route path="register" element={<RegistrationForm />} />
          <Route path="/" element={isLoggedIn ? <MyTodos /> : <LoginForm />} />
        </Routes>
      </Content>

      <Footer className={styles.footer}>TODO App 2022 Created by Sinthy</Footer>
    </Layout>
  );
};

export default App;
