import { Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux";
import Layout from "./components/Layout";
import ResourceDetail from "./views/ResourceDetail";
import ResourceCreate from "./views/ResourceCreate";

function App() {
  return (
    <div className="app-container">
      <Provider store={store}>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <></>
              </Layout>
            }
          />
          <Route
            path="/resource/create"
            element={
              <Layout>
                <ResourceCreate />
              </Layout>
            }
          />
          <Route
            path="/resource/:id"
            element={
              <Layout>
                <ResourceDetail />
              </Layout>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
