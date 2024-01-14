import { Outlet } from "react-router-dom";
import TopHeader from "../shared/TopHeader";
import Header from "../shared/Header";
import Footer from "../shared/Footer";

const MainLayout = () => {
  return (
    <section>
      <TopHeader />
      <Header />
      <main className="page-container pb-20">
        <Outlet />
      </main>
      <Footer />
    </section>
  );
};

export default MainLayout;
