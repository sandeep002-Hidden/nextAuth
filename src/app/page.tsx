import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
export default function Home() {
  return (
    <>
      <div>
        <Header />
        <div className="min-h-screen flex justify-center items-center">
          <h1>Home Page</h1>
        </div>
        <Footer />
      </div>
    </>
  );
}
